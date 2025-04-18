"use client"

import { useEffect } from "react"
import { trackInteraction } from "@/lib/track-interaction"

interface InteractionTrackerProps {
  salonId: string
  salonName: string
  onInteraction?: (type: string, data: any) => void
}

export function InteractionTracker({ salonId, salonName }: InteractionTrackerProps) {
  useEffect(() => {
    // Set up event listeners for tracking
    const trackPhoneLinks = () => {
      const phoneLinks = document.querySelectorAll("[data-phone-link]")

      const handlePhoneClick = (e: Event) => {
        // Log the call interaction
        trackInteraction("call", {
          salonId,
          salonName,
          timestamp: new Date().toISOString(),
        })
      }

      phoneLinks.forEach((link) => {
        link.addEventListener("click", handlePhoneClick)
      })

      // Cleanup function
      return () => {
        phoneLinks.forEach((link) => {
          link.removeEventListener("click", handlePhoneClick)
        })
      }
    }

    const trackShareButtons = () => {
      const shareButtons = document.querySelectorAll("[data-share-button]")

      const handleShareClick = (e: Event) => {
        const target = e.currentTarget as HTMLElement
        const platform = target.dataset.sharePlatform || "unknown"

        // Log the share interaction
        trackInteraction("share", {
          salonId,
          salonName,
          platform,
          timestamp: new Date().toISOString(),
        })
      }

      shareButtons.forEach((button) => {
        button.addEventListener("click", handleShareClick)
      })

      // Cleanup function
      return () => {
        shareButtons.forEach((button) => {
          button.removeEventListener("click", handleShareClick)
        })
      }
    }

    // Initialize tracking
    const cleanupPhone = trackPhoneLinks()
    const cleanupShare = trackShareButtons()

    // Cleanup
    return () => {
      cleanupPhone()
      cleanupShare()
    }
  }, [salonId, salonName])

  return null // This component doesn't render anything
}
