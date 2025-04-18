import { Image } from "@/components/ui/image"

interface PromotionBannerProps {
  title: string
  description: string
  imageUrl: string
}

export function PromotionBanner({ title, description, imageUrl }: PromotionBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-lg h-28">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="absolute inset-0 w-full h-full"
        fallbackSrc="/placeholder.svg?key=mdyu5"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/80 to-purple-500/60"></div>
      <div className="relative p-4 text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm mt-1">{description}</p>
        <button className="mt-2 text-xs font-medium bg-white text-rose-600 px-3 py-1 rounded-full">Learn More</button>
      </div>
    </div>
  )
}
