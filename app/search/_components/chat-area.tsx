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
  const [messages, setMessages] = useState(initialMessages)
  const [sources, setSources] = useState(initialSources)
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
  if (!isSignedIn) {
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
    setMessages(newMessages)
    setSources(newSources)
    setLoading(false)
  }

  // Ensure userId is available before rendering the form
  if (!userId) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading user data...
      </div>
    )
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
