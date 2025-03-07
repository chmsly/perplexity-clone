import { testConnection } from "@/db/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const isConnected = await testConnection()

    if (isConnected) {
      return NextResponse.json({ status: "connected" })
    } else {
      return NextResponse.json({ status: "disconnected" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error testing database connection:", error)
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}
