"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Navigation, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock location data
const popularLocations = [
  { id: "l1", name: "Kothrud", city: "Pune" },
  { id: "l2", name: "Viman Nagar", city: "Pune" },
  { id: "l3", name: "Baner", city: "Pune" },
  { id: "l4", name: "Aundh", city: "Pune" },
  { id: "l5", name: "Wakad", city: "Pune" },
  { id: "l6", name: "Hinjewadi", city: "Pune" },
  { id: "l7", name: "Koregaon Park", city: "Pune" },
  { id: "l8", name: "Hadapsar", city: "Pune" },
]

export default function LocationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(popularLocations)
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null)
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    if (searchQuery) {
      const filtered = popularLocations.filter(
        (location) =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.city.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(popularLocations)
    }
  }, [searchQuery])

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error")
      return
    }

    setLocationStatus("loading")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation(position)
        setLocationStatus("success")
        // In a real app, we would use the coordinates to fetch the actual address
        // For now, we'll just simulate success
        setTimeout(() => {
          window.location.href = "/"
        }, 1500)
      },
      () => {
        setLocationStatus("error")
      },
    )
  }

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
          <h1 className="text-xl font-bold text-rose-600">Select Location</h1>
        </div>

        {/* Search Bar */}
        <div className="container px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for area, locality..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Current Location */}
        <div className="container px-4 py-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-12 border-rose-200"
            onClick={detectCurrentLocation}
            disabled={locationStatus === "loading"}
          >
            <Navigation className="w-5 h-5 text-rose-600" />
            {locationStatus === "idle" && <span>Use Current Location</span>}
            {locationStatus === "loading" && <span>Detecting Location...</span>}
            {locationStatus === "success" && <span>Location Detected!</span>}
            {locationStatus === "error" && <span>Failed to detect location</span>}
          </Button>

          {/* Popular Locations */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Popular Locations</h2>
            <div className="bg-white rounded-lg shadow-sm">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location, index) => (
                  <Link key={location.id} href="/">
                    <div
                      className={`flex items-center p-4 hover:bg-gray-50 ${index !== 0 ? "border-t border-gray-100" : ""}`}
                    >
                      <MapPin className="w-5 h-5 text-rose-500 mr-3" />
                      <div>
                        <h3 className="font-medium">{location.name}</h3>
                        <p className="text-sm text-gray-500">{location.city}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No locations found matching "{searchQuery}"</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
