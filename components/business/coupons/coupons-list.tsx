"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tag, Percent, Calendar, CheckCircle2, XCircle, MoreHorizontal, Copy, Edit, Trash2, Eye } from "lucide-react"
import type { Coupon } from "@/types/coupon"
import { CouponForm } from "./coupon-form"
import { format, parseISO } from "date-fns"

interface CouponsListProps {
  coupons: Coupon[]
}

export function CouponsList({ coupons }: CouponsListProps) {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>
      default:
        return null
    }
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // You could add a toast notification here
  }

  const handleEditCoupon = (couponData: any) => {
    // In a real app, this would update the coupon in the database
    console.log("Editing coupon:", couponData)
    setIsEditDialogOpen(false)
  }

  if (coupons.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Tag className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No coupons found</h3>
          <p className="text-gray-500 text-center mt-1">
            Create your first coupon to start offering discounts to your customers.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {coupons.map((coupon) => (
        <Card key={coupon.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="bg-gray-50 p-4 md:w-64 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-lg font-bold">{coupon.code}</h3>
                    {getStatusBadge(coupon.status)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 md:mt-0"
                  onClick={() => handleCopyCode(coupon.code)}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy Code
                </Button>
              </div>
              <div className="flex-1 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center text-sm text-gray-500">
                      {coupon.discountType === "percentage" ? (
                        <Percent className="h-3.5 w-3.5 mr-1" />
                      ) : (
                        <Tag className="h-3.5 w-3.5 mr-1" />
                      )}
                      <span>Discount</span>
                    </div>
                    <p className="font-medium">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}% off`
                        : `₹${coupon.discountValue} off`}
                    </p>
                    {coupon.minPurchase && (
                      <p className="text-xs text-gray-500">Min. purchase: ₹{coupon.minPurchase}</p>
                    )}
                    {coupon.maxDiscount && <p className="text-xs text-gray-500">Max discount: ₹{coupon.maxDiscount}</p>}
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Validity</span>
                    </div>
                    <p className="font-medium">
                      {format(parseISO(coupon.validFrom), "dd MMM yyyy")} -{" "}
                      {format(parseISO(coupon.validUntil), "dd MMM yyyy")}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-500">
                      {coupon.usageCount < (coupon.usageLimit || Number.POSITIVE_INFINITY) ? (
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-500" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 mr-1 text-red-500" />
                      )}
                      <span>Usage</span>
                    </div>
                    <p className="font-medium">
                      {coupon.usageCount} {coupon.usageLimit ? `/ ${coupon.usageLimit}` : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-start justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedCoupon(coupon)
                        setIsViewDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyCode(coupon.code)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedCoupon(coupon)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* View Coupon Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Coupon Details</DialogTitle>
            <DialogDescription>Detailed information about the coupon.</DialogDescription>
          </DialogHeader>
          {selectedCoupon && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Coupon Code</h4>
                  <p className="font-mono font-bold">{selectedCoupon.code}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <div>{getStatusBadge(selectedCoupon.status)}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                <p>{selectedCoupon.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Discount</h4>
                  <p>
                    {selectedCoupon.discountType === "percentage"
                      ? `${selectedCoupon.discountValue}% off`
                      : `₹${selectedCoupon.discountValue} off`}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Minimum Purchase</h4>
                  <p>{selectedCoupon.minPurchase ? `₹${selectedCoupon.minPurchase}` : "None"}</p>
                </div>
              </div>

              {selectedCoupon.discountType === "percentage" && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Maximum Discount</h4>
                  <p>{selectedCoupon.maxDiscount ? `₹${selectedCoupon.maxDiscount}` : "No limit"}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Valid From</h4>
                  <p>{format(parseISO(selectedCoupon.validFrom), "PPP")}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Valid Until</h4>
                  <p>{format(parseISO(selectedCoupon.validUntil), "PPP")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Usage Limit</h4>
                  <p>{selectedCoupon.usageLimit || "Unlimited"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Current Usage</h4>
                  <p>{selectedCoupon.usageCount}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Coupon Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
            <DialogDescription>Make changes to the coupon details.</DialogDescription>
          </DialogHeader>
          {selectedCoupon && (
            <CouponForm
              initialData={{
                code: selectedCoupon.code,
                description: selectedCoupon.description,
                discountType: selectedCoupon.discountType,
                discountValue: selectedCoupon.discountValue,
                minPurchase: selectedCoupon.minPurchase,
                maxDiscount: selectedCoupon.maxDiscount,
                validFrom: selectedCoupon.validFrom,
                validUntil: selectedCoupon.validUntil,
                usageLimit: selectedCoupon.usageLimit,
                status: selectedCoupon.status as "active" | "inactive",
              }}
              onSubmit={handleEditCoupon}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
