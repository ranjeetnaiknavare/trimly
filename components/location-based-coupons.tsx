"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Coupon {
  id: string
  code: string
  discount: string
  description: string
  validUntil: string
  location: string
  minSpend?: number
  maxDiscount?: number
}

interface LocationBasedCouponsProps {
  currentLocation?: string
}

export function LocationBasedCoupons({ currentLocation = "Kothrud, Pune" }: LocationBasedCouponsProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch coupons based on location
    const fetchCoupons = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data - in a real app, this would come from the API
      const mockCoupons: Coupon[] = [
        {
          id: "c1",
          code: "KOTHRUD20",
          discount: "20% OFF",
          description: "20% off on all services at salons in Kothrud",
          validUntil: "2023-12-31",
          location: "Kothrud, Pune",
          minSpend: 500,
        },
        {
          id: "c2",
          code: "KOTHRUDSPA15",
          discount: "15% OFF",
          description: "15% off on spa services in Kothrud area",
          validUntil: "2023-11-30",
          location: "Kothrud, Pune",
          maxDiscount: 300,
        },
      ]

      // Filter coupons based on location
      const filteredCoupons = mockCoupons.filter((coupon) => coupon.location.includes(currentLocation.split(",")[0]))

      setCoupons(filteredCoupons)
      setLoading(false)
    }

    fetchCoupons()
  }, [currentLocation])

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="h-24 bg-gray-100 animate-pulse rounded-lg"></div>
        <div className="h-24 bg-gray-100 animate-pulse rounded-lg"></div>
      </div>
    )
  }

  if (coupons.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground">No coupons available for your location</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {coupons.map((coupon) => (
        <Card key={coupon.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex">
              <div className="bg-rose-100 flex items-center justify-center p-4 w-24">
                <div className="text-center">
                  <div className="text-rose-600 font-bold text-lg">{coupon.discount}</div>
                  <div className="text-xs text-rose-500">Use code:</div>
                  <div className="text-rose-600 font-mono font-medium text-sm">{coupon.code}</div>
                </div>
              </div>
              <div className="p-3 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{coupon.description}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{coupon.location}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    Local
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-500">
                    {coupon.minSpend && <span>Min spend: ₹{coupon.minSpend} • </span>}
                    {coupon.maxDiscount && <span>Max discount: ₹{coupon.maxDiscount} • </span>}
                    <span>Valid until: {new Date(coupon.validUntil).toLocaleDateString()}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-rose-600">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
