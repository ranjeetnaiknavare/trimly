"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Download, ArrowUpDown, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format, parseISO } from "date-fns"

// Mock data for coupon usage
const mockCouponUsage = [
  {
    id: "1",
    couponCode: "WELCOME20",
    salonId: "salon-1",
    salonName: "Royal Gents Salon",
    customerId: "cust-1",
    customerName: "Rahul Sharma",
    bookingId: "book-1",
    bookingAmount: 1200,
    discountAmount: 240,
    usedAt: "2023-07-15T14:30:00Z",
  },
  {
    id: "2",
    couponCode: "WELCOME20",
    salonId: "salon-2",
    salonName: "Elegance Beauty Parlour",
    customerId: "cust-2",
    customerName: "Priya Patel",
    bookingId: "book-2",
    bookingAmount: 1800,
    discountAmount: 360,
    usedAt: "2023-07-16T11:15:00Z",
  },
  {
    id: "3",
    couponCode: "HAIRCUT100",
    salonId: "salon-1",
    salonName: "Royal Gents Salon",
    customerId: "cust-3",
    customerName: "Amit Kumar",
    bookingId: "book-3",
    bookingAmount: 450,
    discountAmount: 100,
    usedAt: "2023-07-17T16:45:00Z",
  },
  {
    id: "4",
    couponCode: "SUMMER25",
    salonId: "salon-3",
    salonName: "Trendy Cuts",
    customerId: "cust-4",
    customerName: "Neha Singh",
    bookingId: "book-4",
    bookingAmount: 2200,
    discountAmount: 500,
    usedAt: "2023-07-18T10:00:00Z",
  },
  {
    id: "5",
    couponCode: "WELCOME20",
    salonId: "salon-4",
    salonName: "Style Studio",
    customerId: "cust-5",
    customerName: "Vikram Malhotra",
    bookingId: "book-5",
    bookingAmount: 950,
    discountAmount: 190,
    usedAt: "2023-07-19T13:20:00Z",
  },
]

// Mock data for coupon stats
const mockCouponStats = {
  totalCoupons: 12,
  activeCoupons: 8,
  totalRedemptions: 156,
  totalDiscountAmount: 28750,
}

export default function AdminCouponsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSalon, setFilterSalon] = useState<string>("all")
  const [filterCoupon, setFilterCoupon] = useState<string>("all")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)

  // Get unique salon names for filter
  const salonOptions = Array.from(new Set(mockCouponUsage.map((item) => item.salonName)))

  // Get unique coupon codes for filter
  const couponOptions = Array.from(new Set(mockCouponUsage.map((item) => item.couponCode)))

  // Filter and sort data
  const filteredData = mockCouponUsage.filter((item) => {
    // Apply search query
    if (
      searchQuery &&
      !item.couponCode.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.salonName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Apply salon filter
    if (filterSalon !== "all" && item.salonName !== filterSalon) {
      return false
    }

    // Apply coupon filter
    if (filterCoupon !== "all" && item.couponCode !== filterCoupon) {
      return false
    }

    return true
  })

  // Sort data if sort config exists
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0

    const { key, direction } = sortConfig
    const aValue = a[key as keyof typeof a]
    const bValue = b[key as keyof typeof b]

    if (aValue < bValue) {
      return direction === "asc" ? -1 : 1
    }
    if (aValue > bValue) {
      return direction === "asc" ? 1 : -1
    }
    return 0
  })

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const renderSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUpDown className="ml-1 h-4 w-4 text-rose-600" />
    ) : (
      <ArrowUpDown className="ml-1 h-4 w-4 text-rose-600 rotate-180" />
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Coupon Management</h1>
          <p className="text-gray-600">Track and analyze coupon usage across all salons</p>
        </div>
        <Button className="mt-2 md:mt-0">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCouponStats.totalCoupons}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCouponStats.activeCoupons}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Redemptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCouponStats.totalRedemptions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Discount Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockCouponStats.totalDiscountAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by coupon, salon, or customer"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterSalon} onValueChange={setFilterSalon}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Salon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Salons</SelectItem>
              {salonOptions.map((salon) => (
                <SelectItem key={salon} value={salon}>
                  {salon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterCoupon} onValueChange={setFilterCoupon}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Coupon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Coupons</SelectItem>
              {couponOptions.map((coupon) => (
                <SelectItem key={coupon} value={coupon}>
                  {coupon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort("couponCode")}>
                  <div className="flex items-center">
                    Coupon Code
                    {renderSortIcon("couponCode")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("salonName")}>
                  <div className="flex items-center">
                    Salon
                    {renderSortIcon("salonName")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("customerName")}>
                  <div className="flex items-center">
                    Customer
                    {renderSortIcon("customerName")}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort("bookingAmount")}>
                  <div className="flex items-center justify-end">
                    Booking Amount
                    {renderSortIcon("bookingAmount")}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort("discountAmount")}>
                  <div className="flex items-center justify-end">
                    Discount
                    {renderSortIcon("discountAmount")}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort("usedAt")}>
                  <div className="flex items-center justify-end">
                    Used On
                    {renderSortIcon("usedAt")}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Tag className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-500">No coupon usage data found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {item.couponCode}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.salonName}</TableCell>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell className="text-right">₹{item.bookingAmount}</TableCell>
                    <TableCell className="text-right text-green-600">-₹{item.discountAmount}</TableCell>
                    <TableCell className="text-right">{format(parseISO(item.usedAt), "dd MMM yyyy, h:mm a")}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
