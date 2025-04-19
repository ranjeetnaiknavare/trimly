"use client"

import { useState } from "react"
import { Share2, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AgentReferralModal() {
  const [referralCode, setReferralCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!referralCode) {
      setError("Please enter a referral code")
      return
    }

    setError("")
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if code is valid (in a real app, this would be a server check)
    if (referralCode === "TRA-583921" || referralCode.toUpperCase() === "TRIMLY") {
      setIsSuccess(true)
    } else {
      setError("Invalid referral code. Please check and try again.")
    }

    setIsSubmitting(false)
  }

  const resetForm = () => {
    setReferralCode("")
    setIsSuccess(false)
    setError("")
  }

  return (
    <Dialog onOpenChange={(open) => !open && resetForm()}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Add Agent Referral
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Agent Referral</DialogTitle>
          <DialogDescription>
            Connect with a Trimly agent who can help you maximize your business on our platform
          </DialogDescription>
        </DialogHeader>

        {!isSuccess ? (
          <>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 p-3 bg-blue-50 text-blue-800 rounded-md">
                <Users className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm">
                  Trimly agents provide personalized support to help you grow your business. Enter an agent's referral
                  code to connect.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralCode">Agent Referral Code</Label>
                <Input
                  id="referralCode"
                  placeholder="e.g., TRA-123456"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-rose-600 hover:bg-rose-700"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Connect with Agent"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Agent Connected Successfully!</h3>
            <p className="text-gray-600">
              You've been connected with agent Rahul Sharma (TRA-583921). They will reach out to you shortly to provide
              personalized assistance.
            </p>
            <Button className="bg-rose-600 hover:bg-rose-700 mt-4" onClick={() => resetForm()}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
