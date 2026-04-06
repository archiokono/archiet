
"use client"

// Prevent Next.js from statically pre-rendering auth-gated routes
export const dynamic = "force-dynamic"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { RequireAuth } from "@/components/require-auth"
import { useAuth } from "@/lib/auth-context"
import {
  LayoutDashboard, LogOut, Settings, ChevronDown, Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },

  { label: "Smtp Relay Gcps", href: "/smtp_relay_gcp" },

  { label: "Primary Data Stores", href: "/primary_data_store" },

  { label: "Identity And Access Managements", href: "/identity_and_access_management" },

  { label: "Authentication Services", href: "/authentication_service" },

  { label: "Monitoring Platforms", href: "/monitoring_platform" },

  { label: "Analytics Engines", href: "/analytics_engine" },

  { label: "Reporting Services", href: "/reporting_service" },

  { label: "Gcp Cohesity For Systems Backups", href: "/gcp_cohesity_for_systems_backup" },

  { label: "Api Gateways", href: "/api_gateway" },

  { label: "Message Brokers", href: "/message_broker" },

  { label: "Business Logic Layers", href: "/business_logic_layer" },

  { label: "Core Business Functions", href: "/core_business_function" },

  { label: "Core Business Apis", href: "/core_business_api" },

  { label: "Frontend Applications", href: "/frontend_application" },

  { label: "Active Directory Ads", href: "/active_directory_ad" },

  { label: "Notification Services", href: "/notification_service" },

  { label: "Google Gemini Modelss", href: "/google_gemini_models" },

  { label: "Veritas Netbackup Saa Ss", href: "/veritas_netbackup_saa_s" },

  { label: "Blueprint Journey Interfaces", href: "/blueprint_journey_interface" },

  { label: "Architecture Template Gallerys", href: "/architecture_template_gallery" },

  { label: "Blueprint Public Viewers", href: "/blueprint_public_viewer" },

  { label: "Cicd Toolchains", href: "/cicd_toolchain" },

  { label: "Cicd Pipelines", href: "/cicd_pipeline" },

  { label: "Health Monitorings", href: "/health_monitoring" },

  { label: "Genome Spec Generators", href: "/genome_spec_generator" },

  { label: "Code Generation Services", href: "/code_generation_service" },

  { label: "Export Services", href: "/export_service" },

  { label: "Journey Session Orchestrators", href: "/journey_session_orchestrator" },

  { label: "Stripe Webhook Handlers", href: "/stripe_webhook_handler" },

  { label: "Row Level Security Enforcers", href: "/row_level_security_enforcer" },

  { label: "Gdpr Compliance Services", href: "/gdpr_compliance_service" },

  { label: "Ai Architecture Engines", href: "/ai_architecture_engine" },

  { label: "Usage Metering Limitings", href: "/usage_metering_limiting" },

  { label: "Quality Scoring Engines", href: "/quality_scoring_engine" },

  { label: "Git Hub Integration Services", href: "/git_hub_integration_service" },

  { label: "Core Businesss", href: "/core_business" },

  { label: "Key Metrics And Kp Iss", href: "/key_metrics_and_kp_is" },

  { label: "Analytics Data Stores", href: "/analytics_data_store" },

  { label: "Workspaces", href: "/workspace" },

  { label: "Journey Session Conversationss", href: "/journey_session_conversations" },

  { label: "Genome Spec Definitionss", href: "/genome_spec_definitions" },

  { label: "Generated Code Artifactss", href: "/generated_code_artifacts" },

]

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <RequireAuth>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-64" : "w-0 -ml-64"} flex flex-col border-r bg-card transition-all duration-200`}>
          <div className="flex h-14 items-center border-b px-4">
            <span className="text-lg font-semibold">Archiet — AI-Native Architecture-to-Code SaaS Platform</span>
          </div>
          <nav className="flex-1 space-y-1 p-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <header className="flex h-14 items-center justify-between border-b px-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  {user?.email ?? "User"}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  )
}
