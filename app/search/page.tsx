"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getProfileByUserId } from "@/db/queries/profiles-queries"
import ChatArea from "./_components/chat-area"
import ChatAreaSkeleton from "./_components/chat-area-skeleton"

export default async function SearchPage() {
  const { userId } = auth()
  if (!userId) {
    redirect("/login")
  }

  const profile = await getProfileByUserId(userId)
  if (!profile) {
    redirect("/signup")
  }
  if (profile.membership === "free") {
    redirect("/pricing")
  }

  return (
    <Suspense fallback={<ChatAreaSkeleton />}>
      <ChatArea userId={userId} />
    </Suspense>
  )
}
