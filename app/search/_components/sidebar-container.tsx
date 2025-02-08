"use server"

import { auth } from "@clerk/nextjs/server"
import { getChatsByUserId } from "@/db/queries/chats-queries"
import SidebarClient from "./sidebar-client"
import { redirect } from "next/navigation"

export default async function SidebarContainer() {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const chats = await getChatsByUserId(userId)

  return <SidebarClient className="w-64 border-r" chats={chats} />
}
