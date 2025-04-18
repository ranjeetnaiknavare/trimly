"use client"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Server,
  Database,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Activity,
  Clock,
  Download,
} from "lucide-react"

export default function SystemStatusPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  // Mock system status data
  const systemStatus = {
    api: {
      status: "operational",
      uptime: "99.98%",
      responseTime: "124ms",
    },
    database: {
      status: "operational",
      uptime: "99.95%",
      connections: 42,
      queryTime: "18ms",
    },
    storage: {
      status: "operational",
      uptime: "100%",
      usage: 68,
      total: "500GB",
      used: "340GB",
    },
    cache: {
      status: "operational",
      uptime: "99.99%",
      hitRate: "94%",
      missRate: "6%",
    },
    payments: {
      status: "operational",
      uptime: "99.97%",
      processingTime: "1.2s",
    },
    notifications: {
      status: "degraded",
      uptime: "98.75%",
      deliveryRate: "92%",
      issue: "Experiencing delays in SMS delivery",
    },
  }

  const incidents = [
    {
      id: "INC-001",
      title: "SMS Notification Delays",
      status: "investigating",
      component: "Notifications Service",
      started: "2023-08-15 14:30:00",
      updated: "2023-08-15 15:45:00",
      description:
        "We are currently experiencing delays in SMS notification delivery. Our team is investigating the issue and working to resolve it as quickly as possible.",
    },
    {
      id: "INC-002",
      title: "Database Performance Degradation",
      status: "resolved",
      component: "Database",
      started: "2023-08-10 09:15:00",
      updated: "2023-08-10 11:30:00",
      resolved: "2023-08-10 11:30:00",
      description:
        "We experienced a temporary degradation in database performance due to an unexpected spike in traffic. The issue has been resolved by scaling up our database resources.",
    },
    {
      id: "INC-003",
      title: "API Rate Limiting Issues",
      status: "resolved",
      component: "API Gateway",
      started: "2023-08-05 16:20:00",
      updated: "2023-08-05 17:45:00",
      resolved: "2023-08-05 17:45:00",
      description:
        "Some users experienced rate limiting errors when making API requests. We've adjusted our rate limiting configuration to accommodate higher traffic volumes.",
    },
  ]

  const maintenanceSchedule = [
    {
      id: "MAINT-001",
      title: "Database Maintenance",
      status: "scheduled",
      component: "Database",
      scheduled: "2023-08-20 02:00:00",
      duration: "2 hours",
      description: "Scheduled database maintenance for performance optimization and index rebuilding.",
      impact: "Minimal impact expected. Some operations may experience slight delays.",
    },
    {
      id: "MAINT-002",
      title: "Storage System Upgrade",
      status: "scheduled",
      component: "Storage",
      scheduled: "2023-08-25 03:00:00",
      duration: "3 hours",
      description: "Upgrading our storage infrastructure to improve capacity and performance.",
      impact: "File uploads and downloads may be temporarily unavailable during the maintenance window.",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Operational
          </Badge>
        )
      case "degraded":
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            Degraded
          </Badge>
        )
      case "outage":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Outage
          </Badge>
        )
      case "investigating":
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            Investigating
          </Badge>
        )
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Resolved
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Scheduled
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <Activity className="h-3.5 w-3.5 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  return (
    <AdminShell requiredPermission="system.view">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">System Status</h1>
          <p className="text-gray-600">Monitor the health and performance of all system components</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing} className="flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Server className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="font-medium">API</h3>
              </div>
              {getStatusBadge(systemStatus.api.status)}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Uptime</span>
                <span>{systemStatus.api.uptime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Response Time</span>
                <span>{systemStatus.api.responseTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Database className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="font-medium">Database</h3>
              </div>
              {getStatusBadge(systemStatus.database.status)}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Uptime</span>
                <span>{systemStatus.database.uptime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Active Connections</span>
                <span>{systemStatus.database.connections}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Avg. Query Time</span>
                <span>{systemStatus.database.queryTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <HardDrive className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="font-medium">Storage</h3>
              </div>
              {getStatusBadge(systemStatus.storage.status)}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Uptime</span>
                <span>{systemStatus.storage.uptime}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Usage</span>
                <span>
                  {systemStatus.storage.used} / {systemStatus.storage.total}
                </span>
              </div>
              <Progress value={systemStatus.storage.usage} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Components</CardTitle>
              <CardDescription>Current status of all system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Server className="h-5 w-5 text-gray-500 mr-2" />
                        <h3 className="font-medium">API Gateway</h3>
                      </div>
                      {getStatusBadge(systemStatus.api.status)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Uptime</span>
                        <span>{systemStatus.api.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Response Time</span>
                        <span>{systemStatus.api.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Database className="h-5 w-5 text-gray-500 mr-2" />
                        <h3 className="font-medium">Database</h3>
                      </div>
                      {getStatusBadge(systemStatus.database.status)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Uptime</span>
                        <span>{systemStatus.database.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Active Connections</span>
                        <span>{systemStatus.database.connections}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <HardDrive className="h-5 w-5 text-gray-500 mr-2" />
                        <h3 className="font-medium">Storage</h3>
                      </div>
                      {getStatusBadge(systemStatus.storage.status)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Uptime</span>
                        <span>{systemStatus.storage.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Usage</span>
                        <span>
                          {systemStatus.storage.used} / {systemStatus.storage.total}
                        </span>
                      </div>
                      <Progress value={systemStatus.storage.usage} className="h-2" />
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Memory className="h-5 w-5 text-gray-500 mr-2" />
                        <h3 className="font-medium">Cache</h3>
                      </div>
                      {getStatusBadge(systemStatus.cache.status)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Uptime</span>
                        <span>{systemStatus.cache.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Hit Rate</span>
                        <span>{systemStatus.cache.hitRate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Cpu className="h-5 w-5 text-gray-500 mr-2" />
                        <h3 className="font-medium">Payments</h3>
                      </div>
                      {getStatusBadge(systemStatus.payments.status)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Uptime</span>
                        <span>{systemStatus.payments.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Processing Time</span>
                        <span>{systemStatus.payments.processingTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 text-gray-500 mr-2" />
                        <h3 className="font-medium">Notifications</h3>
                      </div>
                      {getStatusBadge(systemStatus.notifications.status)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Uptime</span>
                        <span>{systemStatus.notifications.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Delivery Rate</span>
                        <span>{systemStatus.notifications.deliveryRate}</span>
                      </div>
                      {systemStatus.notifications.issue && (
                        <div className="mt-2 p-2 bg-amber-50 border border-amber-100 rounded-md text-xs text-amber-800">
                          {systemStatus.notifications.issue}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Incidents</CardTitle>
              <CardDescription>Currently ongoing system incidents</CardDescription>
            </CardHeader>
            <CardContent>
              {incidents.filter((incident) => incident.status === "investigating").length > 0 ? (
                <div className="space-y-4">
                  {incidents
                    .filter((incident) => incident.status === "investigating")
                    .map((incident) => (
                      <div key={incident.id} className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{incident.title}</h3>
                          {getStatusBadge(incident.status)}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          <span className="font-medium">Component:</span> {incident.component}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          <span className="font-medium">Started:</span> {incident.started}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          <span className="font-medium">Last Update:</span> {incident.updated}
                        </div>
                        <p className="text-sm mt-2">{incident.description}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium">All Systems Operational</h3>
                  <p className="text-gray-500 text-center mt-1">There are no active incidents at this time.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Incident History</CardTitle>
              <CardDescription>Past system incidents and their resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents
                  .filter((incident) => incident.status === "resolved")
                  .map((incident) => (
                    <div key={incident.id} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{incident.title}</h3>
                        {getStatusBadge(incident.status)}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Component:</span> {incident.component}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Started:</span> {incident.started}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Resolved:</span> {incident.resolved}
                      </div>
                      <p className="text-sm mt-2">{incident.description}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Maintenance</CardTitle>
              <CardDescription>Upcoming system maintenance events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceSchedule.map((maintenance) => (
                  <div key={maintenance.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{maintenance.title}</h3>
                      {getStatusBadge(maintenance.status)}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      <span className="font-medium">Component:</span> {maintenance.component}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      <span className="font-medium">Scheduled:</span> {maintenance.scheduled}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      <span className="font-medium">Duration:</span> {maintenance.duration}
                    </div>
                    <p className="text-sm mt-2">{maintenance.description}</p>
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-md text-xs text-blue-800">
                      <span className="font-medium">Expected Impact:</span> {maintenance.impact}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>System Metrics</CardTitle>
                  <CardDescription>Performance metrics for the last 24 hours</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Metrics
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">API Response Time (ms)</h3>
                  <div className="h-[200px] bg-gray-50 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">API response time chart will be displayed here</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Database Query Time (ms)</h3>
                  <div className="h-[200px] bg-gray-50 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Database query time chart will be displayed here</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Error Rate (%)</h3>
                  <div className="h-[200px] bg-gray-50 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Error rate chart will be displayed here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}
