"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Facebook, Instagram, Twitter, Linkedin, Plus } from "lucide-react"

interface SocialPlatform {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  connected: boolean
}

export function SocialMediaIntegration() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook className="h-8 w-8 p-1.5 bg-blue-100 text-blue-600 rounded-md mr-3" />,
      description: "Share updates and promotions",
      connected: true,
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
  ])

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Integration</CardTitle>
        <CardDescription>Connect and share content on social platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {platform.icon}
                <div>
                  <p className="font-medium">{platform.name}</p>
                  <p className="text-sm text-gray-500">{platform.description}</p>
                </div>
              </div>
              <Switch checked={platform.connected} onCheckedChange={() => toggleConnection(platform.id)} />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Connect More Platforms
        </Button>
      </CardFooter>
    </Card>
  )
}
