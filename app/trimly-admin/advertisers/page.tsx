"use client"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Megaphone,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for advertisers
const advertisers = [
  {
    id: "1",
    name: "Beauty Products Inc.",
    contactPerson: "Ravi Sharma",
    email: "ravi@beautyproducts.com",
    phone: "+91 98765 43210",
    status: "active",
    verified: true,
    activeAds: 5,
    totalSpend: "₹45,000",
    joinDate: "10 Jan 2023",
  },
  {
    id: "2",
    name: "Salon Supplies Co.",
    contactPerson: "Priya Patel",
    email: "priya@salonsupplies.com",
    phone: "+91 87654 32109",
    status: "active",
    verified: true,
    activeAds: 3,
    totalSpend: "₹32,500",
    joinDate: "5 Feb 2023",
  },
  {
    id: "3",
    name: "Grooming Essentials",
    contactPerson: "Amit Kumar",
    email: "amit@groomingessentials.com",
    phone: "+91 76543 21098",
    status: "pending",
    verified: false,
    activeAds: 0,
    totalSpend: "₹0",
    joinDate: "20 Mar 2023",
  },
  {
    id: "4",
    name: "Style Accessories",
    contactPerson: "Neha Gupta",
    email: "neha@styleaccessories.com",
    phone: "+91 65432 10987",
    status: "active",
    verified: true,
    activeAds: 2,
    totalSpend: "₹18,750",
    joinDate: "15 Apr 2023",
  },
  {
    id: "5",
    name: "Glamour Cosmetics",
    contactPerson: "Vikram Singh",
    email: "vikram@glamourcosmetics.com",
    phone: "+91 54321 09876",
    status: "suspended",
    verified: true,
    activeAds: 0,
    totalSpend: "₹27,300",
    joinDate: "8 May 2023",
  },
]

export default function AdvertisersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredAdvertisers = advertisers.filter((advertiser) => {
    const matchesSearch =
      advertiser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advertiser.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advertiser.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advertiser.phone.includes(searchTerm)

    const matchesStatus = selectedStatus === "all" || advertiser.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminShell requiredPermission="advertisers.view">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Advertisers</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Megaphone className="h-4 w-4 mr-2" />
              Add Advertiser
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search advertisers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 self-end">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
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
                <TableHead>Advertiser</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Active Ads</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdvertisers.length > 0 ? (
                filteredAdvertisers.map((advertiser) => (
                  <TableRow key={advertiser.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${advertiser.name}`} />
                          <AvatarFallback>{advertiser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{advertiser.name}</p>
                          <p className="text-xs text-gray-500">ID: {advertiser.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{advertiser.contactPerson}</p>
                        <p className="text-xs text-gray-500">{advertiser.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(advertiser.status)}>
                        {advertiser.status.charAt(0).toUpperCase() + advertiser.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {advertiser.verified ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>{advertiser.activeAds}</TableCell>
                    <TableCell>{advertiser.totalSpend}</TableCell>
                    <TableCell>{advertiser.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center text-red-600">
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
                    No advertisers found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredAdvertisers.length} of {advertisers.length} advertisers
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
    </AdminShell>
  )
}
