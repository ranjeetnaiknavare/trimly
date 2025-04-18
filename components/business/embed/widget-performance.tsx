"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the chart
const data = [
  { date: "Apr 12", views: 12, bookings: 3 },
  { date: "Apr 13", views: 19, bookings: 5 },
  { date: "Apr 14", views: 15, bookings: 4 },
  { date: "Apr 15", views: 21, bookings: 7 },
  { date: "Apr 16", views: 25, bookings: 9 },
  { date: "Apr 17", views: 18, bookings: 6 },
  { date: "Apr 18", views: 22, bookings: 8 },
]

export function WidgetPerformance() {
  // Calculate totals
  const totalViews = data.reduce((sum, item) => sum + item.views, 0)
  const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0)
  const conversionRate = totalViews > 0 ? ((totalBookings / totalViews) * 100).toFixed(1) : "0.0"

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Widget Views</p>
          <p className="text-xl font-bold">{totalViews}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Bookings</p>
          <p className="text-xl font-bold">{totalBookings}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Conversion</p>
          <p className="text-xl font-bold">{conversionRate}%</p>
        </div>
      </div>

      <div className="h-[200px]">
        <ChartContainer
          config={{
            views: {
              label: "Widget Views",
              color: "hsl(var(--chart-1))",
            },
            bookings: {
              label: "Bookings",
              color: "hsl(var(--chart-2))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="var(--color-views)" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="bookings" stroke="var(--color-bookings)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
