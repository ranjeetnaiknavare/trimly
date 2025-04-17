"use client"

import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ServiceItemProps {
  service: {
    id: string
    name: string
    description: string
    price: number
    duration: number
    popular?: boolean
  }
  onSelect?: (id: string) => void
}

export function ServiceItem({ service, onSelect }: ServiceItemProps) {
  return (
    <div
      className={`p-3 bg-white rounded-lg shadow-sm border border-gray-100 ${onSelect ? "cursor-pointer hover:border-rose-300" : ""}`}
      onClick={() => onSelect && onSelect(service.id)}
    >
      <div className="flex items-start justify-between">
        <div>
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
            <Clock className="w-3 h-3 mr-1" />
            <span>{service.duration} min</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-medium text-gray-900">₹{service.price}</span>
          <button className="mt-2 text-xs font-medium text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
            {onSelect ? "Select" : "View"}
          </button>
        </div>
      </div>
    </div>
  )
}
