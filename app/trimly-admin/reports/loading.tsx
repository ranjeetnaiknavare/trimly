import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-96" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <Skeleton className="h-10 w-full max-w-3xl" />

      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="border rounded-md p-4">
          <div className="grid grid-cols-7 gap-4 py-3">
            {Array(7)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
          </div>

          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="grid grid-cols-7 gap-4 py-4 border-t">
                {Array(7)
                  .fill(null)
                  .map((_, j) => (
                    <Skeleton key={j} className="h-8 w-full" />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
