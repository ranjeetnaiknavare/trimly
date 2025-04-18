"use client"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Download, RefreshCw, Tag, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { format } from "date-fns"

// Mock data for coupons
const coupons = [
  {
    id: "1",
    code: "WELCOME20",
    description: "20% off for new customers",
    discountType: "percentage",
    discountValue: 20,
    status: "active",
    usageLimit: 1000,
    usageCount: 456,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-12-31"),
    createdBy: "Admin",
    businessId: null,
  },
  {
    id: "2",
    code: "SUMMER25",
    description: "25% off summer special",
    discountType: "percentage",
    discountValue: 25,
    status: "active",
    usageLimit: 500,
    usageCount: 213,
    startDate: new Date("2023-05-15"),
    endDate: new Date("2023-08-31"),
    createdBy: "Admin",
    businessId: null,
  },
  {
    id: "3",
    code: "HAIRCUT100",
    description: "₹100 off on haircuts",
    discountType: "fixed",
    discountValue: 100,
    status: "active",
    usageLimit: 200,
    usageCount: 87,
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-09-30"),
    createdBy: "Serene Beauty Space",
    businessId: "1",
  },
  {
    id: "4",
    code: "FIRSTVISIT",
    description: "15% off on first visit",
    discountType: "percentage",
    discountValue: 15,
    status: "expired",
    usageLimit: 300,
    usageCount: 300,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-06-30"),
    createdBy: "Admin",
    businessId: null,
  },
  {
    id: "5",
    code: "LOYALTY10",
    description: "10% off for loyal customers",
    discountType: "percentage",
    discountValue: 10,
    status: "inactive",
    usageLimit: 0,
    usageCount: 0,
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-12-31"),
    createdBy: "Urban Grooming Space",
    businessId: "2",
  },
]

// Mock data for coupon stats
const couponStats = {
  totalCoupons: 12,
  activeCoupons: 8,
  totalRedemptions: 1056,
  totalDiscountAmount: 128750,
}

