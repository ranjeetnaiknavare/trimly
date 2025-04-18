"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAdmin } from "./admin-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrimlyLogo } from "@/components/trimly-logo"
import {
  LayoutDashboard,
  Users,
  Store,
  Megaphone,
  Calendar,
  Settings,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  BarChart3,
  ShieldCheck,
  Scissors,
  Tag,
  MessageSquare,
  HelpCircle,
  FileText,
  AlertTriangle,
} from "lucide-react"
import ProtectedRoute from "./protected-route"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check } from "lucide-react"

interface AdminShellProps {
  children: React.ReactNode
  requiredPermission?: string
}

export default function AdminShell({ children, requiredPermission }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const { user, logout, hasPermission, successMessage, errorMessage } = useAdmin()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const navigation = [
    { name: "Dashboard", href: "/trimly-admin/dashboard", icon: LayoutDashboard, permission: null },
    { name: "Customers", href: "/trimly-admin/customers", icon: Users, permission: "users.view" },
    { name: "Businesses", href: "/trimly-admin/businesses", icon: Store, permission: "businesses.view" },
    { name: "Advertisers", href: "/trimly-admin/advertisers", icon: Megaphone, permission: "advertisers.view" },
    { name: "Bookings", href: "/trimly-admin/bookings", icon: Calendar, permission: "bookings.view" },
    { name: "Services", href: "/trimly-admin/services", icon: Scissors, permission: "services.view" },
    { name: "Coupons", href: "/trimly-admin/coupons", icon: Tag, permission: "coupons.view" },
    {
      name: "Ads",
      href: "/trimly-admin/ads",
      icon: Megaphone,
      permission: "ads.view",
    },
    { name: "Analytics", href: "/trimly-admin/analytics", icon: BarChart3, permission: "analytics.view" },
    { name: "Reviews", href: "/trimly-admin/reviews", icon: MessageSquare, permission: "reviews.view" },
    { name: "Reports", href: "/trimly-admin/reports", icon: FileText, permission: "reports.view" },
    { name: "Settings", href: "/trimly-admin/settings", icon: Settings, permission: "settings.view" },
    { name: "User Management", href: "/trimly-admin/user-management", icon: ShieldCheck, permission: "admin.manage" },
    { name: "System Status", href: "/trimly-admin/system-status", icon: AlertTriangle, permission: "system.view" },
    { name: "Help & Support", href: "/trimly-admin/support", icon: HelpCircle, permission: null },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <ProtectedRoute requiredPermission={requiredPermission}>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:h-screen`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-5 border-b">
              <Link href="/trimly-admin/dashboard" className="flex items-center">
                <div className="w-32">
                  <TrimlyLogo />
                </div>
                <span className="ml-2 text-lg font-semibold text-purple-800">Admin</span>
              </Link>
              {isMobile && (
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  if (item.permission && user && !hasPermission(item.permission)) {
                    return null
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        isActive(item.href)
                          ? "bg-purple-50 text-purple-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors`}
                    >
                      <item.icon
                        className={`${
                          isActive(item.href) ? "text-purple-500" : "text-gray-400 group-hover:text-gray-500"
                        } mr-3 flex-shrink-0 h-5 w-5 transition-colors`}
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
                <button onClick={logout} className="ml-auto text-gray-400 hover:text-gray-500" title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top header */}
          <header className="bg-white shadow-sm z-10">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center">
                {isMobile && (
                  <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700 lg:hidden">
                    <Menu size={24} />
                  </button>
                )}
                <div className="ml-3 lg:ml-0">
                  <h1 className="text-xl font-semibold text-gray-900">Trimly Admin</h1>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>
                <button className="text-gray-500 hover:text-gray-700 relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
                </button>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
            {successMessage && (
              <Alert className="bg-green-50 border-green-200 mb-6">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success</AlertTitle>
                <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
              </Alert>
            )}

            {errorMessage && (
              <Alert className="bg-red-50 border-red-200 mb-6">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">{errorMessage}</AlertDescription>
              </Alert>
            )}

            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
