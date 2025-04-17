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
    businessEmail: "",
    businessPhone: "",
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
    ownerEmail: "",
    ownerPhone: "",
    password: "",
    confirmPassword: "",
  })

  const totalSteps = 7

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
        return <BusinessBasicInfoForm formData={formData} updateFormData={updateFormData} />
      case 2:
        return <BusinessLocationForm formData={formData} updateFormData={updateFormData} />
      case 3:
        return <BusinessHoursForm formData={formData} updateFormData={updateFormData} />
      case 4:
        return <BusinessServicesForm formData={formData} updateFormData={updateFormData} />
      case 5:
        return <BusinessPhotosForm formData={formData} updateFormData={updateFormData} />
      case 6:
        return <BusinessOwnerForm formData={formData} updateFormData={updateFormData} />
      case 7:
        return <BusinessReviewForm formData={formData} />
      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Business Information"
      case 2:
        return "Business Location"
      case 3:
        return "Business Hours"
      case 4:
        return "Services Offered"
      case 5:
        return "Photos & Gallery"
      case 6:
        return "Owner Information"
      case 7:
        return "Review & Submit"
      default:
        return ""
    }
  }

  const isStepValid = () => {
    // This is a simplified validation - in a real app, you'd have more comprehensive validation
    switch (currentStep) {
      case 1:
        return !!formData.businessName && !!formData.businessType && !!formData.businessEmail
      case 2:
        return !!formData.address && !!formData.city && !!formData.pincode
      case 3:
        return true // Hours are pre-filled
      case 4:
        return formData.services.length > 0
      case 5:
        return true // Photos are optional
      case 6:
        return (
          !!formData.ownerName &&
          !!formData.ownerEmail &&
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
