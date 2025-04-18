"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, Mail, Phone } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Mock data for customers
const initialCustomers = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    phone: "+1 (555) 123-4567",
    visits: 12,
    lastVisit: new Date(2023, 3, 15),
    status: "active",
    avatar: "/placeholder.svg?key=jsikx",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    phone: "+1 (555) 234-5678",
    visits: 8,
    lastVisit: new Date(2023, 3, 10),
    status: "active",
    avatar: "/placeholder.svg?key=kjscj",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    phone: "+1 (555) 345-6789",
    visits: 5,
    lastVisit: new Date(2023, 2, 28),
    status: "inactive",
    avatar: "/placeholder.svg?key=kcn91",
  },
  {
    id: "4",
    name: "William Johnson",
    email: "william.johnson@email.com",
    phone: "+1 (555) 456-7890",
    visits: 15,
    lastVisit: new Date(2023, 3, 18),
    status: "active",
    avatar: "/placeholder.svg?key=yffhk",
  },
  {
    id: "5",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@email.com",
    phone: "+1 (555) 567-8901",
    visits: 3,
    lastVisit: new Date(2023, 3, 5),
    status: "active",
    avatar: "/abstract-geometric-shapes.png",
  },
]

export function CustomersList() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  })

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery),
  )

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.email) {
      const customer = {
        id: (customers.length + 1).toString(),
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone || "",
        visits: 0,
        lastVisit: new Date(),
        status: "active",
        avatar: `/placeholder.svg?height=40&width=40&query=${customers.length + 1}`,
      }
      setCustomers([...customers, customer])
      setNewCustomer({ name: "", email: "", phone: "" })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="h-9 w-[250px] md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Add a new customer to your salon database.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Customer name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@example.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCustomer}>Add Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>{customer.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="mr-1 h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="mr-1 h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"} className="capitalize">
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.visits}</TableCell>
                  <TableCell>{format(customer.lastVisit, "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>View appointments</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit customer</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
