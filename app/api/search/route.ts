import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { nanoid } from "nanoid"

export async function POST(req: Request) {
  try {
    // Get authentication info
    const authResult = await auth()
    const userId = authResult?.userId

    console.log("Auth result:", { userId })

    if (!userId) {
      console.error("Unauthorized: No userId found")
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized"
        },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await req.json()
    const { query, chatId } = body

    console.log("Request body:", { query, chatId })

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: "Query is required"
        },
        { status: 400 }
      )
    }

    console.log("Search API called with:", { userId, chatId, query })

    // Generate a chat ID if one wasn't provided
    const generatedChatId = chatId || nanoid()

    // Create a simple response
    const userMessage = {
      id: nanoid(),
      chatId: generatedChatId,
      content: query,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const aiMessage = {
      id: nanoid(),
      chatId: generatedChatId,
      content: `This is a simulated AI response to your query: ${query}`,
      role: "assistant",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const source = {
      id: nanoid(),
      messageId: aiMessage.id,
      chatId: generatedChatId,
      title: "Example Source",
      url: "https://example.com",
      content: "This is example source content related to your query.",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    console.log("Search completed successfully")

    return NextResponse.json({
      success: true,
      data: {
        chat: {
          id: generatedChatId,
          userId,
          name: query.length > 30 ? `${query.substring(0, 30)}...` : query,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        messages: [userMessage, aiMessage],
        sources: [source]
      }
    })
  } catch (error) {
    console.error("Error in search API:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during search"
      },
      { status: 500 }
    )
  }
}
