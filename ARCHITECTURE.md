# Architecture Traceability — Archiet — AI-Native Architecture-to-Code SaaS Platform

> Generated: 2026-04-06 18:28 UTC  
> Solution ID: 5373  
> Spec hash: `81750cb319c0fa45`

This document maps every ArchiMate element in the solution blueprint to the
generated source files that implement it.

## Why This Was Built

### Problem Statement

## Core Entities
Workspace, User, Blueprint, JourneySession, GenomeSpec, ArchitectureTemplate, CodeGeneration, Export, WorkspaceUsage, ApiKey, BillingSubscription, GitHubConnection, Referral, BlueprintVersion, BlueprintComment, ChangelogEntry

## Access Model
Owner: manages billing, invites team, owns all blueprints
Admin: manages members, creates and approves blueprints
Member: creates blueprints and triggers code generation
End-User (public): views shared public blueprint pages
System (API key holder): calls REST API for programmatic blueprint creation

## Business Rules
GDPR: user data must be fully deleted within 30 days of account closure (DELETE /account/delete cascade)
Usage metering: hard limits enforced on every AI call — free tier max 3 blueprints and 100 AI calls/month
ToS: users cannot access any route until tos_accepted_at is set
API rate limiting: 100 req/min free, 1000 req/min paid
All workspace data is row-level isolated — no cross-workspace queries allowed

## Problem Description
Archiet is an AI-native SaaS product that transforms plain English problem descriptions into production-ready, downloadable codebases. Target users are startup founders, freelance architects, and SME technical leads who need to go from idea to working software without an enterprise EA team.

The platform operates as a multi-tenant SaaS with workspace-level isolation. Each Workspace belongs to one billing tier (free, starter, professional, team) with enforced limits on blueprint count, AI call budget, and feature flag access. Workspaces have a trial_ends_at date and transition through states: trial → active → suspended → cancelled.

Users belong to a Workspace with roles: owner, admin, member. Users authenticate via email/password or GitHub OAuth. User records carry tos_accepted_at, tos_version, ui_mode (starter/expert), and gdpr_data_export_requested_at. Authentication uses JWT (access token 15min, refresh token 30 days, stored in httpOnly cookies). Users cannot access the 

### Stakeholders & Drivers

| Stakeholder | Type | Drivers |
|-------------|------|---------|
| smb technology Stakeholder | Stakeholder |  |

### Goals & Outcomes

- **Strategic Goal for New Solution (Draft)** — Inferred goal from problem statement

### Requirements

- Error handling and logging `[MUST]`
- Error handling and user feedback `[MUST]`
- Authorization model `[MUST]`
- Backup and recovery (RPO/RTO) `[MUST]`
- Data classification scheme `[MUST]`
- Storage capacity and growth `[MUST]`
- Read/write throughput `[MUST]`
- RPO target `[MUST]`
- RTO target `[MUST]`
- Encryption requirements `[MUST]`
- MFA policy `[MUST]`
- Pen test frequency `[MUST]`
- Incident response time `[MUST]`
- Disaster recovery plan `[MUST]`
- Monitoring and alerting `[MUST]`
- Deployment frequency `[MUST]`
- Data freshness `[MUST]`
- Reporting and analytics needs `[MUST]`
- Data quality requirements `[MUST]`
- Authentication method `[MUST]`
- Encryption standard `[MUST]`
- Model retraining cadence `[MUST]`
- Bias/fairness audit frequency `[MUST]`
- MTTR target `[MUST]`
- Availability target `[MUST]`
- Rollback time `[MUST]`
- External system interfaces `[MUST]`
- Reporting refresh frequency `[MUST]`
- Integration pattern `[MUST]`
- Centralized logging `[MUST]`
- Audit logging `[MUST]`
- Data retention policy `[MUST]`
- Secrets management `[MUST]`
- Session management policy `[MUST]`
- Delivery guarantee `[MUST]`
- Message ordering `[MUST]`
- Message delivery latency `[MUST]`
- Dead letter queue strategy `[MUST]`
- Encryption at rest and in transit `[MUST]`
- Input validation `[MUST]`
- API response time `[MUST]`
- Throughput capacity `[MUST]`
- Rate limiting policy `[MUST]`
- Responsive design `[MUST]`
- Page load time target `[MUST]`
- Concurrent user capacity `[MUST]`
- Browser/device support matrix `[MUST]`
- Accessibility compliance (WCAG 2.1 AA) `[MUST]`
- CI/CD pipeline `[MUST]`
- GDPR Data Deletion `[MUST]`

### Constraints

| Constraint | Source | Enforcement |
|------------|--------|-------------|
| API versioning strategy | API changes follow semantic versioning | MUST |
| Data residency | Data stored in compliant jurisdiction | MUST |

### Architecture Principles

- **Least privilege access**: Grant minimum permissions required for each role
- **Defense in depth**: Multiple independent security layers
- **Infrastructure as code**: All infrastructure defined declaratively

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| SMTP Relay (GCP) | buy |  |
| Primary data store | build |  |
| Identity and access management | build |  |
| Monitoring platform | build |  |
| Analytics engine | build |  |
| GCP Cohesity for Systems backup | buy |  |
| API gateway | build |  |
| Message broker | build |  |
| Business logic layer | build |  |
| Frontend application | build |  |
| ACTIVE DIRECTORY (AD) | buy |  |
| Notification Service | build |  |
| Google Gemini Models | buy |  |
| Veritas Netbackup (SaaS) | buy |  |
| Blueprint Journey Interface | build |  |
| ArchitectureTemplate Gallery | build |  |
| Blueprint Public Viewer | build |  |
| CI/CD toolchain | build |  |
| CI/CD Pipeline | build |  |
| Health Monitoring | build |  |

### Non-Functional Requirements

- **SMTP Relay (GCP): availability target**: 99.9%
- **Primary data store: availability target**: 99.9%
- **Primary data store: scalability pattern**: horizontal
- **Identity and access management: availability target**: 99.9%
- **Identity and access management: scalability pattern**: horizontal
- **Monitoring platform: availability target**: 99.9%
- **Monitoring platform: scalability pattern**: horizontal
- **Analytics engine: availability target**: 99.9%
- **Analytics engine: scalability pattern**: horizontal
- **GCP Cohesity for Systems backup: availability target**: 99.99%
- **API gateway: availability target**: 99.9%
- **API gateway: scalability pattern**: horizontal
- **Message broker: availability target**: 99.9%
- **Message broker: scalability pattern**: horizontal
- **Business logic layer: availability target**: 99.9%

## Acceptance Criteria

*88 criteria inferred from goals, requirements, constraints, and business rules.*

### AC-001: Error handling and logging

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Error handling and logging'
- **THEN:** Structured error responses with correlation IDs
- **Verification:** Functional test: verify 'Error handling and logging' end-to-end
- **Source:** requirement — Error handling and logging

### AC-002: Constraint: API versioning strategy

- **Priority:** MUST
- **Category:** compliance
- **GIVEN:** System is deployed and accessible
- **WHEN:** An action that could violate 'API versioning strategy' is attempted
- **THEN:** The system prevents the violation. API changes follow semantic versioning
- **Verification:** Verify constraint 'API versioning strategy' cannot be violated. Test both valid and invalid scenarios.
- **Source:** constraint — API versioning strategy

### AC-003: Error handling and user feedback

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Error handling and user feedback'
- **THEN:** Users receive clear, actionable feedback on errors
- **Verification:** Functional test: verify 'Error handling and user feedback' end-to-end
- **Source:** requirement — Error handling and user feedback

### AC-004: Principle: Least privilege access

- **Priority:** SHOULD
- **Category:** compliance
- **GIVEN:** Codebase is reviewed
- **WHEN:** Architecture principle 'Least privilege access' is evaluated
- **THEN:** Grant minimum permissions required for each role
- **Verification:** Code review: verify all components follow 'Least privilege access'. No exceptions without documented ADR.
- **Source:** principle — Least privilege access

### AC-005: Principle: Defense in depth

- **Priority:** SHOULD
- **Category:** compliance
- **GIVEN:** Codebase is reviewed
- **WHEN:** Architecture principle 'Defense in depth' is evaluated
- **THEN:** Multiple independent security layers
- **Verification:** Code review: verify all components follow 'Defense in depth'. No exceptions without documented ADR.
- **Source:** principle — Defense in depth

### AC-006: Authorization model

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Authorization model'
- **THEN:** Define AuthZ model (RBAC, ABAC, or hybrid)
- **Verification:** Functional test: verify 'Authorization model' end-to-end
- **Source:** requirement — Authorization model

### AC-007: Backup and recovery (RPO/RTO)

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Backup and recovery (RPO/RTO)'
- **THEN:** Recovery point and time objectives defined
- **Verification:** Functional test: verify 'Backup and recovery (RPO/RTO)' end-to-end
- **Source:** requirement — Backup and recovery (RPO/RTO)

