"""
AABL Compiler — ArchiMate Architecture Blueprint Language

Transforms accepted ArchiMate elements from the journey wizard (Step 3)
into an Architectural Genome YAML/dict that code generators consume.

The genome is the single intermediate representation between architecture
design and code generation. It preserves traceability (every genome field
links back to its source ArchiMateElement.id) and design rationale.

Pipeline position:
  ArchiMate elements → AABL Compiler → Genome → GenomeToBundle → DeterministicCodeGenerator → Code

Genome schema: agents/schemas/architectural_genome_schema.json
"""
import json
import logging
import re
from datetime import datetime, timezone
from typing import Any, Optional

from app import db

logger = logging.getLogger(__name__)

# Current genome schema version. Generators declare compatibility ranges.
GENOME_VERSION = "1.0.0"

# ArchiMate element types → genome mapping layer
_LAYER_MAP = {
    # Motivation layer
    "stakeholder": "motivation",
    "driver": "motivation",
    "assessment": "motivation",
    "goal": "motivation",
    "outcome": "motivation",
    "principle": "motivation",
    "requirement": "motivation",
    "constraint": "motivation",
    "meaning": "motivation",
    "value": "motivation",
    # Strategy layer
    "resource": "strategy",
    "capability": "strategy",
    "value_stream": "strategy",
    "course_of_action": "strategy",
    # Business layer
    "business_actor": "business",
    "business_role": "business",
    "business_collaboration": "business",
    "business_interface": "business",
    "business_process": "business",
    "business_function": "business",
    "business_interaction": "business",
    "business_event": "business",
    "business_service": "business",
    "business_object": "business",
    "contract": "business",
    "representation": "business",
    "product": "business",
    "location": "business",
    # Application layer
    "application_component": "application",
    "application_collaboration": "application",
    "application_interface": "application",
    "application_function": "application",
    "application_interaction": "application",
    "application_process": "application",
    "application_event": "application",
    "application_service": "application",
    "data_object": "application",
    # Technology layer
    "node": "technology",
    "device": "technology",
    "system_software": "technology",
    "technology_collaboration": "technology",
    "technology_interface": "technology",
    "path": "technology",
    "communication_network": "technology",
    "technology_function": "technology",
    "technology_process": "technology",
    "technology_interaction": "technology",
    "technology_event": "technology",
    "technology_service": "technology",
    "artifact": "technology",
    "technology_object": "technology",
    # Implementation & Migration
    "work_package": "implementation",
    "deliverable": "implementation",
    "implementation_event": "implementation",
    "plateau": "implementation",
    "gap": "implementation",
}

# Element types that become modules (bounded contexts) in the genome
_MODULE_TYPES = {"application_component", "application_service", "application_function"}

# Element types that become entities (data objects) in the genome
_ENTITY_TYPES = {"data_object", "business_object", "location", "technology_object"}

# Element types that become business rules / constraints
_RULE_TYPES = {"constraint", "requirement", "principle"}

# Element types that become state machine sources
_PROCESS_TYPES = {
    "business_process", "business_function", "application_process",
    "technology_process", "technology_interaction", "technology_event",
}

# Element types in the Motivation layer (goals, drivers, values)
_MOTIVATION_TYPES = {"meaning", "value"}

# ── Technical Capability Model ────────────────────────────────────────────────
# Maps business domain patterns and entity types to codegen capability flags.
# Used to infer cross-cutting concerns when the architect doesn't explicitly select them.
#
# Domain keywords → capabilities inferred from business domain
_DOMAIN_CAPABILITY_MAP = {
    "finance": {"audit_trail", "encryption_at_rest", "export", "mfa", "multi_tenancy"},
    "banking": {"audit_trail", "encryption_at_rest", "export", "mfa", "multi_tenancy", "notifications"},
    "insurance": {"audit_trail", "export", "file_storage", "notifications", "webhooks"},
    "healthcare": {"audit_trail", "encryption_at_rest", "mfa", "file_storage"},
    "ecommerce": {"webhooks", "notifications", "export", "search", "file_storage"},
    "retail": {"export", "search", "notifications"},
    "manufacturing": {"export", "webhooks", "audit_trail"},
    "logistics": {"webhooks", "notifications", "export", "search"},
    "hr": {"audit_trail", "export", "notifications", "file_storage", "encryption_at_rest"},
    "crm": {"search", "export", "notifications", "webhooks"},
    "erp": {"audit_trail", "export", "search", "multi_tenancy", "webhooks"},
    "saas": {"multi_tenancy", "api_keys", "webhooks", "notifications", "export"},
    "marketplace": {"multi_tenancy", "search", "notifications", "webhooks", "file_storage"},
    "government": {"audit_trail", "encryption_at_rest", "mfa", "export"},
    "education": {"notifications", "file_storage", "export"},
    "field service": {"notifications", "file_storage", "export", "search"},
}

# Entity name patterns → capabilities inferred from what entities exist
_ENTITY_CAPABILITY_MAP = {
    "user": {"notifications"},
    "order": {"audit_trail", "export", "webhooks", "notifications"},
    "invoice": {"audit_trail", "export", "notifications"},
    "payment": {"audit_trail", "encryption_at_rest", "webhooks", "notifications"},
    "document": {"file_storage", "search", "export"},
    "contract": {"audit_trail", "file_storage", "export"},
    "report": {"export"},
    "notification": {"notifications"},
    "webhook": {"webhooks"},
    "audit": {"audit_trail"},
    "tenant": {"multi_tenancy"},
    "subscription": {"webhooks", "notifications"},
    "workflow": {"audit_trail", "notifications", "webhooks"},
    "approval": {"audit_trail", "notifications"},
    "ticket": {"notifications", "search", "webhooks"},
    "message": {"notifications", "search"},
    "file": {"file_storage"},
    "attachment": {"file_storage"},
    "email": {"notifications"},
    "import": {"file_storage", "export"},
}


