"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, Mail, Phone, Download, Scissors, Star } from "lucide-react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock staff data
const staffMembers = [
  {
    id: "S1001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    role: "Hair Stylist",
    services: ["Haircut", "Hair Color", "Styling"],
    appointments: 128,
    rating: 4.8,
    avatar: "/intertwined-initials.png",
  },
  {
    id: "S1002",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 87654 32109",
    role: "Senior Stylist",
    services: ["Haircut", "Hair Treatment", "Bridal Styling"],
    appointments: 156,
    rating: 4.9,
    avatar: "/playstation-controller-closeup.png",
  },
  {
    id: "S1003",
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 76543 21098",
    role: "Barber",
    services: ["Haircut", "Beard Trim", "Shave"],
    appointments: 112,
    rating: 4.7,
    avatar: "/abstract-purple-swirl.png",
  },
  {
    id: "S1004",
    name: "Neha Sharma",
    email: "neha.sharma@example.com",
    phone: "+91 65432 10987",
    role: "Beautician",
    services: ["Facial", "Makeup", "Manicure"],
    appointments: 98,
    rating: 4.6,
    avatar: "/night-sky-stars.png",
  },
  {
    id: "S1005",
    name: "Vikram Malhotra",
    email: "vikram.malhotra@example.com",
    phone: "+91 54321 09876",
    role: "Hair Specialist",
    services: ["Hair Treatment", "Hair Spa", "Hair Color"],
    appointments: 87,
    rating: 4.5,
    avatar: "/virtual-meeting-diversity.png",
  },
]

