"use client"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Download, Filter, RefreshCw, Search } from "lucide-react"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("bookings")
  const [dateRange, setDateRange] = useState("last30days")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <AdminShell requiredPermission="reports.view">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search reports..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 self-end">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <Button variant="ghost" size="icon" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full max-w-4xl">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="ads">Ads</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Reports</CardTitle>
                <CardDescription>Detailed reports on booking activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Total Bookings</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>Cancelled</TableHead>
                        <TableHead>No-Shows</TableHead>
                        <TableHead>Avg. Duration</TableHead>
                        <TableHead>Avg. Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          date: "2023-08-15",
                          total: 245,
                          completed: 220,
                          cancelled: 15,
                          noShows: 10,
                          avgDuration: "45 min",
                          avgValue: "₹950",
                        },
                        {
                          date: "2023-08-14",
                          total: 230,
                          completed: 210,
                          cancelled: 12,
                          noShows: 8,
                          avgDuration: "48 min",
                          avgValue: "₹980",
                        },
                        {
                          date: "2023-08-13",
                          total: 210,
                          completed: 195,
                          cancelled: 10,
                          noShows: 5,
                          avgDuration: "42 min",
                          avgValue: "₹920",
                        },
                        {
                          date: "2023-08-12",
                          total: 225,
                          completed: 205,
                          cancelled: 14,
                          noShows: 6,
                          avgDuration: "46 min",
                          avgValue: "₹940",
                        },
                        {
                          date: "2023-08-11",
                          total: 240,
                          completed: 215,
                          cancelled: 18,
                          noShows: 7,
                          avgDuration: "44 min",
                          avgValue: "₹930",
                        },
                      ].map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.total}</TableCell>
                          <TableCell className="text-green-600">{row.completed}</TableCell>
                          <TableCell className="text-amber-600">{row.cancelled}</TableCell>
                          <TableCell className="text-red-600">{row.noShows}</TableCell>
                          <TableCell>{row.avgDuration}</TableCell>
                          <TableCell>{row.avgValue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Reports</CardTitle>
                <CardDescription>Detailed reports on revenue and financial metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Gross Revenue</TableHead>
                        <TableHead>Platform Fee</TableHead>
                        <TableHead>Net Revenue</TableHead>
                        <TableHead>Transactions</TableHead>
                        <TableHead>Avg. Transaction</TableHead>
                        <TableHead>Growth</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          date: "2023-08-15",
                          gross: "₹2,32,750",
                          fee: "₹23,275",
                          net: "₹2,09,475",
                          transactions: 245,
                          avgTransaction: "₹950",
                          growth: "+3.2%",
                        },
                        {
                          date: "2023-08-14",
                          gross: "₹2,25,400",
                          fee: "₹22,540",
                          net: "₹2,02,860",
                          transactions: 230,
                          avgTransaction: "₹980",
                          growth: "+2.8%",
                        },
                        {
                          date: "2023-08-13",
                          gross: "₹1,93,200",
                          fee: "₹19,320",
                          net: "₹1,73,880",
                          transactions: 210,
                          avgTransaction: "₹920",
                          growth: "-1.5%",
                        },
                        {
                          date: "2023-08-12",
                          gross: "₹2,11,500",
                          fee: "₹21,150",
                          net: "₹1,90,350",
                          transactions: 225,
                          avgTransaction: "₹940",
                          growth: "+1.2%",
                        },
                        {
                          date: "2023-08-11",
                          gross: "₹2,23,200",
                          fee: "₹22,320",
                          net: "₹2,00,880",
                          transactions: 240,
                          avgTransaction: "₹930",
                          growth: "+4.5%",
                        },
                      ].map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.gross}</TableCell>
                          <TableCell>{row.fee}</TableCell>
                          <TableCell>{row.net}</TableCell>
                          <TableCell>{row.transactions}</TableCell>
                          <TableCell>{row.avgTransaction}</TableCell>
                          <TableCell className={row.growth.startsWith("+") ? "text-green-600" : "text-red-600"}>
                            {row.growth}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Reports</CardTitle>
                <CardDescription>Detailed reports on user activity and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>New Users</TableHead>
                        <TableHead>Active Users</TableHead>
                        <TableHead>Customers</TableHead>
                        <TableHead>Business Owners</TableHead>
                        <TableHead>Advertisers</TableHead>
                        <TableHead>Retention</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          date: "2023-08-15",
                          newUsers: 125,
                          activeUsers: 3240,
                          customers: 2850,
                          businessOwners: 320,
                          advertisers: 70,
                          retention: "78%",
                        },
                        {
                          date: "2023-08-14",
                          newUsers: 118,
                          activeUsers: 3180,
                          customers: 2790,
                          businessOwners: 315,
                          advertisers: 75,
                          retention: "77%",
                        },
                        {
                          date: "2023-08-13",
                          newUsers: 105,
                          activeUsers: 3120,
                          customers: 2740,
                          businessOwners: 310,
                          advertisers: 70,
                          retention: "76%",
                        },
                        {
                          date: "2023-08-12",
                          newUsers: 130,
                          activeUsers: 3080,
                          customers: 2700,
                          businessOwners: 305,
                          advertisers: 75,
                          retention: "75%",
                        },
                        {
                          date: "2023-08-11",
                          newUsers: 122,
                          activeUsers: 3020,
                          customers: 2650,
                          businessOwners: 300,
                          advertisers: 70,
                          retention: "74%",
                        },
                      ].map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.newUsers}</TableCell>
                          <TableCell>{row.activeUsers}</TableCell>
                          <TableCell>{row.customers}</TableCell>
                          <TableCell>{row.businessOwners}</TableCell>
                          <TableCell>{row.advertisers}</TableCell>
                          <TableCell>{row.retention}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Reports</CardTitle>
                <CardDescription>Detailed reports on service performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Avg. Price</TableHead>
                        <TableHead>Businesses</TableHead>
                        <TableHead>Growth</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          service: "Haircut & Styling",
                          category: "Hair",
                          bookings: 850,
                          revenue: "₹6,80,000",
                          avgPrice: "₹800",
                          businesses: 120,
                          growth: "+12%",
                        },
                        {
                          service: "Facial Treatment",
                          category: "Skin",
                          bookings: 720,
                          revenue: "₹8,64,000",
                          avgPrice: "₹1,200",
                          businesses: 95,
                          growth: "+8%",
                        },
                        {
                          service: "Full Body Massage",
                          category: "Massage",
                          bookings: 650,
                          revenue: "₹9,75,000",
                          avgPrice: "₹1,500",
                          businesses: 80,
                          growth: "+15%",
                        },
                        {
                          service: "Manicure & Pedicure",
                          category: "Nails",
                          bookings: 580,
                          revenue: "₹3,48,000",
                          avgPrice: "₹600",
                          businesses: 110,
                          growth: "+5%",
                        },
                        {
                          service: "Hair Coloring",
                          category: "Hair",
                          bookings: 520,
                          revenue: "₹9,36,000",
                          avgPrice: "₹1,800",
                          businesses: 90,
                          growth: "+10%",
                        },
                      ].map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.service}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>{row.bookings}</TableCell>
                          <TableCell>{row.revenue}</TableCell>
                          <TableCell>{row.avgPrice}</TableCell>
                          <TableCell>{row.businesses}</TableCell>
                          <TableCell className="text-green-600">{row.growth}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="businesses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Reports</CardTitle>
                <CardDescription>Detailed reports on business performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Customers</TableHead>
                        <TableHead>Avg. Rating</TableHead>
                        <TableHead>Growth</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          business: "Serene Beauty Space",
                          category: "Salon",
                          bookings: 450,
                          revenue: "₹2,25,000",
                          customers: 320,
                          rating: "4.8",
                          growth: "+15%",
                        },
                        {
                          business: "Urban Grooming Space",
                          category: "Barbershop",
                          bookings: 380,
                          revenue: "₹1,90,000",
                          customers: 280,
                          rating: "4.7",
                          growth: "+12%",
                        },
                        {
                          business: "Elegant Beauty",
                          category: "Salon",
                          bookings: 320,
                          revenue: "₹1,60,000",
                          customers: 240,
                          rating: "4.6",
                          growth: "+8%",
                        },
                        {
                          business: "Style Studio",
                          category: "Salon",
                          bookings: 290,
                          revenue: "₹1,45,000",
                          customers: 210,
                          rating: "4.5",
                          growth: "+10%",
                        },
                        {
                          business: "Glamour Salon",
                          category: "Salon",
                          bookings: 260,
                          revenue: "₹1,30,000",
                          customers: 190,
                          rating: "4.4",
                          growth: "+7%",
                        },
                      ].map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.business}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>{row.bookings}</TableCell>
                          <TableCell>{row.revenue}</TableCell>
                          <TableCell>{row.customers}</TableCell>
                          <TableCell>{row.rating}</TableCell>
                          <TableCell className="text-green-600">{row.growth}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ad Performance Reports</CardTitle>
                <CardDescription>Detailed reports on advertisement performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Total Impressions</p>
                    <p className="text-xl font-bold">1,234,567</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Total Clicks</p>
                    <p className="text-xl font-bold">87,654</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Average CTR</p>
                    <p className="text-xl font-bold">7.1%</p>
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ad Title</TableHead>
                        <TableHead>Business</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Impressions</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>CTR</TableHead>
                        <TableHead>Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          title: "Summer Special Discount",
                          business: "Urban Grooming Space",
                          duration: "7 days",
                          impressions: 12450,
                          clicks: 870,
                          ctr: "6.99%",
                          revenue: "₹999",
                        },
                        {
                          title: "Weekend Special",
                          business: "Elegant Beauty Space",
                          duration: "7 days",
                          impressions: 8760,
                          clicks: 540,
                          ctr: "6.16%",
                          revenue: "₹999",
                        },
                        {
                          title: "Premium Package Deal",
                          business: "Style Studio",
                          duration: "14 days",
                          impressions: 15600,
                          clicks: 980,
                          ctr: "6.28%",
                          revenue: "₹1,499",
                        },
                        {
                          title: "New Customer Offer",
                          business: "Serene Beauty Space",
                          duration: "30 days",
                          impressions: 32400,
                          clicks: 2160,
                          ctr: "6.67%",
                          revenue: "₹2,999",
                        },
                        {
                          title: "Flash Sale",
                          business: "Urban Chic Salon",
                          duration: "1 day",
                          impressions: 3200,
                          clicks: 240,
                          ctr: "7.50%",
                          revenue: "₹199",
                        },
                      ].map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{row.business}</TableCell>
                          <TableCell>{row.duration}</TableCell>
                          <TableCell>{row.impressions.toLocaleString()}</TableCell>
                          <TableCell>{row.clicks.toLocaleString()}</TableCell>
                          <TableCell>{row.ctr}</TableCell>
                          <TableCell>{row.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminShell>
  )
}
