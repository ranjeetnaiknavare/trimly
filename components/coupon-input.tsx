"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CouponInputProps {
  onApplyCoupon: (coupon: { code: string; discount: number; type: "percentage" | "fixed" }) => void
}

export function CouponInput({ onApplyCoupon }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discount: number
    type: "percentage" | "fixed"
  } | null>(null)

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code")
      return
    }

    setIsApplying(true)
    setError(null)

    // Simulate API call to validate coupon
    setTimeout(() => {
      // Mock coupon validation
      if (couponCode.toLowerCase() === "welcome10") {
        const coupon = { code: couponCode, discount: 10, type: "percentage" as const }
        setAppliedCoupon(coupon)
        onApplyCoupon(coupon)
      } else if (couponCode.toLowerCase() === "flat100") {
        const coupon = { code: couponCode, discount: 100, type: "fixed" as const }
        setAppliedCoupon(coupon)
        onApplyCoupon(coupon)
      } else {
        setError("Invalid or expired coupon code")
      }
      setIsApplying(false)
    }, 1000)
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    onApplyCoupon({ code: "", discount: 0, type: "fixed" })
  }

  return (
    <div>
      <h3 className="font-medium mb-3">Apply Coupon</h3>
      {!appliedCoupon ? (
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleApplyCoupon}
              disabled={isApplying || !couponCode.trim()}
              className={isApplying ? "opacity-70" : ""}
            >
              {isApplying ? "Applying..." : "Apply"}
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <p className="text-xs text-gray-500">Try coupon codes: WELCOME10 for 10% off or FLAT100 for ₹100 off</p>
        </div>
      ) : (
        <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <div className="bg-green-100 p-1 rounded-full">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">{appliedCoupon.code}</p>
              <p className="text-xs text-gray-600">
                {appliedCoupon.type === "percentage"
                  ? `${appliedCoupon.discount}% off`
                  : `₹${appliedCoupon.discount} off`}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Remove coupon</span>
          </Button>
        </div>
      )}
    </div>
  )
}
