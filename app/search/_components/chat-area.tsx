"use client"

import { useEffect, useRef, useState } from "react"
import { SelectMessage, SelectSource } from "@/db/schema"
import MessageList from "./message-list"
import SearchForm from "./search-form"
import { auth } from "@clerk/nextjs"

interface ChatAreaProps {
  chatId?: string
  initialMessages?: SelectMessage[]
  initialSources?: SelectSource[]
}

export default function ChatArea({
  chatId,
  initialMessages = [],
  initialSources = []
}: ChatAreaProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [sources, setSources] = useState(initialSources)
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { userId } = auth()

  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSearchStart = () => {
    setLoading(true)
  }

  const handleSearchComplete = (
    newMessages: SelectMessage[],
    newSources: SelectSource[]
  ) => {
    setMessages(newMessages)
    setSources(newSources)
    setLoading(false)
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
