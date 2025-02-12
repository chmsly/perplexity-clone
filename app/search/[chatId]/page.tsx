"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getChatById } from "@/db/queries/chats-queries"
import { getMessagesByChatId } from "@/db/queries/messages-queries"
import ChatArea from "../_components/chat-area"
import ChatAreaSkeleton from "../_components/chat-area-skeleton"
import ChatHeader from "../_components/chat-header"

interface ChatPageProps {
  params: {
    chatId: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { userId } = auth()
  if (!userId) {
    redirect("/login")
  }

  const chat = await getChatById(params.chatId)
  if (!chat || chat.userId !== userId) {
    redirect("/search")
  }

  return (
    <div className="flex h-full flex-col">
      <ChatHeader chat={chat} />
      <Suspense fallback={<ChatAreaSkeleton />}>
        <ChatAreaFetcher chatId={params.chatId} userId={userId} />
      </Suspense>
    </div>
  )
}

async function ChatAreaFetcher({
  chatId,
  userId
}: {
  chatId: string
  userId: string
}) {
  const messages = await getMessagesByChatId(chatId)

  return <ChatArea userId={userId} chatId={chatId} initialMessages={messages} />
}
