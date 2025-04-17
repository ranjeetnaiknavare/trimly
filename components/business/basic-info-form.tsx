"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface BusinessBasicInfoFormProps {
  formData: {
    businessName: string
    businessType: string
    businessEmail: string
    businessPhone: string
    description: string
  }
  updateFormData: (data: Partial<BusinessBasicInfoFormProps["formData"]>) => void
}

export function BusinessBasicInfoForm({ formData, updateFormData }: BusinessBasicInfoFormProps) {
  const businessTypes = [
    { value: "mens_salon", label: "Men's Salon" },
    { value: "ladies_parlour", label: "Ladies Parlour" },
    { value: "unisex_salon", label: "Unisex Salon" },
    { value: "spa", label: "Spa & Massage" },
    { value: "hair_studio", label: "Hair Studio" },
    { value: "beauty_lounge", label: "Beauty Lounge" },
    { value: "nail_salon", label: "Nail Salon" },
    { value: "barber_shop", label: "Barber Shop" },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name *</Label>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => updateFormData({ businessName: e.target.value })}
          placeholder="e.g. Royal Gents Salon"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessType">Business Type *</Label>
        <Select value={formData.businessType} onValueChange={(value) => updateFormData({ businessType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            {businessTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessPhone">
          Business Phone * <span className="text-xs text-rose-600">(Primary contact for login)</span>
        </Label>
        <Input
          id="businessPhone"
          type="tel"
          value={formData.businessPhone}
          onChange={(e) => updateFormData({ businessPhone: e.target.value })}
          placeholder="e.g. +91 98765 43210"
          required
        />
        <p className="text-xs text-gray-500">We'll send an OTP to verify this number</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessEmail">
          Business Email <span className="text-xs text-gray-500">(Optional)</span>
        </Label>
        <Input
          id="businessEmail"
          type="email"
          value={formData.businessEmail}
          onChange={(e) => updateFormData({ businessEmail: e.target.value })}
          placeholder="e.g. contact@yoursalon.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Business Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Tell customers about your business, specialties, experience, etc."
          rows={4}
        />
      </div>
    </div>
  )
}
