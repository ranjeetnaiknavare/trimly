"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "lucide-react"

interface WidgetPreviewProps {
  settings: {
    primaryColor: string
    buttonText: string
    displayServices: boolean
    selectedService: string
    widgetType: string
    showLogo: boolean
  }
}

export function WidgetPreview({ settings }: WidgetPreviewProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="desktop" onValueChange={(value) => setPreviewMode(value as "desktop" | "mobile")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="desktop">Desktop</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className={`border rounded-md p-4 ${previewMode === "mobile" ? "max-w-[320px] mx-auto" : ""}`}>
        <div className="bg-gray-100 rounded-md p-6 flex flex-col items-center justify-center min-h-[200px]">
          <p className="text-sm text-gray-500 mb-4 text-center">Your Website Content</p>

          {settings.widgetType === "button" ? (
            <Button
              style={{ backgroundColor: settings.primaryColor }}
              className="transition-all"
              onClick={() => setShowDialog(true)}
            >
              {settings.buttonText}
            </Button>
          ) : (
            <div className="w-full max-w-sm border rounded-md bg-white p-4 shadow-sm">
              <h3 className="font-medium mb-2" style={{ color: settings.primaryColor }}>
                Book an Appointment
              </h3>

              {settings.displayServices && (
                <div className="mb-3">
                  <label className="text-sm font-medium block mb-1">Select Service</label>
                  <select className="w-full p-2 border rounded-md text-sm">
                    <option value="">Choose a service...</option>
                    <option value="haircut" selected={settings.selectedService === "haircut"}>
                      Haircut
                    </option>
                    <option value="beard-trim" selected={settings.selectedService === "beard-trim"}>
                      Beard Trim
                    </option>
                    <option value="facial" selected={settings.selectedService === "facial"}>
                      Facial
                    </option>
                    <option value="hair-color" selected={settings.selectedService === "hair-color"}>
                      Hair Color
                    </option>
                  </select>
                </div>
              )}

              <div className="mb-3">
                <label className="text-sm font-medium block mb-1">Select Date</label>
                <div className="flex border rounded-md overflow-hidden">
                  <div className="bg-gray-100 p-2 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-gray-500" />
                  </div>
                  <input type="text" className="p-2 text-sm flex-1" placeholder="Select a date" readOnly />
                </div>
              </div>

              <Button className="w-full" style={{ backgroundColor: settings.primaryColor }}>
                Check Availability
              </Button>

              {settings.showLogo && (
                <div className="mt-3 text-center">
                  <p className="text-xs text-gray-400">Powered by Trimly</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Booking Dialog Preview */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{ color: settings.primaryColor }}>Book an Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {settings.displayServices && (
              <div>
                <label className="text-sm font-medium block mb-1">Select Service</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Choose a service...</option>
                  <option value="haircut" selected={settings.selectedService === "haircut"}>
                    Haircut
                  </option>
                  <option value="beard-trim" selected={settings.selectedService === "beard-trim"}>
                    Beard Trim
                  </option>
                  <option value="facial" selected={settings.selectedService === "facial"}>
                    Facial
                  </option>
                  <option value="hair-color" selected={settings.selectedService === "hair-color"}>
                    Hair Color
                  </option>
                </select>
              </div>
            )}

            <div>
              <label className="text-sm font-medium block mb-1">Select Date</label>
              <div className="flex border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-2 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-gray-500" />
                </div>
                <input type="text" className="p-2 flex-1" placeholder="Select a date" readOnly />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Select Time</label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm">
                  9:00 AM
                </Button>
                <Button variant="outline" size="sm">
                  10:00 AM
                </Button>
                <Button variant="outline" size="sm">
                  11:00 AM
                </Button>
              </div>
            </div>

            <Button className="w-full" style={{ backgroundColor: settings.primaryColor }}>
              Book Now
            </Button>

            {settings.showLogo && (
              <div className="text-center">
                <p className="text-xs text-gray-400">Powered by Trimly</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