export default function AdminCouponsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddCouponDialogOpen, setIsAddCouponDialogOpen] = useState(false)
  const [isEditCouponDialogOpen, setIsEditCouponDialogOpen] = useState(false)
  const [isDeleteCouponDialogOpen, setIsDeleteCouponDialogOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null)
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: 0,
    usageLimit: 0,
    startDate: "",
    endDate: "",
  })

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || coupon.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-amber-100 text-amber-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEditCoupon = (coupon: any) => {
    setSelectedCoupon(coupon)
    setIsEditCouponDialogOpen(true)
  }

  const handleDeleteCoupon = (coupon: any) => {
    setSelectedCoupon(coupon)
    setIsDeleteCouponDialogOpen(true)
  }

  const handleAddCoupon = () => {
    // In a real app, this would make an API call to add the coupon
    console.log("Adding coupon:", newCoupon)
    setIsAddCouponDialogOpen(false)
    // Reset form
    setNewCoupon({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      usageLimit: 0,
      startDate: "",
      endDate: "",
    })
  }

  const handleUpdateCoupon = () => {
    // In a real app, this would make an API call to update the coupon
    console.log("Updating coupon:", selectedCoupon)
    setIsEditCouponDialogOpen(false)
  }

  const handleConfirmDelete = () => {
    // In a real app, this would make an API call to delete the coupon
    console.log("Deleting coupon:", selectedCoupon)
    setIsDeleteCouponDialogOpen(false)
  }

  return (
    <AdminShell requiredPermission="coupons.view">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Coupon Management</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddCouponDialogOpen} onOpenChange={setIsAddCouponDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Coupon
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Coupon</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="code" className="text-right text-sm font-medium">
                      Code
                    </label>
                    <Input
                      id="code"
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                      className="col-span-3"
                      placeholder="e.g. SUMMER25"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="description" className="text-right text-sm font-medium">
                      Description
                    </label>
                    <Input
                      id="description"
                      value={newCoupon.description}
                      onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                      className="col-span-3"
                      placeholder="e.g. 25% off summer special"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="discountType" className="text-right text-sm font-medium">
                      Discount Type
                    </label>
                    <select
                      id="discountType"
                      value={newCoupon.discountType}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                      className="col-span-3 border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="discountValue" className="text-right text-sm font-medium">
                      Discount Value
                    </label>
                    <Input
                      id="discountValue"
                      type="number"
                      value={newCoupon.discountValue}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                      className="col-span-3"
                      placeholder={newCoupon.discountType === "percentage" ? "e.g. 25" : "e.g. 100"}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="usageLimit" className="text-right text-sm font-medium">
                      Usage Limit
                    </label>
                    <Input
                      id="usageLimit"
                      type="number"
                      value={newCoupon.usageLimit}
                      onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: Number(e.target.value) })}
                      className="col-span-3"
                      placeholder="e.g. 500 (0 for unlimited)"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="startDate" className="text-right text-sm font-medium">
                      Start Date
                    </label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newCoupon.startDate}
                      onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="endDate" className="text-right text-sm font-medium">
                      End Date
                    </label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newCoupon.endDate}
                      onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCouponDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCoupon} className="bg-purple-600 hover:bg-purple-700">
                    Create Coupon
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{couponStats.totalCoupons}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{couponStats.activeCoupons}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Redemptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{couponStats.totalRedemptions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Discount Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{couponStats.totalDiscountAmount.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search coupons..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 self-end">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
            <Button variant="ghost" size="icon" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.length > 0 ? (
                filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {coupon.code}
                      </Badge>
                    </TableCell>
                    <TableCell>{coupon.description}</TableCell>
                    <TableCell>
                      {coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(coupon.status)}>
                        {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {coupon.usageCount}/{coupon.usageLimit > 0 ? coupon.usageLimit : "∞"}
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>{format(coupon.startDate, "dd MMM yyyy")}</div>
                        <div>to {format(coupon.endDate, "dd MMM yyyy")}</div>
                      </div>
                    </TableCell>
                    <TableCell>{coupon.createdBy}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center" onClick={() => handleEditCoupon(coupon)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            View Usage
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center text-red-600"
                            onClick={() => handleDeleteCoupon(coupon)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Tag className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-500">No coupons found matching your search criteria</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredCoupons.length} of {coupons.length} coupons
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-purple-50">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Coupon Dialog */}
      {selectedCoupon && (
        <Dialog open={isEditCouponDialogOpen} onOpenChange={setIsEditCouponDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Coupon</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-code" className="text-right text-sm font-medium">
                  Code
                </label>
                <Input
                  id="edit-code"
                  value={selectedCoupon.code}
                  onChange={(e) => setSelectedCoupon({ ...selectedCoupon, code: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-description" className="text-right text-sm font-medium">
                  Description
                </label>
                <Input
                  id="edit-description"
                  value={selectedCoupon.description}
                  onChange={(e) => setSelectedCoupon({ ...selectedCoupon, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-discountType" className="text-right text-sm font-medium">
                  Discount Type
                </label>
                <select
                  id="edit-discountType"
                  value={selectedCoupon.discountType}
                  onChange={(e) => setSelectedCoupon({ ...selectedCoupon, discountType: e.target.value })}
                  className="col-span-3 border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-discountValue" className="text-right text-sm font-medium">
                  Discount Value
                </label>
                <Input
                  id="edit-discountValue"
                  type="number"
                  value={selectedCoupon.discountValue}
                  onChange={(e) => setSelectedCoupon({ ...selectedCoupon, discountValue: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right text-sm font-medium">
                  Status
                </label>
                <select
                  id="edit-status"
                  value={selectedCoupon.status}
                  onChange={(e) => setSelectedCoupon({ ...selectedCoupon, status: e.target.value })}
                  className="col-span-3 border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-usageLimit" className="text-right text-sm font-medium">
                  Usage Limit
                </label>
                <Input
                  id="edit-usageLimit"
                  type="number"
                  value={selectedCoupon.usageLimit}
                  onChange={(e) => setSelectedCoupon({ ...selectedCoupon, usageLimit: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditCouponDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCoupon} className="bg-purple-600 hover:bg-purple-700">
                Update Coupon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedCoupon && (
        <Dialog open={isDeleteCouponDialogOpen} onOpenChange={setIsDeleteCouponDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Are you sure you want to delete the coupon <span className="font-bold">{selectedCoupon.code}</span>?
              </p>
              <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteCouponDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminShell>
  )
}
