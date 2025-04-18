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
  Eye,
  Flag,
  CheckCircle,
  XCircle,
  Download,
  RefreshCw,
  MessageSquare,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for reviews
const reviews = [
  {
    id: "1",
    customer: "Rahul Sharma",
    business: "Serene Beauty Space",
    service: "Haircut & Styling",
    rating: 5,
    comment: "Excellent service! The stylist was very professional and did a fantastic job with my haircut.",
    date: "15 Aug 2023",
    status: "published",
    flagged: false,
  },
  {
    id: "2",
    customer: "Priya Patel",
    business: "Urban Grooming Space",
    service: "Facial Treatment",
    rating: 4,
    comment: "Very good facial treatment. My skin feels refreshed and clean. Would recommend!",
    date: "16 Aug 2023",
    status: "published",
    flagged: false,
  },
  {
    id: "3",
    customer: "Amit Kumar",
    business: "Elegant Beauty",
    service: "Full Body Massage",
    rating: 2,
    comment: "The massage was okay but the room was too cold and the therapist was not very experienced.",
    date: "17 Aug 2023",
    status: "flagged",
    flagged: true,
  },
  {
    id: "4",
    customer: "Sneha Gupta",
    business: "Style Studio",
    service: "Manicure & Pedicure",
    rating: 5,
    comment: "Amazing experience! My nails look beautiful and the staff was very friendly.",
    date: "18 Aug 2023",
    status: "published",
    flagged: false,
  },
  {
    id: "5",
    customer: "Vikram Singh",
    business: "Glamour Salon",
    service: "Hair Coloring",
    rating: 1,
    comment: "Terrible experience! They completely messed up my hair color. Will never go back!",
    date: "19 Aug 2023",
    status: "pending",
    flagged: true,
  },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedReview, setSelectedReview] = useState<(typeof reviews)[0] | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || review.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
              ★
            </span>
          ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    )
  }

  const viewReviewDetails = (review: (typeof reviews)[0]) => {
    setSelectedReview(review)
    setIsReviewDialogOpen(true)
  }

  return (
    <AdminShell requiredPermission="reviews.view">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search reviews..."
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
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
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
                <TableHead>Customer</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.customer}`} />
                          <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium">{review.customer}</p>
                      </div>
                    </TableCell>
                    <TableCell>{review.business}</TableCell>
                    <TableCell>{review.service}</TableCell>
                    <TableCell>{getRatingStars(review.rating)}</TableCell>
                    <TableCell>
                      <p className="truncate max-w-[200px]">{review.comment}</p>
                    </TableCell>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(review.status)}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center" onClick={() => viewReviewDetails(review)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {review.status !== "published" && (
                            <DropdownMenuItem className="flex items-center">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {!review.flagged && (
                            <DropdownMenuItem className="flex items-center">
                              <Flag className="mr-2 h-4 w-4" />
                              Flag Review
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="flex items-center text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
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
                    No reviews found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredReviews.length} of {reviews.length} reviews
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

        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Review Details
              </DialogTitle>
            </DialogHeader>
            {selectedReview && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedReview.customer}`} />
                      <AvatarFallback>{selectedReview.customer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedReview.customer}</p>
                      <p className="text-sm text-gray-500">{selectedReview.date}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(selectedReview.status)}>
                    {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Business</p>
                  <p>{selectedReview.business}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Service</p>
                  <p>{selectedReview.service}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Rating</p>
                  {getRatingStars(selectedReview.rating)}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Review</p>
                  <p className="mt-1 text-gray-700">{selectedReview.comment}</p>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  {selectedReview.status !== "published" && (
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  )}
                  {!selectedReview.flagged && (
                    <Button variant="outline">
                      <Flag className="mr-2 h-4 w-4" />
                      Flag Review
                    </Button>
                  )}
                  <Button variant="destructive">
                    <XCircle className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminShell>
  )
}
