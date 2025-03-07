"use client"

import { SignIn } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const { theme } = useTheme()

  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup"
        redirectUrl="/search"
        afterSignInUrl="/search"
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
