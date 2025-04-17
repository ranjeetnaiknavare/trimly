"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"

interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
  isMain: boolean
  status: "active" | "inactive"
}

export default function BusinessLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      name: "Royal Gents Salon - Kothrud",
      address: "Shop 7, Mayur Complex, Main Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411038",
      phone: "+91 98765 43210",
      isMain: true,
      status: "active",
    },
    {
      id: "2",
      name: "Royal Gents Salon - Aundh",
      address: "Shop 12, Westside Mall, DP Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411007",
      phone: "+91 98765 43211",
      isMain: false,
      status: "active",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<Location>({
    id: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isMain: false,
    status: "active",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string>("1") // Default to first location

  const handleAddLocation = () => {
    setIsEditing(false)
    setCurrentLocation({
      id: Date.now().toString(),
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      isMain: false,
      status: "active",
    })
    setIsDialogOpen(true)
  }

  const handleEditLocation = (location: Location) => {
    setIsEditing(true)
    setCurrentLocation({ ...location })
    setIsDialogOpen(true)
  }

  const handleDeleteLocation = (id: string) => {
    setLocationToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteLocation = () => {
    if (locationToDelete) {
      setLocations(locations.filter((loc) => loc.id !== locationToDelete))
      setIsDeleteDialogOpen(false)
      setLocationToDelete(null)

      // If the deleted location was selected, select the first available location
      if (locationToDelete === selectedLocation && locations.length > 1) {
        const newSelectedId = locations.find((loc) => loc.id !== locationToDelete)?.id || ""
        setSelectedLocation(newSelectedId)
      }
    }
  }

  const handleSaveLocation = () => {
    if (isEditing) {
      setLocations(locations.map((loc) => (loc.id === currentLocation.id ? currentLocation : loc)))
    } else {
      setLocations([...locations, currentLocation])
    }
    setIsDialogOpen(false)
  }

  const handleSetMainLocation = (id: string) => {
    setLocations(
      locations.map((loc) => ({
        ...loc,
        isMain: loc.id === id,
      })),
    )
  }

  const handleToggleStatus = (id: string) => {
    setLocations(
      locations.map((loc) => {
        if (loc.id === id) {
          return {
            ...loc,
            status: loc.status === "active" ? "inactive" : "active",
          }
        }
        return loc
      }),
    )
  }

  return (
    <BusinessDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Locations</h1>
          <p className="text-gray-600">Manage all your business locations</p>
        </div>
        <Button onClick={handleAddLocation} className="bg-rose-600 hover:bg-rose-700">
          <Plus className="h-4 w-4 mr-2" /> Add Location
        </Button>
      </div>

      {/* Location Selector */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Current Location</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name} {location.isMain && "(Main)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 mt-2">Select a location to view and manage its specific data</p>
        </CardContent>
      </Card>

      {/* Locations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((location) => (
          <Card key={location.id} className={`${location.id === selectedLocation ? "border-rose-300" : ""}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-lg">{location.name}</h3>
                    {location.isMain && (
                      <span className="ml-2 text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">Main</span>
                    )}
                    <span
                      className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                        location.status === "active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {location.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-start mt-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      {location.address}, {location.city}, {location.state} - {location.pincode}
                    </p>
                  </div>
                  <p className="text-sm mt-1">{location.phone}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditLocation(location)}
                    className="h-8 w-8 border-gray-200"
                  >
                    <Pencil className="h-4 w-4 text-gray-500" />
                  </Button>
                  {!location.isMain && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteLocation(location.id)}
                      className="h-8 w-8 border-gray-200"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex mt-4 space-x-2">
                {!location.isMain && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetMainLocation(location.id)}
                    className="text-xs border-rose-200 text-rose-600"
                  >
                    Set as Main
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => handleToggleStatus(location.id)} className="text-xs">
                  {location.status === "active" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Location Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Location" : "Add New Location"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Location Name*</Label>
              <Input
                id="name"
                value={currentLocation.name}
                onChange={(e) => setCurrentLocation({ ...currentLocation, name: e.target.value })}
                placeholder="e.g. Royal Gents Salon - Kothrud"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address*</Label>
              <Textarea
                id="address"
                value={currentLocation.address}
                onChange={(e) => setCurrentLocation({ ...currentLocation, address: e.target.value })}
                placeholder="e.g. Shop 7, Mayur Complex, Main Road"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  value={currentLocation.city}
                  onChange={(e) => setCurrentLocation({ ...currentLocation, city: e.target.value })}
                  placeholder="e.g. Pune"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State*</Label>
                <Input
                  id="state"
                  value={currentLocation.state}
                  onChange={(e) => setCurrentLocation({ ...currentLocation, state: e.target.value })}
                  placeholder="e.g. Maharashtra"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pincode">PIN Code*</Label>
                <Input
                  id="pincode"
                  value={currentLocation.pincode}
                  onChange={(e) => setCurrentLocation({ ...currentLocation, pincode: e.target.value })}
                  placeholder="e.g. 411038"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number*</Label>
                <Input
                  id="phone"
                  value={currentLocation.phone}
                  onChange={(e) => setCurrentLocation({ ...currentLocation, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={currentLocation.status === "active"}
                onCheckedChange={(checked) =>
                  setCurrentLocation({ ...currentLocation, status: checked ? "active" : "inactive" })
                }
              />
              <Label htmlFor="status">Location is active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveLocation} className="bg-rose-600 hover:bg-rose-700">
              {isEditing ? "Update" : "Add"} Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this location? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteLocation}>
              Delete Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BusinessDashboardLayout>
  )
}
