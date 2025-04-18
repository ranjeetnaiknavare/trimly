"use client"

import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { BillingPlans } from "@/components/business/billing/billing-plans"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BillingPage() {
  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription and billing information</p>
      </div>

      <Tabs defaultValue="plans">
        <TabsList>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <BillingPlans />
        </TabsContent>

        <TabsContent value="history">
          <div className="mt-4">
            <p className="text-gray-500">Your billing history will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </BusinessDashboardLayout>
  )
}
