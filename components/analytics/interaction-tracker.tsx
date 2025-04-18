"use client"

import { useEffect, useCallback } from "react"
import { trackInteraction } from "@/lib/track-interaction"

interface InteractionTrackerProps {
  salonId: string
  salonName: string
}

export function InteractionTracker({ salonId, salonName }: InteractionTrackerProps) {
  // Track page view on component mount
  useEffect(() => {
    trackInteraction({
      type: "page_view",
      salonId,
      salonName,
      metadata: {
        path: window.location.pathname,
        referrer: document.referrer,
      },
    })
  }, [salonId, salonName])

  // Use useCallback instead of useEffectEvent for tracking phone calls
  const trackPhoneCall = useCallback(
    (phoneNumber: string) => {
      trackInteraction({
        type: "phone_call",
        salonId,
        salonName,
        metadata: {
          phoneNumber,
        },
      })
    },
    [salonId, salonName],
  )

  // Use useCallback instead of useEffectEvent for tracking shares
  const trackShare = useCallback(
    (platform: string) => {
      trackInteraction({
        type: "share",
        salonId,
        salonName,
        metadata: {
          platform,
        },
      })
    },
    [salonId, salonName],
  )

  // Set up event listeners for phone calls and shares
  useEffect(() => {
    const phoneLinks = document.querySelectorAll("[data-phone-link]")
    const shareButtons = document.querySelectorAll("[data-share-button]")

    const handlePhoneClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement
      const phoneNumber = link.href.replace("tel:", "")
      trackPhoneCall(phoneNumber)
    }

    const handleShareClick = (e: Event) => {
      const button = e.currentTarget as HTMLButtonElement
      const platform = button.dataset.sharePlatform || "unknown"
      trackShare(platform)
    }

    phoneLinks.forEach((link) => {
      link.addEventListener("click", handlePhoneClick)
    })

    shareButtons.forEach((button) => {
      button.addEventListener("click", handleShareClick)
    })

    return () => {
      phoneLinks.forEach((link) => {
        link.removeEventListener("click", handlePhoneClick)
      })
      shareButtons.forEach((button) => {
        button.removeEventListener("click", handleShareClick)
      })
    }
  }, [trackPhoneCall, trackShare])

  return null
}
