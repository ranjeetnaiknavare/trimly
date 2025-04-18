import { Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BookingCouponDetailsProps {
  coupon: {
    code: string
    discountType: "percentage" | "fixed"
    discountValue: number
    discountAmount: number
  } | null
}

export function BookingCouponDetails({ coupon }: BookingCouponDetailsProps) {
  if (!coupon) return null

  return (
    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
      <div className="flex items-center">
        <Tag className="h-4 w-4 text-green-600 mr-2" />
        <div>
          <div className="flex items-center">
            <Badge variant="outline" className="font-mono mr-2">
              {coupon.code}
            </Badge>
            <span className="text-sm text-green-700">
              {coupon.discountType === "percentage" ? `${coupon.discountValue}% off` : `₹${coupon.discountValue} off`}
            </span>
          </div>
          <p className="text-xs text-green-600 mt-0.5">Discount applied: ₹{coupon.discountAmount}</p>
        </div>
      </div>
    </div>
  )
}
