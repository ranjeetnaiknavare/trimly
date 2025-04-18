import { Skeleton } from "@/components/ui/skeleton"
import AdminShell from "@/components/admin/admin-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminAdsLoading() {
  return (
    <AdminShell requiredPermission="ads.view">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Ad Management</h1>
          <p className="text-gray-600">Review and manage ads submitted by businesses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  <Skeleton className="h-4 w-24" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="mb-6">
        <Skeleton className="h-10 w-96" />
      </div>

      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <Skeleton className="md:w-64 h-40 md:h-auto" />
                  <div className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Skeleton className="h-9 w-28" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <Skeleton className="h-4 w-32" />
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </AdminShell>
  )
}
