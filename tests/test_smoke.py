"""Smoke Tests — verifies the application boots and core infrastructure is reachable.

These tests run in-process using FastAPI's TestClient. No live server or external
dependencies required — the test itself catches import errors, missing env vars
(via Settings validation), and broken startup event handlers.

Run: pytest tests/test_smoke.py -v
"""
import os
import pytest

# Provide minimal required env vars so Settings validation passes in test mode
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite:///./smoke_test.db")
os.environ.setdefault("SECRET_KEY", "smoke-test-secret-not-for-production")
os.environ.setdefault("JWT_SECRET", "smoke-test-jwt-not-for-production")
os.environ.setdefault("TESTING", "1")

def _get_test_client():
    """Import app and return TestClient. Raises ImportError if app is broken."""
    from fastapi.testclient import TestClient
    for mod_path, attr in [("app.main", "app"), ("main", "app"), ("app.app", "app")]:
        try:
            import importlib
            mod = importlib.import_module(mod_path)
            fastapi_app = getattr(mod, attr, None)
            if fastapi_app is not None:
                return TestClient(fastapi_app, raise_server_exceptions=False)
        except Exception:
            continue
    raise ImportError("Could not import FastAPI app from app.main, main, or app.app")

def test_app_imports_without_error():
    """The FastAPI app must be importable — catches missing deps and import-time errors."""
    client = _get_test_client()
    assert client is not None, "TestClient creation failed"

def test_health_endpoint_returns_200():
    """GET /health must return 200 — the most basic liveness check."""
    client = _get_test_client()
    r = client.get("/health")
    assert r.status_code == 200, (
        f"Health endpoint returned {r.status_code}. "
        "Add @app.get('/health') async def health(): return {'status': 'ok'} to main.py"
    )

def test_health_response_is_json():
    """GET /health must return JSON with a status field."""
    client = _get_test_client()
    r = client.get("/health")
    if r.status_code != 200:
        pytest.skip("Health endpoint not available — see test_health_endpoint_returns_200")
    body = r.json()
    assert "status" in body, (
        f"Health response missing 'status' field. Got: {body}. "
        "Return {'status': 'ok', 'db': 'ok'} from the health endpoint."
    )

def test_openapi_spec_is_valid():
    """GET /openapi.json must return a valid OpenAPI spec — catches route registration errors."""
    client = _get_test_client()
    r = client.get("/openapi.json")
    assert r.status_code == 200, (
        f"OpenAPI spec endpoint returned {r.status_code}. "
        "FastAPI auto-generates this — a non-200 indicates a startup error."
    )
    spec = r.json()
    assert "openapi" in spec, "Response missing 'openapi' field — not a valid OpenAPI spec"
    assert "paths" in spec, "OpenAPI spec has no paths — check route registration in main.py"
    assert spec["paths"], "OpenAPI spec has empty paths — no routes are registered"
