import { Card, CardContent } from "@/components/ui/card"

interface AdStepCardProps {
  number: string
  title: string
  description: string
}

export function AdStepCard({ number, title, description }: AdStepCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            {number}
          </div>
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
