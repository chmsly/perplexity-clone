"use client"

import { createChatAction } from "@/actions/db/chats-actions"
import { createMessageAction } from "@/actions/db/messages-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectMessage } from "@/db/schema"
import { useEnter } from "@/lib/hooks/use-enter"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return

    setIsLoading(true)
    onSearchStart?.()

    try {
      let currentChatId = chatId
      if (!currentChatId) {
        const result = await createChatAction({ name: query }, userId)
        if (!result.isSuccess || !result.data) {
          throw new Error(result.message)
        }
        currentChatId = result.data.id
      }

      const result = await createMessageAction({
        chatId: currentChatId,
        content: query,
        role: "user"
      })

      if (!result.isSuccess || !result.data) {
        throw new Error(result.message)
      }

      if (!chatId) {
        router.push(`/search/${currentChatId}`)
      }

      onSearchComplete?.(result.data.messages, result.data.sources)
      setQuery("")
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEnter(handleSearch, [query, isLoading])

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSearch()
      }}
      className="flex gap-2 p-4"
    >
      <Input
        placeholder="Ask me anything..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        <Search className="size-4" />
      </Button>
    </form>
  )
}
