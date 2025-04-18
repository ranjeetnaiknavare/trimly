"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tag, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ApplyCouponDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookingAmount: number
  onApplyCoupon: (code: string, discountAmount: number) => void
}

export function ApplyCouponDialog({ open, onOpenChange, bookingAmount, onApplyCoupon }: ApplyCouponDialogProps) {
  const [couponCode, setCouponCode] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    valid: boolean
    message: string
    discountAmount?: number
    discountType?: "percentage" | "fixed"
    discountValue?: number
  } | null>(null)

  // Mock function to validate coupon - in a real app, this would call an API
  const validateCoupon = async (code: string) => {
    setIsValidating(true)
    setValidationResult(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation logic
    if (code.toUpperCase() === "WELCOME20") {
      const discountValue = 20
      const discountAmount = Math.round((bookingAmount * discountValue) / 100)
      setValidationResult({
        valid: true,
        message: `${discountValue}% discount applied`,
        discountAmount,
        discountType: "percentage",
        discountValue,
      })
    } else if (code.toUpperCase() === "HAIRCUT100") {
      const discountValue = 100
      const discountAmount = Math.min(discountValue, bookingAmount)
      setValidationResult({
        valid: true,
        message: `₹${discountValue} discount applied`,
        discountAmount,
        discountType: "fixed",
        discountValue,
      })
    } else if (code.toUpperCase() === "SUMMER25") {
      const discountValue = 25
      const discountAmount = Math.min(Math.round((bookingAmount * discountValue) / 100), 500)
      setValidationResult({
        valid: true,
        message: `${discountValue}% discount applied (max ₹500)`,
        discountAmount,
        discountType: "percentage",
        discountValue,
      })
    } else {
      setValidationResult({
        valid: false,
        message: "Invalid coupon code or coupon cannot be applied to this booking",
      })
    }

    setIsValidating(false)
  }

  const handleValidate = () => {
    if (!couponCode.trim()) return
    validateCoupon(couponCode.trim())
  }

  const handleApply = () => {
    if (validationResult?.valid && validationResult.discountAmount) {
      onApplyCoupon(couponCode.toUpperCase(), validationResult.discountAmount)
      onOpenChange(false)
    }
  }

  const handleReset = () => {
    setCouponCode("")
    setValidationResult(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply Coupon</DialogTitle>
          <DialogDescription>Enter a valid coupon code to apply discount to this booking.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
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
              onClick={handleValidate}
              disabled={isValidating || !couponCode.trim()}
              className="bg-rose-600 hover:bg-rose-700"
            >
              {isValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validating
                </>
              ) : (
                "Validate"
              )}
            </Button>
          </div>

          {validationResult && (
            <Alert className={validationResult.valid ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
              <AlertDescription className="flex items-center">
                {validationResult.valid ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                )}
                {validationResult.message}
              </AlertDescription>
            </Alert>
          )}

          {validationResult?.valid && (
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between text-sm">
                <span>Booking Amount:</span>
                <span>₹{bookingAmount}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 mt-1">
                <span>Discount:</span>
                <span>-₹{validationResult.discountAmount}</span>
              </div>
              <div className="flex justify-between font-medium mt-1 pt-1 border-t border-gray-200">
                <span>Final Amount:</span>
                <span>₹{bookingAmount - (validationResult.discountAmount || 0)}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleApply} disabled={!validationResult?.valid} className="bg-rose-600 hover:bg-rose-700">
            Apply Coupon
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
