"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { SearchInput } from "./search-input"
import { SelectMessage, SelectSource } from "@/db/schema"
import { createChatAction } from "@/actions/db/chats-actions"
import { createMessageAction } from "@/actions/db/messages-actions"
import { createSourcesAction } from "@/actions/db/sources-actions"

interface SearchFormProps {
  userId: string
  chatId?: string
  onSearchStart: () => void
  onSearchComplete: (messages: SelectMessage[], sources: SelectSource[]) => void
}

export default function SearchForm({
  userId,
  chatId,
  onSearchStart,
  onSearchComplete
}: SearchFormProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const abortControllerRef = useRef<AbortController | null>(null)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || isLoading) return

    try {
      setQuery(searchQuery)
      setIsLoading(true)
      onSearchStart()

      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create a new abort controller
      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      let currentChatId = chatId

      // If no chatId, create a new chat
      if (!currentChatId) {
        const result = await createChatAction({
          userId,
          name: searchQuery
        })

        if (!result.isSuccess || !result.data) {
          throw new Error(result.message)
        }

        currentChatId = result.data.id
        router.push(`/search/${currentChatId}`)
      }

      // Create user message
      const userMessageResult = await createMessageAction({
        chatId: currentChatId,
        content: searchQuery,
        role: "user"
      })

      if (!userMessageResult.isSuccess) {
        throw new Error(userMessageResult.message)
      }

      // Fetch messages to get the updated list including the user message
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chatId: currentChatId,
          message: searchQuery
        }),
        signal
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Create assistant message
      const assistantMessageResult = await createMessageAction({
        chatId: currentChatId,
        content: data.answer,
        role: "assistant"
      })

      if (!assistantMessageResult.isSuccess || !assistantMessageResult.data) {
        throw new Error(assistantMessageResult.message)
      }

      // Create sources
      for (const source of data.sources) {
        await createSourcesAction({
          chatId: currentChatId!,
          url: source.url,
          title: source.title
        })
      }

      // Get all messages for this chat
      const messagesResponse = await fetch(`/api/chat/${currentChatId}`)
      const messagesData = await messagesResponse.json()

      // Get all sources for this chat
      const sourcesResponse = await fetch(`/api/sources/${currentChatId}`)
      const sourcesResponseData = await sourcesResponse.json()

      onSearchComplete(messagesData.messages, sourcesResponseData.sources)
      setQuery("")
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Search error:", error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SearchInput
      value={query}
      onChange={setQuery}
      onSearch={handleSearch}
      disabled={isLoading}
      className="mx-auto w-full max-w-2xl"
    />
  )
}
