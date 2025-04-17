"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  BarChart3,
  Scissors,
  MessageSquare,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TrimlyLogo } from "@/components/trimly-logo"

export default function BusinessDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  const sidebarItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard", href: "/business/dashboard" },
    { icon: <Calendar className="h-5 w-5" />, label: "Appointments", href: "/business/appointments" },
    { icon: <Clock className="h-5 w-5" />, label: "Queue Management", href: "/business/queue" },
    { icon: <Users className="h-5 w-5" />, label: "Customers", href: "/business/customers" },
    { icon: <Scissors className="h-5 w-5" />, label: "Services", href: "/business/services" },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Reviews", href: "/business/reviews" },
    { icon: <ShoppingBag className="h-5 w-5" />, label: "Inventory", href: "/business/inventory" },
    { icon: <BarChart3 className="h-5 w-5" />, label: "Analytics", href: "/business/analytics" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/business/settings" },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link href="/business/dashboard">
            <TrimlyLogo size="sm" />
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <div
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    index === 0 ? "bg-rose-50 text-rose-600" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/diverse-group-city.png" />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">Rahul Sharma</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
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
        </main>
      </div>
    </div>
  )
}
