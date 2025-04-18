"use client"

import AdminShell from "@/components/admin/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HelpCircle, Book, FileText, MessageSquare, Send } from "lucide-react"

export default function SupportPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find answers to common questions about the admin panel</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I add a new admin user?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        To add a new admin user, navigate to the User Management section from the sidebar. Click on the
                        "Add Admin User" button in the top right corner. Fill in the required details including name,
                        email, role, and temporary password. The new user will receive an email with instructions to set
                        up their account.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I approve or reject a business registration?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        To approve or reject a business registration, go to the Businesses section and look for
                        businesses with a "Pending" status. Click on "View Details" to review their information. After
                        reviewing, you can click either "Approve" or "Reject" button. If rejecting, you'll be prompted
                        to provide a reason that will be sent to the business owner.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I manage flagged reviews?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        To manage flagged reviews, go to the Reviews section and filter by "Flagged" status. Review the
                        content to determine if it violates platform policies. You can then choose to publish the review
                        if it's appropriate, or delete it if it violates guidelines. You can also contact the reviewer
                        for clarification if needed.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I export analytics data?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        To export analytics data, navigate to the Analytics section. Use the date range selector to
                        specify the period you're interested in. Click on the "Export Reports" button in the top right
                        corner. You can choose to export in CSV, Excel, or PDF format. The export will include all data
                        visible in the current view.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I update platform settings?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">
                        To update platform settings, go to the Settings section from the sidebar. You'll find tabs for
                        General, Notifications, and Security settings. Make your desired changes in the appropriate
                        section and click the "Save Changes" button at the bottom of each section. Changes will take
                        effect immediately.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2 h-5 w-5" />
                  Documentation
                </CardTitle>
                <CardDescription>Comprehensive guides for using the admin panel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Getting Started Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500 mb-4">
                        Learn the basics of navigating and using the Trimly admin panel.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">User Management</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500 mb-4">
                        Learn how to manage admin users, roles, and permissions.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Business Management</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500 mb-4">
                        Learn how to manage businesses, verify accounts, and handle disputes.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Analytics & Reporting</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500 mb-4">
                        Learn how to interpret analytics data and generate custom reports.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Support
                </CardTitle>
                <CardDescription>Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Enter the subject of your inquiry" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <select
                      id="category"
                      className="w-full border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select a category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account Management</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Describe your issue or question in detail" rows={5} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="attachment" className="text-sm font-medium">
                      Attachment (optional)
                    </label>
                    <Input id="attachment" type="file" />
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Ticket
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2 h-5 w-5" />
                  Resources
                </CardTitle>
                <CardDescription>Additional resources to help you manage the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Admin Training Videos</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500 mb-4">
                        Watch video tutorials on how to use various features of the admin panel.
                      </p>
                      <Button variant="outline" className="w-full">
                        View Videos
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Best Practices Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500 mb-4">
                        Learn best practices for managing the Trimly platform effectively.
                      </p>
                      <Button variant="outline" className="w-full">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Policy Templates</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500 mb-4">
                        Access templates for common policies and communications.
                      </p>
                      <Button variant="outline" className="w-full">
                        View Templates
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Admin Community</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500 mb-4">
                        Connect with other Trimly administrators to share knowledge and tips.
                      </p>
                      <Button variant="outline" className="w-full">
                        Join Community
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminShell>
  )
}
