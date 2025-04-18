"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data for coupon analytics
const mockRedemptionData = [
  { date: "Jul 1", count: 5 },
  { date: "Jul 2", count: 3 },
  { date: "Jul 3", count: 7 },
  { date: "Jul 4", count: 2 },
  { date: "Jul 5", count: 6 },
  { date: "Jul 6", count: 8 },
  { date: "Jul 7", count: 4 },
]

const mockCouponDistribution = [
  { name: "WELCOME20", value: 45 },
  { name: "HAIRCUT100", value: 25 },
  { name: "SUMMER25", value: 20 },
  { name: "NEWYEAR30", value: 10 },
]

const COLORS = ["#E11D48", "#F43F5E", "#FB7185", "#FDA4AF"]

export function CouponAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Coupon Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="redemptions">
          <TabsList className="mb-4">
            <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="redemptions" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRedemptionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#E11D48" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="distribution" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCouponDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockCouponDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
