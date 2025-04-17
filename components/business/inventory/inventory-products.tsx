"use client"

import { useState } from "react"
import { Check, Edit, Filter, MoreHorizontal, Package, Plus, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// Mock data for products
const initialProducts = [
  {
    id: "1",
    name: "Shampoo - Premium",
    category: "Hair Care",
    sku: "SH-PREM-001",
    price: 24.99,
    cost: 12.5,
    stock: 32,
    threshold: 15,
    supplier: "Beauty Wholesale Inc.",
    description: "Premium salon-quality shampoo for all hair types.",
  },
  {
    id: "2",
    name: "Hair Color - Natural Black",
    category: "Hair Color",
    sku: "HC-BLK-001",
    price: 18.99,
    cost: 8.75,
    stock: 15,
    threshold: 10,
    supplier: "ColorTech Solutions",
    description: "Long-lasting natural black hair color.",
  },
  {
    id: "3",
    name: "Conditioner - Repair",
    category: "Hair Care",
    sku: "CD-REP-001",
    price: 22.99,
    cost: 11.25,
    stock: 28,
    threshold: 15,
    supplier: "Beauty Wholesale Inc.",
    description: "Deep repair conditioner for damaged hair.",
  },
  {
    id: "4",
    name: "Hair Serum",
    category: "Hair Care",
    sku: "HS-SRM-001",
    price: 32.99,
    cost: 16.5,
    stock: 12,
    threshold: 15,
    supplier: "Luxury Beauty Products",
    description: "Smoothing serum that eliminates frizz and adds shine.",
  },
  {
    id: "5",
    name: "Styling Gel - Strong Hold",
    category: "Styling",
    sku: "SG-STR-001",
    price: 15.99,
    cost: 7.25,
    stock: 18,
    threshold: 20,
    supplier: "Style Masters Co.",
    description: "Strong hold styling gel for all hair types.",
  },
  {
    id: "6",
    name: "Facial Cleanser",
    category: "Skin Care",
    sku: "FC-CLN-001",
    price: 28.99,
    cost: 14.5,
    stock: 4,
    threshold: 10,
    supplier: "Pure Skin Solutions",
    description: "Gentle facial cleanser for all skin types.",
  },
  {
    id: "7",
    name: "Beard Oil",
    category: "Men's Grooming",
    sku: "BO-OIL-001",
    price: 19.99,
    cost: 9.75,
    stock: 3,
    threshold: 8,
    supplier: "Gentleman's Choice",
    description: "Premium beard oil for softening and conditioning facial hair.",
  },
]

// Mock data for categories and suppliers
const categories = [
  "Hair Care",
  "Hair Color",
  "Styling",
  "Skin Care",
  "Men's Grooming",
  "Nail Care",
  "Tools & Accessories",
]

const suppliers = [
  "Beauty Wholesale Inc.",
  "ColorTech Solutions",
  "Luxury Beauty Products",
  "Style Masters Co.",
  "Pure Skin Solutions",
  "Gentleman's Choice",
  "Professional Beauty Supply",
]

export function InventoryProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [stockFilter, setStockFilter] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    sku: "",
    price: 0,
    cost: 0,
    stock: 0,
    threshold: 0,
    supplier: "",
    description: "",
  })

  // Filter products based on search term and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "" || product.category === categoryFilter

    const matchesStock =
      stockFilter === "" ||
      (stockFilter === "low" && product.stock < product.threshold) ||
      (stockFilter === "out" && product.stock === 0) ||
      (stockFilter === "ok" && product.stock >= product.threshold)

    return matchesSearch && matchesCategory && matchesStock
  })

  // Handle adding a new product
  const handleAddProduct = () => {
    const id = (Math.max(...products.map((p) => Number.parseInt(p.id))) + 1).toString()
    setProducts([...products, { id, ...newProduct }])
    setNewProduct({
      name: "",
      category: "",
      sku: "",
      price: 0,
      cost: 0,
      stock: 0,
      threshold: 0,
      supplier: "",
      description: "",
    })
    setIsAddDialogOpen(false)
  }

  // Handle editing a product
  const handleEditProduct = () => {
    if (!currentProduct) return

    setProducts(products.map((product) => (product.id === currentProduct.id ? currentProduct : product)))
    setIsEditDialogOpen(false)
  }

  // Handle deleting a product
  const handleDeleteProduct = () => {
    if (!currentProduct) return

    setProducts(products.filter((product) => product.id !== currentProduct.id))
    setIsDeleteDialogOpen(false)
  }

  // Calculate stock status
  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return "Out of Stock"
    if (stock < threshold) return "Low Stock"
    return "In Stock"
  }

  // Get color class based on stock status
  const getStockColorClass = (stock: number, threshold: number) => {
    if (stock === 0) return "text-red-500"
    if (stock < threshold) return "text-amber-500"
    return "text-green-500"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your salon inventory products</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  {categoryFilter || "All Categories"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  {stockFilter === "low"
                    ? "Low Stock"
                    : stockFilter === "out"
                      ? "Out of Stock"
                      : stockFilter === "ok"
                        ? "In Stock"
                        : "All Stock Levels"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Stock Levels</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
                <SelectItem value="ok">In Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm">
                          <span>{product.stock}</span>
                          <span className="text-muted-foreground">{product.threshold}</span>
                        </div>
                        <Progress
                          value={(product.stock / product.threshold) * 100}
                          max={200}
                          className={product.stock < product.threshold ? "bg-red-100" : "bg-green-100"}
                        />
                      </div>
                    </TableCell>
                    <TableCell className={getStockColorClass(product.stock, product.threshold)}>
                      {getStockStatus(product.stock, product.threshold)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentProduct(product)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentProduct(product)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </CardFooter>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Enter the details for the new product. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select
                  value={newProduct.supplier}
                  onValueChange={(value) => setNewProduct({ ...newProduct, supplier: value })}
                >
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cost">Cost ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={newProduct.cost}
                  onChange={(e) => setNewProduct({ ...newProduct, cost: Number.parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stock">Current Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="threshold">Low Stock Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={newProduct.threshold}
                  onChange={(e) => setNewProduct({ ...newProduct, threshold: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>
              <Check className="mr-2 h-4 w-4" /> Save Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the details for this product. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Product Name</Label>
                  <Input
                    id="edit-name"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={currentProduct.category}
                    onValueChange={(value) => setCurrentProduct({ ...currentProduct, category: value })}
                  >
                    <SelectTrigger id="edit-category">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-sku">SKU</Label>
                  <Input
                    id="edit-sku"
                    value={currentProduct.sku}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, sku: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-supplier">Supplier</Label>
                  <Select
                    value={currentProduct.supplier}
                    onValueChange={(value) => setCurrentProduct({ ...currentProduct, supplier: value })}
                  >
                    <SelectTrigger id="edit-supplier">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-cost">Cost ($)</Label>
                  <Input
                    id="edit-cost"
                    type="number"
                    value={currentProduct.cost}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, cost: Number.parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-stock">Current Stock</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, stock: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-threshold">Low Stock Threshold</Label>
                  <Input
                    id="edit-threshold"
                    type="number"
                    value={currentProduct.threshold}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, threshold: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>
              <Check className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="py-4">
              <p className="font-medium">{currentProduct.name}</p>
              <p className="text-sm text-muted-foreground">SKU: {currentProduct.sku}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
