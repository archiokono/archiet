

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
























































































import {
  LayoutDashboard,

  Box,

  Settings,
  Moon,
  Sun,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },

  { label: "SmtpRelayGcps", href: "/smtp_relay_gcp", icon: Box },

  { label: "PrimaryDataStores", href: "/primary_data_store", icon: Box },

  { label: "IdentityAndAccessManagements", href: "/identity_and_access_management", icon: Box },

  { label: "AuthenticationServices", href: "/authentication_service", icon: Box },

  { label: "MonitoringPlatforms", href: "/monitoring_platform", icon: Box },

  { label: "AnalyticsEngines", href: "/analytics_engine", icon: Box },

  { label: "ReportingServices", href: "/reporting_service", icon: Box },

  { label: "GcpCohesityForSystemsBackups", href: "/gcp_cohesity_for_systems_backup", icon: Box },

  { label: "ApiGateways", href: "/api_gateway", icon: Box },

  { label: "MessageBrokers", href: "/message_broker", icon: Box },

  { label: "BusinessLogicLayers", href: "/business_logic_layer", icon: Box },

  { label: "CoreBusinessFunctions", href: "/core_business_function", icon: Box },

  { label: "CoreBusinessApis", href: "/core_business_api", icon: Box },

  { label: "FrontendApplications", href: "/frontend_application", icon: Box },

  { label: "ActiveDirectoryAds", href: "/active_directory_ad", icon: Box },

  { label: "NotificationServices", href: "/notification_service", icon: Box },

  { label: "GoogleGeminiModelss", href: "/google_gemini_models", icon: Box },

  { label: "VeritasNetbackupSaaSs", href: "/veritas_netbackup_saa_s", icon: Box },

  { label: "BlueprintJourneyInterfaces", href: "/blueprint_journey_interface", icon: Box },

  { label: "ArchitectureTemplateGallerys", href: "/architecture_template_gallery", icon: Box },

  { label: "BlueprintPublicViewers", href: "/blueprint_public_viewer", icon: Box },

  { label: "CicdToolchains", href: "/cicd_toolchain", icon: Box },

  { label: "CicdPipelines", href: "/cicd_pipeline", icon: Box },

  { label: "HealthMonitorings", href: "/health_monitoring", icon: Box },

  { label: "GenomeSpecGenerators", href: "/genome_spec_generator", icon: Box },

  { label: "CodeGenerationServices", href: "/code_generation_service", icon: Box },

  { label: "ExportServices", href: "/export_service", icon: Box },

  { label: "JourneySessionOrchestrators", href: "/journey_session_orchestrator", icon: Box },

  { label: "StripeWebhookHandlers", href: "/stripe_webhook_handler", icon: Box },

  { label: "RowLevelSecurityEnforcers", href: "/row_level_security_enforcer", icon: Box },

  { label: "GdprComplianceServices", href: "/gdpr_compliance_service", icon: Box },

  { label: "AiArchitectureEngines", href: "/ai_architecture_engine", icon: Box },

  { label: "UsageMeteringLimitings", href: "/usage_metering_limiting", icon: Box },

  { label: "QualityScoringEngines", href: "/quality_scoring_engine", icon: Box },

  { label: "GitHubIntegrationServices", href: "/git_hub_integration_service", icon: Box },

  { label: "CoreBusinesss", href: "/core_business", icon: Box },

  { label: "KeyMetricsAndKpIss", href: "/key_metrics_and_kp_is", icon: Box },

  { label: "AnalyticsDataStores", href: "/analytics_data_store", icon: Box },

  { label: "Workspaces", href: "/workspace", icon: Box },

  { label: "JourneySessionConversationss", href: "/journey_session_conversations", icon: Box },

  { label: "GenomeSpecDefinitionss", href: "/genome_spec_definitions", icon: Box },

  { label: "GeneratedCodeArtifactss", href: "/generated_code_artifacts", icon: Box },

  { label: "Admin", href: "/admin", icon: Settings },
]

function SidebarNav({ collapsed, onClose }: { collapsed?: boolean; onClose?: () => void }) {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(collapsed ?? false)

  function toggleTheme() {
    setDark(!dark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-200",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo / App Name */}
      <div className={cn("flex h-14 items-center border-b px-4", isCollapsed && "justify-center px-2")}>
        {onClose && (
          <button onClick={onClose} className="mr-2 rounded p-1 hover:bg-sidebar-accent">
            <X className="h-4 w-4" />
          </button>
        )}
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2 flex-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <span className="font-semibold text-sm">Archiet — AI-Native Architecture-to-Code SaaS Platform</span>
          </Link>
        )}
        {isCollapsed && !onClose && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        <TooltipProvider delayDuration={0}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            const link = (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )

            if (isCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            }
            return link
          })}
        </TooltipProvider>
      </nav>

      <Separator />

      {/* Footer actions */}
      <div className="p-2 space-y-1">
        <button
          onClick={toggleTheme}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
            isCollapsed && "justify-center px-2"
          )}
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {!isCollapsed && <span>{dark ? "Light mode" : "Dark mode"}</span>}
        </button>
        {!onClose && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
              isCollapsed && "justify-center px-2"
            )}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
            {!isCollapsed && <span>Collapse</span>}
          </button>
        )}
      </div>
    </aside>
  )
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <SidebarNav />
      </div>

      {/* Mobile hamburger button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile overlay + drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 md:hidden">
            <SidebarNav onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}
    </>
  )
}
