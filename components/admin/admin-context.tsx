"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type AdminUser, getAdminUser, hasPermission } from "@/lib/admin-auth"
import { useRouter } from "next/navigation"

interface AdminContextType {
  user: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
  adminUsers: AdminUser[]
  addAdminUser: (user: Omit<AdminUser, "id" | "lastLogin" | "createdAt">) => void
  updateAdminUser: (user: AdminUser) => void
  deleteAdminUser: (userId: string) => void
  updateUserPermissions: (userId: string, permissions: string[]) => void
  resetUserPassword: (userId: string, newPassword: string) => void
  successMessage: string
  setSuccessMessage: (message: string) => void
  errorMessage: string
  setErrorMessage: (message: string) => void
}

// Initial admin users
const initialAdminUsers: AdminUser[] = [
  {
    id: "1",
    name: "Super Admin",
    email: "super@trimly.com",
    role: "super_admin",
    permissions: ["*"],
    lastLogin: new Date(),
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@trimly.com",
    role: "admin",
    permissions: [
      "users.view",
      "users.edit",
      "businesses.view",
      "businesses.edit",
      "advertisers.view",
      "advertisers.edit",
      "settings.view",
    ],
    lastLogin: new Date(),
    createdAt: new Date("2023-02-15"),
  },
  {
    id: "3",
    name: "Manager",
    email: "manager@trimly.com",
    role: "manager",
    permissions: ["users.view", "businesses.view", "advertisers.view", "reports.view"],
    lastLogin: new Date(),
    createdAt: new Date("2023-03-20"),
  },
  {
    id: "4",
    name: "Viewer",
    email: "viewer@trimly.com",
    role: "viewer",
    permissions: ["users.view", "businesses.view", "advertisers.view"],
    lastLogin: new Date(),
    createdAt: new Date("2023-04-10"),
  },
]

const AdminContext = createContext<AdminContextType>({
  user: null,
  loading: true,
  login: async () => false,
  logout: () => {},
  hasPermission: () => false,
  adminUsers: [],
  addAdminUser: () => {},
  updateAdminUser: () => {},
  deleteAdminUser: () => {},
  updateUserPermissions: () => {},
  resetUserPassword: () => {},
  successMessage: "",
  setSuccessMessage: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
})

export const useAdmin = () => useContext(AdminContext)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(initialAdminUsers)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const storedEmail = localStorage.getItem("trimly_admin_email")
    if (storedEmail) {
      const adminUser = getAdminUser(storedEmail)
      if (adminUser) {
        setUser(adminUser)
      }
    }
    setLoading(false)
  }, [])

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  const login = async (email: string, password: string) => {
    // In a real app, this would validate against a backend
    // For demo purposes, we're using mock data
    const adminUser = adminUsers.find((user) => user.email === email)

    if (adminUser && password === "password") {
      // Simple password for demo
      setUser(adminUser)
      localStorage.setItem("trimly_admin_email", email)

      // Update last login time
      const updatedUsers = adminUsers.map((u) => (u.id === adminUser.id ? { ...u, lastLogin: new Date() } : u))
      setAdminUsers(updatedUsers)

      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("trimly_admin_email")
    router.push("/trimly-admin/login")
  }

  const checkPermission = (permission: string) => {
    if (!user) return false
    return hasPermission(user, permission)
  }

  const addAdminUser = (newUser: Omit<AdminUser, "id" | "lastLogin" | "createdAt">) => {
    const newId = (adminUsers.length + 1).toString()
    const adminUser: AdminUser = {
      id: newId,
      ...newUser,
      lastLogin: new Date(),
      createdAt: new Date(),
    }
    setAdminUsers([...adminUsers, adminUser])
    setSuccessMessage(`User ${newUser.name} has been created successfully`)
  }

  const updateAdminUser = (updatedUser: AdminUser) => {
    const updatedUsers = adminUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    setAdminUsers(updatedUsers)
    setSuccessMessage(`User ${updatedUser.name} has been updated successfully`)
  }

  const deleteAdminUser = (userId: string) => {
    const userToDelete = adminUsers.find((user) => user.id === userId)
    if (!userToDelete) {
      setErrorMessage("User not found")
      return
    }

    const updatedUsers = adminUsers.filter((user) => user.id !== userId)
    setAdminUsers(updatedUsers)
    setSuccessMessage(`User ${userToDelete.name} has been deleted successfully`)
  }

  const updateUserPermissions = (userId: string, permissions: string[]) => {
    const updatedUsers = adminUsers.map((user) => (user.id === userId ? { ...user, permissions } : user))

    const updatedUser = updatedUsers.find((user) => user.id === userId)
    if (updatedUser) {
      setSuccessMessage(`Permissions for ${updatedUser.name} have been updated successfully`)
    }

    setAdminUsers(updatedUsers)
  }

  const resetUserPassword = (userId: string, newPassword: string) => {
    // In a real app, this would hash the password and update it in the database
    const user = adminUsers.find((user) => user.id === userId)
    if (user) {
      setSuccessMessage(`Password for ${user.name} has been reset successfully`)
    } else {
      setErrorMessage("User not found")
    }
  }

  return (
    <AdminContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        hasPermission: checkPermission,
        adminUsers,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        updateUserPermissions,
        resetUserPassword,
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
