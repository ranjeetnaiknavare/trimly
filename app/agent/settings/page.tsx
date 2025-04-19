"use client"

import { AgentDashboardLayout } from "@/components/agent/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentSettingsPage() {
  return (
    <AgentDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your account settings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Update your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your settings will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </AgentDashboardLayout>
  )
}
