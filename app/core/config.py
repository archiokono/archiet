"""Application settings — validated at startup via pydantic-settings.

Every required environment variable is declared here. If DATABASE_URL or
SECRET_KEY is missing, the service raises a clear ValidationError before
accepting any traffic — not a cryptic runtime error under load.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """Runtime configuration loaded from environment variables and .env file."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # ── Required ──────────────────────────────────────────────────────────────
    database_url: str
    secret_key: str

    # ── Auth ──────────────────────────────────────────────────────────────────
    jwt_secret: str  # Required for jwt-local auth
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # ── Application ───────────────────────────────────────────────────────────
    debug: bool = False
    log_level: str = "INFO"
    # Set ALLOWED_ORIGINS env var to restrict CORS in production (comma-separated).
    # Example: ALLOWED_ORIGINS=https://app.example.com,https://admin.example.com
    allowed_origins: list[str] = ["http://localhost:3000", "http://localhost:8080"]

    # ── Database ──────────────────────────────────────────────────────────────
    db_pool_size: int = 10
    db_max_overflow: int = 20
    db_pool_timeout: int = 30

settings = Settings()
