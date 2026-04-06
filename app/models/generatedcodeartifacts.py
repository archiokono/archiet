from __future__ import annotations
import uuid
from datetime import datetime
from typing import Any
from database import db

class Generatedcodeartifacts(db.Model):
    __tablename__ = "generated_artifacts"
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = db.Column(db.String(36), db.ForeignKey("journey_sessions.id"), nullable=False, index=True)
    language = db.Column(db.String(64), nullable=False, default="python-flask")
    version = db.Column(db.Integer, nullable=False, default=1)
    files_json = db.Column(db.JSON, nullable=False, default=dict)
    file_count = db.Column(db.Integer, nullable=True)
    quality_score = db.Column(db.Float, nullable=True)
    genome_yaml = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(32), nullable=False, default="pending")
    download_count = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self) -> dict[str, Any]:
        return {"id": self.id, "session_id": self.session_id, "language": self.language,
                "version": self.version, "file_count": self.file_count,
                "quality_score": self.quality_score, "status": self.status,
                "download_count": self.download_count,
                "created_at": self.created_at.isoformat() if self.created_at else None}
