"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceSelectionList } from "@/components/service-selection-list"
import { TimeSlotPicker } from "@/components/time-slot-picker"
import { FamilyMemberSelector } from "@/components/family-member-selector"
import { CouponInput } from "@/components/coupon-input"
import { TipSelector } from "@/components/tip-selector"
import { BookingSummary } from "@/components/booking-summary"
import { QueueInfoTooltip } from "@/components/queue-info-tooltip"

// Mock data for the salon
const getSalonData = (slug: string) => {
  return {
    id: "1",
    name: "Royal Gents Salon",
    slug: "royal-gents-salon",
    location: "Shop 7, Mayur Complex, Kothrud, Pune",
    services: [
      {
        id: "s1",
        name: "Haircut",
        description: "Includes wash, cut, and styling",
        price: 250,
        duration: 30,
        popular: true,
      },
      {
        id: "s2",
        name: "Beard Trim",
        description: "Shape and style your beard",
        price: 150,
        duration: 15,
        popular: false,
      },
      {
        id: "s3",
        name: "Hair Color",
        description: "Professional coloring service",
        price: 800,
        duration: 60,
        popular: false,
      },
      {
        id: "s4",
        name: "Facial",
        description: "Deep cleansing and rejuvenating",
        price: 500,
        duration: 45,
        popular: true,
      },
      {
        id: "s5",
        name: "Head Massage",
        description: "Relaxing scalp massage with oil",
        price: 300,
        duration: 20,
        popular: false,
      },
    ],
    familyMembers: [
      { id: "m1", name: "Me", relation: "self", selected: true },
      { id: "m2", name: "Raj (Son)", relation: "son", selected: false },
      { id: "m3", name: "Priya (Daughter)", relation: "daughter", selected: false },
    ],
  }
}

// Mock time slots
const getTimeSlots = () => {
  const currentDate = new Date()
  const slots = []

  // Generate slots for the next 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate)
    date.setDate(date.getDate() + i)

    const daySlots = []
    // Generate slots from 10 AM to 8 PM
    for (let hour = 10; hour <= 20; hour++) {
      if (hour !== 13) {
        // Skip 1 PM (lunch break)
        daySlots.push({
          id: `slot-${i}-${hour}`,
          time: `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour >= 12 ? "PM" : "AM"}`,
          available: Math.random() > 0.3, // Randomly make some slots unavailable
        })

        // Add half-hour slots
        if (hour !== 20) {
          // Don't add 8:30 PM
          daySlots.push({
            id: `slot-${i}-${hour}-30`,
            time: `${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour >= 12 ? "PM" : "AM"}`,
            available: Math.random() > 0.3, // Randomly make some slots unavailable
          })
        }
      }
    }

    slots.push({
      date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      slots: daySlots,
    })
  }

  return slots
}

