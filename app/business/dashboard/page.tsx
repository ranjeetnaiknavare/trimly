"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Package, Star, Clock, ArrowRight, LogOut } from "lucide-react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth/auth-context"

export default function BusinessDashboardPage() {
  const { logout } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = () => {
    setIsLoading(true)
    setTimeout(() => {
      logout()
      router.push("/business/login")
    }, 1000)
  }

  return (
    <BusinessDashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Rajesh!</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={handleSignOut} disabled={isLoading}>
          <LogOut className="h-4 w-4" />
          {isLoading ? "Signing out..." : "Sign Out"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">4 completed, 8 upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Queue Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 waiting</div>
            <p className="text-xs text-gray-500">Average wait: 15 mins</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,250</div>
            <p className="text-xs text-green-500">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">Today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Next 3 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rahul Sharma</p>
                  <p className="text-sm text-gray-500">Haircut & Beard Trim</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm">10:30 AM</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Priya Patel</p>
                  <p className="text-sm text-gray-500">Hair Color</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm">11:15 AM</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Amit Kumar</p>
                  <p className="text-sm text-gray-500">Facial & Head Massage</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm">12:00 PM</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full flex items-center justify-center gap-1">
              View All Appointments
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
            <CardDescription>Today's metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">Rajesh</p>
                  <span className="text-sm">8/10 appointments</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">Sunil</p>
                  <span className="text-sm">6/8 appointments</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">Anjali</p>
                  <span className="text-sm">4/5 appointments</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">Vikram</p>
                  <span className="text-sm">3/5 appointments</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full flex items-center justify-center gap-1">
              View Staff Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inventory Status</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 items low</div>
            <p className="text-xs text-red-500">3 items out of stock</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full flex items-center justify-center gap-1">
              Manage Inventory
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Reviews</CardTitle>
            <Star className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-gray-500">Based on 24 reviews</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full flex items-center justify-center gap-1">
              View All Reviews
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customer Growth</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-green-500">28 new this month</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full flex items-center justify-center gap-1">
              Customer Analytics
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </BusinessDashboardLayout>
  )
}
