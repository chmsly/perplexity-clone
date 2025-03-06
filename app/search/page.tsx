"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ChatArea from "./_components/chat-area"

export default async function SearchPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  return <ChatArea />
}
