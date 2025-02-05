"use server"

import { auth } from "@clerk/nextjs/server"
import { getChatsByUserId } from "@/db/queries/chats-queries"
import SidebarClient from "./sidebar-client"

export default async function SidebarContainer() {
  const { userId } = auth()
  if (!userId) return null

  const chats = await getChatsByUserId(userId)

  return <SidebarClient className="w-64 border-r" chats={chats} />
}
