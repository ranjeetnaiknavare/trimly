"use client"

import { useState } from "react"
import { Check, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ServiceDetailModal } from "@/components/service-detail-modal"

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  popular?: boolean
}

interface ServiceSelectionListProps {
  services: Service[]
  selectedServices: string[]
  onToggle: (serviceId: string) => void
}

export function ServiceSelectionList({ services, selectedServices, onToggle }: ServiceSelectionListProps) {
  const [openServiceId, setOpenServiceId] = useState<string | null>(null)

  const handleOpenChange = (open: boolean, serviceId: string) => {
    if (open) {
      setOpenServiceId(serviceId)
    } else {
      setOpenServiceId(null)
    }
  }

  return (
    <div className="space-y-3">
      {services.map((service) => (
        <div
          key={service.id}
          className={`p-3 rounded-lg border transition-all ${
            selectedServices.includes(service.id)
              ? "border-rose-500 bg-rose-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="font-medium">{service.name}</h3>
                {service.popular && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                    <Star className="w-3 h-3 mr-1 fill-amber-500 stroke-amber-500" />
                    Popular
                  </span>
                )}
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <span>₹{service.price}</span>
                <span className="mx-2">•</span>
                <span>{service.duration} min</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ChevronRight className="h-5 w-5" />
                    <span className="sr-only">View details</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <ServiceDetailModal service={service} />
                </DialogContent>
              </Dialog>

              <Button
                variant={selectedServices.includes(service.id) ? "default" : "outline"}
                size="sm"
                className={selectedServices.includes(service.id) ? "bg-rose-600 hover:bg-rose-700" : ""}
                onClick={() => onToggle(service.id)}
              >
                {selectedServices.includes(service.id) ? (
                  <>
                    <Check className="mr-1 h-4 w-4" /> Selected
                  </>
                ) : (
                  "Select"
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
