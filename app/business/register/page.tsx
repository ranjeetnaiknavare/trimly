"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, MapPin, Store, CheckCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrimlyLogo } from "@/components/trimly-logo"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/components/auth/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { AgentReferralBanner } from "@/components/business/agent-referral-banner"

export default function BusinessRegistrationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [step, setStep] = useState<"phone" | "otp" | "location" | "success">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [businessName, setBusinessName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showLocationDialog, setShowLocationDialog] = useState(false)
  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  // Agent referral tracking
  const [agentReferralId, setAgentReferralId] = useState("")
  const [isValidReferral, setIsValidReferral] = useState<boolean | null>(null)
  const [showReferralInput, setShowReferralInput] = useState(false)
  const [agentReferralCode, setAgentReferralCode] = useState("")

  // Check for referral ID in URL
  useEffect(() => {
    const refId = searchParams.get("ref")
    if (refId) {
      setAgentReferralId(refId)
      validateAgentReferral(refId)
    }
  }, [searchParams])

  // Redirect if already logged in
  useEffect(() => {
    if (user && user.role === "business") {
      router.push("/business/dashboard")
    }
  }, [user, router])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Remove non-digits
    if (value.length <= 10) {
      setPhoneNumber(value)
    }
  }

  const validateAgentReferral = (id: string) => {
    // In a real app, this would make an API call to validate the agent ID
    // For demo purposes, we'll simulate a valid referral if it starts with "TRA-"
    const isValid = id.startsWith("TRA-")
    setIsValidReferral(isValid)
    return isValid
  }

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setAgentReferralId(value)

    if (value.length >= 5) {
      validateAgentReferral(value)
    } else {
      setIsValidReferral(null)
    }
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number")
      return
    }

    setIsLoading(true)

    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
    }, 1000)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false)
      setStep("location")
    }, 1000)
  }

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to save location
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
    }, 1000)
  }

  const handleUseCurrentLocation = () => {
    setIsLoading(true)

    // Simulate getting current location
    setTimeout(() => {
      setLocation({
        address: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
      })
      setIsLoading(false)
      setShowLocationDialog(false)
    }, 1000)
  }

  const handleCompleteRegistration = () => {
    router.push("/business/register/complete")
  }

  const handleApplyReferralCode = (code: string) => {
    setAgentReferralCode(code)
    // In a real app, you might store this in form data or context
  }

  const renderPhoneStep = () => (
    <form onSubmit={handlePhoneSubmit}>
      <div className="space-y-6">
        <AgentReferralBanner onApply={handleApplyReferralCode} />
        <Card className="border-none shadow-none">
          <CardHeader className="space-y-1 p-0 mb-4">
            <CardTitle className="text-2xl font-bold">Quick Registration</CardTitle>
            <CardDescription>Enter your phone number to get started. We'll send you an OTP to verify.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-rose-500 focus-within:border-rose-500">
                <div className="px-3 py-2 bg-gray-50 text-gray-500 border-r rounded-l-md">+91</div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                  maxLength={10}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="e.g. Royal Gents Salon"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            {/* Agent Referral Section */}
            {agentReferralId ? (
              <div className="space-y-2">
                <Label htmlFor="agentReferral">Agent Referral</Label>
                <div className="flex items-center">
                  <Input
                    id="agentReferral"
                    value={agentReferralId}
                    onChange={handleReferralChange}
                    className={`${
                      isValidReferral === true
                        ? "border-green-500 focus-visible:ring-green-500"
                        : isValidReferral === false
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                    }`}
                    disabled={isValidReferral === true}
                  />
                  {isValidReferral === true && <CheckCircle className="h-5 w-5 text-green-500 ml-2" />}
                </div>
                {isValidReferral === true && <p className="text-xs text-green-600">Valid agent referral</p>}
                {isValidReferral === false && <p className="text-xs text-red-600">Invalid agent referral code</p>}
              </div>
            ) : (
              <>
                {showReferralInput ? (
                  <div className="space-y-2">
                    <Label htmlFor="agentReferral">Agent Referral Code (Optional)</Label>
                    <Input
                      id="agentReferral"
                      placeholder="e.g. TRA-123456"
                      value={agentReferralId}
                      onChange={handleReferralChange}
                      className={`${
                        isValidReferral === true
                          ? "border-green-500 focus-visible:ring-green-500"
                          : isValidReferral === false
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                      }`}
                    />
                    {isValidReferral === true && <p className="text-xs text-green-600">Valid agent referral</p>}
                    {isValidReferral === false && <p className="text-xs text-red-600">Invalid agent referral code</p>}
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-rose-600"
                    onClick={() => setShowReferralInput(true)}
                  >
                    Have an agent referral code?
                  </Button>
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="p-0 mt-6">
            <Button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700"
              disabled={
                isLoading ||
                !phoneNumber ||
                phoneNumber.length < 10 ||
                !businessName ||
                (agentReferralId && isValidReferral === false)
              }
            >
              {isLoading ? "Sending OTP..." : "Get OTP"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )

  const renderOtpStep = () => (
    <form onSubmit={handleOtpSubmit}>
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1 p-0 mb-4">
          <CardTitle className="text-2xl font-bold">Verify Your Number</CardTitle>
          <CardDescription>We've sent a 6-digit code to {phoneNumber}. Please enter it below.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center text-xl"
                required
              />
            ))}
          </div>
          <div className="text-center">
            <Button variant="link" type="button" className="text-rose-600 p-0 h-auto" onClick={() => setStep("phone")}>
              Change phone number
            </Button>
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-6">
          <Button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700"
            disabled={isLoading || otp.some((digit) => !digit)}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )

  const renderLocationStep = () => (
    <form onSubmit={handleLocationSubmit}>
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1 p-0 mb-4">
          <CardTitle className="text-2xl font-bold">Add Your Location</CardTitle>
          <CardDescription>Let customers find your business easily. You can always update this later.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-rose-500 mr-2" />
              <div>
                <p className="font-medium">Quick Location Setup</p>
                <p className="text-sm text-gray-500">Use your current location or search</p>
              </div>
            </div>
            <Button type="button" variant="outline" onClick={() => setShowLocationDialog(true)} className="shrink-0">
              Set Location
            </Button>
          </div>

          {location.address && (
            <div className="border rounded-lg p-4 bg-green-50">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Location Added</p>
                  <p className="text-sm">{location.address}</p>
                  <p className="text-sm">
                    {location.city}, {location.state} - {location.pincode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Display agent referral if present */}
          {agentReferralId && isValidReferral && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Your registration is linked to agent {agentReferralId}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="p-0 mt-6">
          <Button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700"
            disabled={isLoading || !location.address}
          >
            {isLoading ? "Saving..." : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )

  const renderSuccessStep = () => (
    <Card className="border-none shadow-none">
      <CardHeader className="space-y-1 p-0 mb-4 text-center">
        <div className="mx-auto bg-green-100 rounded-full p-3 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Registration Successful!</CardTitle>
        <CardDescription>
          Your business is now registered with Trimly. You can now complete your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4 mt-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Store className="h-5 w-5 text-rose-500 mr-3" />
                <div>
                  <p className="font-medium">{businessName}</p>
                  <p className="text-sm text-gray-500">
                    {location.city}, {location.state}
                  </p>
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>

          {/* Display agent referral if present */}
          {agentReferralId && isValidReferral && (
            <div className="border rounded-lg p-4 bg-blue-50">
              <p className="text-sm">
                <span className="font-medium">Agent Referral:</span> {agentReferralId}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-0 mt-6 flex flex-col space-y-3">
        <Button onClick={handleCompleteRegistration} className="w-full bg-rose-600 hover:bg-rose-700">
          Complete Your Profile
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={() => router.push("/business/dashboard")} className="w-full">
          Go to Dashboard
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/business">
            <div className="flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <TrimlyLogo size="sm" />
            </div>
          </Link>
          <div className="text-sm text-gray-500">
            {step === "phone" && "Step 1 of 3"}
            {step === "otp" && "Step 2 of 3"}
            {step === "location" && "Step 3 of 3"}
            {step === "success" && "Complete"}
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-md mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div
            className="bg-rose-600 h-2.5 rounded-full transition-all duration-300"
            style={{
              width: step === "phone" ? "33%" : step === "otp" ? "66%" : "100%",
            }}
          ></div>
        </div>

        {/* Step Content */}
        {step === "phone" && renderPhoneStep()}
        {step === "otp" && renderOtpStep()}
        {step === "location" && renderLocationStep()}
        {step === "success" && renderSuccessStep()}
      </main>

      {/* Location Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set Business Location</DialogTitle>
            <DialogDescription>Choose how you want to set your business location</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleUseCurrentLocation}
              disabled={isLoading}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Use current location
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or enter manually</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Shop/Building name, Street"
                  value={location.address}
                  onChange={(e) => setLocation({ ...location, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={location.city}
                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={location.state}
                    onChange={(e) => setLocation({ ...location, state: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  placeholder="PIN Code"
                  value={location.pincode}
                  onChange={(e) => setLocation({ ...location, pincode: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="bg-rose-600 hover:bg-rose-700"
              onClick={() => {
                if (location.address && location.city && location.state && location.pincode) {
                  setShowLocationDialog(false)
                }
              }}
              disabled={!location.address || !location.city || !location.state || !location.pincode}
            >
              Save Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@trimly.com</p>
        </div>
      </footer>
    </div>
  )
}
