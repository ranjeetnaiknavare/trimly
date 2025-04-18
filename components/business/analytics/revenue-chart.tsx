"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for the chart
const data = [
  { date: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { date: "Feb", revenue: 4500, expenses: 2600, profit: 1900 },
  { date: "Mar", revenue: 4800, expenses: 2700, profit: 2100 },
  { date: "Apr", revenue: 4300, expenses: 2500, profit: 1800 },
  { date: "May", revenue: 5000, expenses: 2800, profit: 2200 },
  { date: "Jun", revenue: 5200, expenses: 3000, profit: 2200 },
  { date: "Jul", revenue: 6000, expenses: 3200, profit: 2800 },
]

export function RevenueChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
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
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#E11D48" fill="#E11D48" fillOpacity={0.2} />
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
          <Area type="monotone" dataKey="profit" name="Profit" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
