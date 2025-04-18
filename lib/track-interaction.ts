"use client"

/**
 * Tracks a user interaction with a business
 * @param businessId The ID of the business
 * @param interactionType The type of interaction (e.g., 'view', 'click', 'book')
 * @param metadata Additional data about the interaction
 */
export async function trackInteraction(
  businessId: string,
  interactionType: string,
  metadata: Record<string, any> = {},
) {
  try {
    const response = await fetch("/api/analytics/track-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        businessId,
        interactionType,
        timestamp: new Date().toISOString(),
        metadata,
      }),
    })

    if (!response.ok) {
      console.error("Failed to track interaction:", await response.text())
    }
  } catch (error) {
    console.error("Error tracking interaction:", error)
  }
}

/**
 * Tracks a phone call to a business
 * @param businessId The ID of the business
 */
export async function trackPhoneCall(businessId: string) {
  try {
    const response = await fetch("/api/analytics/track-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        businessId,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      console.error("Failed to track phone call:", await response.text())
    }
  } catch (error) {
    console.error("Error tracking phone call:", error)
  }
}

/**
 * Tracks when a user shares a business
 * @param businessId The ID of the business
 */
export async function trackShare(businessId: string) {
  try {
    const response = await fetch("/api/analytics/track-share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        businessId,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      console.error("Failed to track share:", await response.text())
    }
  } catch (error) {
    console.error("Error tracking share:", error)
  }
}
