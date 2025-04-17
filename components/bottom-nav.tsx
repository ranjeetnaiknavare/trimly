import Link from "next/link"
import { Home, Search, Calendar, User } from "lucide-react"

interface BottomNavProps {
  active: "home" | "explore" | "bookings" | "profile"
}

export function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="sticky bottom-0 bg-white border-t border-gray-200 py-2">
      <div className="container grid grid-cols-4">
        <Link
          href="/"
          className={`flex flex-col items-center ${active === "home" ? "text-rose-600" : "text-gray-500"}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/explore"
          className={`flex flex-col items-center ${active === "explore" ? "text-rose-600" : "text-gray-500"}`}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        <Link
          href="/bookings"
          className={`flex flex-col items-center ${active === "bookings" ? "text-rose-600" : "text-gray-500"}`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Bookings</span>
        </Link>
        <Link
          href="/profile"
          className={`flex flex-col items-center ${active === "profile" ? "text-rose-600" : "text-gray-500"}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  )
}
