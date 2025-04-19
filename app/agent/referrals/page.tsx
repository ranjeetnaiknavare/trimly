"use client"

import { AgentDashboardLayout } from "@/components/agent/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentReferralsPage() {
  return (
    <AgentDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Referrals</h1>
          <p className="text-gray-500">Track your referrals and commissions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
            <CardDescription>Track the status of your referrals</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your referrals will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </AgentDashboardLayout>
  )
}
