import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
      </div>

      <Skeleton className="h-10 w-96" />

      <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded-md" />

        <div className="space-y-4">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
