"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Zap, GitBranch, Package, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") ||
          document.cookie.match(/(?:^|;\s*)token=([^;]+)/)?.[1]
        : null
    if (token) router.replace("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <span className="text-lg font-bold tracking-tight">Archiet</span>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Start for free</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-28 text-center">
        <Badge variant="secondary" className="mb-6 text-xs uppercase tracking-wide">
          AI-Native · Architecture to Code
        </Badge>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Describe your system.
          <br />
          <span className="text-primary">Get production code.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
          Walk a guided architecture journey, make decisions with AI, and download
          a production-ready codebase — Flask, Next.js, or FastAPI — in minutes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="gap-2 px-8">
              Start for free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="px-8">Sign in</Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Brain, title: "Journey Wizard", desc: "Guided 7-step architecture session. AI asks the right questions." },
            { icon: GitBranch, title: "Decisions + Rationale", desc: "Every architectural decision is recorded with trade-offs." },
            { icon: Package, title: "Code Generation", desc: "Download a full codebase ZIP — backend, frontend, infra." },
            { icon: Zap, title: "BYOK", desc: "Bring your own Anthropic, OpenAI, or Google key. No markup." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to build?</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Free tier includes 3 code generations per month.
          </p>
          <Link href="/register" className="mt-8 inline-block">
            <Button size="lg" className="gap-2 px-10">
              Create your account <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Archiet</span>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-foreground transition-colors">Sign in</Link>
            <Link href="/register" className="hover:text-foreground transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
