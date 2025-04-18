"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CalendarDays, Plus } from "lucide-react"

interface CalendarPlatform {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  connected: boolean
}

export function CalendarIntegration() {
  const [calendars, setCalendars] = useState<CalendarPlatform[]>([
    {
      id: "google",
      name: "Google Calendar",
      icon: <CalendarDays className="h-8 w-8 p-1.5 bg-blue-100 text-blue-600 rounded-md mr-3" />,
      description: "Sync appointments automatically",
      connected: true,
    },
    {
      id: "outlook",
      name: "Outlook Calendar",
      icon: <CalendarDays className="h-8 w-8 p-1.5 bg-blue-100 text-blue-800 rounded-md mr-3" />,
      description: "Sync with Microsoft Outlook",
      connected: false,
    },
    {
      id: "calendly",
      name: "Calendly",
      icon: <CalendarDays className="h-8 w-8 p-1.5 bg-teal-100 text-teal-600 rounded-md mr-3" />,
      description: "Enable online scheduling",
      connected: false,
    },
    {
      id: "indian",
      name: "Indian Calendar",
      icon: <CalendarDays className="h-8 w-8 p-1.5 bg-orange-100 text-orange-600 rounded-md mr-3" />,
      description: "Sync with Hindu/Indian calendar",
      connected: false,
    },
  ])

  const toggleConnection = (id: string) => {
    setCalendars(
      calendars.map((calendar) => {
        if (calendar.id === id) {
          return { ...calendar, connected: !calendar.connected }
        }
        return calendar
      }),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar Integration</CardTitle>
        <CardDescription>Sync your appointments with external calendars</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {calendars.map((calendar) => (
            <div key={calendar.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {calendar.icon}
                <div>
                  <p className="font-medium">{calendar.name}</p>
                  <p className="text-sm text-gray-500">{calendar.description}</p>
                </div>
              </div>
              <Switch checked={calendar.connected} onCheckedChange={() => toggleConnection(calendar.id)} />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Connect More Calendars
        </Button>
      </CardFooter>
    </Card>
  )
}
