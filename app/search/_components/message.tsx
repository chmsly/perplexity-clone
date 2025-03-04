"use client"

import { SelectMessage, SelectSource } from "@/db/schema"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"
import Sources from "./sources"

interface MessageProps {
  message: SelectMessage
  sources?: SelectSource[]
}

export default function Message({ message, sources }: MessageProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4",
        message.role === "user" ? "justify-end" : ""
      )}
    >
      {message.role === "assistant" && (
        <div className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-md">
          <Bot className="size-5" />
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-2 rounded-lg px-4 py-2",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        {sources && sources.length > 0 && <Sources sources={sources} />}
      </div>

      {message.role === "user" && (
        <div className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-md">
          <User className="size-5" />
        </div>
      )}
    </div>
  )
}
