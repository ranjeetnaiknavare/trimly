import { Star } from "lucide-react"

interface ReviewCardProps {
  review: {
    id: string
    userName: string
    rating: number
    date: string
    comment: string
    serviceUsed?: string
  }
}

export function ReviewCard({ review }: ReviewCardProps) {
  // Make sure we're not rendering the review object directly
  // but instead accessing its properties
  return (
    <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">{review.userName}</h3>
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>
      <div className="flex items-center mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
        {review.serviceUsed && (
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{review.serviceUsed}</span>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
    </div>
  )
}