export default function BookingPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingType = searchParams.get("type") || "appointment"

  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<string[]>(["m1"]) // Default to "Me"
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discount: number
    type: "percentage" | "fixed"
  } | null>(null)
  const [tipAmount, setTipAmount] = useState(0)

  const salon = getSalonData(params.slug)
  const timeSlots = getTimeSlots()

  // Calculate total amount and duration
  const totalAmount = selectedServices.reduce((total, serviceId) => {
    const service = salon.services.find((s) => s.id === serviceId)
    return total + (service?.price || 0)
  }, 0)

  const totalDuration = selectedServices.reduce((total, serviceId) => {
    const service = salon.services.find((s) => s.id === serviceId)
    return total + (service?.duration || 0)
  }, 0)

  // Apply coupon discount if any
  const finalAmount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? totalAmount - (totalAmount * appliedCoupon.discount) / 100
      : totalAmount - appliedCoupon.discount
    : totalAmount

  // Handle service selection
  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  // Handle date and time selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset time when date changes
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  // Handle family member selection
  const handleFamilyMemberToggle = (memberId: string) => {
    setSelectedFamilyMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId],
    )
  }

  // Handle coupon application
  const handleApplyCoupon = (coupon: { code: string; discount: number; type: "percentage" | "fixed" }) => {
    setAppliedCoupon(coupon)
  }

  // Handle tip selection
  const handleTipChange = (amount: number) => {
    setTipAmount(amount)
  }

  // Handle booking submission
  const handleBookingSubmit = () => {
    // In a real app, this would make an API call to create the booking
    router.push(`/salon/${params.slug}/booking-confirmation`)
  }

  // Determine if we can proceed to the next step
  const canProceedToStep2 = selectedServices.length > 0
  const canProceedToStep3 = bookingType === "queue" || (selectedDate && selectedTime)
  const canProceedToStep4 = selectedFamilyMembers.length > 0

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center h-16 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (step > 1) {
                setStep(step - 1)
              } else {
                router.back()
              }
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="ml-4 text-lg font-semibold">{bookingType === "queue" ? "Join Queue" : "Book Appointment"}</h1>
        </div>

        {/* Progress Steps */}
        <div className="container px-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full ${
                  step >= 1 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <div className={`h-1 w-6 ${step > 1 ? "bg-rose-600" : "bg-gray-200"}`}></div>
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full ${
                  step >= 2 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > 2 ? <Check className="w-4 h-4" /> : "2"}
              </div>
              <div className={`h-1 w-6 ${step > 2 ? "bg-rose-600" : "bg-gray-200"}`}></div>
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full ${
                  step >= 3 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > 3 ? <Check className="w-4 h-4" /> : "3"}
              </div>
              <div className={`h-1 w-6 ${step > 3 ? "bg-rose-600" : "bg-gray-200"}`}></div>
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full ${
                  step >= 4 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                4
              </div>
            </div>
            <div className="text-sm font-medium">Step {step} of 4</div>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        {/* Step 1: Select Services */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Select Services</h2>
            <ServiceSelectionList
              services={salon.services}
              selectedServices={selectedServices}
              onToggle={handleServiceToggle}
            />
          </div>
        )}

        {/* Step 2: Select Date & Time (for appointments) or Queue Info (for queue) */}
        {step === 2 && (
          <div>
            {bookingType === "appointment" ? (
              <>
                <h2 className="text-xl font-bold mb-4">Select Date & Time</h2>
                <TimeSlotPicker
                  timeSlots={timeSlots}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateSelect={handleDateSelect}
                  onTimeSelect={handleTimeSelect}
                />
              </>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Join Virtual Queue</h2>
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-rose-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Estimated Wait Time</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Based on your selected services, the estimated wait time is approximately{" "}
                        <span className="font-medium">{Math.ceil(totalDuration / 15) * 15} minutes</span>.
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        You will receive a notification when it's your turn. You can also track your position in the
                        queue.
                      </p>
                      <div className="mt-4 p-3 bg-rose-50 rounded-md border border-rose-100">
                        <h4 className="font-medium flex items-center">
                          How Queue Works
                          <QueueInfoTooltip />
                        </h4>
                        <ol className="mt-2 text-sm text-gray-600 space-y-2 list-decimal list-inside">
                          <li>Join the virtual queue by selecting your services</li>
                          <li>Receive updates about your position in the queue</li>
                          <li>Arrive at the salon when you're notified it's almost your turn</li>
                          <li>Skip the waiting room and get serviced right away</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Select Family Members */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Who is this booking for?</h2>
            <FamilyMemberSelector
              members={salon.familyMembers}
              selectedMembers={selectedFamilyMembers}
              onToggle={handleFamilyMemberToggle}
            />
          </div>
        )}

        {/* Step 4: Review & Confirm */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Review & Confirm</h2>
            <BookingSummary
              salon={salon}
              selectedServices={selectedServices}
              bookingType={bookingType as "queue" | "appointment"}
              date={selectedDate}
              time={selectedTime}
              familyMembers={selectedFamilyMembers}
              totalAmount={finalAmount}
              totalDuration={totalDuration}
              appliedCoupon={appliedCoupon}
              tipAmount={tipAmount}
            />

            <div className="mt-6 space-y-4">
              <CouponInput onApplyCoupon={handleApplyCoupon} />

              <div className="bg-white rounded-lg border border-gray-100 p-4">
                <h3 className="font-medium mb-3">Add a Tip</h3>
                <TipSelector baseAmount={finalAmount} selectedAmount={tipAmount} onChange={handleTipChange} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="container">
          {step < 4 ? (
            <Button
              className="w-full bg-rose-600 hover:bg-rose-700"
              disabled={
                (step === 1 && !canProceedToStep2) ||
                (step === 2 && !canProceedToStep3) ||
                (step === 3 && !canProceedToStep4)
              }
              onClick={() => setStep(step + 1)}
            >
              Continue
            </Button>
          ) : (
            <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={handleBookingSubmit}>
              Confirm Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
