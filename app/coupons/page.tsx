"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CustomerCoupons } from "@/components/customer-coupons"
import { useRouter } from "next/navigation"

export default function CustomerCouponsPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center h-16 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">My Coupons</h1>
          </div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <p className="text-gray-600 mb-4">
          Use these coupons to get discounts on your next salon visit. Just show the coupon code at the salon.
        </p>
        <CustomerCoupons />
      </main>
    </div>
  )
}
