import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getChatsByUserId } from "@/db/queries/chats-queries"

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const queryUserId = url.searchParams.get("userId")

    // Ensure the requesting user can only access their own chats
    if (queryUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const chats = await getChatsByUserId(userId)

    return NextResponse.json({ chats: chats || [] })
  } catch (error) {
    console.error("Error fetching chats:", error)
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    )
  }
}
