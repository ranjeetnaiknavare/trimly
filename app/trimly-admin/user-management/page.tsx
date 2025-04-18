"use client"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  RefreshCw,
  ShieldCheck,
  Key,
  Check,
  X,
  AlertCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { type AdminUser, getRoleColor, getRoleName } from "@/lib/admin-auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAdmin } from "@/components/admin/admin-context"

// Available permissions grouped by category
const availablePermissions = {
  users: ["users.view", "users.edit", "users.create", "users.delete"],
  businesses: ["businesses.view", "businesses.edit", "businesses.create", "businesses.delete"],
  advertisers: ["advertisers.view", "advertisers.edit", "advertisers.create", "advertisers.delete"],
  bookings: ["bookings.view", "bookings.edit", "bookings.create", "bookings.delete"],
  services: ["services.view", "services.edit", "services.create", "services.delete"],
  coupons: ["coupons.view", "coupons.edit", "coupons.create", "coupons.delete"],
  analytics: ["analytics.view", "analytics.export"],
  reports: ["reports.view", "reports.export"],
  settings: ["settings.view", "settings.edit"],
  admin: ["admin.view", "admin.manage"],
}

export default function UserManagementPage() {
  const {
    adminUsers,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,
    updateUserPermissions,
    resetUserPassword,
    setSuccessMessage,
    setErrorMessage,
  } = useAdmin()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false)
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false)
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false)
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer",
    password: "",
    confirmPassword: "",
  })
  const [editedUser, setEditedUser] = useState<AdminUser | null>(null)
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const filteredUsers = adminUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = selectedRole === "all" || user.role === selectedRole

    return matchesSearch && matchesRole
  })

  const handleAddUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.password) {
      setErrorMessage("Please fill in all required fields")
      return
    }

    if (newUser.password !== newUser.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    // Check if email already exists
    if (adminUsers.some((user) => user.email === newUser.email)) {
      setErrorMessage("A user with this email already exists")
      return
    }

    // Add the new user
    addAdminUser({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as any,
      permissions: getDefaultPermissionsForRole(newUser.role as any),
    })

    // Close dialog and reset form
    setIsAddUserDialogOpen(false)
    setNewUser({
      name: "",
      email: "",
      role: "viewer",
      password: "",
      confirmPassword: "",
    })
    setPasswordError("")
  }

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user)
    setEditedUser({ ...user })
    setIsEditUserDialogOpen(true)
  }

  const handleUpdateUser = () => {
    if (!editedUser || !selectedUser) return

    // Validate form
    if (!editedUser.name || !editedUser.email) {
      setErrorMessage("Please fill in all required fields")
      return
    }

    // Check if email already exists (except for the current user)
    if (adminUsers.some((user) => user.email === editedUser.email && user.id !== editedUser.id)) {
      setErrorMessage("A user with this email already exists")
      return
    }

    // Update the user
    updateAdminUser(editedUser)
    setIsEditUserDialogOpen(false)
  }

  const handleDeleteUser = (user: AdminUser) => {
    setSelectedUser(user)
    setIsDeleteUserDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!selectedUser) return

    // Delete the user
    deleteAdminUser(selectedUser.id)
    setIsDeleteUserDialogOpen(false)
  }

  const handleManagePermissions = (user: AdminUser) => {
    setSelectedUser(user)
    setEditedUser({ ...user })
    setIsPermissionsDialogOpen(true)
  }

  const handleResetPassword = (user: AdminUser) => {
    setSelectedUser(user)
    setIsResetPasswordDialogOpen(true)
  }

  const handleConfirmResetPassword = () => {
    if (!selectedUser) return

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      return
    }

    // Reset the password
    resetUserPassword(selectedUser.id, newPassword)

    // Close dialog and reset form
    setIsResetPasswordDialogOpen(false)
    setNewPassword("")
    setConfirmNewPassword("")
    setPasswordError("")
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (!selectedUser || !editedUser) return

    const updatedPermissions = checked
      ? [...editedUser.permissions, permission]
      : editedUser.permissions.filter((p) => p !== permission)

    setEditedUser({
      ...editedUser,
      permissions: updatedPermissions,
    })
  }

  const handleSavePermissions = () => {
    if (!selectedUser || !editedUser) return

    // Update the user's permissions
    updateUserPermissions(selectedUser.id, editedUser.permissions)
    setIsPermissionsDialogOpen(false)
  }

  const getDefaultPermissionsForRole = (role: "super_admin" | "admin" | "manager" | "viewer"): string[] => {
    switch (role) {
      case "super_admin":
        return ["*"]
      case "admin":
        return [
          "users.view",
          "users.edit",
          "users.create",
          "businesses.view",
          "businesses.edit",
          "businesses.create",
          "advertisers.view",
          "advertisers.edit",
          "advertisers.create",
          "settings.view",
          "settings.edit",
          "admin.view",
        ]
      case "manager":
        return [
          "users.view",
          "users.edit",
          "businesses.view",
          "businesses.edit",
          "advertisers.view",
          "advertisers.edit",
          "reports.view",
          "reports.export",
          "analytics.view",
        ]
      case "viewer":
        return ["users.view", "businesses.view", "advertisers.view", "reports.view", "analytics.view"]
      default:
        return []
    }
  }

  const hasPermission = (user: AdminUser, permission: string): boolean => {
    if (user.role === "super_admin" || user.permissions.includes("*")) {
      return true
    }
    return user.permissions.includes(permission)
  }

  return (
    <AdminShell requiredPermission="admin.manage">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Admin User Management</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Admin User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Admin User</DialogTitle>
                  <DialogDescription>Create a new admin user with specific role and permissions.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">
                      Role
                    </label>
                    <select
                      id="role"
                      className="w-full border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                    />
                    {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser} className="bg-purple-600 hover:bg-purple-700">
                    Create User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search admin users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 self-end">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="viewer">Viewer</option>
            </select>
            <Button variant="ghost" size="icon" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getRoleColor(user.role)} font-medium`}>{getRoleName(user.role)}</Badge>
                        </TableCell>
                        <TableCell>
                          {user.lastLogin.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          {user.createdAt.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center" onClick={() => handleEditUser(user)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center" onClick={() => handleResetPassword(user)}>
                                <Key className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center"
                                onClick={() => handleManagePermissions(user)}
                              >
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                Manage Permissions
                              </DropdownMenuItem>
                              {user.role !== "super_admin" && (
                                <DropdownMenuItem
                                  className="flex items-center text-red-600"
                                  onClick={() => handleDeleteUser(user)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete User
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No admin users found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="roles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Admin</CardTitle>
                  <CardDescription>Full access to manage the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Manage users and businesses</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Configure platform settings</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Access all reports and analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Manage other admin users</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manager</CardTitle>
                  <CardDescription>Day-to-day operations management</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Manage users and businesses</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Access reports and analytics</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span>Cannot configure platform settings</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span>Cannot manage admin users</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Viewer</CardTitle>
                  <CardDescription>Read-only access to platform data</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>View users and businesses</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>View reports and analytics</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span>Cannot make any changes</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span>Cannot export sensitive data</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Super Admin</CardTitle>
                  <CardDescription>Unrestricted access to all features</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Full system access</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Can create and manage all admin users</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Access to system configuration</span>
                    </li>
                    <li className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                      <span>Limited to technical administrators only</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Admin Activity Log</CardTitle>
                <CardDescription>Recent actions performed by admin users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Date & Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                          <span>Admin User</span>
                        </div>
                      </TableCell>
                      <TableCell>Created user</TableCell>
                      <TableCell>Created new manager account</TableCell>
                      <TableCell>Today, 10:30 AM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>S</AvatarFallback>
                          </Avatar>
                          <span>Super Admin</span>
                        </div>
                      </TableCell>
                      <TableCell>Updated settings</TableCell>
                      <TableCell>Changed system email configuration</TableCell>
                      <TableCell>Yesterday, 4:15 PM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>M</AvatarFallback>
                          </Avatar>
                          <span>Manager</span>
                        </div>
                      </TableCell>
                      <TableCell>Approved business</TableCell>
                      <TableCell>Approved "Elegant Beauty" salon registration</TableCell>
                      <TableCell>Yesterday, 11:20 AM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                          <span>Admin User</span>
                        </div>
                      </TableCell>
                      <TableCell>Created coupon</TableCell>
                      <TableCell>Created "SUMMER25" platform-wide coupon</TableCell>
                      <TableCell>2 days ago, 3:45 PM</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit User Dialog */}
      {selectedUser && editedUser && (
        <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user details and role</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="edit-name"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
              </div>
              {selectedUser.role !== "super_admin" && (
                <div className="space-y-2">
                  <label htmlFor="edit-role" className="text-sm font-medium">
                    Role
                  </label>
                  <select
                    id="edit-role"
                    className="w-full border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={editedUser.role}
                    onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value as any })}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser} className="bg-purple-600 hover:bg-purple-700">
                Update User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete User Dialog */}
      {selectedUser && (
        <Dialog open={isDeleteUserDialogOpen} onOpenChange={setIsDeleteUserDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Are you sure you want to delete the user <span className="font-bold">{selectedUser.name}</span>?
              </p>
              <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reset Password Dialog */}
      {selectedUser && (
        <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>Set a new password for {selectedUser.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  New Password
                </label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-new-password" className="text-sm font-medium">
                  Confirm New Password
                </label>
                <Input
                  id="confirm-new-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmResetPassword} className="bg-purple-600 hover:bg-purple-700">
                Reset Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Manage Permissions Dialog */}
      {selectedUser && editedUser && (
        <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Manage Permissions</DialogTitle>
              <DialogDescription>Configure permissions for {selectedUser.name}</DialogDescription>
            </DialogHeader>
            <div className="py-4 max-h-[60vh] overflow-y-auto">
              {selectedUser.role === "super_admin" ? (
                <div className="text-center py-4">
                  <ShieldCheck className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                  <h3 className="text-lg font-medium">Super Admin Permissions</h3>
                  <p className="text-gray-500">
                    Super Admins have unrestricted access to all system features and functions.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(availablePermissions).map(([category, permissions]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="text-md font-medium capitalize">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {permissions.map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission}
                              checked={hasPermission(editedUser, permission)}
                              onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                            />
                            <label htmlFor={permission} className="text-sm">
                              {permission.split(".")[1].charAt(0).toUpperCase() + permission.split(".")[1].slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPermissionsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePermissions} className="bg-purple-600 hover:bg-purple-700">
                Save Permissions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminShell>
  )
}
