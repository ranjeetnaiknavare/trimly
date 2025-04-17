import { Clock, Calendar, Users, MapPin } from "lucide-react"

interface BookingSummaryProps {
  salon: {
    name: string
    location: string
    services: Array<{
      id: string
      name: string
      description: string
      price: number
      duration: number
      popular?: boolean
    }>
    familyMembers: Array<{
      id: string
      name: string
      relation: string
      selected?: boolean
    }>
  }
  selectedServices: string[]
  bookingType: "queue" | "appointment"
  date: string | null
  time: string | null
  familyMembers: string[]
  totalAmount: number
  totalDuration: number
}

export function BookingSummary({
  salon,
  selectedServices,
  bookingType,
  date,
  time,
  familyMembers,
  totalAmount,
  totalDuration,
}: BookingSummaryProps) {
  // Get service names and details
  const serviceDetails = selectedServices
    .map((id) => {
      const service = salon.services.find((s) => s.id === id)
      return service
        ? {
            name: service.name,
            duration: service.duration,
            price: service.price,
          }
        : null
    })
    .filter(Boolean)

  // Get family member names
  const memberNames = familyMembers
    .map((id) => {
      const member = salon.familyMembers.find((m) => m.id === id)
      return member?.name || ""
    })
    .filter(Boolean)

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-100 p-4">
        <h3 className="font-medium text-lg">{salon.name}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{salon.location}</span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between">
            <div className="flex items-start">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
              <div>
                <p className="text-sm font-medium">Booking Type</p>
                <p className="text-sm text-gray-600">{bookingType === "queue" ? "Join Queue" : "Appointment"}</p>
              </div>
            </div>
            {bookingType === "appointment" && date && time && (
              <div className="flex items-start">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm text-gray-600">
                    {date}, {time}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <div className="flex items-start">
              <Users className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
              <div>
                <p className="text-sm font-medium">For</p>
                <p className="text-sm text-gray-600">{memberNames.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-4">
        <h3 className="font-medium mb-2">Services</h3>
        <div className="space-y-2">
          {serviceDetails.map((service, index) => (
            <div key={index} className="flex justify-between text-sm">
              <div>
                <p>{service?.name}</p>
                <p className="text-xs text-gray-500">{service?.duration} min</p>
              </div>
              <p>₹{service?.price}</p>
            </div>
          ))}

          <div className="border-t border-gray-100 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <p>Total</p>
              <p>₹{totalAmount}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">Total duration: {totalDuration} min</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-4">
        <h3 className="font-medium mb-2">Payment</h3>
        <p className="text-sm text-gray-600">
          Payment will be made directly at the salon after your service is complete.
        </p>
      </div>
    </div>
  )
}
