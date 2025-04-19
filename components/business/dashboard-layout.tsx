"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  Package,
  Star,
  TicketCheck,
  Menu,
  X,
  Bell,
  ShoppingBag,
  Megaphone,
  BarChart2,
  Clock,
  Share2,
  Briefcase,
} from "lucide-react"
import { TrimlyLogo } from "@/components/trimly-logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface BusinessDashboardLayoutProps {
  children: React.ReactNode
}

export function BusinessDashboardLayout({ children }: BusinessDashboardLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile nav when pathname changes
  useEffect(() => {
    setIsMobileNavOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/business/dashboard">
            <TrimlyLogo size="sm" />
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/business/dashboard"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/dashboard")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/business/appointments"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/appointments")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Appointments
              </Link>
            </li>
            <li>
              <Link
                href="/business/customers"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/customers")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Customers
              </Link>
            </li>
            <li>
              <Link
                href="/business/services"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/services")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Package className="mr-3 h-5 w-5" />
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/business/reviews"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/reviews")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Star className="mr-3 h-5 w-5" />
                Reviews
              </Link>
            </li>
            <li>
              <Link
                href="/business/queue"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/queue")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Clock className="mr-3 h-5 w-5" />
                Queue System
              </Link>
            </li>
          </ul>

          <div className="mt-6 mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Marketing</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/business/coupons"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/coupons")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <TicketCheck className="mr-3 h-5 w-5" />
                Coupons
              </Link>
            </li>
            <li>
              <Link
                href="/business/ads"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/ads")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Megaphone className="mr-3 h-5 w-5" />
                Ads
              </Link>
            </li>
            <li>
              <Link
                href="/business/agents"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/agents")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Share2 className="mr-3 h-5 w-5" />
                Agents
              </Link>
            </li>
            <li>
              <Link
                href="/business/jobs"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/jobs")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Jobs
              </Link>
            </li>
          </ul>

          <div className="mt-6 mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Business</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/business/inventory"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/inventory")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                Inventory
              </Link>
            </li>
            <li>
              <Link
                href="/business/staff"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/staff")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Staff
              </Link>
            </li>
            <li>
              <Link
                href="/business/analytics"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/analytics")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <BarChart2 className="mr-3 h-5 w-5" />
                Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/business/settings"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/business/settings")
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/vibrant-street-market.png" alt="Business" />
              <AvatarFallback>BP</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Beauty Parlour</p>
              <p className="text-xs text-gray-500 truncate">Premium Plan</p>
            </div>
            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
              Active
            </Badge>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4">
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <TrimlyLogo size="sm" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <div className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</div>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/business/dashboard"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/dashboard")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <LayoutDashboard className="mr-3 h-5 w-5" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/appointments"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/appointments")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <Calendar className="mr-3 h-5 w-5" />
                      Appointments
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/customers"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/customers")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <Users className="mr-3 h-5 w-5" />
                      Customers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/services"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/services")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <Package className="mr-3 h-5 w-5" />
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/reviews"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/reviews")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <Star className="mr-3 h-5 w-5" />
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/queue"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/queue")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <Clock className="mr-3 h-5 w-5" />
                      Queue System
                    </Link>
                  </li>
                </ul>

                <div className="mt-6 mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Marketing
                </div>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/business/coupons"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/coupons")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <TicketCheck className="mr-3 h-5 w-5" />
                      Coupons
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/ads"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/ads")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <Megaphone className="mr-3 h-5 w-5" />
                      Ads
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/agents"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/agents")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <Share2 className="mr-3 h-5 w-5" />
                      Agents
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/jobs"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/jobs")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <Briefcase className="mr-3 h-5 w-5" />
                      Jobs
                    </Link>
                  </li>
                </ul>

                <div className="mt-6 mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Business
                </div>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/business/inventory"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/inventory")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <ShoppingBag className="mr-3 h-5 w-5" />
                      Inventory
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/staff"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/staff")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <Users className="mr-3 h-5 w-5" />
                      Staff
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/analytics"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/analytics")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <BarChart2 className="mr-3 h-5 w-5" />
                      Analytics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/business/settings"
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive("/business/settings")
                          ? "bg-rose-50 text-rose-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      Settings
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/vibrant-street-market.png" alt="Business" />
                    <AvatarFallback>BP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Beauty Parlour</p>
                    <p className="text-xs text-gray-500 truncate">Premium Plan</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/business/dashboard">
            <TrimlyLogo size="sm" />
          </Link>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 py-6 px-4 md:px-8 mt-16 md:mt-0">{children}</main>
      </div>
    </div>
  )
}
