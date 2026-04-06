
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





  endpoint_url: z.string().min(1, "Endpoint Url is required"),





  service_type: z.string().min(1, "Service Type is required"),





  version: z.string().min(1, "Version is required"),





  status: z.enum(["active", "inactive", "archived"]).default("active"),



})

type FormValues = z.infer<typeof formSchema>

export default function AuthenticationServiceCreatePage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {


      name: "",



      description: "",



      endpoint_url: "",



      service_type: "",



      version: "",



      status: "active",


    },
  })

  const createMutation = useMutation({
    mutationFn: (values: FormValues) => api.post("/api/authentication_services", values),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["authentication_service"] })
      toast.success("AuthenticationService created")
      router.push(`/authentication_service/${data.id}`)
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
        <Link href="/authentication_service">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">
          New AuthenticationService
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
                name="endpoint_url"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Endpoint Url *</FormLabel>
                    <FormControl>
                      <Input {...f} placeholder="Enter endpoint url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="service_type"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Service Type *</FormLabel>
                    <FormControl>
                      <Input {...f} placeholder="Enter service type" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="version"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>Version *</FormLabel>
                    <FormControl>
                      <Input {...f} placeholder="Enter version" />
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
                <Link href="/authentication_service">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create AuthenticationService
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
