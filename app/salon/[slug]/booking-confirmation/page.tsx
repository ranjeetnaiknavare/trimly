"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Calendar, Clock, MapPin, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { trackInteraction } from "@/lib/track-interaction"

export default function BookingConfirmationPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch the booking details from an API
    // For now, we'll simulate this with a timeout and mock data
    const timer = setTimeout(() => {
      // Get booking details from session storage if available
      const storedBooking = sessionStorage.getItem("trimly_last_booking")

      if (storedBooking) {
        setBookingDetails(JSON.parse(storedBooking))
      } else {
        // Mock data as fallback
        setBookingDetails({
          id: "BK" + Math.floor(Math.random() * 10000),
          salonName: "Royal Gents Salon",
          salonAddress: "Shop 7, Mayur Complex, Kothrud, Pune",
          services: ["Haircut", "Beard Trim"],
          date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
          time: "11:30 AM",
          bookingType: Math.random() > 0.5 ? "appointment" : "queue",
          queueNumber: Math.floor(Math.random() * 10) + 1,
          estimatedWaitTime: Math.floor(Math.random() * 30) + 15,
          totalAmount: 400,
          customerName: "John Customer",
        })
      }

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleAddToCalendar = () => {
    // Track the interaction
    trackInteraction("add_to_calendar", { bookingId: bookingDetails?.id })

    // In a real app, this would generate a calendar event
    alert("Calendar event added successfully!")
  }

  const handleShare = () => {
    // Track the interaction
    trackInteraction("share_booking", { bookingId: bookingDetails?.id })

    if (navigator.share) {
      navigator
        .share({
          title: `My booking at ${bookingDetails?.salonName}`,
          text: `I've booked an appointment at ${bookingDetails?.salonName} on ${bookingDetails?.date} at ${bookingDetails?.time}.`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Booking details copied to clipboard!")
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-1 container px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Confirming your booking...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
            <p className="text-gray-600 mt-2">
              {bookingDetails?.bookingType === "appointment"
                ? "Your appointment has been successfully booked."
                : "You have successfully joined the queue."}
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-lg">{bookingDetails?.salonName}</h2>
                  <div className="flex items-start mt-1">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-600">{bookingDetails?.salonAddress}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium">Booking Details</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <div className="w-8">
                        <Calendar className="w-4 h-4 text-gray-500" />
                      </div>
                      <p className="text-sm">{bookingDetails?.date}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8">
                        <Clock className="w-4 h-4 text-gray-500" />
                      </div>
                      <p className="text-sm">
                        {bookingDetails?.bookingType === "appointment" ? (
                          bookingDetails?.time
                        ) : (
                          <>
                            Queue #{bookingDetails?.queueNumber} • Est. wait: {bookingDetails?.estimatedWaitTime} min
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium">Services</h3>
                  <ul className="mt-2 space-y-1">
                    {bookingDetails?.services.map((service: string, index: number) => (
                      <li key={index} className="text-sm">
                        • {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Booking ID</span>
                  <span className="text-sm font-mono">{bookingDetails?.id}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Customer</span>
                  <span className="text-sm">{bookingDetails?.customerName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount</span>
                  <span className="font-semibold">₹{bookingDetails?.totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button variant="outline" className="flex items-center justify-center" onClick={handleAddToCalendar}>
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
            <Button variant="outline" className="flex items-center justify-center" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-4">
            <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={() => router.push("/bookings")}>
              View My Bookings
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/explore")}>
              Explore More Salons
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
