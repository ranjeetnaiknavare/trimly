"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  Star,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart,
  CreditCard,
  Bell,
  Tag,
  UserCog,
} from "lucide-react"
import { TrimlyLogo } from "@/components/trimly-logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/business/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Appointments",
    href: "/business/appointments",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Queue",
    href: "/business/queue",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Customers",
    href: "/business/customers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Staff",
    href: "/business/staff",
    icon: <UserCog className="h-5 w-5" />,
  },
  {
    title: "Services",
    href: "/business/services",
    icon: <Scissors className="h-5 w-5" />,
  },
  {
    title: "Reviews",
    href: "/business/reviews",
    icon: <Star className="h-5 w-5" />,
  },
  {
    title: "Inventory",
    href: "/business/inventory",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/business/analytics",
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: "Billing",
    href: "/business/billing",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Coupons",
    href: "/business/coupons",
    icon: <Tag className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/business/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

interface BusinessDashboardLayoutProps {
  children: React.ReactNode
}

export function BusinessDashboardLayout({ children }: BusinessDashboardLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    logout()
    router.push("/business/login")
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
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-rose-50 text-rose-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/property-deed-handover.png" alt="Business Owner" />
              <AvatarFallback>BO</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Royal Gents Salon</p>
              <p className="text-xs text-gray-500 truncate">Rajesh Patel</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/business/dashboard">
            <TrimlyLogo size="sm" />
          </Link>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="py-2 px-4 text-sm text-gray-500">No new notifications</div>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                            pathname === item.href
                              ? "bg-rose-50 text-rose-600"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                          onClick={() => setIsMobileNavOpen(false)}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/property-deed-handover.png" alt="Business Owner" />
                      <AvatarFallback>BO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">Royal Gents Salon</p>
                      <p className="text-xs text-gray-500 truncate">Rajesh Patel</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleSignOut}>
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 py-6 px-4 md:px-8 mt-16 md:mt-0">{children}</main>
      </div>
    </div>
  )
}
