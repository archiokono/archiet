from __future__ import annotations
import uuid
from datetime import datetime
from typing import Any
from database import db

class Journeysessionconversations(db.Model):
    __tablename__ = "journey_conversations"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = db.Column(db.String(36), db.ForeignKey("journey_sessions.id"), nullable=False, index=True)
    role = db.Column(db.String(16), nullable=False)  # user | assistant | system
    content = db.Column(db.Text, nullable=False)
    step = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self) -> dict[str, Any]:
        return {"id": self.id, "session_id": self.session_id, "role": self.role,
                "content": self.content, "step": self.step,
                "created_at": self.created_at.isoformat() if self.created_at else None}
