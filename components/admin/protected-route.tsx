"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "./admin-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
}

export default function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { user, loading, hasPermission, setErrorMessage } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/trimly-admin/login")
    } else if (!loading && user && requiredPermission && !hasPermission(requiredPermission)) {
      setErrorMessage(`You don't have permission to access this page. Required permission: ${requiredPermission}`)
      router.push("/trimly-admin/unauthorized")
    }
  }, [loading, user, router, requiredPermission, hasPermission, setErrorMessage])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null
  }

  return <>{children}</>
}
