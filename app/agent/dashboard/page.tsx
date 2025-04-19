"use client"

import { useState } from "react"
import { Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  Alert,
  AlertDescription,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AgentDashboardLayout } from "@/components/agent/dashboard-layout"
import { AgentPerformanceChart } from "@/components/agent/performance-chart"
import { IncentivesCard } from "@/components/agent/incentives-card"
import { AgentReferralTracking } from "@/components/agent/referral-tracking"
import { AgentOnboardingGuide } from "@/components/agent/onboarding-guide"

// Mock data
const mockBusinesses = [
  {
    id: "B1",
    name: "Royal Gents Salon",
    owner: "Rajesh Kumar",
    location: "Kothrud, Pune",
    status: "active",
    registrationDate: "2023-07-15",
    commission: 100,
  },
  {
    id: "B2",
    name: "Blush Ladies Parlour",
    owner: "Priya Patel",
    location: "Viman Nagar, Pune",
    status: "active",
    registrationDate: "2023-07-18",
    commission: 100,
  },
  {
    id: "B3",
    name: "Sparsh Spa & Massage",
    owner: "Amit Kumar",
    location: "Baner, Pune",
    status: "pending",
    registrationDate: "2023-07-20",
    commission: 0,
  },
]

const mockPayouts = [
  {
    id: "P1",
    amount: 400,
    businesses: 4,
    date: "2023-07-31",
    status: "completed",
  },
  {
    id: "P2",
    amount: 200,
    businesses: 2,
    date: "2023-06-30",
    status: "completed",
  },
]

export default function AgentDashboardPage() {
  const [referralLink, setReferralLink] = useState("https://trimly.com/business/register?ref=TRA-583921")
  const [copySuccess, setCopySuccess] = useState(false)
  const [dailyOnboardings, setDailyOnboardings] = useState(3)
  const [weeklyOnboardings, setWeeklyOnboardings] = useState(12)

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const totalBusinesses = mockBusinesses.length
  const activeBusinesses = mockBusinesses.filter((b) => b.status === "active").length
  const totalCommission = mockBusinesses.reduce((sum, business) => sum + business.commission, 0)
  const pendingCommission = mockBusinesses.filter((b) => b.status === "pending").reduce((sum, business) => sum + 100, 0)

  return (
    <AgentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Agent Dashboard</h1>
            <p className="text-gray-500">Welcome back, Rahul Sharma</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button className="bg-rose-600 hover:bg-rose-700 flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Referral Link
            </Button>
          </div>
        </div>

        {/* Agent Status Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=RS" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div className="space-y-2 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Rahul Sharma</h2>
                    <p className="text-gray-500">Agent ID: TRA-583921</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 w-fit">Active</Badge>
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>+91 98765 43210</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>rahul.sharma@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>Pune, Maharashtra</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Businesses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBusinesses}</div>
              <p className="text-xs text-gray-500">
                {activeBusinesses} active, {totalBusinesses - activeBusinesses} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Commission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalCommission}</div>
              <p className="text-xs text-green-500">+₹{pendingCommission} pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,000</div>
              <p className="text-xs text-green-500">+₹500 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67%</div>
              <p className="text-xs text-green-500">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link Card */}
        <AgentReferralTracking />

        {/* Performance Chart */}
        <AgentPerformanceChart />

        {/* Incentives Card */}
        <IncentivesCard dailyOnboardings={dailyOnboardings} weeklyOnboardings={weeklyOnboardings} />

        {/* Onboarding Guide */}
        <AgentOnboardingGuide />

        {/* Tabs for Businesses and Payouts */}
        <Tabs defaultValue="businesses">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>
          <TabsContent value="businesses" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Onboarded Businesses</CardTitle>
                <CardDescription>Businesses you've helped register on Trimly</CardDescription>
              </CardHeader>
              <CardContent>
                {mockBusinesses.length > 0 ? (
                  <div className="space-y-4">
                    {mockBusinesses.map((business) => (
                      <div
                        key={business.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{business.name}</h3>
                            <Badge
                              className={
                                business.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{business.location}</p>
                          <p className="text-sm text-gray-500">Owner: {business.owner}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex flex-col items-end">
                          <p className="font-medium">
                            {business.status === "active" ? `₹${business.commission}` : "₹0"}
                            {business.status === "pending" && (
                              <span className="text-sm text-yellow-600 ml-1">(₹100 pending)</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">Registered on {business.registrationDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No businesses onboarded yet.</p>
                )}
              </CardContent>
              <CardFooter>
                <Alert className="w-full bg-blue-50 border-blue-200">
                  <AlertDescription className="text-blue-800">
                    Payouts are processed weekly for work completed Sunday through Saturday. You'll receive your payment
                    on the following Monday or Tuesday.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="payouts" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payout History</CardTitle>
                <CardDescription>Your previous payouts</CardDescription>
              </CardHeader>
              <CardContent>
                {mockPayouts.length > 0 ? (
                  <div className="space-y-4">
                    {mockPayouts.map((payout) => (
                      <div key={payout.id} className="flex items-center justify-between p-4 border rounded-md">
                        <div>
                          <h3 className="font-medium">Payout #{payout.id}</h3>
                          <p className="text-sm text-gray-500">Date: {payout.date}</p>
                          <p className="text-sm text-gray-500">Businesses: {payout.businesses}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="font-medium">₹{payout.amount}</p>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 w-fit">
                            {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No payouts yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AgentDashboardLayout>
  )
}
