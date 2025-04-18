import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <Skeleton className="h-10 w-32" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-md" />
          ))}
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-[400px] w-full rounded-md" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-md" />
          ))}
      </div>
    </div>
  )
}
