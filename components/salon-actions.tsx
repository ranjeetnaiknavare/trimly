"use client"

import { useState, useCallback } from "react"
import { Phone, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { trackPhoneCall, trackShare } from "@/lib/track-interaction"

interface SalonActionsProps {
  salonId: string
  salonName: string
  phoneNumber: string
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

export function SalonActions({
  salonId,
  salonName,
  phoneNumber,
  isFavorite = false,
  onToggleFavorite,
}: SalonActionsProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  // Use useCallback instead of useEffectEvent
  const handlePhoneClick = useCallback(() => {
    trackPhoneCall(salonId)
    window.location.href = `tel:${phoneNumber}`
  }, [salonId, phoneNumber])

  // Use useCallback instead of useEffectEvent
  const handleShareClick = useCallback(() => {
    setShareUrl(window.location.href)
    setIsShareDialogOpen(true)
    trackShare(salonId)
  }, [salonId])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" size="sm" onClick={handlePhoneClick}>
        <Phone className="h-4 w-4 mr-2" />
        Call
      </Button>
      <Button variant="outline" size="sm" onClick={handleShareClick}>
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleFavorite}
        className={isFavorite ? "text-rose-600 border-rose-200 hover:bg-rose-50" : ""}
      >
        <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-rose-600" : ""}`} />
        {isFavorite ? "Saved" : "Save"}
      </Button>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share {salonName}</DialogTitle>
            <DialogDescription>Copy the link below to share this salon with others.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="share-url">Share URL</Label>
              <div className="flex gap-2">
                <Input id="share-url" value={shareUrl} readOnly />
                <Button onClick={handleCopyLink}>Copy</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
