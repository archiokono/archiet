"""Session-scoped ArchiMate elements for Archiet journey sessions.

Minimal schema compatible with ARCHIE's archimate_elements table so the
AABL compiler can run against both without modification.
"""
import uuid
from datetime import datetime, timezone
from app import db


class JourneyArchiMateElement(db.Model):
    __tablename__ = "journey_archimate_elements"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = db.Column(
        db.String(36),
        db.ForeignKey("journey_sessions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    # ArchiMate 3.2 fields
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(100), nullable=False)   # ApplicationComponent, DataObject, etc.
    layer = db.Column(db.String(50), nullable=False, default="application")
    description = db.Column(db.Text)
    # JSON columns — stored as text, parsed by compiler helpers
    properties = db.Column(db.Text)
    spec_data = db.Column(db.Text)
    acm_properties = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    def to_element_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "layer": self.layer,
            "description": self.description or "",
            "spec_data": self.spec_data,
            "properties": self.properties,
        }


class JourneyArchiMateRelationship(db.Model):
    __tablename__ = "journey_archimate_relationships"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = db.Column(db.String(36), nullable=False, index=True)
    source_id = db.Column(
        db.String(36),
        db.ForeignKey("journey_archimate_elements.id", ondelete="CASCADE"),
        nullable=False,
    )
    target_id = db.Column(
        db.String(36),
        db.ForeignKey("journey_archimate_elements.id", ondelete="CASCADE"),
        nullable=False,
    )
    type = db.Column(db.String(100), nullable=False, default="association")
    description = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "source_id": self.source_id,
            "target_id": self.target_id,
            "type": self.type,
            "description": self.description or "",
        }
