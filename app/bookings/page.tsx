"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, ChevronRight, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNav } from "@/components/bottom-nav"

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

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center justify-center h-16 px-4">
          <h1 className="text-xl font-bold text-rose-600">My Bookings</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-4">
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600"
              >
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
                    <Link key={booking.id} href={`/bookings/${booking.id}`}>
                      <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
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
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">No Upcoming Bookings</h3>
                  <p className="text-gray-500 mt-1">You don't have any upcoming appointments.</p>
                  <Link href="/">
                    <Button className="mt-4 bg-rose-600 hover:bg-rose-700">Book Now</Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-4">
              {pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <Link key={booking.id} href={`/bookings/${booking.id}`}>
                      <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
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
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">No Past Bookings</h3>
                  <p className="text-gray-500 mt-1">You haven't made any bookings yet.</p>
                  <Link href="/">
                    <Button className="mt-4 bg-rose-600 hover:bg-rose-700">Book Now</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav active="bookings" />
    </div>
  )
}
