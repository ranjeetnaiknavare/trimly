"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceSelectionList } from "@/components/service-selection-list"
import { TimeSlotPicker } from "@/components/time-slot-picker"
import { FamilyMemberSelector } from "@/components/family-member-selector"
import { BookingSummary } from "@/components/booking-summary"

// This would typically come from a database or API
const getSalonData = (slug: string) => {
  // For demo purposes, we're returning mock data
  return {
    id: "1",
    name: "Royal Gents Salon",
    slug: "royal-gents-salon",
    category: "Men's Salon",
    location: "Kothrud",
    waitTime: "10 min",
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
      { id: "fm1", name: "You", relation: "self", selected: true },
      { id: "fm2", name: "Raj", relation: "spouse", selected: false },
      { id: "fm3", name: "Arjun", relation: "son", selected: false },
    ],
  }
}

// Generate time slots for the current day and next few days
const generateTimeSlots = () => {
  const today = new Date()
  const days = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
    const dayNumber = date.getDate()
    const month = date.toLocaleDateString("en-US", { month: "short" })

    const slots = []
    const startHour = i === 0 ? today.getHours() + 1 : 10 // If today, start from next hour
    const endHour = 20 // Salon closes at 8 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      for (const minute of [0, 30]) {
        // Skip times in the past for today
        if (i === 0 && hour === today.getHours() && minute <= today.getMinutes()) continue

        const time = `${hour % 12 || 12}:${minute === 0 ? "00" : minute} ${hour >= 12 ? "PM" : "AM"}`
        const available = Math.random() > 0.3 // 70% chance of availability
        slots.push({ time, available })
      }
    }

    days.push({
      date: `${dayName}, ${dayNumber} ${month}`,
      isToday: i === 0,
      slots,
    })
  }

  return days
}

export default function BookingPage({ params }: { params: { slug: string } }) {
  const salon = getSalonData(params.slug)
  const [bookingType, setBookingType] = useState<"queue" | "appointment">("appointment")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<string[]>(["fm1"]) // Default to "You"
  const [currentStep, setCurrentStep] = useState(1)

  const timeSlots = generateTimeSlots()

  const totalAmount = selectedServices.reduce((total, serviceId) => {
    const service = salon.services.find((s) => s.id === serviceId)
    return total + (service?.price || 0)
  }, 0)

  const totalDuration = selectedServices.reduce((total, serviceId) => {
    const service = salon.services.find((s) => s.id === serviceId)
    return total + (service?.duration || 0)
  }, 0)

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleFamilyMemberToggle = (memberId: string) => {
    setSelectedFamilyMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId],
    )
  }

  const handleTimeSlotSelect = (date: string, time: string) => {
    setSelectedDate(date)
    setSelectedTimeSlot(time)
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
  }

  const handleSubmit = () => {
    // In a real app, this would submit the booking to an API
    // For now, we'll just navigate to a confirmation page
    window.location.href = `/salon/${params.slug}/booking-confirmation`
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Select Services</h2>
              <ServiceSelectionList
                services={salon.services}
                selectedServices={selectedServices}
                onToggle={handleServiceToggle}
              />
            </div>

            {selectedServices.length > 0 && (
              <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Selected Services</p>
                  <p className="text-xs text-gray-500">
                    {selectedServices.length} services • {totalDuration} min
                  </p>
                </div>
                <p className="font-semibold">₹{totalAmount}</p>
              </div>
            )}
          </div>
        )
      case 2:
        return bookingType === "queue" ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Join Queue</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Current Wait Time</p>
                      <p className="text-2xl font-bold text-rose-600">{salon.waitTime}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-rose-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Join the virtual queue and get notified when it's your turn. You can arrive at the salon just before
                    your turn.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Who's Coming?</h2>
              <FamilyMemberSelector
                members={salon.familyMembers}
                selectedMembers={selectedFamilyMembers}
                onToggle={handleFamilyMemberToggle}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Select Date & Time</h2>
              <TimeSlotPicker
                days={timeSlots}
                selectedDate={selectedDate}
                selectedTime={selectedTimeSlot}
                onSelect={handleTimeSlotSelect}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Who's Coming?</h2>
              <FamilyMemberSelector
                members={salon.familyMembers}
                selectedMembers={selectedFamilyMembers}
                onToggle={handleFamilyMemberToggle}
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-3">Booking Summary</h2>
            <BookingSummary
              salon={salon}
              selectedServices={selectedServices}
              bookingType={bookingType}
              date={selectedDate}
              time={selectedTimeSlot}
              familyMembers={selectedFamilyMembers}
              totalAmount={totalAmount}
              totalDuration={totalDuration}
            />

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Important Notes</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                  <span>Payment will be made directly at the salon</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                  <span>You can cancel or reschedule up to 1 hour before your appointment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                  <span>You'll receive a reminder notification 30 minutes before your turn</span>
                </li>
              </ul>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedServices.length > 0
      case 2:
        return bookingType === "queue" || (selectedDate && selectedTimeSlot)
      default:
        return true
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center h-16 px-4">
          <Button variant="ghost" size="icon" onClick={handlePrevStep} disabled={currentStep === 1}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">{salon.name}</h1>
            <p className="text-xs text-gray-500">{salon.location}</p>
          </div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Progress Steps */}
        <div className="container px-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  currentStep >= 1 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div className={`h-1 w-6 ${currentStep > 1 ? "bg-rose-600" : "bg-gray-200"}`}></div>
            </div>
            <div className="flex items-center">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  currentStep >= 2 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div className={`h-1 w-6 ${currentStep > 2 ? "bg-rose-600" : "bg-gray-200"}`}></div>
            </div>
            <div className="flex items-center">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  currentStep >= 3 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
            </div>
          </div>
        </div>

        {/* Booking Type Tabs (only on step 2) */}
        {currentStep === 2 && (
          <div className="container px-4 pb-3">
            <Tabs value={bookingType} onValueChange={(value) => setBookingType(value as "queue" | "appointment")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="queue" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Join Queue
                </TabsTrigger>
                <TabsTrigger
                  value="appointment"
                  className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
      </header>

      <main className="flex-1 container px-4 py-6">{renderStepContent()}</main>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="container">
          {currentStep < 3 ? (
            <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={handleNextStep} disabled={!canProceed()}>
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={handleSubmit}>
              Confirm Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
