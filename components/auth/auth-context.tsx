"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

// Update the User interface to include "advertiser" role
interface User {
  id: string
  name: string
  email: string
  role: "customer" | "business" | "admin" | "advertiser"
  businessId?: string
  phone?: string
}

// Update the AuthContextType interface to include advertiser login/register
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: "customer" | "business" | "admin" | "advertiser") => Promise<boolean>
  loginWithPhone: (phone: string, role: "customer" | "business" | "admin" | "advertiser") => Promise<boolean>
  logout: () => void
  register: (
    name: string,
    phone: string,
    role: "customer" | "business" | "admin" | "advertiser",
    email?: string,
  ) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Add a mock advertiser user
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Customer",
    email: "customer@example.com",
    phone: "9876543210",
    role: "customer",
  },
  {
    id: "2",
    name: "Jane Business",
    email: "business@example.com",
    phone: "9876543211",
    role: "business",
    businessId: "b1",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    phone: "9876543212",
    role: "admin",
  },
  {
    id: "4",
    name: "Alex Advertiser",
    email: "advertiser@example.com",
    phone: "9876543213",
    role: "advertiser",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Fix: Use sessionStorage instead of localStorage for better persistence across tabs
  // and implement proper session handling
  useEffect(() => {
    // Check for stored user on mount
    const storedUser = sessionStorage.getItem("trimly_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        // Refresh the session timer
        sessionStorage.setItem("trimly_last_active", Date.now().toString())
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        sessionStorage.removeItem("trimly_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Add session timeout handling (30 minutes of inactivity)
  useEffect(() => {
    if (!user) return

    const checkSession = () => {
      const lastActive = sessionStorage.getItem("trimly_last_active")
      if (lastActive) {
        const inactiveTime = Date.now() - Number.parseInt(lastActive)
        // If inactive for more than 30 minutes, log out
        if (inactiveTime > 30 * 60 * 1000) {
          logout()
        } else {
          // Update last active time
          sessionStorage.setItem("trimly_last_active", Date.now().toString())
        }
      }
    }

    // Check session every minute
    const interval = setInterval(checkSession, 60 * 1000)

    // Update last active time on user interaction
    const updateLastActive = () => {
      if (user) {
        sessionStorage.setItem("trimly_last_active", Date.now().toString())
      }
    }

    window.addEventListener("click", updateLastActive)
    window.addEventListener("keypress", updateLastActive)
    window.addEventListener("scroll", updateLastActive)
    window.addEventListener("mousemove", updateLastActive)

    return () => {
      clearInterval(interval)
      window.removeEventListener("click", updateLastActive)
      window.removeEventListener("keypress", updateLastActive)
      window.removeEventListener("scroll", updateLastActive)
      window.removeEventListener("mousemove", updateLastActive)
    }
  }, [user])

  // Update the useEffect for redirects to handle advertiser role
  useEffect(() => {
    if (!isLoading && user) {
      // If user is logged in but on login/register pages, redirect to appropriate dashboard
      if (pathname?.includes("/login") || pathname?.includes("/register")) {
        if (user.role === "business") {
          router.push("/business/dashboard")
        } else if (user.role === "customer") {
          router.push("/")
        } else if (user.role === "advertiser") {
          router.push("/advertiser/dashboard")
        }
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (
    email: string,
    password: string,
    role: "customer" | "business" | "admin" | "advertiser",
  ): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user with matching email and role
    const foundUser = mockUsers.find((u) => u.email === email && u.role === role)

    if (foundUser) {
      setUser(foundUser)
      // Store in sessionStorage for better persistence
      sessionStorage.setItem("trimly_user", JSON.stringify(foundUser))
      sessionStorage.setItem("trimly_last_active", Date.now().toString())
      setIsLoading(false)

      // Redirect based on role
      if (role === "business") {
        router.push("/business/dashboard")
      } else if (role === "advertiser") {
        router.push("/advertiser/dashboard")
      } else {
        router.push("/")
      }

      return true
    }

    setIsLoading(false)
    return false
  }

  const loginWithPhone = async (
    phone: string,
    role: "customer" | "business" | "admin" | "advertiser",
  ): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user with matching phone and role
    const foundUser = mockUsers.find((u) => u.phone === phone && u.role === role)

    if (foundUser) {
      setUser(foundUser)
      // Store in sessionStorage for better persistence
      sessionStorage.setItem("trimly_user", JSON.stringify(foundUser))
      sessionStorage.setItem("trimly_last_active", Date.now().toString())
      setIsLoading(false)

      // Redirect based on role
      if (role === "business") {
        router.push("/business/dashboard")
      } else if (role === "advertiser") {
        router.push("/advertiser/dashboard")
      } else {
        router.push("/")
      }

      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem("trimly_user")
    sessionStorage.removeItem("trimly_last_active")
    router.push("/")
  }

  const register = async (
    name: string,
    phone: string,
    role: "customer" | "business" | "admin" | "advertiser",
    email?: string,
  ): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => (u.phone === phone || (email && u.email === email)) && u.role === role)

    if (existingUser) {
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      name,
      email: email || "",
      phone,
      role,
      ...(role === "business" ? { businessId: `b${mockUsers.length + 1}` } : {}),
    }

    // In a real app, you would save this to your database
    // For demo, we'll just set the current user
    setUser(newUser)
    // Store in sessionStorage for better persistence
    sessionStorage.setItem("trimly_user", JSON.stringify(newUser))
    sessionStorage.setItem("trimly_last_active", Date.now().toString())

    setIsLoading(false)

    // Redirect based on role
    if (role === "business") {
      router.push("/business/dashboard")
    } else if (role === "advertiser") {
      router.push("/advertiser/dashboard")
    } else {
      router.push("/")
    }

    return true
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithPhone, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
