

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Plus, Search, ArrowUpDown, MoreHorizontal, Loader2, Download, Trash2, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/api"
import { statusColor, statusLabel, formatDate, formatCurrency, truncate } from "@/lib/utils"

type StripeWebhookHandler = {
  id: string

  name: string | null

  description: string | null

  status: string | null


  created_at: string | null
  updated_at: string | null
}

export default function StripeWebhookHandlerListPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [sortField, setSortField] = useState<string>("created_at")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [page, setPage] = useState(0)


  // Debounce search to avoid hammering the API on every keypress
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(0) }, 300)
    return () => clearTimeout(t)
  }, [search])


  const PAGE_SIZE = 25


  const { data, isLoading, error } = useQuery({
    queryKey: ["stripe_webhook_handler", debouncedSearch, sortField, sortDir, page],
    queryFn: () => api.get<{ items: StripeWebhookHandler[]; total: number } | StripeWebhookHandler[]>("/api/stripe_webhook_handlers", {
      search: debouncedSearch || undefined,
      sort: sortField,
      dir: sortDir,
      page: String(page + 1),
      per_page: String(PAGE_SIZE),
    }),
  })

  // Support both paginated `{ items, total }` and plain array responses
  const items: StripeWebhookHandler[] = Array.isArray(data) ? data : ((data as { items: StripeWebhookHandler[] } | undefined)?.items ?? [])
  const total: number = Array.isArray(data) ? data.length : ((data as { total: number } | undefined)?.total ?? items.length)
  const hasNextPage = (page + 1) * PAGE_SIZE < total || items.length === PAGE_SIZE

  function toggleSort(field: string) {
    setPage(0)
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">StripeWebhookHandlers</h1>
          <p className="text-sm text-muted-foreground">
            Manage stripewebhookhandler records
          </p>
        </div>
        <Link href="/stripe_webhook_handler/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New StripeWebhookHandler
          </Button>
        </Link>
      </div>

      {/* Toolbar: search + export + bulk actions */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search stripewebhookhandlers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>


      </div>

      {/* Data table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">

                  <Skeleton className="h-5 flex-1" />

                  <Skeleton className="h-5 flex-1" />

                  <Skeleton className="h-5 flex-1" />

                  <Skeleton className="h-5 flex-1" />

                  <Skeleton className="h-5 flex-1" />

                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-sm text-destructive">Failed to load data</p>
              <p className="mt-1 text-xs text-muted-foreground">{String(error)}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium">No stripewebhookhandlers yet</h3>
              <p className="mt-1 text-xs text-muted-foreground">Create your first stripewebhookhandler to get started.</p>
              <Link href="/stripe_webhook_handler/new">
                <Button variant="outline" size="sm" className="mt-4">
                  <Plus className="mr-2 h-3 w-3" />
                  Create StripeWebhookHandler
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>


                  <TableHead>
                    <button
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => toggleSort("name")}
                    >
                      Name
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>

                  <TableHead>
                    <button
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => toggleSort("description")}
                    >
                      Description
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>

                  <TableHead>
                    <button
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => toggleSort("status")}
                    >
                      Status
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>

                  <TableHead>
                    <button
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => toggleSort("created_at")}
                    >
                      Created At
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>

                  <TableHead>
                    <button
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => toggleSort("updated_at")}
                    >
                      Updated At
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>

                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/stripe_webhook_handler/${item.id}`)}
                  >



                    <TableCell>{item.name ?? "—"}</TableCell>



                    <TableCell className="max-w-[200px]">{truncate(item.description ?? "", 40)}</TableCell>



                    <TableCell>
                      <Badge className={statusColor(item.status)}>
                        {statusLabel(item.status)}
                      </Badge>
                    </TableCell>



                    <TableCell className="text-muted-foreground">{formatDate(item.created_at)}</TableCell>



                    <TableCell className="text-muted-foreground">{formatDate(item.updated_at)}</TableCell>


                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/stripe_webhook_handler/${item.id}`}>View details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/stripe_webhook_handler/${item.id}/edit`}>Edit</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {(page > 0 || hasNextPage) && (
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-muted-foreground">
            {total > 0
              ? `Showing ${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, total)} of ${total}`
              : `Showing ${items.length} results`
            }
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline" size="sm"
              disabled={page === 0 || isLoading}
              onClick={() => setPage(p => Math.max(0, p - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground px-1">Page {page + 1}</span>
            <Button
              variant="outline" size="sm"
              disabled={!hasNextPage || isLoading}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