# ── Vendor SDK Registry ───────────────────────────────────────────────────
# Maps vendor product names (snake_case from ArchiMate element names) to SDK metadata.
# When the AABL compiler encounters a vendor-origin module, it looks up the SDK
# config here to generate a typed integration client instead of CRUD entities.
_VENDOR_SDK_MAP = {
    # Email / Notifications
    "sendgrid": {
        "protocol": "rest", "auth_method": "bearer",
        "base_url": "https://api.sendgrid.com/v3",
        "sdk_package": "@sendgrid/mail",
        "capability": "notifications",
        "operations": [
            {"name": "send_email", "method": "POST", "path": "/mail/send", "description": "Send a transactional email"},
            {"name": "list_templates", "method": "GET", "path": "/templates", "description": "List email templates"},
        ],
    },
    "mailchimp": {
        "protocol": "rest", "auth_method": "bearer",
        "base_url": "https://server.api.mailchimp.com/3.0",
        "sdk_package": "@mailchimp/mailchimp_marketing",
        "capability": "notifications",
        "operations": [
            {"name": "send_campaign", "method": "POST", "path": "/campaigns/{id}/actions/send"},
            {"name": "add_subscriber", "method": "POST", "path": "/lists/{list_id}/members"},
        ],
    },
    "twilio": {
        "protocol": "rest", "auth_method": "basic",
        "base_url": "https://api.twilio.com/2010-04-01",
        "sdk_package": "twilio",
        "capability": "notifications",
        "operations": [
            {"name": "send_sms", "method": "POST", "path": "/Accounts/{sid}/Messages.json"},
            {"name": "send_whatsapp", "method": "POST", "path": "/Accounts/{sid}/Messages.json"},
        ],
    },
    # Storage
    "aws_s3": {
        "protocol": "rest", "auth_method": "aws_sigv4",
        "base_url": "https://s3.amazonaws.com",
        "sdk_package": "boto3",
        "capability": "file_storage",
        "operations": [
            {"name": "upload_file", "method": "PUT", "path": "/{bucket}/{key}"},
            {"name": "download_file", "method": "GET", "path": "/{bucket}/{key}"},
            {"name": "delete_file", "method": "DELETE", "path": "/{bucket}/{key}"},
            {"name": "generate_presigned_url", "method": "GET", "path": "/{bucket}/{key}?presigned"},
        ],
    },
    "azure_blob_storage": {
        "protocol": "rest", "auth_method": "bearer",
        "base_url": "https://{account}.blob.core.windows.net",
        "sdk_package": "@azure/storage-blob",
        "capability": "file_storage",
        "operations": [
            {"name": "upload_blob", "method": "PUT", "path": "/{container}/{blob}"},
            {"name": "download_blob", "method": "GET", "path": "/{container}/{blob}"},
        ],
    },
    # Payment
    "stripe": {
        "protocol": "rest", "auth_method": "bearer",
        "base_url": "https://api.stripe.com/v1",
        "sdk_package": "stripe",
        "capability": "payment",
        "operations": [
            {"name": "create_payment_intent", "method": "POST", "path": "/payment_intents"},
            {"name": "create_customer", "method": "POST", "path": "/customers"},
            {"name": "list_invoices", "method": "GET", "path": "/invoices"},
            {"name": "create_subscription", "method": "POST", "path": "/subscriptions"},
        ],
    },
    # Search
    "elasticsearch": {
        "protocol": "rest", "auth_method": "basic",
        "base_url": "https://localhost:9200",
        "sdk_package": "elasticsearch",
        "capability": "search",
        "operations": [
            {"name": "index_document", "method": "POST", "path": "/{index}/_doc"},
            {"name": "search", "method": "POST", "path": "/{index}/_search"},
            {"name": "delete_document", "method": "DELETE", "path": "/{index}/_doc/{id}"},
        ],
    },
    "algolia": {
        "protocol": "rest", "auth_method": "api_key",
        "base_url": "https://{app_id}.algolia.net",
        "sdk_package": "algoliasearch",
        "capability": "search",
        "operations": [
            {"name": "save_object", "method": "POST", "path": "/1/indexes/{index}"},
            {"name": "search", "method": "POST", "path": "/1/indexes/{index}/query"},
        ],
    },
    # Auth / Identity
    "auth0": {
        "protocol": "rest", "auth_method": "bearer",
        "base_url": "https://{domain}.auth0.com",
        "sdk_package": "auth0-python",
        "capability": "auth",
        "operations": [
            {"name": "get_user", "method": "GET", "path": "/api/v2/users/{id}"},
            {"name": "create_user", "method": "POST", "path": "/api/v2/users"},
            {"name": "assign_role", "method": "POST", "path": "/api/v2/users/{id}/roles"},
        ],
    },
    "okta": {
        "protocol": "rest", "auth_method": "bearer",
        "base_url": "https://{domain}.okta.com",
        "sdk_package": "okta",
        "capability": "auth",
        "operations": [
            {"name": "get_user", "method": "GET", "path": "/api/v1/users/{id}"},
            {"name": "create_user", "method": "POST", "path": "/api/v1/users"},
        ],
    },
    # Messaging / Event Bus
    "kafka": {
        "protocol": "async", "auth_method": "sasl",
        "base_url": "localhost:9092",
        "sdk_package": "confluent-kafka",
        "capability": "event_bus",
        "operations": [
            {"name": "produce", "method": "PUBLISH", "path": "topic"},
            {"name": "consume", "method": "SUBSCRIBE", "path": "topic"},
        ],
    },
    "rabbitmq": {
        "protocol": "async", "auth_method": "basic",
        "base_url": "amqp://localhost:5672",
        "sdk_package": "pika",
        "capability": "event_bus",
        "operations": [
            {"name": "publish", "method": "PUBLISH", "path": "exchange/routing_key"},
            {"name": "consume", "method": "SUBSCRIBE", "path": "queue"},
        ],
    },
    # CRM / ERP (enterprise vendors)
    "salesforce": {
        "protocol": "rest", "auth_method": "oauth2",
        "base_url": "https://login.salesforce.com/services/data/v59.0",
        "sdk_package": "simple-salesforce",
        "operations": [
            {"name": "query", "method": "GET", "path": "/query?q={soql}"},
            {"name": "create_record", "method": "POST", "path": "/sobjects/{object}"},
            {"name": "update_record", "method": "PATCH", "path": "/sobjects/{object}/{id}"},
        ],
    },
    "sap_s4hana": {
        "protocol": "rest", "auth_method": "oauth2",
        "base_url": "https://api.sap.com/s4hana",
        "sdk_package": "@sap-cloud-sdk/core",
        "operations": [
            {"name": "get_business_partner", "method": "GET", "path": "/API_BUSINESS_PARTNER/A_BusinessPartner"},
            {"name": "create_sales_order", "method": "POST", "path": "/API_SALES_ORDER/A_SalesOrder"},
            {"name": "get_material", "method": "GET", "path": "/API_PRODUCT_SRV/A_Product"},
        ],
    },
    "dynamics_365": {
        "protocol": "rest", "auth_method": "oauth2",
        "base_url": "https://{org}.api.crm.dynamics.com/api/data/v9.2",
        "sdk_package": "@microsoft/microsoft-graph-client",
        "operations": [
            {"name": "get_account", "method": "GET", "path": "/accounts({id})"},
            {"name": "create_contact", "method": "POST", "path": "/contacts"},
            {"name": "list_opportunities", "method": "GET", "path": "/opportunities"},
        ],
    },
    # Monitoring / Observability
    "datadog": {
        "protocol": "rest", "auth_method": "api_key",
        "base_url": "https://api.datadoghq.com/api/v2",
        "sdk_package": "datadog-api-client",
        "capability": "observability",
        "operations": [
            {"name": "submit_metrics", "method": "POST", "path": "/series"},
            {"name": "create_event", "method": "POST", "path": "/events"},
        ],
    },
    # CI/CD
    "jira": {
        "protocol": "rest", "auth_method": "bearer",
        "base_url": "https://{domain}.atlassian.net/rest/api/3",
        "sdk_package": "jira",
        "operations": [
            {"name": "create_issue", "method": "POST", "path": "/issue"},
            {"name": "get_issue", "method": "GET", "path": "/issue/{key}"},
            {"name": "transition_issue", "method": "POST", "path": "/issue/{key}/transitions"},
        ],
    },
    "slack": {
        "protocol": "rest", "auth_method": "bearer",
        "base_url": "https://slack.com/api",
        "sdk_package": "@slack/web-api",
        "capability": "notifications",
        "operations": [
            {"name": "post_message", "method": "POST", "path": "/chat.postMessage"},
            {"name": "upload_file", "method": "POST", "path": "/files.upload"},
        ],
    },
}

# SQLAlchemy reserved attribute names that cannot be used as column names
_RESERVED_FIELD_NAMES = frozenset({
    "metadata", "registry", "query", "query_class",
})


def _snake_case(name: str) -> str:
    """Convert a name to snake_case for module/field keys.
    Prefixes 'entity_' if result starts with a digit.
    """
    s = re.sub(r"[^\w\s]", "", name)
    s = re.sub(r"\s+", "_", s.strip())
    s = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1_\2", s)
    s = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", s)
    result = s.lower()
    if result and result[0].isdigit():
        result = "entity_" + result
    return result


