from __future__ import annotations
import logging, re, uuid
from datetime import timedelta
from http import HTTPStatus
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
logger = logging.getLogger(__name__)
auth_bp = Blueprint("auth", __name__)
from app.models.user import User

@auth_bp.route("/login", methods=["POST"])
def login():
    body = request.get_json(force=True) or {}
    username = (body.get("email") or body.get("username") or "").strip()
    password = body.get("password") or ""
    if not username or not password:
        return jsonify({"error": "email and password required"}), HTTPStatus.BAD_REQUEST
    user = User.query.filter_by(email=username).first() or User.query.filter_by(username=username).first()
    if user is None or not user.verify_password(password):
        return jsonify({"error": "invalid credentials"}), HTTPStatus.UNAUTHORIZED
    access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(hours=24))
    return jsonify({"access_token": access_token, "token_type": "bearer"})

@auth_bp.route("/register", methods=["POST"])
def register():
    body = request.get_json(force=True) or {}
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""
    if not email or not password:
        return jsonify({"error": "email and password required"}), HTTPStatus.BAD_REQUEST
    if not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
        return jsonify({"error": "invalid email address"}), HTTPStatus.BAD_REQUEST
    if len(password) < 8:
        return jsonify({"error": "password must be at least 8 characters"}), HTTPStatus.BAD_REQUEST
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "email already registered"}), HTTPStatus.CONFLICT
    from database import db
    from app.models.workspace import Workspace
    user = User(id=str(uuid.uuid4()), email=email, username=email.split("@")[0])
    user.set_password(password)
    db.session.add(user)
    db.session.flush()
    slug = re.sub(r"[^a-z0-9]+", "-", email.split("@")[0].lower())[:50]
    if Workspace.query.filter_by(slug=slug).first():
        slug = slug + "-" + user.id[:8]
    workspace = Workspace(id=str(uuid.uuid4()), owner_id=user.id, slug=slug, name=email.split("@")[0])
    db.session.add(workspace)
    db.session.commit()
    access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(hours=24))
    return jsonify({"access_token": access_token, "token_type": "bearer"}), HTTPStatus.CREATED

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "user not found"}), HTTPStatus.NOT_FOUND
    return jsonify({"id": user.id, "email": user.email, "name": user.username or user.email.split("@")[0], "organization_id": None, "organization_name": None, "roles": ["user"]})