import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface AdPricingCardProps {
  title: string
  price: string
  duration: string
  features: string[]
  ctaText: string
  highlighted?: boolean
}

export function AdPricingCard({ title, price, duration, features, ctaText, highlighted = false }: AdPricingCardProps) {
  return (
    <Card className={`flex flex-col ${highlighted ? "border-rose-500 shadow-md" : ""}`}>
      {highlighted && <div className="bg-rose-500 text-white text-center py-1 text-sm font-medium">Most Popular</div>}
      <CardHeader className={`${highlighted ? "bg-rose-50" : ""}`}>
        <h3 className="text-xl font-bold text-center">{title}</h3>
        <div className="text-center">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-gray-500 text-sm"> {duration}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3 mt-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/business/login" className="w-full">
          <Button
            className={`w-full ${highlighted ? "bg-rose-600 hover:bg-rose-700" : "bg-gray-800 hover:bg-gray-900"}`}
          >
            {ctaText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
