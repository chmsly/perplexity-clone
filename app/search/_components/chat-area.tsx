"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface Message {
  id: string
  content: string
  role: "assistant" | "user"
  createdAt: Date
}

interface ChatAreaProps {
  className?: string
  messages?: Message[]
  isLoading?: boolean
  onSubmit?: (message: string) => void
}

export default function ChatArea({
  className,
  messages = [],
  isLoading = false,
  onSubmit
}: ChatAreaProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !onSubmit) return

    onSubmit(input)
    setInput("")
  }

  return (
    <div className={cn("h-full flex-1", className)}>
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map(message => (
            <div key={message.id} className="mb-4">
              {/* Message content will go here */}
            </div>
          ))}

          {isLoading && (
            <div className="mb-4">{/* Loading state will go here */}</div>
          )}
        </div>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              className="bg-background w-full rounded-lg border p-4"
              placeholder="Ask anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