### AC-008: Data classification scheme

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Data classification scheme'
- **THEN:** All data classified (public/internal/confidential/restricted)
- **Verification:** Functional test: verify 'Data classification scheme' end-to-end
- **Source:** requirement — Data classification scheme

### AC-009: Storage capacity and growth

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Storage capacity and growth'
- **THEN:** Current capacity in GB and annual growth
- **Verification:** Functional test: verify 'Storage capacity and growth' end-to-end
- **Source:** requirement — Storage capacity and growth

### AC-010: Read/write throughput

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Read/write throughput'
- **THEN:** Operations per second
- **Verification:** Functional test: verify 'Read/write throughput' end-to-end
- **Source:** requirement — Read/write throughput

### AC-011: RPO target

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'RPO target'
- **THEN:** Recovery Point Objective in hours
- **Verification:** Functional test: verify 'RPO target' end-to-end
- **Source:** requirement — RPO target

### AC-012: RTO target

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'RTO target'
- **THEN:** Recovery Time Objective in minutes
- **Verification:** Functional test: verify 'RTO target' end-to-end
- **Source:** requirement — RTO target

### AC-013: Encryption requirements

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Encryption requirements'
- **THEN:** At rest, in transit, field-level standards
- **Verification:** Functional test: verify 'Encryption requirements' end-to-end
- **Source:** requirement — Encryption requirements

### AC-014: MFA policy

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'MFA policy'
- **THEN:** MFA required: yes/no, method
- **Verification:** Functional test: verify 'MFA policy' end-to-end
- **Source:** requirement — MFA policy

### AC-015: Pen test frequency

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Pen test frequency'
- **THEN:** Penetration testing cadence per year
- **Verification:** Functional test: verify 'Pen test frequency' end-to-end
- **Source:** requirement — Pen test frequency

### AC-016: Incident response time

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Incident response time'
- **THEN:** Target time to detect and respond
- **Verification:** Functional test: verify 'Incident response time' end-to-end
- **Source:** requirement — Incident response time

### AC-017: Disaster recovery plan

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Disaster recovery plan'
- **THEN:** Documented DR runbook with tested failover
- **Verification:** Functional test: verify 'Disaster recovery plan' end-to-end
- **Source:** requirement — Disaster recovery plan

### AC-018: Monitoring and alerting

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Monitoring and alerting'
- **THEN:** System health, performance, error tracking
- **Verification:** Functional test: verify 'Monitoring and alerting' end-to-end
- **Source:** requirement — Monitoring and alerting

### AC-019: Deployment frequency

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Deployment frequency'
- **THEN:** Target deployments per week/month
- **Verification:** Functional test: verify 'Deployment frequency' end-to-end
- **Source:** requirement — Deployment frequency

### AC-020: Data freshness

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Data freshness'
- **THEN:** Maximum data staleness (real-time/hourly/daily)
- **Verification:** Functional test: verify 'Data freshness' end-to-end
- **Source:** requirement — Data freshness

### AC-021: Reporting and analytics needs

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational
- **WHEN:** The requirement 'Reporting and analytics needs' is evaluated
- **THEN:** provide
- **Verification:** Functional test: verify 'Reporting and analytics needs' end-to-end
- **Source:** requirement — Reporting and analytics needs

### AC-022: Data quality requirements

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Data quality requirements'
- **THEN:** Define accuracy, completeness, timeliness standards
- **Verification:** Functional test: verify 'Data quality requirements' end-to-end
- **Source:** requirement — Data quality requirements

### AC-023: Authentication method

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Authentication method'
- **THEN:** Define AuthN mechanism (SSO, OAuth2, SAML)
- **Verification:** Functional test: verify 'Authentication method' end-to-end
- **Source:** requirement — Authentication method

### AC-024: Encryption standard

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Encryption standard'
- **THEN:** Specific encryption standard (AES-256, TLS 1.3)
- **Verification:** Functional test: verify 'Encryption standard' end-to-end
- **Source:** requirement — Encryption standard

### AC-025: Model retraining cadence

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Model retraining cadence'
- **THEN:** How often ML models are retrained (if ML)
- **Verification:** Functional test: verify 'Model retraining cadence' end-to-end
- **Source:** requirement — Model retraining cadence

### AC-026: Bias/fairness audit frequency

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Bias/fairness audit frequency'
- **THEN:** How often model bias is audited (if ML)
- **Verification:** Functional test: verify 'Bias/fairness audit frequency' end-to-end
- **Source:** requirement — Bias/fairness audit frequency

### AC-027: MTTR target

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'MTTR target'
- **THEN:** Mean time to recovery in minutes
- **Verification:** Functional test: verify 'MTTR target' end-to-end
- **Source:** requirement — MTTR target

### AC-028: Availability target

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Availability target'
- **THEN:** Uptime percentage (99.9, 99.95, 99.99)
- **Verification:** Functional test: verify 'Availability target' end-to-end
- **Source:** requirement — Availability target

### AC-029: Rollback time

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Rollback time'
- **THEN:** Maximum time to roll back a failed deployment
- **Verification:** Functional test: verify 'Rollback time' end-to-end
- **Source:** requirement — Rollback time

### AC-030: External system interfaces

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'External system interfaces'
- **THEN:** Enumerate systems to integrate with
- **Verification:** Functional test: verify 'External system interfaces' end-to-end
- **Source:** requirement — External system interfaces

### AC-031: Reporting refresh frequency

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Reporting refresh frequency'
- **THEN:** How often reports/dashboards update
- **Verification:** Functional test: verify 'Reporting refresh frequency' end-to-end
- **Source:** requirement — Reporting refresh frequency

### AC-032: Integration pattern

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Integration pattern'
- **THEN:** Define sync/async/event-driven strategy
- **Verification:** Functional test: verify 'Integration pattern' end-to-end
- **Source:** requirement — Integration pattern

### AC-033: Principle: Infrastructure as code

- **Priority:** SHOULD
- **Category:** compliance
- **GIVEN:** Codebase is reviewed
- **WHEN:** Architecture principle 'Infrastructure as code' is evaluated
- **THEN:** All infrastructure defined declaratively
- **Verification:** Code review: verify all components follow 'Infrastructure as code'. No exceptions without documented ADR.
- **Source:** principle — Infrastructure as code

### AC-034: Centralized logging

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Centralized logging'
- **THEN:** Structured, searchable logs with correlation IDs
- **Verification:** Functional test: verify 'Centralized logging' end-to-end
- **Source:** requirement — Centralized logging

### AC-035: Constraint: Data residency

- **Priority:** MUST
- **Category:** compliance
- **GIVEN:** System is deployed and accessible
- **WHEN:** An action that could violate 'Data residency' is attempted
- **THEN:** The system prevents the violation. Data stored in compliant jurisdiction
- **Verification:** Verify constraint 'Data residency' cannot be violated. Test both valid and invalid scenarios.
- **Source:** constraint — Data residency

### AC-036: Audit logging

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Audit logging'
- **THEN:** All security-relevant actions logged immutably
- **Verification:** Functional test: verify 'Audit logging' end-to-end
- **Source:** requirement — Audit logging

### AC-037: Data retention policy

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Data retention policy'
- **THEN:** Define retention periods per data classification
- **Verification:** Functional test: verify 'Data retention policy' end-to-end
- **Source:** requirement — Data retention policy

### AC-038: Secrets management

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Secrets management'
- **THEN:** Credentials, keys, tokens stored in vault
- **Verification:** Functional test: verify 'Secrets management' end-to-end
- **Source:** requirement — Secrets management

### AC-039: Session management policy

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Session management policy'
- **THEN:** Timeout in minutes, concurrent session limit
- **Verification:** Functional test: verify 'Session management policy' end-to-end
- **Source:** requirement — Session management policy

### AC-040: Delivery guarantee

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Delivery guarantee'
- **THEN:** At-least-once or exactly-once semantics
- **Verification:** Functional test: verify 'Delivery guarantee' end-to-end
- **Source:** requirement — Delivery guarantee

### AC-041: Message ordering

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Message ordering'
- **THEN:** Whether message ordering is required
- **Verification:** Functional test: verify 'Message ordering' end-to-end
- **Source:** requirement — Message ordering

### AC-042: Message delivery latency

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Message delivery latency'
- **THEN:** Maximum delivery time in ms
- **Verification:** Functional test: verify 'Message delivery latency' end-to-end
- **Source:** requirement — Message delivery latency

### AC-043: Dead letter queue strategy

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Dead letter queue strategy'
- **THEN:** How failed messages are handled
- **Verification:** Functional test: verify 'Dead letter queue strategy' end-to-end
- **Source:** requirement — Dead letter queue strategy

### AC-044: Encryption at rest and in transit

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Encryption at rest and in transit'
- **THEN:** All data encrypted using approved standards
- **Verification:** Functional test: verify 'Encryption at rest and in transit' end-to-end
- **Source:** requirement — Encryption at rest and in transit

