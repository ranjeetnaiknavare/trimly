import { Star, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface SalonCardProps {
  name: string
  location: string
  rating: number
  reviews: number
  distance: string
  waitTime: string
  imageUrl: string
  category: string
}

export function SalonCard({ name, location, rating, reviews, distance, waitTime, imageUrl, category }: SalonCardProps) {
  return (
    <Link href={`/salon/${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-start p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex-shrink-0 mr-3">
          <img src={imageUrl || "/placeholder.svg"} alt={name} className="w-20 h-20 rounded-lg object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-0.5">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{location}</span>
                <span className="mx-1.5">•</span>
                <span>{distance}</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200">
              {category}
            </Badge>
          </div>

          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
              <span className="ml-1 text-xs text-gray-500">({reviews})</span>
            </div>
            <div className="flex items-center ml-4">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="ml-1 text-sm">{waitTime} wait</span>
            </div>
          </div>

          <div className="flex mt-2">
            <button className="text-xs font-medium text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full mr-2">
              Join Queue
            </button>
            <button className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">Book</button>
          </div>
        </div>
      </div>
    </Link>
  )
}
