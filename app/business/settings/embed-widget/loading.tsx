import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function EmbedWidgetLoading() {
  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <Skeleton className="h-8 w-3/4 max-w-md" />
        <Skeleton className="h-4 w-1/2 max-w-sm mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-[500px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>
    </BusinessDashboardLayout>
  )
}
