"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for the chart
const data = [
  { date: "Jan", appointments: 65, revenue: 4000, customers: 24 },
  { date: "Feb", appointments: 78, revenue: 4500, customers: 27 },
  { date: "Mar", appointments: 82, revenue: 4800, customers: 30 },
  { date: "Apr", appointments: 75, revenue: 4300, customers: 28 },
  { date: "May", appointments: 85, revenue: 5000, customers: 32 },
  { date: "Jun", appointments: 90, revenue: 5200, customers: 35 },
  { date: "Jul", appointments: 100, revenue: 6000, customers: 40 },
]

export function PerformanceChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="appointments" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="left" type="monotone" dataKey="customers" stroke="#82ca9d" />
          <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#E11D48" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
