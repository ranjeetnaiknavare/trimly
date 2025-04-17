import Link from "next/link"
import { CheckCircle, Calendar, MapPin, Clock, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookingConfirmationPage({ params }: { params: { slug: string } }) {
  // In a real app, this would fetch the booking details from an API
  // For demo purposes, we're using mock data
  const bookingDetails = {
    id: "BK12345",
    salonName: "Royal Gents Salon",
    salonLocation: "Shop 7, Mayur Complex, Kothrud, Pune",
    date: "Wed, 10 Aug",
    time: "2:30 PM",
    services: ["Haircut", "Beard Trim"],
    totalAmount: 400,
    bookingType: "appointment", // or "queue"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
            <p className="text-gray-600 mt-2">
              Your booking has been successfully confirmed. We've sent you a confirmation notification.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-100 p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Booking Details</h2>
              <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full">#{bookingDetails.id}</span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{bookingDetails.salonName}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{bookingDetails.salonLocation}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-start">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-gray-600">{bookingDetails.date}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-gray-600">{bookingDetails.time}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Services</p>
                <ul className="mt-1 space-y-1">
                  {bookingDetails.services.map((service, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>₹{bookingDetails.totalAmount}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Pay at venue</p>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 rounded-lg p-4 mb-8">
            <h3 className="font-medium text-rose-700 mb-2">Important Information</h3>
            <ul className="text-sm text-rose-600 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Please arrive 5 minutes before your scheduled time.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You can cancel or reschedule up to 1 hour before your appointment.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Payment will be made directly at the salon after your service.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link href={`/salon/${params.slug}`}>
              <Button variant="outline" className="w-full">
                View Salon Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full bg-rose-600 hover:bg-rose-700">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
