"use client"

import { FC, useState } from "react"
import { LoaderIcon } from "lucide-react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const Page: FC = () => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function loginWithGoogle() {
    setIsLoading(true)
    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "Login error",
        description: "Something went wrong with your login.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-center max-w-md space-y-8">
          <div className="flex flex-col items-center gap-8">
            <svg
              width="32"
              height="34"
              viewBox="0 0 32 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="11" y="6" width="10" height="22" rx="1" fill="#222222" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.6663 27.5006C22.6072 27.6327 22.476 27.7178 22.3312 27.7178C22.1285 27.7178 21.9642 27.5534 21.9642 27.3507L21.9642 11.135C21.9642 8.36374 24.2108 6.11716 26.9821 6.11716H31.5708C31.8078 6.11716 32 6.30931 32 6.54635C32 6.60676 31.9872 6.66648 31.9626 6.72163L22.6663 27.5006Z"
                fill="#222222"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.35035 27.5112C9.40962 27.6434 9.54103 27.7285 9.68595 27.7285C9.88906 27.7285 10.0537 27.5639 10.0537 27.3608L10.0537 11.1546C10.0537 8.37838 7.80311 6.12778 5.02684 6.12778H0.429022C0.192068 6.12778 -2.09808e-05 6.31987 -2.09808e-05 6.55682C-2.09808e-05 6.6173 0.0127668 6.6771 0.0375032 6.7323L9.35035 27.5112Z"
                fill="#222222"
              />
              <path
                d="M11 4.3V1.01922C11 0.527975 11.4928 0.189533 11.9513 0.36588L20.4813 3.64666C21.2056 3.92522 21.006 5 20.23 5H11.7C11.3134 5 11 4.6866 11 4.3Z"
                fill="#222222"
                stroke="#222222"
                strokeWidth="0.01"
              />
              <path
                d="M21 29.7V32.9808C21 33.472 20.5072 33.8105 20.0487 33.6341L11.5187 30.3533C10.7944 30.0748 10.994 29 11.77 29H20.3C20.6866 29 21 29.3134 21 29.7Z"
                fill="#222222"
                stroke="#222222"
                strokeWidth="0.01"
              />
            </svg>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <Button
            type="button"
            className="gap-1"
            disabled={isLoading}
            onClick={loginWithGoogle}
          >
            {isLoading ? (
              <LoaderIcon className="animate-spin" size={16} />
            ) : (
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            )}
            Google
          </Button>
        </div>
      </div>
    </>
  )
}

export default Page
