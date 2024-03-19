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
import { addFriendSchema } from "@/lib/validations/add-friend"

export function AddFriendButton() {
  const [showSuccessState, setShowSuccessState] = useState(false)

  const methods = useForm<z.infer<typeof addFriendSchema>>({
    resolver: zodResolver(addFriendSchema),
    mode: "onSubmit",
  })

  const addFriend = async (email: string) => {
    try {
      const validEmail = addFriendSchema.parse({ email })

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

  const onSubmit = (data: z.infer<typeof addFriendSchema>) => {
    addFriend(data.email)
  }

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-3 max-w-[400px] ml-4"
      >
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
              {!methods.formState.errors && showSuccessState && (
                <span className="text-green-500 pt-1 block">
                  Friend request sent!
                </span>
              )}
            </FormItem>
          )}
        />
        <pre>{JSON.stringify(showSuccessState, null, 2)}</pre>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
