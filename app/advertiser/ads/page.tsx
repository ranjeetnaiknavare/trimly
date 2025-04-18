"use client"

import { useState } from "react"
import Link from "next/link"
import { AdvertiserDashboardLayout } from "@/components/advertiser/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ExternalLink, BarChart3, Calendar, Eye, MousePointerClick } from "lucide-react"

// Mock data for active ads
const mockActiveAds = [
  {
    id: "ad1",
    title: "Summer Special Discount",
    status: "active",
    startDate: "2023-07-15",
    endDate: "2023-07-22",
    impressions: 1245,
    clicks: 87,
    ctr: "6.99%",
    imageUrl: "/abstract-geometric-shapes.png",
    targetUrl: "https://example.com/summer-special",
  },
]

// Mock data for past ads
const mockPastAds = [
  {
    id: "ad2",
    title: "New Year Promotion",
    status: "completed",
    startDate: "2023-01-01",
    endDate: "2023-01-15",
    impressions: 3567,
    clicks: 215,
    ctr: "6.03%",
    imageUrl: "/colorful-abstract-shapes.png",
    targetUrl: "https://example.com/new-year",
  },
]

// Mock data for pending ads
const mockPendingAds = [
  {
    id: "ad3",
    title: "Valentine's Day Special",
    status: "pending",
    startDate: "Pending Approval",
    endDate: "",
    impressions: 0,
    clicks: 0,
    ctr: "0%",
    imageUrl: "/abstract-purple-swirl.png",
    targetUrl: "https://example.com/valentines",
  },
]

export default function AdvertiserAdsPage() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <AdvertiserDashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">My Ads</h1>
          <p className="text-gray-600">Manage your advertising campaigns</p>
        </div>
        <Link href="/advertiser/ads/create">
          <Button className="mt-2 md:mt-0 bg-rose-600 hover:bg-rose-700">
            <Plus className="mr-2 h-4 w-4" />
            Create New Ad
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Ads</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="past">Past Ads</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-0">
          {mockActiveAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No active ads</h3>
                <p className="text-gray-500 text-center mt-1">
                  Create your first ad to start promoting your business locally.
                </p>
                <Link href="/advertiser/ads/create">
                  <Button className="mt-4 bg-rose-600 hover:bg-rose-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Ad
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockActiveAds.map((ad) => (
                <Card key={ad.id}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 h-40 md:h-auto overflow-hidden">
                        <img
                          src={ad.imageUrl || "/placeholder.svg"}
                          alt={ad.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{ad.title}</h3>
                            <div className="flex items-center mt-1">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                              <span className="text-sm text-gray-500 ml-2 flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                {ad.startDate} - {ad.endDate}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Button variant="outline" size="sm" className="flex items-center">
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              View Target URL
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              <span>Impressions</span>
                            </div>
                            <p className="font-medium">{ad.impressions.toLocaleString()}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MousePointerClick className="h-3.5 w-3.5 mr-1" />
                              <span>Clicks</span>
                            </div>
                            <p className="font-medium">{ad.clicks.toLocaleString()}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-sm text-gray-500">
                              <BarChart3 className="h-3.5 w-3.5 mr-1" />
                              <span>CTR</span>
                            </div>
                            <p className="font-medium">{ad.ctr}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          {mockPendingAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No pending ads</h3>
                <p className="text-gray-500 text-center mt-1">You don't have any ads waiting for approval.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockPendingAds.map((ad) => (
                <Card key={ad.id}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 h-40 md:h-auto overflow-hidden">
                        <img
                          src={ad.imageUrl || "/placeholder.svg"}
                          alt={ad.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{ad.title}</h3>
                            <div className="flex items-center mt-1">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending Approval
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Button variant="outline" size="sm" className="flex items-center">
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              View Target URL
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          Your ad is currently being reviewed. This usually takes 1-2 business days.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          {mockPastAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No past ads</h3>
                <p className="text-gray-500 text-center mt-1">Your completed ad campaigns will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockPastAds.map((ad) => (
                <Card key={ad.id}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 h-40 md:h-auto overflow-hidden">
                        <img
                          src={ad.imageUrl || "/placeholder.svg"}
                          alt={ad.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{ad.title}</h3>
                            <div className="flex items-center mt-1">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Completed
                              </span>
                              <span className="text-sm text-gray-500 ml-2 flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                {ad.startDate} - {ad.endDate}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Button variant="outline" size="sm" className="flex items-center">
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              View Target URL
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              <span>Impressions</span>
                            </div>
                            <p className="font-medium">{ad.impressions.toLocaleString()}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MousePointerClick className="h-3.5 w-3.5 mr-1" />
                              <span>Clicks</span>
                            </div>
                            <p className="font-medium">{ad.clicks.toLocaleString()}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-sm text-gray-500">
                              <BarChart3 className="h-3.5 w-3.5 mr-1" />
                              <span>CTR</span>
                            </div>
                            <p className="font-medium">{ad.ctr}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </AdvertiserDashboardLayout>
  )
}
