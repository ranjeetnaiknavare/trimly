"use client"

import { useState } from "react"
import { Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SalonActionsProps {
  salonId: string
  salonName: string
  initialFavorite?: boolean
}

export function SalonActions({ salonId, salonName, initialFavorite = false }: SalonActionsProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const toggleFavorite = () => {
    // In a real app, this would update the favorite status in the database
    setIsFavorite(!isFavorite)
  }

  const handleShare = (method: "whatsapp" | "copy") => {
    const salonSlug = salonName.toLowerCase().replace(/\s+/g, "-")
    const shareUrl = `https://trimly.app/salon/${salonSlug}`

    // Track the share interaction
    trackShareInteraction(method, salonId, salonName)

    if (method === "whatsapp") {
      const whatsappUrl = `https://wa.me/?text=Check out ${salonName} on Trimly: ${shareUrl}`
      window.open(whatsappUrl, "_blank")
    } else if (method === "copy") {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
    }
  }

  // Function to track share interactions
  const trackShareInteraction = (method: string, salonId: string, salonName: string) => {
    // In a real implementation, this would make an API call to record the interaction
    fetch("/api/analytics/track-share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        salonId,
        salonName,
        shareMethod: method,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.error("Failed to track share:", err))
  }

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          className={`rounded-full ${isFavorite ? "bg-rose-100" : "bg-white/80 backdrop-blur-sm"}`}
          onClick={toggleFavorite}
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? "text-rose-600" : ""}`}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-white/80 backdrop-blur-sm"
          onClick={() => setShareDialogOpen(true)}
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share {salonName}</DialogTitle>
            <DialogDescription>Choose how you'd like to share this salon with others</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
              onClick={() => handleShare("whatsapp")}
              data-share-button
              data-share-method="whatsapp"
            >
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mb-2">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span>WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
              onClick={() => handleShare("copy")}
              data-share-button
              data-share-method="copy"
            >
              <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
