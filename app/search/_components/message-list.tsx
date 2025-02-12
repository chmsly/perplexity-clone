"use client"

import { SelectMessage } from "@/db/schema"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import Message from "./message"

interface MessageListProps {
  messages: SelectMessage[]
  sources?: string[]
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
    return null
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
      <div ref={bottomRef} />
    </div>
  )
}
