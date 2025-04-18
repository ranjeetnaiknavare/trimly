"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, Clock } from "lucide-react"

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
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for services
const initialServices = [
  {
    id: "1",
    name: "Haircut",
    category: "Hair",
    duration: 30,
    price: 25.0,
    description: "Standard haircut with styling",
    popular: true,
  },
  {
    id: "2",
    name: "Hair Coloring",
    category: "Hair",
    duration: 90,
    price: 75.0,
    description: "Full hair coloring service",
    popular: false,
  },
  {
    id: "3",
    name: "Manicure",
    category: "Nails",
    duration: 45,
    price: 35.0,
    description: "Standard manicure with polish",
    popular: true,
  },
  {
    id: "4",
    name: "Pedicure",
    category: "Nails",
    duration: 60,
    price: 45.0,
    description: "Standard pedicure with polish",
    popular: true,
  },
  {
    id: "5",
    name: "Facial",
    category: "Skin",
    duration: 60,
    price: 65.0,
    description: "Deep cleansing facial treatment",
    popular: false,
  },
  {
    id: "6",
    name: "Beard Trim",
    category: "Hair",
    duration: 15,
    price: 15.0,
    description: "Beard shaping and trimming",
    popular: false,
  },
]

const categories = ["Hair", "Nails", "Skin", "Massage", "Other"]

export function ServicesList() {
  const [services, setServices] = useState(initialServices)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    duration: "",
    price: "",
    description: "",
    popular: false,
  })

  // Filter services based on search query and category
  const filteredServices = services.filter(
    (service) =>
      (service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter === "all" || service.category === categoryFilter),
  )

  const handleAddService = () => {
    if (newService.name && newService.category && newService.duration && newService.price) {
      const service = {
        id: (services.length + 1).toString(),
        name: newService.name,
        category: newService.category,
        duration: Number.parseInt(newService.duration),
        price: Number.parseFloat(newService.price),
        description: newService.description,
        popular: newService.popular,
      }
      setServices([...services, service])
      setNewService({
        name: "",
        category: "",
        duration: "",
        price: "",
        description: "",
        popular: false,
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteService = () => {
    if (serviceToDelete) {
      setServices(services.filter((service) => service.id !== serviceToDelete))
      setServiceToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              className="h-9 w-[250px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Add a new service to your salon offerings.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  placeholder="Service name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newService.category}
                  onValueChange={(value) => setNewService({ ...newService, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="30"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="25.00"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Service description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={newService.popular}
                  onChange={(e) => setNewService({ ...newService, popular: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="popular">Mark as popular service</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No services found
                </TableCell>
              </TableRow>
            ) : (
              filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{service.name}</div>
                      <div className="text-sm text-muted-foreground">{service.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      {service.duration} min
                    </div>
                  </TableCell>
                  <TableCell>${service.price.toFixed(2)}</TableCell>
                  <TableCell>{service.popular && <Badge variant="default">Popular</Badge>}</TableCell>
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
                        <DropdownMenuItem>Edit service</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setServiceToDelete(service.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          Delete service
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteService}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
