"use client"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useAdmin } from "@/components/admin/admin-context"

export default function SettingsPage() {
  const { setSuccessMessage } = useAdmin()
  const [activeTab, setActiveTab] = useState("general")

  // Mock settings data
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Trimly",
    siteDescription: "Platform for salons, parlours, and grooming studios",
    supportEmail: "support@trimly.com",
    contactPhone: "+91 98765 43210",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h",
  })

  const [emailSettings, setEmailSettings] = useState({
    fromName: "Trimly Support",
    fromEmail: "support@trimly.com",
    replyToEmail: "no-reply@trimly.com",
    smtpHost: "smtp.trimly.com",
    smtpPort: "587",
    smtpUsername: "smtp_user",
    smtpPassword: "••••••••••••",
    enableSsl: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enableSmsNotifications: true,
    enablePushNotifications: true,
    adminEmailNotifications: true,
    newUserNotification: true,
    newBusinessNotification: true,
    newBookingNotification: false,
    bookingCancellationNotification: true,
    systemAlertNotification: true,
  })

  const [integrationSettings, setIntegrationSettings] = useState({
    googleAnalyticsId: "UA-123456789-1",
    facebookPixelId: "987654321098765",
    googleMapsApiKey: "••••••••••••••••••••••••••••••••••••",
    enableSocialLogin: true,
    enableGoogleLogin: true,
    enableFacebookLogin: true,
    enableAppleLogin: false,
  })

  const handleSaveGeneralSettings = () => {
    // In a real app, this would save to the backend
    setSuccessMessage("General settings saved successfully")
  }

  const handleSaveEmailSettings = () => {
    // In a real app, this would save to the backend
    setSuccessMessage("Email settings saved successfully")
  }

  const handleSaveNotificationSettings = () => {
    // In a real app, this would save to the backend
    setSuccessMessage("Notification settings saved successfully")
  }

  const handleSaveIntegrationSettings = () => {
    // In a real app, this would save to the backend
    setSuccessMessage("Integration settings saved successfully")
  }

  return (
    <AdminShell requiredPermission="settings.view">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600">Configure system settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic configuration for your Trimly platform</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input
                      id="site-name"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-description">Site Description</Label>
                    <Input
                      id="site-description"
                      value={generalSettings.siteDescription}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input
                      id="support-email"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Contact Phone</Label>
                    <Input
                      id="contact-phone"
                      value={generalSettings.contactPhone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                      <option value="America/New_York">America/New_York (GMT-4:00)</option>
                      <option value="Europe/London">Europe/London (GMT+1:00)</option>
                      <option value="Australia/Sydney">Australia/Sydney (GMT+10:00)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <select
                      id="date-format"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={generalSettings.dateFormat}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-format">Time Format</Label>
                    <select
                      id="time-format"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={generalSettings.timeFormat}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, timeFormat: e.target.value })}
                    >
                      <option value="12h">12-hour (AM/PM)</option>
                      <option value="24h">24-hour</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveGeneralSettings} className="bg-purple-600 hover:bg-purple-700">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email sending settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="from-name">From Name</Label>
                    <Input
                      id="from-name"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email</Label>
                    <Input
                      id="from-email"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reply-to-email">Reply-To Email</Label>
                    <Input
                      id="reply-to-email"
                      type="email"
                      value={emailSettings.replyToEmail}
                      onChange={(e) => setEmailSettings({ ...emailSettings, replyToEmail: e.target.value })}
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-medium mb-4">SMTP Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input
                      id="smtp-host"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input
                      id="smtp-port"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input
                      id="smtp-username"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enable-ssl"
                        checked={emailSettings.enableSsl}
                        onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, enableSsl: checked })}
                      />
                      <Label htmlFor="enable-ssl">Enable SSL/TLS</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveEmailSettings} className="bg-purple-600 hover:bg-purple-700">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Customize email notification templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 hover:border-purple-300 cursor-pointer">
                    <h3 className="font-medium mb-1">Welcome Email</h3>
                    <p className="text-sm text-gray-500">Sent to new users upon registration</p>
                  </div>
                  <div className="border rounded-md p-4 hover:border-purple-300 cursor-pointer">
                    <h3 className="font-medium mb-1">Booking Confirmation</h3>
                    <p className="text-sm text-gray-500">Sent when a customer makes a booking</p>
                  </div>
                  <div className="border rounded-md p-4 hover:border-purple-300 cursor-pointer">
                    <h3 className="font-medium mb-1">Password Reset</h3>
                    <p className="text-sm text-gray-500">Sent when a user requests a password reset</p>
                  </div>
                  <div className="border rounded-md p-4 hover:border-purple-300 cursor-pointer">
                    <h3 className="font-medium mb-1">Booking Reminder</h3>
                    <p className="text-sm text-gray-500">Sent 24 hours before a scheduled booking</p>
                  </div>
                  <div className="border rounded-md p-4 hover:border-purple-300 cursor-pointer">
                    <h3 className="font-medium mb-1">Review Request</h3>
                    <p className="text-sm text-gray-500">Sent after a service is completed</p>
                  </div>
                  <div className="border rounded-md p-4 hover:border-purple-300 cursor-pointer">
                    <h3 className="font-medium mb-1">Coupon Notification</h3>
                    <p className="text-sm text-gray-500">Sent when a new coupon is available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how notifications are sent to users and administrators</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Send notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.enableEmailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, enableEmailNotifications: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Send notifications via SMS</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notificationSettings.enableSmsNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, enableSmsNotifications: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Send notifications via push notifications</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.enablePushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, enablePushNotifications: checked })
                      }
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-medium mb-4">Admin Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="admin-email-notifications">Admin Email Notifications</Label>
                      <p className="text-sm text-gray-500">Send important notifications to admin email</p>
                    </div>
                    <Switch
                      id="admin-email-notifications"
                      checked={notificationSettings.adminEmailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, adminEmailNotifications: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-user-notification">New User Registration</Label>
                      <p className="text-sm text-gray-500">Notify when a new user registers</p>
                    </div>
                    <Switch
                      id="new-user-notification"
                      checked={notificationSettings.newUserNotification}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, newUserNotification: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-business-notification">New Business Registration</Label>
                      <p className="text-sm text-gray-500">Notify when a new business registers</p>
                    </div>
                    <Switch
                      id="new-business-notification"
                      checked={notificationSettings.newBusinessNotification}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, newBusinessNotification: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-alert-notification">System Alerts</Label>
                      <p className="text-sm text-gray-500">Notify on system errors and critical issues</p>
                    </div>
                    <Switch
                      id="system-alert-notification"
                      checked={notificationSettings.systemAlertNotification}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, systemAlertNotification: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotificationSettings} className="bg-purple-600 hover:bg-purple-700">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Configure third-party service integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="google-analytics-id">Google Analytics ID</Label>
                    <Input
                      id="google-analytics-id"
                      value={integrationSettings.googleAnalyticsId}
                      onChange={(e) =>
                        setIntegrationSettings({ ...integrationSettings, googleAnalyticsId: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook-pixel-id">Facebook Pixel ID</Label>
                    <Input
                      id="facebook-pixel-id"
                      value={integrationSettings.facebookPixelId}
                      onChange={(e) =>
                        setIntegrationSettings({ ...integrationSettings, facebookPixelId: e.target.value })
                      }
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-medium mb-4">Maps & Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="google-maps-api-key">Google Maps API Key</Label>
                    <Input
                      id="google-maps-api-key"
                      type="password"
                      value={integrationSettings.googleMapsApiKey}
                      onChange={(e) =>
                        setIntegrationSettings({ ...integrationSettings, googleMapsApiKey: e.target.value })
                      }
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-medium mb-4">Social Login</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-social-login">Enable Social Login</Label>
                      <p className="text-sm text-gray-500">Allow users to sign in with social accounts</p>
                    </div>
                    <Switch
                      id="enable-social-login"
                      checked={integrationSettings.enableSocialLogin}
                      onCheckedChange={(checked) =>
                        setIntegrationSettings({ ...integrationSettings, enableSocialLogin: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-google-login">Google Login</Label>
                      <p className="text-sm text-gray-500">Allow users to sign in with Google</p>
                    </div>
                    <Switch
                      id="enable-google-login"
                      checked={integrationSettings.enableGoogleLogin}
                      disabled={!integrationSettings.enableSocialLogin}
                      onCheckedChange={(checked) =>
                        setIntegrationSettings({ ...integrationSettings, enableGoogleLogin: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-facebook-login">Facebook Login</Label>
                      <p className="text-sm text-gray-500">Allow users to sign in with Facebook</p>
                    </div>
                    <Switch
                      id="enable-facebook-login"
                      checked={integrationSettings.enableFacebookLogin}
                      disabled={!integrationSettings.enableSocialLogin}
                      onCheckedChange={(checked) =>
                        setIntegrationSettings({ ...integrationSettings, enableFacebookLogin: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-apple-login">Apple Login</Label>
                      <p className="text-sm text-gray-500">Allow users to sign in with Apple</p>
                    </div>
                    <Switch
                      id="enable-apple-login"
                      checked={integrationSettings.enableAppleLogin}
                      disabled={!integrationSettings.enableSocialLogin}
                      onCheckedChange={(checked) =>
                        setIntegrationSettings({ ...integrationSettings, enableAppleLogin: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveIntegrationSettings} className="bg-purple-600 hover:bg-purple-700">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and privacy settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Authentication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Require 2FA for admin users</p>
                    </div>
                    <Switch id="two-factor-auth" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="password-expiry">Password Expiry</Label>
                      <p className="text-sm text-gray-500">Force password reset after 90 days</p>
                    </div>
                    <Switch id="password-expiry" />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <select id="password-policy" className="w-full border border-gray-300 rounded-md p-2">
                      <option value="basic">Basic (min. 8 characters)</option>
                      <option value="medium">Medium (min. 8 chars, 1 uppercase, 1 number)</option>
                      <option value="strong">Strong (min. 10 chars, mixed case, numbers, symbols)</option>
                    </select>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-medium mb-4">Session Management</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue={30} min={5} max={240} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="force-logout">Force Logout on Password Change</Label>
                      <p className="text-sm text-gray-500">Log users out when they change their password</p>
                    </div>
                    <Switch id="force-logout" defaultChecked />
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-medium mb-4">Privacy</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="privacy-policy">Privacy Policy</Label>
                    <Textarea id="privacy-policy" rows={5} placeholder="Enter your privacy policy text here..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                    <Input id="data-retention" type="number" defaultValue={365} min={30} />
                    <p className="text-xs text-gray-500">
                      User data will be automatically deleted after this many days of inactivity
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}
