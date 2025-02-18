"use client"

import { SelectMessage } from "@/db/schema"
import { useState } from "react"
import MessageList from "./message-list"
import SearchForm from "./search-form"

interface ChatAreaProps {
  userId: string
  chatId?: string
  initialMessages?: SelectMessage[]
}

export default function ChatArea({
  userId,
  chatId,
  initialMessages = []
}: ChatAreaProps) {
  const [messages, setMessages] = useState<SelectMessage[]>(initialMessages)
  const [sources, setSources] = useState<string[]>([])

  const handleSearchStart = () => {
    setSources([])
  }

  const handleSearchComplete = (
    newMessages: SelectMessage[],
    newSources: string[]
  ) => {
    setMessages(newMessages)
    setSources(newSources)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <MessageList messages={messages} sources={sources} />
      </div>

      <div className="p-4">
        <SearchForm
          userId={userId}
          chatId={chatId}
          onSearchStart={handleSearchStart}
          onSearchComplete={handleSearchComplete}
        />
      </div>
    </div>
  )
}
