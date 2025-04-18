"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"
import { useAdmin } from "@/components/admin/admin-context"

export default function Unauthorized() {
  const router = useRouter()
  const { user } = useAdmin()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <ShieldAlert className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-8">You don't have permission to access this page.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.push("/trimly-admin/dashboard")} variant="outline">
            Back to Dashboard
          </Button>
          <Button onClick={() => router.push("/")} className="bg-purple-600 hover:bg-purple-700">
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  )
}
