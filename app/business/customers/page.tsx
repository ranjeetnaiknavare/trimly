"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, Mail, Phone, Calendar, Download } from "lucide-react"
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

// Mock customer data
const customers = [
  {
    id: "C1001",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    visits: 8,
    lastVisit: "2023-04-10",
    totalSpent: 3200,
    avatar: "/placeholder.svg?key=a81j4",
  },
  {
    id: "C1002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    visits: 12,
    lastVisit: "2023-04-15",
    totalSpent: 4800,
    avatar: "/placeholder.svg?key=f4rha",
  },
  {
    id: "C1003",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 76543 21098",
    visits: 5,
    lastVisit: "2023-04-08",
    totalSpent: 1500,
    avatar: "/placeholder.svg?key=pnpwc",
  },
  {
    id: "C1004",
    name: "Neha Singh",
    email: "neha.singh@example.com",
    phone: "+91 65432 10987",
    visits: 15,
    lastVisit: "2023-04-18",
    totalSpent: 6000,
    avatar: "/placeholder.svg?key=8xq89",
  },
  {
    id: "C1005",
    name: "Vikram Malhotra",
    email: "vikram.malhotra@example.com",
    phone: "+91 54321 09876",
    visits: 3,
    lastVisit: "2023-04-05",
    totalSpent: 1200,
    avatar: "/placeholder.svg?key=pweau",
  },
]

// Mock customer visit history
const visitHistory = [
  {
    id: "V1001",
    date: "2023-04-10",
    services: ["Haircut", "Beard Trim"],
    amount: 450,
    staff: "Rajesh",
  },
  {
    id: "V1002",
    date: "2023-03-15",
    services: ["Hair Color", "Styling"],
    amount: 850,
    staff: "Sunil",
  },
  {
    id: "V1003",
    date: "2023-02-20",
    services: ["Facial", "Head Massage"],
    amount: 750,
    staff: "Amit",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  })

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  const handleAddCustomer = () => {
    // In a real app, this would add the customer to the database
    console.log("Adding customer:", newCustomer)
    setIsAddCustomerOpen(false)
    setNewCustomer({ name: "", email: "", phone: "" })
  }

  return (
    <BusinessDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-gray-600">Manage your customer database</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
            <DialogTrigger asChild>
              <Button className="bg-rose-600 hover:bg-rose-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>Enter the customer details below to add them to your database.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCustomerOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCustomer} className="bg-rose-600 hover:bg-rose-700">
                  Add Customer
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
              placeholder="Search customers by name, email or phone..."
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
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-gray-500">ID: {customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-500" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-500" />
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.visits}</TableCell>
                  <TableCell>{new Date(customer.lastVisit).toLocaleDateString()}</TableCell>
                  <TableCell>₹{customer.totalSpent}</TableCell>
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
                            <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className="max-w-3xl">
                        {selectedCustomer && (
                          <>
                            <DialogHeader>
                              <DialogTitle>Customer Details</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                              <div className="col-span-1">
                                <div className="flex flex-col items-center">
                                  <Avatar className="h-24 w-24">
                                    <AvatarImage
                                      src={selectedCustomer.avatar || "/placeholder.svg"}
                                      alt={selectedCustomer.name}
                                    />
                                    <AvatarFallback className="text-2xl">
                                      {selectedCustomer.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <h3 className="mt-4 text-xl font-semibold">{selectedCustomer.name}</h3>
                                  <p className="text-gray-500">Customer since 2022</p>
                                  <div className="mt-4 flex flex-col gap-2 w-full">
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-gray-500" />
                                      <span>{selectedCustomer.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-gray-500" />
                                      <span>{selectedCustomer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4 text-gray-500" />
                                      <span>
                                        Last visit: {new Date(selectedCustomer.lastVisit).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-2">
                                <Tabs defaultValue="history">
                                  <TabsList className="w-full">
                                    <TabsTrigger value="history" className="flex-1">
                                      Visit History
                                    </TabsTrigger>
                                    <TabsTrigger value="preferences" className="flex-1">
                                      Preferences
                                    </TabsTrigger>
                                    <TabsTrigger value="notes" className="flex-1">
                                      Notes
                                    </TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="history" className="mt-4">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Date</TableHead>
                                          <TableHead>Services</TableHead>
                                          <TableHead>Staff</TableHead>
                                          <TableHead>Amount</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {visitHistory.map((visit) => (
                                          <TableRow key={visit.id}>
                                            <TableCell>{new Date(visit.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{visit.services.join(", ")}</TableCell>
                                            <TableCell>{visit.staff}</TableCell>
                                            <TableCell>₹{visit.amount}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TabsContent>
                                  <TabsContent value="preferences">
                                    <div className="p-4 border rounded-md">
                                      <h4 className="font-medium mb-2">Service Preferences</h4>
                                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                                        <li>Preferred stylist: Rajesh</li>
                                        <li>Preferred time: Evenings</li>
                                        <li>Favorite services: Haircut, Beard Trim</li>
                                      </ul>
                                      <h4 className="font-medium mt-4 mb-2">Product Preferences</h4>
                                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                                        <li>Hair products: Anti-dandruff shampoo</li>
                                        <li>Styling: Medium hold gel</li>
                                      </ul>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="notes">
                                    <div className="p-4 border rounded-md">
                                      <p className="text-gray-600">
                                        Customer prefers quieter times. Sensitive scalp - use gentle products. Allergic
                                        to certain hair dyes - check before coloring.
                                      </p>
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
