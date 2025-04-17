import Link from "next/link"
import { ArrowLeft, Clock, Star, CheckCircle, AlertCircle, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Mock notifications data
const notifications = [
  {
    id: "n1",
    type: "booking_confirmation",
    title: "Booking Confirmed",
    message: "Your appointment at Royal Gents Salon has been confirmed for Wed, 10 Aug at 2:30 PM.",
    time: "2 hours ago",
    read: false,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    link: "/bookings/BK12345",
  },
  {
    id: "n2",
    type: "reminder",
    title: "Upcoming Appointment",
    message: "Reminder: Your appointment at Royal Gents Salon is tomorrow at 2:30 PM.",
    time: "5 hours ago",
    read: false,
    icon: <Clock className="w-5 h-5 text-amber-500" />,
    link: "/bookings/BK12345",
  },
  {
    id: "n3",
    type: "offer",
    title: "Special Offer",
    message: "Get 20% off on all services at Sparsh Spa & Massage this weekend!",
    time: "1 day ago",
    read: true,
    icon: <Gift className="w-5 h-5 text-purple-500" />,
    link: "/salon/sparsh-spa-massage",
  },
  {
    id: "n4",
    type: "review_request",
    title: "Rate Your Experience",
    message: "How was your experience at Urban Hair Studio? Tap to leave a review.",
    time: "3 days ago",
    read: true,
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    link: "/bookings/BK12340",
  },
  {
    id: "n5",
    type: "cancellation",
    title: "Booking Cancelled",
    message: "Your appointment at Blush Ladies Parlour has been cancelled as requested.",
    time: "1 week ago",
    read: true,
    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    link: "/bookings/BK12338",
  },
]

export default function NotificationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-rose-600">Notifications</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Notifications</h2>
            <Button variant="ghost" size="sm" className="text-rose-600 h-8">
              Mark all as read
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <Link href={notification.link}>
                  <div className={`flex p-4 hover:bg-gray-50 ${!notification.read ? "bg-rose-50/30" : ""}`}>
                    <div className="flex-shrink-0 mr-3 mt-1">{notification.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className={`text-sm mt-1 ${!notification.read ? "text-gray-700" : "text-gray-500"}`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </Link>
                {index < notifications.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