def _pascal_case(name: str) -> str:
    """Convert a name to PascalCase for entity class names.

    Handles space-delimited, snake_case, kebab-case, AND existing CamelCase input.
    "CommentData" must stay "CommentData", not degrade to "Commentdata" — Python's
    str.capitalize() lowercases everything after the first char, so we must split at
    CamelCase boundaries first.
    Strips non-alphanumeric chars and prefixes 'Entity' if result starts with a digit.
    """
    sanitized = re.sub(r"[^a-zA-Z0-9\s_\-]", "", name.strip())
    # Insert word boundaries at CamelCase transitions BEFORE splitting so that
    # "CommentData" → "Comment_Data" → ["Comment", "Data"] → "CommentData".
    sanitized = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1_\2", sanitized)
    sanitized = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", sanitized)
    parts = re.split(r"[\s_\-]+", sanitized)
    result = "".join(word.capitalize() for word in parts if word)
    if result and result[0].isdigit():
        result = "Entity" + result
    return result or "Unknown"


def _parse_json_field(value: Any) -> Any:
    """Parse a JSON string field, returning the parsed value or empty dict."""
    if isinstance(value, dict):
        return value
    if isinstance(value, str):
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return {}
    return {}


def _infer_field_type(field_name: str, field_type_hint: str = "") -> str:
    """Infer genome field type from name and optional type hint."""
    hint = field_type_hint.lower() if field_type_hint else ""
    name = field_name.lower()

    if hint in ("integer", "int", "bigint", "smallint"):
        return "integer"
    if hint in ("float", "double", "real", "numeric"):
        return "float"
    if hint in ("decimal", "money", "currency"):
        return "decimal"
    if hint in ("boolean", "bool"):
        return "boolean"
    if hint in ("datetime", "timestamp", "timestamptz"):
        return "datetime"
    if hint in ("date",):
        return "date"
    if hint in ("text", "longtext", "clob"):
        return "text"
    if hint in ("json", "jsonb"):
        return "json"
    if hint in ("uuid",):
        return "uuid"

    # Infer from field name patterns
    if name.endswith("_id") or name == "id":
        return "integer"
    if name.endswith("_at") or name.endswith("_date"):
        return "datetime"
    if name.startswith("is_") or name.startswith("has_"):
        return "boolean"
    if name in ("email",):
        return "string"
    if name in ("amount", "price", "cost", "total", "balance"):
        return "decimal"
    if name in ("count", "quantity", "qty"):
        return "integer"

    return "string"


def _infer_field_format(field_name: str, field_type: str) -> Optional[str]:
    """Infer semantic format from field name."""
    name = field_name.lower()
    if "email" in name:
        return "email"
    if "url" in name or "link" in name or "href" in name:
        return "url"
    if "phone" in name or "mobile" in name:
        return "phone"
    if field_type == "uuid":
        return "uuid"
    if field_type == "datetime":
        return "date-time"
    if field_type == "date":
        return "date"
    return None


