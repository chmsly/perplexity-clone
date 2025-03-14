import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json()
    const { query, chatId } = body

    console.log("Bypass search API called with:", { query, chatId })

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: "Query is required"
        },
        { status: 400 }
      )
    }

    // Create a simulated response without using the database
    const generatedChatId = chatId || randomUUID()
    const userMessageId = randomUUID()
    const aiMessageId = randomUUID()
    const sourceId = randomUUID()

    const response = {
      success: true,
      data: {
        chat: {
          id: generatedChatId,
          name: query.substring(0, 30),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        messages: [
          {
            id: userMessageId,
            chatId: generatedChatId,
            content: query,
            role: "user",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: aiMessageId,
            chatId: generatedChatId,
            content: `This is a simulated response to: "${query}". The database connection is currently not working.`,
            role: "assistant",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ],
        sources: [
          {
            id: sourceId,
            messageId: aiMessageId,
            chatId: generatedChatId,
            title: "Example Source",
            url: "https://example.com",
            content: "This is an example source content.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      }
    }

    console.log("Sending simulated response")
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in bypass search:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during search"
      },
      { status: 500 }
    )
  }
}
