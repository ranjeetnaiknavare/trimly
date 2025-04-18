import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // In a real app, this would save to a database
    console.log("Call tracked:", data)

    // For now, just log and return success
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking call:", error)
    return NextResponse.json({ success: false, error: "Failed to track call" }, { status: 500 })
  }
}
