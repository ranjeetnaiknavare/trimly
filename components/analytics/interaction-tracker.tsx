"use client"

import { useEffect } from "react"

interface InteractionTrackerProps {
  salonId: string
  salonName: string
  onInteraction?: (type: string, data: any) => void
}

export function InteractionTracker({ salonId, salonName }: { salonId: string; salonName: string }) {
  useEffect(() => {
    // Set up event listeners for tracking
    const trackCall = () => {
      const phoneLinks = document.querySelectorAll("[data-phone-link]")

      phoneLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          // Log the call interaction
          fetch("/api/analytics/track-call", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              salonId,
              salonName,
              timestamp: new Date().toISOString(),
              // In a real app, we might include user info if available
            }),
          }).catch((err) => console.error("Failed to track call:", err))
        })
      })
    }

    const trackShare = () => {
      const shareButtons = document.querySelectorAll("[data-share-button]")

      shareButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          // Get the platform from the data attribute
          const platform = (e.currentTarget as HTMLElement).dataset.sharePlatform || "unknown"

          // Log the share interaction
          fetch("/api/analytics/track-share", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              salonId,
              salonName,
              platform,
              timestamp: new Date().toISOString(),
              // In a real app, we might include user info if available
            }),
          }).catch((err) => console.error("Failed to track share:", err))
        })
      })
    }

    // Initialize tracking
    trackCall()
    trackShare()

    // Cleanup
    return () => {
      // In a real implementation, we would remove event listeners
    }
  }, [salonId, salonName])

  return null // This component doesn't render anything
}
