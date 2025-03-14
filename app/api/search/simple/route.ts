import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json()
    const { query } = body

    console.log("Simple search API called with:", { query })

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: "Query is required"
        },
        { status: 400 }
      )
    }

    // Create a simple response without calling any external APIs
    const response = {
      success: true,
      data: {
        query,
        result: `This is a simple response to your query: ${query}. The search functionality is currently experiencing database connection issues.`,
        timestamp: new Date().toISOString()
      }
    }

    console.log("Simple response created")
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in simple search API:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during search"
      },
      { status: 500 }
    )
  }
}
