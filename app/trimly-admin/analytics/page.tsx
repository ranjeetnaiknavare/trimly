"use client"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"

// Mock data for analytics
const bookingsData = [
  { month: "Jan", bookings: 120, completed: 110, cancelled: 10 },
  { month: "Feb", bookings: 150, completed: 135, cancelled: 15 },
  { month: "Mar", bookings: 180, completed: 165, cancelled: 15 },
  { month: "Apr", bookings: 220, completed: 200, cancelled: 20 },
  { month: "May", bookings: 250, completed: 230, cancelled: 20 },
  { month: "Jun", bookings: 280, completed: 260, cancelled: 20 },
  { month: "Jul", bookings: 310, completed: 290, cancelled: 20 },
  { month: "Aug", bookings: 340, completed: 320, cancelled: 20 },
  { month: "Sep", bookings: 370, completed: 350, cancelled: 20 },
  { month: "Oct", bookings: 400, completed: 380, cancelled: 20 },
  { month: "Nov", bookings: 430, completed: 410, cancelled: 20 },
  { month: "Dec", bookings: 460, completed: 440, cancelled: 20 },
]

const revenueData = [
  { month: "Jan", revenue: 50000, expenses: 30000, profit: 20000 },
  { month: "Feb", revenue: 60000, expenses: 35000, profit: 25000 },
  { month: "Mar", revenue: 70000, expenses: 40000, profit: 30000 },
  { month: "Apr", revenue: 80000, expenses: 45000, profit: 35000 },
  { month: "May", revenue: 90000, expenses: 50000, profit: 40000 },
  { month: "Jun", revenue: 100000, expenses: 55000, profit: 45000 },
  { month: "Jul", revenue: 110000, expenses: 60000, profit: 50000 },
  { month: "Aug", revenue: 120000, expenses: 65000, profit: 55000 },
  { month: "Sep", revenue: 130000, expenses: 70000, profit: 60000 },
  { month: "Oct", revenue: 140000, expenses: 75000, profit: 65000 },
  { month: "Nov", revenue: 150000, expenses: 80000, profit: 70000 },
  { month: "Dec", revenue: 160000, expenses: 85000, profit: 75000 },
]

const userTypeData = [
  { name: "Customers", value: 65 },
  { name: "Businesses", value: 25 },
  { name: "Advertisers", value: 10 },
]

const COLORS = ["#8b5cf6", "#3b82f6", "#ec4899"]

const serviceTypeData = [
  { name: "Haircut", value: 35 },
  { name: "Spa", value: 25 },
  { name: "Facial", value: 20 },
  { name: "Manicure", value: 15 },
  { name: "Pedicure", value: 5 },
]

const SERVICE_COLORS = ["#8b5cf6", "#3b82f6", "#ec4899", "#10b981", "#f59e0b"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <AdminShell requiredPermission="analytics.view">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
            <option value="year">Last 12 months</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                <p className="text-3xl font-bold">3,110</p>
                <p className="text-sm text-green-500">+12.5% from last period</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold">₹12.6L</p>
                <p className="text-sm text-green-500">+8.3% from last period</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-3xl font-bold">15,240</p>
                <p className="text-sm text-green-500">+5.7% from last period</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <p className="text-3xl font-bold">24.8%</p>
                <p className="text-sm text-red-500">-2.1% from last period</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Analytics</CardTitle>
                <CardDescription>Overview of bookings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      bookings: {
                        label: "Total Bookings",
                        color: "hsl(var(--chart-1))",
                      },
                      completed: {
                        label: "Completed",
                        color: "hsl(var(--chart-2))",
                      },
                      cancelled: {
                        label: "Cancelled",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bookingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="bookings" fill="var(--color-bookings)" />
                        <Bar dataKey="completed" fill="var(--color-completed)" />
                        <Bar dataKey="cancelled" fill="var(--color-cancelled)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Overview of revenue, expenses, and profit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--chart-1))",
                      },
                      expenses: {
                        label: "Expenses",
                        color: "hsl(var(--chart-2))",
                      },
                      profit: {
                        label: "Profit",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                        <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2} />
                        <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of user types on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {userTypeData.map((entry, index) => (
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
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
                <CardDescription>Breakdown of service types booked on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={SERVICE_COLORS[index % SERVICE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Businesses</CardTitle>
              <CardDescription>Businesses with highest bookings and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Serene Beauty Space", bookings: 450, revenue: "₹2,25,000" },
                  { name: "Urban Grooming Space", bookings: 380, revenue: "₹1,90,000" },
                  { name: "Elegant Beauty", bookings: 320, revenue: "₹1,60,000" },
                  { name: "Style Studio", bookings: 290, revenue: "₹1,45,000" },
                  { name: "Glamour Salon", bookings: 260, revenue: "₹1,30,000" },
                ].map((business, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{business.name}</p>
                      <p className="text-sm text-gray-500">{business.bookings} bookings</p>
                    </div>
                    <p className="font-medium">{business.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
              <CardDescription>Most booked services across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Haircut & Styling", bookings: 850, growth: "+12%" },
                  { name: "Facial Treatment", bookings: 720, growth: "+8%" },
                  { name: "Full Body Massage", bookings: 650, growth: "+15%" },
                  { name: "Manicure & Pedicure", bookings: 580, growth: "+5%" },
                  { name: "Hair Coloring", bookings: 520, growth: "+10%" },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.bookings} bookings</p>
                    </div>
                    <p className="text-sm text-green-500">{service.growth}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}
