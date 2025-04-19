import { Skeleton } from "@/components/ui/skeleton"

export default function JobsLoading() {
  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-9 w-28" />
      </div>

      <Skeleton className="h-10 w-full mb-6" />

      <div className="mb-6">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
