"use client"

import { useState } from "react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plus, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("day")

  // Mock data for appointments
  const appointments = [
    {
      id: "1",
      customerName: "Rahul Sharma",
      service: "Haircut & Beard Trim",
      time: "10:30 AM",
      duration: 45,
      status: "confirmed",
    },
    {
      id: "2",
      customerName: "Amit Patel",
      service: "Hair Color",
      time: "11:45 AM",
      duration: 90,
      status: "confirmed",
    },
    {
      id: "3",
      customerName: "Vikram Malhotra",
      service: "Facial",
      time: "1:15 PM",
      duration: 60,
      status: "in-progress",
    },
    {
      id: "4",
      customerName: "Suresh Kumar",
      service: "Haircut",
      time: "2:30 PM",
      duration: 30,
      status: "upcoming",
    },
    {
      id: "5",
      customerName: "Rajesh Singh",
      service: "Head Massage",
      time: "3:45 PM",
      duration: 45,
      status: "upcoming",
    },
  ]

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 9 // Start from 9 AM
    return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`
  })

  const handlePrevDay = () => {
    const prevDay = new Date(date)
    prevDay.setDate(date.getDate() - 1)
    setDate(prevDay)
  }

  const handleNextDay = () => {
    const nextDay = new Date(date)
    nextDay.setDate(date.getDate() + 1)
    setDate(nextDay)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Confirmed</Badge>
      case "in-progress":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Progress</Badge>
      case "upcoming":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      default:
        return null
    }
  }

  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <p className="text-gray-600">Manage your salon appointments</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrevDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm" onClick={handleNextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={view === "day" ? "default" : "ghost"}
              size="sm"
              className={cn("rounded-none", view === "day" ? "bg-rose-600 hover:bg-rose-700" : "")}
              onClick={() => setView("day")}
            >
              Day
            </Button>
            <Button
              variant={view === "week" ? "default" : "ghost"}
              size="sm"
              className={cn("rounded-none", view === "week" ? "bg-rose-600 hover:bg-rose-700" : "")}
              onClick={() => setView("week")}
            >
              Week
            </Button>
            <Button
              variant={view === "month" ? "default" : "ghost"}
              size="sm"
              className={cn("rounded-none", view === "month" ? "bg-rose-600 hover:bg-rose-700" : "")}
              onClick={() => setView("month")}
            >
              Month
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button className="bg-rose-600 hover:bg-rose-700">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Appointments for {format(date, "MMMM d, yyyy")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            {/* Time slots */}
            <div className="space-y-6 pt-6">
              {timeSlots.map((time) => (
                <div key={time} className="h-24 -mt-3">
                  <span className="text-sm text-gray-500">{time}</span>
                </div>
              ))}
            </div>

            {/* Appointments grid */}
            <div className="relative border-l border-gray-200 pl-4">
              {/* Time indicator lines */}
              {timeSlots.map((time, index) => (
                <div
                  key={time}
                  className="absolute left-0 right-0 border-t border-gray-100"
                  style={{ top: `${index * 96}px` }}
                >
                  <div className="absolute -left-2 w-2 h-0.5 bg-gray-200"></div>
                </div>
              ))}

              {/* Appointment cards */}
              {appointments.map((appointment) => {
                // Calculate position based on time
                const [hourStr, minuteStr] = appointment.time.split(":")
                const [hour, minute] = [Number.parseInt(hourStr), Number.parseInt(minuteStr.split(" ")[0])]
                const isPM = appointment.time.includes("PM")
                const hour24 = hour + (isPM && hour !== 12 ? 12 : 0) - (hour === 12 && !isPM ? 12 : 0)

                // Position from top (9AM is 0px)
                const topPosition = (hour24 - 9) * 96 + (minute / 60) * 96

                // Height based on duration (30min = 48px)
                const height = (appointment.duration / 30) * 48

                return (
                  <div
                    key={appointment.id}
                    className={cn(
                      "absolute left-4 right-2 p-2 rounded-md border",
                      appointment.status === "confirmed"
                        ? "bg-blue-50 border-blue-200"
                        : appointment.status === "in-progress"
                          ? "bg-green-50 border-green-200"
                          : "bg-amber-50 border-amber-200",
                    )}
                    style={{
                      top: `${topPosition}px`,
                      height: `${height}px`,
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{appointment.customerName}</p>
                        <p className="text-xs text-gray-600">{appointment.service}</p>
                        <p className="text-xs mt-1">
                          {appointment.time} • {appointment.duration} min
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel Appointment</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </BusinessDashboardLayout>
  )
}
