"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for the chart
const data = [
  { month: "Jan", new: 24, returning: 45 },
  { month: "Feb", new: 27, returning: 50 },
  { month: "Mar", new: 30, returning: 52 },
  { month: "Apr", new: 28, returning: 48 },
  { month: "May", new: 32, returning: 53 },
  { month: "Jun", new: 35, returning: 55 },
  { month: "Jul", new: 40, returning: 60 },
]

export function CustomerChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="new" name="New Customers" fill="#E11D48" />
          <Bar dataKey="returning" name="Returning Customers" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
