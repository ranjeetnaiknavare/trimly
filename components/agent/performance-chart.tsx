"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { useState } from "react"

// Mock data for the chart
const monthlyData = [
  { name: "Jan", businesses: 1, commission: 500 },
  { name: "Feb", businesses: 2, commission: 1000 },
  { name: "Mar", businesses: 1, commission: 500 },
  { name: "Apr", businesses: 3, commission: 1500 },
  { name: "May", businesses: 2, commission: 1000 },
  { name: "Jun", businesses: 4, commission: 2000 },
  { name: "Jul", businesses: 3, commission: 1500 },
]

const weeklyData = [
  { name: "Week 1", businesses: 1, commission: 500 },
  { name: "Week 2", businesses: 0, commission: 0 },
  { name: "Week 3", businesses: 2, commission: 1000 },
  { name: "Week 4", businesses: 0, commission: 0 },
]

export function AgentPerformanceChart() {
  const [timeRange, setTimeRange] = useState("monthly")

  const data = timeRange === "monthly" ? monthlyData : weeklyData

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Track your business onboarding and commission earnings</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            businesses: {
              label: "Businesses",
              color: "hsl(var(--chart-1))",
            },
            commission: {
              label: "Commission (₹)",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="var(--color-businesses)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--color-commission)" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar yAxisId="left" dataKey="businesses" fill="var(--color-businesses)" name="Businesses" />
              <Bar yAxisId="right" dataKey="commission" fill="var(--color-commission)" name="Commission (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
