"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TrimlyLogo } from "@/components/trimly-logo"
import { LayoutDashboard, ImagePlus, BarChart3, Wallet, Settings, Menu, X, Bell, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AdvertiserDashboardLayoutProps {
  children: React.ReactNode
}

export function AdvertiserDashboardLayout({ children }: AdvertiserDashboardLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    {
      name: "Dashboard",
      href: "/advertiser/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/advertiser/dashboard",
    },
    {
      name: "My Ads",
      href: "/advertiser/ads",
      icon: ImagePlus,
      current: pathname === "/advertiser/ads" || pathname.startsWith("/advertiser/ads/"),
    },
    {
      name: "Analytics",
      href: "/advertiser/analytics",
      icon: BarChart3,
      current: pathname === "/advertiser/analytics",
    },
    {
      name: "Billing",
      href: "/advertiser/billing",
      icon: Wallet,
      current: pathname === "/advertiser/billing",
    },
    {
      name: "Settings",
      href: "/advertiser/settings",
      icon: Settings,
      current: pathname === "/advertiser/settings",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden", isSidebarOpen ? "block" : "hidden")}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/advertiser/dashboard" className="flex items-center">
            <TrimlyLogo className="h-8 w-auto" />
            <span className="ml-2 text-lg font-semibold">Advertiser</span>
          </Link>
          <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                item.current ? "bg-rose-50 text-rose-600" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", item.current ? "text-rose-600" : "text-gray-500")} />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col lg:pl-64">
        <header className="sticky top-0 z-10 bg-white border-b h-16 flex items-center px-4 lg:px-6">
          <button className="lg:hidden text-gray-500 hover:text-gray-700 mr-4" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Link href="/advertiser/ads/create" className="flex items-center">
                <ImagePlus className="h-4 w-4 mr-2" />
                Create Ad
              </Link>
            </Button>

            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/abstract-business-symbol.png" alt="User" />
                    <AvatarFallback>AA</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">Acme Advertising</p>
                    <p className="text-sm text-muted-foreground">advertiser@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/advertiser/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/advertiser/billing">Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/advertiser/login">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
