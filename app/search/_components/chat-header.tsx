"use client"

import { updateChatAction } from "@/actions/db/chats-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectChat } from "@/db/schema"
import { cn } from "@/lib/utils"
import { Check, Pencil, X } from "lucide-react"
import { useState } from "react"

interface ChatHeaderProps {
  chat: SelectChat
  className?: string
}

export default function ChatHeader({ chat, className }: ChatHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(chat.name || "")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || isLoading) return

    setIsLoading(true)
    try {
      const result = await updateChatAction(chat.id, { name })
      if (result.isSuccess) {
        setIsEditing(false)
      } else {
        console.error(result.message)
      }
    } catch (error) {
      console.error("Failed to update chat name:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex items-center justify-between p-4", className)}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Chat name..."
            className="h-8"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="size-8"
            disabled={isLoading}
          >
            <Check className="text-primary size-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-8"
            onClick={() => {
              setIsEditing(false)
              setName(chat.name || "")
            }}
            disabled={isLoading}
          >
            <X className="text-destructive size-4" />
          </Button>
        </form>
      ) : (
        <>
          <h1 className="text-xl font-bold">
            {chat.name || "Untitled Search"}
          </h1>
          <Button
            size="icon"
            variant="ghost"
            className="size-8"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="text-primary size-4" />
          </Button>
        </>
      )}
    </div>
  )
}
