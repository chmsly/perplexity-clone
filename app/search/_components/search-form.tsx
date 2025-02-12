"use client"

import { createChatAction } from "@/actions/db/chats-actions"
import { createMessageAction } from "@/actions/db/messages-actions"
import { SelectMessage } from "@/db/schema"
import { useEnter } from "@/lib/hooks/use-enter"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SearchInput } from "./search-input"

interface SearchFormProps {
  userId: string
  chatId?: string
  onSearchStart?: () => void
  onSearchComplete?: (messages: SelectMessage[], sources: string[]) => void
}

export default function SearchForm({
  userId,
  chatId,
  onSearchStart,
  onSearchComplete
}: SearchFormProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const enterRef = useEnter()

  const handleSearch = async () => {
    if (!query.trim() || isSearching) return

    try {
      setIsSearching(true)
      onSearchStart?.()

      let currentChatId = chatId

      if (!currentChatId) {
        const result = await createChatAction({ name: query }, userId)
        if (!result.data) throw new Error("Failed to create chat")
        currentChatId = result.data.id
        router.push(`/search/${currentChatId}`)
      }

      const result = await createMessageAction(
        {
          chatId: currentChatId,
          content: query,
          role: "user"
        },
        query
      )

      if (!result.data) throw new Error("Failed to create message")

      onSearchComplete?.(result.data.messages, result.data.sources)
      setQuery("")
    } catch (error) {
      console.error(error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <SearchInput
      ref={enterRef}
      value={query}
      onChange={setQuery}
      onSearch={handleSearch}
      disabled={isSearching}
    />
  )
}
