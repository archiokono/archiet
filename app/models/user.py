from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional
import bcrypt
from database import db


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(128), nullable=True, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    workspace_id = db.Column(db.String(36), db.ForeignKey("workspaces.id"), nullable=True, index=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def set_password(self, plaintext: str) -> None:
        self.password_hash = bcrypt.hashpw(plaintext.encode(), bcrypt.gensalt()).decode()

    def verify_password(self, plaintext: str) -> bool:
        try:
            return bcrypt.checkpw(plaintext.encode(), self.password_hash.encode())
        except Exception:
            return False

    @property
    def workspace(self) -> Optional["Workspace"]:
        from app.models.workspace import Workspace
        return Workspace.query.filter_by(owner_id=self.id).first()

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username or self.email,
            "is_active": self.is_active,
        }
