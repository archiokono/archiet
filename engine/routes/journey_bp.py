import json
import logging
import os
import threading
import uuid
from datetime import datetime, timezone

import anthropic
from flask import Blueprint, Response, request, stream_with_context
from flask_jwt_extended import get_jwt_identity, jwt_required

from app import db
from app.models.journeysessionorchestrator import Journeysessionorchestrator
from app.models.journeysessionconversations import Journeysessionconversations
from app.models.workspace import Workspace
from app.models.archimate_session import JourneyArchiMateElement

logger = logging.getLogger(__name__)

journey_bp = Blueprint("journey_bp", __name__)

LLM_PROVIDERS = {
    "anthropic": os.environ.get("ANTHROPIC_API_KEY"),
    "openai": os.environ.get("OPENAI_API_KEY"),
    "google": os.environ.get("GOOGLE_API_KEY"),
}


def _get_workspace(user_id: str) -> Workspace | None:
    return Workspace.query.filter_by(owner_id=user_id).first()


@journey_bp.get("/api/journey/sessions/<session_id>")
@jwt_required()
def get_session(session_id: str):
    user_id = get_jwt_identity()
    session = Journeysessionorchestrator.query.filter_by(
        id=session_id, user_id=user_id).first()
    if not session:
        return {"error": "Session not found"}, 404
    return {"session": session.to_dict()}, 200


@journey_bp.post("/api/journey/sessions")
@jwt_required()
def create_session():
    user_id = get_jwt_identity()
    data = request.get_json(force=True) or {}
    session = Journeysessionorchestrator(
        id=str(uuid.uuid4()),
        user_id=user_id,
        name=data.get("name", "New Journey"),
        llm_provider=data.get("llm_provider", _pick_provider()),
        current_step=1,
        status="active",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )
    db.session.add(session)
    db.session.commit()
    return {"session": session.to_dict()}, 201


@journey_bp.get("/api/journey/sessions")
@jwt_required()
def list_sessions():
    user_id = get_jwt_identity()
    sessions = Journeysessionorchestrator.query.filter_by(user_id=user_id)         .order_by(Journeysessionorchestrator.updated_at.desc()).limit(50).all()
    return {"sessions": [s.to_dict() for s in sessions]}, 200


@journey_bp.get("/api/journey/sessions/<session_id>/messages")
@jwt_required()
def get_messages(session_id: str):
    user_id = get_jwt_identity()
    session = Journeysessionorchestrator.query.filter_by(
        id=session_id, user_id=user_id).first_or_404()
    msgs = Journeysessionconversations.query.filter_by(
        session_id=session.id).order_by(Journeysessionconversations.created_at).all()
    return {"messages": [m.to_dict() for m in msgs]}, 200


@journey_bp.delete("/api/journey/sessions/<session_id>")
@jwt_required()
def delete_session(session_id: str):
    user_id = get_jwt_identity()
    session = Journeysessionorchestrator.query.filter_by(
        id=session_id, user_id=user_id).first_or_404()
    db.session.delete(session)
    db.session.commit()
    return {"ok": True}, 200


