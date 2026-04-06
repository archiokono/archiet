

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

          <Link href="/core_business">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Box className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Core Businesses</p>
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
                  <p className="text-sm font-medium">Key Metrics And Kp es</p>
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
                  <p className="text-sm font-medium">Analytics Data Stores</p>
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
                  <p className="text-sm font-medium">Journey Session Conversations</p>
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
                  <p className="text-sm font-medium">Genome Spec Definitions</p>
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
                  <p className="text-sm font-medium">Generated Code Artifacts</p>
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
        <CardTitle className="text-sm font-medium">Core Businesses</CardTitle>
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
        <CardTitle className="text-sm font-medium">Key Metrics And Kp es</CardTitle>
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
        <CardTitle className="text-sm font-medium">Analytics Data Stores</CardTitle>
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
        <CardTitle className="text-sm font-medium">Journey Session Conversations</CardTitle>
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
        <CardTitle className="text-sm font-medium">Genome Spec Definitions</CardTitle>
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
        <CardTitle className="text-sm font-medium">Generated Code Artifacts</CardTitle>
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