def compile_genome(
    solution_id: int,
    language: str = "python-fastapi",
    config: Optional[dict] = None,
) -> dict:
    """
    Compile an Architectural Genome from a solution's ArchiMate elements.

    Reads accepted ArchiMate elements linked to the solution via
    SolutionArchiMateElement junctions, groups them into modules,
    extracts entities/fields/rules/state-machines, and produces
    a genome dict conforming to architectural_genome_schema.json.

    Args:
        solution_id: Solution.id to compile from.
        language: Target language for code generation.
        config: Optional overrides (security, deployment, mobile settings).

    Returns:
        Genome dict ready for validation and code generation.
    """
    from app.models.archimate_core import ArchiMateElement, ArchiMateRelationship
    from app.models.solution_models import Solution, SolutionArchiMateElement

    config = config or {}

    # Load solution
    solution = Solution.query.get(solution_id)
    if not solution:
        raise ValueError(f"Solution {solution_id} not found")

    # Load all junction records + their ArchiMate elements
    junctions = SolutionArchiMateElement.query.filter_by(
        solution_id=solution_id
    ).all()

    element_ids = [j.element_id for j in junctions if j.element_id]

    # Auto-promote: if no junctions exist but proposals do, promote them automatically.
    # This bridges the UX gap where users skip Steps 4-6 (proposal review) and go
    # straight to code generation. Proposals with promoted_element_id already have
    # a corresponding ArchiMateElement in the global catalog — we just need the junction.
    if not element_ids:
        from app.models.solution_blueprint_proposal import SolutionBlueprintProposal
        proposals = SolutionBlueprintProposal.query.filter(
            SolutionBlueprintProposal.solution_id == solution_id,
            SolutionBlueprintProposal.promoted_element_id.isnot(None),
        ).all()
        if proposals:
            logger.info(
                "Auto-promoting %d proposals to junctions for solution %d (user skipped review)",
                len(proposals), solution_id,
            )
            existing_ids = set()
            for p in proposals:
                if p.promoted_element_id in existing_ids:
                    continue
                existing_ids.add(p.promoted_element_id)
                db.session.add(SolutionArchiMateElement(
                    solution_id=solution_id,
                    element_id=p.promoted_element_id,
                    layer_type=p.archimate_type or "ApplicationComponent",
                    element_table="archimate_elements",
                    element_name=p.name,
                    element_role="auto_promoted",
                    is_new_element=True,
                ))
                # Also mark proposal as accepted
                if p.status in ("proposed", "pending"):
                    p.status = "accepted"
            db.session.flush()
            # Reload junctions after promotion
            junctions = SolutionArchiMateElement.query.filter_by(
                solution_id=solution_id
            ).all()
            element_ids = [j.element_id for j in junctions if j.element_id]

    if not element_ids:
        raise ValueError(f"Solution {solution_id} has no linked ArchiMate elements")

    # Query elements using column-safe strategy.
    # The migration freeze means ORM model columns may not exist in the DB.
    # We probe available columns first, then query only those that exist.
    from sqlalchemy import text as _text, inspect as _sa_inspect

    def _load_elements(eids):
        """Load ArchiMate elements with automatic column discovery.

        Probes the actual DB schema to determine which columns exist,
        then queries only those columns. This survives any ORM/DB drift.
        """
        # Discover actual columns in the table
        try:
            inspector = _sa_inspect(db.engine)
            db_columns = {c["name"] for c in inspector.get_columns("archimate_elements")}
        except Exception:
            db_columns = {"id", "name", "type", "layer", "description", "properties"}

        # Columns the compiler uses, in order of importance
        wanted = ["id", "name", "type", "layer", "description", "properties", "acm_properties"]
        available = [c for c in wanted if c in db_columns]

        cols = ", ".join(available)
        rows = db.session.execute(
            _text(f"SELECT {cols} FROM archimate_elements WHERE id = ANY(:ids)"),
            {"ids": eids},
        ).fetchall()

        result = {}
        for row in rows:
            class _Elem:
                pass
            e = _Elem()
            for i, col in enumerate(available):
                setattr(e, col, row[i])
            # Set defaults for columns not in the DB
            for col in wanted:
                if col not in db_columns:
                    setattr(e, col, None)
            result[e.id] = e
        return result

    elements = _load_elements(element_ids)

    # Build junction lookup: element_id → junction (for spec_data access)
    junction_map = {j.element_id: j for j in junctions if j.element_id}

    # Load relationships using the same column-safe strategy as elements
    def _load_relationships(src_ids, tgt_ids):
        try:
            inspector = _sa_inspect(db.engine)
            db_columns = {c["name"] for c in inspector.get_columns("archimate_relationships")}
        except Exception:
            db_columns = {"id", "source_id", "target_id", "type", "description"}

        wanted = ["id", "source_id", "target_id", "type", "description"]
        available = [c for c in wanted if c in db_columns]
        cols = ", ".join(available)
        rows = db.session.execute(
            _text(
                f"SELECT {cols} FROM archimate_relationships "
                f"WHERE source_id = ANY(:src_ids) AND target_id = ANY(:tgt_ids)"
            ),
            {"src_ids": src_ids, "tgt_ids": tgt_ids},
        ).fetchall()
        result = []
        for row in rows:
            class _Rel:
                pass
            r = _Rel()
            for i, col in enumerate(available):
                setattr(r, col, row[i])
            for col in wanted:
                if col not in db_columns:
                    setattr(r, col, None)
            result.append(r)
        return result

    relationships = _load_relationships(element_ids, element_ids)

    # Classify elements by type
    modules_elements = []      # ApplicationComponent etc. → become modules
    entity_elements = []       # DataObject etc. → become entities within modules
    rule_elements = []         # Constraint, Requirement → become business rules
    process_elements = []      # BusinessProcess → inform state machines
    capability_elements = []   # Capability → genome.capabilities
    other_elements = []        # Everything else

    for eid, elem in elements.items():
        # Convert PascalCase ("ApplicationComponent") and spaced ("Application Component")
        # to snake_case ("application_component") for _LAYER_MAP lookup
        _raw = (elem.type or "").replace(" ", "")
        _raw = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1_\2", _raw)
        _raw = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", _raw)
        etype = _raw.lower()
        if etype in _MODULE_TYPES:
            modules_elements.append(elem)
        elif etype in _ENTITY_TYPES:
            entity_elements.append(elem)
        elif etype in _RULE_TYPES:
            rule_elements.append(elem)
        elif etype in _PROCESS_TYPES:
            process_elements.append(elem)
        elif etype == "capability":
            capability_elements.append(elem)
        else:
            other_elements.append(elem)

    # Build relationship graph for module-entity assignment
    # Relationships tell us which data objects belong to which application components
    component_to_entities = _map_component_entities(
        modules_elements, entity_elements, relationships, elements
    )

    # Build modules
    genome_modules = {}
    archimate_sources = {}

    for comp in modules_elements:
        module_key = _snake_case(comp.name)
        entity_elems = component_to_entities.get(comp.id, [])

        # If no entities assigned via relationships, create a default entity from the component itself
        if not entity_elems:
            entity_elems = [comp]

        # Build entity field definitions from spec_data and element properties
        module_entities = []
        module_fields = {}
        aggregate_root = None

        for entity_elem in entity_elems:
            entity_name = _pascal_case(entity_elem.name)
            module_entities.append(entity_name)
            if aggregate_root is None:
                aggregate_root = entity_name

            # Extract fields from spec_data on the junction
            junction = junction_map.get(entity_elem.id)
            spec_data = _parse_json_field(junction.spec_data if junction else None)
            elem_props = _parse_json_field(entity_elem.properties)

            fields = _extract_fields(entity_elem, spec_data, elem_props)
            if fields:
                module_fields[entity_name] = fields

            archimate_sources[f"modules.{module_key}.{entity_name}"] = entity_elem.id

        # Extract state machine from related business processes
        state_machine = _extract_state_machine(
            comp, process_elements, relationships, elements
        )

        # Extract operations from element properties and spec_data
        junction = junction_map.get(comp.id)
        spec_data = _parse_json_field(junction.spec_data if junction else None)
        operations = _extract_operations(comp, spec_data, module_entities)

        # Extract sensitive fields from ACM properties
        sensitive_fields = _extract_sensitive_fields(entity_elems, junction_map)

        # Build views from entity fields
        views = _build_default_views(module_fields, aggregate_root, state_machine)

        module_def = {
            "aggregate_root": aggregate_root or _pascal_case(comp.name),
            "entities": module_entities,
            "archimate_element_ids": [comp.id] + [e.id for e in entity_elems if e.id != comp.id],
        }

        if comp.description:
            module_def["_rationale"] = comp.description

        if module_fields:
            module_def["fields"] = module_fields
        if operations:
            module_def["operations"] = operations
        if state_machine:
            module_def["state_machine"] = state_machine
        if views:
            module_def["views"] = views
        if sensitive_fields:
            module_def["sensitive_fields"] = sensitive_fields

        # Detect vendor-origin: check if the component's spec_data came from vendor_template
        _comp_junction = junction_map.get(comp.id)
        _comp_spec = _parse_json_field(_comp_junction.spec_data if _comp_junction else None)
        if _comp_spec.get("source") == "vendor_template":
            module_def["_vendor_origin"] = True
            module_def["_vendor_version"] = _comp_spec.get("version", "")

        genome_modules[module_key] = module_def
        archimate_sources[f"modules.{module_key}"] = comp.id

    # Handle orphan entities (data objects not linked to any component)
    assigned_entity_ids = set()
    for entity_list in component_to_entities.values():
        assigned_entity_ids.update(e.id for e in entity_list)

    for entity_elem in entity_elements:
        if entity_elem.id not in assigned_entity_ids:
            module_key = _snake_case(entity_elem.name)
            entity_name = _pascal_case(entity_elem.name)

            junction = junction_map.get(entity_elem.id)
            spec_data = _parse_json_field(junction.spec_data if junction else None)
            elem_props = _parse_json_field(entity_elem.properties)
            fields = _extract_fields(entity_elem, spec_data, elem_props)

            module_def = {
                "aggregate_root": entity_name,
                "entities": [entity_name],
                "archimate_element_ids": [entity_elem.id],
            }
            if fields:
                module_def["fields"] = {entity_name: fields}
            module_def["views"] = _build_default_views(
                module_def.get("fields", {}), entity_name, None
            )

            genome_modules[module_key] = module_def
            archimate_sources[f"modules.{module_key}"] = entity_elem.id

    # Build capabilities list
    capabilities = []
    for cap_elem in capability_elements:
        cap_props = _parse_json_field(cap_elem.properties)
        acm_props = _parse_json_field(getattr(cap_elem, "acm_properties", None))
        cap = {
            "id": f"cap_{cap_elem.id}",
            "name": cap_elem.name,
            "archimate_element_id": cap_elem.id,
        }
        if cap_elem.description:
            cap["description"] = cap_elem.description
        if acm_props.get("acm_domain"):
            cap["acm_domain"] = acm_props["acm_domain"]
        maturity_current = cap_props.get("maturity_current") or cap_props.get("current_maturity")
        maturity_target = cap_props.get("maturity_target") or cap_props.get("target_maturity")
        if maturity_current is not None or maturity_target is not None:
            cap["maturity"] = {}
            if maturity_current is not None:
                cap["maturity"]["current"] = int(maturity_current)
            if maturity_target is not None:
                cap["maturity"]["target"] = int(maturity_target)
        capabilities.append(cap)

    # Build problem section from solution metadata
    problem = {"statement": solution.description or solution.name or "No problem statement defined"}
    if hasattr(solution, "problem_clarification") and solution.problem_clarification:
        clarification = _parse_json_field(solution.problem_clarification)
        if isinstance(clarification, dict):
            if clarification.get("enriched_brief"):
                problem["statement"] = clarification["enriched_brief"]
            if clarification.get("success_metrics"):
                problem["success_metrics"] = clarification["success_metrics"]
            if clarification.get("constraints"):
                problem["constraints"] = clarification["constraints"]
        elif isinstance(clarification, str):
            problem["statement"] = clarification
    if solution.business_domain:
        problem["business_domain"] = solution.business_domain

    journey_state = _parse_json_field(getattr(solution, "journey_state", None))
    step1 = journey_state.get("step1", {})
    if step1.get("enriched_brief"):
        problem["statement"] = step1["enriched_brief"]

    # ── Read Step 1 structured intake data ──────────────────────────────────
    # The architect provides compliance, integration, scaling, and tech stack
    # data in Step 1 that gets saved to SolutionProblemDefinition. The compiler
    # previously ignored all of it and used hardcoded defaults.
    _problem_def = None
    _compliance = []
    _integrations_from_step1 = []
    _tech_stack = []
    _scaling = {}
    try:
        from app.models.solution_architect_models import (
            SolutionAnalysisSession,
            SolutionProblemDefinition,
            SolutionRequirement,
            RequirementType,
        )
        _session = SolutionAnalysisSession.query.filter(
            SolutionAnalysisSession.name.like(f"%Solution {solution_id}%")
        ).first()
        if _session:
            _problem_def = _session.problem_definition
        if _problem_def:
            _compliance = _problem_def.compliance_requirements or []
            _integrations_from_step1 = _problem_def.integration_requirements or []
            _tech_stack = _problem_def.existing_technology_stack or []
            if _problem_def.user_count:
                _scaling["user_count"] = _problem_def.user_count
            if _problem_def.transaction_volume:
                _scaling["transaction_volume"] = _problem_def.transaction_volume
            if _problem_def.data_volume_gb:
                _scaling["data_volume_gb"] = _problem_def.data_volume_gb
            if _problem_def.organization_size:
                _scaling["organization_size"] = _problem_def.organization_size

        # Read NFR requirements linked to this solution
        _nfr_requirements = SolutionRequirement.query.filter_by(
            solution_id=solution_id,
        ).all()
        if not _nfr_requirements and _problem_def:
            _nfr_requirements = SolutionRequirement.query.filter_by(
                problem_id=_problem_def.id,
            ).all()
    except Exception as _step1_err:
        logger.debug("Could not read Step 1 data: %s", _step1_err)
        _nfr_requirements = []

    # ── Infer capabilities from Step 1 data ───────────────────────────────
    # Compliance frameworks → security flags
    _compliance_lower = [c.lower() if isinstance(c, str) else "" for c in _compliance]
    _needs_encryption = any(f in c for c in _compliance_lower for f in ("gdpr", "hipaa", "pci", "sox", "iso 27001"))
    _needs_audit = any(f in c for c in _compliance_lower for f in ("gdpr", "hipaa", "sox", "iso", "audit"))
    _needs_mfa = any(f in c for c in _compliance_lower for f in ("hipaa", "pci", "nist", "iso 27001"))

    # Integration systems → integration stubs
    _integration_keywords = {
        "sap": {"protocol": "rest", "auth": "oauth2", "base_url": "https://api.sap.com"},
        "salesforce": {"protocol": "rest", "auth": "oauth2", "base_url": "https://login.salesforce.com"},
        "servicenow": {"protocol": "rest", "auth": "basic", "base_url": "https://instance.service-now.com"},
        "jira": {"protocol": "rest", "auth": "bearer", "base_url": "https://jira.atlassian.net"},
        "slack": {"protocol": "rest", "auth": "bearer", "base_url": "https://slack.com/api"},
        "kafka": {"protocol": "async", "auth": "none"},
        "rabbitmq": {"protocol": "async", "auth": "basic"},
        "email": {"protocol": "smtp", "auth": "basic"},
    }

    # Tech stack → infrastructure overrides
    _stack_lower = [t.lower() if isinstance(t, str) else "" for t in _tech_stack]
    _inferred_db = "postgresql"  # default
    for t in _stack_lower:
        if "mysql" in t:
            _inferred_db = "mysql"
        elif "mongodb" in t or "mongo" in t:
            _inferred_db = "mongodb"
        elif "oracle" in t:
            _inferred_db = "oracle"
    _inferred_cache = "none"
    for t in _stack_lower:
        if "redis" in t:
            _inferred_cache = "redis"
        elif "memcache" in t:
            _inferred_cache = "memcached"
    _inferred_search = "none"
    for t in _stack_lower:
        if "elastic" in t:
            _inferred_search = "elasticsearch"
    _inferred_bus = "none"
    for t in _stack_lower:
        if "kafka" in t:
            _inferred_bus = "kafka"
        elif "rabbit" in t or "amqp" in t:
            _inferred_bus = "rabbitmq"

    # Scaling → rate limiting + multi-tenancy inference
    _high_scale = _scaling.get("user_count", 0) > 1000 or _scaling.get("transaction_volume", 0) > 10000
    _is_multi_org = _scaling.get("organization_size") in ("enterprise", "midmarket")

    # NFR requirements → genome flags
    _nfr_flags_from_reqs = set()
    for req in (_nfr_requirements or []):
        name_lower = (req.name or "").lower()
        desc_lower = (req.description or "").lower()
        combined = name_lower + " " + desc_lower
        if "audit" in combined:
            _nfr_flags_from_reqs.add("audit_trail")
        if "multi-tenant" in combined or "multi tenant" in combined or "tenancy" in combined:
            _nfr_flags_from_reqs.add("multi_tenancy")
        if "rate limit" in combined or "throttl" in combined:
            _nfr_flags_from_reqs.add("rate_limiting")
        if "encrypt" in combined:
            _nfr_flags_from_reqs.add("encryption_at_rest")
        if "api key" in combined:
            _nfr_flags_from_reqs.add("api_keys")
        if "mfa" in combined or "multi-factor" in combined or "two-factor" in combined or "2fa" in combined:
            _nfr_flags_from_reqs.add("mfa")
        if "webhook" in combined or "event" in combined:
            _nfr_flags_from_reqs.add("webhooks")
        if "search" in combined or "full-text" in combined:
            _nfr_flags_from_reqs.add("search")
        if "file" in combined and ("upload" in combined or "storage" in combined or "attachment" in combined):
            _nfr_flags_from_reqs.add("file_storage")
        if "email" in combined or "notification" in combined:
            _nfr_flags_from_reqs.add("notifications")
        if "export" in combined or "csv" in combined or "pdf" in combined:
            _nfr_flags_from_reqs.add("export")

    # ── Infer capabilities from domain + entity names ────────────────────────
    _domain = (solution.business_domain or "").lower()
    for domain_key, domain_caps in _DOMAIN_CAPABILITY_MAP.items():
        if domain_key in _domain:
            _nfr_flags_from_reqs.update(domain_caps)

    for module_key, module_def in genome_modules.items():
        for entity_name in module_def.get("entities", []):
            entity_lower = entity_name.lower()
            for pattern, entity_caps in _ENTITY_CAPABILITY_MAP.items():
                if pattern in entity_lower:
                    _nfr_flags_from_reqs.update(entity_caps)

    # ── Read journey_state capabilities if architect explicitly selected them ─
    _journey_caps = journey_state.get("codegenCaps", {}) or journey_state.get("capabilities", {})
    _vendor_selections = {}  # capability → vendor_key (e.g. "notifications" → "sendgrid")
    if isinstance(_journey_caps, dict):
        for cap_key, cap_val in _journey_caps.items():
            if cap_key.startswith("vendor_") and cap_val:
                # vendor_notifications = "sendgrid" → route to vendor SDK
                real_cap = cap_key[len("vendor_"):]
                _vendor_selections[real_cap] = cap_val
            elif cap_key == "auth_type":
                continue  # handled separately
            elif cap_val:  # truthy = architect enabled this capability
                _nfr_flags_from_reqs.add(cap_key)

    # Build infrastructure section (Step 1 data overrides defaults)
    infrastructure = {
        "database": config.get("database", _inferred_db),
        "auth": config.get("auth", "jwt_local"),
        "observability": config.get("observability", "opentelemetry"),
        "cache": config.get("cache", _inferred_cache),
        "search": config.get("search", _inferred_search),
        "event_bus": config.get("event_bus", _inferred_bus),
    }
    if _scaling:
        infrastructure["scaling"] = _scaling

    # Build security section (Step 1 compliance + NFRs override defaults)
    security = {
        "mfa": config.get("mfa", "required_for_admin" if (_needs_mfa or "mfa" in _nfr_flags_from_reqs) else "none"),
        "api_keys": config.get("api_keys", "api_keys" in _nfr_flags_from_reqs),
        "encryption_at_rest": config.get("encryption_at_rest", _needs_encryption or "encryption_at_rest" in _nfr_flags_from_reqs),
        "multi_tenancy": config.get("multi_tenancy", _is_multi_org or "multi_tenancy" in _nfr_flags_from_reqs),
    }
    if _high_scale or "rate_limiting" in _nfr_flags_from_reqs or config.get("rate_limiting"):
        security["rate_limiting"] = config.get("rate_limiting") or {"default": "100/min", "authenticated": "1000/min"}
    if _compliance:
        security["compliance"] = _compliance

    # Build deployment section
    deployment = {
        "target": config.get("deployment_target", "docker_compose"),
        "environments": config.get("environments", ["staging", "production"]),
    }
    ci_cd_provider = config.get("ci_cd_provider", "github_actions")
    if ci_cd_provider != "none":
        deployment["ci_cd"] = {
            "provider": ci_cd_provider,
            "registry": config.get("ci_cd_registry", "ghcr"),
        }

    # Build identity provider section
    idp = {}
    idp_config = config.get("identity_provider", {})
    if idp_config:
        idp = idp_config
    elif infrastructure["auth"] == "keycloak":
        idp = {
            "type": "oidc",
            "preset": "keycloak",
            "roles": config.get("roles", ["admin", "user", "viewer"]),
        }
    else:
        idp = {
            "type": "jwt-local",
            "roles": config.get("roles", ["admin", "user", "viewer"]),
        }

    # ── Build integrations from Step 1 data ─────────────────────────────────
    integrations = {}
    for sys_entry in _integrations_from_step1:
        # Step 1 picker stores {id, name} dicts; also accept plain strings
        if isinstance(sys_entry, dict):
            sys_name = sys_entry.get("name", "")
        elif isinstance(sys_entry, str):
            sys_name = sys_entry
        else:
            continue
        if not sys_name:
            continue
        sys_lower = sys_name.lower().strip()
        matched = None
        for keyword, template in _integration_keywords.items():
            if keyword in sys_lower:
                matched = template
                break
        integ_key = re.sub(r"[^a-z0-9]", "_", sys_lower).strip("_")
        integrations[integ_key] = {
            "name": sys_name,
            "protocol": (matched or {}).get("protocol", "rest"),
            "auth_method": (matched or {}).get("auth", "bearer"),
            "base_url": (matched or {}).get("base_url", f"https://api.{integ_key}.example.com"),
            "description": f"Integration with {sys_name} (from Step 1 requirements)",
        }

    # ── Extract vendor-origin modules → integrations ─────────────────────
    # Modules marked _vendor_origin should become typed integration clients,
    # not CRUD entities. Move them from genome_modules to integrations.
    _vendor_modules_to_remove = []
    for mod_key, mod_def in genome_modules.items():
        if mod_def.get("_vendor_origin"):
            vendor_name = mod_def.get("aggregate_root", mod_key)
            # Check if we have SDK metadata for this vendor
            _sdk = _VENDOR_SDK_MAP.get(mod_key) or _VENDOR_SDK_MAP.get(vendor_name.lower())
            if _sdk:
                integrations[mod_key] = {
                    "name": vendor_name,
                    "protocol": _sdk.get("protocol", "rest"),
                    "auth_method": _sdk.get("auth_method", "bearer"),
                    "base_url": _sdk.get("base_url", ""),
                    "sdk_package": _sdk.get("sdk_package", ""),
                    "operations": _sdk.get("operations", []),
                    "description": f"Integration with {vendor_name} (from vendor template)",
                    "_vendor_origin": True,
                }
            else:
                integrations[mod_key] = {
                    "name": vendor_name,
                    "protocol": "rest",
                    "auth_method": "bearer",
                    "base_url": f"https://api.{mod_key.replace('_', '-')}.example.com",
                    "description": f"Integration with {vendor_name} (vendor-linked)",
                    "_vendor_origin": True,
                }
            _vendor_modules_to_remove.append(mod_key)
    for mod_key in _vendor_modules_to_remove:
        del genome_modules[mod_key]

    # ── Add architect-selected vendor integrations from Step 3 panel ──────
    for cap_name, vendor_key in _vendor_selections.items():
        if vendor_key in _VENDOR_SDK_MAP and vendor_key not in integrations:
            sdk = _VENDOR_SDK_MAP[vendor_key]
            integrations[vendor_key] = {
                "name": vendor_key.replace("_", " ").title(),
                "protocol": sdk.get("protocol", "rest"),
                "auth_method": sdk.get("auth_method", "bearer"),
                "base_url": sdk.get("base_url", ""),
                "sdk_package": sdk.get("sdk_package", ""),
                "operations": sdk.get("operations", []),
                "description": f"{vendor_key.replace('_', ' ').title()} — selected for {cap_name} capability",
                "_vendor_origin": True,
                "_capability": cap_name,
            }

    # ── Build webhooks config from NFR flags ──────────────────────────────
    webhooks = {}
    if "webhooks" in _nfr_flags_from_reqs or config.get("webhooks_enabled"):
        webhooks = {
            "enabled": True,
            "delivery": {
                "retry_attempts": 3,
                "retry_backoff": "exponential",
            },
            "subscriptions": [],
        }

    # Assemble genome
    genome = {
        "genome_version": GENOME_VERSION,
        "solution_id": solution_id,
        "solution_name": solution.name or f"Solution {solution_id}",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "language": language,
        "problem": problem,
        "modules": genome_modules,
        "infrastructure": infrastructure,
        "security": security,
        "deployment": deployment,
        "identity_provider": idp,
        "_archimate_sources": archimate_sources,
    }

    if capabilities:
        genome["capabilities"] = capabilities
    if integrations:
        genome["integrations"] = integrations
    if webhooks:
        genome["webhooks"] = webhooks

    # Inferred capability flags — these drive conditional template rendering
    genome["_inferred_capabilities"] = sorted(_nfr_flags_from_reqs)

    # Optional sections from config
    if config.get("mobile"):
        genome["mobile"] = config["mobile"]
    if config.get("compliance"):
        genome["compliance"] = config["compliance"]

    return genome


