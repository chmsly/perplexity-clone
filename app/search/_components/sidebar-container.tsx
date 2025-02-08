"use server"

import { currentUser } from "@clerk/nextjs"
import { getChatsByUserId } from "@/db/queries/chats-queries"
import SidebarClient from "./sidebar-client"
import { redirect } from "next/navigation"

export default async function SidebarContainer() {
  const user = await currentUser()
  if (!user) {
    redirect("/login")
  }

  const chats = await getChatsByUserId(user.id)

  return <SidebarClient className="w-64 border-r" chats={chats} />
}
