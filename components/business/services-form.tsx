"use client"

import { useState } from "react"
import { Plus, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  popular?: boolean
}

interface BusinessServicesFormProps {
  formData: {
    services: Service[]
  }
  updateFormData: (data: Partial<{ services: Service[] }>) => void
}

export function BusinessServicesForm({ formData, updateFormData }: BusinessServicesFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState<Service>({
    id: "",
    name: "",
    description: "",
    price: 0,
    duration: 30,
    popular: false,
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddService = () => {
    setIsEditing(false)
    setCurrentService({
      id: Date.now().toString(),
      name: "",
      description: "",
      price: 0,
      duration: 30,
      popular: false,
    })
    setIsDialogOpen(true)
  }

  const handleEditService = (service: Service) => {
    setIsEditing(true)
    setCurrentService({ ...service })
    setIsDialogOpen(true)
  }

  const handleDeleteService = (id: string) => {
    const updatedServices = formData.services.filter((service) => service.id !== id)
    updateFormData({ services: updatedServices })
  }

  const handleSaveService = () => {
    if (isEditing) {
      const updatedServices = formData.services.map((service) =>
        service.id === currentService.id ? currentService : service,
      )
      updateFormData({ services: updatedServices })
    } else {
      updateFormData({ services: [...formData.services, currentService] })
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Services Offered</h3>
        <Button onClick={handleAddService} className="bg-rose-600 hover:bg-rose-700">
          <Plus className="h-4 w-4 mr-1" /> Add Service
        </Button>
      </div>

      {formData.services.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No services added yet. Click "Add Service" to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {formData.services.map((service) => (
            <div
              key={service.id}
              className="p-4 bg-white rounded-lg border border-gray-200 flex justify-between items-start"
            >
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium">{service.name}</h4>
                  {service.popular && (
                    <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Popular</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="font-medium">₹{service.price}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span>{service.duration} min</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditService(service)}
                  className="h-8 w-8 border-gray-200"
                >
                  <Edit className="h-4 w-4 text-gray-500" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDeleteService(service.id)}
                  className="h-8 w-8 border-gray-200"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Service" : "Add New Service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name *</Label>
              <Input
                id="serviceName"
                value={currentService.name}
                onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                placeholder="e.g. Haircut"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceDescription">Description</Label>
              <Textarea
                id="serviceDescription"
                value={currentService.description}
                onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                placeholder="e.g. Includes wash, cut, and styling"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="servicePrice">Price (₹) *</Label>
                <Input
                  id="servicePrice"
                  type="number"
                  value={currentService.price}
                  onChange={(e) => setCurrentService({ ...currentService, price: Number(e.target.value) })}
                  placeholder="e.g. 250"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceDuration">Duration (minutes) *</Label>
                <Input
                  id="serviceDuration"
                  type="number"
                  value={currentService.duration}
                  onChange={(e) => setCurrentService({ ...currentService, duration: Number(e.target.value) })}
                  placeholder="e.g. 30"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="servicePopular"
                checked={currentService.popular || false}
                onCheckedChange={(checked) => setCurrentService({ ...currentService, popular: checked })}
              />
              <Label htmlFor="servicePopular">Mark as popular service</Label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveService} className="bg-rose-600 hover:bg-rose-700">
              {isEditing ? "Update" : "Add"} Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
