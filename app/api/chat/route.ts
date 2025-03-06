import { createMessageAction } from "@/actions/db/messages-actions"
import { createSourcesAction } from "@/actions/db/sources-actions"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { sleep } from "@/lib/utils"
import { OpenAI } from "openai"
import { getChatById } from "@/db/queries/chats-queries"
import { getMessagesByChatId } from "@/db/queries/messages-queries"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

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

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { chatId, message } = body

    if (!chatId) {
      return new NextResponse("Chat ID is required", { status: 400 })
    }

    if (!message) {
      return new NextResponse("Message is required", { status: 400 })
    }

    const chat = await getChatById(chatId)

    if (!chat || chat.userId !== userId) {
      return new NextResponse("Not found", { status: 404 })
    }

    // Simulate a search
    const searchResults = await simulateSearch(message)

    // Generate an answer based on the search results
    const answer = await generateAnswer(message, searchResults)

    return NextResponse.json({
      answer,
      sources: searchResults
    })
  } catch (error) {
    console.error("[CHAT_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

async function simulateSearch(query: string) {
  // In a real app, this would call a search API like Google or Bing
  // For this demo, we'll return fake results
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    {
      title: "Example Search Result 1",
      url: "https://example.com/result1"
    },
    {
      title: "Example Search Result 2",
      url: "https://example.com/result2"
    },
    {
      title: "Example Search Result 3",
      url: "https://example.com/result3"
    }
  ]
}

async function generateAnswer(query: string, searchResults: any[]) {
  const searchResultsText = searchResults
    .map(result => `- ${result.title}: ${result.url}`)
    .join("\n")

  const prompt = `
You are an AI assistant that answers questions based on search results.

Search query: ${query}

Search results:
${searchResultsText}

Based on these search results, provide a comprehensive answer to the query.
Include relevant information from the search results.
If you don't know the answer, say so.
`

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that provides informative answers based on search results."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  })

  return response.choices[0].message.content
}
