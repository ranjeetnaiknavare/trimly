"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  BarChart3,
  Scissors,
  MessageSquare,
  ShoppingBag,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TrimlyLogo } from "@/components/trimly-logo"

interface BusinessDashboardLayoutProps {
  children: ReactNode
}

export function BusinessDashboardLayout({ children }: BusinessDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const sidebarItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard", href: "/business/dashboard" },
    { icon: <Calendar className="h-5 w-5" />, label: "Appointments", href: "/business/appointments" },
    { icon: <Clock className="h-5 w-5" />, label: "Queue Management", href: "/business/queue" },
    { icon: <MapPin className="h-5 w-5" />, label: "Locations", href: "/business/locations" },
    { icon: <Users className="h-5 w-5" />, label: "Customers", href: "/business/customers" },
    { icon: <Scissors className="h-5 w-5" />, label: "Services", href: "/business/services" },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Reviews", href: "/business/reviews" },
    { icon: <ShoppingBag className="h-5 w-5" />, label: "Inventory", href: "/business/inventory" },
    { icon: <BarChart3 className="h-5 w-5" />, label: "Analytics", href: "/business/analytics" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/business/settings" },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link href="/business/dashboard">
            <TrimlyLogo size="sm" />
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? "bg-rose-50 text-rose-600" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-lg font-semibold">Business Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/diverse-group-city.png" />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">Rahul Sharma</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
