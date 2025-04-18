"use client"

import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link2, Share2, CalendarDays } from "lucide-react"
import Link from "next/link"

export default function IntegrationsPage() {
  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-gray-600">Connect your salon with external services and platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Link2 className="h-5 w-5 mr-2 text-rose-600" />
              Widget Integration
            </CardTitle>
            <CardDescription>Embed booking widget on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Allow customers to book appointments directly from your website with our customizable booking widget.
            </p>
            <Link href="/business/integrations/widget">
              <Button className="w-full bg-rose-600 hover:bg-rose-700">Configure Widget</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 className="h-5 w-5 mr-2 text-rose-600" />
              Social Media
            </CardTitle>
            <CardDescription>Connect your social media accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Connect your social media accounts to share updates, promotions, and engage with customers.
            </p>
            <Link href="/business/integrations/social-media">
              <Button className="w-full bg-rose-600 hover:bg-rose-700">Connect Accounts</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-rose-600" />
              Calendar Integration
            </CardTitle>
            <CardDescription>Sync with external calendars</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Sync your appointments with Google Calendar, Outlook, and other calendar services.
            </p>
            <Link href="/business/integrations/calendar">
              <Button className="w-full bg-rose-600 hover:bg-rose-700">Connect Calendars</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </BusinessDashboardLayout>
  )
}
