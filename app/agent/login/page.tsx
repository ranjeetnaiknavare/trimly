"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { TrimlyLogo } from "@/components/trimly-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/auth-context"

export default function AgentLoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  const handleSendOTP = () => {
    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    setError("")
    setOtpSent(true)
    // In a real app, this would send an OTP to the phone number
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!phone || (!password && !otp)) {
      setError("Please fill all required fields")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would validate credentials with the backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Login the user as an agent
      await login(phone, "agent")

      router.push("/agent/dashboard")
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
          <div className="text-sm text-gray-500">Agent Login</div>
        </div>
      </header>

      <main className="flex-1 container max-w-md mx-auto px-4 py-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Agent Login</CardTitle>
            <CardDescription>Enter your credentials to access your agent dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-rose-500 focus-within:border-rose-500">
                  <div className="px-3 py-2 bg-gray-50 text-gray-500 border-r rounded-l-md">+91</div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      if (value.length <= 10) {
                        setPhone(value)
                      }
                    }}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              {!otpSent ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/agent/forgot-password" className="text-xs text-rose-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="button" onClick={handleSendOTP} className="text-sm text-rose-600 hover:underline">
                      Login with OTP instead
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="otp">One-Time Password (OTP)</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      if (value.length <= 6) {
                        setOtp(value)
                      }
                    }}
                    maxLength={6}
                    required
                  />
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-sm text-rose-600 hover:underline"
                    >
                      Login with password instead
                    </button>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don't have an agent account?{" "}
              <Link href="/agent/register" className="text-rose-600 hover:underline">
                Register now
              </Link>
            </div>
          </CardFooter>
        </Card>
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
