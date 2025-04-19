"use client"
import Link from "next/link"
import { ArrowLeft, Briefcase, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AgentPortalPage() {
  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <div className="flex items-center mb-6">
        <Link href="/jobs" className="mr-3">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Agent Portal</h1>
      </div>

      <Card className="mb-6 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-100">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-full">
              <Briefcase className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Become a Trimly Agent</h3>
              <p className="text-sm text-gray-600 mt-1">
                Earn money by helping salons and spas join the Trimly platform
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="about">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="apply">Apply</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">What is a Trimly Agent?</h2>
            <p className="text-gray-600">
              Trimly Agents help connect local salons and spas to the Trimly platform. As an agent, you'll earn
              commission for each business you successfully onboard.
            </p>

            <h2 className="text-lg font-medium">What You'll Do</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Identify and approach local salons and spas</li>
              <li>Explain the benefits of joining Trimly</li>
              <li>Help business owners complete the registration process</li>
              <li>Provide initial support to newly onboarded businesses</li>
              <li>Build relationships with salon owners in your area</li>
            </ul>

            <h2 className="text-lg font-medium">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Age 18+ years</li>
              <li>Valid ID proof (Aadhaar, PAN)</li>
              <li>Smartphone with internet access</li>
              <li>Good communication skills</li>
              <li>Basic understanding of the beauty and wellness industry (preferred)</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">How You'll Earn</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Base Commission</span>
                    <span className="text-green-600 font-medium">₹100</span>
                  </div>
                  <p className="text-sm text-gray-600">Per successful business onboarding</p>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-lg font-medium">Daily Bonuses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">5+ Onboardings</span>
                      <span className="text-green-600 font-medium">+₹100</span>
                    </div>
                    <p className="text-sm text-gray-600">Additional bonus for 5 or more onboardings in a single day</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">10+ Onboardings</span>
                      <span className="text-green-600 font-medium">+₹200</span>
                    </div>
                    <p className="text-sm text-gray-600">Additional bonus for 10 or more onboardings in a single day</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-lg font-medium">Payout Schedule</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <p className="text-gray-600">
                    Payouts are processed weekly for all work completed Sunday through Saturday. You'll receive your
                    payment on the following Monday or Tuesday.
                  </p>
                  <p className="text-gray-600">
                    Payments are made directly to your bank account. No minimum payout threshold.
                  </p>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-lg font-medium">Earning Potential</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">5 businesses per day</span>
                    <span className="text-green-600 font-medium">₹600/day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">10 businesses per day</span>
                    <span className="text-green-600 font-medium">₹1,200/day</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium">35 businesses per week</span>
                    <span className="text-green-600 font-medium">₹3,500+/week</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Earnings potential varies based on your location, effort, and number of businesses onboarded.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="apply" className="space-y-4">
          <div className="space-y-6">
            <div className="text-center">
              <Briefcase className="h-12 w-12 text-rose-600 mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Ready to become an agent?</h2>
              <p className="text-gray-600 mb-6">
                Join our network of agents and start earning by helping businesses grow with Trimly
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Link href="/agent/register">
                <Button className="w-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Register as Agent
                </Button>
              </Link>
              <Link href="/agent/login">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Agent Login
                </Button>
              </Link>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-sm text-blue-800">
              <p>
                Already registered but having trouble? Contact our support team at{" "}
                <a href="tel:+918888888888" className="font-medium underline">
                  +91 8888 888 888
                </a>{" "}
                for assistance.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
