"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrimlyLogo } from "@/components/trimly-logo"

export default function BusinessLoginPage() {
  // Phone login state
  const [phone, setPhone] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  // Password login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Common state
  const [rememberMe, setRememberMe] = useState(false)

  const handleSendOTP = () => {
    // In a real app, this would send an OTP to the phone number
    setOtpSent(true)
    // Mock OTP for demo
    console.log("OTP sent to", phone)
  }

  const handleOTPLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would verify the OTP and log in
    console.log("OTP login attempt with:", { phone, otp, rememberMe })
    // Redirect to dashboard on success
    window.location.href = "/business/dashboard"
  }

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would authenticate with an API
    console.log("Password login attempt with:", { email, password, rememberMe })
    // Redirect to dashboard on success
    window.location.href = "/business/dashboard"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container flex items-center h-16 px-4">
          <Link href="/business">
            <div className="flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <TrimlyLogo size="sm" />
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 container max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Business Login</h1>

          <Tabs defaultValue="phone" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="phone">Phone OTP</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="phone">
              <form onSubmit={handleOTPLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={!phone || otpSent}
                        variant="outline"
                        className="whitespace-nowrap"
                      >
                        {otpSent ? "Resend" : "Send OTP"}
                      </Button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-phone"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember-phone" className="text-sm">
                      Remember me
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={!otpSent || !otp}>
                    Login
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="password">
              <form onSubmit={handlePasswordLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Phone or Email</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="Phone number or email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-password"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember-password" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link href="/business/forgot-password" className="text-sm text-rose-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                    Login
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/business/register" className="text-rose-600 hover:underline">
                Register your business
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@trimly.com</p>
        </div>
      </footer>
    </div>
  )
}
