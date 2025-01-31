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
  const [isSearching, setIsSearching] = useState(false)

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
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} sources={sources} />
        {isSearching && (
          <div className="bg-secondary/50 flex w-full items-start gap-4 px-4 py-8">
            <div className="bg-primary flex size-6 shrink-0 select-none items-center justify-center rounded">
              <div className="bg-primary-foreground size-4 animate-pulse rounded-full" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="animate-pulse space-y-2">
                <div className="bg-muted h-4 w-3/4 rounded" />
                <div className="bg-muted h-4 w-1/2 rounded" />
              </div>
            </div>
          </div>
        )}
      </div>

      <SearchForm
        chatId={chatId}
        onSearchStart={() => setIsSearching(true)}
        onSearchComplete={handleSearchComplete}
      />
    </div>
  )
}
