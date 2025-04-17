"use client"

import { useState } from "react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, UserPlus, CheckCircle, XCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function QueueManagementPage() {
  // Mock data for queue
  const [queue, setQueue] = useState([
    {
      id: "1",
      customerName: "Rahul Sharma",
      service: "Haircut & Beard Trim",
      estimatedTime: 45,
      status: "in-service",
      joinedAt: "10:15 AM",
    },
    {
      id: "2",
      customerName: "Amit Patel",
      service: "Hair Color",
      estimatedTime: 90,
      status: "waiting",
      joinedAt: "10:30 AM",
    },
    {
      id: "3",
      customerName: "Vikram Malhotra",
      service: "Facial",
      estimatedTime: 60,
      status: "waiting",
      joinedAt: "10:45 AM",
    },
    {
      id: "4",
      customerName: "Suresh Kumar",
      service: "Haircut",
      estimatedTime: 30,
      status: "waiting",
      joinedAt: "11:00 AM",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    customerName: "",
    service: "",
    estimatedTime: 30,
  })

  const queueStats = {
    currentWaitTime: "35 min",
    peopleInQueue: queue.filter((item) => item.status === "waiting").length,
    servedToday: 12,
    averageWaitTime: "28 min",
  }

  const handleAddToQueue = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`

    const newQueueItem = {
      id: (Math.max(...queue.map((item) => Number.parseInt(item.id))) + 1).toString(),
      customerName: newCustomer.customerName,
      service: newCustomer.service,
      estimatedTime: newCustomer.estimatedTime,
      status: "waiting",
      joinedAt: formattedTime,
    }

    setQueue([...queue, newQueueItem])
    setNewCustomer({
      customerName: "",
      service: "",
      estimatedTime: 30,
    })
    setIsAddDialogOpen(false)
  }

  const handleMarkAsServing = (id: string) => {
    setQueue(
      queue.map((item) =>
        item.id === id
          ? { ...item, status: "in-service" }
          : item.status === "in-service"
            ? { ...item, status: "completed" }
            : item,
      ),
    )
  }

  const handleMarkAsCompleted = (id: string) => {
    setQueue(queue.map((item) => (item.id === id ? { ...item, status: "completed" } : item)))
  }

  const handleRemoveFromQueue = (id: string) => {
    setQueue(queue.filter((item) => item.id !== id))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-service":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Service</Badge>
      case "waiting":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Waiting</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed</Badge>
      default:
        return null
    }
  }

  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Queue Management</h1>
        <p className="text-gray-600">Manage your virtual queue and wait times</p>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Current Wait Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-2xl font-bold">{queueStats.currentWaitTime}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">People in Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStats.peopleInQueue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Served Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStats.servedToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Wait Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStats.averageWaitTime}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Currently Serving */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Currently Serving</CardTitle>
            <CardDescription>Customers currently being served</CardDescription>
          </CardHeader>
          <CardContent>
            {queue.filter((item) => item.status === "in-service").length > 0 ? (
              <div className="space-y-4">
                {queue
                  .filter((item) => item.status === "in-service")
                  .map((item) => (
                    <div key={item.id} className="bg-green-50 border border-green-200 rounded-md p-4">
                      {/* Customer Details */}
                      <p className="font-semibold">{item.customerName}</p>
                      <p className="text-sm text-gray-500">{item.service}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-500">Est. time: {item.estimatedTime} min</span>
                        <Button size="sm" onClick={() => handleMarkAsCompleted(item.id)} variant="outline">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-500">No customers currently being served</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Waiting Queue */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Waiting Queue</CardTitle>
              <CardDescription>Customers waiting to be served</CardDescription>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-rose-600 hover:bg-rose-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add to Queue
            </Button>
          </CardHeader>
          <CardContent>
            {queue.filter((item) => item.status === "waiting").length > 0 ? (
              <div className="space-y-3">
                {queue
                  .filter((item) => item.status === "waiting")
                  .map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center">
                        <div className="bg-amber-100 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{item.customerName}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{item.service}</span>
                            <span className="mx-2">•</span>
                            <span>Joined at {item.joinedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleMarkAsServing(item.id)}
                          className="bg-rose-600 hover:bg-rose-700"
                        >
                          Serve Now
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleRemoveFromQueue(item.id)}>
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-500">Queue is empty</p>
                <p className="text-sm text-gray-400">Add customers to the queue to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add to Queue Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Customer to Queue</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={newCustomer.customerName}
                onChange={(e) => setNewCustomer({ ...newCustomer, customerName: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="service">Service</Label>
              <Select
                value={newCustomer.service}
                onValueChange={(value) => setNewCustomer({ ...newCustomer, service: value })}
              >
                <SelectTrigger id="service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Haircut">Haircut</SelectItem>
                  <SelectItem value="Haircut & Beard Trim">Haircut & Beard Trim</SelectItem>
                  <SelectItem value="Hair Color">Hair Color</SelectItem>
                  <SelectItem value="Facial">Facial</SelectItem>
                  <SelectItem value="Head Massage">Head Massage</SelectItem>
                  <SelectItem value="Manicure">Manicure</SelectItem>
                  <SelectItem value="Pedicure">Pedicure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
              <Input
                id="estimatedTime"
                type="number"
                value={newCustomer.estimatedTime}
                onChange={(e) => setNewCustomer({ ...newCustomer, estimatedTime: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddToQueue} className="bg-rose-600 hover:bg-rose-700">
              Add to Queue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BusinessDashboardLayout>
  )
}
