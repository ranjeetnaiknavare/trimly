"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Edit2, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for user reviews
const userReviews = [
  {
    id: "r1",
    salonId: "1",
    salonName: "Royal Gents Salon",
    salonImage: "/urban-grooming-space.png",
    rating: 5,
    date: "20 Jul 2023",
    comment: "Great service! The stylist was very professional and I'm very happy with my haircut.",
    serviceUsed: "Haircut",
  },
  {
    id: "r2",
    salonId: "2",
    salonName: "Urban Hair Studio",
    salonImage: "/urban-chic-salon.png",
    rating: 4,
    date: "5 Aug 2023",
    comment: "Good experience overall. The wait time was a bit longer than expected but the service was good.",
    serviceUsed: "Hair Color",
  },
]

export function CustomerReviews() {
  const [reviews, setReviews] = useState(userReviews)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null)

  const handleDeleteReview = () => {
    if (reviewToDelete) {
      setReviews(reviews.filter((review) => review.id !== reviewToDelete))
      setDeleteDialogOpen(false)
      setReviewToDelete(null)
    }
  }

  const openDeleteDialog = (reviewId: string) => {
    setReviewToDelete(reviewId)
    setDeleteDialogOpen(true)
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No Reviews Yet</h3>
          <p className="text-gray-500 mt-1 text-center">
            You haven't written any reviews yet. After your visit, you can share your experience to help others.
          </p>
          <Link href="/bookings?write=true">
            <Button className="mt-4 bg-rose-600 hover:bg-rose-700">View Bookings</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {reviews.map((review) => {
          const salonSlug = review.salonName.toLowerCase().replace(/\s+/g, "-")

          return (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      src={review.salonImage || "/placeholder.svg"}
                      alt={review.salonName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Link href={`/salon/${salonSlug}`}>
                        <h3 className="font-medium text-gray-900 hover:text-rose-600">{review.salonName}</h3>
                      </Link>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>

                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      {review.serviceUsed && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {review.serviceUsed}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-gray-600">{review.comment}</p>

                    <div className="flex justify-end mt-3 space-x-2">
                      <Link href={`/review/edit/${review.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit2 className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => openDeleteDialog(review.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Delete
                      </Button>
                      <Link href={`/review/create/${review.id}`}>
                        <Button size="sm" variant="outline" className="text-rose-600">
                          Write Review
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteReview}>
              Delete Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
