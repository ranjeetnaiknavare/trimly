"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BusinessBasicInfoForm } from "@/components/business/basic-info-form"
import { BusinessLocationForm } from "@/components/business/location-form"
import { BusinessHoursForm } from "@/components/business/hours-form"
import { BusinessServicesForm } from "@/components/business/services-form"
import { BusinessPhotosForm } from "@/components/business/photos-form"
import { BusinessOwnerForm } from "@/components/business/owner-form"
import { BusinessReviewForm } from "@/components/business/review-form"
import { TrimlyLogo } from "@/components/trimly-logo"

export default function BusinessRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    businessName: "",
    businessType: "",
    businessEmail: "", // Now optional
    businessPhone: "", // Primary identifier
    description: "",

    // Location
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",

    // Hours
    hours: {
      monday: { open: "10:00", close: "20:00", isOpen: true },
      tuesday: { open: "10:00", close: "20:00", isOpen: true },
      wednesday: { open: "10:00", close: "20:00", isOpen: true },
      thursday: { open: "10:00", close: "20:00", isOpen: true },
      friday: { open: "10:00", close: "20:00", isOpen: true },
      saturday: { open: "10:00", close: "20:00", isOpen: true },
      sunday: { open: "10:00", close: "18:00", isOpen: true },
    },

    // Services
    services: [{ id: "1", name: "Haircut", description: "Basic haircut service", price: 250, duration: 30 }],

    // Photos
    photos: [],

    // Owner Info
    ownerName: "",
    ownerEmail: "", // Now optional
    ownerPhone: "", // Primary identifier
    password: "",
    confirmPassword: "",
    otpVerified: false, // New field to track OTP verification
  })

  // Reduced from 7 to 5 steps by consolidation
  const totalSteps = 5

  const updateFormData = (stepData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit the data to an API
    console.log("Form submitted:", formData)
    // Redirect to success page
    window.location.href = "/business/register/success"
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        // Combined Business Information and Location
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Business Information</h3>
              <BusinessBasicInfoForm formData={formData} updateFormData={updateFormData} />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Business Location</h3>
              <BusinessLocationForm formData={formData} updateFormData={updateFormData} />
            </div>
          </div>
        )
      case 2:
        // Business Hours remains as is
        return <BusinessHoursForm formData={formData} updateFormData={updateFormData} />
      case 3:
        // Combined Services and Photos
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Services Offered</h3>
              <BusinessServicesForm formData={formData} updateFormData={updateFormData} />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Photos & Gallery</h3>
              <BusinessPhotosForm formData={formData} updateFormData={updateFormData} />
            </div>
          </div>
        )
      case 4:
        // Owner Information remains as is
        return <BusinessOwnerForm formData={formData} updateFormData={updateFormData} />
      case 5:
        // Review & Submit remains as is
        return <BusinessReviewForm formData={formData} />
      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Business Details"
      case 2:
        return "Business Hours"
      case 3:
        return "Services & Photos"
      case 4:
        return "Owner Information"
      case 5:
        return "Review & Submit"
      default:
        return ""
    }
  }

  const isStepValid = () => {
    // Updated validation to make email optional and require phone
    switch (currentStep) {
      case 1:
        return (
          !!formData.businessName &&
          !!formData.businessType &&
          !!formData.businessPhone &&
          !!formData.address &&
          !!formData.city &&
          !!formData.pincode
        )
      case 2:
        return true // Hours are pre-filled
      case 3:
        return formData.services.length > 0
      case 4:
        return (
          !!formData.ownerName &&
          !!formData.ownerPhone &&
          !!formData.password &&
          formData.password === formData.confirmPassword
        )
      default:
        return true
    }
  }

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
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{getStepTitle()}</h1>
          <p className="text-gray-600">
            {currentStep === totalSteps
              ? "Please review your information before submitting."
              : "Please fill in the required information to continue."}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div
            className="bg-rose-600 h-2.5 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={currentStep === 1 ? "invisible" : ""}
          >
            Previous
          </Button>
          {currentStep < totalSteps ? (
            <Button onClick={handleNext} disabled={!isStepValid()} className="bg-rose-600 hover:bg-rose-700">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-rose-600 hover:bg-rose-700">
              Submit Registration
            </Button>
          )}
        </div>
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
