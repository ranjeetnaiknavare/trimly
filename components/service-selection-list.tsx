"use client"

import { ServiceItem } from "@/components/service-item"

interface ServiceSelectionListProps {
  services: Array<{
    id: string
    name: string
    description: string
    price: number
    duration: number
    popular?: boolean
  }>
  selectedServices: string[]
  onToggle: (id: string) => void
}

export function ServiceSelectionList({ services, selectedServices, onToggle }: ServiceSelectionListProps) {
  return (
    <div className="space-y-3">
      {services.map((service) => (
        <ServiceItem key={service.id} service={service} onSelect={() => onToggle(service.id)} />
      ))}
    </div>
  )
}
