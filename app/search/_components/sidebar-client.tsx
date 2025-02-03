"use client"

import { cn } from "@/lib/utils"
import { SelectChat } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface SidebarClientProps {
  className?: string
  chats: SelectChat[]
}

export default function SidebarClient({
  className,
  chats
}: SidebarClientProps) {
  const params = useParams()
  const currentChatId = params.chatId

  return (
    <div className={cn("bg-muted/10 h-full w-80 border-r", className)}>
      <div className="space-y-4 p-4">
        <h2 className="font-semibold">Recent Searches</h2>

        <Link href="/search">
          <Button className="w-full">
            <PlusCircle className="mr-2 size-4" />
            New Chat
          </Button>
        </Link>

        <div className="space-y-2">
          {chats.map(chat => (
            <Link key={chat.id} href={`/search/${chat.id}`}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", {
                  "bg-primary text-primary-foreground":
                    chat.id === currentChatId
                })}
              >
                {chat.name || "Untitled Search"}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
