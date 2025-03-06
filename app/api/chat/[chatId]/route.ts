import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { getChatById } from "@/db/queries/chats-queries"
import { getMessagesByChatId } from "@/db/queries/messages-queries"

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

    const messages = await getMessagesByChatId(chatId)

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("[CHAT_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
