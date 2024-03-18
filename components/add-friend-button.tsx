"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email(),
})

export function AddFriendButton() {
  const [showSuccessState, setShowSuccessState] = useState(false)

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const addFriend = async (email: string) => {
    try {
      const validEmail = formSchema.parse({ email })

      await axios.post("/api/friends/add", {
        email: validEmail,
      })

      setShowSuccessState(true)
    } catch (error) {
      if (error instanceof z.ZodError) {
        methods.setError("email", { message: error.message })
        return
      }

      if (error instanceof AxiosError) {
        methods.setError("email", { message: error.response?.data })
        return
      }

      methods.setError("email", { message: "Something went wrong" })
    }
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    addFriend(data.email)
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We will send an invitation to this e-mail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
