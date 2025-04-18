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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, ArrowRight } from "lucide-react"

export default function AdvertiserRegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(0)

  const { register } = useAuth()
  const router = useRouter()

  const validatePhoneNumber = (phone: string): boolean => {
    // Check if phone is exactly 10 digits
    return /^\d{10}$/.test(phone)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Remove non-digits
    if (value.length <= 10) {
      setPhone(value)
    }
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !phone) {
      setError("Please fill in all required fields")
      return
    }

    if (!validatePhoneNumber(phone)) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    // Simulate sending OTP
    setIsVerifying(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsVerifying(false)
    setStep(2)

    // Start timer for 60 seconds
    setTimer(60)
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (value && !/^\d+$/.test(value)) {
      return
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

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handleResendOTP = async () => {
    if (timer > 0) return

    setIsResending(true)
    // Simulate resending OTP
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsResending(false)

    // Reset timer
    setTimer(60)
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
  }

  const handleVerifyOTP = async () => {
    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setIsVerifying(true)
    // Simulate verifying OTP
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsVerifying(false)

    // Move to next step if OTP is correct (for demo, any 6-digit OTP is accepted)
    if (otpValue.length === 6) {
      setStep(3)
    } else {
      setError("Invalid OTP. Please try again.")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!password || !confirmPassword) {
      setError("Please fill in all required fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    // In a real app, this would register the user with the provided details
    const success = await register(name, phone, "advertiser", email)

    if (success) {
      setSuccess("Account created successfully! Redirecting to dashboard...")
      setTimeout(() => {
        router.push("/advertiser/dashboard")
      }, 2000)
    } else {
      setError("Phone number already in use")
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12 space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <TrimlyLogo className="h-12 w-auto" />
        <h1 className="text-2xl font-bold">Create Advertiser Account</h1>
        <p className="text-muted-foreground">Register to start advertising on Trimly</p>
      </div>

      <div className="w-full max-w-md">
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

          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Business Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Your Business Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-rose-500 focus-within:border-rose-500">
                  <div className="px-3 py-2 bg-gray-50 text-gray-500 border-r rounded-l-md">+91</div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    maxLength={10}
                  />
                </div>
                <p className="text-xs text-muted-foreground">We'll send a verification code to this number</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-gray-400">(Optional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isVerifying}>
                {isVerifying ? "Sending OTP..." : "Continue"}
                {!isVerifying && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-medium">Verify Your Phone Number</h2>
                <p className="text-sm text-gray-500 mt-1">
                  We've sent a 6-digit code to +91 {phone.replace(/(\d{5})(\d{5})/, "$1 $2")}
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Didn't receive the code?{" "}
                  {timer > 0 ? (
                    <span>Resend in {timer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-rose-600 hover:underline"
                      disabled={isResending}
                    >
                      {isResending ? "Resending..." : "Resend OTP"}
                    </button>
                  )}
                </p>
              </div>

              <Button
                onClick={handleVerifyOTP}
                className="w-full bg-rose-600 hover:bg-rose-700"
                disabled={otp.join("").length !== 6 || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify & Continue"}
              </Button>

              <Button variant="outline" onClick={() => setStep(1)} className="w-full" disabled={isVerifying}>
                Back
              </Button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                Create Account
              </Button>

              <Button variant="outline" onClick={() => setStep(2)} className="w-full">
                Back
              </Button>
            </form>
          )}

          <div className="mt-4 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link href="/advertiser/login" className="text-rose-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
