"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getChatById } from "@/db/queries/chats-queries"
import { getMessagesByChatId } from "@/db/queries/messages-queries"
import { getSourcesByChatId } from "@/db/queries/sources-queries"
import ChatArea from "../_components/chat-area"
import ChatAreaSkeleton from "../_components/chat-area-skeleton"
import ChatHeader from "../_components/chat-header"

interface ChatPageProps {
  params: {
    chatId: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  return (
    <Suspense fallback={<ChatAreaSkeleton />}>
      <ChatPageContent chatId={params.chatId} />
    </Suspense>
  )
}

async function ChatPageContent({ chatId }: { chatId: string }) {
  const { userId } = auth()
  if (!userId) {
    redirect("/login")
  }

  const chat = await getChatById(chatId)
  if (!chat || chat.userId !== userId) {
    redirect("/search")
  }

  const messages = await getMessagesByChatId(chatId)
  const sources = await getSourcesByChatId(chatId)

  return (
    <div className="flex h-full flex-col">
      <ChatHeader chat={chat} />
      <ChatArea
        chatId={chatId}
        initialMessages={messages}
        initialSources={sources}
      />
    </div>
  )
}
