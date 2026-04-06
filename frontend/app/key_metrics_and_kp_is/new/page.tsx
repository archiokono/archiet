
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"



import { api, ApiError } from "@/lib/api"










































const formSchema = z.object({



  name: z.string().min(1, "Name is required"),





  description: z.string().optional().default(""),





  metric_name: z.string().min(1, "Metric Name is required"),




  value: z.coerce.number(),



  target: z.coerce.number(),




  unit: z.string().min(1, "Unit is required"),




  measured_at: z.string().optional().default(""),




  status: z.enum(["active", "inactive", "archived"]).default("active"),



})

type FormValues = z.infer<typeof formSchema>

export default function KeyMetricsAndKpIsCreatePage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {


      name: "",



      description: "",



      metric_name: "",



      value: 0,



      target: 0,



      unit: "",



      measured_at: "",



      status: "active",


    },
  })

  const createMutation = useMutation({
    mutationFn: (values: FormValues) => api.post("/api/key_metrics_and_kp_es", values),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["key_metrics_and_kp_is"] })
      toast.success("KeyMetricsAndKpIs created")
      router.push(`/key_metrics_and_kp_is/${data.id}`)
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
        toast.error("Create failed", { description: apiErr?.detail || apiErr?.message })
      }
    },
  })

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/key_metrics_and_kp_is">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">
          New KeyMetricsAndKpIs
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((v) => createMutation.mutate(v))} className="space-y-4">


              <FormField
                control={form.control}
                name="name"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input {...f} placeholder="Enter name" />
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
                      <Textarea {...f} placeholder="Enter description" rows={4} />
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
                    <FormLabel>Metric Name *</FormLabel>
                    <FormControl>
                      <Input {...f} placeholder="Enter metric name" />
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
                    <FormLabel>Value *</FormLabel>
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
                    <FormLabel>Target *</FormLabel>
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
                    <FormLabel>Unit *</FormLabel>
                    <FormControl>
                      <Input {...f} placeholder="Enter unit" />
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
                    <FormLabel>Measured At *</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...f} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="status"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={f.onChange} defaultValue={f.value as string}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>

                        <SelectItem value="active">Active</SelectItem>

                        <SelectItem value="inactive">Inactive</SelectItem>

                        <SelectItem value="archived">Archived</SelectItem>

                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="flex justify-end gap-2 pt-4">
                <Link href="/key_metrics_and_kp_is">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create KeyMetricsAndKpIs
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
