"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useSearchParams } from "next/navigation"

// Mock data for bookings
const upcomingBookings = [
  {
    id: "BK12345",
    salonName: "Royal Gents Salon",
    salonLocation: "Kothrud",
    date: "Wed, 10 Aug",
    time: "2:30 PM",
    services: ["Haircut", "Beard Trim"],
    totalAmount: 400,
    status: "confirmed",
    imageUrl: "/urban-grooming-space.png",
  },
  {
    id: "BK12346",
    salonName: "Sparsh Spa & Massage",
    salonLocation: "Baner",
    date: "Fri, 12 Aug",
    time: "4:00 PM",
    services: ["Full Body Massage"],
    totalAmount: 1200,
    status: "confirmed",
    imageUrl: "/serene-spa-retreat.png",
  },
]

const pastBookings = [
  {
    id: "BK12340",
    salonName: "Urban Hair Studio",
    salonLocation: "Aundh",
    date: "Mon, 1 Aug",
    time: "11:00 AM",
    services: ["Haircut", "Hair Color"],
    totalAmount: 1050,
    status: "completed",
    imageUrl: "/urban-chic-salon.png",
  },
  {
    id: "BK12339",
    salonName: "Royal Gents Salon",
    salonLocation: "Kothrud",
    date: "Wed, 20 Jul",
    time: "3:30 PM",
    services: ["Haircut"],
    totalAmount: 250,
    status: "completed",
    imageUrl: "/urban-grooming-space.png",
  },
  {
    id: "BK12338",
    salonName: "Blush Ladies Parlour",
    salonLocation: "Viman Nagar",
    date: "Sat, 16 Jul",
    time: "10:00 AM",
    services: ["Facial", "Manicure"],
    totalAmount: 800,
    status: "cancelled",
    imageUrl: "/serene-beauty-space.png",
  },
]

export function CustomerBookingsList() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null)
  const [cancelReason, setCancelReason] = useState("")

  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if we should show the past tab based on URL parameter
    const writeParam = searchParams?.get("write")
    if (writeParam === "true") {
      setActiveTab("past")
    }
  }, [searchParams])

  const handleCancelBooking = () => {
    // In a real app, this would send a request to cancel the booking
    console.log(`Cancelling booking ${bookingToCancel} with reason: ${cancelReason}`)
    setCancelDialogOpen(false)
    // For demo purposes, we'll just reload the page
    window.location.reload()
  }

  const openCancelDialog = (bookingId: string) => {
    setBookingToCancel(bookingId)
    setCancelDialogOpen(true)
  }

  return (
    <>
      <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
            Past
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4">
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <img
                          src={booking.imageUrl || "/placeholder.svg"}
                          alt={booking.salonName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{booking.salonName}</h3>
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                            Confirmed
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-0.5">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{booking.salonLocation}</span>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="mr-3">{booking.date}</span>
                          <Clock className="w-4 h-4 text-gray-400 mr-1" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-gray-500">{booking.services.join(", ")}</div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-1">₹{booking.totalAmount}</span>
                            <span className="text-xs text-gray-500">(Pay at venue)</span>
                          </div>
                        </div>
                        <div className="flex justify-between mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                            onClick={() => openCancelDialog(booking.id)}
                          >
                            Cancel
                          </Button>
                          <Link href={`/bookings/${booking.id}`}>
                            <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700">No Upcoming Bookings</h3>
                <p className="text-gray-500 mt-1">You don't have any upcoming appointments.</p>
                <Link href="/explore">
                  <Button className="mt-4 bg-rose-600 hover:bg-rose-700">Book Now</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-4">
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <img
                          src={booking.imageUrl || "/placeholder.svg"}
                          alt={booking.salonName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{booking.salonName}</h3>
                          {booking.status === "completed" ? (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full flex items-center">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </span>
                          ) : (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex items-center">
                              <XCircle className="w-3 h-3 mr-1" />
                              Cancelled
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-0.5">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{booking.salonLocation}</span>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="mr-3">{booking.date}</span>
                          <Clock className="w-4 h-4 text-gray-400 mr-1" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-gray-500">{booking.services.join(", ")}</div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-1">₹{booking.totalAmount}</span>
                          </div>
                        </div>
                        <div className="flex justify-end mt-3">
                          {booking.status === "completed" && (
                            <Link href={`/review/create/${booking.id}`}>
                              <Button size="sm" variant="outline" className="text-rose-600">
                                Write Review
                              </Button>
                            </Link>
                          )}
                          <Link href={`/bookings/${booking.id}`}>
                            <Button size="sm" className="bg-rose-600 hover:bg-rose-700 ml-2">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700">No Past Bookings</h3>
                <p className="text-gray-500 mt-1">You haven't made any bookings yet.</p>
                <Link href="/explore">
                  <Button className="mt-4 bg-rose-600 hover:bg-rose-700">Book Now</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

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
    </>
  )
}
