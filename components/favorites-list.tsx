"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, MapPin, Heart, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for favorite salons
const favoriteSalons = [
  {
    id: "1",
    name: "Royal Gents Salon",
    location: "Kothrud",
    rating: 4.8,
    reviews: 124,
    distance: "1.2 km",
    waitTime: "10 min",
    imageUrl: "/urban-grooming-space.png",
    category: "Men's Salon",
    isFavorite: true,
  },
  {
    id: "3",
    name: "Sparsh Spa & Massage",
    location: "Baner",
    rating: 4.9,
    reviews: 156,
    distance: "4.8 km",
    waitTime: "45 min",
    imageUrl: "/serene-spa-retreat.png",
    category: "Spa & Massage",
    isFavorite: true,
  },
]

export function FavoriteSalonsList() {
  const [favorites, setFavorites] = useState(favoriteSalons)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [salonToShare, setSalonToShare] = useState<any>(null)
  const [shareMethod, setShareMethod] = useState<"whatsapp" | "copy" | null>(null)
  const [copied, setCopied] = useState(false)

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter((salon) => salon.id !== id))
  }

  const openShareDialog = (salon: any) => {
    setSalonToShare(salon)
    setShareDialogOpen(true)
    setCopied(false)
    setShareMethod(null)
  }

  const handleShare = (method: "whatsapp" | "copy") => {
    setShareMethod(method)

    const salonSlug = salonToShare.name.toLowerCase().replace(/\s+/g, "-")
    const shareUrl = `https://trimly.app/salon/${salonSlug}`

    if (method === "whatsapp") {
      const whatsappUrl = `https://wa.me/?text=Check out ${salonToShare.name} on Trimly: ${shareUrl}`
      window.open(whatsappUrl, "_blank")
    } else if (method === "copy") {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
    }
  }

  if (favorites.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No Favorites Yet</h3>
          <p className="text-gray-500 mt-1 text-center">
            You haven't added any salons to your favorites yet. Explore salons and tap the heart icon to add them here.
          </p>
          <Link href="/explore">
            <Button className="mt-4 bg-rose-600 hover:bg-rose-700">Explore Salons</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {favorites.map((salon) => {
          const salonSlug = salon.name.toLowerCase().replace(/\s+/g, "-")

          return (
            <Card key={salon.id}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      src={salon.imageUrl || "/placeholder.svg"}
                      alt={salon.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{salon.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-0.5">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{salon.location}</span>
                          <span className="mx-1.5">•</span>
                          <span>{salon.distance}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{salon.rating}</span>
                        <span className="ml-1 text-xs text-gray-500">({salon.reviews})</span>
                      </div>
                    </div>

                    <div className="flex justify-between mt-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-rose-600"
                          onClick={() => handleRemoveFavorite(salon.id)}
                        >
                          <Heart className="h-3.5 w-3.5 mr-1 fill-rose-600" />
                          Remove
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openShareDialog(salon)}>
                          <Share2 className="h-3.5 w-3.5 mr-1" />
                          Share
                        </Button>
                      </div>
                      <Link href={`/salon/${salonSlug}`}>
                        <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                          View Salon
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

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share {salonToShare?.name}</DialogTitle>
            <DialogDescription>Choose how you'd like to share this salon with others</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
              onClick={() => handleShare("whatsapp")}
            >
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mb-2">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span>WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
              onClick={() => handleShare("copy")}
            >
              <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