### AC-045: Input validation

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Input validation'
- **THEN:** All inputs validated at system boundary
- **Verification:** Functional test: verify 'Input validation' end-to-end
- **Source:** requirement — Input validation

### AC-046: API response time

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'API response time'
- **THEN:** p50 and p99 response time targets in milliseconds
- **Verification:** Functional test: verify 'API response time' end-to-end
- **Source:** requirement — API response time

### AC-047: Throughput capacity

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational
- **WHEN:** The requirement 'Throughput capacity' is evaluated
- **THEN:** handle
- **Verification:** Functional test: verify 'Throughput capacity' end-to-end
- **Source:** requirement — Throughput capacity

### AC-048: Rate limiting policy

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Rate limiting policy'
- **THEN:** Requests per minute per client
- **Verification:** Functional test: verify 'Rate limiting policy' end-to-end
- **Source:** requirement — Rate limiting policy

### AC-049: Responsive design

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Responsive design'
- **THEN:** Support mobile, tablet, and desktop viewports
- **Verification:** Functional test: verify 'Responsive design' end-to-end
- **Source:** requirement — Responsive design

### AC-050: Page load time target

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Page load time target'
- **THEN:** Maximum acceptable page load time in seconds
- **Verification:** Functional test: verify 'Page load time target' end-to-end
- **Source:** requirement — Page load time target

### AC-051: Concurrent user capacity

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Concurrent user capacity'
- **THEN:** Maximum simultaneous users
- **Verification:** Functional test: verify 'Concurrent user capacity' end-to-end
- **Source:** requirement — Concurrent user capacity

### AC-052: Browser/device support matrix

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'Browser/device support matrix'
- **THEN:** Supported browsers and device types
- **Verification:** Functional test: verify 'Browser/device support matrix' end-to-end
- **Source:** requirement — Browser/device support matrix

### AC-053: Accessibility compliance (WCAG 2.1 AA)

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational
- **WHEN:** The requirement 'Accessibility compliance (WCAG 2.1 AA)' is evaluated
- **THEN:** meet WCAG 2
- **Verification:** Functional test: verify 'Accessibility compliance (WCAG 2.1 AA)' end-to-end
- **Source:** requirement — Accessibility compliance (WCAG 2.1 AA)

### AC-054: Strategic Goal for New Solution (Draft)

- **Priority:** SHOULD
- **Category:** business_rule
- **GIVEN:** System is deployed and operational with production-like data
- **WHEN:** The goal 'Strategic Goal for New Solution (Draft)' is evaluated
- **THEN:** Inferred goal from problem statement
- **Verification:** Manual verification: confirm that 'Strategic Goal for New Solution (Draft)' is achieved. Document evidence.
- **Source:** goal — Strategic Goal for New Solution (Draft)

### AC-055: CI/CD pipeline

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational and accessible
- **WHEN:** A user interacts with the feature: 'CI/CD pipeline'
- **THEN:** Automated build, test, deploy for every change
- **Verification:** Functional test: verify 'CI/CD pipeline' end-to-end
- **Source:** requirement — CI/CD pipeline

### AC-056: GDPR Data Deletion

- **Priority:** MUST
- **Category:** business_rule
- **GIVEN:** System is operational
- **WHEN:** The requirement 'GDPR Data Deletion' is evaluated
- **THEN:** be fully deleted within 30 days of account closure
- **Verification:** Functional test: verify 'GDPR Data Deletion' end-to-end
- **Source:** requirement — GDPR Data Deletion

### AC-057: SMTP Relay (GCP): Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** SMTP Relay (GCP) is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: SMTP Relay (GCP) health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — SMTP Relay (GCP)

### AC-058: Primary data store: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Primary data store is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Primary data store health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Primary data store

### AC-059: Identity and access management: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Identity and access management is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Identity and access management health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Identity and access management

### AC-060: Monitoring platform: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Monitoring platform is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Monitoring platform health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Monitoring platform

### AC-061: Analytics engine: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Analytics engine is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Analytics engine health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Analytics engine

### AC-062: GCP Cohesity for Systems backup: Availability 99.99%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** GCP Cohesity for Systems backup is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.99%
- **Verification:** Monitoring: GCP Cohesity for Systems backup health endpoint returns 200 for >= 99.99% of measurement window
- **Source:** nfr — GCP Cohesity for Systems backup

### AC-063: API gateway: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** API gateway is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: API gateway health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — API gateway

### AC-064: Message broker: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Message broker is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Message broker health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Message broker

### AC-065: Business logic layer: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Business logic layer is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Business logic layer health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Business logic layer

### AC-066: Frontend application: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Frontend application is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Frontend application health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Frontend application

### AC-067: ACTIVE DIRECTORY (AD): Availability 99.99%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** ACTIVE DIRECTORY (AD) is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.99%
- **Verification:** Monitoring: ACTIVE DIRECTORY (AD) health endpoint returns 200 for >= 99.99% of measurement window
- **Source:** nfr — ACTIVE DIRECTORY (AD)

### AC-068: Notification Service: Availability 99.5%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Notification Service is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.5%
- **Verification:** Monitoring: Notification Service health endpoint returns 200 for >= 99.5% of measurement window
- **Source:** nfr — Notification Service

### AC-069: Google Gemini Models: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Google Gemini Models is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Google Gemini Models health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Google Gemini Models

### AC-070: Veritas Netbackup (SaaS): Availability 99.99%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Veritas Netbackup (SaaS) is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.99%
- **Verification:** Monitoring: Veritas Netbackup (SaaS) health endpoint returns 200 for >= 99.99% of measurement window
- **Source:** nfr — Veritas Netbackup (SaaS)

### AC-071: Blueprint Journey Interface: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Blueprint Journey Interface is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Blueprint Journey Interface health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Blueprint Journey Interface

### AC-072: ArchitectureTemplate Gallery: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** ArchitectureTemplate Gallery is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: ArchitectureTemplate Gallery health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — ArchitectureTemplate Gallery

### AC-073: Blueprint Public Viewer: Availability 99.5%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Blueprint Public Viewer is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.5%
- **Verification:** Monitoring: Blueprint Public Viewer health endpoint returns 200 for >= 99.5% of measurement window
- **Source:** nfr — Blueprint Public Viewer

### AC-074: CI/CD toolchain: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** CI/CD toolchain is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: CI/CD toolchain health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — CI/CD toolchain

### AC-075: CI/CD Pipeline: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** CI/CD Pipeline is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: CI/CD Pipeline health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — CI/CD Pipeline

### AC-076: Health Monitoring: Availability 99.95%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Health Monitoring is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.95%
- **Verification:** Monitoring: Health Monitoring health endpoint returns 200 for >= 99.95% of measurement window
- **Source:** nfr — Health Monitoring

### AC-077: GenomeSpec Generator: Availability 99.95%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** GenomeSpec Generator is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.95%
- **Verification:** Monitoring: GenomeSpec Generator health endpoint returns 200 for >= 99.95% of measurement window
- **Source:** nfr — GenomeSpec Generator

### AC-078: Code Generation Service: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Code Generation Service is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Code Generation Service health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Code Generation Service

### AC-079: Export Service: Availability 99.5%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Export Service is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.5%
- **Verification:** Monitoring: Export Service health endpoint returns 200 for >= 99.5% of measurement window
- **Source:** nfr — Export Service

### AC-080: JourneySession Orchestrator: Availability 99.95%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** JourneySession Orchestrator is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.95%
- **Verification:** Monitoring: JourneySession Orchestrator health endpoint returns 200 for >= 99.95% of measurement window
- **Source:** nfr — JourneySession Orchestrator

### AC-081: Stripe Webhook Handler: Availability 99.9%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Stripe Webhook Handler is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.9%
- **Verification:** Monitoring: Stripe Webhook Handler health endpoint returns 200 for >= 99.9% of measurement window
- **Source:** nfr — Stripe Webhook Handler

### AC-082: Authentication Service: Availability 99.99%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Authentication Service is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.99%
- **Verification:** Monitoring: Authentication Service health endpoint returns 200 for >= 99.99% of measurement window
- **Source:** nfr — Authentication Service

### AC-083: Row-Level Security Enforcer: Availability 99.99%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Row-Level Security Enforcer is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.99%
- **Verification:** Monitoring: Row-Level Security Enforcer health endpoint returns 200 for >= 99.99% of measurement window
- **Source:** nfr — Row-Level Security Enforcer

### AC-084: GDPR Compliance Service: Availability 99.5%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** GDPR Compliance Service is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.5%
- **Verification:** Monitoring: GDPR Compliance Service health endpoint returns 200 for >= 99.5% of measurement window
- **Source:** nfr — GDPR Compliance Service

### AC-085: AI Architecture Engine: Availability 99.95%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** AI Architecture Engine is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.95%
- **Verification:** Monitoring: AI Architecture Engine health endpoint returns 200 for >= 99.95% of measurement window
- **Source:** nfr — AI Architecture Engine

