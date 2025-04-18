"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Phone, Share2, Download } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

// Mock data for call logs
const callLogs = [
  {
    id: "c1",
    customerName: "Anonymous User",
    customerPhone: "Hidden",
    timestamp: new Date(2023, 5, 15, 14, 30),
    duration: null,
    converted: false,
  },
  {
    id: "c2",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    timestamp: new Date(2023, 5, 14, 11, 15),
    duration: "3:45",
    converted: true,
  },
  {
    id: "c3",
    customerName: "Priya Patel",
    customerPhone: "+91 87654 32109",
    timestamp: new Date(2023, 5, 13, 16, 45),
    duration: "2:12",
    converted: true,
  },
  {
    id: "c4",
    customerName: "Anonymous User",
    customerPhone: "Hidden",
    timestamp: new Date(2023, 5, 12, 10, 20),
    duration: null,
    converted: false,
  },
  {
    id: "c5",
    customerName: "Amit Kumar",
    customerPhone: "+91 76543 21098",
    timestamp: new Date(2023, 5, 11, 13, 10),
    duration: "1:30",
    converted: false,
  },
]

// Mock data for share logs
const shareLogs = [
  {
    id: "s1",
    customerName: "Neha Singh",
    platform: "WhatsApp",
    timestamp: new Date(2023, 5, 15, 15, 45),
    converted: true,
  },
  {
    id: "s2",
    customerName: "Anonymous User",
    platform: "Facebook",
    timestamp: new Date(2023, 5, 14, 12, 30),
    converted: false,
  },
  {
    id: "s3",
    customerName: "Vikram Malhotra",
    platform: "Email",
    timestamp: new Date(2023, 5, 13, 17, 20),
    converted: true,
  },
  {
    id: "s4",
    customerName: "Anonymous User",
    platform: "Twitter",
    timestamp: new Date(2023, 5, 12, 9, 15),
    converted: false,
  },
  {
    id: "s5",
    customerName: "Sanjay Gupta",
    platform: "WhatsApp",
    timestamp: new Date(2023, 5, 11, 14, 50),
    converted: true,
  },
]

export function InteractionLogs() {
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date | undefined
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Customer Interaction Logs</CardTitle>
          <CardDescription>Track calls and shares from your salon profile</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Select date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              {/* Calendar would go here */}
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calls">
          <TabsList className="mb-4">
            <TabsTrigger value="calls" className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              Call Logs
            </TabsTrigger>
            <TabsTrigger value="shares" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calls">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-3 font-medium text-sm bg-gray-50 rounded-t-md">
                <div className="col-span-3">Customer</div>
                <div className="col-span-2">Phone</div>
                <div className="col-span-3">Date & Time</div>
                <div className="col-span-2">Duration</div>
                <div className="col-span-2">Converted</div>
              </div>
              <div className="divide-y">
                {callLogs.map((log) => (
                  <div key={log.id} className="grid grid-cols-12 gap-2 p-3 text-sm items-center">
                    <div className="col-span-3 font-medium">{log.customerName}</div>
                    <div className="col-span-2 text-gray-600">{log.customerPhone}</div>
                    <div className="col-span-3 text-gray-600">
                      {format(log.timestamp, "MMM dd, yyyy")}
                      <br />
                      <span className="text-xs">{format(log.timestamp, "h:mm a")}</span>
                    </div>
                    <div className="col-span-2 text-gray-600">{log.duration || "N/A"}</div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          log.converted ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {log.converted ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                <strong>Note:</strong> "Converted" means the customer made a booking after calling.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="shares">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-3 font-medium text-sm bg-gray-50 rounded-t-md">
                <div className="col-span-3">Customer</div>
                <div className="col-span-3">Platform</div>
                <div className="col-span-4">Date & Time</div>
                <div className="col-span-2">Converted</div>
              </div>
              <div className="divide-y">
                {shareLogs.map((log) => (
                  <div key={log.id} className="grid grid-cols-12 gap-2 p-3 text-sm items-center">
                    <div className="col-span-3 font-medium">{log.customerName}</div>
                    <div className="col-span-3 text-gray-600">{log.platform}</div>
                    <div className="col-span-4 text-gray-600">
                      {format(log.timestamp, "MMM dd, yyyy")}
                      <br />
                      <span className="text-xs">{format(log.timestamp, "h:mm a")}</span>
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          log.converted ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {log.converted ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                <strong>Note:</strong> "Converted" means the customer or their contact made a booking after the profile
                was shared.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
