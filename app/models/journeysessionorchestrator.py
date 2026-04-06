from __future__ import annotations
import uuid
from datetime import datetime
from typing import Any
from database import db

class Journeysessionorchestrator(db.Model):
    __tablename__ = "journey_sessions"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), nullable=False, index=True)
    org_id = db.Column(db.String(36), nullable=True, index=True)
    status = db.Column(db.String(32), nullable=False, default="draft")
    title = db.Column(db.String(255), nullable=True)
    problem_statement = db.Column(db.Text, nullable=True)
    clarification_answers = db.Column(db.JSON, nullable=True)
    domains_json = db.Column(db.JSON, nullable=True)
    architecture_json = db.Column(db.JSON, nullable=True)
    options_json = db.Column(db.JSON, nullable=True)
    genome_yaml = db.Column(db.Text, nullable=True)
    language = db.Column(db.String(64), nullable=True, default="python-flask")
    llm_provider = db.Column(db.String(64), nullable=True)
    current_step = db.Column(db.Integer, nullable=False, default=1)
    quality_score = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    conversations = db.relationship("Journeysessionconversations", backref="session", lazy="dynamic", cascade="all,delete-orphan")
    artifacts = db.relationship("Generatedcodeartifacts", backref="session", lazy="dynamic", cascade="all,delete-orphan")

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id, "user_id": self.user_id, "org_id": self.org_id,
            "status": self.status, "title": self.title, "problem_statement": self.problem_statement,
            "current_step": self.current_step, "language": self.language,
            "quality_score": self.quality_score,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
