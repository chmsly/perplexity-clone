"use server"

import Link from "next/link"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function MarketingLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (userId) {
    redirect("/search")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center justify-between px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-lg font-bold">Perplexity Clone</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/login"
          >
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
