"use client"

import { useState } from "react"
import { Save, User, Building, Clock, CreditCard, Bell, Shield } from "lucide-react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  // Business profile state
  const [businessProfile, setBusinessProfile] = useState({
    name: "Royal Gents Salon",
    description:
      "Premium men's salon offering haircuts, beard trims, facials, and more. We pride ourselves on quality service and customer satisfaction.",
    phone: "+91 98765 43210",
    email: "contact@royalgentssalon.com",
    website: "www.royalgentssalon.com",
    address: "123 Main Street, Kothrud, Pune, Maharashtra 411038",
  })

  // Business hours state
  const [businessHours, setBusinessHours] = useState({
    monday: { open: "09:00", close: "20:00", closed: false },
    tuesday: { open: "09:00", close: "20:00", closed: false },
    wednesday: { open: "09:00", close: "20:00", closed: false },
    thursday: { open: "09:00", close: "20:00", closed: false },
    friday: { open: "09:00", close: "21:00", closed: false },
    saturday: { open: "09:00", close: "21:00", closed: false },
    sunday: { open: "10:00", close: "18:00", closed: false },
  })

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    newBooking: true,
    bookingCancellation: true,
    bookingReminder: true,
    reviewNotification: true,
    marketingEmails: false,
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: false,
  })

  // Payment settings state
  const [paymentSettings, setPaymentSettings] = useState({
    acceptOnlinePayments: true,
    acceptCashPayments: true,
    requireDeposit: false,
    depositAmount: "200",
    currency: "INR",
    taxRate: "18",
  })

  // Handle business profile update
  const handleProfileUpdate = () => {
    console.log("Updating business profile:", businessProfile)
    // In a real app, this would update the profile in the database
  }

  // Handle business hours update
  const handleHoursUpdate = () => {
    console.log("Updating business hours:", businessHours)
    // In a real app, this would update the hours in the database
  }

  // Handle notification settings update
  const handleNotificationSettingsUpdate = () => {
    console.log("Updating notification settings:", notificationSettings)
    // In a real app, this would update the notification settings in the database
  }

  // Handle payment settings update
  const handlePaymentSettingsUpdate = () => {
    console.log("Updating payment settings:", paymentSettings)
    // In a real app, this would update the payment settings in the database
  }

  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your business settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden md:inline">Business Profile</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden md:inline">Business Hours</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
              <CardDescription>Manage your business information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?key=jivnj" alt="Business Logo" />
                    <AvatarFallback>RGS</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="mt-2">
                    Change Logo
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input
                        id="business-name"
                        value={businessProfile.name}
                        onChange={(e) => setBusinessProfile({ ...businessProfile, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-phone">Phone Number</Label>
                      <Input
                        id="business-phone"
                        value={businessProfile.phone}
                        onChange={(e) => setBusinessProfile({ ...businessProfile, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-email">Email</Label>
                      <Input
                        id="business-email"
                        value={businessProfile.email}
                        onChange={(e) => setBusinessProfile({ ...businessProfile, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-website">Website</Label>
                      <Input
                        id="business-website"
                        value={businessProfile.website}
                        onChange={(e) => setBusinessProfile({ ...businessProfile, website: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-address">Address</Label>
                    <Input
                      id="business-address"
                      value={businessProfile.address}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-description">Description</Label>
                    <Textarea
                      id="business-description"
                      value={businessProfile.description}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProfileUpdate} className="bg-rose-600 hover:bg-rose-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-name">Account Owner</Label>
                <Input id="account-name" value="Rajesh Patel" disabled />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account-email">Email Address</Label>
                  <Input id="account-email" value="rajesh.patel@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-phone">Phone Number</Label>
                  <Input id="account-phone" value="+91 98765 43210" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-rose-600 hover:bg-rose-700">
                <Save className="h-4 w-4 mr-2" />
                Update Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your regular business hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(businessHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-24 font-medium capitalize">{day}</div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={!hours.closed}
                        onCheckedChange={(checked) =>
                          setBusinessHours({
                            ...businessHours,
                            [day]: { ...hours, closed: !checked },
                          })
                        }
                      />
                      <span className="text-sm">{hours.closed ? "Closed" : "Open"}</span>
                    </div>
                    {!hours.closed && (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) =>
                            setBusinessHours({
                              ...businessHours,
                              [day]: { ...hours, open: e.target.value },
                            })
                          }
                          className="w-32"
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) =>
                            setBusinessHours({
                              ...businessHours,
                              [day]: { ...hours, close: e.target.value },
                            })
                          }
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleHoursUpdate} className="bg-rose-600 hover:bg-rose-700">
                <Save className="h-4 w-4 mr-2" />
                Save Hours
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure how you accept payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Accept Online Payments</h3>
                    <p className="text-sm text-gray-500">Allow customers to pay online when booking</p>
                  </div>
                  <Switch
                    checked={paymentSettings.acceptOnlinePayments}
                    onCheckedChange={(checked) =>
                      setPaymentSettings({ ...paymentSettings, acceptOnlinePayments: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Accept Cash Payments</h3>
                    <p className="text-sm text-gray-500">Allow customers to pay in cash at the salon</p>
                  </div>
                  <Switch
                    checked={paymentSettings.acceptCashPayments}
                    onCheckedChange={(checked) =>
                      setPaymentSettings({ ...paymentSettings, acceptCashPayments: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Require Deposit</h3>
                    <p className="text-sm text-gray-500">Require a deposit for bookings</p>
                  </div>
                  <Switch
                    checked={paymentSettings.requireDeposit}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, requireDeposit: checked })}
                  />
                </div>
                {paymentSettings.requireDeposit && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deposit-amount">Deposit Amount (₹)</Label>
                      <Input
                        id="deposit-amount"
                        type="number"
                        value={paymentSettings.depositAmount}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, depositAmount: e.target.value })}
                      />
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={paymentSettings.currency}
                      onValueChange={(value) => setPaymentSettings({ ...paymentSettings, currency: value })}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                    <Input
                      id="tax-rate"
                      type="number"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, taxRate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePaymentSettingsUpdate} className="bg-rose-600 hover:bg-rose-700">
                <Save className="h-4 w-4 mr-2" />
                Save Payment Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">New Booking Notifications</h3>
                    <p className="text-sm text-gray-500">Get notified when a new booking is made</p>
                  </div>
                  <Switch
                    checked={notificationSettings.newBooking}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, newBooking: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Booking Cancellation Notifications</h3>
                    <p className="text-sm text-gray-500">Get notified when a booking is cancelled</p>
                  </div>
                  <Switch
                    checked={notificationSettings.bookingCancellation}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, bookingCancellation: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Booking Reminder Notifications</h3>
                    <p className="text-sm text-gray-500">Get reminded about upcoming bookings</p>
                  </div>
                  <Switch
                    checked={notificationSettings.bookingReminder}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, bookingReminder: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Review Notifications</h3>
                    <p className="text-sm text-gray-500">Get notified when a new review is posted</p>
                  </div>
                  <Switch
                    checked={notificationSettings.reviewNotification}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, reviewNotification: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                    }
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNotificationSettingsUpdate} className="bg-rose-600 hover:bg-rose-700">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Session Management</h3>
                    <p className="text-sm text-gray-500">Manage your active sessions</p>
                  </div>
                  <Button variant="outline">View Sessions</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Login History</h3>
                    <p className="text-sm text-gray-500">View your recent login activity</p>
                  </div>
                  <Button variant="outline">View History</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </BusinessDashboardLayout>
  )
}
