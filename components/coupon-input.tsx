"use client"

import { useState } from "react"
import { Check, X, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { LocationBasedCoupons } from "@/components/location-based-coupons"

interface CouponInputProps {
  onApply: (code: string, discount: number) => void
  onRemove: () => void
  appliedCoupon: {
    code: string
    discount: number
  } | null
  salonLocation?: string
}

export function CouponInput({ onApply, onRemove, appliedCoupon, salonLocation = "Kothrud, Pune" }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState("")
  const [showLocationCoupons, setShowLocationCoupons] = useState(false)

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code")
      return
    }

    setIsValidating(true)
    setError("")

    // Simulate API call to validate coupon
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation logic
    if (couponCode.toUpperCase() === "TRIMLY20") {
      onApply(couponCode.toUpperCase(), 20)
      setIsValidating(false)
    } else if (couponCode.toUpperCase() === "WELCOME10") {
      onApply(couponCode.toUpperCase(), 10)
      setIsValidating(false)
    } else if (couponCode.toUpperCase() === "KOTHRUD20" && salonLocation.includes("Kothrud")) {
      onApply(couponCode.toUpperCase(), 20)
      setIsValidating(false)
    } else {
      setError("Invalid or expired coupon code")
      setIsValidating(false)
    }
  }

  const handleLocationCoupon = (code: string) => {
    setCouponCode(code)
    setShowLocationCoupons(false)
    // Auto-apply the selected coupon
    setTimeout(() => {
      if (code === "KOTHRUD20") {
        onApply(code, 20)
      } else if (code === "KOTHRUDSPA15") {
        onApply(code, 15)
      }
    }, 100)
  }

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
        <div className="flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <div>
            <p className="font-medium text-green-700">{appliedCoupon.code}</p>
            <p className="text-xs text-green-600">{appliedCoupon.discount}% discount applied</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove} className="h-8 text-gray-500 hover:text-red-500">
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <div className="relative flex-1">
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="pr-8"
          />
          {couponCode && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setCouponCode("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button onClick={handleApplyCoupon} disabled={isValidating} className="whitespace-nowrap">
          {isValidating ? "Validating..." : "Apply"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <Button
        variant="ghost"
        size="sm"
        className="text-rose-600 p-0 h-auto flex items-center mt-2"
        onClick={() => setShowLocationCoupons(!showLocationCoupons)}
      >
        <Tag className="h-4 w-4 mr-1" />
        {showLocationCoupons ? "Hide location offers" : "See available offers for this location"}
      </Button>

      {showLocationCoupons && (
        <Card className="mt-3">
          <CardContent className="p-3">
            <p className="text-sm font-medium mb-2">Available offers for {salonLocation}</p>
            <LocationBasedCoupons currentLocation={salonLocation} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
