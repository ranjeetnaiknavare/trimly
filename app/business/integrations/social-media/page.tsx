"use client"

import type React from "react"

import { useState } from "react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Plus, Check, Settings, BarChart, Share2 } from "lucide-react"
import { Image } from "@/components/ui/image"

interface SocialPlatform {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  connected: boolean
  username?: string
}

export default function SocialMediaIntegrationPage() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook className="h-8 w-8 p-1.5 bg-blue-100 text-blue-600 rounded-md mr-3" />,
      description: "Share updates and promotions",
      connected: true,
      username: "royalgentssalon",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram className="h-8 w-8 p-1.5 bg-pink-100 text-pink-600 rounded-md mr-3" />,
      description: "Share photos and stories",
      connected: false,
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: <Twitter className="h-8 w-8 p-1.5 bg-blue-100 text-blue-400 rounded-md mr-3" />,
      description: "Share quick updates",
      connected: false,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="h-8 w-8 p-1.5 bg-blue-100 text-blue-700 rounded-md mr-3" />,
      description: "Share professional updates",
      connected: false,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: <Youtube className="h-8 w-8 p-1.5 bg-red-100 text-red-600 rounded-md mr-3" />,
      description: "Share videos and tutorials",
      connected: false,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPlatform, setNewPlatform] = useState("")
  const [newUsername, setNewUsername] = useState("")

  const toggleConnection = (id: string) => {
    setPlatforms(
      platforms.map((platform) => {
        if (platform.id === id) {
          return { ...platform, connected: !platform.connected }
        }
        return platform
      }),
    )
  }

  const handleAddPlatform = () => {
    const platform = platforms.find((p) => p.id === newPlatform)
    if (platform) {
      setPlatforms(
        platforms.map((p) =>
          p.id === newPlatform ? { ...p, connected: true, username: newUsername || undefined } : p,
        ),
      )
    }
    setIsAddDialogOpen(false)
    setNewPlatform("")
    setNewUsername("")
  }

  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Social Media Integration</h1>
        <p className="text-gray-600">Connect and manage your social media accounts</p>
      </div>

      <Tabs defaultValue="accounts">
        <TabsList className="mb-6">
          <TabsTrigger value="accounts">
            <Share2 className="h-4 w-4 mr-2" />
            Connected Accounts
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Sharing Settings
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 mr-2" />
            Social Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Social Media Accounts</CardTitle>
              <CardDescription>Manage your connected social media platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {platform.icon}
                      <div>
                        <p className="font-medium">{platform.name}</p>
                        <p className="text-sm text-gray-500">
                          {platform.connected
                            ? `Connected as @${platform.username || "username"}`
                            : platform.description}
                        </p>
                      </div>
                    </div>
                    <Switch checked={platform.connected} onCheckedChange={() => toggleConnection(platform.id)} />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Connect More Platforms
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Your recent posts across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Facebook className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium">Facebook</span>
                      <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
                    </div>
                    <p className="text-sm">
                      Weekend special! 20% off on all hair treatments this Saturday and Sunday. Book your appointment
                      now!
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Facebook className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium">Facebook</span>
                      <span className="text-xs text-gray-500 ml-auto">1 week ago</span>
                    </div>
                    <p className="text-sm">
                      We're excited to welcome our new stylist, Priya! She specializes in modern haircuts and color
                      techniques.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled Posts</CardTitle>
                <CardDescription>Posts scheduled to be published</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <Share2 className="h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-gray-500">No scheduled posts</p>
                  <p className="text-sm text-gray-400">Schedule posts to be published automatically</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule a Post
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automatic Sharing Settings</CardTitle>
              <CardDescription>Configure what content is automatically shared to social media</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Promotions</p>
                    <p className="text-sm text-gray-500">Automatically share new promotions and offers</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Services</p>
                    <p className="text-sm text-gray-500">Share when new services are added</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Positive Reviews</p>
                    <p className="text-sm text-gray-500">Share 4+ star reviews from customers</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Staff Updates</p>
                    <p className="text-sm text-gray-500">Share when new staff members join</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Holiday Hours</p>
                    <p className="text-sm text-gray-500">Share special holiday hours and closures</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Customize how your content appears on social media</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-message">Default Message Template</Label>
                <Input
                  id="default-message"
                  defaultValue="Check out what's new at Royal Gents Salon! {content} #RoyalGentsSalon #Trimly"
                />
                <p className="text-xs text-gray-500">Use {`{content}`} to insert the specific content being shared</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hashtags">Default Hashtags</Label>
                <Input id="hashtags" defaultValue="#RoyalGentsSalon #Trimly #HairSalon #Pune" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image-size">Default Image Size</Label>
                  <Select defaultValue="square">
                    <SelectTrigger id="image-size">
                      <SelectValue placeholder="Select image size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square (1:1)</SelectItem>
                      <SelectItem value="landscape">Landscape (16:9)</SelectItem>
                      <SelectItem value="portrait">Portrait (4:5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image-filter">Default Image Filter</Label>
                  <Select defaultValue="none">
                    <SelectTrigger id="image-filter">
                      <SelectValue placeholder="Select image filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="bright">Bright</SelectItem>
                      <SelectItem value="warm">Warm</SelectItem>
                      <SelectItem value="cool">Cool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Followers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-green-500 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7%</div>
                <p className="text-xs text-green-500 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +1.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Click-through Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3%</div>
                <p className="text-xs text-red-500 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  -0.5% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>Engagement metrics across different platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Facebook className="h-8 w-8 p-1.5 bg-blue-100 text-blue-600 rounded-md mr-3" />
                    <div>
                      <p className="font-medium">Facebook</p>
                      <p className="text-sm text-gray-500">842 followers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">5.2% engagement</p>
                    <p className="text-sm text-green-500">+1.8%</p>
                  </div>
                </div>

                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-1 bg-blue-600 rounded-full" style={{ width: "65%" }}></div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center">
                    <Instagram className="h-8 w-8 p-1.5 bg-pink-100 text-pink-600 rounded-md mr-3" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">-</p>
                    <p className="text-sm text-gray-500">-</p>
                  </div>
                </div>

                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-1 bg-gray-300 rounded-full" style={{ width: "0%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>Your most engaging content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                    <Image src="/placeholder.svg?key=22qfa" alt="Post image" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Facebook className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-xs text-gray-500">Posted 2 weeks ago</span>
                    </div>
                    <p className="text-sm font-medium mt-1">
                      Introducing our new summer styles! Book now and get 15% off on your first appointment.
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span className="mr-3">124 likes</span>
                      <span className="mr-3">18 comments</span>
                      <span>32 shares</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=64&width=64&query=haircut"
                      alt="Post image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Facebook className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-xs text-gray-500">Posted 1 month ago</span>
                    </div>
                    <p className="text-sm font-medium mt-1">
                      Check out this amazing transformation! Our stylist Rajesh created this modern look for our client.
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span className="mr-3">98 likes</span>
                      <span className="mr-3">12 comments</span>
                      <span>8 shares</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Social Media Account</DialogTitle>
            <DialogDescription>Link your social media account to share content automatically.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={newPlatform} onValueChange={setNewPlatform}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms
                    .filter((p) => !p.connected)
                    .map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Your username on this platform"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPlatform} disabled={!newPlatform}>
              <Check className="h-4 w-4 mr-2" />
              Connect Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BusinessDashboardLayout>
  )
}
