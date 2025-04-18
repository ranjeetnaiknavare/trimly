"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "business" | "admin"
  businessId?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: "customer" | "business" | "admin") => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string, role: "customer" | "business" | "admin") => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Customer",
    email: "customer@example.com",
    role: "customer",
  },
  {
    id: "2",
    name: "Jane Business",
    email: "business@example.com",
    role: "business",
    businessId: "b1",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("trimly_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "customer" | "business" | "admin"): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user with matching email and role
    const foundUser = mockUsers.find((u) => u.email === email && u.role === role)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("trimly_user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("trimly_user")
    router.push("/")
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "customer" | "business" | "admin",
  ): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)

    if (existingUser) {
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      role,
      ...(role === "business" ? { businessId: `b${mockUsers.length + 1}` } : {}),
    }

    // In a real app, you would save this to your database
    // For demo, we'll just set the current user
    setUser(newUser)
    localStorage.setItem("trimly_user", JSON.stringify(newUser))

    setIsLoading(false)
    return true
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
