interface SalonGalleryProps {
  images: string[]
}

export function SalonGallery({ images }: SalonGalleryProps) {
  // Only show first 4 images in the grid
  const displayImages = images.slice(0, 4)
  const hasMore = images.length > 4

  return (
    <div className="grid grid-cols-2 gap-2">
      {displayImages.map((image, index) => (
        <div key={index} className={`relative rounded-lg overflow-hidden ${index === 3 && hasMore ? "relative" : ""}`}>
          <img
            src={image || "/placeholder.svg?height=100&width=100&query=salon interior"}
            alt={`Salon interior ${index + 1}`}
            className="w-full h-24 object-cover"
          />
          {index === 3 && hasMore && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">+{images.length - 4}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
