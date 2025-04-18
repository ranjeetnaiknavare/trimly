"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdvertiserDashboardLayout } from "@/components/advertiser/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ArrowRight, Check, AlertCircle, CreditCard, Wallet } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CreateAdPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "daily",
    targetUrl: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [walletBalance] = useState(500)
  const [insufficientFunds, setInsufficientFunds] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const getAdCost = () => {
    switch (formData.duration) {
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
    const adCost = getAdCost()
    if (paymentMethod === "wallet" && walletBalance < adCost) {
      setInsufficientFunds(true)
      return
    }

    setIsProcessingPayment(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false)
      setShowPaymentDialog(false)
      handleSubmit()
    }, 1500)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // In a real app, this would submit the form data and file to the server
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSuccess(true)

    // Redirect to ads page after success
    setTimeout(() => {
      router.push("/advertiser/ads")
    }, 2000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Ad Title*</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g. Summer Special Discount"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Ad Description*</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Briefly describe your ad"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetUrl">Target URL*</Label>
              <Input
                id="targetUrl"
                type="url"
                value={formData.targetUrl}
                onChange={(e) => handleInputChange("targetUrl", e.target.value)}
                placeholder="https://your-website.com/offer"
                required
              />
              <p className="text-xs text-gray-500">This is where users will be directed when they click on your ad</p>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleNextStep}
                className="bg-rose-600 hover:bg-rose-700"
                disabled={!formData.title || !formData.description || !formData.targetUrl}
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="adImage">Ad Banner Image*</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                {selectedFile ? (
                  <div className="space-y-2">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Ad Preview"
                      className="mx-auto max-h-40 object-contain"
                    />
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

            <div className="space-y-2">
              <Label htmlFor="duration">Ad Duration*</Label>
              <Select
                value={formData.duration}
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

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                Previous Step
              </Button>
              <Button
                onClick={handleNextStep}
                className="bg-rose-600 hover:bg-rose-700"
                disabled={!selectedFile || !formData.duration}
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Review Your Ad</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Ad Title</h4>
                  <p>{formData.title}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Ad Description</h4>
                  <p>{formData.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Target URL</h4>
                  <p className="text-rose-600">{formData.targetUrl}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Ad Duration</h4>
                  <p>
                    {formData.duration === "daily"
                      ? "Daily (₹199/day)"
                      : formData.duration === "weekly"
                        ? "Weekly (₹999/week)"
                        : "Monthly (₹2,999/month)"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Ad Banner</h4>
                  {selectedFile && previewUrl && (
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Ad Preview"
                      className="mt-2 max-h-40 object-contain border rounded"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-100 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Total Cost</h4>
                  <p className="text-sm text-gray-500">
                    {formData.duration === "daily" ? "1 day" : formData.duration === "weekly" ? "7 days" : "30 days"} of
                    advertising
                  </p>
                </div>
                <div className="text-xl font-bold">₹{getAdCost().toLocaleString()}</div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                Previous Step
              </Button>
              <Button
                onClick={() => setShowPaymentDialog(true)}
                className="bg-rose-600 hover:bg-rose-700"
                disabled={isSubmitting}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (success) {
    return (
      <AdvertiserDashboardLayout>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Ad Created Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your ad has been submitted for review. We'll notify you once it's approved.
              </p>
              <Button onClick={() => router.push("/advertiser/ads")} className="bg-rose-600 hover:bg-rose-700">
                View All Ads
              </Button>
            </div>
          </CardContent>
        </Card>
      </AdvertiserDashboardLayout>
    )
  }

  return (
    <AdvertiserDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Ad</h1>
        <p className="text-gray-600">Design your ad campaign to reach local customers</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              1
            </div>
            <div className={`h-1 w-12 ${currentStep >= 2 ? "bg-rose-600" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
            <div className={`h-1 w-12 ${currentStep >= 3 ? "bg-rose-600" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 3 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              3
            </div>
          </div>
          <div className="text-sm text-gray-500">Step {currentStep} of 3</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 ? "Ad Details" : currentStep === 2 ? "Ad Creative & Duration" : "Review & Submit"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1
              ? "Enter the basic details for your ad"
              : currentStep === 2
                ? "Upload your ad banner and select duration"
                : "Review your ad details before submission"}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
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
                    {formData.duration === "daily" ? "1 day" : formData.duration === "weekly" ? "7 days" : "30 days"} of
                    advertising
                  </p>
                </div>
                <p className="text-xl font-bold">₹{getAdCost().toLocaleString()}</p>
              </div>
            </div>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex items-center flex-1">
                  <Wallet className="h-5 w-5 mr-2" />
                  <div>
                    <p>Wallet Balance</p>
                    <p className="text-sm text-gray-500">₹{walletBalance.toLocaleString()} available</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center">
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
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)} disabled={isProcessingPayment}>
              Cancel
            </Button>
            <Button
              onClick={handleProceedToPayment}
              className="bg-rose-600 hover:bg-rose-700"
              disabled={isProcessingPayment || (paymentMethod === "wallet" && walletBalance < getAdCost())}
            >
              {isProcessingPayment ? "Processing..." : `Pay ₹${getAdCost().toLocaleString()}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdvertiserDashboardLayout>
  )
}
