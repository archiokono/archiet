
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



})

type FormValues = z.infer<typeof formSchema>

export default function BlueprintJourneyInterfaceEditPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: item, isLoading } = useQuery({
    queryKey: ["blueprint_journey_interface", id],
    queryFn: () => api.get<Record<string, any>>(`/api/blueprint_journey_interfaces/${id}`),
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: item ? {


      name: item.name ?? "",



      description: item.description ?? "",


    } : undefined,
  })

  const updateMutation = useMutation({
    mutationFn: (values: FormValues) => {
      // Only send non-empty fields — avoid overwriting with empty strings
      const payload = Object.fromEntries(
        Object.entries(values).filter(([, v]) => v !== "" && v !== null && v !== undefined)
      )
      return api.put(`/api/blueprint_journey_interfaces/${id}`, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blueprint_journey_interface", id] })
      toast.success("BlueprintJourneyInterface updated")
      router.push(`/blueprint_journey_interface/${id}`)
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
        <Link href={`/blueprint_journey_interface/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">
          Edit BlueprintJourneyInterface
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


              <div className="flex justify-end gap-2 pt-4">
                <Link href={`/blueprint_journey_interface/${id}`}>
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
