"use client"

import { useState } from "react"
import { AgentDashboardLayout } from "@/components/agent/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Calendar, Download, FileText, Filter } from "lucide-react"

// Mock data for earnings
const mockEarnings = [
  {
    id: "E1",
    month: "July 2023",
    amount: 600,
    businesses: 6,
    status: "Paid",
    date: "2023-07-31",
  },
  {
    id: "E2",
    month: "June 2023",
    amount: 400,
    businesses: 4,
    status: "Paid",
    date: "2023-06-30",
  },
  {
    id: "E3",
    month: "May 2023",
    amount: 200,
    businesses: 2,
    status: "Paid",
    date: "2023-05-31",
  },
]

const mockPendingEarnings = [
  {
    id: "P1",
    businessName: "Sparsh Spa & Massage",
    owner: "Amit Kumar",
    registrationDate: "2023-07-20",
    amount: 100,
    status: "Pending",
  },
]

export default function AgentEarningsPage() {
  const [timeFilter, setTimeFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Calculate total earnings
  const totalEarnings = mockEarnings.reduce((sum, earning) => sum + earning.amount, 0)
  const pendingAmount = mockPendingEarnings.reduce((sum, earning) => sum + earning.amount, 0)
  const currentMonthEarnings = mockEarnings.find((e) => e.month === "July 2023")?.amount || 0

  return (
    <AgentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Earnings</h1>
            <p className="text-gray-500">Track your commission earnings and payouts</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Statement
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalEarnings}</div>
              <p className="text-xs text-gray-500">Lifetime earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{currentMonthEarnings}</div>
              <p className="text-xs text-green-500">+₹500 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{pendingAmount}</div>
              <p className="text-xs text-gray-500">{mockPendingEarnings.length} business pending</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Earnings History</TabsTrigger>
            <TabsTrigger value="pending">Pending Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Earnings History</CardTitle>
                  <CardDescription>Your commission payouts history</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                      <SelectItem value="6months">Last 6 Months</SelectItem>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-3 font-medium text-sm bg-gray-50 rounded-t-md">
                    <div className="col-span-3">Month</div>
                    <div className="col-span-3">Businesses</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Amount</div>
                  </div>
                  <div className="divide-y">
                    {mockEarnings.map((earning) => (
                      <div key={earning.id} className="grid grid-cols-12 gap-2 p-3 text-sm items-center">
                        <div className="col-span-3 font-medium">{earning.month}</div>
                        <div className="col-span-3">{earning.businesses} businesses</div>
                        <div className="col-span-2">{earning.date}</div>
                        <div className="col-span-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {earning.status}
                          </span>
                        </div>
                        <div className="col-span-2 text-right font-medium">₹{earning.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-gray-500">
                <div>Showing {mockEarnings.length} entries</div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Earnings</CardTitle>
                <CardDescription>Commissions that will be paid in the next cycle</CardDescription>
              </CardHeader>
              <CardContent>
                {mockPendingEarnings.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-3 font-medium text-sm bg-gray-50 rounded-t-md">
                      <div className="col-span-4">Business</div>
                      <div className="col-span-3">Owner</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-3 text-right">Amount</div>
                    </div>
                    <div className="divide-y">
                      {mockPendingEarnings.map((earning) => (
                        <div key={earning.id} className="grid grid-cols-12 gap-2 p-3 text-sm items-center">
                          <div className="col-span-4 font-medium">{earning.businessName}</div>
                          <div className="col-span-3">{earning.owner}</div>
                          <div className="col-span-2">{earning.registrationDate}</div>
                          <div className="col-span-3 text-right">
                            <span className="font-medium">₹{earning.amount}</span>
                            <span className="block text-xs text-yellow-600">{earning.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No pending earnings at the moment.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  Payouts are processed weekly for work completed Sunday through Saturday. You'll receive your payment
                  on the following Monday or Tuesday.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Earnings Trend</CardTitle>
            <CardDescription>Your commission earnings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 border rounded-md">
              <div className="text-center">
                <BarChart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Earnings chart will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Documents</CardTitle>
            <CardDescription>Download your tax documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Income Statement - 2023</p>
                    <p className="text-xs text-gray-500">For the financial year 2022-2023</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Monthly Statement - July 2023</p>
                    <p className="text-xs text-gray-500">Detailed earnings for July 2023</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incentives & Bonuses</CardTitle>
            <CardDescription>Additional earnings through daily targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">Daily Target: 5+ Onboardings</h3>
                  <p className="text-sm text-gray-500">Complete 5 or more onboardings in a single day</p>
                </div>
                <div className="text-green-600 font-medium">+₹100</div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">Daily Target: 10+ Onboardings</h3>
                  <p className="text-sm text-gray-500">Complete 10 or more onboardings in a single day</p>
                </div>
                <div className="text-green-600 font-medium">+₹200</div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Incentives are calculated daily and added to your weekly payout. No limit on how many days you can earn
                bonuses!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AgentDashboardLayout>
  )
}
