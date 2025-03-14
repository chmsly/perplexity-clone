import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "API is working"
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    return NextResponse.json({
      message: "POST request received",
      body
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error parsing JSON body",
        error: error.message
      },
      { status: 400 }
    )
  }
}
