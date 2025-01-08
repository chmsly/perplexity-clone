"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getProfileByUserId } from "@/db/queries/profiles-queries"
import Sidebar from "./_components/sidebar"
import SidebarSkeleton from "./_components/sidebar-skeleton"

export default async function SearchLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  if (!userId) return redirect("/login")

  const profile = await getProfileByUserId(userId)
  if (!profile) return redirect("/signup")
  if (profile.membership === "free") return redirect("/pricing")

  return (
    <div className="flex h-screen">
      <Suspense fallback={<SidebarSkeleton className="w-64 border-r" />}>
        <Sidebar userId={userId} />
      </Suspense>
      <main className="flex-1">{children}</main>
    </div>
  )
}
