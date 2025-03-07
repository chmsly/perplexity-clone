import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/utilities/providers"
import { getProfileByUserId } from "@/db/queries/profiles-queries"
import { createProfileAction } from "@/actions/db/profiles-actions"
import { ClerkProvider } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Perplexity Clone",
  description: "A full-stack template for a Perplexity clone."
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  console.log("Current userId:", userId)

  if (userId) {
    try {
      const profile = await getProfileByUserId(userId)
      console.log("Existing profile:", profile)

      if (!profile) {
        console.log("Creating new profile for userId:", userId)
        try {
          const result = await createProfileAction(userId)
          console.log("Profile creation result:", result)
        } catch (profileError) {
          console.error("Failed to create profile:", profileError)
          // Continue rendering the app even if profile creation fails
        }
      }
    } catch (error) {
      console.error("Error in profile lookup:", error)
      // Continue rendering the app even if there's an error
    }
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}

            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
