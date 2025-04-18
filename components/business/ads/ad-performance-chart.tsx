"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for the chart
const data = [
  { date: "Jul 1", impressions: 120, clicks: 8 },
  { date: "Jul 2", impressions: 145, clicks: 10 },
  { date: "Jul 3", impressions: 190, clicks: 15 },
  { date: "Jul 4", impressions: 210, clicks: 18 },
  { date: "Jul 5", impressions: 180, clicks: 12 },
  { date: "Jul 6", impressions: 220, clicks: 16 },
  { date: "Jul 7", impressions: 180, clicks: 8 },
]

export function AdPerformanceChart() {
  return (
    <div className="h-[300px] w-full">
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
          <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="#E11D48" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="clicks" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
