"use client"

import { useState } from "react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  BarChart3,
  LineChart,
  PieChart,
  CalendarIcon,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Download,
  Plus,
  Users,
  Scissors,
  Star,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Settings,
  Check,
} from "lucide-react"
import { PerformanceChart } from "@/components/business/analytics/performance-chart"
import { CustomerChart } from "@/components/business/analytics/customer-chart"
import { RevenueChart } from "@/components/business/analytics/revenue-chart"
// Add the import for InteractionLogs
import { InteractionLogs } from "@/components/business/analytics/interaction-logs"

export default function BusinessAnalyticsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = useState("overview")
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState(false)
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false)
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date | undefined
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  return (
    <BusinessDashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Select date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange(range as { from: Date; to: Date | undefined })
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹42,500</div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+12%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">Compared to last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">156</div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+8%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">Compared to last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">28</div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+15%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">Compared to last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4.8/5</div>
              <div className="flex items-center text-red-500 text-sm">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>-0.2</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">Compared to last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Track your business performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Services</CardTitle>
                <CardDescription>Most popular services by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Scissors className="h-8 w-8 p-1.5 bg-rose-100 text-rose-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Haircut & Styling</p>
                        <p className="text-sm text-gray-500">42 appointments</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹12,600</p>
                      <p className="text-sm text-green-500">+8%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Scissors className="h-8 w-8 p-1.5 bg-rose-100 text-rose-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Hair Coloring</p>
                        <p className="text-sm text-gray-500">28 appointments</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹9,800</p>
                      <p className="text-sm text-green-500">+12%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Scissors className="h-8 w-8 p-1.5 bg-rose-100 text-rose-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Facial & Skincare</p>
                        <p className="text-sm text-gray-500">22 appointments</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹7,700</p>
                      <p className="text-sm text-red-500">-3%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Staff</CardTitle>
                <CardDescription>Best performing staff members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 p-1.5 bg-rose-100 text-rose-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Rajesh Kumar</p>
                        <p className="text-sm text-gray-500">38 appointments</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹11,400</p>
                      <p className="text-sm text-green-500">+15%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 p-1.5 bg-rose-100 text-rose-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Priya Sharma</p>
                        <p className="text-sm text-gray-500">32 appointments</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹9,600</p>
                      <p className="text-sm text-green-500">+10%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 p-1.5 bg-rose-100 text-rose-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Amit Patel</p>
                        <p className="text-sm text-gray-500">28 appointments</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹8,400</p>
                      <p className="text-sm text-red-500">-2%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Add the InteractionLogs component to the "overview" tab content, after the existing grid of cards */}
          <InteractionLogs />
        </TabsContent>

        <TabsContent value="revenue" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Track your revenue trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Service</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[200px] flex items-center justify-center">
                  <PieChart className="h-32 w-32 text-gray-300" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Staff</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[200px] flex items-center justify-center">
                  <PieChart className="h-32 w-32 text-gray-300" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Location</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[200px] flex items-center justify-center">
                  <PieChart className="h-32 w-32 text-gray-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>Track your customer acquisition and retention</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>Age and gender distribution</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[200px] flex items-center justify-center">
                  <BarChart3 className="h-32 w-32 text-gray-300" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>Repeat customer rate</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[200px] flex items-center justify-center">
                  <LineChart className="h-32 w-32 text-gray-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>Track your service popularity and revenue</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full h-[300px] flex items-center justify-center">
                <BarChart3 className="h-32 w-32 text-gray-300" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Ratings</CardTitle>
                <CardDescription>Average ratings by service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Haircut & Styling</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-2 text-sm font-medium">5.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Hair Coloring</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 text-gray-300" />
                      <span className="ml-2 text-sm font-medium">4.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Facial & Skincare</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-2 text-sm font-medium">4.8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Service Trends</CardTitle>
                <CardDescription>Booking trends by service</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[200px] flex items-center justify-center">
                  <TrendingUp className="h-32 w-32 text-gray-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Integration</CardTitle>
                <CardDescription>Connect and share content on social platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Facebook className="h-8 w-8 p-1.5 bg-blue-100 text-blue-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Facebook</p>
                        <p className="text-sm text-gray-500">Share updates and promotions</p>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Instagram className="h-8 w-8 p-1.5 bg-pink-100 text-pink-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-gray-500">Share photos and stories</p>
                      </div>
                    </div>
                    <Switch checked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Twitter className="h-8 w-8 p-1.5 bg-blue-100 text-blue-400 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Twitter</p>
                        <p className="text-sm text-gray-500">Share quick updates</p>
                      </div>
                    </div>
                    <Switch checked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Linkedin className="h-8 w-8 p-1.5 bg-blue-100 text-blue-700 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <p className="text-sm text-gray-500">Share professional updates</p>
                      </div>
                    </div>
                    <Switch checked={false} />
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={() => setIsSocialDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Connect More Platforms
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar Integration</CardTitle>
                <CardDescription>Sync your appointments with external calendars</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarDays className="h-8 w-8 p-1.5 bg-blue-100 text-blue-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Google Calendar</p>
                        <p className="text-sm text-gray-500">Sync appointments automatically</p>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarDays className="h-8 w-8 p-1.5 bg-blue-100 text-blue-800 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Outlook Calendar</p>
                        <p className="text-sm text-gray-500">Sync with Microsoft Outlook</p>
                      </div>
                    </div>
                    <Switch checked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarDays className="h-8 w-8 p-1.5 bg-teal-100 text-teal-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Calendly</p>
                        <p className="text-sm text-gray-500">Enable online scheduling</p>
                      </div>
                    </div>
                    <Switch checked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarDays className="h-8 w-8 p-1.5 bg-orange-100 text-orange-600 rounded-md mr-3" />
                      <div>
                        <p className="font-medium">Indian Calendar</p>
                        <p className="text-sm text-gray-500">Sync with Hindu/Indian calendar</p>
                      </div>
                    </div>
                    <Switch checked={false} />
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={() => setIsCalendarDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Connect More Calendars
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Configure your integration preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-share promotions</p>
                    <p className="text-sm text-gray-500">Automatically share new promotions on social media</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-sync appointments</p>
                    <p className="text-sm text-gray-500">Automatically sync appointments with connected calendars</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Send reminders</p>
                    <p className="text-sm text-gray-500">Send appointment reminders via connected platforms</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Share reviews</p>
                    <p className="text-sm text-gray-500">Automatically share positive reviews on social media</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Advanced Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Calendar Integration Dialog */}
      <Dialog open={isCalendarDialogOpen} onOpenChange={setIsCalendarDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Connect Calendar</DialogTitle>
            <DialogDescription>Connect your external calendar to sync appointments automatically.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="calendar-type">Calendar Type</Label>
              <Select defaultValue="google">
                <SelectTrigger id="calendar-type">
                  <SelectValue placeholder="Select calendar type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Calendar</SelectItem>
                  <SelectItem value="outlook">Outlook Calendar</SelectItem>
                  <SelectItem value="calendly">Calendly</SelectItem>
                  <SelectItem value="indian">Indian Calendar</SelectItem>
                  <SelectItem value="apple">Apple Calendar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendar-email">Email Address</Label>
              <Input id="calendar-email" placeholder="your-email@example.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="sync-settings">Sync Settings</Label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="sync-two-way" />
                  <Label htmlFor="sync-two-way">Two-way sync (recommended)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sync-appointments" defaultChecked />
                  <Label htmlFor="sync-appointments">Sync appointments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sync-reminders" defaultChecked />
                  <Label htmlFor="sync-reminders">Sync reminders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sync-staff" />
                  <Label htmlFor="sync-staff">Sync staff availability</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCalendarDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-rose-600 hover:bg-rose-700">
              <Check className="h-4 w-4 mr-2" />
              Connect Calendar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Social Media Integration Dialog */}
      <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Connect Social Media</DialogTitle>
            <DialogDescription>
              Connect your social media accounts to share content and engage with customers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="platform-type">Platform</Label>
              <Select defaultValue="instagram">
                <SelectTrigger id="platform-type">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="pinterest">Pinterest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-email">Account Email/Username</Label>
              <Input id="account-email" placeholder="your-email@example.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="sharing-settings">Sharing Settings</Label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="share-promotions" defaultChecked />
                  <Label htmlFor="share-promotions">Share promotions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="share-reviews" defaultChecked />
                  <Label htmlFor="share-reviews">Share positive reviews</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="share-updates" defaultChecked />
                  <Label htmlFor="share-updates">Share business updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-respond" />
                  <Label htmlFor="auto-respond">Auto-respond to messages</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSocialDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-rose-600 hover:bg-rose-700">
              <Check className="h-4 w-4 mr-2" />
              Connect Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BusinessDashboardLayout>
  )
}
