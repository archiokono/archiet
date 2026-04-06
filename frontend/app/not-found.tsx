
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, SearchX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">404</h2>
        <p className="text-xl font-medium">

          Page not found

        </p>
        <p className="text-muted-foreground max-w-sm">

          The page you{"'"}re looking for doesn{"'"}t exist or has been moved.

        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Button>
        <Button asChild>

          <Link href="/">Go home</Link>

        </Button>
      </div>
    </div>
  )
}
