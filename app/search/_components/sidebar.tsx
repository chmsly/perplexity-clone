"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { SelectChat } from "@/db/schema"
import { cn } from "@/lib/utils"
import { getChatsByUserId } from "@/db/queries/chats-queries"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const [chats, setChats] = useState<SelectChat[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    async function fetchChats() {
      if (!userId) return

      try {
        // Use a client-side fetch to get chats
        const response = await fetch(`/api/chats?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setChats(data.chats || [])
        }
      } catch (error) {
        console.error("Error fetching chats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [userId])

  return (
    <div className={cn("flex h-full w-64 flex-col border-r", className)}>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Searches</h2>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/search">
            <Plus className="size-4" />
            <span className="sr-only">New Search</span>
          </Link>
        </Button>
      </div>

      <div className="flex-1 overflow-auto pb-6">
        {loading ? (
          <div className="text-muted-foreground p-4 text-center">
            Loading...
          </div>
        ) : chats.length === 0 ? (
          <div className="text-muted-foreground p-4 text-center">
            No searches yet.
          </div>
        ) : (
          <ul className="space-y-2 px-2">
            {chats.map(chat => (
              <li key={chat.id}>
                <Link
                  href={`/search/${chat.id}`}
                  className="hover:bg-accent flex items-center rounded-md px-3 py-2"
                >
                  <Search className="mr-2 size-4" />
                  <span className="line-clamp-1">{chat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
