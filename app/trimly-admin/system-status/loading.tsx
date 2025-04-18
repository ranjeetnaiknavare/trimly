import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-md" />
          ))}
      </div>

      <Skeleton className="h-16 w-full rounded-md" />

      <div className="grid gap-6 md:grid-cols-2">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-md" />
          ))}
      </div>

      <Skeleton className="h-96 w-full rounded-md" />
    </div>
  )
}