### AC-086: Usage Metering & Limiting: Availability 99.99%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Usage Metering & Limiting is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.99%
- **Verification:** Monitoring: Usage Metering & Limiting health endpoint returns 200 for >= 99.99% of measurement window
- **Source:** nfr — Usage Metering & Limiting

### AC-087: Quality Scoring Engine: Availability 99.5%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** Quality Scoring Engine is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.5%
- **Verification:** Monitoring: Quality Scoring Engine health endpoint returns 200 for >= 99.5% of measurement window
- **Source:** nfr — Quality Scoring Engine

### AC-088: GitHub Integration Service: Availability 99.5%

- **Priority:** MUST
- **Category:** performance
- **GIVEN:** GitHub Integration Service is deployed to production
- **WHEN:** Availability is measured over a 30-day period
- **THEN:** Uptime is >= 99.5%
- **Verification:** Monitoring: GitHub Integration Service health endpoint returns 200 for >= 99.5% of measurement window
- **Source:** nfr — GitHub Integration Service

## Data Model

| ArchiMate DataObject | Generated File | SQLAlchemy Class | Fields |
|----------------------|----------------|-----------------|--------|
| SmtpRelayGcp | `app/models/smtp_relay_gcp.py` | `SmtpRelayGcp` | name, description, status, created_at, updated_at |
| PrimaryDataStore | `app/models/primary_data_store.py` | `PrimaryDataStore` | name, description, storage_type, capacity, connection_string, … (+3 more) |
| IdentityAndAccessManagement | `app/models/identity_and_access_management.py` | `IdentityAndAccessManagement` | name, description, status, created_at, updated_at |
| AuthenticationService | `app/models/authentication_service.py` | `AuthenticationService` | name, description, endpoint_url, service_type, version, … (+3 more) |
| MonitoringPlatform | `app/models/monitoring_platform.py` | `MonitoringPlatform` | name, description, status, created_at, updated_at |
| AnalyticsEngine | `app/models/analytics_engine.py` | `AnalyticsEngine` | name, description, metric_name, value, target, … (+5 more) |
| ReportingService | `app/models/reporting_service.py` | `ReportingService` | name, description, title, document_type, effective_date, … (+4 more) |
| GcpCohesityForSystemsBackup | `app/models/gcp_cohesity_for_systems_backup.py` | `GcpCohesityForSystemsBackup` | name, description, status, created_at, updated_at |
| ApiGateway | `app/models/api_gateway.py` | `ApiGateway` | name, description, endpoint_url, service_type, version, … (+3 more) |
| MessageBroker | `app/models/message_broker.py` | `MessageBroker` | name, description, status, created_at, updated_at |
| BusinessLogicLayer | `app/models/business_logic_layer.py` | `BusinessLogicLayer` | name, description, status, created_at, updated_at |
| CoreBusinessFunction | `app/models/core_business_function.py` | `CoreBusinessFunction` | name, description, status, created_at, updated_at |
| CoreBusinessApi | `app/models/core_business_api.py` | `CoreBusinessApi` | name, description, endpoint_url, service_type, version, … (+3 more) |
| FrontendApplication | `app/models/frontend_application.py` | `FrontendApplication` | name, description, status, created_at, updated_at |
| ActiveDirectoryAd | `app/models/active_directory_ad.py` | `ActiveDirectoryAd` | name, description, status, created_at, updated_at |
| NotificationService | `app/models/notification_service.py` | `NotificationService` | name, description, endpoint_url, service_type, version, … (+3 more) |
| GoogleGeminiModels | `app/models/google_gemini_models.py` | `GoogleGeminiModels` | name, description, status, created_at, updated_at |
| VeritasNetbackupSaaS | `app/models/veritas_netbackup_saa_s.py` | `VeritasNetbackupSaaS` | name, description, status, created_at, updated_at |
| BlueprintJourneyInterface | `app/models/blueprint_journey_interface.py` | `BlueprintJourneyInterface` | name, description, status, created_at, updated_at |
| ArchitectureTemplateGallery | `app/models/architecture_template_gallery.py` | `ArchitectureTemplateGallery` | name, description, status, created_at, updated_at |
| BlueprintPublicViewer | `app/models/blueprint_public_viewer.py` | `BlueprintPublicViewer` | name, description, status, created_at, updated_at |
| CicdToolchain | `app/models/cicd_toolchain.py` | `CicdToolchain` | name, description, status, created_at, updated_at |
| CicdPipeline | `app/models/cicd_pipeline.py` | `CicdPipeline` | name, description, status, created_at, updated_at |
| HealthMonitoring | `app/models/health_monitoring.py` | `HealthMonitoring` | name, description, status, created_at, updated_at |
| GenomeSpecGenerator | `app/models/genome_spec_generator.py` | `GenomeSpecGenerator` | name, description, status, created_at, updated_at |
| CodeGenerationService | `app/models/code_generation_service.py` | `CodeGenerationService` | name, description, endpoint_url, service_type, version, … (+3 more) |
| ExportService | `app/models/export_service.py` | `ExportService` | name, description, endpoint_url, service_type, version, … (+3 more) |
| JourneySessionOrchestrator | `app/models/journey_session_orchestrator.py` | `JourneySessionOrchestrator` | name, description, status, created_at, updated_at |
| StripeWebhookHandler | `app/models/stripe_webhook_handler.py` | `StripeWebhookHandler` | name, description, status, created_at, updated_at |
| RowLevelSecurityEnforcer | `app/models/row_level_security_enforcer.py` | `RowLevelSecurityEnforcer` | name, description, status, created_at, updated_at |
| GdprComplianceService | `app/models/gdpr_compliance_service.py` | `GdprComplianceService` | name, description, endpoint_url, service_type, version, … (+3 more) |
| AiArchitectureEngine | `app/models/ai_architecture_engine.py` | `AiArchitectureEngine` | name, description, status, created_at, updated_at |
| UsageMeteringLimiting | `app/models/usage_metering_limiting.py` | `UsageMeteringLimiting` | name, description, status, created_at, updated_at |
| QualityScoringEngine | `app/models/quality_scoring_engine.py` | `QualityScoringEngine` | name, description, status, created_at, updated_at |
| GitHubIntegrationService | `app/models/git_hub_integration_service.py` | `GitHubIntegrationService` | name, description, endpoint_url, service_type, version, … (+3 more) |
| CoreBusiness | `app/models/core_business.py` | `CoreBusiness` | name, description, status, created_at, updated_at |
| KeyMetricsAndKpIs | `app/models/key_metrics_and_kp_is.py` | `KeyMetricsAndKpIs` | name, description, metric_name, value, target, … (+5 more) |
| AnalyticsDataStore | `app/models/analytics_data_store.py` | `AnalyticsDataStore` | name, description, metric_name, value, target, … (+5 more) |
| Workspace | `app/models/workspace.py` | `Workspace` | name, description, status, created_at, updated_at |
| JourneySessionConversations | `app/models/journey_session_conversations.py` | `JourneySessionConversations` | name, description, status, created_at, updated_at |
| GenomeSpecDefinitions | `app/models/genome_spec_definitions.py` | `GenomeSpecDefinitions` | name, description, status, created_at, updated_at |
| GeneratedCodeArtifacts | `app/models/generated_code_artifacts.py` | `GeneratedCodeArtifacts` | name, description, status, created_at, updated_at |

## Application Services

