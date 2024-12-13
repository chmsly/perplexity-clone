"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { getChatsAction, createChatAction } from "@/actions/db/chats-actions"
import SidebarClient from "./sidebar-client"
import SidebarSkeleton from "./sidebar-skeleton"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Sidebar({ className = "" }: { className?: string }) {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarFetcher className={className} />
    </Suspense>
  )
}

async function SidebarFetcher({ className }: { className?: string }) {
  const { userId } = auth()
  if (!userId) return null

  const { data: chats } = await getChatsAction(userId)

  async function handleCreateChat() {
    "use server"
    await createChatAction(userId, "New Chat")
  }

  return (
    <div className="flex h-full flex-col">
      <form action={handleCreateChat} className="p-4">
        <Button
          className="w-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
          variant="ghost"
          type="submit"
        >
          <Plus className="mr-2 size-4 text-neutral-600" />
          New Chat
        </Button>
      </form>

      <SidebarClient className={className} chats={chats || []} />
    </div>
  )
}
