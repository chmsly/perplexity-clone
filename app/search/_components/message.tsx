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
  return (
    <div className="flex items-start gap-4">
      <div
        className={cn(
          "flex size-6 shrink-0 select-none items-center justify-center rounded",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        {message.role === "user" ? (
          <User className="size-4" />
        ) : (
          <Bot className="size-4" />
        )}
      </div>

      <div className="flex-1 space-y-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre: ({ node, ...props }) => (
              <div className="bg-muted overflow-auto rounded-lg p-4">
                <pre {...props} />
              </div>
            ),
            code: ({ node, ...props }) => (
              <code className="bg-muted rounded px-1 py-0.5" {...props} />
            )
          }}
        >
          {message.content}
        </ReactMarkdown>

        {sources && sources.length > 0 && (
          <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
            {sources.map((source, i) => (
              <a
                key={i}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground truncate underline underline-offset-2"
              >
                {new URL(source).hostname}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Message)
