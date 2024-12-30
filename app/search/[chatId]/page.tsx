import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ChatArea from "../_components/chat-area"
import ChatAreaSkeleton from "../_components/chat-area-skeleton"
import { getChatAction } from "@/actions/db/chats-actions"

interface ChatPageProps {
  params: {
    chatId: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { userId } = await auth()
  if (!userId) redirect("/login")

  const { data: chat } = await getChatAction(params.chatId)
  if (!chat) redirect("/search")

  return (
    <Suspense fallback={<ChatAreaSkeleton />}>
      <ChatArea
        userId={userId}
        initialMessages={chat.messages || []}
        initialSources={chat.sources || []}
      />
    </Suspense>
  )
}
