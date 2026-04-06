
"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {


  Box,
  ArrowRight, CheckCircle2, Zap, Shield, Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"


const BASE_PATH = "/apps/5373"


type FeatureItem = { icon: LucideIcon; title: string; description: string }
type TrustItem = { icon: LucideIcon; label: string }

const FEATURES: FeatureItem[] = [

  {
    icon: Box,
    title: "Core Businesses",
    description: "Manage and track core business records with full audit trail and status workflow.",
  },

  {
    icon: Box,
    title: "Key Metrics And Kp es",
    description: "Manage and track key metrics and kp is records with full audit trail and status workflow.",
  },

  {
    icon: Box,
    title: "Analytics Data Stores",
    description: "Manage and track analytics data store records with full audit trail and status workflow.",
  },

  {
    icon: Box,
    title: "Workspaces",
    description: "Manage and track workspace records with full audit trail and status workflow.",
  },

  {
    icon: Box,
    title: "Journey Session Conversations",
    description: "Manage and track journey session conversations records with full audit trail and status workflow.",
  },

  {
    icon: Box,
    title: "Genome Spec Definitions",
    description: "Manage and track genome spec definitions records with full audit trail and status workflow.",
  },

  {
    icon: Box,
    title: "Generated Code Artifacts",
    description: "Manage and track generated code artifacts records with full audit trail and status workflow.",
  },

]

const TRUST_BADGES: TrustItem[] = [
  { icon: Shield, label: "Role-based access control" },
  { icon: Zap, label: "Real-time updates" },
  { icon: Globe, label: "Multi-device ready" },
  { icon: CheckCircle2, label: "Audit trail built-in" },
]

export default function LandingPage() {
  const router = useRouter()

  // If already authenticated, skip landing and go straight to the app
  useEffect(() => {
    const token = typeof window !== "undefined"
      ? (localStorage.getItem("token") || document.cookie.match(/(?:^|;\s*)token=([^;]+)/)?.[1])
      : null
    if (token) {
      router.replace("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <span className="text-lg font-bold tracking-tight">Archiet — AI-Native Architecture-to-Code SaaS Platform</span>
          <Link href={BASE_PATH + "/login"}>
            <Button size="sm">Sign in</Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-24 text-center">
        <Badge variant="secondary" className="mb-6 text-xs uppercase tracking-wide">
          Enterprise-grade · Built by ARCHIE
        </Badge>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Archiet — AI-Native Architecture-to-Code SaaS Platform
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
          The intelligent platform for managing smtprelaygcp, primarydatastore, identityandaccessmanagement, authenticationservice, monitoringplatform, analyticsengine, reportingservice, gcpcohesityforsystemsbackup, apigateway, messagebroker, businesslogiclayer, corebusinessfunction, corebusinessapi, frontendapplication, activedirectoryad, notificationservice, googlegeminimodels, veritasnetbackupsaas, blueprintjourneyinterface, architecturetemplategallery, blueprintpublicviewer, cicdtoolchain, cicdpipeline, healthmonitoring, genomespecgenerator, codegenerationservice, exportservice, journeysessionorchestrator, stripewebhookhandler, rowlevelsecurityenforcer, gdprcomplianceservice, aiarchitectureengine, usagemeteringlimiting, qualityscoringengine, githubintegrationservice, corebusiness, keymetricsandkpis, analyticsdatastore, workspace, journeysessionconversations, genomespecdefinitions, generatedcodeartifacts — built for the teams who move fast.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={BASE_PATH + "/login"}>
            <Button size="lg" className="gap-2 px-8">
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={BASE_PATH + "/login"}>
            <Button size="lg" variant="outline" className="px-8">
              Sign in to your account
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Trust badges ─────────────────────────────────────── */}
      <section className="border-y bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features grid ────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            42 integrated modules — all connected, all auditable.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-xl border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────── */}
      <section className="border-t bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Sign in to access your Archiet — AI-Native Architecture-to-Code SaaS Platform workspace.
          </p>
          <Link href={BASE_PATH + "/login"} className="mt-8 inline-block">
            <Button size="lg" className="gap-2 px-10">
              Sign in now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Archiet — AI-Native Architecture-to-Code SaaS Platform. Generated by ARCHIE.</span>
          <div className="flex gap-6">
            
            
            
          </div>
        </div>
      </footer>
    </div>
  )
}
