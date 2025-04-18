"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CheckCircle, Calendar, AlertCircle, ArrowRight } from "lucide-react"

export default function CalendarIntegrationPage() {
  const [activeTab, setActiveTab] = useState("google")
  const [connected, setConnected] = useState({
    google: false,
    outlook: false,
    apple: false,
    other: false,
  })

  const handleConnect = (provider: string) => {
    // In a real app, this would trigger the OAuth flow
    setConnected((prev) => ({ ...prev, [provider]: true }))
  }

  const handleDisconnect = (provider: string) => {
    setConnected((prev) => ({ ...prev, [provider]: false }))
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Calendar Integration</h1>
        <p className="text-muted-foreground">
          Connect your calendar to automatically sync appointments and avoid double bookings.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Sync your calendar</AlertTitle>
        <AlertDescription>
          Connecting your calendar allows Trimly to check for conflicts and automatically block time slots when you're
          busy.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="google" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="google">Google Calendar</TabsTrigger>
          <TabsTrigger value="outlook">Outlook</TabsTrigger>
          <TabsTrigger value="apple">Apple Calendar</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value="google">
          <CalendarProvider
            name="Google Calendar"
            icon="/google-calendar-icon.png"
            description="Sync your Google Calendar with Trimly to manage appointments efficiently."
            connected={connected.google}
            onConnect={() => handleConnect("google")}
            onDisconnect={() => handleDisconnect("google")}
          />
        </TabsContent>

        <TabsContent value="outlook">
          <CalendarProvider
            name="Microsoft Outlook"
            icon="/outlook-calendar-icon.png"
            description="Connect your Outlook calendar to keep your schedule in sync."
            connected={connected.outlook}
            onConnect={() => handleConnect("outlook")}
            onDisconnect={() => handleDisconnect("outlook")}
          />
        </TabsContent>

        <TabsContent value="apple">
          <CalendarProvider
            name="Apple Calendar"
            icon="/apple-calendar-inspired-icon.png"
            description="Integrate your Apple Calendar to manage your appointments seamlessly."
            connected={connected.apple}
            onConnect={() => handleConnect("apple")}
            onDisconnect={() => handleDisconnect("apple")}
          />
        </TabsContent>

        <TabsContent value="other">
          <CalendarProvider
            name="Other Calendars"
            icon="/simple-calendar-icon.png"
            description="Connect other calendar services via iCal URL."
            connected={connected.other}
            onConnect={() => handleConnect("other")}
            onDisconnect={() => handleDisconnect("other")}
            isCustom
          />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Calendar Settings</CardTitle>
          <CardDescription>Configure how your calendar integrates with Trimly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Automatically block busy times</h3>
                <p className="text-sm text-muted-foreground">
                  When enabled, times you're busy in your calendar will be blocked in Trimly
                </p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Add buffer time</h3>
                <p className="text-sm text-muted-foreground">Add extra time before and after appointments</p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-way sync</h3>
                <p className="text-sm text-muted-foreground">Sync appointments from Trimly to your calendar</p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

interface CalendarProviderProps {
  name: string
  icon: string
  description: string
  connected: boolean
  onConnect: () => void
  onDisconnect: () => void
  isCustom?: boolean
}

function CalendarProvider({
  name,
  icon,
  description,
  connected,
  onConnect,
  onDisconnect,
  isCustom = false,
}: CalendarProviderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <img src={icon || "/placeholder.svg"} alt={`${name} icon`} className="h-12 w-12 rounded-md" />
          <div>
            <CardTitle className="flex items-center gap-2">
              {name}
              {connected && (
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" /> Connected
                </Badge>
              )}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {connected ? (
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="font-medium">Connection Status</div>
              <div className="text-sm text-muted-foreground mt-1">Last synced: {new Date().toLocaleString()}</div>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">Calendar is syncing correctly</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-medium">Synced Calendars</div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Primary Calendar</span>
              </div>
            </div>
          </div>
        ) : isCustom ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="ical-url">iCal URL</Label>
              <Input id="ical-url" placeholder="https://calendar.example.com/ical/..." />
              <p className="text-xs text-muted-foreground">Enter the iCal URL from your calendar provider</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              Connect your {name} to automatically sync appointments and avoid scheduling conflicts.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {connected ? (
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={onDisconnect}>
              Disconnect
            </Button>
            <Button className="flex-1">Sync Now</Button>
          </div>
        ) : (
          <Button className="w-full" onClick={onConnect}>
            Connect {name} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
