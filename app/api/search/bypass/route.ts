import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

export async function POST(req: Request) {
  try {
    const { query } = await req.json()

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
    const chatId = nanoid()
    const messageId = nanoid()
    const sourceId = nanoid()

    return NextResponse.json({
      success: true,
      data: {
        chat: {
          id: chatId,
          name: query.substring(0, 30),
          createdAt: new Date().toISOString()
        },
        messages: [
          {
            id: nanoid(),
            chatId,
            content: query,
            role: "user",
            createdAt: new Date().toISOString()
          },
          {
            id: messageId,
            chatId,
            content: `This is a simulated response to: "${query}". The database connection is currently not working.`,
            role: "assistant",
            createdAt: new Date().toISOString()
          }
        ],
        sources: [
          {
            id: sourceId,
            messageId,
            title: "Example Source",
            url: "https://example.com",
            content: "This is an example source content."
          }
        ]
      }
    })
  } catch (error) {
    console.error("Error in bypass search:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred"
      },
      { status: 500 }
    )
  }
}
