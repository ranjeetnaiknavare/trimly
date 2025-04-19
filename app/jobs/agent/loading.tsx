import { Skeleton } from "@/components/ui/skeleton"

export default function AgentPortalLoading() {
  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-10 mr-3" />
        <Skeleton className="h-8 w-40" />
      </div>

      <Skeleton className="h-24 w-full mb-6 rounded-lg" />

      <Skeleton className="h-10 w-full mb-6 rounded-md" />

      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}
