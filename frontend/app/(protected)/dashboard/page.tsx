

"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
























































































import {

  Box,

  ArrowRight,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/api"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Archiet — AI-Native Architecture-to-Code SaaS Platform</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <SmtpRelayGcpCard />

        <PrimaryDataStoreCard />

        <IdentityAndAccessManagementCard />

        <AuthenticationServiceCard />

        <MonitoringPlatformCard />

        <AnalyticsEngineCard />

        <ReportingServiceCard />

        <GcpCohesityForSystemsBackupCard />

        <ApiGatewayCard />

        <MessageBrokerCard />

        <BusinessLogicLayerCard />

        <CoreBusinessFunctionCard />

        <CoreBusinessApiCard />

        <FrontendApplicationCard />

        <ActiveDirectoryAdCard />

        <NotificationServiceCard />

        <GoogleGeminiModelsCard />

        <VeritasNetbackupSaaSCard />

        <BlueprintJourneyInterfaceCard />

        <ArchitectureTemplateGalleryCard />

        <BlueprintPublicViewerCard />

        <CicdToolchainCard />

        <CicdPipelineCard />

        <HealthMonitoringCard />

        <GenomeSpecGeneratorCard />

        <CodeGenerationServiceCard />

        <ExportServiceCard />

        <JourneySessionOrchestratorCard />

        <StripeWebhookHandlerCard />

        <RowLevelSecurityEnforcerCard />

        <GdprComplianceServiceCard />

        <AiArchitectureEngineCard />

        <UsageMeteringLimitingCard />

        <QualityScoringEngineCard />

        <GitHubIntegrationServiceCard />

        <CoreBusinessCard />

        <KeyMetricsAndKpIsCard />

        <AnalyticsDataStoreCard />

        <WorkspaceCard />

        <JourneySessionConversationsCard />

        <GenomeSpecDefinitionsCard />

        <GeneratedCodeArtifactsCard />

      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">

          <Link href="/smtp_relay_gcp">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">SmtpRelayGcps</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/primary_data_store">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">PrimaryDataStores</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/identity_and_access_management">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">IdentityAndAccessManagements</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/authentication_service">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AuthenticationServices</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/monitoring_platform">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">MonitoringPlatforms</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/analytics_engine">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AnalyticsEngines</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/reporting_service">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">ReportingServices</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/gcp_cohesity_for_systems_backup">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">GcpCohesityForSystemsBackups</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/api_gateway">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">ApiGateways</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/message_broker">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">MessageBrokers</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/business_logic_layer">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">BusinessLogicLayers</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/core_business_function">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">CoreBusinessFunctions</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/core_business_api">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">CoreBusinessApis</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/frontend_application">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">FrontendApplications</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/active_directory_ad">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">ActiveDirectoryAds</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/notification_service">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">NotificationServices</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/google_gemini_models">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">GoogleGeminiModelss</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/veritas_netbackup_saa_s">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">VeritasNetbackupSaaSs</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/blueprint_journey_interface">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">BlueprintJourneyInterfaces</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/architecture_template_gallery">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">ArchitectureTemplateGallerys</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/blueprint_public_viewer">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">BlueprintPublicViewers</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/cicd_toolchain">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">CicdToolchains</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/cicd_pipeline">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">CicdPipelines</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/health_monitoring">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">HealthMonitorings</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/genome_spec_generator">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">GenomeSpecGenerators</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/code_generation_service">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">CodeGenerationServices</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/export_service">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">ExportServices</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/journey_session_orchestrator">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">JourneySessionOrchestrators</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/stripe_webhook_handler">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">StripeWebhookHandlers</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/row_level_security_enforcer">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">RowLevelSecurityEnforcers</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/gdpr_compliance_service">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">GdprComplianceServices</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/ai_architecture_engine">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AiArchitectureEngines</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/usage_metering_limiting">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">UsageMeteringLimitings</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/quality_scoring_engine">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">QualityScoringEngines</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/git_hub_integration_service">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">GitHubIntegrationServices</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/core_business">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">CoreBusinesss</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/key_metrics_and_kp_is">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">KeyMetricsAndKpIss</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/analytics_data_store">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AnalyticsDataStores</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/workspace">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Workspaces</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/journey_session_conversations">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">JourneySessionConversationss</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/genome_spec_definitions">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">GenomeSpecDefinitionss</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/generated_code_artifacts">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">GeneratedCodeArtifactss</p>
                  <p className="text-xs text-muted-foreground">View and manage</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

        </div>
      </div>
    </div>
  )
}



function SmtpRelayGcpCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["smtp_relay_gcp", "count"],
    queryFn: () => api.get<any>("/api/smtp_relay_gcps", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">SmtpRelayGcps</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function PrimaryDataStoreCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["primary_data_store", "count"],
    queryFn: () => api.get<any>("/api/primary_data_stores", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">PrimaryDataStores</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function IdentityAndAccessManagementCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["identity_and_access_management", "count"],
    queryFn: () => api.get<any>("/api/identity_and_access_managements", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">IdentityAndAccessManagements</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function AuthenticationServiceCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["authentication_service", "count"],
    queryFn: () => api.get<any>("/api/authentication_services", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AuthenticationServices</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function MonitoringPlatformCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["monitoring_platform", "count"],
    queryFn: () => api.get<any>("/api/monitoring_platforms", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">MonitoringPlatforms</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function AnalyticsEngineCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics_engine", "count"],
    queryFn: () => api.get<any>("/api/analytics_engines", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AnalyticsEngines</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function ReportingServiceCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["reporting_service", "count"],
    queryFn: () => api.get<any>("/api/reporting_services", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ReportingServices</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function GcpCohesityForSystemsBackupCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["gcp_cohesity_for_systems_backup", "count"],
    queryFn: () => api.get<any>("/api/gcp_cohesity_for_systems_backups", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">GcpCohesityForSystemsBackups</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function ApiGatewayCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["api_gateway", "count"],
    queryFn: () => api.get<any>("/api/api_gateways", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ApiGateways</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function MessageBrokerCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["message_broker", "count"],
    queryFn: () => api.get<any>("/api/message_brokers", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">MessageBrokers</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function BusinessLogicLayerCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["business_logic_layer", "count"],
    queryFn: () => api.get<any>("/api/business_logic_layers", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">BusinessLogicLayers</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function CoreBusinessFunctionCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["core_business_function", "count"],
    queryFn: () => api.get<any>("/api/core_business_functions", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">CoreBusinessFunctions</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function CoreBusinessApiCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["core_business_api", "count"],
    queryFn: () => api.get<any>("/api/core_business_apis", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">CoreBusinessApis</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function FrontendApplicationCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["frontend_application", "count"],
    queryFn: () => api.get<any>("/api/frontend_applications", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">FrontendApplications</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function ActiveDirectoryAdCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["active_directory_ad", "count"],
    queryFn: () => api.get<any>("/api/active_directory_ads", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ActiveDirectoryAds</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function NotificationServiceCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["notification_service", "count"],
    queryFn: () => api.get<any>("/api/notification_services", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">NotificationServices</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function GoogleGeminiModelsCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["google_gemini_models", "count"],
    queryFn: () => api.get<any>("/api/google_gemini_models", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">GoogleGeminiModelss</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function VeritasNetbackupSaaSCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["veritas_netbackup_saa_s", "count"],
    queryFn: () => api.get<any>("/api/veritas_netbackup_saa_s", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">VeritasNetbackupSaaSs</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function BlueprintJourneyInterfaceCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["blueprint_journey_interface", "count"],
    queryFn: () => api.get<any>("/api/blueprint_journey_interfaces", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">BlueprintJourneyInterfaces</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function ArchitectureTemplateGalleryCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["architecture_template_gallery", "count"],
    queryFn: () => api.get<any>("/api/architecture_template_galleries", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ArchitectureTemplateGallerys</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function BlueprintPublicViewerCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["blueprint_public_viewer", "count"],
    queryFn: () => api.get<any>("/api/blueprint_public_viewers", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">BlueprintPublicViewers</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function CicdToolchainCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["cicd_toolchain", "count"],
    queryFn: () => api.get<any>("/api/cicd_toolchains", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">CicdToolchains</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function CicdPipelineCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["cicd_pipeline", "count"],
    queryFn: () => api.get<any>("/api/cicd_pipelines", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">CicdPipelines</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function HealthMonitoringCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["health_monitoring", "count"],
    queryFn: () => api.get<any>("/api/health_monitorings", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">HealthMonitorings</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function GenomeSpecGeneratorCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["genome_spec_generator", "count"],
    queryFn: () => api.get<any>("/api/genome_spec_generators", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">GenomeSpecGenerators</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function CodeGenerationServiceCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["code_generation_service", "count"],
    queryFn: () => api.get<any>("/api/code_generation_services", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">CodeGenerationServices</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function ExportServiceCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["export_service", "count"],
    queryFn: () => api.get<any>("/api/export_services", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ExportServices</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function JourneySessionOrchestratorCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["journey_session_orchestrator", "count"],
    queryFn: () => api.get<any>("/api/journey_session_orchestrators", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">JourneySessionOrchestrators</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function StripeWebhookHandlerCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["stripe_webhook_handler", "count"],
    queryFn: () => api.get<any>("/api/stripe_webhook_handlers", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">StripeWebhookHandlers</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function RowLevelSecurityEnforcerCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["row_level_security_enforcer", "count"],
    queryFn: () => api.get<any>("/api/row_level_security_enforcers", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">RowLevelSecurityEnforcers</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function GdprComplianceServiceCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["gdpr_compliance_service", "count"],
    queryFn: () => api.get<any>("/api/gdpr_compliance_services", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">GdprComplianceServices</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function AiArchitectureEngineCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["ai_architecture_engine", "count"],
    queryFn: () => api.get<any>("/api/ai_architecture_engines", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AiArchitectureEngines</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function UsageMeteringLimitingCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["usage_metering_limiting", "count"],
    queryFn: () => api.get<any>("/api/usage_metering_limitings", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">UsageMeteringLimitings</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function QualityScoringEngineCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["quality_scoring_engine", "count"],
    queryFn: () => api.get<any>("/api/quality_scoring_engines", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">QualityScoringEngines</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function GitHubIntegrationServiceCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["git_hub_integration_service", "count"],
    queryFn: () => api.get<any>("/api/git_hub_integration_services", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">GitHubIntegrationServices</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function CoreBusinessCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["core_business", "count"],
    queryFn: () => api.get<any>("/api/core_businesses", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">CoreBusinesss</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function KeyMetricsAndKpIsCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["key_metrics_and_kp_is", "count"],
    queryFn: () => api.get<any>("/api/key_metrics_and_kp_es", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">KeyMetricsAndKpIss</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function AnalyticsDataStoreCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics_data_store", "count"],
    queryFn: () => api.get<any>("/api/analytics_data_stores", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AnalyticsDataStores</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function WorkspaceCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["workspace", "count"],
    queryFn: () => api.get<any>("/api/workspaces", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Workspaces</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function JourneySessionConversationsCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["journey_session_conversations", "count"],
    queryFn: () => api.get<any>("/api/journey_session_conversations", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">JourneySessionConversationss</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function GenomeSpecDefinitionsCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["genome_spec_definitions", "count"],
    queryFn: () => api.get<any>("/api/genome_spec_definitions", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">GenomeSpecDefinitionss</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


function GeneratedCodeArtifactsCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["generated_code_artifacts", "count"],
    queryFn: () => api.get<any>("/api/generated_code_artifacts", { per_page: "1" }),
  })
  // Support both paginated { items, total } and plain array responses
  const count: number = Array.isArray(data)
    ? data.length
    : (data as any)?.total ?? (data as any)?.items?.length ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">GeneratedCodeArtifactss</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
        <p className="text-xs text-muted-foreground">Total records</p>
      </CardContent>
    </Card>
  )
}


