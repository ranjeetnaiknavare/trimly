import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // In a real app, this would store the data in a database
    console.log("Call tracked:", data)

    // For demo purposes, we're just returning success
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to track call" }, { status: 500 })
  }
}
