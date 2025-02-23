"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ChatArea from "./_components/chat-area"
import ChatAreaSkeleton from "./_components/chat-area-skeleton"

export default async function SearchPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  return (
    <Suspense fallback={<ChatAreaSkeleton />}>
      <ChatArea userId={userId} />
    </Suspense>
  )
}
