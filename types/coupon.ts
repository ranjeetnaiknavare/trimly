export interface Coupon {
  id: string
  code: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  minPurchase?: number
  maxDiscount?: number
  validFrom: string
  validUntil: string
  usageLimit?: number
  usageCount: number
  salonId: string
  status: "active" | "inactive" | "expired"
  createdAt: string
  updatedAt: string
}

export interface CouponFormData {
  code: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  minPurchase?: number
  maxDiscount?: number
  validFrom: string
  validUntil: string
  usageLimit?: number
  status: "active" | "inactive"
}
