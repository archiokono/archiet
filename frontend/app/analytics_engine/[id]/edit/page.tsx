
"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"



import { api, ApiError } from "@/lib/api"







































const formSchema = z.object({



  name: z.string().optional().default(""),





  description: z.string().optional().default(""),





  metric_name: z.string().optional().default(""),




  value: z.coerce.number().optional(),



  target: z.coerce.number().optional(),




  unit: z.string().optional().default(""),




  measured_at: z.string().optional().default(""),


})

type FormValues = z.infer<typeof formSchema>

export default function AnalyticsEngineEditPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: item, isLoading } = useQuery({
    queryKey: ["analytics_engine", id],
    queryFn: () => api.get<Record<string, any>>(`/api/analytics_engines/${id}`),
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: item ? {


      name: item.name ?? "",



      description: item.description ?? "",



      metric_name: item.metric_name ?? "",



      value: item.value ?? 0,



      target: item.target ?? 0,



      unit: item.unit ?? "",



      measured_at: item.measured_at ?? "",


    } : undefined,
  })

  const updateMutation = useMutation({
    mutationFn: (values: FormValues) => {
      // Only send non-empty fields — avoid overwriting with empty strings
      const payload = Object.fromEntries(
        Object.entries(values).filter(([, v]) => v !== "" && v !== null && v !== undefined)
      )
      return api.put(`/api/analytics_engines/${id}`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics_engine", id] })
      toast.success("AnalyticsEngine updated")
      router.push(`/analytics_engine/${id}`)
    },
    onError: (err: unknown) => {
      const apiErr = err as ApiError
      if (apiErr?.fieldErrors?.length) {
        apiErr.fieldErrors.forEach((fe) => {
          const field = fe.loc?.[fe.loc.length - 1] as string
          if (field) form.setError(field as any, { message: fe.msg })
        })
        toast.error("Validation failed", { description: apiErr.detail })
      } else {
        toast.error("Update failed", { description: apiErr?.detail || apiErr?.message })
      }
    },
  })

  if (isLoading) {
    return (
      <div className="max-w-2xl space-y-6">
        <Skeleton className="h-8 w-64" />
        <Card><CardContent className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
        </CardContent></Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/analytics_engine/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">
          Edit AnalyticsEngine
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((v) => updateMutation.mutate(v))} className="space-y-4">


              <FormField
                control={form.control}
                name="name"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="description"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...f} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="metric_name"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Metric Name</FormLabel>
                    <FormControl>
                      <Input {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="value"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="target"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Target</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="unit"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="measured_at"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Measured At</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="flex justify-end gap-2 pt-4">
                <Link href={`/analytics_engine/${id}`}>
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
