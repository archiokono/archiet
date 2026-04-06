from __future__ import annotations
from http import HTTPStatus
from flask import Blueprint, jsonify, request, render_template
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db
from app.models.user import User
from app.models.workspace import Workspace

settings_bp = Blueprint("settings", __name__)

PROVIDERS = ("anthropic", "openai", "google")

@settings_bp.route("/settings/keys")
@jwt_required()
def keys_page():
    user = User.query.get(get_jwt_identity())
    if not user:
        return jsonify({"error": "not found"}), 404
    ws = user.workspace
    return render_template("settings/keys.html", user=user, workspace=ws,
                           key_status=ws.llm_key_status() if ws else {})

@settings_bp.route("/api/settings/keys", methods=["POST"])
@jwt_required()
def save_keys():
    user = User.query.get(get_jwt_identity())
    if not user:
        return jsonify({"error": "not found"}), 404
    ws = user.workspace
    if not ws:
        ws = Workspace(owner_id=user.id, slug=user.id[:8],
                       name=f"{user.email.split('@')[0]}'s workspace")
        db.session.add(ws)
    body = request.get_json(force=True) or {}
    updated = []
    for provider in PROVIDERS:
        key = (body.get(f"{provider}_key") or "").strip()
        if key:
            ws.set_llm_key(provider, key)
            updated.append(provider)
    db.session.commit()
    return jsonify({"updated": updated, "key_status": ws.llm_key_status()})

@settings_bp.route("/api/settings/keys", methods=["DELETE"])
@jwt_required()
def delete_key():
    user = User.query.get(get_jwt_identity())
    if not user:
        return jsonify({"error": "not found"}), 404
    ws = user.workspace
    if not ws:
        return jsonify({"error": "no workspace"}), 404
    provider = (request.get_json(force=True) or {}).get("provider", "")
    if provider not in PROVIDERS:
        return jsonify({"error": "invalid provider"}), HTTPStatus.BAD_REQUEST
    ws.set_llm_key.__func__  # validate method exists
    setattr(ws, f"{provider}_key_enc", None)
    db.session.commit()
    return jsonify({"deleted": provider, "key_status": ws.llm_key_status()})

@settings_bp.route("/api/settings/keys/status", methods=["GET"])
@jwt_required()
def key_status():
    user = User.query.get(get_jwt_identity())
    if not user:
        return jsonify({"error": "not found"}), 404
    ws = user.workspace
    return jsonify({"key_status": ws.llm_key_status() if ws else {}})
