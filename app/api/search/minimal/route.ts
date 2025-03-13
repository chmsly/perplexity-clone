import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json()
    const { query } = body

    console.log("Minimal search API called with:", { query })

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: "Query is required"
        },
        { status: 400 }
      )
    }

    // Create a simple response
    const response = {
      success: true,
      data: {
        query,
        timestamp: new Date().toISOString(),
        result: `This is a simple response to your query: ${query}`,
        id: nanoid()
      }
    }

    console.log("Sending response:", response)

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in minimal search API:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during search"
      },
      { status: 500 }
    )
  }
}
