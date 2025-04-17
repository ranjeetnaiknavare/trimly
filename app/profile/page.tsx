import Link from "next/link"
import {
  User,
  Settings,
  CreditCard,
  Heart,
  Gift,
  HelpCircle,
  LogOut,
  ChevronRight,
  Bell,
  Shield,
  Users,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BottomNav } from "@/components/bottom-nav"

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    memberSince: "July 2023",
    profileImage: "/diverse-group-city.png",
  }

  const menuItems = [
    {
      icon: <User className="w-5 h-5 text-rose-600" />,
      label: "Personal Information",
      href: "/profile/personal-info",
    },
    {
      icon: <Users className="w-5 h-5 text-rose-600" />,
      label: "Family Members",
      href: "/profile/family-members",
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-600" />,
      label: "Favorite Salons",
      href: "/profile/favorites",
    },
    {
      icon: <CreditCard className="w-5 h-5 text-rose-600" />,
      label: "Payment Methods",
      href: "/profile/payment-methods",
    },
    {
      icon: <Bell className="w-5 h-5 text-rose-600" />,
      label: "Notification Preferences",
      href: "/profile/notifications",
    },
    {
      icon: <Gift className="w-5 h-5 text-rose-600" />,
      label: "Referrals & Rewards",
      href: "/profile/rewards",
    },
    {
      icon: <Star className="w-5 h-5 text-rose-600" />,
      label: "My Reviews",
      href: "/profile/reviews",
    },
    {
      icon: <Shield className="w-5 h-5 text-rose-600" />,
      label: "Privacy & Security",
      href: "/profile/privacy",
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-rose-600" />,
      label: "Help & Support",
      href: "/profile/support",
    },
    {
      icon: <Settings className="w-5 h-5 text-rose-600" />,
      label: "Settings",
      href: "/profile/settings",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center justify-center h-16 px-4">
          <h1 className="text-xl font-bold text-rose-600">My Profile</h1>
        </div>
      </header>

      <main className="flex-1">
        {/* User Profile Card */}
        <div className="container px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img
                  src={user.profileImage || "/placeholder.svg"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-rose-100"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.phone}</p>
                <p className="text-xs text-gray-400 mt-1">Member since {user.memberSince}</p>
              </div>
            </div>
            <Link href="/profile/personal-info">
              <Button variant="outline" className="w-full mt-4 border-rose-200 text-rose-600 hover:bg-rose-50">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Menu Items */}
        <div className="container px-4 pb-6">
          <div className="bg-white rounded-lg shadow-sm">
            {menuItems.map((item, index) => (
              <div key={index}>
                <Link href={item.href}>
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3 text-gray-700">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
                {index < menuItems.length - 1 && <Separator />}
              </div>
            ))}
          </div>

          <Button variant="ghost" className="w-full mt-6 text-red-600 hover:bg-red-50 hover:text-red-700">
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav active="profile" />
    </div>
  )
}
