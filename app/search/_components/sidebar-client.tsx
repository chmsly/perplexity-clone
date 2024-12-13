"use client"

import { cn } from "@/lib/utils"
import { SelectChat } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

interface SidebarClientProps {
  className?: string
  chats: SelectChat[]
}

export default function SidebarClient({
  className,
  chats
}: SidebarClientProps) {
  return (
    <div className={cn("bg-muted/10 h-full w-80 border-r", className)}>
      <div className="space-y-4 p-4">
        <h2 className="font-semibold">Recent Searches</h2>

        <Button className="w-full">
          <PlusIcon className="mr-2 size-4" />
          New Chat
        </Button>

        <div className="space-y-2">
          {chats.map(chat => (
            <Button
              key={chat.id}
              variant="ghost"
              className="w-full justify-start"
            >
              {chat.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
