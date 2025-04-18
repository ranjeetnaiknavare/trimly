import Link from "next/link"
import { ArrowLeft, Gift, Share2, BarChart3, Percent, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrimlyLogo } from "@/components/trimly-logo"

export default function CouponsExplainedPage() {
  const steps = [
    {
      icon: <Percent className="h-10 w-10 text-rose-600" />,
      title: "Create Coupons",
      description:
        "Design custom coupons with flexible discount types, validity periods, and usage limits to match your marketing strategy.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-rose-600" />,
      title: "Share & Promote",
      description:
        "Share coupon codes through your social media, email newsletters, or in-store promotions to attract new customers and reward loyal ones.",
    },
    {
      icon: <Users className="h-10 w-10 text-rose-600" />,
      title: "Customer Redemption",
      description:
        "Customers apply your coupon codes during booking, instantly seeing their discount applied to their service.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-rose-600" />,
      title: "Track Performance",
      description: "Monitor coupon usage, redemption rates, and revenue impact through detailed analytics dashboards.",
    },
  ]

  const benefits = [
    {
      title: "Attract New Customers",
      description: "First-time visitor discounts can bring new clients through your door.",
    },
    {
      title: "Boost Slow Periods",
      description: "Create time-specific coupons to fill appointment slots during typically slow hours or days.",
    },
    {
      title: "Reward Loyalty",
      description: "Offer exclusive discounts to repeat customers to encourage continued patronage.",
    },
    {
      title: "Promote New Services",
      description: "Introduce new treatments or services with special promotional pricing.",
    },
    {
      title: "Seasonal Campaigns",
      description: "Create holiday or seasonal promotions to capitalize on peak demand periods.",
    },
    {
      title: "Measure Marketing ROI",
      description: "Track which promotions drive the most bookings and revenue.",
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
          <div className="container max-w-4xl mx-auto">
            <Link href="/business" className="inline-flex items-center text-rose-600 mb-6 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Business Home
            </Link>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Grow Your Business with Trimly's Coupon System
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Create, share, and track promotional offers that attract new customers and keep them coming back.
                </p>
                <Link href="/business/register">
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-64 bg-white rounded-full p-4 shadow-lg flex items-center justify-center">
                  <Gift className="h-32 w-32 text-rose-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 px-4 bg-white">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">How Our Coupon System Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-rose-50 rounded-full p-4 mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute transform translate-x-32 mt-10">
                      <div className="w-12 h-0.5 bg-gray-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coupon Types */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Flexible Coupon Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <Percent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Percentage Discounts</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Offer a percentage off the total service price. Perfect for high-value services or to encourage
                    larger bookings.
                  </p>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="font-medium">Example: 20% off any service over ₹1000</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Fixed Amount Discounts</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Provide a specific rupee amount off the service price. Great for promoting specific services or
                    first-time customer offers.
                  </p>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="font-medium">Example: ₹200 off your first haircut</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 px-4 bg-white">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Boost Your Business with Strategic Promotions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analytics */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Measure Your Success</h2>
                <p className="text-gray-700 mb-6">
                  Our detailed analytics dashboard helps you track coupon performance, understand customer behavior, and
                  optimize your marketing strategy.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          className="h-4 w-4 text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p>Track redemption rates and revenue impact</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          className="h-4 w-4 text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p>Identify your most effective promotions</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          className="h-4 w-4 text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p>Understand customer acquisition costs</p>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-gradient-to-br from-rose-600 to-rose-700 text-white">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Business with Smart Promotions?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of salon owners who are growing their business with Trimly's coupon system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/business/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-rose-600 hover:bg-gray-100 w-full sm:w-auto"
                >
                  Register Now
                </Button>
              </Link>
              <Link href="/business">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-rose-500 w-full sm:w-auto"
                >
                  Learn More About Trimly
                </Button>
              </Link>
            </div>
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
