import { Star, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 relative">
          <img src={imageUrl || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          {category && (
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-xs">
                {category}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex-1 p-3">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center mt-2">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-xs font-medium">{rating}</span>
            <span className="ml-1 text-xs text-gray-500">({reviews} reviews)</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <div className="flex items-center text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>{waitTime} wait</span>
            </div>
            <div className="text-gray-500">{distance}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
