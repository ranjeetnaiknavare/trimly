"use client"

import { AgentDashboardLayout } from "@/components/agent/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AgentPerformanceChart } from "@/components/agent/performance-chart"

export default function AgentPerformancePage() {
  return (
    <AgentDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Performance</h1>
          <p className="text-gray-500">Track your performance metrics</p>
        </div>

        <AgentPerformanceChart />

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Detailed breakdown of your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your performance metrics will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </AgentDashboardLayout>
  )
}
