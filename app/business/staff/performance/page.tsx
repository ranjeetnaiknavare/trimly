"use client"

import { useState } from "react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for staff performance
const staffPerformanceData = [
  { name: "Rajesh Kumar", services: 42, revenue: 18900, rating: 4.8 },
  { name: "Priya Singh", services: 38, revenue: 17200, rating: 4.9 },
  { name: "Amit Patel", services: 35, revenue: 14000, rating: 4.7 },
  { name: "Neha Sharma", services: 30, revenue: 12500, rating: 4.6 },
  { name: "Vikram Malhotra", services: 28, revenue: 11200, rating: 4.5 },
]

// Mock data for service distribution
const serviceDistributionData = [
  { name: "Haircut", value: 35 },
  { name: "Hair Color", value: 20 },
  { name: "Styling", value: 15 },
  { name: "Beard Trim", value: 12 },
  { name: "Facial", value: 10 },
  { name: "Other", value: 8 },
]

// Mock data for monthly performance
const monthlyPerformanceData = [
  { month: "Jan", services: 120, revenue: 48000 },
  { month: "Feb", services: 132, revenue: 52800 },
  { month: "Mar", services: 145, revenue: 58000 },
  { month: "Apr", services: 160, revenue: 64000 },
]

// Mock data for staff comparison
const staffComparisonData = [
  { name: "Rajesh", haircut: 25, color: 10, styling: 7 },
  { name: "Priya", haircut: 20, color: 15, styling: 3 },
  { name: "Amit", haircut: 22, color: 5, styling: 8 },
  { name: "Neha", haircut: 18, color: 8, styling: 4 },
  { name: "Vikram", haircut: 15, color: 12, styling: 1 },
]

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function StaffPerformancePage() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <BusinessDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Staff Performance</h1>
          <p className="text-gray-600">Monitor and analyze your staff performance metrics</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top Performers */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>Staff ranked by revenue generated</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Services Completed</TableHead>
                <TableHead>Revenue Generated</TableHead>
                <TableHead>Avg. Rating</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffPerformanceData.map((staff, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&query=${staff.name}`} alt={staff.name} />
                        <AvatarFallback>
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>{staff.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{staff.services}</TableCell>
                  <TableCell>₹{staff.revenue.toLocaleString()}</TableCell>
                  <TableCell>{staff.rating}</TableCell>
                  <TableCell>
                    <Badge variant={index === 0 ? "default" : index < 3 ? "secondary" : "outline"}>
                      {index === 0 ? "Top" : index < 3 ? "High" : "Average"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="comparison">Staff Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Services completed and revenue generated</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer
                  config={{
                    services: {
                      label: "Services",
                      color: "hsl(var(--chart-1))",
                    },
                    revenue: {
                      label: "Revenue (₹)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="services"
                        stroke="var(--color-services)"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
                <CardDescription>Breakdown of services provided</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Services by Staff Member</CardTitle>
              <CardDescription>Number of each service type performed by staff</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ChartContainer
                config={{
                  haircut: {
                    label: "Haircut",
                    color: "hsl(var(--chart-1))",
                  },
                  color: {
                    label: "Hair Color",
                    color: "hsl(var(--chart-2))",
                  },
                  styling: {
                    label: "Styling",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={staffComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="haircut" fill="var(--color-haircut)" />
                    <Bar dataKey="color" fill="var(--color-color)" />
                    <Bar dataKey="styling" fill="var(--color-styling)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Comparison</CardTitle>
              <CardDescription>Compare performance metrics across staff members</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ChartContainer
                config={{
                  services: {
                    label: "Services Completed",
                    color: "hsl(var(--chart-1))",
                  },
                  revenue: {
                    label: "Revenue (₹ hundreds)",
                    color: "hsl(var(--chart-2))",
                  },
                  rating: {
                    label: "Rating (x10)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={staffPerformanceData.map((staff) => ({
                      name: staff.name.split(" ")[0],
                      services: staff.services,
                      revenue: staff.revenue / 100, // Scale down for better visualization
                      rating: staff.rating * 10, // Scale up for better visualization
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="services" fill="var(--color-services)" />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" />
                    <Bar dataKey="rating" fill="var(--color-rating)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </BusinessDashboardLayout>
  )
}
