"use client"

import { useState } from "react"
import { Share2, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AgentReferralBannerProps {
  onApply?: (code: string) => void
}

export function AgentReferralBanner({ onApply }: AgentReferralBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [referralCode, setReferralCode] = useState("")
  const [isApplied, setIsApplied] = useState(false)

  const handleApply = () => {
    if (referralCode && onApply) {
      onApply(referralCode)
      setIsApplied(true)
    }
  }

  if (!isVisible) return null

  return (
    <Card className="mb-6 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-100">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-rose-100 p-2 rounded-full">
              <Share2 className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Have an agent referral code?</h3>
              <p className="text-sm text-gray-600 mt-1">
                If you were referred by a Trimly agent, enter their code to get personalized onboarding assistance
              </p>

              {!isApplied ? (
                <div className="flex gap-2 mt-3">
                  <Input
                    placeholder="Enter referral code"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="max-w-xs bg-white"
                  />
                  <Button onClick={handleApply} className="bg-rose-600 hover:bg-rose-700" disabled={!referralCode}>
                    Apply
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-3 bg-green-50 text-green-800 px-3 py-2 rounded-md">
                  <span>✓</span>
                  <span>Referral code applied successfully!</span>
                </div>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
