"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tag, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CouponInputProps {
  onApply: (code: string, discount: number) => void
  onRemove: () => void
}

export function CouponInput({ onApply, onRemove }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discount: number
    type: "percentage" | "fixed"
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Mock function to validate coupon - in a real app, this would call an API
  const validateCoupon = async (code: string) => {
    // Simulate API call
    setIsApplying(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation logic
    if (code.toUpperCase() === "WELCOME20") {
      return {
        valid: true,
        discount: 20,
        type: "percentage" as const,
        message: "20% discount applied",
      }
    } else if (code.toUpperCase() === "HAIRCUT100") {
      return {
        valid: true,
        discount: 100,
        type: "fixed" as const,
        message: "₹100 discount applied",
      }
    } else {
      return {
        valid: false,
        message: "Invalid coupon code",
      }
    }
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code")
      return
    }

    setError(null)
    const result = await validateCoupon(couponCode)
    setIsApplying(false)

    if (result.valid) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: result.discount,
        type: result.type,
      })
      onApply(couponCode.toUpperCase(), result.discount)
    } else {
      setError(result.message)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    setError(null)
    onRemove()
  }

  return (
    <div className="space-y-3">
      {!appliedCoupon ? (
        <>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Enter coupon code"
                className="pl-9"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              />
            </div>
            <Button
              onClick={handleApplyCoupon}
              disabled={isApplying || !couponCode.trim()}
              className={cn("bg-rose-600 hover:bg-rose-700", isApplying && "opacity-70 cursor-not-allowed")}
            >
              {isApplying ? "Applying..." : "Apply"}
            </Button>
          </div>
          {error && (
            <div className="flex items-center text-red-500 text-sm">
              <XCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <p className="font-medium">{appliedCoupon.code}</p>
              <p className="text-sm text-green-700">
                {appliedCoupon.type === "percentage"
                  ? `${appliedCoupon.discount}% discount applied`
                  : `₹${appliedCoupon.discount} discount applied`}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemoveCoupon}>
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}
