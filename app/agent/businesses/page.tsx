"use client"

import { AgentDashboardLayout } from "@/components/agent/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentBusinessesPage() {
  return (
    <AgentDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Businesses</h1>
          <p className="text-gray-500">Manage your onboarded businesses</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Onboarded Businesses</CardTitle>
            <CardDescription>View and manage businesses you've onboarded to Trimly</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your businesses will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </AgentDashboardLayout>
  )
}
