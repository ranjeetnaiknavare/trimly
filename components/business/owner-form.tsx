"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface BusinessOwnerFormProps {
  formData: {
    ownerName: string
    ownerEmail: string
    ownerPhone: string
    password: string
    confirmPassword: string
  }
  updateFormData: (data: Partial<BusinessOwnerFormProps["formData"]>) => void
}

export function BusinessOwnerForm({ formData, updateFormData }: BusinessOwnerFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const passwordsMatch = formData.password === formData.confirmPassword
  const passwordStrength = getPasswordStrength(formData.password)

  function getPasswordStrength(password: string): "weak" | "medium" | "strong" {
    if (!password) return "weak"
    if (password.length < 8) return "weak"
    if (
      password.length >= 12 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return "strong"
    }
    return "medium"
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="ownerName">Your Name *</Label>
        <Input
          id="ownerName"
          value={formData.ownerName}
          onChange={(e) => updateFormData({ ownerName: e.target.value })}
          placeholder="e.g. Rahul Sharma"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerEmail">Your Email *</Label>
        <Input
          id="ownerEmail"
          type="email"
          value={formData.ownerEmail}
          onChange={(e) => updateFormData({ ownerEmail: e.target.value })}
          placeholder="e.g. rahul@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerPhone">Your Phone *</Label>
        <Input
          id="ownerPhone"
          type="tel"
          value={formData.ownerPhone}
          onChange={(e) => updateFormData({ ownerPhone: e.target.value })}
          placeholder="e.g. +91 98765 43210"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Create Password *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            placeholder="••••••••"
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
        {formData.password && (
          <div className="mt-1">
            <div className="flex items-center space-x-2">
              <div className="h-1 flex-1 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full ${
                    passwordStrength === "weak"
                      ? "w-1/3 bg-red-500"
                      : passwordStrength === "medium"
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-green-500"
                  }`}
                ></div>
              </div>
              <span className="text-xs text-gray-500 capitalize">{passwordStrength}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Use at least 8 characters with a mix of letters, numbers & symbols
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {formData.confirmPassword && !passwordsMatch && (
          <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
        )}
      </div>

      <div className="flex items-start space-x-2 pt-2">
        <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="terms" className="text-sm font-normal leading-snug text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-rose-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-rose-600 hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
      </div>
    </div>
  )
}
