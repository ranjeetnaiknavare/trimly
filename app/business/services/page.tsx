"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, Clock, Scissors, Tag } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock service categories
const categories = [
  { id: "cat1", name: "Haircut" },
  { id: "cat2", name: "Beard & Shave" },
  { id: "cat3", name: "Hair Color" },
  { id: "cat4", name: "Facial" },
  { id: "cat5", name: "Massage" },
]

// Mock services data
const services = [
  {
    id: "S1001",
    name: "Regular Haircut",
    category: "Haircut",
    duration: 30,
    price: 200,
    description: "Basic haircut with scissors or clippers",
    popular: true,
  },
  {
    id: "S1002",
    name: "Premium Haircut",
    category: "Haircut",
    duration: 45,
    price: 350,
    description: "Premium haircut with styling and consultation",
    popular: false,
  },
  {
    id: "S1003",
    name: "Beard Trim",
    category: "Beard & Shave",
    duration: 15,
    price: 100,
    description: "Beard trimming and shaping",
    popular: true,
  },
  {
    id: "S1004",
    name: "Clean Shave",
    category: "Beard & Shave",
    duration: 20,
    price: 150,
    description: "Traditional clean shave with hot towel",
    popular: false,
  },
  {
    id: "S1005",
    name: "Hair Color - Global",
    category: "Hair Color",
    duration: 60,
    price: 800,
    description: "Full head hair coloring",
    popular: true,
  },
  {
    id: "S1006",
    name: "Facial - Basic",
    category: "Facial",
    duration: 30,
    price: 400,
    description: "Basic facial with cleansing and moisturizing",
    popular: false,
  },
  {
    id: "S1007",
    name: "Head Massage",
    category: "Massage",
    duration: 20,
    price: 200,
    description: "Relaxing head massage with oil",
    popular: true,
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    duration: "",
    price: "",
    description: "",
    popular: false,
  })

  // Filter services based on search term and category
  const filteredServices = services.filter(
    (service) =>
      (selectedCategory === "all" || service.category === selectedCategory) &&
      (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleAddService = () => {
    // In a real app, this would add the service to the database
    console.log("Adding service:", newService)
    setIsAddServiceOpen(false)
    setNewService({
      name: "",
      category: "",
      duration: "",
      price: "",
      description: "",
      popular: false,
    })
  }

  return (
    <BusinessDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-gray-600">Manage your salon services</p>
        </div>
        <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rose-600 hover:bg-rose-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Enter the service details below to add it to your catalog.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={newService.category}
                  onValueChange={(value) => setNewService({ ...newService, category: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (min)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price (₹)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddServiceOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService} className="bg-rose-600 hover:bg-rose-700">
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{service.name}</span>
                        {service.popular && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Scissors className="h-4 w-4 text-gray-500" />
                      <span>{service.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{service.duration} min</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-gray-500" />
                      <span>₹{service.price}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem>Toggle Popular</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