def _map_component_entities(
    components: list,
    entities: list,
    relationships: list,
    elements_by_id: dict,
) -> dict:
    """Map application components to their data object entities via relationships.

    Uses ArchiMate relationships (access, association, composition, aggregation)
    to determine which data objects belong to which application components.

    Returns: {component_id: [entity_elements]}
    """
    result = {comp.id: [] for comp in components}
    entity_id_set = {e.id for e in entities}
    component_id_set = {c.id for c in components}

    for rel in relationships:
        src_id = rel.source_id
        tgt_id = rel.target_id

        # Component → Entity relationship
        if src_id in component_id_set and tgt_id in entity_id_set:
            entity_elem = elements_by_id.get(tgt_id)
            if entity_elem and entity_elem not in result[src_id]:
                result[src_id].append(entity_elem)

        # Entity → Component relationship (reverse direction)
        if tgt_id in component_id_set and src_id in entity_id_set:
            entity_elem = elements_by_id.get(src_id)
            if entity_elem and entity_elem not in result[tgt_id]:
                result[tgt_id].append(entity_elem)

    return result


def _extract_fields(element, spec_data: dict, elem_props: dict) -> list:
    """Extract field definitions from an element's spec_data and properties.

    Looks in multiple locations (spec_data.fields, properties.attributes,
    acm_properties) and normalizes to genome FieldDef format.
    """
    fields = []
    seen_names = set()

    # Source 1: spec_data.fields (highest priority — confirmed by architect)
    for field_def in spec_data.get("fields", []):
        name = field_def.get("name")
        if not name or name in seen_names:
            continue
        seen_names.add(name)

        ftype = _infer_field_type(name, field_def.get("type", ""))
        safe_name = _snake_case(name)
        if safe_name in _RESERVED_FIELD_NAMES:
            safe_name = f"{safe_name}_value"
        field = {
            "name": safe_name,
            "type": ftype,
        }
        fmt = _infer_field_format(name, ftype)
        if fmt:
            field["format"] = fmt
        if field_def.get("required") is not None:
            field["required"] = bool(field_def["required"])
        if field_def.get("unique"):
            field["unique"] = True
        if field_def.get("max_length"):
            field["max_length"] = int(field_def["max_length"])
        if field_def.get("description"):
            field["description"] = field_def["description"]
        if field_def.get("enum_values"):
            field["enum_values"] = field_def["enum_values"]
            field["type"] = "enum"
        if field_def.get("foreign_key"):
            field["foreign_key"] = field_def["foreign_key"]
        if field_def.get("default_value") is not None:
            field["default_value"] = field_def["default_value"]
        fields.append(field)

    # Source 2: properties.attributes (from ArchiMate element properties)
    for attr in elem_props.get("attributes", []):
        name = attr.get("name") or attr.get("key")
        if not name or name in seen_names:
            continue
        seen_names.add(name)

        ftype = _infer_field_type(name, attr.get("type", ""))
        safe_name = _snake_case(name)
        if safe_name in _RESERVED_FIELD_NAMES:
            safe_name = f"{safe_name}_value"
        field = {
            "name": safe_name,
            "type": ftype,
        }
        fmt = _infer_field_format(name, ftype)
        if fmt:
            field["format"] = fmt
        if attr.get("description"):
            field["description"] = attr["description"]
        fields.append(field)

    # Source 3: Infer default fields when no spec_data or properties exist.
    # Produces a minimal but functional CRUD scaffold from the entity name alone.
    if not fields:
        fields = _infer_default_fields(element)

    return fields


