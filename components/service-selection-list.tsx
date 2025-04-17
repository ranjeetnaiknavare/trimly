"use client"

import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
  return (
    <div className="space-y-3">
      {services.map((service) => {
        const isSelected = selectedServices.includes(service.id)

        return (
          <div
            key={service.id}
            className={`p-3 bg-white rounded-lg border transition-all ${
              isSelected ? "border-rose-300 shadow-sm" : "border-gray-100"
            }`}
            onClick={() => onToggle(service.id)}
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  {service.popular && (
                    <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-600 border-amber-200 text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{service.duration} min</span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="font-medium text-gray-900">₹{service.price}</span>
                <div
                  className={`mt-2 h-5 w-5 rounded-full flex items-center justify-center ${
                    isSelected ? "bg-rose-600 text-white" : "border border-gray-300"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
