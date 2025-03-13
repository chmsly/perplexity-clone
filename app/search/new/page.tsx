"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  chatId: string
  content: string
  role: "user" | "assistant"
  createdAt: Date | string
  updatedAt: Date | string
}

interface Source {
  id: string
  messageId: string
  chatId: string
  title: string
  url: string
  content?: string
  createdAt: Date | string
  updatedAt: Date | string
}

export default function NewSearchPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [sources, setSources] = useState<Source[]>([])
  const { userId, isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  // Debug log for component rendering
  useEffect(() => {
    console.log("NewSearchPage rendered with userId:", userId)
  }, [userId])

  // Show loading state while auth is loading
  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  // Handle authentication state
  if (!isSignedIn || !userId) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <p className="mb-4 text-center text-lg">
          Please sign in to use the search feature
        </p>
        <Button asChild>
          <a href="/login">Sign In</a>
        </Button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!query.trim()) return

    setIsLoading(true)

    try {
      console.log("Submitting search:", { query, userId })

      // Add a user message immediately for better UX
      const tempUserMessage: Message = {
        id: `temp-${Date.now()}`,
        chatId: "temp-chat",
        content: query,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setMessages(prev => [...prev, tempUserMessage])

      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query
        })
      })

      console.log("Search response status:", response.status)

      const result = await response.json()
      console.log("Search result:", result)

      if (response.ok && result.success) {
        // Replace the temporary message with the actual messages from the response
        setMessages(result.data.messages)
        setSources(result.data.sources)
        setQuery("") // Clear the input after successful search

        console.log("Updated messages:", result.data.messages)
        console.log("Updated sources:", result.data.sources)
      } else {
        console.error("Search failed:", result.error)
        toast.error(result.error || "Search failed")

        // Remove the temporary message if the search failed
        setMessages(prev => prev.filter(m => m.id !== tempUserMessage.id))
      }
    } catch (error) {
      console.error("Error during search:", error)
      toast.error("An error occurred during search")

      // Remove any temporary messages on error
      setMessages(prev => prev.filter(m => !m.id.startsWith("temp-")))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b p-4">
        <h1 className="text-xl font-bold">Perplexity Clone</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {messages.length > 0 ? (
          <div className="space-y-6">
            {messages.map(message => {
              const messageSources = sources.filter(
                source => source.messageId === message.id
              )

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col space-y-2",
                    message.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {message.role === "assistant" &&
                    messageSources.length > 0 && (
                      <div className="ml-4 mt-2">
                        <p className="text-muted-foreground mb-1 text-sm font-medium">
                          Sources:
                        </p>
                        <ul className="space-y-1">
                          {messageSources.map(source => (
                            <li key={source.id} className="text-sm">
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary flex items-center hover:underline"
                              >
                                <span className="line-clamp-1">
                                  {source.title}
                                </span>
                                <ExternalLink className="ml-1 size-3" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h2 className="mb-2 text-2xl font-bold">Ask anything</h2>
            <p className="text-muted-foreground mb-8">
              Start by typing your question below
            </p>
          </div>
        )}
      </main>

      <footer className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading || !query.trim() || !userId}
          >
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
      </footer>
    </div>
  )
}
