"use server"

import { auth } from "@clerk/nextjs/server"
import { getChatsByUserId } from "@/db/queries/chats-queries"
import Sidebar from "./sidebar"

export default async function SidebarContainer() {
  const { userId } = auth()
  if (!userId) return null

  const chats = await getChatsByUserId(userId)

  return <Sidebar className="w-64 border-r" initialChats={chats} />
}
