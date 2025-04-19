"use client"

import type React from "react"

import { useState } from "react"
import { AgentDashboardLayout } from "@/components/agent/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, CheckCircle, Upload } from "lucide-react"

export default function AgentProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Mock agent data
  const [agentData, setAgentData] = useState({
    id: "TRA-583921",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    address: "123 Main Street, Kothrud",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411038",
    aadharNumber: "XXXX XXXX 1234",
    panNumber: "ABCDE1234F",
    bankName: "HDFC Bank",
    accountNumber: "XXXX XXXX 5678",
    ifscCode: "HDFC0001234",
    accountHolderName: "Rahul Sharma",
    bio: "Experienced sales professional with 5+ years in the beauty and wellness industry.",
    joinDate: "June 15, 2023",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAgentData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setAgentData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    setIsEditing(false)
    setSuccessMessage("Profile updated successfully!")

    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <AgentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-gray-500">View and manage your agent profile</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-rose-600 hover:bg-rose-700">
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} className="bg-rose-600 hover:bg-rose-700" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>

        {successMessage && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="documents">Documents & KYC</TabsTrigger>
            <TabsTrigger value="bank">Bank Details</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${agentData.name}`} />
                      <AvatarFallback>{agentData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white p-1.5 rounded-full cursor-pointer">
                        <Camera className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div>
                      <p className="text-sm text-gray-500">Agent ID</p>
                      <p className="font-medium">{agentData.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Joined On</p>
                      <p>{agentData.joinDate}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={agentData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={agentData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-rose-500 focus-within:border-rose-500">
                      <div className="px-3 py-2 bg-gray-50 text-gray-500 border-r rounded-l-md">+91</div>
                      <Input
                        id="phone"
                        name="phone"
                        value={agentData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={agentData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={agentData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    {isEditing ? (
                      <Select value={agentData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="Karnataka">Karnataka</SelectItem>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                          <SelectItem value="Telangana">Telangana</SelectItem>
                          <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input id="state" name="state" value={agentData.state} disabled />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={agentData.pincode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={agentData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell us about yourself and your experience"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents & KYC</CardTitle>
                <CardDescription>Your identity verification documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber">Aadhaar Number</Label>
                    <Input id="aadharNumber" name="aadharNumber" value={agentData.aadharNumber} disabled />
                    <p className="text-xs text-gray-500">For security, only last 4 digits are shown</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number</Label>
                    <Input id="panNumber" name="panNumber" value={agentData.panNumber} disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Aadhaar Card</Label>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-md mr-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Aadhaar_Card.pdf</p>
                          <p className="text-xs text-gray-500">Uploaded on June 15, 2023</p>
                        </div>
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>PAN Card</Label>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-md mr-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">PAN_Card.pdf</p>
                          <p className="text-xs text-gray-500">Uploaded on June 15, 2023</p>
                        </div>
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-blue-800">
                    To update your KYC documents or correct information, please contact support at support@trimly.com
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>Your bank account information for commission payouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    {isEditing ? (
                      <Select
                        value={agentData.bankName}
                        onValueChange={(value) => handleSelectChange("bankName", value)}
                      >
                        <SelectTrigger id="bankName">
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                          <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                          <SelectItem value="State Bank of India">State Bank of India</SelectItem>
                          <SelectItem value="Axis Bank">Axis Bank</SelectItem>
                          <SelectItem value="Kotak Mahindra Bank">Kotak Mahindra Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input id="bankName" name="bankName" value={agentData.bankName} disabled />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" name="accountNumber" value={agentData.accountNumber} disabled />
                    <p className="text-xs text-gray-500">For security, only last 4 digits are shown</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input
                      id="ifscCode"
                      name="ifscCode"
                      value={agentData.ifscCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountHolderName">Account Holder Name</Label>
                    <Input
                      id="accountHolderName"
                      name="accountHolderName"
                      value={agentData.accountHolderName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bank Proof</Label>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-md mr-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Bank_Statement.pdf</p>
                          <p className="text-xs text-gray-500">Uploaded on June 15, 2023</p>
                        </div>
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-blue-800">
                    To update your bank account number, please contact support at support@trimly.com with proper
                    documentation
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  Commission payouts are processed on the last day of each month. Make sure your bank details are
                  accurate.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AgentDashboardLayout>
  )
}
