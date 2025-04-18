"use client"

import type React from "react"

import { useState } from "react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Plus,
  Upload,
  ExternalLink,
  BarChart3,
  Clock,
  Calendar,
  Eye,
  MousePointerClick,
  Wallet,
  CreditCard,
  AlertCircle,
  Users,
  TrendingUp,
} from "lucide-react"
import { AdPerformanceChart } from "@/components/business/ads/ad-performance-chart"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  {
    id: "ad3",
    title: "Valentine's Day Special",
    status: "completed",
    startDate: "2023-02-07",
    endDate: "2023-02-14",
    impressions: 2890,
    clicks: 198,
    ctr: "6.85%",
    imageUrl: "/abstract-purple-swirl.png",
    targetUrl: "https://example.com/valentines",
  },
]

export default function BusinessAdsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [adFormData, setAdFormData] = useState({
    title: "",
    description: "",
    duration: "daily",
    targetUrl: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [walletBalance] = useState(500)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [insufficientFunds, setInsufficientFunds] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setAdFormData({
      ...adFormData,
      [field]: value,
    })
  }

  const getAdCost = () => {
    switch (adFormData.duration) {
      case "daily":
        return 199
      case "weekly":
        return 999
      case "monthly":
        return 2999
      default:
        return 199
    }
  }

  const handleProceedToPayment = () => {
    setIsCreateDialogOpen(false)
    setIsPaymentDialogOpen(true)
  }

  const handleProcessPayment = async () => {
    const adCost = getAdCost()
    if (paymentMethod === "wallet" && walletBalance < adCost) {
      setInsufficientFunds(true)
      return
    }

    setIsProcessingPayment(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessingPayment(false)
    setIsPaymentDialogOpen(false)

    // Submit the ad after payment
    handleSubmitAd()
  }

  const handleSubmitAd = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form
    setAdFormData({
      title: "",
      description: "",
      duration: "daily",
      targetUrl: "",
    })
    setSelectedFile(null)
    setIsSubmitting(false)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <BusinessDashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Hyperlocal Ads</h1>
          <p className="text-gray-600">Create and manage your local advertising campaigns</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-2 md:mt-0 bg-rose-600 hover:bg-rose-700">
              <Plus className="mr-2 h-4 w-4" />
              Create New Ad
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Ad</DialogTitle>
              <DialogDescription>
                Design your ad campaign to reach local customers. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleProceedToPayment()
              }}
              className="space-y-6 mt-4"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Ad Title*</Label>
                <Input
                  id="title"
                  value={adFormData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g. Summer Special Discount"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Ad Description*</Label>
                <Textarea
                  id="description"
                  value={adFormData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Briefly describe your ad"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Ad Duration*</Label>
                <Select
                  value={adFormData.duration}
                  onValueChange={(value) => handleInputChange("duration", value)}
                  required
                >
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily (₹199/day)</SelectItem>
                    <SelectItem value="weekly">Weekly (₹999/week)</SelectItem>
                    <SelectItem value="monthly">Monthly (₹2,999/month)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetUrl">Target URL*</Label>
                <Input
                  id="targetUrl"
                  type="url"
                  value={adFormData.targetUrl}
                  onChange={(e) => handleInputChange("targetUrl", e.target.value)}
                  placeholder="https://your-website.com/offer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adImage">Ad Banner Image*</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  {selectedFile ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Selected file: {selectedFile.name}</p>
                      <Button type="button" variant="outline" size="sm" onClick={() => setSelectedFile(null)}>
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-500">Drag and drop your banner image, or click to browse</p>
                      <p className="text-xs text-gray-400">Recommended size: 600x200 pixels (3:1 ratio), Max 2MB</p>
                      <Input
                        id="adImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("adImage")?.click()}
                      >
                        Browse Files
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Total Cost</p>
                    <p className="text-sm text-gray-500">
                      {adFormData.duration === "daily"
                        ? "1 day"
                        : adFormData.duration === "weekly"
                          ? "7 days"
                          : "30 days"}{" "}
                      of advertising
                    </p>
                  </div>
                  <p className="text-xl font-bold">₹{getAdCost().toLocaleString()}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700"
                  disabled={!adFormData.title || !adFormData.description || !adFormData.targetUrl || !selectedFile}
                >
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Complete Payment</DialogTitle>
              <DialogDescription>Choose your payment method to proceed with ad creation</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {insufficientFunds && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Insufficient wallet balance. Please add funds or choose another payment method.
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Total Amount</p>
                    <p className="text-sm text-gray-500">
                      {adFormData.duration === "daily"
                        ? "1 day"
                        : adFormData.duration === "weekly"
                          ? "7 days"
                          : "30 days"}{" "}
                      of advertising
                    </p>
                  </div>
                  <p className="text-xl font-bold">₹{getAdCost().toLocaleString()}</p>
                </div>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                  <RadioGroupItem value="wallet" id="payment-wallet" />
                  <Label htmlFor="payment-wallet" className="flex items-center flex-1">
                    <Wallet className="h-5 w-5 mr-2" />
                    <div>
                      <p>Wallet Balance</p>
                      <p className="text-sm text-gray-500">₹{walletBalance.toLocaleString()} available</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="card" id="payment-card" />
                  <Label htmlFor="payment-card" className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <div>
                      <p>Credit/Debit Card</p>
                      <p className="text-sm text-gray-500">Pay directly with your card</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-card-number">Card Number</Label>
                    <Input id="payment-card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="payment-expiry">Expiry Date</Label>
                      <Input id="payment-expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-cvc">CVC</Label>
                      <Input id="payment-cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-name">Name on Card</Label>
                    <Input id="payment-name" placeholder="John Doe" />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)} disabled={isProcessingPayment}>
                Cancel
              </Button>
              <Button
                onClick={handleProcessPayment}
                className="bg-rose-600 hover:bg-rose-700"
                disabled={isProcessingPayment || (paymentMethod === "wallet" && walletBalance < getAdCost())}
              >
                {isProcessingPayment ? "Processing..." : `Pay ₹${getAdCost().toLocaleString()}`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {showSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            Ad created successfully! Your ad has been submitted for admin approval.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-gray-500">Running ads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Impressions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-gray-500">Last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-green-500">+12% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ad Performance Overview</CardTitle>
          <CardDescription>Track your ad impressions and clicks over time</CardDescription>
        </CardHeader>
        <CardContent>
          <AdPerformanceChart />
        </CardContent>
      </Card>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Ads</TabsTrigger>
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
                <Button className="mt-4 bg-rose-600 hover:bg-rose-700" onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Ad
                </Button>
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

        <TabsContent value="past" className="mt-0">
          {mockPastAds.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Clock className="h-12 w-12 text-gray-400 mb-4" />
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

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Ad Guidelines</CardTitle>
          <CardDescription>
            Please ensure your ads comply with our platform guidelines to avoid rejection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Content Guidelines</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Ads must be relevant to your business and services</li>
              <li>No misleading claims or false information</li>
              <li>No offensive, inappropriate, or discriminatory content</li>
              <li>Clear and legible text</li>
              <li>High-quality images that represent your business accurately</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-1">Technical Requirements</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Banner size: 600x200 pixels (3:1 ratio)</li>
              <li>File format: JPG, PNG, or GIF</li>
              <li>Maximum file size: 2MB</li>
              <li>Target URL must be functional and relevant to the ad</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            For more information, please refer to our{" "}
            <a href="#" className="text-rose-600 hover:underline">
              complete advertising policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Advertiser Features</CardTitle>
          <CardDescription>
            As a salon owner, you can also advertise on other businesses in the Trimly network
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Your Advertiser Account</h3>
            <p className="text-sm text-gray-600 mb-4">
              You can use your business account to advertise on other salons and parlors in the Trimly network. This
              helps you reach new customers who are already looking for salon services.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                className="bg-rose-600 hover:bg-rose-700"
                onClick={() => (window.location.href = "/advertiser/dashboard")}
              >
                Go to Advertiser Dashboard
              </Button>
              <Button variant="outline">Learn More About Advertising</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-rose-600 mr-2" />
                <h4 className="font-medium">Reach New Customers</h4>
              </div>
              <p className="text-sm text-gray-600">
                Target customers based on location, interests, and salon preferences
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 text-rose-600 mr-2" />
                <h4 className="font-medium">Track Performance</h4>
              </div>
              <p className="text-sm text-gray-600">Get detailed analytics on ad performance and customer engagement</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-rose-600 mr-2" />
                <h4 className="font-medium">Grow Your Business</h4>
              </div>
              <p className="text-sm text-gray-600">Increase bookings and revenue with targeted advertising</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </BusinessDashboardLayout>
  )
}
