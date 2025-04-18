"use client"

import { useState } from "react"
import { Search, Star, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock reviews data
const reviews = [
  {
    id: "R1001",
    customerName: "Rahul Sharma",
    customerAvatar: "/placeholder.svg?key=e2wzl",
    rating: 5,
    date: "2023-04-15",
    comment:
      "Excellent service! The staff was very professional and friendly. The haircut was exactly what I wanted. Will definitely come back.",
    service: "Haircut & Beard Trim",
    staff: "Rajesh",
    replied: true,
    reply: "Thank you for your kind words, Rahul! We look forward to serving you again.",
  },
  {
    id: "R1002",
    customerName: "Priya Patel",
    customerAvatar: "/placeholder.svg?key=xebou",
    rating: 4,
    date: "2023-04-12",
    comment:
      "Great experience overall. The salon was clean and well-maintained. The stylist was skilled, but I had to wait a bit longer than expected. Would recommend.",
    service: "Hair Color",
    staff: "Sunil",
    replied: false,
    reply: "",
  },
  {
    id: "R1003",
    customerName: "Amit Kumar",
    customerAvatar: "/placeholder.svg?key=gdqdb",
    rating: 3,
    date: "2023-04-10",
    comment:
      "Average experience. The haircut was good but the waiting time was too long. The staff could be more attentive.",
    service: "Regular Haircut",
    staff: "Vikram",
    replied: true,
    reply:
      "We apologize for the wait time, Amit. We're working on improving our scheduling system. Thank you for your feedback.",
  },
  {
    id: "R1004",
    customerName: "Neha Singh",
    customerAvatar: "/placeholder.svg?key=nvwoe",
    rating: 5,
    date: "2023-04-08",
    comment:
      "Absolutely loved my facial! The therapist was very knowledgeable and gave me great skincare tips. My skin feels amazing!",
    service: "Premium Facial",
    staff: "Anjali",
    replied: true,
    reply: "Thank you for your wonderful review, Neha! We're glad you enjoyed your facial treatment.",
  },
  {
    id: "R1005",
    customerName: "Vikram Malhotra",
    customerAvatar: "/placeholder.svg?key=2iwcf",
    rating: 2,
    date: "2023-04-05",
    comment:
      "Disappointed with the service. The haircut was not what I asked for, and the staff seemed rushed. Not sure if I'll return.",
    service: "Premium Haircut",
    staff: "Rajesh",
    replied: true,
    reply:
      "We're very sorry to hear about your experience, Vikram. We'd like to make it right. Please contact us directly so we can offer you a complimentary service.",
  },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [filterReplied, setFilterReplied] = useState("all")
  const [replyText, setReplyText] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  // Filter reviews based on search term, rating, and replied status
  const filteredReviews = reviews.filter(
    (review) =>
      (filterRating === "all" || review.rating.toString() === filterRating) &&
      (filterReplied === "all" ||
        (filterReplied === "replied" && review.replied) ||
        (filterReplied === "unreplied" && !review.replied)) &&
      (review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.service.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleReply = (reviewId: string) => {
    // In a real app, this would send the reply to the database
    console.log("Replying to review:", reviewId, "with text:", replyText)
    setReplyText("")
    setReplyingTo(null)
  }

  // Calculate average rating
  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length

  // Count reviews by rating
  const ratingCounts = reviews.reduce(
    (counts, review) => {
      counts[review.rating] = (counts[review.rating] || 0) + 1
      return counts
    },
    {} as Record<number, number>,
  )

  return (
    <BusinessDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
          <p className="text-gray-600">Manage and respond to customer feedback</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-amber-500">{averageRating.toFixed(1)}</div>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating) ? "text-amber-500 fill-amber-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">Based on {reviews.length} reviews</div>
            </div>
          </CardContent>
        </Card>

        {[5, 4, 3, 2, 1].map((rating) => (
          <Card key={rating}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-lg font-medium">{rating}</div>
                  <Star
                    className={`h-5 w-5 ml-1 ${rating >= 4 ? "text-amber-500 fill-amber-500" : rating === 3 ? "text-amber-400 fill-amber-400" : "text-red-500 fill-red-500"}`}
                  />
                </div>
                <div className="text-lg font-bold">{ratingCounts[rating] || 0}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterReplied} onValueChange={setFilterReplied}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="unreplied">Unreplied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.customerAvatar || "/placeholder.svg"} alt={review.customerName} />
                    <AvatarFallback>
                      {review.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{review.customerName}</h3>
                      <Badge variant="outline" className="text-gray-500">
                        {review.service}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>

                    {review.replied && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100">Owner Reply</Badge>
                          <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-1 text-gray-600">{review.reply}</p>
                      </div>
                    )}

                    {!review.replied && replyingTo !== review.id && (
                      <Button variant="outline" size="sm" className="mt-4" onClick={() => setReplyingTo(review.id)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    )}

                    {replyingTo === review.id && (
                      <div className="mt-4">
                        <Input
                          placeholder="Write your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="mb-2"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-rose-600 hover:bg-rose-700"
                            onClick={() => handleReply(review.id)}
                          >
                            Send Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setReplyingTo(null)
                              setReplyText("")
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </BusinessDashboardLayout>
  )
}
