"""Typed client for New Solution (Draft) API — auto-generated from openapi.yaml by A.R.C.H.I.E.

Do not edit manually — regenerate via the Code Workbench.
"""
import httpx

class NewSolutionDraftClient:
    """HTTP client for New Solution (Draft) (48 endpoints)."""

    def __init__(self, base_url: str, auth_token: str = None, timeout: float = 10.0):
        headers = {}
        if auth_token:
            headers['Authorization'] = f'Bearer {auth_token}'
        self._client = httpx.Client(base_url=base_url, headers=headers, timeout=timeout)

    def close(self):
        self._client.close()

    def __enter__(self):
        return self

    def __exit__(self, *_):
        self.close()

    def list_customer_data_management_system(self) -> dict:
        """GET /api/customer_data_management_systems — List CustomerDataManagementSystem"""
        r = self._client.get(f"/api/customer_data_management_systems")
        r.raise_for_status()
        return r.json()

    def create_customer_data_management_system(self, body: dict = None) -> dict:
        """POST /api/customer_data_management_systems — Create CustomerDataManagementSystem"""
        r = self._client.post(f"/api/customer_data_management_systems", json=body)
        r.raise_for_status()
        return r.json()

    def get_customer_data_management_system(self, id, ) -> dict:
        """GET /api/customer_data_management_systems/{id} — Get CustomerDataManagementSystem"""
        r = self._client.get(f"/api/customer_data_management_systems/{id}")
        r.raise_for_status()
        return r.json()

    def update_customer_data_management_system(self, id, body: dict = None) -> dict:
        """POST /api/customer_data_management_systems/{id} — Update CustomerDataManagementSystem"""
        r = self._client.put(f"/api/customer_data_management_systems/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def delete_customer_data_management_system(self, id, ) -> dict:
        """DELETE /api/customer_data_management_systems/{id} — Delete CustomerDataManagementSystem"""
        r = self._client.delete(f"/api/customer_data_management_systems/{id}")
        r.raise_for_status()
        return r.json()

    def patch_customer_data_management_system(self, id, body: dict = None) -> dict:
        """POST /api/customer_data_management_systems/{id} — Partial update CustomerDataManagementSystem"""
        r = self._client.patch(f"/api/customer_data_management_systems/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def list_insurance_policy(self) -> dict:
        """GET /api/insurance_policies — List InsurancePolicy"""
        r = self._client.get(f"/api/insurance_policies")
        r.raise_for_status()
        return r.json()

    def create_insurance_policy(self, body: dict = None) -> dict:
        """POST /api/insurance_policies — Create InsurancePolicy"""
        r = self._client.post(f"/api/insurance_policies", json=body)
        r.raise_for_status()
        return r.json()

    def get_insurance_policy(self, id, ) -> dict:
        """GET /api/insurance_policies/{id} — Get InsurancePolicy"""
        r = self._client.get(f"/api/insurance_policies/{id}")
        r.raise_for_status()
        return r.json()

    def update_insurance_policy(self, id, body: dict = None) -> dict:
        """POST /api/insurance_policies/{id} — Update InsurancePolicy"""
        r = self._client.put(f"/api/insurance_policies/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def delete_insurance_policy(self, id, ) -> dict:
        """DELETE /api/insurance_policies/{id} — Delete InsurancePolicy"""
        r = self._client.delete(f"/api/insurance_policies/{id}")
        r.raise_for_status()
        return r.json()

    def patch_insurance_policy(self, id, body: dict = None) -> dict:
        """POST /api/insurance_policies/{id} — Partial update InsurancePolicy"""
        r = self._client.patch(f"/api/insurance_policies/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def list_policy_application(self) -> dict:
        """GET /api/policy_applications — List PolicyApplication"""
        r = self._client.get(f"/api/policy_applications")
        r.raise_for_status()
        return r.json()

    def create_policy_application(self, body: dict = None) -> dict:
        """POST /api/policy_applications — Create PolicyApplication"""
        r = self._client.post(f"/api/policy_applications", json=body)
        r.raise_for_status()
        return r.json()

    def get_policy_application(self, id, ) -> dict:
        """GET /api/policy_applications/{id} — Get PolicyApplication"""
        r = self._client.get(f"/api/policy_applications/{id}")
        r.raise_for_status()
        return r.json()

    def update_policy_application(self, id, body: dict = None) -> dict:
        """POST /api/policy_applications/{id} — Update PolicyApplication"""
        r = self._client.put(f"/api/policy_applications/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def delete_policy_application(self, id, ) -> dict:
        """DELETE /api/policy_applications/{id} — Delete PolicyApplication"""
        r = self._client.delete(f"/api/policy_applications/{id}")
        r.raise_for_status()
        return r.json()

    def patch_policy_application(self, id, body: dict = None) -> dict:
        """POST /api/policy_applications/{id} — Partial update PolicyApplication"""
        r = self._client.patch(f"/api/policy_applications/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def list_risk_profile(self) -> dict:
        """GET /api/risk_profiles — List RiskProfile"""
        r = self._client.get(f"/api/risk_profiles")
        r.raise_for_status()
        return r.json()

    def create_risk_profile(self, body: dict = None) -> dict:
        """POST /api/risk_profiles — Create RiskProfile"""
        r = self._client.post(f"/api/risk_profiles", json=body)
        r.raise_for_status()
        return r.json()

    def get_risk_profile(self, id, ) -> dict:
        """GET /api/risk_profiles/{id} — Get RiskProfile"""
        r = self._client.get(f"/api/risk_profiles/{id}")
        r.raise_for_status()
        return r.json()

    def update_risk_profile(self, id, body: dict = None) -> dict:
        """POST /api/risk_profiles/{id} — Update RiskProfile"""
        r = self._client.put(f"/api/risk_profiles/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def delete_risk_profile(self, id, ) -> dict:
        """DELETE /api/risk_profiles/{id} — Delete RiskProfile"""
        r = self._client.delete(f"/api/risk_profiles/{id}")
        r.raise_for_status()
        return r.json()

    def patch_risk_profile(self, id, body: dict = None) -> dict:
        """POST /api/risk_profiles/{id} — Partial update RiskProfile"""
        r = self._client.patch(f"/api/risk_profiles/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def list_customer_record(self) -> dict:
        """GET /api/customer_records — List CustomerRecord"""
        r = self._client.get(f"/api/customer_records")
        r.raise_for_status()
        return r.json()

    def create_customer_record(self, body: dict = None) -> dict:
        """POST /api/customer_records — Create CustomerRecord"""
        r = self._client.post(f"/api/customer_records", json=body)
        r.raise_for_status()
        return r.json()

    def get_customer_record(self, id, ) -> dict:
        """GET /api/customer_records/{id} — Get CustomerRecord"""
        r = self._client.get(f"/api/customer_records/{id}")
        r.raise_for_status()
        return r.json()

    def update_customer_record(self, id, body: dict = None) -> dict:
        """POST /api/customer_records/{id} — Update CustomerRecord"""
        r = self._client.put(f"/api/customer_records/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def delete_customer_record(self, id, ) -> dict:
        """DELETE /api/customer_records/{id} — Delete CustomerRecord"""
        r = self._client.delete(f"/api/customer_records/{id}")
        r.raise_for_status()
        return r.json()

    def patch_customer_record(self, id, body: dict = None) -> dict:
        """POST /api/customer_records/{id} — Partial update CustomerRecord"""
        r = self._client.patch(f"/api/customer_records/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def list_policy_document(self) -> dict:
        """GET /api/policy_documents — List PolicyDocument"""
        r = self._client.get(f"/api/policy_documents")
        r.raise_for_status()
        return r.json()

    def create_policy_document(self, body: dict = None) -> dict:
        """POST /api/policy_documents — Create PolicyDocument"""
        r = self._client.post(f"/api/policy_documents", json=body)
        r.raise_for_status()
        return r.json()

    def get_policy_document(self, id, ) -> dict:
        """GET /api/policy_documents/{id} — Get PolicyDocument"""
        r = self._client.get(f"/api/policy_documents/{id}")
        r.raise_for_status()
        return r.json()

    def update_policy_document(self, id, body: dict = None) -> dict:
        """POST /api/policy_documents/{id} — Update PolicyDocument"""
        r = self._client.put(f"/api/policy_documents/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def delete_policy_document(self, id, ) -> dict:
        """DELETE /api/policy_documents/{id} — Delete PolicyDocument"""
        r = self._client.delete(f"/api/policy_documents/{id}")
        r.raise_for_status()
        return r.json()

    def patch_policy_document(self, id, body: dict = None) -> dict:
        """POST /api/policy_documents/{id} — Partial update PolicyDocument"""
        r = self._client.patch(f"/api/policy_documents/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def list_incident_report(self) -> dict:
        """GET /api/incident_reports — List IncidentReport"""
        r = self._client.get(f"/api/incident_reports")
        r.raise_for_status()
        return r.json()

    def create_incident_report(self, body: dict = None) -> dict:
        """POST /api/incident_reports — Create IncidentReport"""
        r = self._client.post(f"/api/incident_reports", json=body)
        r.raise_for_status()
        return r.json()

    def get_incident_report(self, id, ) -> dict:
        """GET /api/incident_reports/{id} — Get IncidentReport"""
        r = self._client.get(f"/api/incident_reports/{id}")
        r.raise_for_status()
        return r.json()

    def update_incident_report(self, id, body: dict = None) -> dict:
        """POST /api/incident_reports/{id} — Update IncidentReport"""
        r = self._client.put(f"/api/incident_reports/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def delete_incident_report(self, id, ) -> dict:
        """DELETE /api/incident_reports/{id} — Delete IncidentReport"""
        r = self._client.delete(f"/api/incident_reports/{id}")
        r.raise_for_status()
        return r.json()

    def patch_incident_report(self, id, body: dict = None) -> dict:
        """POST /api/incident_reports/{id} — Partial update IncidentReport"""
        r = self._client.patch(f"/api/incident_reports/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def list_application_log(self) -> dict:
        """GET /api/application_logs — List ApplicationLog"""
        r = self._client.get(f"/api/application_logs")
        r.raise_for_status()
        return r.json()

    def create_application_log(self, body: dict = None) -> dict:
        """POST /api/application_logs — Create ApplicationLog"""
        r = self._client.post(f"/api/application_logs", json=body)
        r.raise_for_status()
        return r.json()

    def get_application_log(self, id, ) -> dict:
        """GET /api/application_logs/{id} — Get ApplicationLog"""
        r = self._client.get(f"/api/application_logs/{id}")
        r.raise_for_status()
        return r.json()

    def update_application_log(self, id, body: dict = None) -> dict:
        """POST /api/application_logs/{id} — Update ApplicationLog"""
        r = self._client.put(f"/api/application_logs/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def delete_application_log(self, id, ) -> dict:
        """DELETE /api/application_logs/{id} — Delete ApplicationLog"""
        r = self._client.delete(f"/api/application_logs/{id}")
        r.raise_for_status()
        return r.json()

    def patch_application_log(self, id, body: dict = None) -> dict:
        """POST /api/application_logs/{id} — Partial update ApplicationLog"""
        r = self._client.patch(f"/api/application_logs/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def list_risk_assessment_report(self) -> dict:
        """GET /api/risk_assessment_reports — List RiskAssessmentReport"""
        r = self._client.get(f"/api/risk_assessment_reports")
        r.raise_for_status()
        return r.json()

    def create_risk_assessment_report(self, body: dict = None) -> dict:
        """POST /api/risk_assessment_reports — Create RiskAssessmentReport"""
        r = self._client.post(f"/api/risk_assessment_reports", json=body)
        r.raise_for_status()
        return r.json()

    def get_risk_assessment_report(self, id, ) -> dict:
        """GET /api/risk_assessment_reports/{id} — Get RiskAssessmentReport"""
        r = self._client.get(f"/api/risk_assessment_reports/{id}")
        r.raise_for_status()
        return r.json()

    def update_risk_assessment_report(self, id, body: dict = None) -> dict:
        """POST /api/risk_assessment_reports/{id} — Update RiskAssessmentReport"""
        r = self._client.put(f"/api/risk_assessment_reports/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def delete_risk_assessment_report(self, id, ) -> dict:
        """DELETE /api/risk_assessment_reports/{id} — Delete RiskAssessmentReport"""
        r = self._client.delete(f"/api/risk_assessment_reports/{id}")
        r.raise_for_status()
        return r.json()

    def patch_risk_assessment_report(self, id, body: dict = None) -> dict:
        """POST /api/risk_assessment_reports/{id} — Partial update RiskAssessmentReport"""
        r = self._client.patch(f"/api/risk_assessment_reports/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def list_underwriting_rules(self) -> dict:
        """GET /api/underwriting_ruleses — List UnderwritingRules"""
        r = self._client.get(f"/api/underwriting_ruleses")
        r.raise_for_status()
        return r.json()

    def create_underwriting_rules(self, body: dict = None) -> dict:
        """POST /api/underwriting_ruleses — Create UnderwritingRules"""
        r = self._client.post(f"/api/underwriting_ruleses", json=body)
        r.raise_for_status()
        return r.json()

    def get_underwriting_rules(self, id, ) -> dict:
        """GET /api/underwriting_ruleses/{id} — Get UnderwritingRules"""
        r = self._client.get(f"/api/underwriting_ruleses/{id}")
        r.raise_for_status()
        return r.json()

    def update_underwriting_rules(self, id, body: dict = None) -> dict:
        """POST /api/underwriting_ruleses/{id} — Update UnderwritingRules"""
        r = self._client.put(f"/api/underwriting_ruleses/{id}", json=body)
        r.raise_for_status()
        return r.json()

    def delete_underwriting_rules(self, id, ) -> dict:
        """DELETE /api/underwriting_ruleses/{id} — Delete UnderwritingRules"""
        r = self._client.delete(f"/api/underwriting_ruleses/{id}")
        r.raise_for_status()
        return r.json()

    def patch_underwriting_rules(self, id, body: dict = None) -> dict:
        """POST /api/underwriting_ruleses/{id} — Partial update UnderwritingRules"""
        r = self._client.patch(f"/api/underwriting_ruleses/{id}", json=body)
        r.raise_for_status()
        return r.json()
