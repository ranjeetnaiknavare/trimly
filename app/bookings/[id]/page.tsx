"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Clock, Share2, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Mock booking data - in a real app, this would be fetched from an API
const getBookingDetails = (id: string) => {
  return {
    id,
    salonId: "1",
    salonName: "Royal Gents Salon",
    salonLocation: "Shop 7, Mayur Complex, Kothrud, Pune",
    salonPhone: "+91 98765 43210",
    date: "Wed, 10 Aug",
    time: "2:30 PM",
    services: ["Haircut", "Beard Trim"],
    totalAmount: 400,
    status: "confirmed", // or "completed", "cancelled"
    bookingType: "appointment", // or "queue"
    queueNumber: null, // Only for queue bookings
    estimatedWaitTime: null, // Only for queue bookings
    salonImage: "/urban-grooming-space.png",
  }
}

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const booking = getBookingDetails(params.id)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCancelBooking = () => {
    // In a real app, this would send a request to cancel the booking
    console.log(`Cancelling booking ${booking.id} with reason: ${cancelReason}`)
    setCancelDialogOpen(false)
    // Redirect to bookings page
    router.push("/profile?tab=bookings")
  }

  const handleShare = () => {
    const shareUrl = `https://trimly.app/bookings/${booking.id}`
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
  }

  const isUpcoming = booking.status === "confirmed"
  const isPast = booking.status === "completed" || booking.status === "cancelled"

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center h-16 px-4">
          <Link href="/profile?tab=bookings" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Booking Details</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg border border-gray-100 p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Booking Information</h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  booking.status === "confirmed"
                    ? "bg-green-100 text-green-600"
                    : booking.status === "completed"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-red-100 text-red-600"
                }`}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>

            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 mr-3">
                <img
                  src={booking.salonImage || "/placeholder.svg"}
                  alt={booking.salonName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
              <div>
                <Link href={`/salon/${booking.salonId}`}>
                  <h3 className="font-medium text-gray-900 hover:text-rose-600">{booking.salonName}</h3>
                </Link>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{booking.salonLocation}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Phone className="w-3 h-3 mr-1" />
                  <a href={`tel:${booking.salonPhone}`} className="text-rose-600">
                    {booking.salonPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="flex items-start">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-gray-600">{booking.date}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-gray-600">{booking.time}</p>
                  </div>
                </div>
              </div>

              {booking.bookingType === "queue" && booking.queueNumber && (
                <div className="bg-rose-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-rose-700">Queue Number: #{booking.queueNumber}</p>
                  {booking.estimatedWaitTime && (
                    <p className="text-sm text-rose-600 mt-1">Estimated wait time: {booking.estimatedWaitTime}</p>
                  )}
                </div>
              )}

              <div>
                <p className="text-sm font-medium">Services</p>
                <ul className="mt-1 space-y-1">
                  {booking.services.map((service, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>₹{booking.totalAmount}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Pay at venue</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {isUpcoming && (
              <>
                <Button variant="outline" className="w-full text-red-600" onClick={() => setCancelDialogOpen(true)}>
                  Cancel Booking
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShareDialogOpen(true)}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Booking
                </Button>
              </>
            )}

            {booking.status === "completed" && (
              <Link href={`/review/create/${booking.id}`}>
                <Button className="w-full bg-rose-600 hover:bg-rose-700">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              </Link>
            )}

            <Link href={`/salon/${booking.salonId}`}>
              <Button
                variant={isPast ? "default" : "outline"}
                className={`w-full ${isPast ? "bg-rose-600 hover:bg-rose-700" : ""}`}
              >
                View Salon
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? Please provide a reason for cancellation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Textarea
              placeholder="Reason for cancellation"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Note: Cancellations made less than 1 hour before the appointment may be subject to a cancellation fee as
              per the salon's policy.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking} disabled={!cancelReason.trim()}>
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Booking</DialogTitle>
            <DialogDescription>Share your booking details with friends or family</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm mb-4">
              Booking at {booking.salonName} on {booking.date} at {booking.time}
            </p>
            <Button className="w-full" onClick={handleShare}>
              {copied ? "Copied to clipboard!" : "Copy booking link"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
