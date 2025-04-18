"use client"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Download,
  Calendar,
  Filter,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Users,
  Store,
  CalendarIcon,
  DollarSign,
} from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  // Mock data for charts
  const userActivityData = [
    { name: "Week 1", customers: 1200, businesses: 120, advertisers: 45 },
    { name: "Week 2", customers: 1350, businesses: 135, advertisers: 52 },
    { name: "Week 3", customers: 1500, businesses: 150, advertisers: 60 },
    { name: "Week 4", customers: 1750, businesses: 175, advertisers: 68 },
    { name: "Week 5", customers: 2000, businesses: 200, advertisers: 75 },
    { name: "Week 6", customers: 2250, businesses: 225, advertisers: 82 },
    { name: "Week 7", customers: 2500, businesses: 250, advertisers: 90 },
    { name: "Week 8", customers: 2750, businesses: 275, advertisers: 98 },
  ]

  const bookingData = [
    { name: "Week 1", completed: 850, cancelled: 120, noShow: 30 },
    { name: "Week 2", completed: 920, cancelled: 110, noShow: 25 },
    { name: "Week 3", completed: 980, cancelled: 100, noShow: 20 },
    { name: "Week 4", completed: 1050, cancelled: 90, noShow: 15 },
    { name: "Week 5", completed: 1120, cancelled: 80, noShow: 10 },
    { name: "Week 6", completed: 1200, cancelled: 70, noShow: 8 },
    { name: "Week 7", completed: 1280, cancelled: 60, noShow: 5 },
    { name: "Week 8", completed: 1350, cancelled: 50, noShow: 3 },
  ]

  const revenueData = [
    { name: "Week 1", subscriptions: 25000, transactions: 15000, ads: 10000 },
    { name: "Week 2", subscriptions: 27500, transactions: 16500, ads: 11000 },
    { name: "Week 3", subscriptions: 30000, transactions: 18000, ads: 12000 },
    { name: "Week 4", subscriptions: 32500, transactions: 19500, ads: 13000 },
    { name: "Week 5", subscriptions: 35000, transactions: 21000, ads: 14000 },
    { name: "Week 6", subscriptions: 37500, transactions: 22500, ads: 15000 },
    { name: "Week 7", subscriptions: 40000, transactions: 24000, ads: 16000 },
    { name: "Week 8", subscriptions: 42500, transactions: 25500, ads: 17000 },
  ]

  const serviceDistributionData = [
    { name: "Hair", value: 35 },
    { name: "Skin", value: 25 },
    { name: "Nails", value: 15 },
    { name: "Massage", value: 15 },
    { name: "Makeup", value: 10 },
  ]

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"]

  return (
    <AdminShell requiredPermission="analytics.view">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-600">Comprehensive analytics and insights for the platform</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="6m">Last 6 months</option>
          <option value="1y">Last year</option>
          <option value="custom">Custom range</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <span className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5%
                </span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-500" />
                <p className="text-2xl font-semibold">12,345</p>
              </div>
              <p className="text-xs text-gray-500">Compared to 10,975 last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Active Businesses</p>
                <span className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.3%
                </span>
              </div>
              <div className="flex items-center">
                <Store className="h-5 w-5 mr-2 text-blue-500" />
                <p className="text-2xl font-semibold">1,234</p>
              </div>
              <p className="text-xs text-gray-500">Compared to 1,140 last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                <span className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15.2%
                </span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-green-500" />
                <p className="text-2xl font-semibold">45,678</p>
              </div>
              <p className="text-xs text-gray-500">Compared to 39,650 last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <span className="text-xs text-red-500 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -2.4%
                </span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-amber-500" />
                <p className="text-2xl font-semibold">₹4,56,789</p>
              </div>
              <p className="text-xs text-gray-500">Compared to ₹4,68,000 last period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>User growth and activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="customers" stroke="#8884d8" activeDot={{ r: 8 }} name="Customers" />
                    <Line type="monotone" dataKey="businesses" stroke="#82ca9d" name="Businesses" />
                    <Line type="monotone" dataKey="advertisers" stroke="#ffc658" name="Advertisers" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>User distribution by age and gender</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Demographics chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>User retention rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Retention chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
              <CardDescription>Booking activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                    <Bar dataKey="cancelled" fill="#ffc658" name="Cancelled" />
                    <Bar dataKey="noShow" fill="#ff8042" name="No Show" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peak Booking Hours</CardTitle>
                <CardDescription>Most popular booking times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Peak hours chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking Completion Rate</CardTitle>
                <CardDescription>Percentage of bookings completed vs cancelled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Completion rate chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Revenue by source over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="subscriptions" fill="#8884d8" name="Subscriptions" />
                    <Bar dataKey="transactions" fill="#82ca9d" name="Transaction Fees" />
                    <Bar dataKey="ads" fill="#ffc658" name="Advertising" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Transaction Value</CardTitle>
                <CardDescription>Average booking value over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Transaction value chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Region</CardTitle>
                <CardDescription>Revenue distribution by geographic region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Regional revenue chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Distribution</CardTitle>
              <CardDescription>Breakdown of services by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Popular Services</CardTitle>
                <CardDescription>Top services by booking volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Popular services chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Pricing Trends</CardTitle>
                <CardDescription>Average service prices over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Pricing trends chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}
