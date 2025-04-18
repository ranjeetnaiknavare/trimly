"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Phone, MapPin, Calendar, LogOut, Heart, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/components/auth/auth-context"
import { BottomNav } from "@/components/bottom-nav"
import { FavoriteSalonsList } from "@/components/favorites-list"
import { CustomerReviews } from "@/components/customer-reviews"
import { CustomerBookingsList } from "@/components/customer-bookings-list"
import { FamilyMembersManagement } from "@/components/family-members-management"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "Guest User",
    email: user?.email || "guest@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Kothrud, Pune",
  })

  const handleSignOut = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    router.push("/login")
    return null
  }

  const handleSaveProfile = () => {
    // In a real app, this would update the profile in the database
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center justify-center h-16 px-4">
          <h1 className="text-xl font-bold text-rose-600">My Profile</h1>
        </div>
      </header>

      <main className="container max-w-md mx-auto px-4 py-6 flex-1">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/vibrant-street-market.png" alt={profileData.name} />
                <AvatarFallback>
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{profileData.name}</CardTitle>
            <CardDescription>Member since April 2023</CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="profile" className="text-xs">
              <User className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="family" className="text-xs">
              <Users className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Family</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="text-xs">
              <Calendar className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs">
              <Heart className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs">
              <Star className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Reviews</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardContent className="pt-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-500 mr-3" />
                      <span>{profileData.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 mr-3" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-3" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                      <span>{profileData.address}</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                {isEditing ? (
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1 bg-rose-600 hover:bg-rose-700" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive booking confirmations and reminders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Receive booking confirmations and reminders via SMS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Communications</h4>
                    <p className="text-sm text-gray-500">Receive offers and promotions</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Button variant="outline" className="w-full mt-4 text-red-600" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </TabsContent>

          <TabsContent value="family">
            <Card>
              <CardContent className="pt-6">
                <FamilyMembersManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <CustomerBookingsList />
          </TabsContent>

          <TabsContent value="favorites">
            <FavoriteSalonsList />
          </TabsContent>

          <TabsContent value="reviews">
            <CustomerReviews />
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav active="profile" />
    </div>
  )
}
