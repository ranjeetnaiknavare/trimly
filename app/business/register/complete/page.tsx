"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrimlyLogo } from "@/components/trimly-logo"
import { BusinessBasicInfoForm } from "@/components/business/basic-info-form"
import { BusinessHoursForm } from "@/components/business/hours-form"
import { BusinessServicesForm } from "@/components/business/services-form"
import { BusinessPhotosForm } from "@/components/business/photos-form"

export default function CompleteRegistrationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info (some already collected)
    businessName: "Royal Gents Salon", // Example pre-filled data
    businessType: "",
    businessEmail: "",
    businessPhone: "9876543210", // Example pre-filled data
    description: "",

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
  })

  const totalSteps = 3

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
    // Redirect to dashboard
    router.push("/business/dashboard")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">Business Information</h3>
            <BusinessBasicInfoForm formData={formData} updateFormData={updateFormData} />
          </div>
        )
      case 2:
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">Business Hours</h3>
            <BusinessHoursForm formData={formData} updateFormData={updateFormData} />
          </div>
        )
      case 3:
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
      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Complete Business Details"
      case 2:
        return "Set Business Hours"
      case 3:
        return "Add Services & Photos"
      default:
        return ""
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Add more details about your business to help customers find you."
      case 2:
        return "Let customers know when you're open for business."
      case 3:
        return "Add services and photos to showcase your business."
      default:
        return ""
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!formData.businessName && !!formData.businessType && !!formData.businessPhone
      case 2:
        return true // Hours are pre-filled
      case 3:
        return formData.services.length > 0
      default:
        return true
    }
  }

  const isStepCompleted = (step: number) => {
    switch (step) {
      case 1:
        return !!formData.businessName && !!formData.businessType && !!formData.businessPhone
      case 2:
        return true // Hours are pre-filled
      case 3:
        return formData.services.length > 0
      default:
        return false
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/business/dashboard">
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
          <p className="text-gray-600">{getStepDescription()}</p>
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-between mb-8">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep > index + 1 || isStepCompleted(index + 1)
                    ? "bg-green-500 text-white"
                    : currentStep === index + 1
                      ? "bg-rose-600 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > index + 1 || isStepCompleted(index + 1) ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`w-12 h-1 mx-1 ${
                    currentStep > index + 1 || isStepCompleted(index + 1) ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
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
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-rose-600 hover:bg-rose-700">
              Complete Setup
            </Button>
          )}
        </div>

        {/* Skip for now option */}
        <div className="text-center mt-6">
          <Button variant="link" onClick={() => router.push("/business/dashboard")} className="text-gray-500">
            Skip for now, I'll complete this later
          </Button>
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
