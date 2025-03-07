"use client"

import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export default function SignUpPage() {
  const { theme } = useTheme()

  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/login"
        redirectUrl="/search"
        afterSignUpUrl="/search"
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          elements: {
            rootBox: "mx-auto",
            card: "shadow-none sm:shadow-lg"
          }
        }}
      />
    </div>
  )
}
