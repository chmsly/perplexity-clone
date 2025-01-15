"use client"

import { SelectMessage } from "@/db/schema"
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
    <div className={className}>
      {messages.map(message => (
        <Message key={message.id} message={message} sources={sources} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
