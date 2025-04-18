"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { CouponFormData } from "@/types/coupon"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CouponFormProps {
  initialData?: Partial<CouponFormData>
  onSubmit: (data: CouponFormData) => void
  onCancel: () => void
}

export function CouponForm({ initialData, onSubmit, onCancel }: CouponFormProps) {
  const [formData, setFormData] = useState<Partial<CouponFormData>>(
    initialData || {
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 10,
      minPurchase: undefined,
      maxDiscount: undefined,
      validFrom: format(new Date(), "yyyy-MM-dd"),
      validUntil: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), "yyyy-MM-dd"),
      usageLimit: undefined,
      status: "active",
    },
  )

  const [validFromDate, setValidFromDate] = useState<Date | undefined>(
    formData.validFrom ? new Date(formData.validFrom) : new Date(),
  )

  const [validUntilDate, setValidUntilDate] = useState<Date | undefined>(
    formData.validUntil ? new Date(formData.validUntil) : new Date(new Date().setMonth(new Date().getMonth() + 1)),
  )

  const handleChange = (field: keyof CouponFormData, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData as CouponFormData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="code">Coupon Code*</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
            placeholder="e.g. SUMMER20"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status*</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange("status", value)} required>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="e.g. 20% off on all services"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="discountType">Discount Type*</Label>
          <Select
            value={formData.discountType}
            onValueChange={(value) => handleChange("discountType", value as "percentage" | "fixed")}
            required
          >
            <SelectTrigger id="discountType">
              <SelectValue placeholder="Select discount type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
              <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="discountValue">
            {formData.discountType === "percentage" ? "Discount Percentage*" : "Discount Amount (₹)*"}
          </Label>
          <Input
            id="discountValue"
            type="number"
            value={formData.discountValue || ""}
            onChange={(e) => handleChange("discountValue", Number(e.target.value))}
            placeholder={formData.discountType === "percentage" ? "e.g. 20" : "e.g. 100"}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minPurchase">Minimum Purchase (₹)</Label>
          <Input
            id="minPurchase"
            type="number"
            value={formData.minPurchase || ""}
            onChange={(e) => handleChange("minPurchase", e.target.value ? Number(e.target.value) : undefined)}
            placeholder="e.g. 500"
          />
        </div>
        {formData.discountType === "percentage" && (
          <div className="space-y-2">
            <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
            <Input
              id="maxDiscount"
              type="number"
              value={formData.maxDiscount || ""}
              onChange={(e) => handleChange("maxDiscount", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="e.g. 200"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Valid From*</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !validFromDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {validFromDate ? format(validFromDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={validFromDate}
                onSelect={(date) => {
                  setValidFromDate(date)
                  if (date) {
                    handleChange("validFrom", format(date, "yyyy-MM-dd"))
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>Valid Until*</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !validUntilDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {validUntilDate ? format(validUntilDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={validUntilDate}
                onSelect={(date) => {
                  setValidUntilDate(date)
                  if (date) {
                    handleChange("validUntil", format(date, "yyyy-MM-dd"))
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="usageLimit">Usage Limit</Label>
        <Input
          id="usageLimit"
          type="number"
          value={formData.usageLimit || ""}
          onChange={(e) => handleChange("usageLimit", e.target.value ? Number(e.target.value) : undefined)}
          placeholder="Leave blank for unlimited usage"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
          Save Coupon
        </Button>
      </div>
    </form>
  )
}
