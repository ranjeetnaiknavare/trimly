"use client"

import { useState } from "react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Download, ExternalLink, Mail, Phone } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data
const mockAgents = [
  {
    id: "TRA-583921",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    location: "Pune, Maharashtra",
    status: "active",
    registrationDate: "2023-06-15",
    businessesOnboarded: 12,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RS",
  },
]

export default function BusinessAgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Agent Management</h1>
            <p className="text-gray-500">View and manage your agent referrals</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Tabs defaultValue="agents">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="agents">My Agents</TabsTrigger>
            <TabsTrigger value="program">Agent Program</TabsTrigger>
          </TabsList>
          <TabsContent value="agents" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Agents</CardTitle>
                <CardDescription>Agents who have referred your business to Trimly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search agents..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {mockAgents.length > 0 ? (
                  <div className="space-y-4">
                    {mockAgents.map((agent) => (
                      <div key={agent.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                              <div>
                                <h3 className="font-medium">{agent.name}</h3>
                                <p className="text-sm text-gray-500">{agent.id}</p>
                              </div>
                              <Badge className="w-fit bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{agent.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{agent.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{agent.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No agents have referred your business yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="program" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Trimly Agent Program</CardTitle>
                <CardDescription>Learn about our agent referral program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-rose-800 mb-2">About the Agent Program</h3>
                  <p className="text-rose-700 mb-4">
                    Trimly's Agent Program connects businesses with local representatives who help them get started on
                    our platform.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-medium mb-2">Local Support</h4>
                      <p className="text-sm text-gray-600">
                        Get personalized assistance from agents who understand your local market
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-medium mb-2">Easy Onboarding</h4>
                      <p className="text-sm text-gray-600">
                        Agents help you set up your profile, services, and get started quickly
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <h4 className="font-medium mb-2">Ongoing Assistance</h4>
                      <p className="text-sm text-gray-600">
                        Receive continued support as you grow your business on Trimly
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">How It Works</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="bg-rose-100 text-rose-800 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Connect with an Agent</h4>
                        <p className="text-sm text-gray-600">
                          Agents reach out to businesses or businesses can request agent assistance
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-rose-100 text-rose-800 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Register with Agent's Referral</h4>
                        <p className="text-sm text-gray-600">
                          Use the agent's referral link or code when registering your business
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-rose-100 text-rose-800 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Get Personalized Support</h4>
                        <p className="text-sm text-gray-600">
                          Your agent will help you set up your profile and get started on Trimly
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-blue-800">
                    Want to become a Trimly Agent? Visit our{" "}
                    <a href="/agent/register" className="underline font-medium">
                      Agent Registration
                    </a>{" "}
                    page to learn more and apply.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BusinessDashboardLayout>
  )
}
