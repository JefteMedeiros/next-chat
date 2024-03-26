"use client"

import { useState } from "react"
import { LoaderIcon, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

export function SignOutButton() {
  const { toast } = useToast()

  const [isSigningOut, setIsSigningOut] = useState(false)

  return (
    <Button
      variant="ghost"
      className="gap-1 p-0 h-full aspect-square"
      disabled={isSigningOut}
      onClick={async () => {
        setIsSigningOut(true)

        try {
          await signOut()
        } catch (error) {
          toast({
            title: "There was a problem signing out",
          })
        } finally {
          setIsSigningOut(false)
        }
      }}
    >
      {isSigningOut && <LoaderIcon size={16} />}
      <LogOut />
    </Button>
  )
}
