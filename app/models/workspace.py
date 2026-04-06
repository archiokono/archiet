from __future__ import annotations
import uuid
from datetime import datetime
from typing import Any
from database import db

class Workspace(db.Model):
    __tablename__ = "workspaces"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    owner_id = db.Column(db.String(36), nullable=False, index=True)
    slug = db.Column(db.String(64), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    plan = db.Column(db.String(32), nullable=False, default="free")  # free | starter | pro | enterprise
    stripe_customer_id = db.Column(db.String(128), nullable=True, unique=True)
    stripe_subscription_id = db.Column(db.String(128), nullable=True, unique=True)
    subscription_status = db.Column(db.String(32), nullable=True)  # active | canceled | past_due | trialing
    trial_ends_at = db.Column(db.DateTime, nullable=True)
    generations_this_month = db.Column(db.Integer, nullable=False, default=0)
    monthly_limit = db.Column(db.Integer, nullable=False, default=3)  # free tier
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def can_generate(self) -> bool:
        if self.plan != "free":
            return True
        return self.generations_this_month < self.monthly_limit

    def to_dict(self) -> dict[str, Any]:
        return {"id": self.id, "slug": self.slug, "name": self.name, "plan": self.plan,
                "subscription_status": self.subscription_status,
                "generations_this_month": self.generations_this_month,
                "monthly_limit": self.monthly_limit,
                "can_generate": self.can_generate(),
                "created_at": self.created_at.isoformat() if self.created_at else None}
