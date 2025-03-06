"use client"

import { SelectChat } from "@/db/schema"
import { formatDate } from "@/lib/utils"

interface ChatHeaderProps {
  chat: SelectChat
}

export default function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <div className="border-b p-4">
      <h1 className="text-xl font-bold">{chat.name || "Untitled Search"}</h1>
      <p className="text-muted-foreground text-sm">
        {formatDate(chat.createdAt)}
      </p>
    </div>
  )
}
