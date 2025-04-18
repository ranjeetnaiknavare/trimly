"use client"

import React, { useState } from "react"
import { Heart, Share2, MessageSquare, Facebook, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { trackInteraction } from "@/lib/track-interaction"

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

  const handleSharePlatform = (platform: string) => {
    const salonSlug = salonName.toLowerCase().replace(/\s+/g, "-")
    const shareUrl = `https://trimly.app/salon/${salonSlug}`

    // Track the share interaction
    trackInteraction("share", {
      salonId,
      salonName,
      platform,
      timestamp: new Date().toISOString(),
    })

    let shareLink = ""

    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=Check out ${salonName} on Trimly: ${shareUrl}`
        break
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=Check out ${salonName} on Trimly: ${shareUrl}`
        break
      case "email":
        shareLink = `mailto:?subject=Check out ${salonName} on Trimly&body=${shareUrl}`
        break
      case "copy":
        navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        return
      default:
        console.warn(`Unsupported share platform: ${platform}`)
        return
    }

    window.open(shareLink, "_blank")
    setShareDialogOpen(false)
  }

  const shareOptions = [
    { platform: "whatsapp", icon: <MessageSquare className="h-4 w-4" />, label: "WhatsApp" },
    { platform: "facebook", icon: <Facebook className="h-4 w-4" />, label: "Facebook" },
    { platform: "twitter", icon: <Twitter className="h-4 w-4" />, label: "Twitter" },
    { platform: "email", icon: <Mail className="h-4 w-4" />, label: "Email" },
  ]

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
          data-share-button
          data-share-platform="dialog"
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
            {shareOptions.map((option) => (
              <Button
                key={option.platform}
                variant="outline"
                className="flex flex-col items-center justify-center h-24"
                onClick={() => handleSharePlatform(option.platform)}
                data-share-button
                data-share-platform={option.platform}
              >
                <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center mb-2">
                  {React.cloneElement(option.icon, { className: "h-6 w-6 text-white" })}
                </div>
                <span>{option.label}</span>
              </Button>
            ))}
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
              onClick={() => handleSharePlatform("copy")}
              data-share-button
              data-share-platform="copy"
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
