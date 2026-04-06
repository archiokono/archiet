# Archiet — AI-Native Architecture-to-Code SaaS Platform

> Generated from ArchiMate 3.2 architecture by A.R.C.H.I.E. · Blueprint v1



## Tech Stack

- **Framework:** Flask (Python 3.12)
- **Database:** PostgreSQL + Flask-SQLAlchemy + Marshmallow
- **Auth:** jwt-local (JWT — symmetric secret, HS256)
- **Container:** Docker + docker-compose
- **Domain:** technology



## Quick Start

```bash
docker compose up --build
```

API available at `http://localhost:5000`
Swagger UI at `http://localhost:5000/apidocs` (Flasgger)


---





## Data Model


### Corebusinessentity

Primary data entity (architect names this)

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| `id` | `integer` | no |  |
| `core_business_entity_code` | `string` | no |  |
| `name` | `string` | no |  |
| `description` | `string` | no |  |
| `status` | `enum` | no |  |
| `owner_id` | `integer` | no |  |
| `metadata` | `object` | no |  |
| `created_at` | `datetime` | no |  |
| `updated_at` | `datetime` | no |  |




### KeymetricsandKPIs

Business outcomes measured by the solution

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| `id` | `integer` | no |  |
| `key_metrics_and_kpis_code` | `string` | no |  |
| `name` | `string` | no |  |
| `description` | `string` | no |  |
| `status` | `enum` | no |  |
| `owner_id` | `integer` | no |  |
| `metadata` | `object` | no |  |
| `created_at` | `datetime` | no |  |
| `updated_at` | `datetime` | no |  |




### Analyticsdatastore

Data warehouse or lake for analytics workloads

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| `id` | `integer` | no |  |
| `line_1` | `string` | no |  |
| `line_2` | `string` | no |  |
| `city` | `string` | no |  |
| `postcode` | `string` | no |  |
| `country` | `string` | no |  |
| `latitude` | `number` | no |  |
| `longitude` | `number` | no |  |
| `created_at` | `datetime` | no |  |




### WorkspaceData

All workspace-scoped data with row-level isolation including blueprints, users, and usage metrics

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| `id` | `integer` | no |  |
| `workspace_data_code` | `string` | no |  |
| `name` | `string` | no |  |
| `description` | `string` | no |  |
| `status` | `enum` | no |  |
| `owner_id` | `integer` | no |  |
| `metadata` | `object` | no |  |
| `created_at` | `datetime` | no |  |
| `updated_at` | `datetime` | no |  |




### JourneySessionConversations

JSON storage of AI conversation history for each step of the architecture generation process

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| `id` | `integer` | no |  |
| `title` | `string` | no |  |
| `file_path` | `string` | no |  |
| `mime_type` | `string` | no |  |
| `file_size_bytes` | `integer` | no |  |
| `owner_id` | `integer` | no |  |
| `is_public` | `boolean` | no |  |
| `tags` | `array` | no |  |
| `uploaded_at` | `datetime` | no |  |
| `updated_at` | `datetime` | no |  |




### GenomeSpecDefinitions

JSON specifications containing entity definitions, relationship maps, and architecture patterns

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| `id` | `integer` | no |  |
| `genomespec_definitions_code` | `string` | no |  |
| `name` | `string` | no |  |
| `description` | `string` | no |  |
| `status` | `enum` | no |  |
| `owner_id` | `integer` | no |  |
| `metadata` | `object` | no |  |
| `created_at` | `datetime` | no |  |
| `updated_at` | `datetime` | no |  |




### GeneratedCodeArtifacts

Generated codebases stored as downloadable artifacts with compliance documentation

| Field | Type | Nullable | Notes |
|-------|------|----------|-------|
| `id` | `integer` | no |  |
| `event_type` | `string` | no |  |
| `entity_type` | `string` | no |  |
| `entity_id` | `integer` | no |  |
| `actor_id` | `integer` | no |  |
| `before_state` | `object` | no |  |
| `after_state` | `object` | no |  |
| `ip_address` | `string` | no |  |
| `occurred_at` | `datetime` | no |  |





## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `` | `` | Primary business service |
| `` | `` | Release management |
| `` | `` | Incident response |


## Project Structure

