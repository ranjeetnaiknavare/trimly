"use client"

import { useState } from "react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Coupon } from "@/types/coupon"
import { CouponForm } from "@/components/business/coupons/coupon-form"
import { CouponsList } from "@/components/business/coupons/coupons-list"
import { CouponAnalytics } from "@/components/business/coupons/coupon-analytics"

// Mock data for coupons
const mockCoupons: Coupon[] = [
  {
    id: "1",
    code: "WELCOME20",
    description: "20% off on your first visit",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 500,
    maxDiscount: 200,
    validFrom: "2023-05-01",
    validUntil: "2023-12-31",
    usageLimit: 100,
    usageCount: 45,
    salonId: "salon-1",
    status: "active",
    createdAt: "2023-05-01T10:00:00Z",
    updatedAt: "2023-05-01T10:00:00Z",
  },
  {
    id: "2",
    code: "HAIRCUT100",
    description: "₹100 off on haircut services",
    discountType: "fixed",
    discountValue: 100,
    minPurchase: 300,
    validFrom: "2023-06-01",
    validUntil: "2023-08-31",
    usageLimit: 50,
    usageCount: 12,
    salonId: "salon-1",
    status: "active",
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-01T10:00:00Z",
  },
  {
    id: "3",
    code: "SUMMER25",
    description: "25% off on all services for summer",
    discountType: "percentage",
    discountValue: 25,
    minPurchase: 800,
    maxDiscount: 500,
    validFrom: "2023-04-01",
    validUntil: "2023-06-30",
    usageLimit: 200,
    usageCount: 198,
    salonId: "salon-1",
    status: "expired",
    createdAt: "2023-04-01T10:00:00Z",
    updatedAt: "2023-04-01T10:00:00Z",
  },
]

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredCoupons = coupons.filter((coupon) => {
    if (activeTab === "active" && coupon.status !== "active") return false
    if (activeTab === "inactive" && coupon.status !== "inactive") return false
    if (activeTab === "expired" && coupon.status !== "expired") return false

    if (searchQuery) {
      return (
        coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return true
  })

  const handleCreateCoupon = (couponData: any) => {
    const newCoupon: Coupon = {
      id: `coupon-${Date.now()}`,
      ...couponData,
      usageCount: 0,
      salonId: "salon-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setCoupons([newCoupon, ...coupons])
    setIsCreateDialogOpen(false)
  }

  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <p className="text-gray-600">Create and manage promotional coupons for your salon</p>
      </div>

      <div className="mb-6">
        <CouponAnalytics />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search coupons..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-rose-600 hover:bg-rose-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Coupon
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Coupon</DialogTitle>
                <DialogDescription>
                  Create a new promotional coupon for your customers. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              <CouponForm onSubmit={handleCreateCoupon} onCancel={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Coupons</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <CouponsList coupons={filteredCoupons} />
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          <CouponsList coupons={filteredCoupons} />
        </TabsContent>
        <TabsContent value="inactive" className="mt-0">
          <CouponsList coupons={filteredCoupons} />
        </TabsContent>
        <TabsContent value="expired" className="mt-0">
          <CouponsList coupons={filteredCoupons} />
        </TabsContent>
      </Tabs>
    </BusinessDashboardLayout>
  )
}
