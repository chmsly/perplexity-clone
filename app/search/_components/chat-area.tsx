"use client"

import { useEffect, useRef, useState } from "react"
import { SelectMessage, SelectSource } from "@/db/schema"
import MessageList from "./message-list"
import SearchForm from "./search-form"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

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
  const [messages, setMessages] = useState<SelectMessage[]>(initialMessages)
  const [sources, setSources] = useState<SelectSource[]>(initialSources)
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { userId, isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  // Move useEffect hooks to the top level - before any conditional returns
  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Show loading state while auth is loading
  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
    )
  }

  // Handle authentication state
  if (!isSignedIn || !userId) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <p className="mb-4 text-center text-lg">
          Please sign in to use the search feature
        </p>
        <Button asChild>
          <a href="/login">Sign In</a>
        </Button>
      </div>
    )
  }

  const handleSearchStart = () => {
    setLoading(true)
  }

  const handleSearchComplete = (
    newMessages: SelectMessage[],
    newSources: SelectSource[]
  ) => {
    console.log("Search complete with messages:", newMessages)
    console.log("Search complete with sources:", newSources)

    // Replace existing messages with new ones
    setMessages(newMessages)
    setSources(newSources)
    setLoading(false)

    // If this was a new chat (no chatId), redirect to the new chat page
    if (!chatId && newMessages.length > 0) {
      const newChatId = newMessages[0].chatId
      router.push(`/search/${newChatId}`)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length > 0 ? (
          <MessageList messages={messages} sources={sources} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h2 className="mb-2 text-2xl font-bold">Ask anything</h2>
            <p className="text-muted-foreground mb-8">
              Start by typing your question below
            </p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="border-t p-4">
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