@journey_bp.post("/api/journey/sessions/<session_id>/chat")
@jwt_required()
def session_chat(session_id: str):
    user_id = get_jwt_identity()
    session = Journeysessionorchestrator.query.filter_by(
        id=session_id, user_id=user_id).first_or_404()
    data = request.get_json(force=True) or {}
    message = data.get("message", "")
    step = data.get("step", session.current_step)

    user_msg = Journeysessionconversations(
        session_id=session_id, role="user", content=message, step=step)
    db.session.add(user_msg)
    db.session.commit()

    def _generate():
        context = f"Architecture Journey - Step {step}\nProblem: {session.problem_statement or '(not set)'}\n"
        if session.genome_yaml:
            context += f"\nGenome spec:\n{session.genome_yaml[:2000]}\n"
        full_response = []
        try:
            provider = session.llm_provider or _pick_provider()
            for chunk in _stream_llm(provider, context, message, user_id):
                full_response.append(chunk)
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
        except Exception as exc:
            logger.error("LLM stream error: %s", exc)
            err = f"LLM error: {exc}"
            full_response.append(err)
            yield f"data: {json.dumps({'chunk': err})}\n\n"

        assistant_content = "".join(full_response)
        assistant_msg = Journeysessionconversations(
            session_id=session_id, role="assistant",
            content=assistant_content, step=step)
        db.session.add(assistant_msg)
        session.updated_at = datetime.now(timezone.utc)
        db.session.commit()

        threading.Thread(
            target=_extract_and_save_archimate_elements,
            args=(session_id, message, assistant_content),
            daemon=True,
        ).start()

        yield f"data: {json.dumps({'done': True})}\n\n"

    return Response(
        stream_with_context(_generate()),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


def _pick_provider():
    for k, v in LLM_PROVIDERS.items():
        if v:
            return k
    return "anthropic"


def _stream_llm(provider: str, context: str, message: str, user_id: str):
    if provider == "anthropic":
        ws = _get_workspace(user_id)
        if not ws:
            yield "No workspace found. Set up your workspace first."
            return
        llm_key = ws.get_llm_key(provider)
        if not llm_key:
            yield f"No {provider} API key configured. Add it at /settings/keys"
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
        ws = _get_workspace(user_id)
        if not ws:
            yield "No workspace found."
            return
        llm_key = ws.get_llm_key(provider)
        if not llm_key:
            yield f"No {provider} API key configured. Add it at /settings/keys"
            return
        client = openai.OpenAI(api_key=llm_key)
        for chunk in client.chat.completions.create(
            model="gpt-4o", max_tokens=4096, stream=True,
            messages=[
                {"role": "system", "content": context},
                {"role": "user", "content": message},
            ]
        ):
            delta = chunk.choices[0].delta.content or ""
            if delta:
                yield delta

    else:
        yield f"[{provider} not configured - set API key at /settings/keys]"


_ARCHIMATE_EXTRACTION_SYSTEM = (
    "You are an ArchiMate 3.2 architecture analyst. "
    "Extract architectural elements from the conversation and return ONLY valid JSON. "
    "No explanation, no markdown fences, just the JSON array.\n\n"
    "Use these ArchiMate 3.2 element types:\n"
    "- ApplicationComponent (services, APIs, systems, apps)\n"
    "- DataObject (entities, data models, records)\n"
    "- BusinessProcess (workflows, processes)\n"
    "- BusinessActor (users, roles, personas)\n"
    "- BusinessService (business capabilities)\n"
    "- ApplicationService (technical services, microservices)\n"
    "- Node (infrastructure, servers, cloud)\n"
    "- Constraint (rules, constraints)\n"
    "- Goal (goals, objectives)\n\n"
    'Return: [{"name": "...", "type": "ApplicationComponent", '
    '"layer": "application", "description": "..."}]\n'
    "Layers: motivation, strategy, business, application, technology\n"
    "Return [] if no architectural elements are mentioned."
)


def _extract_and_save_archimate_elements(
    session_id: str, user_message: str, assistant_response: str
):
    from app import create_app
    app = create_app()
    with app.app_context():
        try:
            session = Journeysessionorchestrator.query.get(session_id)
            if not session:
                return
            ws = _get_workspace(session.user_id)
            if not ws:
                return

            conversation_text = f"User: {user_message}\n\nAssistant: {assistant_response}"
            elements_json = None

            anthropic_key = ws.get_llm_key("anthropic")
            openai_key = ws.get_llm_key("openai")

            if anthropic_key:
                client = anthropic.Anthropic(api_key=anthropic_key)
                resp = client.messages.create(
                    model="claude-3-haiku-20240307",
                    max_tokens=2048,
                    system=_ARCHIMATE_EXTRACTION_SYSTEM,
                    messages=[{"role": "user", "content": conversation_text}],
                )
                elements_json = resp.content[0].text.strip()
            elif openai_key:
                import openai
                client = openai.OpenAI(api_key=openai_key)
                resp = client.chat.completions.create(
                    model="gpt-4o-mini", max_tokens=2048,
                    messages=[
                        {"role": "system", "content": _ARCHIMATE_EXTRACTION_SYSTEM},
                        {"role": "user", "content": conversation_text},
                    ],
                )
                elements_json = resp.choices[0].message.content.strip()

            if not elements_json:
                return

            if elements_json.startswith("```"):
                lines = [l for l in elements_json.split("\n") if not l.startswith("```")]
                elements_json = "\n".join(lines)

            extracted = json.loads(elements_json)
            if not isinstance(extracted, list):
                return

            existing = {
                (e.name.lower(), e.type): e
                for e in JourneyArchiMateElement.query.filter_by(session_id=session_id).all()
            }
            for elem_data in extracted:
                name = (elem_data.get("name") or "").strip()
                etype = (elem_data.get("type") or "ApplicationComponent").strip()
                if not name:
                    continue
                key = (name.lower(), etype)
                if key in existing:
                    existing_elem = existing[key]
                    new_desc = elem_data.get("description") or ""
                    if new_desc and len(new_desc) > len(existing_elem.description or ""):
                        existing_elem.description = new_desc
                        existing_elem.updated_at = datetime.now(timezone.utc)
                else:
                    new_elem = JourneyArchiMateElement(
                        id=str(uuid.uuid4()),
                        session_id=session_id,
                        name=name,
                        type=etype,
                        layer=elem_data.get("layer", "application"),
                        description=elem_data.get("description") or "",
                    )
                    db.session.add(new_elem)
                    existing[key] = new_elem
            db.session.commit()
            logger.info(
                "Extracted %d ArchiMate elements for session %s",
                len(extracted), session_id,
            )
        except Exception as exc:
            logger.warning(
                "ArchiMate extraction failed for session %s: %s", session_id, exc
            )
