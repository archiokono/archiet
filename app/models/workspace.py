from __future__ import annotations
import base64, hashlib, os, uuid
from datetime import datetime
from typing import Any, Optional
from cryptography.fernet import Fernet
from database import db


def _fernet() -> Fernet:
    raw = os.environ.get("SECRET_KEY", "insecure-dev-key")
    key = base64.urlsafe_b64encode(hashlib.sha256(raw.encode()).digest())
    return Fernet(key)


class Workspace(db.Model):
    __tablename__ = "workspaces"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    owner_id = db.Column(db.String(36), nullable=False, index=True)
    slug = db.Column(db.String(64), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    plan = db.Column(db.String(32), nullable=False, default="free")
    stripe_customer_id = db.Column(db.String(128), nullable=True, unique=True)
    stripe_subscription_id = db.Column(db.String(128), nullable=True, unique=True)
    subscription_status = db.Column(db.String(32), nullable=True)
    trial_ends_at = db.Column(db.DateTime, nullable=True)
    generations_this_month = db.Column(db.Integer, nullable=False, default=0)
    monthly_limit = db.Column(db.Integer, nullable=False, default=3)
    anthropic_key_enc = db.Column(db.Text, nullable=True)
    openai_key_enc = db.Column(db.Text, nullable=True)
    google_key_enc = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_llm_key(self, provider: str, plaintext: str) -> None:
        encrypted = _fernet().encrypt(plaintext.strip().encode()).decode()
        col = f"{provider}_key_enc"
        if hasattr(self, col):
            setattr(self, col, encrypted)

    def get_llm_key(self, provider: str) -> Optional[str]:
        col = f"{provider}_key_enc"
        enc = getattr(self, col, None)
        if not enc:
            return None
        try:
            return _fernet().decrypt(enc.encode()).decode()
        except Exception:
            return None

    def has_llm_key(self, provider: str) -> bool:
        return bool(getattr(self, f"{provider}_key_enc", None))

    def llm_key_status(self) -> dict[str, bool]:
        return {
            "anthropic": self.has_llm_key("anthropic"),
            "openai": self.has_llm_key("openai"),
            "google": self.has_llm_key("google"),
        }

    def can_generate(self) -> bool:
        if self.plan != "free":
            return True
        return self.generations_this_month < self.monthly_limit

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id, "slug": self.slug, "name": self.name, "plan": self.plan,
            "subscription_status": self.subscription_status,
            "generations_this_month": self.generations_this_month,
            "monthly_limit": self.monthly_limit,
            "can_generate": self.can_generate(),
            "llm_keys": self.llm_key_status(),
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
