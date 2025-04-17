"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  productCount: number
}

export function InventoryCategories() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Hair Care",
      description: "Products for hair care and styling",
      productCount: 6,
    },
    {
      id: "2",
      name: "Skin Care",
      description: "Products for skin care and treatment",
      productCount: 2,
    },
    {
      id: "3",
      name: "Hair Color",
      description: "Hair coloring products",
      productCount: 1,
    },
    {
      id: "4",
      name: "Men's Grooming",
      description: "Grooming products for men",
      productCount: 1,
    },
    {
      id: "5",
      name: "Spa Products",
      description: "Products used for spa treatments",
      productCount: 0,
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)

  // Filter categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCategory = () => {
    setCurrentCategory({
      id: Date.now().toString(),
      name: "",
      description: "",
      productCount: 0,
    })
    setIsAddDialogOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setCurrentCategory({ ...category })
    setIsEditDialogOpen(true)
  }

  const handleDeleteCategory = (category: Category) => {
    setCurrentCategory(category)
    setIsDeleteDialogOpen(true)
  }

  const saveCategory = (isNew: boolean) => {
    if (!currentCategory) return

    if (isNew) {
      setCategories([...categories, currentCategory])
      setIsAddDialogOpen(false)
    } else {
      setCategories(categories.map((c) => (c.id === currentCategory.id ? currentCategory : c)))
      setIsEditDialogOpen(false)
    }
  }

  const confirmDeleteCategory = () => {
    if (!currentCategory) return
    setCategories(categories.filter((c) => c.id !== currentCategory.id))
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleAddCategory}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{category.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {category.productCount} {category.productCount === 1 ? "product" : "products"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No categories found.</p>
        </div>
      )}

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name*</Label>
              <Input
                id="name"
                value={currentCategory?.name || ""}
                onChange={(e) =>
                  setCurrentCategory((current) => (current ? { ...current, name: e.target.value } : null))
                }
                placeholder="e.g. Hair Care"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={currentCategory?.description || ""}
                onChange={(e) =>
                  setCurrentCategory((current) => (current ? { ...current, description: e.target.value } : null))
                }
                placeholder="e.g. Products for hair care and styling"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveCategory(true)} className="bg-rose-600 hover:bg-rose-700">
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Category Name*</Label>
              <Input
                id="edit-name"
                value={currentCategory?.name || ""}
                onChange={(e) =>
                  setCurrentCategory((current) => (current ? { ...current, name: e.target.value } : null))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={currentCategory?.description || ""}
                onChange={(e) =>
                  setCurrentCategory((current) => (current ? { ...current, description: e.target.value } : null))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveCategory(false)} className="bg-rose-600 hover:bg-rose-700">
              Update Category
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
              Are you sure you want to delete <strong>{currentCategory?.name}</strong>?
            </p>
            {(currentCategory?.productCount || 0) > 0 && (
              <p className="text-red-500 mt-2">
                Warning: This category contains {currentCategory?.productCount}{" "}
                {currentCategory?.productCount === 1 ? "product" : "products"}. Deleting it may affect these products.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCategory}>
              Delete Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
