export async function trackInteraction(type: "call" | "share", data: any) {
  try {
    const response = await fetch("/api/analytics/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        ...data,
        timestamp: new Date().toISOString(),
      }),
    })

    return await response.json()
  } catch (error) {
    console.error(`Error tracking ${type}:`, error)
    return { success: false }
  }
}
