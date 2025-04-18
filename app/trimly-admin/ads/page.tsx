"use client"

import { useState } from "react"
import { useAdminData } from "@/lib/admin-data-context"
import AdminShell from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  BarChart3,
  Clock,
  AlertTriangle,
  Megaphone,
  MousePointerClick,
  Edit,
  ExternalLink,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function AdminAdsPage() {
  const { ads, approveAd, rejectAd, updateAd, adStats, setSuccessMessage, setErrorMessage } = useAdminData()

  const [activeTab, setActiveTab] = useState("pending")
  const [selectedAd, setSelectedAd] = useState<any>(null)
  const [showAdDetailsDialog, setShowAdDetailsDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editedAd, setEditedAd] = useState<any>(null)

  const pendingAds = ads.filter((ad) => ad.status === "pending")
  const activeAds = ads.filter((ad) => ad.status === "active")
  const rejectedAds = ads.filter((ad) => ad.status === "rejected")
  const completedAds = ads.filter((ad) => ad.status === "completed")

  const handleApproveAd = (ad: any) => {
    approveAd(ad.id)
    setShowAdDetailsDialog(false)
  }

  const handleOpenRejectDialog = (ad: any) => {
    setSelectedAd(ad)
    setRejectionReason("")
    setShowRejectDialog(true)
    setShowAdDetailsDialog(false)
  }

  const handleRejectAd = () => {
    if (!rejectionReason.trim()) {
      setErrorMessage("Please provide a reason for rejection")
      return
    }

    rejectAd(selectedAd.id, rejectionReason)
    setShowRejectDialog(false)
  }

  const handleViewAdDetails = (ad: any) => {
    setSelectedAd(ad)
    setShowAdDetailsDialog(true)
  }

  const handleOpenEditDialog = (ad: any) => {
    setEditedAd({ ...ad })
    setShowEditDialog(true)
    setShowAdDetailsDialog(false)
  }

  const handleEditAd = () => {
    if (!editedAd.title.trim() || !editedAd.description.trim()) {
      setErrorMessage("Title and description are required")
      return
    }

    updateAd(editedAd)
    setShowEditDialog(false)
  }

  return (
    <AdminShell requiredPermission="ads.view">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Ad Management</h1>
          <p className="text-gray-600">Review and manage ads submitted by businesses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adStats.pendingAds}</div>
            <p className="text-xs text-gray-500">Ads awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Ads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adStats.activeAds}</div>
            <p className="text-xs text-gray-500">Currently running ads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Impressions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adStats.totalImpressions.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Ad views across platform</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adStats.totalRevenue}</div>
            <p className="text-xs text-gray-500">From all ad campaigns</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="active">Active Ads</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Ads</TabsTrigger>
          <TabsTrigger value="completed">Completed Ads</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-0">
          {pendingAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Clock className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No pending ads</h3>
                <p className="text-gray-500 text-center mt-1">All ads have been reviewed.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingAds.map((ad) => (
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
                              onClick={() => handleOpenRejectDialog(ad)}
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

        <TabsContent value="active" className="mt-0">
          {activeAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Megaphone className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No active ads</h3>
                <p className="text-gray-500 text-center mt-1">Active ads will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeAds.map((ad) => (
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

        <TabsContent value="rejected" className="mt-0">
          {rejectedAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <XCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No rejected ads</h3>
                <p className="text-gray-500 text-center mt-1">Rejected ads will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {rejectedAds.map((ad) => (
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
                                Submitted: {ad.submittedDate}
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
                            <p className="text-sm text-red-800">{ad.rejectionReason}</p>
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

        <TabsContent value="completed" className="mt-0">
          {completedAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <CheckCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No completed ads</h3>
                <p className="text-gray-500 text-center mt-1">Completed ads will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {completedAds.map((ad) => (
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
                              <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                                Completed
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

      {/* Ad Details Dialog */}
      {selectedAd && (
        <Dialog open={showAdDetailsDialog} onOpenChange={setShowAdDetailsDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Ad Details</DialogTitle>
              <DialogDescription>Review the complete details of this advertisement</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedAd.imageUrl || "/placeholder.svg"}
                  alt={selectedAd.title}
                  className="w-full h-64 object-cover rounded-md"
                />

                <div className="mt-4">
                  <h3 className="font-semibold text-lg">{selectedAd.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedAd.businessName}</p>

                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className={
                        selectedAd.status === "pending"
                          ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                          : selectedAd.status === "active"
                            ? "bg-green-50 text-green-800 border-green-200"
                            : selectedAd.status === "rejected"
                              ? "bg-red-50 text-red-800 border-red-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {selectedAd.status.charAt(0).toUpperCase() + selectedAd.status.slice(1)}
                    </Badge>
                  </div>

                  <p className="mt-4 text-sm">{selectedAd.description}</p>
                </div>
              </div>

              <div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs text-gray-500">Ad ID</Label>
                    <p className="font-mono text-sm">{selectedAd.id}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Advertiser ID</Label>
                    <p className="font-mono text-sm">{selectedAd.advertiserId}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Submission Date</Label>
                    <p className="text-sm">{selectedAd.submittedDate}</p>
                  </div>

                  {selectedAd.status === "active" && (
                    <>
                      <div>
                        <Label className="text-xs text-gray-500">Campaign Period</Label>
                        <p className="text-sm">
                          {selectedAd.startDate} to {selectedAd.endDate}
                        </p>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-500">Performance</Label>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <div className="bg-gray-50 p-2 rounded-md">
                            <p className="text-xs text-gray-500">Impressions</p>
                            <p className="font-medium">{selectedAd.impressions.toLocaleString()}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-md">
                            <p className="text-xs text-gray-500">Clicks</p>
                            <p className="font-medium">{selectedAd.clicks.toLocaleString()}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-md">
                            <p className="text-xs text-gray-500">CTR</p>
                            <p className="font-medium">{selectedAd.ctr}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <Label className="text-xs text-gray-500">Duration</Label>
                    <p className="text-sm">{selectedAd.duration}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Target URL</Label>
                    <div className="flex items-center mt-1">
                      <a
                        href={selectedAd.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center"
                      >
                        {selectedAd.targetUrl}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>

                  {selectedAd.status === "rejected" && selectedAd.rejectionReason && (
                    <div>
                      <Label className="text-xs text-gray-500">Rejection Reason</Label>
                      <div className="bg-red-50 border border-red-100 rounded-md p-3 mt-1">
                        <p className="text-sm text-red-800">{selectedAd.rejectionReason}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <div className="flex gap-2">
                {selectedAd.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleOpenRejectDialog(selectedAd)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Ad
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveAd(selectedAd)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Ad
                    </Button>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleOpenEditDialog(selectedAd)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Ad
                </Button>
                <Button variant="outline" onClick={() => setShowAdDetailsDialog(false)}>
                  Close
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Ad Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Advertisement</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this advertisement. This will be shared with the advertiser.
            </DialogDescription>
          </DialogHeader>

          {selectedAd && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 overflow-hidden rounded">
                  <img
                    src={selectedAd.imageUrl || "/placeholder.svg"}
                    alt={selectedAd.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{selectedAd.title}</h4>
                  <p className="text-sm text-gray-500">{selectedAd.businessName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Please explain why this ad is being rejected..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectAd} disabled={!rejectionReason.trim()}>
              Reject Ad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Ad Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Advertisement</DialogTitle>
            <DialogDescription>Make changes to the advertisement details</DialogDescription>
          </DialogHeader>

          {editedAd && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ad-title">Title</Label>
                <Input
                  id="ad-title"
                  value={editedAd.title}
                  onChange={(e) => setEditedAd({ ...editedAd, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ad-description">Description</Label>
                <Textarea
                  id="ad-description"
                  value={editedAd.description}
                  onChange={(e) => setEditedAd({ ...editedAd, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ad-target-url">Target URL</Label>
                <Input
                  id="ad-target-url"
                  value={editedAd.targetUrl}
                  onChange={(e) => setEditedAd({ ...editedAd, targetUrl: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ad-duration">Duration</Label>
                <select
                  id="ad-duration"
                  value={editedAd.duration}
                  onChange={(e) => setEditedAd({ ...editedAd, duration: e.target.value })}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="1 day">1 day</option>
                  <option value="7 days">7 days</option>
                  <option value="14 days">14 days</option>
                  <option value="30 days">30 days</option>
                </select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAd}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}
