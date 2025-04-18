import type React from "react"
import { AdminProvider } from "@/components/admin/admin-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trimly Admin Panel",
  description: "Admin panel for Trimly platform management",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </AdminProvider>
  )
}