// Mock performance data
const performanceData = [
  {
    id: "P1001",
    date: "2023-04-10",
    service: "Haircut",
    customer: "Rahul Sharma",
    amount: 450,
    rating: 5,
  },
  {
    id: "P1002",
    date: "2023-04-10",
    service: "Beard Trim",
    customer: "Ajay Kumar",
    amount: 200,
    rating: 4,
  },
  {
    id: "P1003",
    date: "2023-04-09",
    service: "Hair Color",
    customer: "Priya Patel",
    amount: 1200,
    rating: 5,
  },
  {
    id: "P1004",
    date: "2023-04-09",
    service: "Haircut",
    customer: "Neha Singh",
    amount: 450,
    rating: 4,
  },
  {
    id: "P1005",
    date: "2023-04-08",
    service: "Facial",
    customer: "Anita Desai",
    amount: 800,
    rating: 5,
  },
]

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    services: [],
  })

  // Filter staff based on search term
  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.includes(searchTerm) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddStaff = () => {
    // In a real app, this would add the staff to the database
    console.log("Adding staff:", newStaff)
    setIsAddStaffOpen(false)
    setNewStaff({ name: "", email: "", phone: "", role: "", services: [] })
  }

  return (
    <BusinessDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <p className="text-gray-600">Manage your salon staff and track their performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <DialogTrigger asChild>
              <Button className="bg-rose-600 hover:bg-rose-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>Enter the staff details below to add them to your salon.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hair Stylist">Hair Stylist</SelectItem>
                      <SelectItem value="Barber">Barber</SelectItem>
                      <SelectItem value="Beautician">Beautician</SelectItem>
                      <SelectItem value="Hair Specialist">Hair Specialist</SelectItem>
                      <SelectItem value="Senior Stylist">Senior Stylist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStaff} className="bg-rose-600 hover:bg-rose-700">
                  Add Staff
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search staff by name, email, phone or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Appointments</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                        <AvatarFallback>
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-xs text-gray-500">ID: {staff.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-500" />
                        <span>{staff.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-500" />
                        <span>{staff.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {staff.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{staff.appointments}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{staff.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DialogTrigger asChild>
                            <DropdownMenuItem onClick={() => setSelectedStaff(staff)}>View Details</DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className="max-w-3xl">
                        {selectedStaff && (
                          <>
                            <DialogHeader>
                              <DialogTitle>Staff Details</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                              <div className="col-span-1">
                                <div className="flex flex-col items-center">
                                  <Avatar className="h-24 w-24">
                                    <AvatarImage
                                      src={selectedStaff.avatar || "/placeholder.svg"}
                                      alt={selectedStaff.name}
                                    />
                                    <AvatarFallback className="text-2xl">
                                      {selectedStaff.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <h3 className="mt-4 text-xl font-semibold">{selectedStaff.name}</h3>
                                  <p className="text-gray-500">{selectedStaff.role}</p>
                                  <div className="mt-4 flex flex-col gap-2 w-full">
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-gray-500" />
                                      <span>{selectedStaff.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-gray-500" />
                                      <span>{selectedStaff.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Scissors className="h-4 w-4 text-gray-500" />
                                      <span>Services: {selectedStaff.services.join(", ")}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-2">
                                <Tabs defaultValue="performance">
                                  <TabsList className="w-full">
                                    <TabsTrigger value="performance" className="flex-1">
                                      Performance
                                    </TabsTrigger>
                                    <TabsTrigger value="schedule" className="flex-1">
                                      Schedule
                                    </TabsTrigger>
                                    <TabsTrigger value="reviews" className="flex-1">
                                      Reviews
                                    </TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="performance" className="mt-4">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Date</TableHead>
                                          <TableHead>Service</TableHead>
                                          <TableHead>Customer</TableHead>
                                          <TableHead>Amount</TableHead>
                                          <TableHead>Rating</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {performanceData.map((performance) => (
                                          <TableRow key={performance.id}>
                                            <TableCell>{new Date(performance.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{performance.service}</TableCell>
                                            <TableCell>{performance.customer}</TableCell>
                                            <TableCell>₹{performance.amount}</TableCell>
                                            <TableCell>
                                              <div className="flex items-center">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="ml-1">{performance.rating}</span>
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TabsContent>
                                  <TabsContent value="schedule">
                                    <div className="p-4 border rounded-md">
                                      <h4 className="font-medium mb-2">Today's Schedule</h4>
                                      <ul className="space-y-2">
                                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                          <div>
                                            <p className="font-medium">10:00 AM - Haircut</p>
                                            <p className="text-sm text-gray-500">Rahul Sharma</p>
                                          </div>
                                          <Badge>Upcoming</Badge>
                                        </li>
                                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                          <div>
                                            <p className="font-medium">11:30 AM - Hair Color</p>
                                            <p className="text-sm text-gray-500">Priya Patel</p>
                                          </div>
                                          <Badge>Upcoming</Badge>
                                        </li>
                                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                          <div>
                                            <p className="font-medium">2:00 PM - Beard Trim</p>
                                            <p className="text-sm text-gray-500">Amit Kumar</p>
                                          </div>
                                          <Badge>Upcoming</Badge>
                                        </li>
                                      </ul>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="reviews">
                                    <div className="space-y-4">
                                      <div className="p-4 border rounded-md">
                                        <div className="flex justify-between">
                                          <p className="font-medium">Rahul Sharma</p>
                                          <div className="flex items-center">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="ml-1">5</span>
                                          </div>
                                        </div>
                                        <p className="text-sm text-gray-500">April 10, 2023</p>
                                        <p className="mt-2">
                                          Excellent service! Very professional and skilled. Will definitely come back.
                                        </p>
                                      </div>
                                      <div className="p-4 border rounded-md">
                                        <div className="flex justify-between">
                                          <p className="font-medium">Priya Patel</p>
                                          <div className="flex items-center">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="ml-1">4</span>
                                          </div>
                                        </div>
                                        <p className="text-sm text-gray-500">April 8, 2023</p>
                                        <p className="mt-2">
                                          Good service, but had to wait a bit longer than expected. The result was great
                                          though.
                                        </p>
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            </div>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </BusinessDashboardLayout>
  )
}
