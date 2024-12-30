"use client"

import { useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchInput } from "./search-input"
import { Message, Source } from "@/types"

interface ChatAreaProps {
  initialMessages?: Message[]
  initialSources?: Source[]
  userId: string
}

export default function ChatArea({
  initialMessages = [],
  initialSources = [],
  userId
}: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [sources, setSources] = useState<Source[]>(initialSources)
  const [isSearching, setIsSearching] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = async (query: string) => {
    setIsSearching(true)

    try {
      // TODO: Implement search functionality
      console.log("Searching for:", query)
    } catch (error) {
      console.error("Error searching:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <SearchInput
        ref={inputRef}
        className="mx-auto w-full max-w-2xl"
        onSearch={handleSearch}
      />

      <div className="grow space-y-4">
        {messages.map((message, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="prose dark:prose-invert max-w-none">
              {message.content}
            </div>
          </div>
        ))}

        {isSearching && (
          <div className="rounded-lg border p-4">
            <div className="animate-pulse space-y-2">
              <div className="bg-muted h-4 w-3/4 rounded" />
              <div className="bg-muted h-4 w-1/2 rounded" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
