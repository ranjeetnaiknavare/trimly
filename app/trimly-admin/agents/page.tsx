"use client"

import { useState } from "react"
import { Search, Download, Eye, CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for agents
const mockAgents = [
  {
    id: "TRA-583921",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    location: "Pune, Maharashtra",
    status: "active",
    kycStatus: "verified",
    registrationDate: "2023-06-15",
    businessesOnboarded: 12,
    totalCommission: 6000,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RS",
  },
  {
    id: "TRA-692481",
    name: "Priya Patel",
    phone: "+91 87654 32109",
    email: "priya.patel@example.com",
    location: "Mumbai, Maharashtra",
    status: "active",
    kycStatus: "verified",
    registrationDate: "2023-06-20",
    businessesOnboarded: 8,
    totalCommission: 4000,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PP",
  },
  {
    id: "TRA-781532",
    name: "Amit Kumar",
    phone: "+91 76543 21098",
    email: "amit.kumar@example.com",
    location: "Bangalore, Karnataka",
    status: "inactive",
    kycStatus: "pending",
    registrationDate: "2023-07-05",
    businessesOnboarded: 3,
    totalCommission: 1500,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AK",
  },
  {
    id: "TRA-845729",
    name: "Neha Singh",
    phone: "+91 65432 10987",
    email: "neha.singh@example.com",
    location: "Delhi, Delhi",
    status: "active",
    kycStatus: "verified",
    registrationDate: "2023-07-10",
    businessesOnboarded: 6,
    totalCommission: 3000,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=NS",
  },
  {
    id: "TRA-923614",
    name: "Vikram Malhotra",
    phone: "+91 54321 09876",
    email: "vikram.malhotra@example.com",
    location: "Hyderabad, Telangana",
    status: "pending",
    kycStatus: "rejected",
    registrationDate: "2023-07-15",
    businessesOnboarded: 0,
    totalCommission: 0,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=VM",
  },
]

// Mock data for businesses onboarded by agents
const mockBusinesses = [
  {
    id: "B1",
    name: "Royal Gents Salon",
    owner: "Rajesh Kumar",
    location: "Kothrud, Pune",
    agentId: "TRA-583921",
    registrationDate: "2023-07-15",
    status: "active",
  },
  {
    id: "B2",
    name: "Blush Ladies Parlour",
    owner: "Priya Patel",
    location: "Viman Nagar, Pune",
    agentId: "TRA-583921",
    registrationDate: "2023-07-18",
    status: "active",
  },
  {
    id: "B3",
    name: "Sparsh Spa & Massage",
    owner: "Amit Kumar",
    location: "Baner, Pune",
    agentId: "TRA-692481",
    registrationDate: "2023-07-20",
    status: "pending",
  },
]

// Mock data for payouts
const mockPayouts = [
  {
    id: "P1",
    agentId: "TRA-583921",
    amount: 2500,
    businesses: 5,
    date: "2023-07-31",
    status: "completed",
  },
  {
    id: "P2",
    agentId: "TRA-692481",
    amount: 1500,
    businesses: 3,
    date: "2023-07-31",
    status: "completed",
  },
  {
    id: "P3",
    agentId: "TRA-583921",
    amount: 1500,
    businesses: 3,
    date: "2023-06-30",
    status: "completed",
  },
]

export default function AdminAgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isKycDialogOpen, setIsKycDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("agents")

  // Filter agents based on search query and filters
  const filteredAgents = mockAgents.filter((agent) => {
    // Search filter
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.phone.includes(searchQuery)

    // Status filter
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter

    // Location filter
    const matchesLocation = locationFilter === "all" || agent.location.includes(locationFilter)

    return matchesSearch && matchesStatus && matchesLocation
  })

  // Get businesses onboarded by a specific agent
  const getAgentBusinesses = (agentId: string) => {
    return mockBusinesses.filter((business) => business.agentId === agentId)
  }

  // Get payouts for a specific agent
  const getAgentPayouts = (agentId: string) => {
    return mockPayouts.filter((payout) => payout.agentId === agentId)
  }

  // Handle viewing agent details
  const handleViewAgentDetails = (agent: any) => {
    setSelectedAgent(agent)
    setIsDetailsDialogOpen(true)
  }

  // Handle viewing KYC details
  const handleViewKycDetails = (agent: any) => {
    setSelectedAgent(agent)
    setIsKycDialogOpen(true)
  }

  // Handle approving or rejecting KYC
  const handleKycAction = (action: "approve" | "reject") => {
    // In a real app, this would make an API call to update the KYC status
    console.log(`${action} KYC for agent ${selectedAgent?.id}`)
    setIsKycDialogOpen(false)
  }

  // Handle changing agent status
  const handleChangeAgentStatus = (agentId: string, newStatus: string) => {
    // In a real app, this would make an API call to update the agent status
    console.log(`Change status of agent ${agentId} to ${newStatus}`)
  }

  // Calculate statistics
  const totalAgents = mockAgents.length
  const activeAgents = mockAgents.filter((a) => a.status === "active").length
  const pendingAgents = mockAgents.filter((a) => a.status === "pending").length
  const totalBusinessesOnboarded = mockAgents.reduce((sum, agent) => sum + agent.businessesOnboarded, 0)
  const totalCommissionPaid = mockPayouts.reduce((sum, payout) => sum + payout.amount, 0)

  // Get top performing locations
  const locationPerformance = mockAgents.reduce((acc: any, agent) => {
    const location = agent.location.split(",")[0].trim() // Get city name
    if (!acc[location]) {
      acc[location] = { businesses: 0, agents: 0 }
    }
    acc[location].businesses += agent.businessesOnboarded
    acc[location].agents += 1
    return acc
  }, {})

  const topLocations = Object.entries(locationPerformance)
    .map(([location, data]: [string, any]) => ({
      location,
      businesses: data.businesses,
      agents: data.agents,
    }))
    .sort((a, b) => b.businesses - a.businesses)
    .slice(0, 5)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Agent Management</h1>
          <p className="text-gray-500">Manage and track all agent activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAgents}</div>
                <p className="text-xs text-gray-500">
                  {activeAgents} active, {pendingAgents} pending
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Businesses Onboarded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBusinessesOnboarded}</div>
                <p className="text-xs text-green-500">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Commission Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalCommissionPaid}</div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Avg. Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-green-500">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Agent Directory</CardTitle>
              <CardDescription>View and manage all registered agents</CardDescription>
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

                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Pune">Pune</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>KYC</TableHead>
                      <TableHead>Businesses</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAgents.length > 0 ? (
                      filteredAgents.map((agent) => (
                        <TableRow key={agent.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{agent.name}</p>
                                <p className="text-xs text-gray-500">{agent.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{agent.location}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                agent.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : agent.status === "inactive"
                                    ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                agent.kycStatus === "verified"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : agent.kycStatus === "pending"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {agent.kycStatus.charAt(0).toUpperCase() + agent.kycStatus.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{agent.businessesOnboarded}</TableCell>
                          <TableCell>₹{agent.totalCommission}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewAgentDetails(agent)}
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewKycDetails(agent)}
                                className="h-8 w-8 p-0"
                              >
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View KYC</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No agents found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Locations</CardTitle>
                <CardDescription>Locations with highest business onboarding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLocations.map((location, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{location.location}</p>
                        <span className="text-sm">{location.businesses} businesses</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-rose-600 h-2.5 rounded-full"
                          style={{
                            width: `${(location.businesses / topLocations[0].businesses) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{location.agents} agents</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Agents</CardTitle>
                <CardDescription>Agents with highest business onboarding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAgents
                    .sort((a, b) => b.businessesOnboarded - a.businessesOnboarded)
                    .slice(0, 5)
                    .map((agent, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            <p className="text-xs text-gray-500">{agent.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{agent.businessesOnboarded} businesses</p>
                          <p className="text-xs text-gray-500">₹{agent.totalCommission} earned</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Business onboarding trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Commission Payouts</CardTitle>
              <CardDescription>Track and manage agent commission payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Businesses</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayouts.map((payout) => {
                      const agent = mockAgents.find((a) => a.id === payout.agentId)
                      return (
                        <TableRow key={payout.id}>
                          <TableCell>{payout.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={agent?.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{agent?.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{agent?.name}</p>
                                <p className="text-xs text-gray-500">{agent?.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{payout.date}</TableCell>
                          <TableCell>{payout.businesses}</TableCell>
                          <TableCell>₹{payout.amount}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                payout.status === "completed"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Agent Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agent Details</DialogTitle>
            <DialogDescription>Detailed information about {selectedAgent?.name}</DialogDescription>
          </DialogHeader>

          {selectedAgent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedAgent.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedAgent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">{selectedAgent.name}</h3>
                  <p className="text-gray-500">{selectedAgent.id}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p>{selectedAgent.phone}</p>
                  <p>{selectedAgent.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>{selectedAgent.location}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="flex gap-2 mt-1">
                  <Badge
                    className={
                      selectedAgent.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : selectedAgent.status === "inactive"
                          ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {selectedAgent.status.charAt(0).toUpperCase() + selectedAgent.status.slice(1)}
                  </Badge>
                  <Badge
                    className={
                      selectedAgent.kycStatus === "verified"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : selectedAgent.kycStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    KYC: {selectedAgent.kycStatus.charAt(0).toUpperCase() + selectedAgent.kycStatus.slice(1)}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Performance</p>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <div>
                    <p className="font-medium">{selectedAgent.businessesOnboarded}</p>
                    <p className="text-xs text-gray-500">Businesses Onboarded</p>
                  </div>
                  <div>
                    <p className="font-medium">₹{selectedAgent.totalCommission}</p>
                    <p className="text-xs text-gray-500">Total Commission</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="font-medium mb-2">Businesses Onboarded</p>
                <div className="max-h-40 overflow-y-auto">
                  {getAgentBusinesses(selectedAgent.id).length > 0 ? (
                    getAgentBusinesses(selectedAgent.id).map((business) => (
                      <div key={business.id} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{business.name}</p>
                          <p className="text-xs text-gray-500">{business.location}</p>
                        </div>
                        <Badge
                          className={
                            business.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          }
                        >
                          {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-2">No businesses onboarded yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Select
              value={selectedAgent?.status}
              onValueChange={(value) => handleChangeAgentStatus(selectedAgent?.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Change Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* KYC Details Dialog */}
      <Dialog open={isKycDialogOpen} onOpenChange={setIsKycDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>KYC Verification Details</DialogTitle>
            <DialogDescription>Review and verify agent's KYC documents</DialogDescription>
          </DialogHeader>

          {selectedAgent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedAgent.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedAgent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">{selectedAgent.name}</h3>
                  <p className="text-gray-500">{selectedAgent.id}</p>
                </div>
              </div>

              <Alert
                className={
                  selectedAgent.kycStatus === "verified"
                    ? "bg-green-50 border-green-200"
                    : selectedAgent.kycStatus === "rejected"
                      ? "bg-red-50 border-red-200"
                      : "bg-yellow-50 border-yellow-200"
                }
              >
                <div className="flex items-center gap-2">
                  {selectedAgent.kycStatus === "verified" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : selectedAgent.kycStatus === "rejected" ? (
                    <XCircle className="h-4 w-4 text-red-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  )}
                  <AlertDescription
                    className={
                      selectedAgent.kycStatus === "verified"
                        ? "text-green-800"
                        : selectedAgent.kycStatus === "rejected"
                          ? "text-red-800"
                          : "text-yellow-800"
                    }
                  >
                    KYC Status: {selectedAgent.kycStatus.charAt(0).toUpperCase() + selectedAgent.kycStatus.slice(1)}
                  </AlertDescription>
                </div>
              </Alert>

              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Aadhaar Card</p>
                  <div className="border rounded-md p-4 bg-gray-50 flex items-center justify-center">
                    <p className="text-gray-500">Document preview would appear here</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">PAN Card</p>
                  <div className="border rounded-md p-4 bg-gray-50 flex items-center justify-center">
                    <p className="text-gray-500">Document preview would appear here</p>
                  </div>
                </div>

                {selectedAgent.kycStatus === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleKycAction("approve")}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve KYC
                    </Button>
                    <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => handleKycAction("reject")}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject KYC
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsKycDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
