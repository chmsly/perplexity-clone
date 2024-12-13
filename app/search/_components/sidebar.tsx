"use client"

import { SelectChat } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import SidebarClient from "./sidebar-client"

interface SidebarProps {
  className?: string
  userId: string
  initialChats: SelectChat[]
  onCreateChat: () => Promise<void>
}

export default function Sidebar({
  className,
  userId,
  initialChats,
  onCreateChat
}: SidebarProps) {
  const [chats, setChats] = useState(initialChats)

  return (
    <div className="flex h-full flex-col">
      <form action={onCreateChat} className="p-4">
        <Button
          className="w-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
          variant="ghost"
          type="submit"
        >
          <Plus className="mr-2 size-4 text-neutral-600" />
          New Chat
        </Button>
      </form>

      <SidebarClient className={className} chats={chats} />
    </div>
  )
}
