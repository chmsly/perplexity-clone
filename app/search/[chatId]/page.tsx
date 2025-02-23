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
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const chat = await getChatById(params.chatId)
  if (!chat) {
    redirect("/search")
  }

  const messages = await getMessagesByChatId(params.chatId)

  return (
    <div className="flex h-full flex-col">
      <ChatHeader chat={chat} />
      <Suspense fallback={<ChatAreaSkeleton />}>
        <ChatArea
          userId={userId}
          chatId={params.chatId}
          initialMessages={messages}
        />
      </Suspense>
    </div>
  )
}
