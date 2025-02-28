"use client"

import { SelectMessage, SelectSource } from "@/db/schema"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import Message from "./message"
import Sources from "./sources"

interface MessageListProps {
  messages: SelectMessage[]
  sources: SelectSource[]
  className?: string
}

export default function MessageList({
  messages,
  sources,
  className
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!messages.length) {
    return (
      <div className="text-muted-foreground flex h-full flex-col items-center justify-center">
        <p>No messages yet.</p>
        <p>Start a search to begin.</p>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6 p-4", className)}>
      {messages.map((message, i) => (
        <Message
          key={message.id}
          message={message}
          sources={i === messages.length - 1 ? sources : undefined}
        />
      ))}
      <Sources sources={sources} />
      <div ref={bottomRef} />
    </div>
  )
}
