"use client"

import { SelectMessage } from "@/db/schema"
import { useEffect, useRef, useState } from "react"
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
  const [isSearching, setIsSearching] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSearchStart = () => {
    setIsSearching(true)
  }

  const handleSearchComplete = (
    newMessages: SelectMessage[],
    newSources: string[]
  ) => {
    setMessages(newMessages)
    setSources(newSources)
    setIsSearching(false)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-auto p-4">
        <MessageList messages={messages} sources={sources} />
        <div ref={bottomRef} />
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
