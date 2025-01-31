"use client"

import { cn } from "@/lib/utils"
import { SelectMessage } from "@/db/schema"
import { Bot, User } from "lucide-react"
import { memo } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MessageProps {
  message: SelectMessage
  sources?: string[]
}

function Message({ message, sources }: MessageProps) {
  const isAssistant = message.role === "assistant"

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 px-4 py-8",
        isAssistant ? "bg-secondary/50" : ""
      )}
    >
      <div
        className={cn(
          "flex size-6 shrink-0 select-none items-center justify-center rounded",
          isAssistant ? "bg-primary" : "bg-primary/10"
        )}
      >
        {isAssistant ? (
          <Bot className="text-primary-foreground size-4" />
        ) : (
          <User className="text-primary size-4" />
        )}
      </div>

      <div className="flex-1 space-y-4">
        <ReactMarkdown
          className="prose prose-neutral dark:prose-invert max-w-none space-y-4"
          remarkPlugins={[remarkGfm]}
        >
          {message.content}
        </ReactMarkdown>

        {isAssistant && sources && sources.length > 0 && (
          <div className="not-prose mt-4">
            <div className="text-muted-foreground mb-2 text-sm font-medium">
              Sources:
            </div>
            <div className="flex flex-wrap gap-2">
              {sources.map((source, i) => (
                <a
                  key={i}
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-primary/10 rounded-lg px-2 py-1 text-sm"
                >
                  {new URL(source).hostname}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Message)
