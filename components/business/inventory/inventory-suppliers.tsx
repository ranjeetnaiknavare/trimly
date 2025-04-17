"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Search, Mail, Phone, MapPin, Package } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  productCategories: string[]
  notes: string
}

export function InventorySuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "Beauty Wholesale Inc.",
      contactPerson: "Rajiv Mehta",
      email: "rajiv@beautywholesale.com",
      phone: "+91 98765 43210",
      address: "123 Supplier Street, Mumbai, Maharashtra",
      productCategories: ["Hair Care", "Skin Care"],
      notes: "Premium supplier for salon-quality products. Offers bulk discounts.",
    },
    {
      id: "2",
      name: "ColorTech Solutions",
      contactPerson: "Priya Singh",
      email: "priya@colortech.com",
      phone: "+91 87654 32109",
      address: "456 Dye Avenue, Delhi, Delhi",
      productCategories: ["Hair Color"],
      notes: "Specialized in hair coloring products. Fast delivery.",
    },
    {
      id: "3",
      name: "Luxury Beauty Products",
      contactPerson: "Arjun Kapoor",
      email: "arjun@luxurybeauty.com",
      phone: "+91 76543 21098",
      address: "789 Premium Road, Bangalore, Karnataka",
      productCategories: ["Hair Care", "Skin Care", "Nail Care"],
      notes: "High-end beauty products supplier. Minimum order quantity applies.",
    },
    {
      id: "4",
      name: "Style Masters Co.",
      contactPerson: "Neha Sharma",
      email: "neha@stylemasters.com",
      phone: "+91 65432 10987",
      address: "101 Styling Lane, Chennai, Tamil Nadu",
      productCategories: ["Styling", "Tools & Accessories"],
      notes: "Specializes in styling products and tools.",
    },
    {
      id: "5",
      name: "Gentleman's Choice",
      contactPerson: "Vikram Singh",
      email: "vikram@gentlemans.com",
      phone: "+91 54321 09876",
      address: "202 Barber Street, Hyderabad, Telangana",
      productCategories: ["Men's Grooming"],
      notes: "Exclusive supplier for men's grooming products.",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Filter suppliers based on search query and active tab
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      (supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeTab === "all" || supplier.productCategories.includes(activeTab)),
  )

  const handleAddSupplier = () => {
    setCurrentSupplier({
      id: Date.now().toString(),
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      productCategories: [],
      notes: "",
    })
    setIsAddDialogOpen(true)
  }

  const handleEditSupplier = (supplier: Supplier) => {
    setCurrentSupplier({ ...supplier })
    setIsEditDialogOpen(true)
  }

  const handleDeleteSupplier = (supplier: Supplier) => {
    setCurrentSupplier(supplier)
    setIsDeleteDialogOpen(true)
  }

  const saveSupplier = (isNew: boolean) => {
    if (!currentSupplier) return

    if (isNew) {
      setSuppliers([...suppliers, currentSupplier])
      setIsAddDialogOpen(false)
    } else {
      setSuppliers(suppliers.map((s) => (s.id === currentSupplier.id ? currentSupplier : s)))
      setIsEditDialogOpen(false)
    }
  }

  const confirmDeleteSupplier = () => {
    if (!currentSupplier) return
    setSuppliers(suppliers.filter((s) => s.id !== currentSupplier.id))
    setIsDeleteDialogOpen(false)
  }

  // Get all unique product categories from suppliers
  const allCategories = Array.from(new Set(suppliers.flatMap((supplier) => supplier.productCategories))).sort()

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search suppliers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleAddSupplier}>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all">All Suppliers</TabsTrigger>
          {allCategories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No suppliers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{supplier.name}</span>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {supplier.address.split(",")[0]}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{supplier.contactPerson}</TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {supplier.email}
                          </span>
                          <span className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {supplier.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {supplier.productCategories.map((category) => (
                            <span
                              key={category}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-rose-100 text-rose-800 hover:bg-rose-200"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditSupplier(supplier)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteSupplier(supplier)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Supplier Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {filteredSuppliers.slice(0, 3).map((supplier) => (
          <Card key={supplier.id}>
            <CardHeader>
              <CardTitle>{supplier.name}</CardTitle>
              <CardDescription>{supplier.contactPerson}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{supplier.address}</span>
                </div>
                <div className="flex items-start">
                  <Package className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                  <div className="flex flex-wrap gap-1">
                    {supplier.productCategories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-rose-100 text-rose-800 hover:bg-rose-200"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                {supplier.notes && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>{supplier.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Supplier Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Supplier Name*</Label>
                <Input
                  id="name"
                  value={currentSupplier?.name || ""}
                  onChange={(e) =>
                    setCurrentSupplier((current) => (current ? { ...current, name: e.target.value } : null))
                  }
                  placeholder="e.g. Beauty Wholesale Inc."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPerson">Contact Person*</Label>
                <Input
                  id="contactPerson"
                  value={currentSupplier?.contactPerson || ""}
                  onChange={(e) =>
                    setCurrentSupplier((current) => (current ? { ...current, contactPerson: e.target.value } : null))
                  }
                  placeholder="e.g. Rajiv Mehta"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  value={currentSupplier?.email || ""}
                  onChange={(e) =>
                    setCurrentSupplier((current) => (current ? { ...current, email: e.target.value } : null))
                  }
                  placeholder="e.g. contact@supplier.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone*</Label>
                <Input
                  id="phone"
                  value={currentSupplier?.phone || ""}
                  onChange={(e) =>
                    setCurrentSupplier((current) => (current ? { ...current, phone: e.target.value } : null))
                  }
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={currentSupplier?.address || ""}
                onChange={(e) =>
                  setCurrentSupplier((current) => (current ? { ...current, address: e.target.value } : null))
                }
                placeholder="e.g. 123 Supplier Street, Mumbai, Maharashtra"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categories">Product Categories</Label>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={currentSupplier?.productCategories.includes(category) ? "default" : "outline"}
                    size="sm"
                    className={
                      currentSupplier?.productCategories.includes(category) ? "bg-rose-600 hover:bg-rose-700" : ""
                    }
                    onClick={() => {
                      if (!currentSupplier) return
                      const updatedCategories = currentSupplier.productCategories.includes(category)
                        ? currentSupplier.productCategories.filter((c) => c !== category)
                        : [...currentSupplier.productCategories, category]
                      setCurrentSupplier({ ...currentSupplier, productCategories: updatedCategories })
                    }}
                  >
                    {category}
                  </Button>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-dashed"
                  onClick={() => {
                    const newCategory = prompt("Enter new category name")
                    if (newCategory && !allCategories.includes(newCategory)) {
                      if (!currentSupplier) return
                      setCurrentSupplier({
                        ...currentSupplier,
                        productCategories: [...currentSupplier.productCategories, newCategory],
                      })
                    }
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add New
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={currentSupplier?.notes || ""}
                onChange={(e) =>
                  setCurrentSupplier((current) => (current ? { ...current, notes: e.target.value } : null))
                }
                placeholder="Additional information about the supplier"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveSupplier(true)} className="bg-rose-600 hover:bg-rose-700">
              Add Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Supplier Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Supplier Name*</Label>
                <Input
                  id="edit-name"
                  value={currentSupplier?.name || ""}
                  onChange={(e) =>
                    setCurrentSupplier((current) => (current ? { ...current, name: e.target.value } : null))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-contactPerson">Contact Person*</Label>
                <Input
                  id="edit-contactPerson"
                  value={currentSupplier?.contactPerson || ""}
                  onChange={(e) =>
                    setCurrentSupplier((current) => (current ? { ...current, contactPerson: e.target.value } : null))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email*</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentSupplier?.email || ""}
                  onChange={(e) =>
                    setCurrentSupplier((current) => (current ? { ...current, email: e.target.value } : null))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone*</Label>
                <Input
                  id="edit-phone"
                  value={currentSupplier?.phone || ""}
                  onChange={(e) =>
                    setCurrentSupplier((current) => (current ? { ...current, phone: e.target.value } : null))
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={currentSupplier?.address || ""}
                onChange={(e) =>
                  setCurrentSupplier((current) => (current ? { ...current, address: e.target.value } : null))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-categories">Product Categories</Label>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={currentSupplier?.productCategories.includes(category) ? "default" : "outline"}
                    size="sm"
                    className={
                      currentSupplier?.productCategories.includes(category) ? "bg-rose-600 hover:bg-rose-700" : ""
                    }
                    onClick={() => {
                      if (!currentSupplier) return
                      const updatedCategories = currentSupplier.productCategories.includes(category)
                        ? currentSupplier.productCategories.filter((c) => c !== category)
                        : [...currentSupplier.productCategories, category]
                      setCurrentSupplier({ ...currentSupplier, productCategories: updatedCategories })
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Input
                id="edit-notes"
                value={currentSupplier?.notes || ""}
                onChange={(e) =>
                  setCurrentSupplier((current) => (current ? { ...current, notes: e.target.value } : null))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveSupplier(false)} className="bg-rose-600 hover:bg-rose-700">
              Update Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete <strong>{currentSupplier?.name}</strong>?
            </p>
            <p className="text-red-500 mt-2">
              Warning: This action cannot be undone. Products associated with this supplier will not be deleted.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteSupplier}>
              Delete Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
