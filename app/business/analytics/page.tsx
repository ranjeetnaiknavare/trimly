"use client"

import { useState } from "react"
import { Calendar, Download, TrendingUp, Users, Scissors, CircleDollarSign } from "lucide-react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for revenue chart
const revenueData = [
  { date: "Apr 1", revenue: 2500 },
  { date: "Apr 2", revenue: 3200 },
  { date: "Apr 3", revenue: 2800 },
  { date: "Apr 4", revenue: 3500 },
  { date: "Apr 5", revenue: 4200 },
  { date: "Apr 6", revenue: 3800 },
  { date: "Apr 7", revenue: 4500 },
  { date: "Apr 8", revenue: 4100 },
  { date: "Apr 9", revenue: 3900 },
  { date: "Apr 10", revenue: 4300 },
  { date: "Apr 11", revenue: 3700 },
  { date: "Apr 12", revenue: 4000 },
  { date: "Apr 13", revenue: 4600 },
  { date: "Apr 14", revenue: 4200 },
]

// Mock data for service popularity
const serviceData = [
  { name: "Haircut", count: 45 },
  { name: "Beard Trim", count: 32 },
  { name: "Hair Color", count: 28 },
  { name: "Facial", count: 20 },
  { name: "Head Massage", count: 18 },
]

// Mock data for customer visits
const customerVisitsData = [
  { date: "Apr 1", newCustomers: 5, returningCustomers: 12 },
  { date: "Apr 2", newCustomers: 7, returningCustomers: 15 },
  { date: "Apr 3", newCustomers: 4, returningCustomers: 10 },
  { date: "Apr 4", newCustomers: 6, returningCustomers: 14 },
  { date: "Apr 5", newCustomers: 8, returningCustomers: 16 },
  { date: "Apr 6", newCustomers: 5, returningCustomers: 13 },
  { date: "Apr 7", newCustomers: 9, returningCustomers: 18 },
  { date: "Apr 8", newCustomers: 6, returningCustomers: 15 },
  { date: "Apr 9", newCustomers: 7, returningCustomers: 14 },
  { date: "Apr 10", newCustomers: 8, returningCustomers: 17 },
  { date: "Apr 11", newCustomers: 5, returningCustomers: 13 },
  { date: "Apr 12", newCustomers: 6, returningCustomers: 15 },
  { date: "Apr 13", newCustomers: 9, returningCustomers: 19 },
  { date: "Apr 14", newCustomers: 7, returningCustomers: 16 },
]

// Mock data for hourly traffic
const hourlyTrafficData = [
  { hour: "9 AM", customers: 5 },
  { hour: "10 AM", customers: 8 },
  { hour: "11 AM", customers: 12 },
  { hour: "12 PM", customers: 15 },
  { hour: "1 PM", customers: 10 },
  { hour: "2 PM", customers: 8 },
  { hour: "3 PM", customers: 14 },
  { hour: "4 PM", customers: 18 },
  { hour: "5 PM", customers: 20 },
  { hour: "6 PM", customers: 16 },
  { hour: "7 PM", customers: 12 },
  { hour: "8 PM", customers: 7 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("14d")

  return (
    <BusinessDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-600">Track your business performance</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CircleDollarSign className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold">₹54,200</span>
              <span className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                12%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Compared to last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold">248</span>
              <span className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                8%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Compared to last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-rose-600 mr-2" />
              <span className="text-2xl font-bold">312</span>
              <span className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                15%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Compared to last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Services Provided</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Scissors className="h-5 w-5 text-amber-600 mr-2" />
              <span className="text-2xl font-bold">143</span>
              <span className="ml-2 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                5%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Compared to last period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Daily revenue for the selected period</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue (₹)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Visits</CardTitle>
              <CardDescription>New vs. returning customers</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  newCustomers: {
                    label: "New Customers",
                    color: "hsl(var(--chart-1))",
                  },
                  returningCustomers: {
                    label: "Returning Customers",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerVisitsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newCustomers" fill="var(--color-newCustomers)" />
                    <Bar dataKey="returningCustomers" fill="var(--color-returningCustomers)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
              <CardDescription>Most requested services</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  count: {
                    label: "Number of Services",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="var(--color-count)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Traffic</CardTitle>
              <CardDescription>Customer traffic throughout the day</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  customers: {
                    label: "Number of Customers",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyTrafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="customers"
                      stroke="var(--color-customers)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </BusinessDashboardLayout>
  )
}
