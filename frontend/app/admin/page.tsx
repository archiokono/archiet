

"use client"

import { useQuery } from "@tanstack/react-query"
import {
  Activity,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle2,
  BarChart3,

























































































  Box,

} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/api"

function useEntityCount(path: string) {
  return useQuery({
    queryKey: [path, "admin-count"],
    queryFn: () => api.get<any>(path),
    // API returns either an array or a paginated { items, total } object
    select: (data: any) =>
      Array.isArray(data)
        ? data.length
        : (data?.total ?? data?.items?.length ?? 0),
  })
}

export default function AdminDashboard() {
  const health = useQuery({
    queryKey: ["health"],
    queryFn: () => api.get<{ status: string }>("/health"),
  })

  const entityCounts: Record<string, ReturnType<typeof useEntityCount>> = {

    "smtp_relay_gcp": useEntityCount("/api/smtp_relay_gcps"),

    "primary_data_store": useEntityCount("/api/primary_data_stores"),

    "identity_and_access_management": useEntityCount("/api/identity_and_access_managements"),

    "authentication_service": useEntityCount("/api/authentication_services"),

    "monitoring_platform": useEntityCount("/api/monitoring_platforms"),

    "analytics_engine": useEntityCount("/api/analytics_engines"),

    "reporting_service": useEntityCount("/api/reporting_services"),

    "gcp_cohesity_for_systems_backup": useEntityCount("/api/gcp_cohesity_for_systems_backups"),

    "api_gateway": useEntityCount("/api/api_gateways"),

    "message_broker": useEntityCount("/api/message_brokers"),

    "business_logic_layer": useEntityCount("/api/business_logic_layers"),

    "core_business_function": useEntityCount("/api/core_business_functions"),

    "core_business_api": useEntityCount("/api/core_business_apis"),

    "frontend_application": useEntityCount("/api/frontend_applications"),

    "active_directory_ad": useEntityCount("/api/active_directory_ads"),

    "notification_service": useEntityCount("/api/notification_services"),

    "google_gemini_models": useEntityCount("/api/google_gemini_modelss"),

    "veritas_netbackup_saa_s": useEntityCount("/api/veritas_netbackup_saa_ss"),

    "blueprint_journey_interface": useEntityCount("/api/blueprint_journey_interfaces"),

    "architecture_template_gallery": useEntityCount("/api/architecture_template_gallerys"),

    "blueprint_public_viewer": useEntityCount("/api/blueprint_public_viewers"),

    "cicd_toolchain": useEntityCount("/api/cicd_toolchains"),

    "cicd_pipeline": useEntityCount("/api/cicd_pipelines"),

    "health_monitoring": useEntityCount("/api/health_monitorings"),

    "genome_spec_generator": useEntityCount("/api/genome_spec_generators"),

    "code_generation_service": useEntityCount("/api/code_generation_services"),

    "export_service": useEntityCount("/api/export_services"),

    "journey_session_orchestrator": useEntityCount("/api/journey_session_orchestrators"),

    "stripe_webhook_handler": useEntityCount("/api/stripe_webhook_handlers"),

    "row_level_security_enforcer": useEntityCount("/api/row_level_security_enforcers"),

    "gdpr_compliance_service": useEntityCount("/api/gdpr_compliance_services"),

    "ai_architecture_engine": useEntityCount("/api/ai_architecture_engines"),

    "usage_metering_limiting": useEntityCount("/api/usage_metering_limitings"),

    "quality_scoring_engine": useEntityCount("/api/quality_scoring_engines"),

    "git_hub_integration_service": useEntityCount("/api/git_hub_integration_services"),

    "core_business": useEntityCount("/api/core_businesss"),

    "key_metrics_and_kp_is": useEntityCount("/api/key_metrics_and_kp_iss"),

    "analytics_data_store": useEntityCount("/api/analytics_data_stores"),

    "workspace": useEntityCount("/api/workspaces"),

    "journey_session_conversations": useEntityCount("/api/journey_session_conversationss"),

    "genome_spec_definitions": useEntityCount("/api/genome_spec_definitionss"),

    "generated_code_artifacts": useEntityCount("/api/generated_code_artifactss"),

  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
        <p className="text-muted-foreground">Archiet — AI-Native Architecture-to-Code SaaS Platform system overview and management</p>
      </div>

      {/* System Health */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {health.isLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : health.data?.status === "ok" ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="text-lg font-semibold text-emerald-600">Healthy</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span className="text-lg font-semibold text-amber-600">Degraded</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Authentication</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">JWT Local</div>
            <p className="text-xs text-muted-foreground">3 roles configured</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">PostgreSQL</div>
            <p className="text-xs text-muted-foreground">42 entity tables</p>
          </CardContent>
        </Card>
      </div>

      {/* Entity Overview */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Entity Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">SmtpRelayGcps</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["smtp_relay_gcp"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["smtp_relay_gcp"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/smtp_relay_gcp">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">PrimaryDataStores</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["primary_data_store"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["primary_data_store"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/primary_data_store">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">IdentityAndAccessManagements</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["identity_and_access_management"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["identity_and_access_management"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/identity_and_access_management">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">AuthenticationServices</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["authentication_service"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["authentication_service"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/authentication_service">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">MonitoringPlatforms</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["monitoring_platform"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["monitoring_platform"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/monitoring_platform">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">AnalyticsEngines</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["analytics_engine"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["analytics_engine"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/analytics_engine">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">ReportingServices</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["reporting_service"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["reporting_service"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/reporting_service">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">GcpCohesityForSystemsBackups</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["gcp_cohesity_for_systems_backup"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["gcp_cohesity_for_systems_backup"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/gcp_cohesity_for_systems_backup">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">ApiGateways</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["api_gateway"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["api_gateway"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/api_gateway">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">MessageBrokers</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["message_broker"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["message_broker"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/message_broker">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">BusinessLogicLayers</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["business_logic_layer"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["business_logic_layer"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/business_logic_layer">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CoreBusinessFunctions</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["core_business_function"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["core_business_function"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/core_business_function">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CoreBusinessApis</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["core_business_api"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["core_business_api"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/core_business_api">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">FrontendApplications</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["frontend_application"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["frontend_application"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/frontend_application">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">ActiveDirectoryAds</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["active_directory_ad"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["active_directory_ad"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/active_directory_ad">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">NotificationServices</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["notification_service"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["notification_service"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/notification_service">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">GoogleGeminiModelss</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["google_gemini_models"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["google_gemini_models"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/google_gemini_models">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">VeritasNetbackupSaaSs</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["veritas_netbackup_saa_s"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["veritas_netbackup_saa_s"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/veritas_netbackup_saa_s">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">BlueprintJourneyInterfaces</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["blueprint_journey_interface"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["blueprint_journey_interface"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/blueprint_journey_interface">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">ArchitectureTemplateGallerys</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["architecture_template_gallery"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["architecture_template_gallery"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/architecture_template_gallery">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">BlueprintPublicViewers</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["blueprint_public_viewer"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["blueprint_public_viewer"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/blueprint_public_viewer">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CicdToolchains</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["cicd_toolchain"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["cicd_toolchain"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/cicd_toolchain">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CicdPipelines</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["cicd_pipeline"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["cicd_pipeline"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/cicd_pipeline">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">HealthMonitorings</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["health_monitoring"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["health_monitoring"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/health_monitoring">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">GenomeSpecGenerators</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["genome_spec_generator"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["genome_spec_generator"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/genome_spec_generator">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CodeGenerationServices</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["code_generation_service"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["code_generation_service"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/code_generation_service">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">ExportServices</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["export_service"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["export_service"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/export_service">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">JourneySessionOrchestrators</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["journey_session_orchestrator"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["journey_session_orchestrator"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/journey_session_orchestrator">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">StripeWebhookHandlers</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["stripe_webhook_handler"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["stripe_webhook_handler"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/stripe_webhook_handler">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">RowLevelSecurityEnforcers</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["row_level_security_enforcer"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["row_level_security_enforcer"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/row_level_security_enforcer">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">GdprComplianceServices</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["gdpr_compliance_service"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["gdpr_compliance_service"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/gdpr_compliance_service">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">AiArchitectureEngines</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["ai_architecture_engine"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["ai_architecture_engine"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/ai_architecture_engine">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">UsageMeteringLimitings</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["usage_metering_limiting"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["usage_metering_limiting"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/usage_metering_limiting">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">QualityScoringEngines</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["quality_scoring_engine"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["quality_scoring_engine"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/quality_scoring_engine">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">GitHubIntegrationServices</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["git_hub_integration_service"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["git_hub_integration_service"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/git_hub_integration_service">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CoreBusinesss</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["core_business"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["core_business"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/core_business">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">KeyMetricsAndKpIss</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["key_metrics_and_kp_is"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["key_metrics_and_kp_is"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/key_metrics_and_kp_is">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">AnalyticsDataStores</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["analytics_data_store"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["analytics_data_store"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/analytics_data_store">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Workspaces</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["workspace"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["workspace"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/workspace">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">JourneySessionConversationss</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["journey_session_conversations"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["journey_session_conversations"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/journey_session_conversations">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">GenomeSpecDefinitionss</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["genome_spec_definitions"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["genome_spec_definitions"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/genome_spec_definitions">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">GeneratedCodeArtifactss</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {entityCounts["generated_code_artifacts"]?.isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <div className="text-2xl font-bold">{entityCounts["generated_code_artifacts"]?.data ?? 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">total records</p>
                </div>
                <Link href="/generated_code_artifacts">
                  <Button variant="outline" size="sm">View all</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      <Separator />

      {/* Roles */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Configured Roles</h2>
        <div className="flex flex-wrap gap-2">

          <Badge variant="secondary" className="text-sm">admin</Badge>

          <Badge variant="secondary" className="text-sm">user</Badge>

          <Badge variant="secondary" className="text-sm">viewer</Badge>

        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <Link href="/docs">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-3 p-4">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">API Documentation</p>
                  <p className="text-xs text-muted-foreground">Swagger / OpenAPI</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/smtp_relay_gcp/new">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-3 p-4">
                <Box className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">New SmtpRelayGcp</p>
                  <p className="text-xs text-muted-foreground">Create record</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/primary_data_store/new">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-3 p-4">
                <Box className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">New PrimaryDataStore</p>
                  <p className="text-xs text-muted-foreground">Create record</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/identity_and_access_management/new">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-3 p-4">
                <Box className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">New IdentityAndAccessManagement</p>
                  <p className="text-xs text-muted-foreground">Create record</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/authentication_service/new">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-3 p-4">
                <Box className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">New AuthenticationService</p>
                  <p className="text-xs text-muted-foreground">Create record</p>
                </div>
              </CardContent>
            </Card>
          </Link>

        </div>
      </div>
    </div>
  )
}
