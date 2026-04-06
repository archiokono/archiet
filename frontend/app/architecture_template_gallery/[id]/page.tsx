

"use client"

import Link from "next/link"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ArrowLeft, Pencil, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose,
} from "@/components/ui/dialog"
import { api } from "@/lib/api"
import { statusColor, statusLabel, formatDate, formatDateTime, formatCurrency } from "@/lib/utils"


type ArchitectureTemplateGallery = {
  id: string

  name: any

  description: any

  status: any


  created_at: string | null
  updated_at: string | null
}

export default function ArchitectureTemplateGalleryDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const queryClient = useQueryClient()

  const { data: item, isLoading, error } = useQuery({
    queryKey: ["architecture_template_gallery", id],
    queryFn: () => api.get<ArchitectureTemplateGallery>(`/api/architecture_template_galleries/${id}`),
  })

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/api/architecture_template_galleries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["architecture_template_gallery"] })
      toast.success("ArchitectureTemplateGallery deleted")
      window.history.back()
    },
    onError: (err: Error) => toast.error("Delete failed", { description: err.message }),
  })



  if (isLoading) {
    return (
      <div className="max-w-3xl space-y-6">
        <Skeleton className="h-8 w-64" />
        <Card>
          <CardContent className="p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 flex-1" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-destructive">ArchitectureTemplateGallery not found</p>
        <Link href="/architecture_template_gallery">
          <Button variant="outline" size="sm" className="mt-4">
            <ArrowLeft className="mr-2 h-3 w-3" />
            Back to list
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/architecture_template_gallery">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">ArchitectureTemplateGallery</h1>
            <p className="text-sm text-muted-foreground">ID: {item.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/architecture_template_gallery/${id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-3 w-3" />
              Edit
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="mr-2 h-3 w-3" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete ArchitectureTemplateGallery?</DialogTitle>
                <DialogDescription>This action cannot be undone.</DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                <Button variant="destructive" onClick={() => deleteMutation.mutate()} disabled={deleteMutation.isPending}>
                  {deleteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>




      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="divide-y">

            <div className="flex py-3">
              <dt className="w-1/3 text-sm font-medium text-muted-foreground">Name</dt>
              <dd className="flex-1 text-sm">

                {item.name ?? <span className="text-muted-foreground">—</span>}

              </dd>
            </div>

            <div className="flex py-3">
              <dt className="w-1/3 text-sm font-medium text-muted-foreground">Description</dt>
              <dd className="flex-1 text-sm">

                {item.description ?? <span className="text-muted-foreground">—</span>}

              </dd>
            </div>

            <div className="flex py-3">
              <dt className="w-1/3 text-sm font-medium text-muted-foreground">Status</dt>
              <dd className="flex-1 text-sm">

                <Badge className={statusColor(item.status)}>{statusLabel(item.status)}</Badge>

              </dd>
            </div>

            <div className="flex py-3">
              <dt className="w-1/3 text-sm font-medium text-muted-foreground">Created At</dt>
              <dd className="flex-1 text-sm">

                {formatDateTime(item.created_at)}

              </dd>
            </div>

            <div className="flex py-3">
              <dt className="w-1/3 text-sm font-medium text-muted-foreground">Updated At</dt>
              <dd className="flex-1 text-sm">

                {formatDateTime(item.updated_at)}

              </dd>
            </div>

            <div className="flex py-3">
              <dt className="w-1/3 text-sm font-medium text-muted-foreground">Created</dt>
              <dd className="flex-1 text-sm text-muted-foreground">{formatDateTime(item.created_at)}</dd>
            </div>
            <div className="flex py-3">
              <dt className="w-1/3 text-sm font-medium text-muted-foreground">Updated</dt>
              <dd className="flex-1 text-sm text-muted-foreground">{formatDateTime(item.updated_at)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

    </div>
  )
}
