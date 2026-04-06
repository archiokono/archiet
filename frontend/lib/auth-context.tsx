
"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Prefix all fetch calls with basePath so they hit the Next.js rewrite proxy
const _BASE_PATH = ""

type User = {
  id: string
  email: string
  name: string | null
  organization_id: string | null
  organization_name: string | null
  roles: string[]
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

function setToken(token: string | null) {
  if (typeof window === "undefined") return
  if (token) {
    localStorage.setItem("token", token)
  } else {
    localStorage.removeItem("token")
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchMe = useCallback(async () => {
    const token = getToken()
    if (!token) {
      setUser(null)
      setIsLoading(false)
      return
    }
    try {
      const res = await fetch(_BASE_PATH + "/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        setToken(null)
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(_BASE_PATH + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Login failed" }))
      throw new Error(err.detail || "Login failed")
    }
    const data = await res.json()
    setToken(data.access_token)
    await fetchMe()
    router.push("/dashboard")
  }, [fetchMe, router])

  const logout = useCallback(async () => {
    setToken(null)
    setUser(null)
    router.push("/login")
  }, [router])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}