| ArchiMate ApplicationService | Generated File | Routes |
|------------------------------|----------------|--------|
| SmtpRelayGcp | `app/routes/smtprelaygcp_routes.py` | `GET /api/smtp_relay_gcps`, `POST /api/smtp_relay_gcps`, `GET /api/smtp_relay_gcps/{id}`, `PUT /api/smtp_relay_gcps/{id}` … (+1 more) |
| PrimaryDataStore | `app/routes/primarydatastore_routes.py` | `GET /api/primary_data_stores`, `POST /api/primary_data_stores`, `GET /api/primary_data_stores/{id}`, `PUT /api/primary_data_stores/{id}` … (+1 more) |
| IdentityAndAccessManagement | `app/routes/identityandaccessmanagement_routes.py` | `GET /api/identity_and_access_managements`, `POST /api/identity_and_access_managements`, `GET /api/identity_and_access_managements/{id}`, `PUT /api/identity_and_access_managements/{id}` … (+1 more) |
| AuthenticationService | `app/routes/authenticationservice_routes.py` | `GET /api/authentication_services`, `POST /api/authentication_services`, `GET /api/authentication_services/{id}`, `PUT /api/authentication_services/{id}` … (+1 more) |
| MonitoringPlatform | `app/routes/monitoringplatform_routes.py` | `GET /api/monitoring_platforms`, `POST /api/monitoring_platforms`, `GET /api/monitoring_platforms/{id}`, `PUT /api/monitoring_platforms/{id}` … (+1 more) |
| AnalyticsEngine | `app/routes/analyticsengine_routes.py` | `GET /api/analytics_engines`, `POST /api/analytics_engines`, `GET /api/analytics_engines/{id}`, `PUT /api/analytics_engines/{id}` … (+1 more) |
| ReportingService | `app/routes/reportingservice_routes.py` | `GET /api/reporting_services`, `POST /api/reporting_services`, `GET /api/reporting_services/{id}`, `PUT /api/reporting_services/{id}` … (+1 more) |
| GcpCohesityForSystemsBackup | `app/routes/gcpcohesityforsystemsbackup_routes.py` | `GET /api/gcp_cohesity_for_systems_backups`, `POST /api/gcp_cohesity_for_systems_backups`, `GET /api/gcp_cohesity_for_systems_backups/{id}`, `PUT /api/gcp_cohesity_for_systems_backups/{id}` … (+1 more) |
| ApiGateway | `app/routes/apigateway_routes.py` | `GET /api/api_gateways`, `POST /api/api_gateways`, `GET /api/api_gateways/{id}`, `PUT /api/api_gateways/{id}` … (+1 more) |
| MessageBroker | `app/routes/messagebroker_routes.py` | `GET /api/message_brokers`, `POST /api/message_brokers`, `GET /api/message_brokers/{id}`, `PUT /api/message_brokers/{id}` … (+1 more) |
| BusinessLogicLayer | `app/routes/businesslogiclayer_routes.py` | `GET /api/business_logic_layers`, `POST /api/business_logic_layers`, `GET /api/business_logic_layers/{id}`, `PUT /api/business_logic_layers/{id}` … (+1 more) |
| CoreBusinessFunction | `app/routes/corebusinessfunction_routes.py` | `GET /api/core_business_functions`, `POST /api/core_business_functions`, `GET /api/core_business_functions/{id}`, `PUT /api/core_business_functions/{id}` … (+1 more) |
| CoreBusinessApi | `app/routes/corebusinessapi_routes.py` | `GET /api/core_business_apis`, `POST /api/core_business_apis`, `GET /api/core_business_apis/{id}`, `PUT /api/core_business_apis/{id}` … (+1 more) |
| FrontendApplication | `app/routes/frontendapplication_routes.py` | `GET /api/frontend_applications`, `POST /api/frontend_applications`, `GET /api/frontend_applications/{id}`, `PUT /api/frontend_applications/{id}` … (+1 more) |
| ActiveDirectoryAd | `app/routes/activedirectoryad_routes.py` | `GET /api/active_directory_ads`, `POST /api/active_directory_ads`, `GET /api/active_directory_ads/{id}`, `PUT /api/active_directory_ads/{id}` … (+1 more) |
| NotificationService | `app/routes/notificationservice_routes.py` | `GET /api/notification_services`, `POST /api/notification_services`, `GET /api/notification_services/{id}`, `PUT /api/notification_services/{id}` … (+1 more) |
| GoogleGeminiModels | `app/routes/googlegeminimodels_routes.py` | `GET /api/google_gemini_models`, `POST /api/google_gemini_models`, `GET /api/google_gemini_models/{id}`, `PUT /api/google_gemini_models/{id}` … (+1 more) |
| VeritasNetbackupSaaS | `app/routes/veritasnetbackupsaas_routes.py` | `GET /api/veritas_netbackup_saa_s`, `POST /api/veritas_netbackup_saa_s`, `GET /api/veritas_netbackup_saa_s/{id}`, `PUT /api/veritas_netbackup_saa_s/{id}` … (+1 more) |
| BlueprintJourneyInterface | `app/routes/blueprintjourneyinterface_routes.py` | `GET /api/blueprint_journey_interfaces`, `POST /api/blueprint_journey_interfaces`, `GET /api/blueprint_journey_interfaces/{id}`, `PUT /api/blueprint_journey_interfaces/{id}` … (+1 more) |
| ArchitectureTemplateGallery | `app/routes/architecturetemplategallery_routes.py` | `GET /api/architecture_template_galleries`, `POST /api/architecture_template_galleries`, `GET /api/architecture_template_galleries/{id}`, `PUT /api/architecture_template_galleries/{id}` … (+1 more) |
| BlueprintPublicViewer | `app/routes/blueprintpublicviewer_routes.py` | `GET /api/blueprint_public_viewers`, `POST /api/blueprint_public_viewers`, `GET /api/blueprint_public_viewers/{id}`, `PUT /api/blueprint_public_viewers/{id}` … (+1 more) |
| CicdToolchain | `app/routes/cicdtoolchain_routes.py` | `GET /api/cicd_toolchains`, `POST /api/cicd_toolchains`, `GET /api/cicd_toolchains/{id}`, `PUT /api/cicd_toolchains/{id}` … (+1 more) |
| CicdPipeline | `app/routes/cicdpipeline_routes.py` | `GET /api/cicd_pipelines`, `POST /api/cicd_pipelines`, `GET /api/cicd_pipelines/{id}`, `PUT /api/cicd_pipelines/{id}` … (+1 more) |
| HealthMonitoring | `app/routes/healthmonitoring_routes.py` | `GET /api/health_monitorings`, `POST /api/health_monitorings`, `GET /api/health_monitorings/{id}`, `PUT /api/health_monitorings/{id}` … (+1 more) |
| GenomeSpecGenerator | `app/routes/genomespecgenerator_routes.py` | `GET /api/genome_spec_generators`, `POST /api/genome_spec_generators`, `GET /api/genome_spec_generators/{id}`, `PUT /api/genome_spec_generators/{id}` … (+1 more) |
| CodeGenerationService | `app/routes/codegenerationservice_routes.py` | `GET /api/code_generation_services`, `POST /api/code_generation_services`, `GET /api/code_generation_services/{id}`, `PUT /api/code_generation_services/{id}` … (+1 more) |
| ExportService | `app/routes/exportservice_routes.py` | `GET /api/export_services`, `POST /api/export_services`, `GET /api/export_services/{id}`, `PUT /api/export_services/{id}` … (+1 more) |
| JourneySessionOrchestrator | `app/routes/journeysessionorchestrator_routes.py` | `GET /api/journey_session_orchestrators`, `POST /api/journey_session_orchestrators`, `GET /api/journey_session_orchestrators/{id}`, `PUT /api/journey_session_orchestrators/{id}` … (+1 more) |
| StripeWebhookHandler | `app/routes/stripewebhookhandler_routes.py` | `GET /api/stripe_webhook_handlers`, `POST /api/stripe_webhook_handlers`, `GET /api/stripe_webhook_handlers/{id}`, `PUT /api/stripe_webhook_handlers/{id}` … (+1 more) |
| RowLevelSecurityEnforcer | `app/routes/rowlevelsecurityenforcer_routes.py` | `GET /api/row_level_security_enforcers`, `POST /api/row_level_security_enforcers`, `GET /api/row_level_security_enforcers/{id}`, `PUT /api/row_level_security_enforcers/{id}` … (+1 more) |
| GdprComplianceService | `app/routes/gdprcomplianceservice_routes.py` | `GET /api/gdpr_compliance_services`, `POST /api/gdpr_compliance_services`, `GET /api/gdpr_compliance_services/{id}`, `PUT /api/gdpr_compliance_services/{id}` … (+1 more) |
| AiArchitectureEngine | `app/routes/aiarchitectureengine_routes.py` | `GET /api/ai_architecture_engines`, `POST /api/ai_architecture_engines`, `GET /api/ai_architecture_engines/{id}`, `PUT /api/ai_architecture_engines/{id}` … (+1 more) |
| UsageMeteringLimiting | `app/routes/usagemeteringlimiting_routes.py` | `GET /api/usage_metering_limitings`, `POST /api/usage_metering_limitings`, `GET /api/usage_metering_limitings/{id}`, `PUT /api/usage_metering_limitings/{id}` … (+1 more) |
| QualityScoringEngine | `app/routes/qualityscoringengine_routes.py` | `GET /api/quality_scoring_engines`, `POST /api/quality_scoring_engines`, `GET /api/quality_scoring_engines/{id}`, `PUT /api/quality_scoring_engines/{id}` … (+1 more) |
| GitHubIntegrationService | `app/routes/githubintegrationservice_routes.py` | `GET /api/git_hub_integration_services`, `POST /api/git_hub_integration_services`, `GET /api/git_hub_integration_services/{id}`, `PUT /api/git_hub_integration_services/{id}` … (+1 more) |
| CoreBusiness | `app/routes/corebusiness_routes.py` | `GET /api/core_businesses`, `POST /api/core_businesses`, `GET /api/core_businesses/{id}`, `PUT /api/core_businesses/{id}` … (+1 more) |
| KeyMetricsAndKpIs | `app/routes/keymetricsandkpis_routes.py` | `GET /api/key_metrics_and_kp_es`, `POST /api/key_metrics_and_kp_es`, `GET /api/key_metrics_and_kp_es/{id}`, `PUT /api/key_metrics_and_kp_es/{id}` … (+1 more) |
| AnalyticsDataStore | `app/routes/analyticsdatastore_routes.py` | `GET /api/analytics_data_stores`, `POST /api/analytics_data_stores`, `GET /api/analytics_data_stores/{id}`, `PUT /api/analytics_data_stores/{id}` … (+1 more) |
| Workspace | `app/routes/workspace_routes.py` | `GET /api/workspaces`, `POST /api/workspaces`, `GET /api/workspaces/{id}`, `PUT /api/workspaces/{id}` … (+1 more) |
| JourneySessionConversations | `app/routes/journeysessionconversations_routes.py` | `GET /api/journey_session_conversations`, `POST /api/journey_session_conversations`, `GET /api/journey_session_conversations/{id}`, `PUT /api/journey_session_conversations/{id}` … (+1 more) |
| GenomeSpecDefinitions | `app/routes/genomespecdefinitions_routes.py` | `GET /api/genome_spec_definitions`, `POST /api/genome_spec_definitions`, `GET /api/genome_spec_definitions/{id}`, `PUT /api/genome_spec_definitions/{id}` … (+1 more) |
| GeneratedCodeArtifacts | `app/routes/generatedcodeartifacts_routes.py` | `GET /api/generated_code_artifacts`, `POST /api/generated_code_artifacts`, `GET /api/generated_code_artifacts/{id}`, `PUT /api/generated_code_artifacts/{id}` … (+1 more) |

