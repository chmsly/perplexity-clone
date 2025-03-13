"use client"

import { SelectMessage, SelectSource } from "@/db/schema"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

interface MessageListProps {
  messages: SelectMessage[]
  sources: SelectSource[]
}

export default function MessageList({ messages, sources }: MessageListProps) {
  return (
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

            {message.role === "assistant" && messageSources.length > 0 && (
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
                        <span className="line-clamp-1">{source.title}</span>
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
  )
}
