"use client"

import { useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"

import { Button } from "./ui/button"

interface Props {
  chatPartner: User
}

export function ChatInput({ chatPartner }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function sendMessage() {
    setIsLoading(true)
  }

  return (
    <div className="flex flex-row items-end max-h-64 gap-2 border-t border-gray-200 p-4 sm:mb-0">
      <div className="relative flex-1 overflow-auto rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus:within:ring-2 focus-within:ring-indigo-600">
        <TextareaAutosize
          className="flex min-h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()

              sendMessage()
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${chatPartner.name}`}
        />
      </div>

      <Button onClick={sendMessage} type="submit">
        Post
      </Button>
    </div>
  )
}
