"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Calendar, User, LogOut, Tag } from "lucide-react"
import { useAuth } from "@/components/auth/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BottomNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const active =
    pathname === "/"
      ? "home"
      : pathname === "/explore"
        ? "explore"
        : pathname === "/profile"
          ? "profile"
          : pathname === "/jobs"
            ? "jobs"
            : pathname === "/ads"
              ? "ads"
              : pathname === "/login"
                ? "login"
                : null

  // Don't show bottom nav on business pages or booking pages
  if (pathname?.startsWith("/business") || pathname?.includes("/book")) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full ${
            active === "home" ? "text-rose-600" : "text-gray-500"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/explore"
          className={`flex flex-col items-center justify-center w-full h-full ${
            active === "explore" ? "text-rose-600" : "text-gray-500"
          }`}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        <Link
          href="/jobs"
          className={`flex flex-col items-center justify-center w-full h-full ${
            active === "jobs" ? "text-rose-600" : "text-gray-500"
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Jobs</span>
        </Link>
        <Link
          href="/ads"
          className={`flex flex-col items-center justify-center w-full h-full ${
            active === "ads" ? "text-rose-600" : "text-gray-500"
          }`}
        >
          <Tag className="h-5 w-5" />
          <span className="text-xs mt-1">Ads</span>
        </Link>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`flex flex-col items-center justify-center w-full h-full rounded-none ${
                  active === "profile" ? "text-rose-600" : "text-gray-500"
                }`}
              >
                <User className="h-5 w-5" />
                <span className="text-xs mt-1">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mb-16">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/jobs">Jobs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/notifications">Notifications</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className={`flex flex-col items-center justify-center w-full h-full ${
              active === "login" ? "text-rose-600" : "text-gray-500"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Login</span>
          </Link>
        )}
      </div>
    </div>
  )
}
