"use client"

import { useEffect } from "react"

interface InteractionTrackerProps {
  salonId: string
  salonName: string
  onInteraction?: (type: string, data: any) => void
}

export function InteractionTracker({ salonId, salonName, onInteraction }: InteractionTrackerProps) {
  // This component doesn't render anything visible
  // It just attaches event listeners to track interactions

  useEffect(() => {
    // Find all phone links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]')

    // Track phone calls
    const handlePhoneClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement
      const phoneNumber = target.href.replace("tel:", "")

      // Log the call interaction
      console.log(`Call tracked: ${phoneNumber} for salon ${salonName}`)

      // Send to analytics endpoint (would be implemented in a real app)
      if (onInteraction) {
        onInteraction("call", {
          salonId,
          salonName,
          phoneNumber,
          timestamp: new Date().toISOString(),
        })
      }

      // In a real implementation, this would make an API call to record the interaction
      fetch("/api/analytics/track-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salonId,
          phoneNumber,
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error("Failed to track call:", err))
    }

    // Attach event listeners to phone links
    phoneLinks.forEach((link) => {
      link.addEventListener("click", handlePhoneClick as EventListener)
    })

    // Find share buttons (this depends on your implementation)
    const shareButtons = document.querySelectorAll("[data-share-button]")

    // Track shares
    const handleShareClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const shareMethod = target.getAttribute("data-share-method") || "unknown"

      // Log the share interaction
      console.log(`Share tracked: ${shareMethod} for salon ${salonName}`)

      // Send to analytics endpoint
      if (onInteraction) {
        onInteraction("share", {
          salonId,
          salonName,
          shareMethod,
          timestamp: new Date().toISOString(),
        })
      }

      // In a real implementation, this would make an API call to record the interaction
      fetch("/api/analytics/track-share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salonId,
          shareMethod,
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error("Failed to track share:", err))
    }

    // Attach event listeners to share buttons
    shareButtons.forEach((button) => {
      button.addEventListener("click", handleShareClick as EventListener)
    })

    // Cleanup event listeners
    return () => {
      phoneLinks.forEach((link) => {
        link.removeEventListener("click", handlePhoneClick as EventListener)
      })
      shareButtons.forEach((button) => {
        button.removeEventListener("click", handleShareClick as EventListener)
      })
    }
  }, [salonId, salonName, onInteraction])

  return null
}
