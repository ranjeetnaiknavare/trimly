"use client"

import { useState } from "react"
import Link from "next/link"
import { Briefcase, ChevronRight, Search, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Link href="/jobs/agent">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            Agent Portal
          </Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search jobs..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="opportunities">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="my-jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="salon-jobs">Salon Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Become a Trimly Agent</CardTitle>
                  <CardDescription>Earn by onboarding salons and spas</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Featured</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Earn:</span>
                  <span className="text-sm">₹100 per successful onboarding</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Bonus:</span>
                  <span className="text-sm">₹100 extra for 5+ onboardings/day</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Super Bonus:</span>
                  <span className="text-sm">₹200 extra for 10+ onboardings/day</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Payout:</span>
                  <span className="text-sm">Weekly (Monday/Tuesday)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/agent/register" className="w-full">
                <Button className="w-full bg-rose-600 hover:bg-rose-700">
                  Apply Now
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Salon Assistant</CardTitle>
              <CardDescription>Help salons manage their operations</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Location:</span>
                  <span className="text-sm">Various locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm">Part-time / Full-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Salary:</span>
                  <span className="text-sm">₹15,000 - ₹25,000 per month</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Beauty Consultant</CardTitle>
              <CardDescription>Provide beauty advice and services</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Location:</span>
                  <span className="text-sm">Various locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm">Full-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Salary:</span>
                  <span className="text-sm">₹20,000 - ₹35,000 per month</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="my-jobs">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Active Jobs</h3>
            <p className="text-gray-500 mb-6">You haven't applied to any jobs yet</p>
            <Link href="/agent/register">
              <Button className="bg-rose-600 hover:bg-rose-700 flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Become an Agent
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="salon-jobs">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Hair Stylist Needed</CardTitle>
                    <CardDescription>Royal Gents Salon, Kothrud</CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Salary:</span>
                    <span className="text-sm">₹18,000 - ₹25,000 per month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Experience:</span>
                    <span className="text-sm">2+ years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm">Kothrud, Pune</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Apply Now
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Makeup Artist</CardTitle>
                    <CardDescription>Blush Ladies Parlour, Viman Nagar</CardDescription>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Part-time</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Salary:</span>
                    <span className="text-sm">₹15,000 - ₹20,000 per month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Experience:</span>
                    <span className="text-sm">1+ years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm">Viman Nagar, Pune</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Apply Now
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Spa Therapist</CardTitle>
                    <CardDescription>Sparsh Spa & Massage, Baner</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Salary:</span>
                    <span className="text-sm">₹20,000 - ₹30,000 per month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Experience:</span>
                    <span className="text-sm">3+ years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm">Baner, Pune</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Apply Now
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <h3 className="text-lg font-medium mb-2">Are you a salon owner?</h3>
              <p className="text-gray-600 mb-4">Post job openings and hire talented professionals for your business</p>
              <Link href="/business/jobs">
                <Button className="bg-rose-600 hover:bg-rose-700">
                  Post a Job
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