def _infer_default_fields(element) -> list:
    """Generate sensible default fields for an entity with no spec_data.

    Uses the element name and type to produce a minimal field set that
    generates a functional CRUD scaffold. Every entity gets: name,
    description, status, created_at, updated_at. DataObjects additionally
    get type-specific fields inferred from common domain patterns.
    """
    entity_name = _snake_case(element.name) if element.name else "entity"
    etype = (element.type or "").lower()

    fields = [
        {"name": "name", "type": "string", "required": True, "max_length": 255},
        {"name": "description", "type": "text", "required": False},
        {"name": "status", "type": "enum", "enum_values": ["active", "inactive", "archived"],
         "required": True, "default_value": "active"},
        {"name": "created_at", "type": "datetime", "required": False},
        {"name": "updated_at", "type": "datetime", "required": False},
    ]

    # Add domain-specific fields based on name patterns
    name_lower = entity_name.lower()

    if any(kw in name_lower for kw in ("order", "transaction", "invoice", "payment", "ledger")):
        fields.insert(2, {"name": "amount", "type": "decimal", "required": False})
        fields.insert(3, {"name": "currency", "type": "string", "max_length": 3, "default_value": "GBP"})
        fields.insert(4, {"name": "reference_number", "type": "string", "max_length": 50})

    elif any(kw in name_lower for kw in ("user", "person", "contact", "stakeholder", "vendor", "customer")):
        fields.insert(2, {"name": "email", "type": "string", "format": "email", "max_length": 255})
        fields.insert(3, {"name": "phone", "type": "string", "format": "phone", "max_length": 20})
        fields.insert(4, {"name": "organization", "type": "string", "max_length": 255})

    elif any(kw in name_lower for kw in ("document", "contract", "tender", "report")):
        fields.insert(2, {"name": "title", "type": "string", "max_length": 500})
        fields.insert(3, {"name": "document_type", "type": "string", "max_length": 50})
        fields.insert(4, {"name": "effective_date", "type": "datetime"})
        fields.insert(5, {"name": "expiry_date", "type": "datetime"})

    elif any(kw in name_lower for kw in ("kpi", "metric", "score", "analytics")):
        fields.insert(2, {"name": "metric_name", "type": "string", "max_length": 100, "required": True})
        fields.insert(3, {"name": "value", "type": "decimal"})
        fields.insert(4, {"name": "target", "type": "decimal"})
        fields.insert(5, {"name": "unit", "type": "string", "max_length": 20})
        fields.insert(6, {"name": "measured_at", "type": "datetime"})

    elif any(kw in name_lower for kw in ("workflow", "process", "approval")):
        fields.insert(2, {"name": "assignee", "type": "string", "max_length": 255})
        fields.insert(3, {"name": "priority", "type": "enum", "enum_values": ["low", "medium", "high", "critical"]})
        fields.insert(4, {"name": "due_date", "type": "datetime"})

    elif any(kw in name_lower for kw in ("service", "api", "integration", "gateway")):
        fields.insert(2, {"name": "endpoint_url", "type": "string", "format": "url", "max_length": 500})
        fields.insert(3, {"name": "service_type", "type": "string", "max_length": 50})
        fields.insert(4, {"name": "version", "type": "string", "max_length": 20})

    elif any(kw in name_lower for kw in ("store", "database", "repository", "cache")):
        fields.insert(2, {"name": "storage_type", "type": "string", "max_length": 50})
        fields.insert(3, {"name": "capacity", "type": "string", "max_length": 50})
        fields.insert(4, {"name": "connection_string", "type": "string", "max_length": 500,
                          "description": "Sensitive: encrypted at rest"})

    return fields


