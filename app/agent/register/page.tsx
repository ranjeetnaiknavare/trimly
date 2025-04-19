"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, ChevronRight, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrimlyLogo } from "@/components/trimly-logo"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AgentRegistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState<"personal" | "verification" | "experience" | "success">("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    aadharNumber: "",
    panNumber: "",
    experience: "",
    profession: "",
    referralCode: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitPersonal = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("verification")
    }, 1000)
  }

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("experience")
    }, 1000)
  }

  const handleSubmitExperience = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
    }, 1000)
  }

  const handleCompleteRegistration = () => {
    router.push("/agent/dashboard")
  }

  const renderPersonalInfoStep = () => (
    <form onSubmit={handleSubmitPersonal}>
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1 p-0 mb-4">
          <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
          <CardDescription>Tell us about yourself to get started as a Trimly Agent</CardDescription>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address (Optional)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (WhatsApp)</Label>
            <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-rose-500 focus-within:border-rose-500">
              <div className="px-3 py-2 bg-gray-50 text-gray-500 border-r rounded-l-md">+91</div>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="10-digit number"
                value={formData.phone}
                onChange={handleInputChange}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
                maxLength={10}
              />
            </div>
            <p className="text-xs text-gray-500">
              We'll communicate with you primarily via WhatsApp or SMS on this number
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="arunachal-pradesh">Arunachal Pradesh</SelectItem>
                  <SelectItem value="assam">Assam</SelectItem>
                  <SelectItem value="bihar">Bihar</SelectItem>
                  <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                  <SelectItem value="goa">Goa</SelectItem>
                  <SelectItem value="gujarat">Gujarat</SelectItem>
                  <SelectItem value="haryana">Haryana</SelectItem>
                  <SelectItem value="himachal-pradesh">Himachal Pradesh</SelectItem>
                  <SelectItem value="jharkhand">Jharkhand</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="kerala">Kerala</SelectItem>
                  <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="manipur">Manipur</SelectItem>
                  <SelectItem value="meghalaya">Meghalaya</SelectItem>
                  <SelectItem value="mizoram">Mizoram</SelectItem>
                  <SelectItem value="nagaland">Nagaland</SelectItem>
                  <SelectItem value="odisha">Odisha</SelectItem>
                  <SelectItem value="punjab">Punjab</SelectItem>
                  <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="sikkim">Sikkim</SelectItem>
                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="telangana">Telangana</SelectItem>
                  <SelectItem value="tripura">Tripura</SelectItem>
                  <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                  <SelectItem value="west-bengal">West Bengal</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="jammu-kashmir">Jammu and Kashmir</SelectItem>
                  <SelectItem value="ladakh">Ladakh</SelectItem>
                  <SelectItem value="puducherry">Puducherry</SelectItem>
                  <SelectItem value="chandigarh">Chandigarh</SelectItem>
                  <SelectItem value="andaman-nicobar">Andaman and Nicobar Islands</SelectItem>
                  <SelectItem value="dadra-nagar-haveli">Dadra and Nagar Haveli and Daman and Diu</SelectItem>
                  <SelectItem value="lakshadweep">Lakshadweep</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">PIN Code</Label>
            <Input
              id="pincode"
              name="pincode"
              placeholder="6-digit PIN code"
              value={formData.pincode}
              onChange={handleInputChange}
              required
              maxLength={6}
            />
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-6">
          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
            {isLoading ? "Saving..." : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )

  const renderVerificationStep = () => (
    <form onSubmit={handleSubmitVerification}>
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1 p-0 mb-4">
          <CardTitle className="text-2xl font-bold">Identity Verification</CardTitle>
          <CardDescription>We need to verify your identity to proceed</CardDescription>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aadharNumber">Aadhaar Number</Label>
            <Input
              id="aadharNumber"
              name="aadharNumber"
              placeholder="12-digit Aadhaar number"
              value={formData.aadharNumber}
              onChange={handleInputChange}
              required
              maxLength={12}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="panNumber">PAN Number</Label>
            <Input
              id="panNumber"
              name="panNumber"
              placeholder="10-character PAN number"
              value={formData.panNumber}
              onChange={handleInputChange}
              required
              maxLength={10}
            />
          </div>
          <div className="space-y-2">
            <Label>Upload Aadhaar Card</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">PDF, JPG or PNG (Max 2MB)</p>
              <Input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" id="aadharUpload" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => document.getElementById("aadharUpload")?.click()}
              >
                Select File
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Upload PAN Card</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">PDF, JPG or PNG (Max 2MB)</p>
              <Input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" id="panUpload" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => document.getElementById("panUpload")?.click()}
              >
                Select File
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-6">
          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )

  const renderExperienceStep = () => (
    <form onSubmit={handleSubmitExperience}>
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1 p-0 mb-4">
          <CardTitle className="text-2xl font-bold">Professional Experience</CardTitle>
          <CardDescription>Tell us about your professional background</CardDescription>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profession">Current Profession</Label>
            <Select value={formData.profession} onValueChange={(value) => handleSelectChange("profession", value)}>
              <SelectTrigger id="profession">
                <SelectValue placeholder="Select profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salon-owner">Salon Owner</SelectItem>
                <SelectItem value="beauty-professional">Beauty Professional</SelectItem>
                <SelectItem value="sales-professional">Sales Professional</SelectItem>
                <SelectItem value="marketing-professional">Marketing Professional</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience in Beauty/Salon Industry</Label>
            <Textarea
              id="experience"
              name="experience"
              placeholder="Tell us about your experience in the beauty/salon industry"
              value={formData.experience}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="referralCode">Referral Code (Optional)</Label>
            <Input
              id="referralCode"
              name="referralCode"
              placeholder="Enter referral code if you have one"
              value={formData.referralCode}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-6">
          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Complete Registration"}
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
          Your application has been submitted successfully. We'll review your details and get back to you within 24-48
          hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4 mt-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{formData.name}</p>
                <p className="text-sm text-gray-500">{formData.email}</p>
                <p className="text-sm text-gray-500">{formData.phone}</p>
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                Pending Approval
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Our team will review your application and verify your documents</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>You'll receive an email with your agent ID and login credentials</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>Complete the online training to understand how to onboard businesses</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>Start onboarding businesses and earn commissions!</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0 mt-6 flex flex-col space-y-3">
        <Button onClick={handleCompleteRegistration} className="w-full bg-rose-600 hover:bg-rose-700">
          Go to Dashboard
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={() => router.push("/")} className="w-full">
          Back to Home
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/">
            <div className="flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <TrimlyLogo size="sm" />
            </div>
          </Link>
          <div className="text-sm text-gray-500">
            {step === "personal" && "Step 1 of 3"}
            {step === "verification" && "Step 2 of 3"}
            {step === "experience" && "Step 3 of 3"}
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
              width: step === "personal" ? "33%" : step === "verification" ? "66%" : "100%",
            }}
          ></div>
        </div>

        {/* Step Content */}
        {step === "personal" && renderPersonalInfoStep()}
        {step === "verification" && renderVerificationStep()}
        {step === "experience" && renderExperienceStep()}
        {step === "success" && renderSuccessStep()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@trimly.com</p>
        </div>
      </footer>
    </div>
  )
}
