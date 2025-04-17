"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface BusinessLocationFormProps {
  formData: {
    address: string
    city: string
    state: string
    pincode: string
    landmark: string
  }
  updateFormData: (data: Partial<BusinessLocationFormProps["formData"]>) => void
}

export function BusinessLocationForm({ formData, updateFormData }: BusinessLocationFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address">Street Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
          placeholder="e.g. Shop 7, Mayur Complex, Main Road"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            placeholder="e.g. Pune"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => updateFormData({ state: e.target.value })}
            placeholder="e.g. Maharashtra"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pincode">PIN Code *</Label>
        <Input
          id="pincode"
          value={formData.pincode}
          onChange={(e) => updateFormData({ pincode: e.target.value })}
          placeholder="e.g. 411038"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="landmark">Landmark (Optional)</Label>
        <Input
          id="landmark"
          value={formData.landmark}
          onChange={(e) => updateFormData({ landmark: e.target.value })}
          placeholder="e.g. Near City Mall"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          Your business location will be displayed on the map for customers to easily find you. Make sure the address is
          accurate and complete.
        </p>
      </div>
    </div>
  )
}
