"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Calendar, User, LogOut } from "lucide-react"
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

  // Don't show bottom nav on business pages
  if (pathname?.startsWith("/business")) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full ${
            pathname === "/" ? "text-rose-600" : "text-gray-500"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/explore"
          className={`flex flex-col items-center justify-center w-full h-full ${
            pathname === "/explore" ? "text-rose-600" : "text-gray-500"
          }`}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        <Link
          href="/bookings"
          className={`flex flex-col items-center justify-center w-full h-full ${
            pathname === "/bookings" ? "text-rose-600" : "text-gray-500"
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Bookings</span>
        </Link>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`flex flex-col items-center justify-center w-full h-full rounded-none ${
                  pathname === "/profile" ? "text-rose-600" : "text-gray-500"
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
                <Link href="/bookings">My Bookings</Link>
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
              pathname === "/login" ? "text-rose-600" : "text-gray-500"
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
