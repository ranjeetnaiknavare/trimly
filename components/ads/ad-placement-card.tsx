import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface AdPlacementCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function AdPlacementCard({ title, description, icon }: AdPlacementCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{icon}</div>
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
