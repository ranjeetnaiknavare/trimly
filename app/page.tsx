import Link from "next/link"
import { Search, MapPin, Clock, Calendar, User, Bell, Plus, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalonCard } from "@/components/salon-card"
import { CategoryPill } from "@/components/category-pill"
import { PromotionBanner } from "@/components/promotion-banner"
import { BottomNav } from "@/components/bottom-nav"
import { TrimlyLogo } from "@/components/trimly-logo"
import { QueueInfoTooltip } from "@/components/queue-info-tooltip"
import { AgentRegistrationBanner } from "@/components/agent-registration-banner"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium">Kothrud, Pune</span>
          </Link>
          <TrimlyLogo size="sm" />
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="container px-4 pb-3">
          <Link href="/explore" className="block">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search salons, parlours, spas..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                readOnly
              />
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Category Pills */}
        <div className="container px-4 py-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            <Link href="/explore?category=Men's Salon">
              <CategoryPill icon="scissors" label="Men's Salon" active />
            </Link>
            <Link href="/explore?category=Ladies Parlour">
              <CategoryPill icon="spa" label="Ladies Parlour" />
            </Link>
            <Link href="/explore?category=Spa & Massage">
              <CategoryPill icon="massage" label="Spa & Massage" />
            </Link>
            <Link href="/explore?category=Hair Studio">
              <CategoryPill icon="hair" label="Hair Studio" />
            </Link>
            <Link href="/explore?category=Beauty Lounge">
              <CategoryPill icon="beauty" label="Beauty Lounge" />
            </Link>
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="container px-4 mb-4">
          <PromotionBanner
            title="20% OFF on First Booking"
            description="Use code TRIMLY20 at any salon"
            imageUrl="/gradient-salon-promo.png"
          />
        </div>

        {/* Business Owner Card */}
        <div className="container px-4 mb-6">
          <Link href="/business">
            <Card className="bg-gradient-to-r from-purple-500 to-rose-500 text-white border-none hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Own a Salon or Spa?</h3>
                    <p className="text-sm text-white/90 mt-1">
                      Join Trimly to grow your business with bookings & local ads
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" className="bg-white text-rose-600 hover:bg-gray-100">
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Booking Tabs */}
        <div className="container px-4 mb-6">
          <Tabs defaultValue="nearby">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="nearby" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                <MapPin className="w-4 h-4 mr-2" />
                Nearby
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600"
              >
                <Clock className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
            </TabsList>
            <TabsContent value="nearby" className="mt-4">
              <div className="space-y-4">
                <SalonCard
                  name="Royal Gents Salon"
                  location="Kothrud"
                  rating={4.8}
                  reviews={124}
                  distance="1.2 km"
                  waitTime="10 min"
                  imageUrl="/urban-grooming-space.png"
                  category="Men's Salon"
                />
                <SalonCard
                  name="Blush Ladies Parlour"
                  location="Viman Nagar"
                  rating={4.6}
                  reviews={98}
                  distance="3.5 km"
                  waitTime="25 min"
                  imageUrl="/serene-beauty-space.png"
                  category="Ladies Parlour"
                />
                <SalonCard
                  name="Sparsh Spa & Massage"
                  location="Baner"
                  rating={4.9}
                  reviews={156}
                  distance="4.8 km"
                  waitTime="45 min"
                  imageUrl="/serene-spa-retreat.png"
                  category="Spa & Massage"
                />
              </div>
            </TabsContent>
            <TabsContent value="trending" className="mt-4">
              <div className="space-y-4">
                <SalonCard
                  name="Urban Hair Studio"
                  location="Aundh"
                  rating={4.7}
                  reviews={112}
                  distance="2.8 km"
                  waitTime="15 min"
                  imageUrl="/urban-chic-salon.png"
                  category="Hair Studio"
                />
                <SalonCard
                  name="Grace Beauty Lounge"
                  location="Wakad"
                  rating={4.5}
                  reviews={87}
                  distance="5.2 km"
                  waitTime="30 min"
                  imageUrl="/elegant-beauty-space.png"
                  category="Beauty Lounge"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Actions */}
        <div className="container px-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/explore">
              <Card className="bg-gradient-to-br from-rose-50 to-rose-100 border-none">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Calendar className="h-8 w-8 text-rose-600 mb-2" />
                  <h3 className="font-medium">Book Appointment</h3>
                  <p className="text-xs text-muted-foreground mt-1">Schedule for later</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/explore">
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-none">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Clock className="h-8 w-8 text-purple-600 mb-2" />
                  <div className="flex items-center">
                    <h3 className="font-medium">Join Queue</h3>
                    <QueueInfoTooltip />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Get in line now</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Family Profiles */}
        <div className="container px-4 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Family Profiles</h2>
            <Link href="/profile/family-members">
              <Button variant="ghost" size="sm" className="text-rose-600">
                Manage
              </Button>
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex flex-col items-center min-w-[72px]">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-1">
                <User className="h-8 w-8 text-rose-600" />
              </div>
              <span className="text-sm">You</span>
            </div>
            <Link href="/profile/family-members">
              <div className="flex flex-col items-center min-w-[72px]">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1 border-2 border-dashed border-gray-300">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
                <span className="text-sm text-gray-500">Add</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="container px-4 mb-8">
          <Link href="/ads">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none hover:shadow-lg transition-shadow overflow-hidden">
              <CardContent className="p-4 flex items-center">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Advertise Your Business</h3>
                  <p className="text-sm text-white/90 mt-1">
                    Reach local customers with targeted ads starting at just ₹199/day
                  </p>
                  <Button variant="secondary" size="sm" className="mt-2 bg-white text-purple-600 hover:bg-gray-100">
                    Learn More
                  </Button>
                </div>
                <div className="hidden md:block w-24 h-24 relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full flex items-center justify-center">
                    <Tag className="h-10 w-10 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Add the agent registration banner */}
        <div className="container px-4 py-8">
          <AgentRegistrationBanner />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav active="home" />
    </div>
  )
}
