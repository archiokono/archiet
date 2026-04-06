"""Architecture Invariant Tests — generated from blueprint for Archiet — AI-Native Architecture-to-Code SaaS Platform

Enforces the three-way contract: Idea <-> Architecture <-> Code.
Each test uses AST parsing to check structural correctness — not string matching.
These tests run against source files at rest — no live server required.

Run: pytest tests/architecture/ -v
"""
import os
import pytest
from pathlib import Path

_PROJECT_ROOT = Path(__file__).parent.parent.parent
_SOURCE_FILES = {
    str(p.relative_to(_PROJECT_ROOT)): p.read_text(encoding="utf-8", errors="ignore")
    for p in _PROJECT_ROOT.rglob("*.py")
    if "test_" not in p.name
    and "__pycache__" not in str(p)
    and p.stat().st_size < 500_000
}

class TestArchitectureInvariants_archiet___ai_native_architecture_to_code_saas_platform:
    """Architectural invariants derived from Archiet — AI-Native Architecture-to-Code SaaS Platform blueprint.

    Checks use ast.parse() to verify code structure — imports, function signatures,
    and call sites — not just keyword presence in raw source text.
    """

    def test_no_hardcoded_secrets(self):
        """Baseline invariant: generated code must not contain hardcoded secrets."""
        import ast as _ast, re as _re
        secret_pattern = _re.compile(
            r'(?i)(password|secret|api_key|token)\s*=\s*["\'][^"\']{8,}["\']'
        )
        # Only flag actual assignments, not env var lookups
        violations = []
        for path, src in _SOURCE_FILES.items():
            if 'test_' in path or '.env' in path:
                continue
            try:
                tree = _ast.parse(src)
            except SyntaxError:
                continue
            for node in _ast.walk(tree):
                if isinstance(node, _ast.Assign):
                    if isinstance(node.value, _ast.Constant) and isinstance(node.value.value, str):
                        if len(node.value.value) >= 8 and secret_pattern.search(
                            _ast.unparse(node)
                        ):
                            violations.append(path)
                            break
        assert not violations, (
            f'Hardcoded secret assignments found in: {violations}. '
            'Use os.getenv() or a secrets manager instead.'
        )
