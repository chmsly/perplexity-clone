import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { getChatById } from "@/db/queries/chats-queries"
import { getSourcesByChatId } from "@/db/queries/sources-queries"

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const chatId = params.chatId
    const chat = await getChatById(chatId)

    if (!chat || chat.userId !== userId) {
      return new NextResponse("Not found", { status: 404 })
    }

    const sources = await getSourcesByChatId(chatId)

    return NextResponse.json({ sources })
  } catch (error) {
    console.error("[SOURCES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
