"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TrimlyLogo } from "@/components/trimly-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  // Phone login state
  const [phone, setPhone] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  // Email login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Registration state
  const [name, setName] = useState("")
  const [regPhone, setRegPhone] = useState("")
  const [regOtpSent, setRegOtpSent] = useState(false)
  const [regOtp, setRegOtp] = useState("")
  const [regEmail, setRegEmail] = useState("")

  // Common state
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { login, register } = useAuth()
  const router = useRouter()

  const handleSendOTP = () => {
    // In a real app, this would send an OTP to the phone number
    setOtpSent(true)
    // Mock OTP for demo
    console.log("OTP sent to", phone)
  }

  const handleSendRegOTP = () => {
    // In a real app, this would send an OTP to the phone number
    setRegOtpSent(true)
    // Mock OTP for demo
    console.log("Registration OTP sent to", regPhone)
  }

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!phone || !otp) {
      setError("Please fill in all fields")
      return
    }

    // In a real app, this would verify the OTP with the backend
    // For demo purposes, we'll just log in the user
    console.log("Phone login with:", { phone, otp })
    router.push("/")
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const success = await login(email, password, "customer")

    if (success) {
      router.push("/")
    } else {
      setError("Invalid email or password")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !regPhone || !regOtp) {
      setError("Please fill in all required fields")
      return
    }

    // In a real app, this would verify the OTP and register the user
    // For demo purposes, we'll just register the user with the provided details
    const success = await register(name, regEmail || `${regPhone}@example.com`, "password123", "customer")

    if (success) {
      setSuccess("Account created successfully! You can now log in.")
      setName("")
      setRegPhone("")
      setRegOtp("")
      setRegEmail("")
      setRegOtpSent(false)
    } else {
      setError("Phone number already in use")
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12 space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <TrimlyLogo className="h-12 w-auto" />
        <h1 className="text-2xl font-bold">Welcome to Trimly</h1>
        <p className="text-muted-foreground">Sign in to your account or create a new one</p>
      </div>

      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>

                <TabsContent value="phone">
                  <form onSubmit={handlePhoneLogin} className="space-y-4 mt-4">
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

                    <Button type="submit" className="w-full" disabled={!otpSent || !otp}>
                      Sign In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="email">
                  <form onSubmit={handleEmailLogin} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
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
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-4 text-center text-sm">
                <p>
                  Are you a salon owner?{" "}
                  <Link href="/business/login" className="text-primary hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register">
            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="reg-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleSendRegOTP}
                      disabled={!regPhone || regOtpSent}
                      variant="outline"
                      className="whitespace-nowrap"
                    >
                      {regOtpSent ? "Resend" : "Send OTP"}
                    </Button>
                  </div>
                </div>

                {regOtpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="reg-otp">
                      Enter OTP <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="reg-otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={regOtp}
                      onChange={(e) => setRegOtp(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email (Optional)</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="you@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll use this for sending receipts and important updates
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={!regOtpSent || !regOtp}>
                  Create Account
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <p>
                  Want to register your salon?{" "}
                  <Link href="/business/register" className="text-primary hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