def _extract_state_machine(
    component,
    process_elements: list,
    relationships: list,
    elements_by_id: dict,
) -> Optional[dict]:
    """Extract a state machine definition from related business processes.

    Looks for BusinessProcess elements linked to the component that
    describe state transitions (status-based workflows).
    """
    # Find processes related to this component
    component_id = component.id
    related_process_ids = set()
    for rel in relationships:
        if rel.source_id == component_id and rel.target_id in {p.id for p in process_elements}:
            related_process_ids.add(rel.target_id)
        if rel.target_id == component_id and rel.source_id in {p.id for p in process_elements}:
            related_process_ids.add(rel.source_id)

    if not related_process_ids:
        return None

    # Analyze process elements for state machine patterns
    states = []
    transitions = []

    for pid in related_process_ids:
        proc = elements_by_id.get(pid)
        if not proc:
            continue

        props = _parse_json_field(proc.properties)

        # Check for explicit state machine in properties
        sm = props.get("state_machine") or props.get("states")
        if isinstance(sm, dict) and "states" in sm:
            return sm  # Already well-formed

        if isinstance(sm, list):
            states.extend(sm)

        # Check for transitions in properties
        trans = props.get("transitions")
        if isinstance(trans, list):
            transitions.extend(trans)

    if not states and not transitions:
        # No explicit state machine — infer from process context.
        # If related processes exist, the entity likely has a lifecycle.
        # Generate a domain-appropriate default state machine.
        if related_process_ids:
            states, transitions = _infer_lifecycle_states(
                component, [elements_by_id.get(pid) for pid in related_process_ids if elements_by_id.get(pid)]
            )

    if not states and not transitions:
        return None

    # Deduplicate states
    seen = set()
    unique_states = []
    for s in states:
        s_str = s if isinstance(s, str) else str(s)
        if s_str not in seen:
            seen.add(s_str)
            unique_states.append(s_str)

    if len(unique_states) < 2:
        return None

    # Infer the actual status field name from the component's data entities.
    # Many domain models use verification_status, account_status, kyc_status, etc.
    # rather than a plain "status" column.
    status_field = "status"
    comp_name_lower = (component.name or "").lower().replace(" ", "_")
    for entity_elem in (elements_by_id.get(eid) for eid in elements_by_id):
        if entity_elem is None:
            continue
        props = _parse_json_field(getattr(entity_elem, "properties", None))
        if not isinstance(props, dict):
            continue
        for field_def in (props.get("fields") or props.get("attributes") or []):
            fname = (field_def.get("name", "") if isinstance(field_def, dict) else str(field_def)).lower()
            if fname.endswith("_status") or fname.endswith("_state"):
                # Prefer a status field that matches the component's domain
                status_field = fname
                break
        if status_field != "status":
            break

    result = {
        "field": status_field,
        "states": unique_states,
        "initial_state": unique_states[0],
    }
    if transitions:
        result["transitions"] = transitions

    return result