## Generated File Inventory

Total files: **507** (including this document)

```
app/__init__.py
wsgi.py
config.py
database.py
app/blueprints/smtprelaygcp_bp.py
app/models/smtprelaygcp.py
app/schemas/smtprelaygcp_schema.py
tests/test_smtprelaygcp.py
app/blueprints/primarydatastore_bp.py
app/models/primarydatastore.py
app/schemas/primarydatastore_schema.py
tests/test_primarydatastore.py
app/blueprints/identityandaccessmanagement_bp.py
app/models/identityandaccessmanagement.py
app/schemas/identityandaccessmanagement_schema.py
tests/test_identityandaccessmanagement.py
app/blueprints/authenticationservice_bp.py
app/models/authenticationservice.py
app/schemas/authenticationservice_schema.py
tests/test_authenticationservice.py
app/blueprints/monitoringplatform_bp.py
app/models/monitoringplatform.py
app/schemas/monitoringplatform_schema.py
tests/test_monitoringplatform.py
app/blueprints/analyticsengine_bp.py
app/models/analyticsengine.py
app/schemas/analyticsengine_schema.py
tests/test_analyticsengine.py
app/blueprints/reportingservice_bp.py
app/models/reportingservice.py
app/schemas/reportingservice_schema.py
tests/test_reportingservice.py
app/blueprints/gcpcohesityforsystemsbackup_bp.py
app/models/gcpcohesityforsystemsbackup.py
app/schemas/gcpcohesityforsystemsbackup_schema.py
tests/test_gcpcohesityforsystemsbackup.py
app/blueprints/apigateway_bp.py
app/models/apigateway.py
app/schemas/apigateway_schema.py
tests/test_apigateway.py
app/blueprints/messagebroker_bp.py
app/models/messagebroker.py
app/schemas/messagebroker_schema.py
tests/test_messagebroker.py
app/blueprints/businesslogiclayer_bp.py
app/models/businesslogiclayer.py
app/schemas/businesslogiclayer_schema.py
tests/test_businesslogiclayer.py
app/blueprints/corebusinessfunction_bp.py
app/models/corebusinessfunction.py
app/schemas/corebusinessfunction_schema.py
tests/test_corebusinessfunction.py
app/blueprints/corebusinessapi_bp.py
app/models/corebusinessapi.py
app/schemas/corebusinessapi_schema.py
tests/test_corebusinessapi.py
app/blueprints/frontendapplication_bp.py
app/models/frontendapplication.py
app/schemas/frontendapplication_schema.py
tests/test_frontendapplication.py
app/blueprints/activedirectoryad_bp.py
app/models/activedirectoryad.py
app/schemas/activedirectoryad_schema.py
tests/test_activedirectoryad.py
app/blueprints/notificationservice_bp.py
app/models/notificationservice.py
app/schemas/notificationservice_schema.py
tests/test_notificationservice.py
app/blueprints/googlegeminimodels_bp.py
app/models/googlegeminimodels.py
app/schemas/googlegeminimodels_schema.py
tests/test_googlegeminimodels.py
app/blueprints/veritasnetbackupsaas_bp.py
app/models/veritasnetbackupsaas.py
app/schemas/veritasnetbackupsaas_schema.py
tests/test_veritasnetbackupsaas.py
app/blueprints/blueprintjourneyinterface_bp.py
app/models/blueprintjourneyinterface.py
app/schemas/blueprintjourneyinterface_schema.py
tests/test_blueprintjourneyinterface.py
app/blueprints/architecturetemplategallery_bp.py
app/models/architecturetemplategallery.py
app/schemas/architecturetemplategallery_schema.py
tests/test_architecturetemplategallery.py
app/blueprints/blueprintpublicviewer_bp.py
app/models/blueprintpublicviewer.py
app/schemas/blueprintpublicviewer_schema.py
tests/test_blueprintpublicviewer.py
app/blueprints/cicdtoolchain_bp.py
app/models/cicdtoolchain.py
app/schemas/cicdtoolchain_schema.py
tests/test_cicdtoolchain.py
app/blueprints/cicdpipeline_bp.py
app/models/cicdpipeline.py
app/schemas/cicdpipeline_schema.py
tests/test_cicdpipeline.py
app/blueprints/healthmonitoring_bp.py
app/models/healthmonitoring.py
app/schemas/healthmonitoring_schema.py
tests/test_healthmonitoring.py
app/blueprints/genomespecgenerator_bp.py
app/models/genomespecgenerator.py
app/schemas/genomespecgenerator_schema.py
tests/test_genomespecgenerator.py
app/blueprints/codegenerationservice_bp.py
app/models/codegenerationservice.py
app/schemas/codegenerationservice_schema.py
tests/test_codegenerationservice.py
app/blueprints/exportservice_bp.py
app/models/exportservice.py
app/schemas/exportservice_schema.py
tests/test_exportservice.py
app/blueprints/journeysessionorchestrator_bp.py
app/models/journeysessionorchestrator.py
app/schemas/journeysessionorchestrator_schema.py
tests/test_journeysessionorchestrator.py
app/blueprints/stripewebhookhandler_bp.py
app/models/stripewebhookhandler.py
app/schemas/stripewebhookhandler_schema.py
tests/test_stripewebhookhandler.py
app/blueprints/rowlevelsecurityenforcer_bp.py
app/models/rowlevelsecurityenforcer.py
app/schemas/rowlevelsecurityenforcer_schema.py
tests/test_rowlevelsecurityenforcer.py
app/blueprints/gdprcomplianceservice_bp.py
app/models/gdprcomplianceservice.py
app/schemas/gdprcomplianceservice_schema.py
tests/test_gdprcomplianceservice.py
app/blueprints/aiarchitectureengine_bp.py
app/models/aiarchitectureengine.py
app/schemas/aiarchitectureengine_schema.py
tests/test_aiarchitectureengine.py
app/blueprints/usagemeteringlimiting_bp.py
app/models/usagemeteringlimiting.py
app/schemas/usagemeteringlimiting_schema.py
tests/test_usagemeteringlimiting.py
app/blueprints/qualityscoringengine_bp.py
app/models/qualityscoringengine.py
app/schemas/qualityscoringengine_schema.py
tests/test_qualityscoringengine.py
app/blueprints/githubintegrationservice_bp.py
app/models/githubintegrationservice.py
app/schemas/githubintegrationservice_schema.py
tests/test_githubintegrationservice.py
app/blueprints/corebusiness_bp.py
app/models/corebusiness.py
app/schemas/corebusiness_schema.py
tests/test_corebusiness.py
app/blueprints/keymetricsandkpis_bp.py
app/models/keymetricsandkpis.py
app/schemas/keymetricsandkpis_schema.py
tests/test_keymetricsandkpis.py
app/blueprints/analyticsdatastore_bp.py
app/models/analyticsdatastore.py
app/schemas/analyticsdatastore_schema.py
tests/test_analyticsdatastore.py
app/blueprints/workspace_bp.py
app/models/workspace.py
app/schemas/workspace_schema.py
tests/test_workspace.py
app/blueprints/journeysessionconversations_bp.py
app/models/journeysessionconversations.py
app/schemas/journeysessionconversations_schema.py
tests/test_journeysessionconversations.py
app/blueprints/genomespecdefinitions_bp.py
app/models/genomespecdefinitions.py
app/schemas/genomespecdefinitions_schema.py
tests/test_genomespecdefinitions.py
app/blueprints/generatedcodeartifacts_bp.py
app/models/generatedcodeartifacts.py
app/schemas/generatedcodeartifacts_schema.py
tests/test_generatedcodeartifacts.py
app/blueprints/auth_bp.py
requirements.txt
Dockerfile
docker-compose.yml
GENERATED.md
Makefile
.env.example
README.md
.gitignore
bootstrap.sh
.github/workflows/deploy.yml
terraform/main.tf
terraform/rds.tf
terraform/variables.tf
terraform/outputs.tf
k8s/deployment.yaml
helm/values.yaml
openapi.yaml
CLAUDE.md
app/static/admin.html
app/blueprints/__init__.py
app/models/__init__.py
app/schemas/__init__.py
tests/__init__.py
frontend/package.json
frontend/tailwind.config.ts
frontend/tsconfig.json
frontend/next.config.js
frontend/postcss.config.js
frontend/Dockerfile
frontend/app/globals.css
frontend/app/providers.tsx
frontend/app/error.tsx
frontend/app/not-found.tsx
frontend/app/loading.tsx
frontend/lib/utils.ts
frontend/app/login/page.tsx
frontend/app/login/layout.tsx
frontend/middleware.ts
frontend/lib/auth-context.tsx
frontend/components/require-auth.tsx
frontend/components/entity-picker.tsx
frontend/app/layout.tsx
frontend/app/not-found.tsx
frontend/app/(protected)/layout.tsx
frontend/components/ui/button.tsx
frontend/components/ui/badge.tsx
frontend/components/ui/input.tsx
frontend/components/ui/table.tsx
frontend/components/ui/card.tsx
frontend/components/ui/skeleton.tsx
frontend/components/ui/separator.tsx
frontend/components/ui/label.tsx
frontend/components/ui/textarea.tsx
frontend/components/ui/select.tsx
frontend/components/ui/dialog.tsx
frontend/components/ui/dropdown-menu.tsx
frontend/components/ui/switch.tsx
frontend/components/ui/tooltip.tsx
frontend/components/ui/avatar.tsx
frontend/components/ui/toast.tsx
frontend/components/ui/form.tsx
frontend/components/ui/command.tsx
frontend/components/ui/popover.tsx
frontend/components/data-table.tsx
frontend/lib/schemas.ts
frontend/app/login/page.tsx
frontend/components/layout/sidebar.tsx
frontend/components/layout/topbar.tsx
frontend/app/page.tsx
frontend/app/(protected)/dashboard/page.tsx
frontend/lib/api.ts
frontend/app/smtp_relay_gcp/page.tsx
frontend/app/smtp_relay_gcp/new/page.tsx
frontend/app/smtp_relay_gcp/[id]/page.tsx
frontend/app/smtp_relay_gcp/[id]/edit/page.tsx
frontend/app/primary_data_store/page.tsx
frontend/app/primary_data_store/new/page.tsx
frontend/app/primary_data_store/[id]/page.tsx
frontend/app/primary_data_store/[id]/edit/page.tsx
frontend/app/identity_and_access_management/page.tsx
frontend/app/identity_and_access_management/new/page.tsx
frontend/app/identity_and_access_management/[id]/page.tsx
frontend/app/identity_and_access_management/[id]/edit/page.tsx
frontend/app/authentication_service/page.tsx
frontend/app/authentication_service/new/page.tsx
frontend/app/authentication_service/[id]/page.tsx
frontend/app/authentication_service/[id]/edit/page.tsx
frontend/app/monitoring_platform/page.tsx
frontend/app/monitoring_platform/new/page.tsx
frontend/app/monitoring_platform/[id]/page.tsx
frontend/app/monitoring_platform/[id]/edit/page.tsx
frontend/app/analytics_engine/page.tsx
frontend/app/analytics_engine/new/page.tsx
frontend/app/analytics_engine/[id]/page.tsx
frontend/app/analytics_engine/[id]/edit/page.tsx
frontend/app/reporting_service/page.tsx
frontend/app/reporting_service/new/page.tsx
frontend/app/reporting_service/[id]/page.tsx
frontend/app/reporting_service/[id]/edit/page.tsx
frontend/app/gcp_cohesity_for_systems_backup/page.tsx
frontend/app/gcp_cohesity_for_systems_backup/new/page.tsx
frontend/app/gcp_cohesity_for_systems_backup/[id]/page.tsx
frontend/app/gcp_cohesity_for_systems_backup/[id]/edit/page.tsx
frontend/app/api_gateway/page.tsx
frontend/app/api_gateway/new/page.tsx
frontend/app/api_gateway/[id]/page.tsx
frontend/app/api_gateway/[id]/edit/page.tsx
frontend/app/message_broker/page.tsx
frontend/app/message_broker/new/page.tsx
frontend/app/message_broker/[id]/page.tsx
frontend/app/message_broker/[id]/edit/page.tsx
frontend/app/business_logic_layer/page.tsx
frontend/app/business_logic_layer/new/page.tsx
frontend/app/business_logic_layer/[id]/page.tsx
frontend/app/business_logic_layer/[id]/edit/page.tsx
frontend/app/core_business_function/page.tsx
frontend/app/core_business_function/new/page.tsx
frontend/app/core_business_function/[id]/page.tsx
frontend/app/core_business_function/[id]/edit/page.tsx
frontend/app/core_business_api/page.tsx
frontend/app/core_business_api/new/page.tsx
frontend/app/core_business_api/[id]/page.tsx
frontend/app/core_business_api/[id]/edit/page.tsx
frontend/app/frontend_application/page.tsx
frontend/app/frontend_application/new/page.tsx
frontend/app/frontend_application/[id]/page.tsx
frontend/app/frontend_application/[id]/edit/page.tsx
frontend/app/active_directory_ad/page.tsx
frontend/app/active_directory_ad/new/page.tsx
frontend/app/active_directory_ad/[id]/page.tsx
frontend/app/active_directory_ad/[id]/edit/page.tsx
frontend/app/notification_service/page.tsx
frontend/app/notification_service/new/page.tsx
frontend/app/notification_service/[id]/page.tsx
frontend/app/notification_service/[id]/edit/page.tsx
frontend/app/google_gemini_models/page.tsx
frontend/app/google_gemini_models/new/page.tsx
frontend/app/google_gemini_models/[id]/page.tsx
frontend/app/google_gemini_models/[id]/edit/page.tsx
frontend/app/veritas_netbackup_saa_s/page.tsx
frontend/app/veritas_netbackup_saa_s/new/page.tsx
frontend/app/veritas_netbackup_saa_s/[id]/page.tsx
frontend/app/veritas_netbackup_saa_s/[id]/edit/page.tsx
frontend/app/blueprint_journey_interface/page.tsx
frontend/app/blueprint_journey_interface/new/page.tsx
frontend/app/blueprint_journey_interface/[id]/page.tsx
frontend/app/blueprint_journey_interface/[id]/edit/page.tsx
frontend/app/architecture_template_gallery/page.tsx
frontend/app/architecture_template_gallery/new/page.tsx
frontend/app/architecture_template_gallery/[id]/page.tsx
frontend/app/architecture_template_gallery/[id]/edit/page.tsx
frontend/app/blueprint_public_viewer/page.tsx
frontend/app/blueprint_public_viewer/new/page.tsx
frontend/app/blueprint_public_viewer/[id]/page.tsx
frontend/app/blueprint_public_viewer/[id]/edit/page.tsx
frontend/app/cicd_toolchain/page.tsx
frontend/app/cicd_toolchain/new/page.tsx
frontend/app/cicd_toolchain/[id]/page.tsx
frontend/app/cicd_toolchain/[id]/edit/page.tsx
frontend/app/cicd_pipeline/page.tsx
frontend/app/cicd_pipeline/new/page.tsx
frontend/app/cicd_pipeline/[id]/page.tsx
frontend/app/cicd_pipeline/[id]/edit/page.tsx
frontend/app/health_monitoring/page.tsx
frontend/app/health_monitoring/new/page.tsx
frontend/app/health_monitoring/[id]/page.tsx
frontend/app/health_monitoring/[id]/edit/page.tsx
frontend/app/genome_spec_generator/page.tsx
frontend/app/genome_spec_generator/new/page.tsx
frontend/app/genome_spec_generator/[id]/page.tsx
frontend/app/genome_spec_generator/[id]/edit/page.tsx
frontend/app/code_generation_service/page.tsx
frontend/app/code_generation_service/new/page.tsx
frontend/app/code_generation_service/[id]/page.tsx
frontend/app/code_generation_service/[id]/edit/page.tsx
frontend/app/export_service/page.tsx
frontend/app/export_service/new/page.tsx
frontend/app/export_service/[id]/page.tsx
frontend/app/export_service/[id]/edit/page.tsx
frontend/app/journey_session_orchestrator/page.tsx
frontend/app/journey_session_orchestrator/new/page.tsx
frontend/app/journey_session_orchestrator/[id]/page.tsx
frontend/app/journey_session_orchestrator/[id]/edit/page.tsx
frontend/app/stripe_webhook_handler/page.tsx
frontend/app/stripe_webhook_handler/new/page.tsx
frontend/app/stripe_webhook_handler/[id]/page.tsx
frontend/app/stripe_webhook_handler/[id]/edit/page.tsx
frontend/app/row_level_security_enforcer/page.tsx
frontend/app/row_level_security_enforcer/new/page.tsx
frontend/app/row_level_security_enforcer/[id]/page.tsx
frontend/app/row_level_security_enforcer/[id]/edit/page.tsx
frontend/app/gdpr_compliance_service/page.tsx
frontend/app/gdpr_compliance_service/new/page.tsx
frontend/app/gdpr_compliance_service/[id]/page.tsx
frontend/app/gdpr_compliance_service/[id]/edit/page.tsx
frontend/app/ai_architecture_engine/page.tsx
frontend/app/ai_architecture_engine/new/page.tsx
frontend/app/ai_architecture_engine/[id]/page.tsx
frontend/app/ai_architecture_engine/[id]/edit/page.tsx
frontend/app/usage_metering_limiting/page.tsx
frontend/app/usage_metering_limiting/new/page.tsx
frontend/app/usage_metering_limiting/[id]/page.tsx
frontend/app/usage_metering_limiting/[id]/edit/page.tsx
frontend/app/quality_scoring_engine/page.tsx
frontend/app/quality_scoring_engine/new/page.tsx
frontend/app/quality_scoring_engine/[id]/page.tsx
frontend/app/quality_scoring_engine/[id]/edit/page.tsx
frontend/app/git_hub_integration_service/page.tsx
frontend/app/git_hub_integration_service/new/page.tsx
frontend/app/git_hub_integration_service/[id]/page.tsx
frontend/app/git_hub_integration_service/[id]/edit/page.tsx
frontend/app/core_business/page.tsx
frontend/app/core_business/new/page.tsx
frontend/app/core_business/[id]/page.tsx
frontend/app/core_business/[id]/edit/page.tsx
frontend/app/key_metrics_and_kp_is/page.tsx
frontend/app/key_metrics_and_kp_is/new/page.tsx
frontend/app/key_metrics_and_kp_is/[id]/page.tsx
frontend/app/key_metrics_and_kp_is/[id]/edit/page.tsx
frontend/app/analytics_data_store/page.tsx
frontend/app/analytics_data_store/new/page.tsx
frontend/app/analytics_data_store/[id]/page.tsx
frontend/app/analytics_data_store/[id]/edit/page.tsx
frontend/app/workspace/page.tsx
frontend/app/workspace/new/page.tsx
frontend/app/workspace/[id]/page.tsx
frontend/app/workspace/[id]/edit/page.tsx
frontend/app/journey_session_conversations/page.tsx
frontend/app/journey_session_conversations/new/page.tsx
frontend/app/journey_session_conversations/[id]/page.tsx
frontend/app/journey_session_conversations/[id]/edit/page.tsx
frontend/app/genome_spec_definitions/page.tsx
frontend/app/genome_spec_definitions/new/page.tsx
frontend/app/genome_spec_definitions/[id]/page.tsx
frontend/app/genome_spec_definitions/[id]/edit/page.tsx
frontend/app/generated_code_artifacts/page.tsx
frontend/app/generated_code_artifacts/new/page.tsx
frontend/app/generated_code_artifacts/[id]/page.tsx
frontend/app/generated_code_artifacts/[id]/edit/page.tsx
frontend/app/admin/page.tsx
frontend/jest.config.ts
frontend/jest.setup.ts
frontend/playwright.config.ts
frontend/__tests__/auth.test.tsx
frontend/__tests__/accessibility.test.tsx
frontend/e2e/auth.spec.ts
frontend/__tests__/smtp_relay_gcp.test.tsx
frontend/e2e/smtp_relay_gcp.spec.ts
frontend/__tests__/primary_data_store.test.tsx
frontend/e2e/primary_data_store.spec.ts
frontend/__tests__/identity_and_access_management.test.tsx
frontend/e2e/identity_and_access_management.spec.ts
frontend/__tests__/authentication_service.test.tsx
frontend/e2e/authentication_service.spec.ts
frontend/__tests__/monitoring_platform.test.tsx
frontend/e2e/monitoring_platform.spec.ts
frontend/__tests__/analytics_engine.test.tsx
frontend/e2e/analytics_engine.spec.ts
frontend/__tests__/reporting_service.test.tsx
frontend/e2e/reporting_service.spec.ts
frontend/__tests__/gcp_cohesity_for_systems_backup.test.tsx
frontend/e2e/gcp_cohesity_for_systems_backup.spec.ts
frontend/__tests__/api_gateway.test.tsx
frontend/e2e/api_gateway.spec.ts
frontend/__tests__/message_broker.test.tsx
frontend/e2e/message_broker.spec.ts
frontend/__tests__/business_logic_layer.test.tsx
frontend/e2e/business_logic_layer.spec.ts
frontend/__tests__/core_business_function.test.tsx
frontend/e2e/core_business_function.spec.ts
frontend/__tests__/core_business_api.test.tsx
frontend/e2e/core_business_api.spec.ts
frontend/__tests__/frontend_application.test.tsx
frontend/e2e/frontend_application.spec.ts
frontend/__tests__/active_directory_ad.test.tsx
frontend/e2e/active_directory_ad.spec.ts
frontend/__tests__/notification_service.test.tsx
frontend/e2e/notification_service.spec.ts
frontend/__tests__/google_gemini_models.test.tsx
frontend/e2e/google_gemini_models.spec.ts
frontend/__tests__/veritas_netbackup_saa_s.test.tsx
frontend/e2e/veritas_netbackup_saa_s.spec.ts
frontend/__tests__/blueprint_journey_interface.test.tsx
frontend/e2e/blueprint_journey_interface.spec.ts
frontend/__tests__/architecture_template_gallery.test.tsx
frontend/e2e/architecture_template_gallery.spec.ts
frontend/__tests__/blueprint_public_viewer.test.tsx
frontend/e2e/blueprint_public_viewer.spec.ts
frontend/__tests__/cicd_toolchain.test.tsx
frontend/e2e/cicd_toolchain.spec.ts
frontend/__tests__/cicd_pipeline.test.tsx
frontend/e2e/cicd_pipeline.spec.ts
frontend/__tests__/health_monitoring.test.tsx
frontend/e2e/health_monitoring.spec.ts
frontend/__tests__/genome_spec_generator.test.tsx
frontend/e2e/genome_spec_generator.spec.ts
frontend/__tests__/code_generation_service.test.tsx
frontend/e2e/code_generation_service.spec.ts
frontend/__tests__/export_service.test.tsx
frontend/e2e/export_service.spec.ts
frontend/__tests__/journey_session_orchestrator.test.tsx
frontend/e2e/journey_session_orchestrator.spec.ts
frontend/__tests__/stripe_webhook_handler.test.tsx
frontend/e2e/stripe_webhook_handler.spec.ts
frontend/__tests__/row_level_security_enforcer.test.tsx
frontend/e2e/row_level_security_enforcer.spec.ts
frontend/__tests__/gdpr_compliance_service.test.tsx
frontend/e2e/gdpr_compliance_service.spec.ts
frontend/__tests__/ai_architecture_engine.test.tsx
frontend/e2e/ai_architecture_engine.spec.ts
frontend/__tests__/usage_metering_limiting.test.tsx
frontend/e2e/usage_metering_limiting.spec.ts
frontend/__tests__/quality_scoring_engine.test.tsx
frontend/e2e/quality_scoring_engine.spec.ts
frontend/__tests__/git_hub_integration_service.test.tsx
frontend/e2e/git_hub_integration_service.spec.ts
frontend/__tests__/core_business.test.tsx
frontend/e2e/core_business.spec.ts
frontend/__tests__/key_metrics_and_kp_is.test.tsx
frontend/e2e/key_metrics_and_kp_is.spec.ts
frontend/__tests__/analytics_data_store.test.tsx
frontend/e2e/analytics_data_store.spec.ts
frontend/__tests__/workspace.test.tsx
frontend/e2e/workspace.spec.ts
frontend/__tests__/journey_session_conversations.test.tsx
frontend/e2e/journey_session_conversations.spec.ts
frontend/__tests__/genome_spec_definitions.test.tsx
frontend/e2e/genome_spec_definitions.spec.ts
frontend/__tests__/generated_code_artifacts.test.tsx
frontend/e2e/generated_code_artifacts.spec.ts
frontend/PRINCIPLES.md
frontend/DOMAIN.md
frontend/DEPENDENCIES.md
ARCHITECTURE.md
```

---
*Architecture context + traceability auto-generated by A.R.C.H.I.E.*
*LLMs: use this document to understand WHY this code exists and WHAT constraints apply.*
