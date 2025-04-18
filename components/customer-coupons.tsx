"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tag, Copy, Calendar, CheckCircle } from "lucide-react"
import { format, parseISO } from "date-fns"

// Mock data for customer coupons
const mockCustomerCoupons = [
  {
    id: "1",
    code: "WELCOME20",
    description: "20% off on your first visit",
    discountType: "percentage",
    discountValue: 20,
    maxDiscount: 200,
    validUntil: "2023-12-31",
    salonName: "Royal Gents Salon",
  },
  {
    id: "2",
    code: "HAIRCUT100",
    description: "₹100 off on haircut services",
    discountType: "fixed",
    discountValue: 100,
    validUntil: "2023-08-31",
    salonName: "Elegance Beauty Parlour",
  },
  {
    id: "3",
    code: "SUMMER25",
    description: "25% off on all services for summer",
    discountType: "percentage",
    discountValue: 25,
    maxDiscount: 500,
    validUntil: "2023-09-30",
    salonName: "Trendy Cuts",
  },
]

export function CustomerCoupons() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  if (mockCustomerCoupons.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Tag className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No coupons available</h3>
          <p className="text-gray-500 text-center mt-1">
            You don't have any coupons available at the moment. Check back later!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {mockCustomerCoupons.map((coupon) => (
        <Card key={coupon.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col">
              <div className="bg-rose-50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-lg font-bold">{coupon.code}</h3>
                  <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100">
                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}% OFF`
                      : `₹${coupon.discountValue} OFF`}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Valid until {format(parseISO(coupon.validUntil), "dd MMM yyyy")}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-sm mb-2">
                  <span className="text-gray-500">For:</span>
                  <span className="font-medium ml-1">{coupon.salonName}</span>
                </div>
                {coupon.maxDiscount && <p className="text-xs text-gray-500">Maximum discount: ₹{coupon.maxDiscount}</p>}
                <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => handleCopyCode(coupon.code)}>
                  {copiedCode === coupon.code ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
