"use server"

import { Suspense } from "react"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { getProfileByUserId } from "@/db/queries/profiles-queries"
import SidebarContainer from "./_components/sidebar-container"
import SidebarSkeleton from "./_components/sidebar-skeleton"

interface SearchLayoutProps {
  children: React.ReactNode
}

export default async function SearchLayout({ children }: SearchLayoutProps) {
  const user = await currentUser()
  if (!user) {
    redirect("/login")
  }

  const profile = await getProfileByUserId(user.id)
  if (!profile) {
    redirect("/signup")
  }
  if (profile.membership === "free") {
    redirect("/pricing")
  }

  return (
    <div className="flex h-screen">
      <Suspense fallback={<SidebarSkeleton className="w-64 border-r" />}>
        <SidebarContainer />
      </Suspense>
      <main className="flex-1">{children}</main>
    </div>
  )
}
