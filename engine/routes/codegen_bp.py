"""Code generation engine — genome → files.

Routes:
  POST /api/codegen/sessions/<session_id>/generate  — generate (SSE stream)
  GET  /api/codegen/sessions/<session_id>/artifacts — list artifacts
  GET  /api/codegen/artifacts/<artifact_id>/download — download zip
  GET  /api/codegen/artifacts/<artifact_id>/files/<path> — single file content
"""
from __future__ import annotations
import uuid, json, logging, io, zipfile, os, sys
from datetime import datetime
from flask import Blueprint, jsonify, request, Response, stream_with_context, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity

from database import db
from app.models.journeysessionorchestrator import Journeysessionorchestrator
from app.models.generatedcodeartifacts import Generatedcodeartifacts
from app.models.workspace import Workspace

logger = logging.getLogger(__name__)
codegen_bp = Blueprint("codegen_engine", __name__)

_ENGINE = os.path.join(os.path.dirname(__file__), "../..")
if _ENGINE not in sys.path:
    sys.path.insert(0, _ENGINE)


def _sse(data: dict) -> str:
    return f"data: {json.dumps(data)}\n\n"


@codegen_bp.post("/api/codegen/sessions/<session_id>/generate")
@jwt_required()
def generate(session_id: str):
    user_id = get_jwt_identity()
    session = Journeysessionorchestrator.query.filter_by(
        id=session_id, user_id=user_id).first_or_404()

    workspace = Workspace.query.filter_by(owner_id=user_id).first()
    if workspace and not workspace.can_generate():
        return jsonify({"error": "Monthly generation limit reached. Upgrade to continue.",
                        "upgrade_url": "/billing/upgrade"}), 402

    data = request.get_json(force=True) or {}
    language = data.get("language", session.language or "nextjs-shadcn")

    def _stream():
        yield _sse({"phase": "init", "message": "Starting genome compilation..."})
        try:
            yield _sse({"phase": "genome", "message": "Compiling architectural genome..."})
            files = {}
            errors = []
            genome_yaml = session.genome_yaml

            # Try to build genome from ArchiMate elements stored during journey chat
            try:
                from app.models.archimate_session import JourneyArchiMateElement, JourneyArchiMateRelationship
                elems = JourneyArchiMateElement.query.filter_by(session_id=session_id).all()
                if elems:
                    from engine.services.aabl_compiler import compile_genome_from_elements
                    elements_dict = {
                        e.element_id: {
                            "id": e.element_id, "name": e.element_name,
                            "type": e.element_type, "layer": e.layer,
                            "properties": e.properties or {},
                        }
                        for e in elems
                    }
                    rels = JourneyArchiMateRelationship.query.filter_by(session_id=session_id).all()
                    relationships = [
                        {"source_id": r.source_id, "target_id": r.target_id,
                         "rel_type": r.rel_type, "label": r.label}
                        for r in rels
                    ]
                    genome = compile_genome_from_elements(elements_dict, relationships,
                                                         session_name=session.title)
                    import yaml
                    genome_yaml = yaml.dump(genome, default_flow_style=False, allow_unicode=True)
                    session.genome_yaml = genome_yaml
                    db.session.flush()
                    yield _sse({"phase": "genome",
                                "message": f"Genome compiled: {len(elements_dict)} elements"})
                elif genome_yaml:
                    yield _sse({"phase": "genome", "message": "Using existing genome YAML"})
                else:
                    yield _sse({"phase": "genome", "warning": "No ArchiMate elements found — scaffold only"})
            except Exception as exc:
                logger.warning("Genome compile error: %s", exc)
                yield _sse({"phase": "genome", "warning": f"Genome compile skipped: {exc}"})

            # Generate files
            yield _sse({"phase": "generate", "message": "Generating code files..."})
            try:
                from engine.services.code_generation_service import generate_all_standalone
                result = generate_all_standalone(
                    session_data=session.to_dict(),
                    language=language,
                    architecture_json=session.architecture_json or {},
                    genome_yaml=genome_yaml,
                )
                files = result.get("files", {})
                errors = result.get("errors", [])
            except Exception as exc:
                logger.error("Code generation failed: %s", exc)
                errors.append(str(exc))
                yield _sse({"phase": "generate", "warning": "Full engine unavailable, using scaffold"})
                files = _scaffold_from_session(session, language)

            files["ARCHIET_PROVENANCE.json"] = json.dumps({
                "generated_by": "Archiet",
                "session_id": session_id,
                "language": language,
                "generated_at": datetime.utcnow().isoformat(),
                "archiet_version": "1.0.0",
            }, indent=2)
            files[".cursorrules"] = _cursor_rules(language)
            files["CLAUDE.md"] = _claude_md(session, language)

            version = db.session.query(
                db.func.count(Generatedcodeartifacts.id)
            ).filter_by(session_id=session_id).scalar() + 1

            artifact = Generatedcodeartifacts(
                id=str(uuid.uuid4()),
                session_id=session_id,
                language=language,
                version=version,
                files_json=files,
                file_count=len(files),
                status="ready",
            )
            db.session.add(artifact)
            if workspace:
                workspace.generations_this_month += 1
            session.status = "generated"
            session.updated_at = datetime.utcnow()
            db.session.commit()

            yield _sse({
                "phase": "complete",
                "status": "success",
                "artifact_id": artifact.id,
                "file_count": len(files),
                "errors": errors,
                "download_url": f"/api/codegen/artifacts/{artifact.id}/download",
            })

        except Exception as exc:
            logger.error("Generation stream error: %s", exc)
            yield _sse({"phase": "error", "message": str(exc)})

    return Response(stream_with_context(_stream()),
                    mimetype="text/event-stream",
                    headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


@codegen_bp.get("/api/codegen/sessions/<session_id>/artifacts")
@jwt_required()
def list_artifacts(session_id: str):
    user_id = get_jwt_identity()
    Journeysessionorchestrator.query.filter_by(id=session_id, user_id=user_id).first_or_404()
    artifacts = Generatedcodeartifacts.query.filter_by(session_id=session_id)\
        .order_by(Generatedcodeartifacts.version.desc()).all()
    return jsonify([a.to_dict() for a in artifacts])


@codegen_bp.get("/api/codegen/artifacts/<artifact_id>/download")
@jwt_required()
def download_artifact(artifact_id: str):
    user_id = get_jwt_identity()
    artifact = Generatedcodeartifacts.query.get_or_404(artifact_id)
    session = Journeysessionorchestrator.query.filter_by(
        id=artifact.session_id, user_id=user_id).first_or_404()

    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        for path, content in artifact.files_json.items():
            zf.writestr(path, content)
    buf.seek(0)
    artifact.download_count += 1
    db.session.commit()
    slug = (session.title or "archiet-project").lower().replace(" ", "-")[:40]
    return send_file(buf, mimetype="application/zip",
                     as_attachment=True,
                     download_name=f"{slug}-v{artifact.version}.zip")


@codegen_bp.get("/api/codegen/artifacts/<artifact_id>/files/<path:file_path>")
@jwt_required()
def get_file(artifact_id: str, file_path: str):
    user_id = get_jwt_identity()
    artifact = Generatedcodeartifacts.query.get_or_404(artifact_id)
    Journeysessionorchestrator.query.filter_by(
        id=artifact.session_id, user_id=user_id).first_or_404()
    content = artifact.files_json.get(file_path)
    if content is None:
        return jsonify({"error": "file not found"}), 404
    return jsonify({"path": file_path, "content": content})


def _scaffold_from_session(session, language: str) -> dict:
    return {
        "README.md": f"# {session.title or 'Archiet Project'}\n\nGenerated by Archiet.\n",
        "app/__init__.py": "# Archiet generated scaffold\nfrom flask import Flask\n\ndef create_app():\n    app = Flask(__name__)\n    return app\n",
        ".env.example": "SECRET_KEY=change-me\nDATABASE_URL=postgresql://user:pass@localhost/db\n",
    }


def _cursor_rules(language: str) -> str:
    return f"""# Archiet Generated Project — Cursor Rules
language: {language}
rules:
  - Never commit secrets to source control
  - Run tests before every commit
  - Use SQLAlchemy ORM only
  - All routes require JWT authentication except /health and /auth/*
"""


def _claude_md(session, language: str) -> str:
    return f"""# CLAUDE.md — Archiet Generated Project
Generated by: Archiet
Session: {session.id}
Language: {language}
Date: {datetime.utcnow().date()}

## Commands
- Start: `docker compose up --build`
- Test: `pytest tests/ -q`
- Migrate: `flask db upgrade`

## Architecture
- Framework: Flask (Python 3.12)
- Database: PostgreSQL + Flask-SQLAlchemy
- Auth: JWT (flask-jwt-extended)
"""
