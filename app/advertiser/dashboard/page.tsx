"use client"

import { useState } from "react"
import Link from "next/link"
import { AdvertiserDashboardLayout } from "@/components/advertiser/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImagePlus, TrendingUp, Users, DollarSign, Calendar } from "lucide-react"
import { AdPerformanceChart } from "@/components/business/ads/ad-performance-chart"

export default function AdvertiserDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <AdvertiserDashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back to your advertiser dashboard</p>
        </div>
        <Button className="mt-2 md:mt-0 bg-rose-600 hover:bg-rose-700">
          <Link href="/advertiser/ads/create" className="flex items-center">
            <ImagePlus className="mr-2 h-4 w-4" />
            Create New Ad
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+100% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Impressions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+12% from last week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+8% from last week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹500</div>
            <Link href="/advertiser/billing" className="text-xs text-rose-600 hover:underline">
              Add funds
            </Link>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Ad Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ad Performance Overview</CardTitle>
              <CardDescription>Track your ad impressions and clicks over time</CardDescription>
            </CardHeader>
            <CardContent>
              <AdPerformanceChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent advertising activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="rounded-full bg-green-100 p-2 mr-3">
                      <ImagePlus className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">New ad created</p>
                      <p className="text-sm text-gray-500">Summer Special Discount</p>
                      <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-2 mr-3">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Funds added</p>
                      <p className="text-sm text-gray-500">₹1,000 added to wallet</p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-purple-100 p-2 mr-3">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Account created</p>
                      <p className="text-sm text-gray-500">Welcome to Trimly Advertiser</p>
                      <p className="text-xs text-gray-400">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Campaigns</CardTitle>
                <CardDescription>Your scheduled advertising campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="rounded-full bg-rose-100 p-2 mr-3">
                      <Calendar className="h-4 w-4 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">Summer Special Discount</p>
                        <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                          Active
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">Jul 15 - Jul 22, 2023</p>
                      <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-rose-600 h-full rounded-full" style={{ width: "30%" }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">2 days remaining</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm" className="w-full">
                    <Link href="/advertiser/ads/create">Schedule New Campaign</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Ad Performance Details</CardTitle>
              <CardDescription>Detailed metrics for your advertising campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Summer Special Discount</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-500">Impressions</p>
                      <p className="text-lg font-medium">1,245</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-500">Clicks</p>
                      <p className="text-lg font-medium">87</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-500">CTR</p>
                      <p className="text-lg font-medium">6.99%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-500">Avg. Cost per Click</p>
                      <p className="text-lg font-medium">₹2.29</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Performance by Location</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Location</th>
                          <th className="text-right py-3 px-4 font-medium">Impressions</th>
                          <th className="text-right py-3 px-4 font-medium">Clicks</th>
                          <th className="text-right py-3 px-4 font-medium">CTR</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">Kothrud, Pune</td>
                          <td className="py-3 px-4 text-right">543</td>
                          <td className="py-3 px-4 text-right">42</td>
                          <td className="py-3 px-4 text-right">7.73%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Aundh, Pune</td>
                          <td className="py-3 px-4 text-right">412</td>
                          <td className="py-3 px-4 text-right">29</td>
                          <td className="py-3 px-4 text-right">7.04%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Baner, Pune</td>
                          <td className="py-3 px-4 text-right">290</td>
                          <td className="py-3 px-4 text-right">16</td>
                          <td className="py-3 px-4 text-right">5.52%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Audience Insights</CardTitle>
              <CardDescription>Understand who is viewing and engaging with your ads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Demographics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-500 mb-2">Age Distribution</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>18-24</span>
                            <span>15%</span>
                          </div>
                          <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-rose-600 h-full rounded-full" style={{ width: "15%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>25-34</span>
                            <span>42%</span>
                          </div>
                          <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-rose-600 h-full rounded-full" style={{ width: "42%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>35-44</span>
                            <span>28%</span>
                          </div>
                          <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-rose-600 h-full rounded-full" style={{ width: "28%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>45+</span>
                            <span>15%</span>
                          </div>
                          <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-rose-600 h-full rounded-full" style={{ width: "15%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-2">Gender Distribution</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Female</span>
                            <span>58%</span>
                          </div>
                          <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-rose-600 h-full rounded-full" style={{ width: "58%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Male</span>
                            <span>40%</span>
                          </div>
                          <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-rose-600 h-full rounded-full" style={{ width: "40%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Other</span>
                            <span>2%</span>
                          </div>
                          <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-rose-600 h-full rounded-full" style={{ width: "2%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Beauty & Wellness</div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Hair Care</div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Spa & Massage</div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Skincare</div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Fashion</div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Luxury</div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">Fitness</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdvertiserDashboardLayout>
  )
}

// Missing Badge component
function Badge({ className, variant, children, ...props }: any) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "outline" ? "border" : "",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Helper function
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
