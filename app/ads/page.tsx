"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNav } from "@/components/bottom-nav"
import { TrimlyLogo } from "@/components/trimly-logo"
import { ArrowLeft, Check, Tag, BarChart3, Target, Globe } from "lucide-react"

export default function AdsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back</span>
          </Link>
          <div className="mx-auto">
            <TrimlyLogo size="sm" />
          </div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Advertise on Trimly</h1>
          <p className="text-gray-600 mt-1">Reach local customers with targeted hyperlocal ads</p>
        </div>

        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <Tag className="h-16 w-16" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Boost Your Local Business</h2>
                  <p className="text-white/90">
                    Trimly's hyperlocal ads help you reach customers in your area who are actively looking for services
                    like yours. Get started today with our simple, affordable ad platform.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/advertiser/register">
                      <Button className="bg-white text-purple-600 hover:bg-gray-100">Create Advertiser Account</Button>
                    </Link>
                    <Link href="/advertiser/login">
                      <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>1. Create Your Ad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Design your ad with a compelling banner image and message. Choose your target URL where customers will
                  be directed.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>2. Select Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Choose how long you want your ad to run - daily, weekly, or monthly. Pay upfront for your selected
                  duration.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>3. Track Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor your ad's performance with real-time metrics. See impressions, clicks, and conversion rates to
                  optimize your campaigns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Pricing Plans</h2>
          <Tabs defaultValue="daily">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Plan</CardTitle>
                  <CardDescription>Perfect for short promotions and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    ₹199<span className="text-lg font-normal">/day</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>24-hour ad display</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Hyperlocal targeting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Performance tracking</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/advertiser/register" className="w-full">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Plan</CardTitle>
                  <CardDescription>Great for seasonal promotions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    ₹999<span className="text-lg font-normal">/week</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>7-day ad display</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Hyperlocal targeting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Performance tracking</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>15% savings compared to daily plan</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/advertiser/register" className="w-full">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Plan</CardTitle>
                  <CardDescription>Best value for consistent advertising</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    ₹2,999<span className="text-lg font-normal">/month</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>30-day ad display</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Hyperlocal targeting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Advanced performance tracking</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>50% savings compared to daily plan</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Priority placement</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/advertiser/register" className="w-full">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Ad Placement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Home Page</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Your ad will be displayed prominently on the Trimly home page, reaching users as soon as they open the
                  app.
                </p>
                <div className="bg-gray-200 h-40 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Home Page Ad Placement</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Booking Confirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Reach users right after they complete a booking, when they're most engaged with related services.
                </p>
                <div className="bg-gray-200 h-40 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Booking Confirmation Ad Placement</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Ready to Grow Your Business?</CardTitle>
              <CardDescription>Create an advertiser account to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Join thousands of local businesses already advertising on Trimly. Our simple ad platform makes it easy
                to reach customers in your area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/advertiser/register" className="flex-1">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700">Create Advertiser Account</Button>
                </Link>
                <Link href="/advertiser/login" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav active="ads" />
    </div>
  )
}
