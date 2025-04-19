"use client"

import { Calendar, Clock, MapPin, Users } from "lucide-react"

interface SalonData {
  id: string
  name: string
  slug: string
  location: string
  services: {
    id: string
    name: string
    description: string
    price: number
    duration: number
    popular?: boolean
  }[]
  familyMembers: {
    id: string
    name: string
    relation: string
    selected?: boolean
  }[]
}

interface BookingSummaryProps {
  salon: SalonData
  selectedServices: string[]
  bookingType: "queue" | "appointment"
  date: string | null
  time: string | null
  familyMembers: string[]
  totalAmount: number
  totalDuration: number
  appliedCoupon: {
    code: string
    discount: number
    type: "percentage" | "fixed"
  } | null
  tipAmount: number
}

export function BookingSummary({
  salon,
  selectedServices,
  bookingType,
  date,
  time,
  familyMembers,
  totalAmount,
  totalDuration,
  appliedCoupon,
  tipAmount,
}: BookingSummaryProps) {
  // Get selected service details
  const services = selectedServices.map((id) => salon.services.find((s) => s.id === id)).filter(Boolean)

  // Get selected family members
  const members = familyMembers
    .map((id) => salon.familyMembers.find((m) => m.id === id))
    .filter(Boolean)
    .map((m) => m?.name)

  // Calculate final amount with tip
  const finalAmount = totalAmount + tipAmount

  return (
    <div className="space-y-4">
      {/* Salon info */}
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold">{salon.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="font-medium">{salon.name}</h3>
          <p className="text-sm text-gray-500 flex items-center mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {salon.location}
          </p>
        </div>
      </div>

      {/* Booking type */}
      <div className="p-3 bg-gray-50 rounded-md">
        <h4 className="font-medium">{bookingType === "queue" ? "Virtual Queue" : "Appointment"}</h4>
        {bookingType === "appointment" && date && time && (
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <Calendar className="w-3 h-3 mr-1" />
            {date}, <Clock className="w-3 h-3 mx-1" /> {time}
          </p>
        )}
        {bookingType === "queue" && (
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1" />
            Estimated wait: ~{Math.ceil(totalDuration / 15) * 15} minutes
          </p>
        )}
      </div>

      {/* Services */}
      <div>
        <h4 className="font-medium mb-2">Services</h4>
        <div className="space-y-2">
          {services.map((service) => (
            <div key={service?.id} className="flex justify-between">
              <span className="text-sm">{service?.name}</span>
              <span className="text-sm font-medium">₹{service?.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* For whom */}
      <div>
        <h4 className="font-medium mb-2">For</h4>
        <p className="text-sm flex items-center">
          <Users className="w-3 h-3 mr-1" />
          {members.join(", ")}
        </p>
      </div>

      {/* Pricing breakdown */}
      <div className="border-t pt-3 mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm">Subtotal</span>
          <span className="text-sm">₹{totalAmount}</span>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between mb-1 text-green-600">
            <span className="text-sm">Coupon ({appliedCoupon.code})</span>
            <span className="text-sm">
              -₹
              {appliedCoupon.type === "percentage"
                ? Math.round((totalAmount * appliedCoupon.discount) / 100)
                : appliedCoupon.discount}
            </span>
          </div>
        )}

        {tipAmount > 0 && (
          <div className="flex justify-between mb-1">
            <span className="text-sm">Tip</span>
            <span className="text-sm">₹{tipAmount}</span>
          </div>
        )}

        <div className="flex justify-between font-medium mt-2 pt-2 border-t">
          <span>Total</span>
          <span>₹{finalAmount}</span>
        </div>
      </div>
    </div>
  )
}
