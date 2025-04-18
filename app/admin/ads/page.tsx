"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, CheckCircle, XCircle, Eye, BarChart3, Clock, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for pending ads
const mockPendingAds = [
  {
    id: "ad1",
    title: "Summer Special Discount",
    businessName: "Urban Grooming Space",
    submittedDate: "2023-07-15",
    duration: "7 days",
    imageUrl: "/abstract-geometric-shapes.png",
    targetUrl: "https://example.com/summer-special",
    description: "Get 20% off on all premium grooming services this summer. Limited time offer!",
  },
  {
    id: "ad2",
    title: "New Customer Offer",
    businessName: "Serene Beauty Space",
    submittedDate: "2023-07-14",
    duration: "30 days",
    imageUrl: "/colorful-abstract-shapes.png",
    targetUrl: "https://example.com/new-customer",
    description: "First-time customers get a complimentary hair spa with any service booking.",
  },
]

// Mock data for approved ads
const mockApprovedAds = [
  {
    id: "ad3",
    title: "Weekend Special",
    businessName: "Elegant Beauty Space",
    approvedDate: "2023-07-10",
    startDate: "2023-07-12",
    endDate: "2023-07-19",
    imageUrl: "/abstract-purple-swirl.png",
    targetUrl: "https://example.com/weekend-special",
    impressions: 876,
    clicks: 54,
  },
]

// Mock data for rejected ads
const mockRejectedAds = [
  {
    id: "ad4",
    title: "Flash Sale",
    businessName: "Urban Chic Salon",
    rejectedDate: "2023-07-08",
    reason: "Image quality does not meet our standards. Please upload a higher resolution image.",
    imageUrl: "/night-sky-stars.png",
  },
]

export default function AdminAdsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [selectedAd, setSelectedAd] = useState<any>(null)
  const [showAdDetailsDialog, setShowAdDetailsDialog] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleApproveAd = (ad: any) => {
    // In a real app, this would make an API call to approve the ad
    console.log("Approving ad:", ad)
    setSuccessMessage(`Ad "${ad.title}" has been approved and is now live.`)
    setShowSuccessAlert(true)
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 3000)
  }

  const handleRejectAd = (ad: any) => {
    // In a real app, this would make an API call to reject the ad
    console.log("Rejecting ad:", ad)
    setSuccessMessage(`Ad "${ad.title}" has been rejected.`)
    setShowSuccessAlert(true)
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 3000)
  }

  const handleViewAdDetails = (ad: any) => {
    setSelectedAd(ad)
    setShowAdDetailsDialog(true)
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Ad Management</h1>
          <p className="text-gray-600">Review and manage ads submitted by businesses</p>
        </div>
      </div>

      {showSuccessAlert && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPendingAds.length}</div>
            <p className="text-xs text-gray-500">Ads awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Ads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockApprovedAds.length}</div>
            <p className="text-xs text-gray-500">Currently running ads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Rejected Ads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRejectedAds.length}</div>
            <p className="text-xs text-gray-500">Ads that didn't meet guidelines</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved Ads</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Ads</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-0">
          {mockPendingAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Clock className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No pending ads</h3>
                <p className="text-gray-500 text-center mt-1">All ads have been reviewed.</p>
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
                            <p className="text-sm text-gray-500">{ad.businessName}</p>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                                Pending Review
                              </Badge>
                              <span className="text-sm text-gray-500 ml-2 flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                Submitted: {ad.submittedDate}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0 flex flex-col md:flex-row gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleViewAdDetails(ad)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm mb-4">{ad.description}</p>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">Duration:</span> {ad.duration}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-2 md:mt-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => handleRejectAd(ad)}
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveAd(ad)}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              Approve
                            </Button>
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

        <TabsContent value="approved" className="mt-0">
          {mockApprovedAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <CheckCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No approved ads</h3>
                <p className="text-gray-500 text-center mt-1">Approved ads will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockApprovedAds.map((ad) => (
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
                            <p className="text-sm text-gray-500">{ad.businessName}</p>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                                Active
                              </Badge>
                              <span className="text-sm text-gray-500 ml-2 flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                {ad.startDate} - {ad.endDate}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleViewAdDetails(ad)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              <span>Impressions</span>
                            </div>
                            <p className="font-medium">{ad.impressions.toLocaleString()}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-sm text-gray-500">
                              <BarChart3 className="h-3.5 w-3.5 mr-1" />
                              <span>Clicks</span>
                            </div>
                            <p className="font-medium">{ad.clicks.toLocaleString()}</p>
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

        <TabsContent value="rejected" className="mt-0">
          {mockRejectedAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <XCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No rejected ads</h3>
                <p className="text-gray-500 text-center mt-1">Rejected ads will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockRejectedAds.map((ad) => (
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
                            <p className="text-sm text-gray-500">{ad.businessName}</p>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                                Rejected
                              </Badge>
                              <span className="text-sm text-gray-500 ml-2 flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                Rejected: {ad.rejectedDate}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleViewAdDetails(ad)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                        <div className="bg-red-50 border border-red-100 rounded-md p-3 mt-2">
                          <div className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-sm text-red-800">{ad.reason}</p>
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

      {/* Ad Details Dialog */}
      <Dialog open={showAdDetailsDialog} onOpenChange={setShowAdDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedAd?.title}</DialogTitle>
            <DialogDescription>{selectedAd?.businessName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-md overflow-hidden">
              <img src={selectedAd?.imageUrl || "/placeholder.svg"} alt={selectedAd?.title} className="w-full h-auto" />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Ad Description</h4>
              <p className="text-sm">{selectedAd?.description}</p>
            </div>
            {selectedAd?.targetUrl && (
              <div className="space-y-2">
                <h4 className="font-medium">Target URL</h4>
                <p className="text-sm text-rose-600">{selectedAd?.targetUrl}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Submission Date</h4>
                <p className="text-sm">{selectedAd?.submittedDate}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Duration</h4>
                <p className="text-sm">{selectedAd?.duration}</p>
              </div>
            </div>
            {activeTab === "pending" && (
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    handleRejectAd(selectedAd)
                    setShowAdDetailsDialog(false)
                  }}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleApproveAd(selectedAd)
                    setShowAdDetailsDialog(false)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
