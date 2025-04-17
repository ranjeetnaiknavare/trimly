"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users } from "lucide-react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"

export default function BusinessDashboardPage() {
  // Mock data
  const businessName = "Royal Gents Salon"
  const todayAppointments = 12
  const queueWaitTime = "15 min"
  const totalCustomers = 248
  const recentBookings = [
    {
      id: "B1001",
      customerName: "Rahul Sharma",
      service: "Haircut & Beard Trim",
      time: "10:30 AM",
      status: "completed",
    },
    {
      id: "B1002",
      customerName: "Amit Patel",
      service: "Hair Color",
      time: "11:45 AM",
      status: "completed",
    },
    {
      id: "B1003",
      customerName: "Vikram Malhotra",
      service: "Facial",
      time: "1:15 PM",
      status: "in-progress",
    },
    {
      id: "B1004",
      customerName: "Suresh Kumar",
      service: "Haircut",
      time: "2:30 PM",
      status: "upcoming",
    },
    {
      id: "B1005",
      customerName: "Rajesh Singh",
      service: "Head Massage",
      time: "3:45 PM",
      status: "upcoming",
    },
  ]

  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {businessName}</h1>
        <p className="text-gray-600">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-rose-600 mr-2" />
              <span className="text-2xl font-bold">{todayAppointments}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Current Wait Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-2xl font-bold">{queueWaitTime}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">{totalCustomers}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{booking.customerName}</p>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-3">{booking.time}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {booking.status === "completed"
                        ? "Completed"
                        : booking.status === "in-progress"
                          ? "In Progress"
                          : "Upcoming"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <Calendar className="h-5 w-5 mr-2" />
            Add Appointment
          </Button>
          <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50">
            <Clock className="h-5 w-5 mr-2" />
            Manage Queue
          </Button>
          <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50">
            <Users className="h-5 w-5 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>
    </BusinessDashboardLayout>
  )
}
