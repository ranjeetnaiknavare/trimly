import Link from "next/link"
import { ArrowRight, Check, Calendar, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrimlyLogo } from "@/components/trimly-logo"

export default function BusinessLandingPage() {
  const benefits = [
    {
      icon: <Calendar className="h-8 w-8 text-rose-600" />,
      title: "Appointment Management",
      description: "Easily manage all your appointments in one place. No more double bookings or scheduling conflicts.",
    },
    {
      icon: <Clock className="h-8 w-8 text-rose-600" />,
      title: "Virtual Queue System",
      description: "Reduce wait times and improve customer satisfaction with our virtual queue management system.",
    },
    {
      icon: <Users className="h-8 w-8 text-rose-600" />,
      title: "Customer Engagement",
      description:
        "Build stronger relationships with your customers through reviews, ratings, and personalized offers.",
    },
  ]

  const testimonials = [
    {
      quote:
        "Since joining Trimly, our salon has seen a 30% increase in bookings. The virtual queue system has completely transformed how we manage walk-ins.",
      author: "Priya Sharma",
      business: "Elegance Beauty Salon",
      location: "Kothrud, Pune",
    },
    {
      quote:
        "The appointment management system is incredibly easy to use. My staff picked it up in minutes, and our customers love the convenience.",
      author: "Rajesh Patel",
      business: "Royal Gents Salon",
      location: "Aundh, Pune",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/">
            <TrimlyLogo />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/business/login">
              <Button variant="ghost" className="text-rose-600">
                Login
              </Button>
            </Link>
            <Link href="/business/register">
              <Button className="bg-rose-600 hover:bg-rose-700">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-50 to-rose-100 py-12 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Grow Your Salon Business with Trimly's All-in-One Management Platform
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Join thousands of salons, parlours, and spas using Trimly to streamline bookings, manage queues, and
              delight customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/business/register">
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700 w-full sm:w-auto">
                  Register Your Business
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#learn-more">
                <Button size="lg" variant="outline" className="border-rose-200 text-rose-600 w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="learn-more" className="py-12 px-4 bg-white">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Why Join Trimly?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Everything You Need to Succeed</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <p>Online appointment booking</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <p>Virtual queue management</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <p>Staff scheduling and management</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <p>Customer database and history</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <p>Inventory management</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <p>Reporting and analytics</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <p>Marketing tools and promotions</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <p>Customer reviews and ratings</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 px-4 bg-white">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">What Our Partners Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.business}, {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 mb-8">
              No hidden fees. No long-term contracts. Start growing your business today.
            </p>
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
              <div className="flex justify-center mb-4">
                <div className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium">Most Popular</div>
              </div>
              <h3 className="text-xl font-bold mb-2">Standard Plan</h3>
              <div className="text-3xl font-bold mb-1">
                ₹999<span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Everything you need to manage your salon business</p>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Unlimited appointments</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Virtual queue management</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Up to 5 staff members</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Customer database</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Basic reporting</span>
                </li>
              </ul>
              <Link href="/business/register">
                <Button className="w-full bg-rose-600 hover:bg-rose-700">Get Started</Button>
              </Link>
              <p className="text-xs text-gray-500 mt-4">
                *First month free. No credit card required to start your trial.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-gradient-to-br from-rose-600 to-rose-700 text-white">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Salon Business?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of salon owners who are growing their business with Trimly.
            </p>
            <Link href="/business/register">
              <Button size="lg" variant="secondary" className="bg-white text-rose-600 hover:bg-gray-100">
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">Trimly</h3>
              <p className="max-w-xs">
                The all-in-one platform for salons, parlours, and spas to manage bookings, queues, and customer
                relationships.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/business" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/business/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/business/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/business/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-400">
            <p>&copy; 2023 Trimly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
