"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Mock review data - in a real app, this would be fetched from an API
const getReviewDetails = (id: string) => {
  return {
    id,
    salonId: "1",
    salonName: "Royal Gents Salon",
    salonImage: "/urban-grooming-space.png",
    rating: 5,
    date: "20 Jul 2023",
    comment: "Great service! The stylist was very professional and I'm very happy with my haircut.",
    serviceUsed: "Haircut",
  }
}

export default function EditReviewPage({ params }: { params: { reviewId: string } }) {
  const router = useRouter()
  const review = getReviewDetails(params.reviewId)
  const [rating, setRating] = useState(review.rating)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState(review.comment)
  const [serviceUsed, setServiceUsed] = useState<string>(review.serviceUsed)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    setIsSubmitting(true)

    // In a real app, this would update the review via an API
    console.log({
      reviewId: review.id,
      salonId: review.salonId,
      rating,
      comment,
      serviceUsed,
    })

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect to the reviews tab in the profile page
      router.push("/profile?tab=reviews")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center h-16 px-4">
          <Link href="/profile?tab=reviews" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Edit Review</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="max-w-md mx-auto">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <img
                    src={review.salonImage || "/placeholder.svg"}
                    alt={review.salonName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{review.salonName}</h3>
                  <p className="text-sm text-gray-500 mt-1">Review posted on {review.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Update your rating</h3>
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoveredRating || rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              {rating > 0 && (
                <p className="text-center mt-2 text-sm font-medium">
                  {rating === 1
                    ? "Poor"
                    : rating === 2
                      ? "Fair"
                      : rating === 3
                        ? "Good"
                        : rating === 4
                          ? "Very Good"
                          : "Excellent"}
                </p>
              )}
            </div>

            <div>
              <h3 className="font-medium mb-2">Service used</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id={`service-${serviceUsed}`} checked={true} disabled />
                  <Label htmlFor={`service-${serviceUsed}`}>{serviceUsed}</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Update your review</h3>
              <Textarea
                placeholder="Tell others about your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700"
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? "Updating..." : "Update Review"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
