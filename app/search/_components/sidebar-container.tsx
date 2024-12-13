"use server"

import { auth } from "@clerk/nextjs/server"
import { getChatsAction } from "@/actions/db/chats-actions"
import Sidebar from "./sidebar"

export async function SidebarContainer() {
  const { userId } = auth()
  if (!userId) return null

  const { data: chats } = await getChatsAction(userId)

  return <Sidebar className="w-64 border-r" chats={chats || []} />
}
