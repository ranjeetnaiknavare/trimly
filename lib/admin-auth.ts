// Admin authentication and authorization utilities

export type AdminRole = "super_admin" | "admin" | "manager" | "viewer"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: AdminRole
  permissions: string[]
  lastLogin: Date
  createdAt: Date
}

// Mock admin users for demonstration
const adminUsers: AdminUser[] = [
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

export function getAdminUser(email: string): AdminUser | undefined {
  return adminUsers.find((user) => user.email === email)
}

export function hasPermission(user: AdminUser, permission: string): boolean {
  if (user.role === "super_admin" || user.permissions.includes("*")) {
    return true
  }

  return user.permissions.includes(permission)
}

export function getRoleColor(role: AdminRole): string {
  switch (role) {
    case "super_admin":
      return "bg-purple-500"
    case "admin":
      return "bg-blue-500"
    case "manager":
      return "bg-green-500"
    case "viewer":
      return "bg-gray-500"
    default:
      return "bg-gray-400"
  }
}

export function getRoleName(role: AdminRole): string {
  switch (role) {
    case "super_admin":
      return "Super Admin"
    case "admin":
      return "Admin"
    case "manager":
      return "Manager"
    case "viewer":
      return "Viewer"
    default:
      return "Unknown"
  }
}
