"use client"

import { useCallback, useEffect } from "react"
import { trackInteraction } from "@/lib/track-interaction"

interface InteractionTrackerProps {
  businessId: string
  interactionType: string
  metadata?: Record<string, any>
}

export function InteractionTracker({ businessId, interactionType, metadata = {} }: InteractionTrackerProps) {
  // Use useCallback instead of useEffectEvent
  const trackEvent = useCallback(() => {
    trackInteraction(businessId, interactionType, metadata)
  }, [businessId, interactionType, metadata])

  useEffect(() => {
    trackEvent()
  }, [trackEvent])

  return null
}
