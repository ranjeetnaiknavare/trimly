"use client"

import { AvatarFallback } from "@/components/ui/avatar"

import { AvatarImage } from "@/components/ui/avatar"

import { Avatar } from "@/components/ui/avatar"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Store, Megaphone, Calendar, TrendingUp, DollarSign, Star, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  // Mock data for the dashboard
  const stats = [
    {
      title: "Total Customers",
      value: "12,345",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Businesses",
      value: "1,234",
      change: "+8%",
      trend: "up",
      icon: Store,
      color: "bg-green-500",
    },
    {
      title: "Active Advertisers",
      value: "456",
      change: "+15%",
      trend: "up",
      icon: Megaphone,
      color: "bg-purple-500",
    },
    {
      title: "Bookings Today",
      value: "789",
      change: "+5%",
      trend: "up",
      icon: Calendar,
      color: "bg-rose-500",
    },
  ]

  const recentAlerts = [
    {
      id: 1,
      title: "New business registration spike",
      description: "Unusual increase in business registrations from Mumbai region",
      time: "2 hours ago",
      type: "info",
    },
    {
      id: 2,
      title: "Payment processing issue",
      description: "Multiple failed payment attempts for premium subscriptions",
      time: "5 hours ago",
      type: "warning",
    },
    {
      id: 3,
      title: "Review moderation needed",
      description: "15 new reviews flagged for potential policy violations",
      time: "1 day ago",
      type: "alert",
    },
  ]

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <p className={`ml-2 text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {stat.change}
                      </p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${stat.color}`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>Key metrics across the Trimly platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bookings">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>
                <TabsContent value="bookings" className="space-y-4">
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">Bookings chart will be displayed here</p>
                  </div>
                </TabsContent>
                <TabsContent value="revenue" className="space-y-4">
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">Revenue chart will be displayed here</p>
                  </div>
                </TabsContent>
                <TabsContent value="users" className="space-y-4">
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">Users chart will be displayed here</p>
                  </div>
                </TabsContent>
                <TabsContent value="engagement" className="space-y-4">
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">Engagement chart will be displayed here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>System alerts that may require attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-md">
                    <div
                      className={`p-2 rounded-full ${
                        alert.type === "info"
                          ? "bg-blue-100 text-blue-500"
                          : alert.type === "warning"
                            ? "bg-amber-100 text-amber-500"
                            : "bg-red-100 text-red-500"
                      }`}
                    >
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{alert.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{alert.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Registrations</CardTitle>
                <CardDescription>New users in the last 7 days</CardDescription>
              </div>
              <Users className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* We would map through recent users here */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=JD" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">Customer • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=BS" />
                    <AvatarFallback>BS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Beauty Salon</p>
                    <p className="text-xs text-gray-500">Business • 5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=AM" />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Ad Media</p>
                    <p className="text-xs text-gray-500">Advertiser • 1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top Performing Businesses</CardTitle>
                <CardDescription>Based on bookings and revenue</CardDescription>
              </div>
              <TrendingUp className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=SS" />
                      <AvatarFallback>SS</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">Serene Spa</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=UG" />
                      <AvatarFallback>UG</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">Urban Grooming</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=EB" />
                      <AvatarFallback>EB</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">Elegant Beauty</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">4.7</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Platform revenue this month</CardDescription>
              </div>
              <DollarSign className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Subscription Revenue</p>
                  <p className="text-sm font-medium">₹245,000</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Advertising Revenue</p>
                  <p className="text-sm font-medium">₹128,500</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Transaction Fees</p>
                  <p className="text-sm font-medium">₹87,200</p>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex items-center justify-between font-medium">
                  <p className="text-sm">Total Revenue</p>
                  <p className="text-sm">₹460,700</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}
