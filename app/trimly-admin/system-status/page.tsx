"use client"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RefreshCw, AlertTriangle, CheckCircle, Server, Database, Globe, Clock, Activity } from "lucide-react"

export default function SystemStatusPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <AdminShell requiredPermission="system.view">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">System Status</h1>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Status"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">API Status</p>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center">
                  <Server className="h-5 w-5 mr-2 text-green-500" />
                  <p className="text-lg font-medium">99.98% Uptime</p>
                </div>
                <p className="text-xs text-gray-500">Last incident: 15 days ago</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Database</p>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-green-500" />
                  <p className="text-lg font-medium">99.95% Uptime</p>
                </div>
                <p className="text-xs text-gray-500">Last incident: 3 days ago</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Web App</p>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-500" />
                  <p className="text-lg font-medium">99.99% Uptime</p>
                </div>
                <p className="text-xs text-gray-500">Last incident: 30+ days ago</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Background Jobs</p>
                  <Badge className="bg-amber-100 text-amber-800">Degraded</Badge>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-amber-500" />
                  <p className="text-lg font-medium">97.5% Uptime</p>
                </div>
                <p className="text-xs text-gray-500">Incident ongoing: 2 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Active Incident</AlertTitle>
          <AlertDescription className="text-amber-700">
            Background job processing is currently experiencing delays. Our team is investigating the issue.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                System Resources
              </CardTitle>
              <CardDescription>Current resource utilization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">CPU Usage</p>
                  <p className="text-sm text-gray-500">42%</p>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Memory Usage</p>
                  <p className="text-sm text-gray-500">68%</p>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Disk Usage</p>
                  <p className="text-sm text-gray-500">35%</p>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Network Bandwidth</p>
                  <p className="text-sm text-gray-500">51%</p>
                </div>
                <Progress value={51} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Service Health
              </CardTitle>
              <CardDescription>Status of individual services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Authentication Service", status: "Operational", uptime: "99.99%" },
                  { name: "Payment Processing", status: "Operational", uptime: "99.95%" },
                  { name: "Notification Service", status: "Operational", uptime: "99.90%" },
                  { name: "Search Service", status: "Operational", uptime: "99.98%" },
                  { name: "Booking Engine", status: "Operational", uptime: "99.97%" },
                  { name: "Analytics Service", status: "Degraded", uptime: "97.50%" },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-xs text-gray-500">{service.uptime} uptime</p>
                    </div>
                    <Badge
                      className={
                        service.status === "Operational" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }
                    >
                      {service.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>History of system incidents and resolutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  id: "INC-2023-08-15",
                  service: "Background Jobs",
                  status: "Investigating",
                  started: "Aug 15, 2023, 10:30 AM",
                  description: "Background job processing is experiencing delays. Our team is investigating the issue.",
                },
                {
                  id: "INC-2023-08-12",
                  service: "Database",
                  status: "Resolved",
                  started: "Aug 12, 2023, 3:15 PM",
                  resolved: "Aug 12, 2023, 4:45 PM",
                  description:
                    "Database connections were timing out due to high load. We scaled up the database cluster and optimized queries.",
                },
                {
                  id: "INC-2023-07-28",
                  service: "API",
                  status: "Resolved",
                  started: "Jul 28, 2023, 8:20 AM",
                  resolved: "Jul 28, 2023, 9:10 AM",
                  description:
                    "API was returning 500 errors for some requests. Issue was traced to a deployment error and rolled back.",
                },
              ].map((incident, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div>
                      <p className="font-medium">
                        {incident.id}: {incident.service} Incident
                      </p>
                      <p className="text-sm text-gray-500">Started: {incident.started}</p>
                      {incident.resolved && <p className="text-sm text-gray-500">Resolved: {incident.resolved}</p>}
                    </div>
                    <Badge
                      className={
                        incident.status === "Resolved"
                          ? "bg-green-100 text-green-800 mt-2 sm:mt-0"
                          : "bg-amber-100 text-amber-800 mt-2 sm:mt-0"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{incident.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