```
.env.example
.github/workflows/deploy.yml
.gitignore
ARCHITECTURE.md
CLAUDE.md
Dockerfile
GENERATED.md
Makefile
README.md
app/__init__.py
app/blueprints/activedirectoryad_bp.py
app/blueprints/aiarchitectureengine_bp.py
app/blueprints/analyticsdatastore_bp.py
app/blueprints/analyticsengine_bp.py
app/blueprints/apigateway_bp.py
app/blueprints/architecturetemplategallery_bp.py
app/blueprints/auth_bp.py
app/blueprints/authenticationservice_bp.py
app/blueprints/blueprintjourneyinterface_bp.py
app/blueprints/blueprintpublicviewer_bp.py
app/blueprints/businesslogiclayer_bp.py
app/blueprints/cicdpipeline_bp.py
app/blueprints/cicdtoolchain_bp.py
app/blueprints/codegenerationservice_bp.py
app/blueprints/corebusiness_bp.py
app/blueprints/corebusinessapi_bp.py
app/blueprints/corebusinessfunction_bp.py
app/blueprints/exportservice_bp.py
app/blueprints/frontendapplication_bp.py
app/blueprints/gcpcohesityforsystemsbackup_bp.py
app/blueprints/gdprcomplianceservice_bp.py
app/blueprints/generatedcodeartifacts_bp.py
app/blueprints/genomespecdefinitions_bp.py
app/blueprints/genomespecgenerator_bp.py
app/blueprints/githubintegrationservice_bp.py
app/blueprints/googlegeminimodels_bp.py
app/blueprints/healthmonitoring_bp.py
app/blueprints/identityandaccessmanagement_bp.py
app/blueprints/journeysessionconversations_bp.py
app/blueprints/journeysessionorchestrator_bp.py
app/blueprints/keymetricsandkpis_bp.py
app/blueprints/messagebroker_bp.py
app/blueprints/monitoringplatform_bp.py
app/blueprints/notificationservice_bp.py
app/blueprints/primarydatastore_bp.py
app/blueprints/qualityscoringengine_bp.py
app/blueprints/reportingservice_bp.py
app/blueprints/rowlevelsecurityenforcer_bp.py
app/blueprints/smtprelaygcp_bp.py
app/blueprints/stripewebhookhandler_bp.py
app/blueprints/usagemeteringlimiting_bp.py
app/blueprints/veritasnetbackupsaas_bp.py
app/blueprints/workspace_bp.py
app/models/activedirectoryad.py
app/models/aiarchitectureengine.py
app/models/analyticsdatastore.py
app/models/analyticsengine.py
app/models/apigateway.py
app/models/architecturetemplategallery.py
app/models/authenticationservice.py
app/models/blueprintjourneyinterface.py
app/models/blueprintpublicviewer.py
app/models/businesslogiclayer.py
app/models/cicdpipeline.py
app/models/cicdtoolchain.py
app/models/codegenerationservice.py
app/models/corebusiness.py
app/models/corebusinessapi.py
app/models/corebusinessfunction.py
app/models/exportservice.py
app/models/frontendapplication.py
app/models/gcpcohesityforsystemsbackup.py
app/models/gdprcomplianceservice.py
app/models/generatedcodeartifacts.py
app/models/genomespecdefinitions.py
app/models/genomespecgenerator.py
app/models/githubintegrationservice.py
app/models/googlegeminimodels.py
app/models/healthmonitoring.py
app/models/identityandaccessmanagement.py
app/models/journeysessionconversations.py
app/models/journeysessionorchestrator.py
app/models/keymetricsandkpis.py
app/models/messagebroker.py
app/models/monitoringplatform.py
app/models/notificationservice.py
app/models/primarydatastore.py
app/models/qualityscoringengine.py
app/models/reportingservice.py
app/models/rowlevelsecurityenforcer.py
app/models/smtprelaygcp.py
app/models/stripewebhookhandler.py
app/models/usagemeteringlimiting.py
app/models/veritasnetbackupsaas.py
app/models/workspace.py
app/schemas/activedirectoryad_schema.py
app/schemas/aiarchitectureengine_schema.py
app/schemas/analyticsdatastore_schema.py
app/schemas/analyticsengine_schema.py
app/schemas/apigateway_schema.py
app/schemas/architecturetemplategallery_schema.py
app/schemas/authenticationservice_schema.py
app/schemas/blueprintjourneyinterface_schema.py
app/schemas/blueprintpublicviewer_schema.py
app/schemas/businesslogiclayer_schema.py
app/schemas/cicdpipeline_schema.py
app/schemas/cicdtoolchain_schema.py
app/schemas/codegenerationservice_schema.py
app/schemas/corebusiness_schema.py
app/schemas/corebusinessapi_schema.py
app/schemas/corebusinessfunction_schema.py
app/schemas/exportservice_schema.py
app/schemas/frontendapplication_schema.py
app/schemas/gcpcohesityforsystemsbackup_schema.py
app/schemas/gdprcomplianceservice_schema.py
app/schemas/generatedcodeartifacts_schema.py
app/schemas/genomespecdefinitions_schema.py
app/schemas/genomespecgenerator_schema.py
app/schemas/githubintegrationservice_schema.py
app/schemas/googlegeminimodels_schema.py
app/schemas/healthmonitoring_schema.py
app/schemas/identityandaccessmanagement_schema.py
app/schemas/journeysessionconversations_schema.py
app/schemas/journeysessionorchestrator_schema.py
app/schemas/keymetricsandkpis_schema.py
app/schemas/messagebroker_schema.py
app/schemas/monitoringplatform_schema.py
app/schemas/notificationservice_schema.py
app/schemas/primarydatastore_schema.py
app/schemas/qualityscoringengine_schema.py
app/schemas/reportingservice_schema.py
app/schemas/rowlevelsecurityenforcer_schema.py
app/schemas/smtprelaygcp_schema.py
app/schemas/stripewebhookhandler_schema.py
app/schemas/usagemeteringlimiting_schema.py
app/schemas/veritasnetbackupsaas_schema.py
app/schemas/workspace_schema.py
app/static/admin.html
architectural_genome.yaml
bootstrap.sh
config.py
database.py
docker-compose.yml
frontend/DEPENDENCIES.md
frontend/DOMAIN.md
frontend/Dockerfile
frontend/PRINCIPLES.md
frontend/__tests__/accessibility.test.tsx
frontend/__tests__/active_directory_ad.test.tsx
frontend/__tests__/ai_architecture_engine.test.tsx
frontend/__tests__/analytics_data_store.test.tsx
frontend/__tests__/analytics_engine.test.tsx
frontend/__tests__/api_gateway.test.tsx
frontend/__tests__/architecture_template_gallery.test.tsx
frontend/__tests__/auth.test.tsx
frontend/__tests__/authentication_service.test.tsx
frontend/__tests__/blueprint_journey_interface.test.tsx
frontend/__tests__/blueprint_public_viewer.test.tsx
frontend/__tests__/business_logic_layer.test.tsx
frontend/__tests__/cicd_pipeline.test.tsx
frontend/__tests__/cicd_toolchain.test.tsx
frontend/__tests__/code_generation_service.test.tsx
frontend/__tests__/core_business.test.tsx
frontend/__tests__/core_business_api.test.tsx
frontend/__tests__/core_business_function.test.tsx
frontend/__tests__/export_service.test.tsx
frontend/__tests__/frontend_application.test.tsx
frontend/__tests__/gcp_cohesity_for_systems_backup.test.tsx
frontend/__tests__/gdpr_compliance_service.test.tsx
frontend/__tests__/generated_code_artifacts.test.tsx
frontend/__tests__/genome_spec_definitions.test.tsx
frontend/__tests__/genome_spec_generator.test.tsx
frontend/__tests__/git_hub_integration_service.test.tsx
frontend/__tests__/google_gemini_models.test.tsx
frontend/__tests__/health_monitoring.test.tsx
frontend/__tests__/identity_and_access_management.test.tsx
frontend/__tests__/journey_session_conversations.test.tsx
frontend/__tests__/journey_session_orchestrator.test.tsx
frontend/__tests__/key_metrics_and_kp_is.test.tsx
frontend/__tests__/message_broker.test.tsx
frontend/__tests__/monitoring_platform.test.tsx
frontend/__tests__/notification_service.test.tsx
frontend/__tests__/primary_data_store.test.tsx
frontend/__tests__/quality_scoring_engine.test.tsx
frontend/__tests__/reporting_service.test.tsx
frontend/__tests__/row_level_security_enforcer.test.tsx
frontend/__tests__/smtp_relay_gcp.test.tsx
frontend/__tests__/stripe_webhook_handler.test.tsx
frontend/__tests__/usage_metering_limiting.test.tsx
frontend/__tests__/veritas_netbackup_saa_s.test.tsx
frontend/__tests__/workspace.test.tsx
frontend/app/(protected)/dashboard/page.tsx
frontend/app/(protected)/layout.tsx
frontend/app/active_directory_ad/[id]/edit/page.tsx
frontend/app/active_directory_ad/[id]/page.tsx
frontend/app/active_directory_ad/new/page.tsx
frontend/app/active_directory_ad/page.tsx
frontend/app/admin/page.tsx
frontend/app/ai_architecture_engine/[id]/edit/page.tsx
frontend/app/ai_architecture_engine/[id]/page.tsx
frontend/app/ai_architecture_engine/new/page.tsx
frontend/app/ai_architecture_engine/page.tsx
frontend/app/analytics_data_store/[id]/edit/page.tsx
frontend/app/analytics_data_store/[id]/page.tsx
frontend/app/analytics_data_store/new/page.tsx
frontend/app/analytics_data_store/page.tsx
frontend/app/analytics_engine/[id]/edit/page.tsx
frontend/app/analytics_engine/[id]/page.tsx
frontend/app/analytics_engine/new/page.tsx
frontend/app/analytics_engine/page.tsx
frontend/app/api_gateway/[id]/edit/page.tsx
frontend/app/api_gateway/[id]/page.tsx
frontend/app/api_gateway/new/page.tsx
frontend/app/api_gateway/page.tsx
frontend/app/architecture_template_gallery/[id]/edit/page.tsx
frontend/app/architecture_template_gallery/[id]/page.tsx
frontend/app/architecture_template_gallery/new/page.tsx
frontend/app/architecture_template_gallery/page.tsx
frontend/app/authentication_service/[id]/edit/page.tsx
frontend/app/authentication_service/[id]/page.tsx
frontend/app/authentication_service/new/page.tsx
frontend/app/authentication_service/page.tsx
frontend/app/blueprint_journey_interface/[id]/edit/page.tsx
frontend/app/blueprint_journey_interface/[id]/page.tsx
frontend/app/blueprint_journey_interface/new/page.tsx
frontend/app/blueprint_journey_interface/page.tsx
frontend/app/blueprint_public_viewer/[id]/edit/page.tsx
frontend/app/blueprint_public_viewer/[id]/page.tsx
frontend/app/blueprint_public_viewer/new/page.tsx
frontend/app/blueprint_public_viewer/page.tsx
frontend/app/business_logic_layer/[id]/edit/page.tsx
frontend/app/business_logic_layer/[id]/page.tsx
frontend/app/business_logic_layer/new/page.tsx
frontend/app/business_logic_layer/page.tsx
frontend/app/cicd_pipeline/[id]/edit/page.tsx
frontend/app/cicd_pipeline/[id]/page.tsx
frontend/app/cicd_pipeline/new/page.tsx
frontend/app/cicd_pipeline/page.tsx
frontend/app/cicd_toolchain/[id]/edit/page.tsx
frontend/app/cicd_toolchain/[id]/page.tsx
frontend/app/cicd_toolchain/new/page.tsx
frontend/app/cicd_toolchain/page.tsx
frontend/app/code_generation_service/[id]/edit/page.tsx
frontend/app/code_generation_service/[id]/page.tsx
frontend/app/code_generation_service/new/page.tsx
frontend/app/code_generation_service/page.tsx
frontend/app/core_business/[id]/edit/page.tsx
frontend/app/core_business/[id]/page.tsx
frontend/app/core_business/new/page.tsx
frontend/app/core_business/page.tsx
frontend/app/core_business_api/[id]/edit/page.tsx
frontend/app/core_business_api/[id]/page.tsx
frontend/app/core_business_api/new/page.tsx
frontend/app/core_business_api/page.tsx
frontend/app/core_business_function/[id]/edit/page.tsx
frontend/app/core_business_function/[id]/page.tsx
frontend/app/core_business_function/new/page.tsx
frontend/app/core_business_function/page.tsx
frontend/app/error.tsx
frontend/app/export_service/[id]/edit/page.tsx
frontend/app/export_service/[id]/page.tsx
frontend/app/export_service/new/page.tsx
frontend/app/export_service/page.tsx
frontend/app/frontend_application/[id]/edit/page.tsx
frontend/app/frontend_application/[id]/page.tsx
frontend/app/frontend_application/new/page.tsx
frontend/app/frontend_application/page.tsx
frontend/app/gcp_cohesity_for_systems_backup/[id]/edit/page.tsx
frontend/app/gcp_cohesity_for_systems_backup/[id]/page.tsx
frontend/app/gcp_cohesity_for_systems_backup/new/page.tsx
frontend/app/gcp_cohesity_for_systems_backup/page.tsx
frontend/app/gdpr_compliance_service/[id]/edit/page.tsx
frontend/app/gdpr_compliance_service/[id]/page.tsx
frontend/app/gdpr_compliance_service/new/page.tsx
frontend/app/gdpr_compliance_service/page.tsx
frontend/app/generated_code_artifacts/[id]/edit/page.tsx
frontend/app/generated_code_artifacts/[id]/page.tsx
frontend/app/generated_code_artifacts/new/page.tsx
frontend/app/generated_code_artifacts/page.tsx
frontend/app/genome_spec_definitions/[id]/edit/page.tsx
frontend/app/genome_spec_definitions/[id]/page.tsx
frontend/app/genome_spec_definitions/new/page.tsx
frontend/app/genome_spec_definitions/page.tsx
frontend/app/genome_spec_generator/[id]/edit/page.tsx
frontend/app/genome_spec_generator/[id]/page.tsx
frontend/app/genome_spec_generator/new/page.tsx
frontend/app/genome_spec_generator/page.tsx
frontend/app/git_hub_integration_service/[id]/edit/page.tsx
frontend/app/git_hub_integration_service/[id]/page.tsx
frontend/app/git_hub_integration_service/new/page.tsx
frontend/app/git_hub_integration_service/page.tsx
frontend/app/globals.css
frontend/app/google_gemini_models/[id]/edit/page.tsx
frontend/app/google_gemini_models/[id]/page.tsx
frontend/app/google_gemini_models/new/page.tsx
frontend/app/google_gemini_models/page.tsx
frontend/app/health_monitoring/[id]/edit/page.tsx
frontend/app/health_monitoring/[id]/page.tsx
frontend/app/health_monitoring/new/page.tsx
frontend/app/health_monitoring/page.tsx
frontend/app/identity_and_access_management/[id]/edit/page.tsx
frontend/app/identity_and_access_management/[id]/page.tsx
frontend/app/identity_and_access_management/new/page.tsx
frontend/app/identity_and_access_management/page.tsx
frontend/app/journey_session_conversations/[id]/edit/page.tsx
frontend/app/journey_session_conversations/[id]/page.tsx
frontend/app/journey_session_conversations/new/page.tsx
frontend/app/journey_session_conversations/page.tsx
frontend/app/journey_session_orchestrator/[id]/edit/page.tsx
frontend/app/journey_session_orchestrator/[id]/page.tsx
frontend/app/journey_session_orchestrator/new/page.tsx
frontend/app/journey_session_orchestrator/page.tsx
frontend/app/key_metrics_and_kp_is/[id]/edit/page.tsx
frontend/app/key_metrics_and_kp_is/[id]/page.tsx
frontend/app/key_metrics_and_kp_is/new/page.tsx
frontend/app/key_metrics_and_kp_is/page.tsx
frontend/app/layout.tsx
frontend/app/loading.tsx
frontend/app/login/layout.tsx
frontend/app/login/page.tsx
frontend/app/message_broker/[id]/edit/page.tsx
frontend/app/message_broker/[id]/page.tsx
frontend/app/message_broker/new/page.tsx
frontend/app/message_broker/page.tsx
frontend/app/monitoring_platform/[id]/edit/page.tsx
frontend/app/monitoring_platform/[id]/page.tsx
frontend/app/monitoring_platform/new/page.tsx
frontend/app/monitoring_platform/page.tsx
frontend/app/not-found.tsx
frontend/app/notification_service/[id]/edit/page.tsx
frontend/app/notification_service/[id]/page.tsx
frontend/app/notification_service/new/page.tsx
frontend/app/notification_service/page.tsx
frontend/app/page.tsx
frontend/app/primary_data_store/[id]/edit/page.tsx
frontend/app/primary_data_store/[id]/page.tsx
frontend/app/primary_data_store/new/page.tsx
frontend/app/primary_data_store/page.tsx
frontend/app/providers.tsx
frontend/app/quality_scoring_engine/[id]/edit/page.tsx
frontend/app/quality_scoring_engine/[id]/page.tsx
frontend/app/quality_scoring_engine/new/page.tsx
frontend/app/quality_scoring_engine/page.tsx
frontend/app/reporting_service/[id]/edit/page.tsx
frontend/app/reporting_service/[id]/page.tsx
frontend/app/reporting_service/new/page.tsx
frontend/app/reporting_service/page.tsx
frontend/app/row_level_security_enforcer/[id]/edit/page.tsx
frontend/app/row_level_security_enforcer/[id]/page.tsx
frontend/app/row_level_security_enforcer/new/page.tsx
frontend/app/row_level_security_enforcer/page.tsx
frontend/app/smtp_relay_gcp/[id]/edit/page.tsx
frontend/app/smtp_relay_gcp/[id]/page.tsx
frontend/app/smtp_relay_gcp/new/page.tsx
frontend/app/smtp_relay_gcp/page.tsx
frontend/app/stripe_webhook_handler/[id]/edit/page.tsx
frontend/app/stripe_webhook_handler/[id]/page.tsx
frontend/app/stripe_webhook_handler/new/page.tsx
frontend/app/stripe_webhook_handler/page.tsx
frontend/app/usage_metering_limiting/[id]/edit/page.tsx
frontend/app/usage_metering_limiting/[id]/page.tsx
frontend/app/usage_metering_limiting/new/page.tsx
frontend/app/usage_metering_limiting/page.tsx
frontend/app/veritas_netbackup_saa_s/[id]/edit/page.tsx
frontend/app/veritas_netbackup_saa_s/[id]/page.tsx
frontend/app/veritas_netbackup_saa_s/new/page.tsx
frontend/app/veritas_netbackup_saa_s/page.tsx
frontend/app/workspace/[id]/edit/page.tsx
frontend/app/workspace/[id]/page.tsx
frontend/app/workspace/new/page.tsx
frontend/app/workspace/page.tsx
frontend/components/data-table.tsx
frontend/components/entity-picker.tsx
frontend/components/layout/sidebar.tsx
frontend/components/layout/topbar.tsx
frontend/components/require-auth.tsx
frontend/components/ui/avatar.tsx
frontend/components/ui/badge.tsx
frontend/components/ui/button.tsx
frontend/components/ui/card.tsx
frontend/components/ui/command.tsx
frontend/components/ui/dialog.tsx
frontend/components/ui/dropdown-menu.tsx
frontend/components/ui/form.tsx
frontend/components/ui/input.tsx
frontend/components/ui/label.tsx
frontend/components/ui/popover.tsx
frontend/components/ui/select.tsx
frontend/components/ui/separator.tsx
frontend/components/ui/skeleton.tsx
frontend/components/ui/switch.tsx
frontend/components/ui/table.tsx
frontend/components/ui/textarea.tsx
frontend/components/ui/toast.tsx
frontend/components/ui/tooltip.tsx
frontend/e2e/active_directory_ad.spec.ts
frontend/e2e/ai_architecture_engine.spec.ts
frontend/e2e/analytics_data_store.spec.ts
frontend/e2e/analytics_engine.spec.ts
frontend/e2e/api_gateway.spec.ts
frontend/e2e/architecture_template_gallery.spec.ts
frontend/e2e/auth.spec.ts
frontend/e2e/authentication_service.spec.ts
frontend/e2e/blueprint_journey_interface.spec.ts
frontend/e2e/blueprint_public_viewer.spec.ts
frontend/e2e/business_logic_layer.spec.ts
frontend/e2e/cicd_pipeline.spec.ts
frontend/e2e/cicd_toolchain.spec.ts
frontend/e2e/code_generation_service.spec.ts
frontend/e2e/core_business.spec.ts
frontend/e2e/core_business_api.spec.ts
frontend/e2e/core_business_function.spec.ts
frontend/e2e/export_service.spec.ts
frontend/e2e/frontend_application.spec.ts
frontend/e2e/gcp_cohesity_for_systems_backup.spec.ts
frontend/e2e/gdpr_compliance_service.spec.ts
frontend/e2e/generated_code_artifacts.spec.ts
frontend/e2e/genome_spec_definitions.spec.ts
frontend/e2e/genome_spec_generator.spec.ts
frontend/e2e/git_hub_integration_service.spec.ts
frontend/e2e/google_gemini_models.spec.ts
frontend/e2e/health_monitoring.spec.ts
frontend/e2e/identity_and_access_management.spec.ts
frontend/e2e/journey_session_conversations.spec.ts
frontend/e2e/journey_session_orchestrator.spec.ts
frontend/e2e/key_metrics_and_kp_is.spec.ts
frontend/e2e/message_broker.spec.ts
frontend/e2e/monitoring_platform.spec.ts
frontend/e2e/notification_service.spec.ts
frontend/e2e/primary_data_store.spec.ts
frontend/e2e/quality_scoring_engine.spec.ts
frontend/e2e/reporting_service.spec.ts
frontend/e2e/row_level_security_enforcer.spec.ts
frontend/e2e/smtp_relay_gcp.spec.ts
frontend/e2e/stripe_webhook_handler.spec.ts
frontend/e2e/usage_metering_limiting.spec.ts
frontend/e2e/veritas_netbackup_saa_s.spec.ts
frontend/e2e/workspace.spec.ts
frontend/jest.config.ts
frontend/jest.setup.ts
frontend/lib/api.ts
frontend/lib/auth-context.tsx
frontend/lib/schemas.ts
frontend/lib/utils.ts
frontend/middleware.ts
frontend/next.config.js
frontend/package.json
frontend/playwright.config.ts
frontend/postcss.config.js
frontend/tailwind.config.ts
frontend/tsconfig.json
helm/values.yaml
k8s/deployment.yaml
openapi.yaml
requirements.txt
terraform/main.tf
terraform/outputs.tf
terraform/rds.tf
terraform/variables.tf
tests/test_activedirectoryad.py
tests/test_aiarchitectureengine.py
tests/test_analyticsdatastore.py
tests/test_analyticsengine.py
tests/test_apigateway.py
tests/test_architecturetemplategallery.py
tests/test_authenticationservice.py
tests/test_blueprintjourneyinterface.py
tests/test_blueprintpublicviewer.py
tests/test_businesslogiclayer.py
tests/test_cicdpipeline.py
tests/test_cicdtoolchain.py
tests/test_codegenerationservice.py
tests/test_corebusiness.py
tests/test_corebusinessapi.py
tests/test_corebusinessfunction.py
tests/test_exportservice.py
tests/test_frontendapplication.py
tests/test_gcpcohesityforsystemsbackup.py
tests/test_gdprcomplianceservice.py
tests/test_generatedcodeartifacts.py
tests/test_genomespecdefinitions.py
tests/test_genomespecgenerator.py
tests/test_githubintegrationservice.py
tests/test_googlegeminimodels.py
tests/test_healthmonitoring.py
tests/test_identityandaccessmanagement.py
tests/test_journeysessionconversations.py
tests/test_journeysessionorchestrator.py
tests/test_keymetricsandkpis.py
tests/test_messagebroker.py
tests/test_monitoringplatform.py
tests/test_notificationservice.py
tests/test_primarydatastore.py
tests/test_qualityscoringengine.py
tests/test_reportingservice.py
tests/test_rowlevelsecurityenforcer.py
tests/test_smtprelaygcp.py
tests/test_stripewebhookhandler.py
tests/test_usagemeteringlimiting.py
tests/test_veritasnetbackupsaas.py
tests/test_workspace.py
wsgi.py

```

## Architecture Traceability

See `ARCHITECTURE.md` for full mapping from generated code back to ArchiMate source elements.
See `DECISIONS.md` for architecture decision records explaining key design choices.