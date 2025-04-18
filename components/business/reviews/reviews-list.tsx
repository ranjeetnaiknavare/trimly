"use client"

import { useState } from "react"
import { Search, Star, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

// Mock data for reviews
const initialReviews = [
  {
    id: "1",
    customerName: "Olivia Martin",
    customerAvatar: "/colorful-abstract-shapes.png",
    rating: 5,
    comment:
      "Amazing service! My haircut looks fantastic and the staff was very friendly. Will definitely come back again.",
    date: new Date(2023, 3, 15),
    replied: true,
    reply:
      "Thank you for your kind words, Olivia! We're glad you enjoyed your experience and look forward to seeing you again soon.",
    replyDate: new Date(2023, 3, 16),
  },
  {
    id: "2",
    customerName: "Jackson Lee",
    customerAvatar: "/colorful-abstract-shapes.png",
    rating: 4,
    comment:
      "Great experience overall. The stylist was knowledgeable and gave me exactly what I wanted. Only giving 4 stars because the wait time was a bit longer than expected.",
    date: new Date(2023, 3, 10),
    replied: false,
    reply: "",
    replyDate: null,
  },
  {
    id: "3",
    customerName: "Isabella Nguyen",
    customerAvatar: "/abstract-geometric-shapes.png",
    rating: 3,
    comment:
      "The service was okay. My manicure looks good but the technician seemed rushed and didn't pay much attention to detail.",
    date: new Date(2023, 2, 28),
    replied: true,
    reply:
      "We appreciate your feedback, Isabella. We're sorry to hear that your experience wasn't perfect. We'll address this with our team to ensure better service in the future.",
    replyDate: new Date(2023, 3, 1),
  },
  {
    id: "4",
    customerName: "William Johnson",
    customerAvatar: "/abstract-geometric-shapes.png",
    rating: 5,
    comment:
      "Excellent service from start to finish! The salon is clean and modern, and my stylist was fantastic. Highly recommend!",
    date: new Date(2023, 3, 18),
    replied: false,
    reply: "",
    replyDate: null,
  },
  {
    id: "5",
    customerName: "Sofia Rodriguez",
    customerAvatar: "/abstract-geometric-shapes.png",
    rating: 2,
    comment:
      "Disappointed with my visit. The stylist didn't listen to what I wanted and I ended up with a haircut I'm not happy with.",
    date: new Date(2023, 3, 5),
    replied: true,
    reply:
      "We're very sorry to hear about your experience, Sofia. We'd like to make this right. Please contact us directly so we can offer you a complimentary service to fix any issues.",
    replyDate: new Date(2023, 3, 6),
  },
]

export function ReviewsList() {
  const [reviews, setReviews] = useState(initialReviews)
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [replyText, setReplyText] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  // Filter reviews based on search query and rating
  const filteredReviews = reviews.filter(
    (review) =>
      (review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (ratingFilter === "all" || review.rating.toString() === ratingFilter),
  )

  const handleReply = (reviewId: string) => {
    if (replyText.trim()) {
      setReviews(
        reviews.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                replied: true,
                reply: replyText,
                replyDate: new Date(),
              }
            : review,
        ),
      )
      setReplyText("")
      setReplyingTo(null)
    }
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  // Calculate average rating
  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              className="h-9 w-[250px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[180px]">
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
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Average Rating: {averageRating.toFixed(1)}
          </Badge>
          <Badge variant="outline" className="text-sm">
            Total Reviews: {reviews.length}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No reviews found</div>
        ) : (
          filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
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
                        <div className="font-medium">{review.customerName}</div>
                        <div className="text-sm text-muted-foreground">{format(review.date, "MMM d, yyyy")}</div>
                      </div>
                    </div>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>

                  <div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>

                  {review.replied && (
                    <div className="bg-muted/50 p-4 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Owner Reply</Badge>
                        <span className="text-sm text-muted-foreground">
                          {review.replyDate && format(review.replyDate, "MMM d, yyyy")}
                        </span>
                      </div>
                      <p className="text-gray-600">{review.reply}</p>
                    </div>
                  )}

                  {!review.replied && (
                    <div>
                      {replyingTo === review.id ? (
                        <div className="space-y-2">
                          <Input
                            placeholder="Write your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleReply(review.id)}>
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
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => setReplyingTo(review.id)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          Reply to Review
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
