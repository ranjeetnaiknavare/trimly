import { Skeleton } from "@/components/ui/skeleton"
import { AgentDashboardLayout } from "@/components/agent/dashboard-layout"

export default function AgentPerformanceLoading() {
  return (
    <AgentDashboardLayout>
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="border rounded-lg p-6">
          <Skeleton className="h-[300px] w-full" />
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64 mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </AgentDashboardLayout>
  )
}
