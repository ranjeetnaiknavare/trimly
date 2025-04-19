"use client"

import { AgentDashboardLayout } from "@/components/agent/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentHelpPage() {
  return (
    <AgentDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Help & Support</h1>
          <p className="text-gray-500">Get assistance with your agent account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Support Resources</CardTitle>
            <CardDescription>Find answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Help resources will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </AgentDashboardLayout>
  )
}
