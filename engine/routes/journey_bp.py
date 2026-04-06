from __future__ import annotations
import json
"""Journey Wizard — HTML UI + session management API.

Routes:
  GET  /journey/                  — landing / new session
  GET  /journey/<session_id>      — resume session
  POST /api/journey/sessions      — create session (JWT required)
  GET  /api/journey/sessions      — list my sessions
  GET  /api/journey/sessions/<id> — get session
  PUT  /api/journey/sessions/<id>/step — advance step + save data
  POST /api/journey/sessions/<id>/chat — send chat message (streams via SSE)
"""
import uuid, json, logging, os
from datetime import datetime
from flask import Blueprint, jsonify, request, render_template, Response, stream_with_context
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request

from database import db
from app.models.journeysessionorchestrator import Journeysessionorchestrator
from app.models.journeysessionconversations import Journeysessionconversations

logger = logging.getLogger(__name__)
journey_bp = Blueprint("journey", __name__)

LLM_PROVIDERS = {
    "anthropic": os.environ.get("ANTHROPIC_API_KEY"),
    "openai": os.environ.get("OPENAI_API_KEY"),
    "google": os.environ.get("GOOGLE_API_KEY"),
}

# ── HTML pages ────────────────────────────────────────────────────────────

@journey_bp.get("/journey/")
@journey_bp.get("/journey")
def journey_home():
    return render_template("journey_wizard/journey_v3.html",
                           title="Architecture Journey Wizard",
                           llm_providers=[k for k,v in LLM_PROVIDERS.items() if v])

@journey_bp.get("/journey/<session_id>")
def journey_resume(session_id: str):
    session_data = None
    try:
        verify_jwt_in_request(optional=True)
        user_id = get_jwt_identity()
        if user_id:
            session_data = Journeysessionorchestrator.query.filter_by(
                id=session_id, user_id=user_id).first()
    except Exception:
        pass
    return render_template("journey_wizard/journey_v3.html",
                           title="Resume Journey",
                           session_id=session_id,
                           session_data=session_data.to_dict() if session_data else None,
                           llm_providers=[k for k,v in LLM_PROVIDERS.items() if v])

# ── Session API ───────────────────────────────────────────────────────────

@journey_bp.post("/api/journey/sessions")
@jwt_required()
def create_session():
    user_id = get_jwt_identity()
    data = request.get_json(force=True) or {}
    session = Journeysessionorchestrator(
        id=str(uuid.uuid4()),
        user_id=user_id,
        title=data.get("title", "New Architecture Journey"),
        problem_statement=data.get("problem_statement"),
        language=data.get("language", "python-flask"),
        llm_provider=data.get("llm_provider"),
        status="active",
    )
    db.session.add(session)
    db.session.commit()
    return jsonify(session.to_dict()), 201

@journey_bp.get("/api/journey/sessions")
@jwt_required()
def list_sessions():
    user_id = get_jwt_identity()
    sessions = Journeysessionorchestrator.query.filter_by(user_id=user_id)        .order_by(Journeysessionorchestrator.updated_at.desc()).limit(50).all()
    return jsonify([s.to_dict() for s in sessions])

@journey_bp.get("/api/journey/sessions/<session_id>")
@jwt_required()
def get_session(session_id: str):
    user_id = get_jwt_identity()
    session = Journeysessionorchestrator.query.filter_by(
        id=session_id, user_id=user_id).first_or_404()
    data = session.to_dict()
    data["domains_json"] = session.domains_json
    data["architecture_json"] = session.architecture_json
    data["options_json"] = session.options_json
    data["genome_yaml"] = session.genome_yaml
    return jsonify(data)

@journey_bp.put("/api/journey/sessions/<session_id>/step")
@jwt_required()
def advance_step(session_id: str):
    user_id = get_jwt_identity()
    session = Journeysessionorchestrator.query.filter_by(
        id=session_id, user_id=user_id).first_or_404()
    data = request.get_json(force=True) or {}
    step = data.get("step", session.current_step)
    # Save step data
    if "problem_statement" in data:
        session.problem_statement = data["problem_statement"]
    if "clarification_answers" in data:
        session.clarification_answers = data["clarification_answers"]
    if "domains_json" in data:
        session.domains_json = data["domains_json"]
    if "architecture_json" in data:
        session.architecture_json = data["architecture_json"]
    if "options_json" in data:
        session.options_json = data["options_json"]
    if "genome_yaml" in data:
        session.genome_yaml = data["genome_yaml"]
    if "language" in data:
        session.language = data["language"]
    session.current_step = step
    session.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify(session.to_dict())

@journey_bp.post("/api/journey/sessions/<session_id>/chat")
@jwt_required()
def session_chat(session_id: str):
    """Send a message within a journey session — streams LLM response."""
    user_id = get_jwt_identity()
    session = Journeysessionorchestrator.query.filter_by(
        id=session_id, user_id=user_id).first_or_404()
    data = request.get_json(force=True) or {}
    message = data.get("message", "")
    step = data.get("step", session.current_step)

    # Save user message
    user_msg = Journeysessionconversations(
        session_id=session_id, role="user", content=message, step=step)
    db.session.add(user_msg)
    db.session.commit()

    def _generate():
        # Build context from session data
        context = f"Architecture Journey — Step {step}\nProblem: {session.problem_statement or '(not set)'}\n"
        if session.genome_yaml:
            context += f"\nGenome spec:\n{session.genome_yaml[:2000]}\n"
        full_response = []
        try:
            provider = session.llm_provider or _pick_provider()
            for chunk in _stream_llm(provider, context, message):
                full_response.append(chunk)
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
        except Exception as exc:
            logger.error("LLM stream error: %s", exc)
            err = f"LLM error: {exc}"
            full_response.append(err)
            yield f"data: {json.dumps({'chunk': err})}\n\n"

        # Save assistant response
        assistant_msg = Journeysessionconversations(
            session_id=session_id, role="assistant",
            content="".join(full_response), step=step)
        db.session.add(assistant_msg)
        db.session.commit()
        yield f"data: {json.dumps({'done': True})}\n\n"

    return Response(stream_with_context(_generate()),
                    mimetype="text/event-stream",
                    headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})

def _pick_provider():
    for k, v in LLM_PROVIDERS.items():
        if v:
            return k
    return "anthropic"

def _stream_llm(provider: str, context: str, message: str):
    if provider == "anthropic":
        import anthropic
        ws = _get_workspace(user_id)
        if not ws:
            yield f"data: {json.dumps({'error': 'No workspace found. Please create a workspace first.'})}" + "\n\n"
            return
        llm_key = ws.get_llm_key(provider)
        if not llm_key:
            yield f"data: {json.dumps({'error': f'No {provider} API key configured. Add it at /settings/keys'})}" + "\n\n"
            return
        client = anthropic.Anthropic(api_key=llm_key)
        with client.messages.stream(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4096,
            system=context,
            messages=[{"role": "user", "content": message}]
        ) as stream:
            for text in stream.text_stream:
                yield text
    elif provider == "openai":
        import openai
        client = openai.OpenAI(api_key=llm_key)
        for chunk in client.chat.completions.create(
            model="gpt-4o", max_tokens=4096, stream=True,
            messages=[{"role": "system", "content": context},
                      {"role": "user", "content": message}]
        ):
            delta = chunk.choices[0].delta.content or ""
            if delta:
                yield delta
    else:
        yield f"[{provider} not configured — set API key in .env]"
