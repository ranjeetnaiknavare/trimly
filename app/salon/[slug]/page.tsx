import Link from "next/link"
import { ArrowLeft, Star, MapPin, Clock, Phone, Calendar, MessageSquare, Share2, Heart, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ServiceItem } from "@/components/service-item"
import { ReviewCard } from "@/components/review-card"
import { SalonGallery } from "@/components/salon-gallery"
import { SalonHours } from "@/components/salon-hours"

// This would typically come from a database
const getSalonData = (slug: string) => {
  // For demo purposes, we're returning mock data
  return {
    id: "1",
    name: "Royal Gents Salon",
    slug: "royal-gents-salon",
    category: "Men's Salon",
    description:
      "Premium men's grooming salon offering haircuts, beard trims, facials, and more. Our experienced stylists ensure you leave looking your best.",
    location: "Shop 7, Mayur Complex, Kothrud, Pune",
    phone: "+91 98765 43210",
    rating: 4.8,
    reviewCount: 124, // Changed from 'reviews' to 'reviewCount' to avoid confusion
    waitTime: "10 min",
    distance: "1.2 km",
    isOpen: true,
    isFavorite: false,
    mainImage: "/urban-grooming-space.png",
    gallery: ["/salon-interior-1.png", "/salon-interior-2.png", "/salon-interior-3.png", "/salon-interior-4.png"],
    services: [
      {
        id: "s1",
        name: "Haircut",
        description: "Includes wash, cut, and styling",
        price: 250,
        duration: 30,
        popular: true,
      },
      {
        id: "s2",
        name: "Beard Trim",
        description: "Shape and style your beard",
        price: 150,
        duration: 15,
        popular: false,
      },
      {
        id: "s3",
        name: "Hair Color",
        description: "Professional coloring service",
        price: 800,
        duration: 60,
        popular: false,
      },
      {
        id: "s4",
        name: "Facial",
        description: "Deep cleansing and rejuvenating",
        price: 500,
        duration: 45,
        popular: true,
      },
      {
        id: "s5",
        name: "Head Massage",
        description: "Relaxing scalp massage with oil",
        price: 300,
        duration: 20,
        popular: false,
      },
    ],
    reviewItems: [
      // Changed from 'reviews' to 'reviewItems' to avoid confusion
      {
        id: "r1",
        userName: "Rahul S.",
        rating: 5,
        date: "2 days ago",
        comment: "Great service! The stylist was very professional and I'm very happy with my haircut.",
        serviceUsed: "Haircut",
      },
      {
        id: "r2",
        userName: "Amit P.",
        rating: 4,
        date: "1 week ago",
        comment: "Good experience overall. The wait time was a bit longer than expected but the service was good.",
        serviceUsed: "Beard Trim",
      },
      {
        id: "r3",
        userName: "Vikram M.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Excellent facial! My skin feels refreshed and the ambiance was relaxing.",
        serviceUsed: "Facial",
      },
    ],
    hours: [
      { day: "Monday", hours: "10:00 AM - 8:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 8:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 8:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 8:00 PM" },
      { day: "Friday", hours: "10:00 AM - 9:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 9:00 PM" },
      { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
    ],
  }
}

export default function SalonDetailPage({ params }: { params: { slug: string } }) {
  const salon = getSalonData(params.slug)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{salon.name}</h1>
        </div>
      </header>

      <main className="flex-1">
        {/* Salon Hero Image */}
        <div className="relative h-48 bg-gray-200">
          <img src={salon.mainImage || "/placeholder.svg"} alt={salon.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
              <Heart className="w-4 h-4" fill={salon.isFavorite ? "currentColor" : "none"} />
            </Button>
          </div>
        </div>

        {/* Salon Info */}
        <div className="container px-4 py-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center">
                <h2 className="text-xl font-bold">{salon.name}</h2>
                <Badge variant="outline" className="ml-2 bg-rose-50 text-rose-600 border-rose-200">
                  {salon.category}
                </Badge>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{salon.location}</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm font-medium">{salon.rating}</span>
                  <span className="ml-1 text-xs text-gray-500">({salon.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center ml-4">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="ml-1 text-sm">{salon.waitTime} wait</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-sm font-medium ${salon.isOpen ? "text-green-600" : "text-red-600"}`}>
                {salon.isOpen ? "Open Now" : "Closed"}
              </span>
              <a href={`tel:${salon.phone}`} className="flex items-center mt-1 text-sm text-blue-600">
                <Phone className="w-3 h-3 mr-1" />
                <span>{salon.phone}</span>
              </a>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-600">{salon.description}</p>

          {/* Quick Actions */}
          <div className="flex gap-2 mt-4">
            <Link href={`/salon/${params.slug}/book?type=queue`} className="flex-1">
              <Button className="w-full bg-rose-600 hover:bg-rose-700">
                <Clock className="w-4 h-4 mr-2" />
                Join Queue
              </Button>
            </Link>
            <Link href={`/salon/${params.slug}/book?type=appointment`} className="flex-1">
              <Button variant="outline" className="w-full border-rose-200 text-rose-600 hover:bg-rose-50">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="container px-4 pb-6">
          <Tabs defaultValue="services">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="services"
                className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600"
              >
                Services
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="info" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="mt-4">
              <div className="space-y-3">
                {salon.services.map((service) => (
                  <ServiceItem key={service.id} service={service} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-lg font-bold">{salon.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({salon.reviewCount} reviews)</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-rose-600 border-rose-200">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Write Review
                </Button>
              </div>

              <div className="space-y-4">
                {Array.isArray(salon.reviewItems) && salon.reviewItems.length > 0 ? (
                  salon.reviewItems.map((review) => <ReviewCard key={review.id} review={review} />)
                ) : (
                  <p>No reviews available</p>
                )}
                <Button variant="ghost" className="w-full text-rose-600">
                  View All Reviews
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="info" className="mt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Photos</h3>
                  <SalonGallery images={salon.gallery} />
                  <Button variant="ghost" className="w-full mt-2 text-rose-600">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    View All Photos
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Business Hours</h3>
                  <SalonHours hours={salon.hours} />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Location</h3>
                  <div className="h-40 bg-gray-200 rounded-lg overflow-hidden">
                    <img src="/kothrud-pune-map.png" alt="Map" className="w-full h-full object-cover" />
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="container flex gap-2">
          <Link href={`/salon/${params.slug}/book?type=queue`} className="flex-1">
            <Button className="w-full bg-rose-600 hover:bg-rose-700">Join Queue</Button>
          </Link>
          <Link href={`/salon/${params.slug}/book?type=appointment`} className="flex-1">
            <Button variant="outline" className="w-full border-rose-200 text-rose-600 hover:bg-rose-50">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
