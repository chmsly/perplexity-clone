import { createMessageAction } from "@/actions/db/messages-actions"
import { createSourcesAction } from "@/actions/db/sources-actions"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { sleep } from "@/lib/utils"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { chatId, content } = await req.json()
    if (!chatId || !content) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Simulate streaming
    await sleep(1000)

    const sources = [
      "https://www.google.com",
      "https://www.youtube.com",
      "https://www.github.com"
    ]

    await createSourcesAction(
      sources.map(url => ({
        chatId,
        url,
        title: new URL(url).hostname
      }))
    )

    const result = await createMessageAction({
      chatId,
      content: "This is a mock response from the API.",
      role: "assistant"
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[CHAT_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
