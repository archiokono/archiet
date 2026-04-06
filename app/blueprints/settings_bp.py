from __future__ import annotations
import logging
from http import HTTPStatus
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db
from app.models.workspace import Workspace
logger = logging.getLogger(__name__)
settings_bp = Blueprint("settings", __name__)

def _get_workspace(user_id):
    return Workspace.query.filter_by(owner_id=user_id).first()

@settings_bp.route("/keys/status", methods=["GET"])
@jwt_required()
def keys_status():
    user_id = get_jwt_identity()
    ws = _get_workspace(user_id)
    if not ws:
        return jsonify({"anthropic": False, "openai": False, "google": False})
    return jsonify(ws.llm_key_status())

@settings_bp.route("/keys", methods=["POST"])
@jwt_required()
def save_key():
    user_id = get_jwt_identity()
    body = request.get_json(force=True) or {}
    provider = (body.get("provider") or "").strip().lower()
    key_value = (body.get("key") or "").strip()
    if provider not in ("anthropic", "openai", "google"):
        return jsonify({"error": "provider must be anthropic, openai, or google"}), HTTPStatus.BAD_REQUEST
    if not key_value:
        return jsonify({"error": "key is required"}), HTTPStatus.BAD_REQUEST
    ws = _get_workspace(user_id)
    if not ws:
        return jsonify({"error": "workspace not found"}), HTTPStatus.NOT_FOUND
    ws.set_llm_key(provider, key_value)
    db.session.commit()
    return jsonify({"ok": True, "provider": provider})

@settings_bp.route("/keys", methods=["DELETE"])
@jwt_required()
def delete_key():
    user_id = get_jwt_identity()
    body = request.get_json(force=True) or {}
    provider = (body.get("provider") or "").strip().lower()
    if provider not in ("anthropic", "openai", "google"):
        return jsonify({"error": "invalid provider"}), HTTPStatus.BAD_REQUEST
    ws = _get_workspace(user_id)
    if not ws:
        return jsonify({"error": "workspace not found"}), HTTPStatus.NOT_FOUND
    setattr(ws, f"{provider}_key_enc", None)
    db.session.commit()
    return jsonify({"ok": True, "provider": provider})