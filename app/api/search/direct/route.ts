import { NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json()
    const { query } = body

    console.log("Direct search API called with:", { query })

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: "Query is required"
        },
        { status: 400 }
      )
    }

    // Log API keys (masked for security)
    console.log("OpenAI API Key available:", !!process.env.OPENAI_API_KEY)
    console.log("Exa API Key available:", !!process.env.EXA_API_KEY)

    // Make a direct call to OpenAI
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: query }
        ],
        max_tokens: 500
      })

      const response = {
        success: true,
        data: {
          query,
          result: completion.choices[0].message.content,
          model: completion.model,
          timestamp: new Date().toISOString()
        }
      }

      console.log("OpenAI response received")
      return NextResponse.json(response)
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError)
      return NextResponse.json(
        {
          success: false,
          error: "Error calling OpenAI API",
          details: openaiError.message
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error in direct search API:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during search"
      },
      { status: 500 }
    )
  }
}
