"use client"

import { CheckCircle } from "lucide-react"

interface BusinessHour {
  open: string
  close: string
  isOpen: boolean
}

interface BusinessHours {
  monday: BusinessHour
  tuesday: BusinessHour
  wednesday: BusinessHour
  thursday: BusinessHour
  friday: BusinessHour
  saturday: BusinessHour
  sunday: BusinessHour
}

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  popular?: boolean
}

interface BusinessReviewFormProps {
  formData: {
    businessName: string
    businessType: string
    businessEmail: string
    businessPhone: string
    description: string
    address: string
    city: string
    state: string
    pincode: string
    landmark: string
    hours: BusinessHours
    services: Service[]
    photos: string[]
    ownerName: string
    ownerEmail: string
    ownerPhone: string
  }
}

export function BusinessReviewForm({ formData }: BusinessReviewFormProps) {
  // Map business type value to label
  const getBusinessTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      mens_salon: "Men's Salon",
      ladies_parlour: "Ladies Parlour",
      unisex_salon: "Unisex Salon",
      spa: "Spa & Massage",
      hair_studio: "Hair Studio",
      beauty_lounge: "Beauty Lounge",
      nail_salon: "Nail Salon",
      barber_shop: "Barber Shop",
    }
    return types[type] || type
  }

  // Format time from 24h to 12h format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  return (
    <div className="space-y-8">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-green-800">Almost there!</h3>
          <p className="text-sm text-green-700 mt-1">
            Please review your business information below. Once submitted, our team will review your application and get
            back to you within 24-48 hours.
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Business Information</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Business Name</p>
              <p className="font-medium">{formData.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Business Type</p>
              <p className="font-medium">{getBusinessTypeLabel(formData.businessType)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Phone (Primary)</p>
              <p className="font-medium">{formData.businessPhone}</p>
            </div>
            {formData.businessEmail && (
              <div>
                <p className="text-sm text-gray-500">Email (Optional)</p>
                <p className="font-medium">{formData.businessEmail}</p>
              </div>
            )}
          </div>
          {formData.description && (
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-sm">{formData.description}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Location</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{formData.address}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{formData.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="font-medium">{formData.state}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">PIN Code</p>
              <p className="font-medium">{formData.pincode}</p>
            </div>
          </div>
          {formData.landmark && (
            <div>
              <p className="text-sm text-gray-500">Landmark</p>
              <p className="font-medium">{formData.landmark}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Business Hours</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            {Object.entries(formData.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="capitalize">{day}</span>
                <span>{hours.isOpen ? `${formatTime(hours.open)} - ${formatTime(hours.close)}` : "Closed"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Services ({formData.services.length})</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          {formData.services.length > 0 ? (
            <div className="space-y-3">
              {formData.services.map((service) => (
                <div key={service.id} className="border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      {service.description && <p className="text-sm text-gray-600">{service.description}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{service.price}</p>
                      <p className="text-xs text-gray-500">{service.duration} min</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No services added</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Photos ({formData.photos.length})</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          {formData.photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {formData.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt={`Business photo ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No photos uploaded</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Owner Information</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{formData.ownerName}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Phone (Primary)</p>
              <p className="font-medium">{formData.ownerPhone}</p>
            </div>
            {formData.ownerEmail && (
              <div>
                <p className="text-sm text-gray-500">Email (Optional)</p>
                <p className="font-medium">{formData.ownerEmail}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
