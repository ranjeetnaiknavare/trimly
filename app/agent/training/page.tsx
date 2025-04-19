"use client"

import { AgentDashboardLayout } from "@/components/agent/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentTrainingPage() {
  return (
    <AgentDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Training</h1>
          <p className="text-gray-500">Access training materials and resources</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Training Resources</CardTitle>
            <CardDescription>Learn how to be an effective Trimly agent</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your training materials will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </AgentDashboardLayout>
  )
}
