"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, Scissors } from "lucide-react"
import { useEffect } from "react"

interface BookingSummaryProps {
  salon: {
    id: string
    name: string
    location: string
    services: Array<{
      id: string
      name: string
      description: string
      price: number
      duration: number
      popular: boolean
    }>
    familyMembers?: Array<{
      id: string
      name: string
      relation: string
      selected: boolean
    }>
  }
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
  const selectedServiceDetails = salon.services.filter((service) => selectedServices.includes(service.id))
  const selectedFamilyMemberDetails = salon.familyMembers?.filter((member) => familyMembers.includes(member.id)) || []

  const finalAmount = totalAmount + tipAmount

  // Store booking details in session storage for use in confirmation page
  useEffect(() => {
    const bookingDetails = {
      id: "BK" + Math.floor(Math.random() * 10000),
      salonName: salon.name,
      salonAddress: salon.location,
      services: selectedServiceDetails.map((service) => service.name),
      date: date || new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
      time: time || "As soon as possible",
      bookingType,
      queueNumber: Math.floor(Math.random() * 10) + 1,
      estimatedWaitTime: Math.ceil(totalDuration / 15) * 15,
      totalAmount: finalAmount,
      customerName: selectedFamilyMemberDetails.map((member) => member.name).join(", "),
    }

    sessionStorage.setItem("trimly_last_booking", JSON.stringify(bookingDetails))
  }, [salon, selectedServiceDetails, date, time, bookingType, totalDuration, finalAmount, selectedFamilyMemberDetails])

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Salon Info */}
        <div>
          <h3 className="font-semibold">{salon.name}</h3>
          <p className="text-sm text-gray-500">{salon.location}</p>
        </div>

        <Separator />

        {/* Booking Type & Time */}
        <div className="space-y-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">
              {bookingType === "appointment" ? (
                <>
                  {date} • {time}
                </>
              ) : (
                "Join Virtual Queue Today"
              )}
            </span>
          </div>
          {bookingType === "queue" && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">Estimated wait: ~{Math.ceil(totalDuration / 15) * 15} min</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Services */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Scissors className="h-4 w-4 mr-2 text-gray-500" />
            Selected Services
          </h4>
          <div className="space-y-2">
            {selectedServiceDetails.map((service) => (
              <div key={service.id} className="flex justify-between text-sm">
                <span>{service.name}</span>
                <span>₹{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Family Members */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            For
          </h4>
          <div className="text-sm">
            {selectedFamilyMemberDetails.map((member) => (
              <span key={member.id} className="mr-2">
                {member.name}
                {member.relation !== "self" && ` (${member.relation})`}
              </span>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          {appliedCoupon && (
            <div className="flex justify-between text-sm text-green-600">
              <span>
                Coupon: {appliedCoupon.code}{" "}
                {appliedCoupon.type === "percentage"
                  ? `(${appliedCoupon.discount}% off)`
                  : `(₹${appliedCoupon.discount} off)`}
              </span>
              <span>
                -₹
                {appliedCoupon.type === "percentage"
                  ? ((totalAmount * appliedCoupon.discount) / 100).toFixed(0)
                  : appliedCoupon.discount}
              </span>
            </div>
          )}

          {tipAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span>Tip</span>
              <span>₹{tipAmount}</span>
            </div>
          )}

          <div className="flex justify-between font-semibold pt-2">
            <span>Total</span>
            <span>₹{finalAmount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
