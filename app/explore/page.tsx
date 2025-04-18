"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, Filter, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { SalonCard } from "@/components/salon-card"
import { CategoryPill } from "@/components/category-pill"
import { BottomNav } from "@/components/bottom-nav"

// Mock data for salons
const salons = [
  {
    name: "Royal Gents Salon",
    location: "Kothrud",
    rating: 4.8,
    reviews: 124,
    distance: "1.2 km",
    waitTime: "10 min",
    imageUrl: "/urban-grooming-space.png",
    category: "Men's Salon",
  },
  {
    name: "Blush Ladies Parlour",
    location: "Viman Nagar",
    rating: 4.6,
    reviews: 98,
    distance: "3.5 km",
    waitTime: "25 min",
    imageUrl: "/serene-beauty-space.png",
    category: "Ladies Parlour",
  },
  {
    name: "Sparsh Spa & Massage",
    location: "Baner",
    rating: 4.9,
    reviews: 156,
    distance: "4.8 km",
    waitTime: "45 min",
    imageUrl: "/serene-spa-retreat.png",
    category: "Spa & Massage",
  },
  {
    name: "Urban Hair Studio",
    location: "Aundh",
    rating: 4.7,
    reviews: 112,
    distance: "2.8 km",
    waitTime: "15 min",
    imageUrl: "/urban-chic-salon.png",
    category: "Hair Studio",
  },
  {
    name: "Grace Beauty Lounge",
    location: "Wakad",
    rating: 4.5,
    reviews: 87,
    distance: "5.2 km",
    waitTime: "30 min",
    imageUrl: "/elegant-beauty-space.png",
    category: "Beauty Lounge",
  },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredSalons, setFilteredSalons] = useState(salons)

  // Filter salons based on search query and selected category
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterSalons(query, selectedCategory)
  }

  const handleCategorySelect = (category: string) => {
    const newCategory = selectedCategory === category ? null : category
    setSelectedCategory(newCategory)
    filterSalons(searchQuery, newCategory)
  }

  const filterSalons = (query: string, category: string | null) => {
    let filtered = salons

    if (query) {
      filtered = filtered.filter(
        (salon) =>
          salon.name.toLowerCase().includes(query.toLowerCase()) ||
          salon.location.toLowerCase().includes(query.toLowerCase()) ||
          salon.category.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (category) {
      filtered = filtered.filter((salon) => salon.category === category)
    }

    setFilteredSalons(filtered)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link href="/" className="mr-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-rose-600">Explore</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-medium">Distance</h3>
                  <div className="space-y-2">
                    <Slider defaultValue={[5]} max={10} step={0.5} />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0 km</span>
                      <span>5 km</span>
                      <span>10 km</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium">Rating</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">4.0+</span>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium">Wait Time</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Under 15 min</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Under 30 min</span>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium">Offers</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Special Offers</span>
                    <Switch />
                  </div>
                </div>

                <Button className="w-full bg-rose-600 hover:bg-rose-700">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Bar */}
        <div className="container px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search salons, parlours, spas..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Location Selector */}
        <div className="container px-4 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-rose-500 mr-1" />
              <span className="text-sm font-medium">Kothrud, Pune</span>
            </div>
            <Link href="/location">
              <Button variant="ghost" size="sm" className="text-rose-600 h-8">
                Change
              </Button>
            </Link>
          </div>
        </div>

        {/* Category Pills */}
        <div className="container px-4 py-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            <CategoryPill
              icon="scissors"
              label="Men's Salon"
              active={selectedCategory === "Men's Salon"}
              onClick={() => handleCategorySelect("Men's Salon")}
            />
            <CategoryPill
              icon="spa"
              label="Ladies Parlour"
              active={selectedCategory === "Ladies Parlour"}
              onClick={() => handleCategorySelect("Ladies Parlour")}
            />
            <CategoryPill
              icon="massage"
              label="Spa & Massage"
              active={selectedCategory === "Spa & Massage"}
              onClick={() => handleCategorySelect("Spa & Massage")}
            />
            <CategoryPill
              icon="hair"
              label="Hair Studio"
              active={selectedCategory === "Hair Studio"}
              onClick={() => handleCategorySelect("Hair Studio")}
            />
            <CategoryPill
              icon="beauty"
              label="Beauty Lounge"
              active={selectedCategory === "Beauty Lounge"}
              onClick={() => handleCategorySelect("Beauty Lounge")}
            />
          </div>
        </div>

        {/* Results */}
        <div className="container px-4 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {filteredSalons.length} {filteredSalons.length === 1 ? "Result" : "Results"}
            </h2>
            <div className="flex items-center text-sm">
              <span className="text-gray-500 mr-1">Sort by:</span>
              <span className="font-medium">Distance</span>
            </div>
          </div>

          {filteredSalons.length > 0 ? (
            <div className="space-y-4">
              {filteredSalons.map((salon, index) => (
                <Link href={`/salon/${salon.name.toLowerCase().replace(/\s+/g, "-")}`} key={index} className="block">
                  <SalonCard
                    name={salon.name}
                    location={salon.location}
                    rating={salon.rating}
                    reviews={salon.reviews}
                    distance={salon.distance}
                    waitTime={salon.waitTime}
                    imageUrl={salon.imageUrl}
                    category={salon.category}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No salons found matching your criteria.</p>
              <Button
                variant="link"
                className="text-rose-600 mt-2"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                  setFilteredSalons(salons)
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav active="explore" />
    </div>
  )
}
