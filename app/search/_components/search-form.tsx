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
    if (!userId) {
      toast.error("You must be signed in to search")
      return
    }

    setIsLoading(true)
    onSearchStart?.()

    try {
      console.log("Submitting search:", { query, chatId, userId })

      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query,
          chatId
        })
      })

      console.log("Search response status:", response.status)

      const result = await response.json()
      console.log("Search result:", result)

      if (response.ok && result.success) {
        // Cast the messages and sources to the expected types
        const messages = result.data.messages as SelectMessage[]
        const sources = result.data.sources as SelectSource[]

        onSearchComplete?.(messages, sources)
        setQuery("") // Clear the input after successful search
      } else {
        console.error("Search failed:", result.error)
        toast.error(result.error || "Search failed")
      }
    } catch (error) {
      console.error("Error during search:", error)
      toast.error("An error occurred during search")
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
      <Button type="submit" disabled={isLoading || !query.trim() || !userId}>
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
