/**
 * Tracks a user interaction
 * @param type The type of interaction (e.g., 'call', 'share')
 * @param data Additional data about the interaction
 */
export async function trackInteraction(type: string, data: Record<string, any>) {
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

    if (!response.ok) {
      console.error(`Error tracking ${type}:`, await response.text())
      return { success: false }
    }

    return await response.json()
  } catch (error) {
    console.error(`Error tracking ${type}:`, error)
    return { success: false }
  }
}
