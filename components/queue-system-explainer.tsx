import { Clock, Users, Bell, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function QueueSystemExplainer() {
  const steps = [
    {
      icon: <Clock className="h-8 w-8 text-rose-600" />,
      title: "Join Remotely",
      description:
        "Customers can join the queue from anywhere using their phone, without having to wait at your salon.",
    },
    {
      icon: <Users className="h-8 w-8 text-rose-600" />,
      title: "Real-time Updates",
      description: "Customers can see their position in the queue and estimated wait time in real-time.",
    },
    {
      icon: <Bell className="h-8 w-8 text-rose-600" />,
      title: "Smart Notifications",
      description: "Customers receive notifications as they move up in the queue, so they can arrive just in time.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-rose-600" />,
      title: "Efficient Service",
      description: "Salon staff can see who's next and prepare accordingly, reducing wait times and improving service.",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">How Our Virtual Queue System Works</h2>
        <p className="text-gray-600">
          Our innovative queue management system helps salons reduce wait times and improve customer satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex">
              <div className="mr-4 flex-shrink-0">{step.icon}</div>
              <div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-rose-50 p-4 rounded-lg">
        <div className="flex items-start">
          <div className="mr-4 flex-shrink-0 bg-rose-100 p-2 rounded-full">
            <ArrowRight className="h-6 w-6 text-rose-600" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Benefits for Your Business</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Reduce crowding in your waiting area</li>
              <li>• Improve customer satisfaction with transparent wait times</li>
              <li>• Optimize staff scheduling based on queue data</li>
              <li>• Collect valuable customer data for marketing</li>
              <li>• Reduce no-shows and late arrivals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
