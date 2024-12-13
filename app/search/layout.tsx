"use server"

import { getChatsByUserIdAction } from "@/actions/db/chats-actions"
import { getProfileByUserId } from "@/db/queries/profiles-queries"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import Sidebar from "./_components/sidebar"
import SidebarSkeleton from "./_components/sidebar-skeleton"
import { createChatAction } from "@/actions/db/chats-actions"
import { createProfileAction } from "@/actions/db/profiles-actions"

export default async function SearchLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect("/login")
  }

  const profile = await getProfileByUserId(userId)

  if (!profile) {
    await createProfileAction(userId)
    return redirect("/search")
  }

  if (profile.membership === "free") {
    return redirect("/pricing")
  }

  return (
    <div className="flex h-screen">
      <Suspense fallback={<SidebarSkeleton className="w-64 border-r" />}>
        <SidebarFetcher userId={userId} />
      </Suspense>

      <div className="flex-1">{children}</div>
    </div>
  )
}

async function SidebarFetcher({ userId }: { userId: string }) {
  const { data: chats } = await getChatsByUserIdAction(userId)

  async function handleCreateChat() {
    "use server"
    await createChatAction(userId, "New Chat")
  }

  return (
    <Sidebar
      className="w-72 border-r"
      userId={userId}
      initialChats={chats || []}
      onCreateChat={handleCreateChat}
    />
  )
}
