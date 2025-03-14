"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectMessage, SelectSource } from "@/db/schema"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface SearchFormProps {
  userId: string
  chatId?: string
  onSearchStart?: () => void
  onSearchComplete?: (
    messages: SelectMessage[],
    sources: SelectSource[]
  ) => void
}

export default function SearchForm({
  userId,
  chatId,
  onSearchStart,
  onSearchComplete
}: SearchFormProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!query.trim()) return

    setIsLoading(true)
    onSearchStart?.()

    try {
      console.log("Submitting search:", { query, chatId, userId })

      // Use the bypass API
      const response = await fetch("/api/search/bypass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, chatId })
      })

      console.log("Search response status:", response.status)

      const result = await response.json()
      console.log("Search result:", result)

      if (result.success && result.data) {
        // Create a simulated response if the API doesn't return messages
        let messages = result.data.messages || []
        let sources = result.data.sources || []

        // If no messages were returned, create simulated ones
        if (messages.length === 0) {
          const chatId = result.data.chat?.id || "simulated-chat"

          messages = [
            {
              id: `user-${Date.now()}`,
              chatId,
              content: query,
              role: "user",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: `ai-${Date.now()}`,
              chatId,
              content: `This is a simulated response to: "${query}". The API call worked but didn't return messages.`,
              role: "assistant",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ]
        }

        // Call the completion handler with the messages and sources
        onSearchComplete?.(messages, sources)
        setQuery("") // Clear the input after successful search
      } else {
        console.error("Search failed:", result.error)
        toast.error(result.error || "Search failed")

        // Create a simulated error response
        const errorMessages = [
          {
            id: `user-${Date.now()}`,
            chatId: "error-chat",
            content: query,
            role: "user",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: `error-${Date.now()}`,
            chatId: "error-chat",
            content: `Sorry, there was an error processing your request: ${result.error || "Unknown error"}`,
            role: "assistant",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]

        onSearchComplete?.(errorMessages, [])
      }
    } catch (error) {
      console.error("Error during search:", error)
      toast.error("An error occurred during search")

      // Create a simulated error response
      const errorMessages = [
        {
          id: `user-${Date.now()}`,
          chatId: "error-chat",
          content: query,
          role: "user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: `error-${Date.now()}`,
          chatId: "error-chat",
          content: "Sorry, there was an error processing your request.",
          role: "assistant",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]

      onSearchComplete?.(errorMessages, [])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Ask anything..."
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !query.trim()}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Searching...
          </>
        ) : (
          "Search"
        )}
      </Button>
    </form>
  )
}
