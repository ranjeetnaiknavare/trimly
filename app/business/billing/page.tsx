"use client"

import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { BillingPlans } from "@/components/business/billing/billing-plans"

export default function BillingPage() {
  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription and billing information</p>
      </div>

      <BillingPlans />
    </BusinessDashboardLayout>
  )
}
