

"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"


const BASE_PATH = "/apps/5373"


export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(BASE_PATH + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        toast.error("Login failed", { description: body.detail || `HTTP ${res.status}` })
        return
      }
      const { access_token } = await res.json()
      localStorage.setItem("token", access_token)
      document.cookie = `token=${access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      toast.success("Welcome back!")
      // Redirect to ?from= param if present, else to app root (respects basePath)
      const params = new URLSearchParams(window.location.search)
      const dest = params.get("from") || BASE_PATH + "/"
      window.location.href = dest
    } catch {
      toast.error("Connection error", { description: "Could not reach the server" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Archiet — AI-Native Architecture-to-Code SaaS Platform</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            {process.env.NODE_ENV === "development" && (
              <p className="text-center text-xs text-muted-foreground">
                Dev: admin@example.com / admin123
              </p>
            )}

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