def _infer_lifecycle_states(component, processes: list) -> tuple:
    """Infer lifecycle state machine from related business processes.

    When no explicit state machine is defined, generates a reasonable default
    based on the domain context (process names and descriptions). The architect
    can override this in the genome YAML.

    Returns (states, transitions) tuple.
    """
    # Analyze process names and descriptions for domain signals
    all_text = " ".join(
        f"{(p.name or '')} {(p.description or '')}" for p in processes
    ).lower()

    # Domain-specific lifecycle patterns
    if any(kw in all_text for kw in ["kyc", "verification", "identity", "compliance", "screening"]):
        states = ["submitted", "documents_uploaded", "under_review", "verified", "rejected", "expired"]
        transitions = [
            {"from": "submitted", "to": "documents_uploaded", "trigger": "upload_documents"},
            {"from": "documents_uploaded", "to": "under_review", "trigger": "start_review"},
            {"from": "under_review", "to": "verified", "trigger": "approve"},
            {"from": "under_review", "to": "rejected", "trigger": "reject"},
            {"from": ["submitted", "documents_uploaded"], "to": "expired", "trigger": "expire"},
        ]
    elif any(kw in all_text for kw in ["account creation", "onboarding", "registration"]):
        states = ["initiated", "identity_verified", "compliance_cleared", "account_created", "active", "suspended"]
        transitions = [
            {"from": "initiated", "to": "identity_verified", "trigger": "verify_identity"},
            {"from": "identity_verified", "to": "compliance_cleared", "trigger": "clear_compliance"},
            {"from": "compliance_cleared", "to": "account_created", "trigger": "create_account"},
            {"from": "account_created", "to": "active", "trigger": "activate"},
            {"from": "active", "to": "suspended", "trigger": "suspend"},
        ]
    elif any(kw in all_text for kw in ["fraud", "risk", "scoring", "assessment"]):
        states = ["pending", "analyzing", "low_risk", "medium_risk", "high_risk", "escalated"]
        transitions = [
            {"from": "pending", "to": "analyzing", "trigger": "start_analysis"},
            {"from": "analyzing", "to": "low_risk", "trigger": "classify_low"},
            {"from": "analyzing", "to": "medium_risk", "trigger": "classify_medium"},
            {"from": "analyzing", "to": "high_risk", "trigger": "classify_high"},
            {"from": "high_risk", "to": "escalated", "trigger": "escalate"},
        ]
    elif any(kw in all_text for kw in ["migration", "import", "transfer", "sync"]):
        states = ["queued", "in_progress", "validating", "completed", "failed"]
        transitions = [
            {"from": "queued", "to": "in_progress", "trigger": "start"},
            {"from": "in_progress", "to": "validating", "trigger": "validate"},
            {"from": "validating", "to": "completed", "trigger": "complete"},
            {"from": ["in_progress", "validating"], "to": "failed", "trigger": "fail"},
            {"from": "failed", "to": "queued", "trigger": "retry"},
        ]
    else:
        # Generic CRUD entity lifecycle
        states = ["draft", "active", "archived"]
        transitions = [
            {"from": "draft", "to": "active", "trigger": "activate"},
            {"from": "active", "to": "archived", "trigger": "archive"},
            {"from": "archived", "to": "active", "trigger": "restore"},
        ]

    return states, transitions


def _extract_operations(component, spec_data: dict, entity_names: list) -> dict:
    """Extract operations (commands/queries) from spec_data and element metadata."""
    operations = {}

    # From spec_data.api_contract
    api_contract = spec_data.get("api_contract", {})
    for endpoint in api_contract.get("endpoints", []):
        op_id = endpoint.get("operation_id") or endpoint.get("name")
        if not op_id:
            continue
        method = (endpoint.get("method") or "GET").upper()
        op_type = "command" if method in ("POST", "PUT", "PATCH", "DELETE") else "query"
        op = {"type": op_type}
        if endpoint.get("description"):
            op["description"] = endpoint["description"]
        if endpoint.get("authorization"):
            op["authorization"] = endpoint["authorization"]
        operations[_snake_case(op_id)] = op

    # Default CRUD operations if none specified
    if not operations and entity_names:
        root = entity_names[0]
        root_snake = _snake_case(root)
        operations = {
            f"create_{root_snake}": {"type": "command", "input": f"{root}Draft", "output": f"{root}Id"},
            f"get_{root_snake}": {"type": "query", "input": f"{root}Id", "output": f"{root}Detail"},
            f"list_{root_snake}s": {"type": "query", "output": f"Page<{root}Summary>"},
            f"update_{root_snake}": {"type": "command", "input": f"{root}Update", "output": f"{root}Detail"},
            f"delete_{root_snake}": {"type": "command", "input": f"{root}Id"},
        }

    return operations


def _extract_sensitive_fields(entity_elements: list, junction_map: dict) -> list:
    """Extract sensitivity annotations from element ACM properties."""
    sensitive = []
    for elem in entity_elements:
        acm_props = _parse_json_field(getattr(elem, "acm_properties", None))
        for field_annotation in acm_props.get("sensitive_fields", []):
            field_name = field_annotation.get("field")
            level = field_annotation.get("level", "pii")
            if field_name:
                sensitive.append({
                    "field": f"{_pascal_case(elem.name)}.{_snake_case(field_name)}",
                    "level": level,
                })
    return sensitive


def _build_default_views(fields_by_entity: dict, aggregate_root: str, state_machine: Optional[dict]) -> dict:
    """Build default list/detail/create view definitions from entity fields."""
    views = {}

    if not aggregate_root or not fields_by_entity:
        return views

    root_fields = fields_by_entity.get(aggregate_root, [])
    field_names = [f["name"] for f in root_fields]

    if field_names:
        # List view: show first 5 fields + status if state machine
        list_columns = field_names[:5]
        if state_machine and state_machine.get("field") not in list_columns:
            list_columns.append(state_machine["field"])
        views["list"] = {
            "columns": list_columns,
            "default_sort": {"field": field_names[0], "dir": "desc"},
        }

        # Filters: status (if state machine) + any enum/boolean fields
        filters = []
        if state_machine:
            filters.append(state_machine["field"])
        for f in root_fields:
            if f.get("type") in ("enum", "boolean") and f["name"] not in filters:
                filters.append(f["name"])
        if filters:
            views["list"]["filters"] = filters[:5]

        # Actions: default CRUD + state machine triggers
        actions = ["view", "edit", "delete"]
        if state_machine:
            triggers = [t.get("trigger") for t in state_machine.get("transitions", []) if t.get("trigger")]
            actions.extend(triggers[:3])
        views["list"]["actions"] = actions

        # Detail view
        views["detail"] = {"sections": ["summary", "details", "history"]}

        # Create view: required fields only
        create_fields = [f["name"] for f in root_fields if f.get("required", True)]
        if create_fields:
            views["create"] = {"fields": create_fields}

    return views
