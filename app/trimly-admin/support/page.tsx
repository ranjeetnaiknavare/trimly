"use client"

import { useState } from "react"
import AdminShell from "@/components/admin/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
  HelpCircle,
  MessageSquare,
  FileText,
} from "lucide-react"
import { useAdmin } from "@/components/admin/admin-context"

export default function SupportPage() {
  const { setSuccessMessage } = useAdmin()
  const [activeTab, setActiveTab] = useState("tickets")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [replyText, setReplyText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock support tickets data
  const tickets = [
    {
      id: "TKT-12345",
      subject: "Unable to process payment",
      customer: "Rahul Sharma",
      customerEmail: "rahul.sharma@example.com",
      status: "open",
      priority: "high",
      category: "Payment",
      createdAt: "2023-08-15 10:30:00",
      lastUpdated: "2023-08-15 14:45:00",
      messages: [
        {
          id: "MSG-1",
          from: "customer",
          name: "Rahul Sharma",
          message:
            "I'm trying to make a payment for my booking but keep getting an error message saying 'Transaction Failed'. I've tried multiple cards but none of them work. Please help!",
          timestamp: "2023-08-15 10:30:00",
        },
        {
          id: "MSG-2",
          from: "agent",
          name: "Support Agent",
          message:
            "Hello Rahul, I'm sorry to hear you're having trouble with payments. Could you please provide more details about the error message? Also, have you verified that your card is not blocked for online transactions?",
          timestamp: "2023-08-15 14:45:00",
        },
      ],
    },
    {
      id: "TKT-12346",
      subject: "How to cancel a booking?",
      customer: "Priya Patel",
      customerEmail: "priya.patel@example.com",
      status: "closed",
      priority: "medium",
      category: "Bookings",
      createdAt: "2023-08-14 15:20:00",
      lastUpdated: "2023-08-14 16:30:00",
      messages: [
        {
          id: "MSG-1",
          from: "customer",
          name: "Priya Patel",
          message: "I need to cancel my booking for tomorrow. How can I do that?",
          timestamp: "2023-08-14 15:20:00",
        },
        {
          id: "MSG-2",
          from: "agent",
          name: "Support Agent",
          message:
            "Hello Priya, you can cancel your booking by going to the 'My Bookings' section in your account, finding the booking you want to cancel, and clicking on the 'Cancel' button. Please note that cancellations made less than 24 hours before the appointment may incur a cancellation fee as per our policy.",
          timestamp: "2023-08-14 16:00:00",
        },
        {
          id: "MSG-3",
          from: "customer",
          name: "Priya Patel",
          message: "Thank you! I was able to cancel my booking successfully.",
          timestamp: "2023-08-14 16:15:00",
        },
        {
          id: "MSG-4",
          from: "agent",
          name: "Support Agent",
          message:
            "You're welcome, Priya! I'm glad you were able to cancel your booking. If you have any other questions or need further assistance, please don't hesitate to reach out to us.",
          timestamp: "2023-08-14 16:30:00",
        },
      ],
    },
    {
      id: "TKT-12347",
      subject: "Business verification pending for too long",
      customer: "Amit Kumar",
      customerEmail: "amit.kumar@example.com",
      status: "pending",
      priority: "high",
      category: "Business",
      createdAt: "2023-08-13 09:15:00",
      lastUpdated: "2023-08-13 11:30:00",
      messages: [
        {
          id: "MSG-1",
          from: "customer",
          name: "Amit Kumar",
          message:
            "I submitted my business for verification 5 days ago but it's still showing as pending. This is affecting my business as I cannot accept bookings. Please expedite the process.",
          timestamp: "2023-08-13 09:15:00",
        },
        {
          id: "MSG-2",
          from: "agent",
          name: "Support Agent",
          message:
            "Hello Amit, I apologize for the delay in verifying your business. I've checked your application and it seems there was a backlog in our verification process. I've escalated your case to our verification team and they will process it within 24 hours. Thank you for your patience.",
          timestamp: "2023-08-13 11:30:00",
        },
      ],
    },
    {
      id: "TKT-12348",
      subject: "App crashing on Android",
      customer: "Sneha Gupta",
      customerEmail: "sneha.gupta@example.com",
      status: "open",
      priority: "medium",
      category: "Technical",
      createdAt: "2023-08-12 14:00:00",
      lastUpdated: "2023-08-12 15:45:00",
      messages: [
        {
          id: "MSG-1",
          from: "customer",
          name: "Sneha Gupta",
          message:
            "The app keeps crashing on my Android phone whenever I try to book a service. I'm using a Samsung Galaxy S21 with the latest Android version.",
          timestamp: "2023-08-12 14:00:00",
        },
        {
          id: "MSG-2",
          from: "agent",
          name: "Support Agent",
          message:
            "Hello Sneha, I'm sorry to hear about the app crashing. Could you please try the following troubleshooting steps?\n\n1. Force close the app\n2. Clear the app cache\n3. Restart your device\n4. Update the app to the latest version\n\nIf the issue persists, please let us know and we'll investigate further.",
          timestamp: "2023-08-12 15:45:00",
        },
      ],
    },
    {
      id: "TKT-12349",
      subject: "Refund not received",
      customer: "Vikram Singh",
      customerEmail: "vikram.singh@example.com",
      status: "open",
      priority: "high",
      category: "Payment",
      createdAt: "2023-08-11 16:30:00",
      lastUpdated: "2023-08-11 17:15:00",
      messages: [
        {
          id: "MSG-1",
          from: "customer",
          name: "Vikram Singh",
          message:
            "I cancelled my booking 5 days ago and was told I would receive a refund within 3-5 business days. It's been 5 days now and I still haven't received my refund. The booking ID is BK-98765.",
          timestamp: "2023-08-11 16:30:00",
        },
        {
          id: "MSG-2",
          from: "agent",
          name: "Support Agent",
          message:
            "Hello Vikram, I apologize for the delay in processing your refund. I've checked your booking and can confirm that the refund was initiated on our end. However, it may take a few more days for the amount to reflect in your account depending on your bank's processing time. If you don't receive the refund by the end of this week, please let us know and we'll follow up with our payment processor.",
          timestamp: "2023-08-11 17:15:00",
        },
      ],
    },
  ]

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSelectTicket = (ticket: any) => {
    setSelectedTicket(ticket)
  }

  const handleReplySubmit = () => {
    if (!replyText.trim()) return

    // In a real app, this would send the reply to the backend
    setSuccessMessage("Reply sent successfully")
    setReplyText("")
    // Close the ticket view in mobile view
    if (window.innerWidth < 768) {
      setSelectedTicket(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Open
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        )
      case "closed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Closed
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <HelpCircle className="h-3.5 w-3.5 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Unknown</Badge>
    }
  }

  return (
    <AdminShell>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Support</h1>
          <p className="text-gray-600">Manage customer support tickets and inquiries</p>
        </div>
      </div>

      <Tabs defaultValue="tickets" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className={`w-full ${selectedTicket ? "md:w-1/3" : "md:w-full"}`}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Support Tickets</CardTitle>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      New Ticket
                    </Button>
                  </div>
                  <CardDescription>Manage and respond to customer support tickets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search tickets..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Filter className="text-gray-400 h-4 w-4" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="all">All Status</option>
                          <option value="open">Open</option>
                          <option value="pending">Pending</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {filteredTickets.length > 0 ? (
                        filteredTickets.map((ticket) => (
                          <div
                            key={ticket.id}
                            className={`border rounded-md p-4 cursor-pointer hover:border-purple-300 transition-colors ${
                              selectedTicket?.id === ticket.id ? "border-purple-500 bg-purple-50" : ""
                            }`}
                            onClick={() => handleSelectTicket(ticket)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-sm text-gray-500">{ticket.id}</span>
                              {getStatusBadge(ticket.status)}
                            </div>
                            <h3 className="font-medium mb-1">{ticket.subject}</h3>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <span>{ticket.customer}</span>
                              <span className="mx-2">•</span>
                              <span>{ticket.category}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span>Updated: {ticket.lastUpdated}</span>
                              {getPriorityBadge(ticket.priority)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium">No tickets found</h3>
                          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {selectedTicket && (
              <div className="w-full md:w-2/3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle>{selectedTicket.subject}</CardTitle>
                          {getStatusBadge(selectedTicket.status)}
                        </div>
                        <CardDescription>
                          {selectedTicket.id} • {selectedTicket.category} • {getPriorityBadge(selectedTicket.priority)}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Assign
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={
                            selectedTicket.status === "closed"
                              ? "text-blue-600 border-blue-200 hover:bg-blue-50"
                              : "text-green-600 border-green-200 hover:bg-green-50"
                          }
                        >
                          {selectedTicket.status === "closed" ? "Reopen" : "Close"}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium">Customer:</span> {selectedTicket.customer} (
                          {selectedTicket.customerEmail})
                        </div>
                        <div>
                          <span className="font-medium">Created:</span> {selectedTicket.createdAt}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-6">
                        {selectedTicket.messages.map((message: any) => (
                          <div key={message.id} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${message.name}`}
                                  alt={message.name}
                                />
                                <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{message.name}</div>
                                <div className="text-xs text-gray-500">{message.timestamp}</div>
                              </div>
                            </div>
                            <div className="pl-10 whitespace-pre-line">{message.message}</div>
                          </div>
                        ))}
                      </div>

                      {selectedTicket.status !== "closed" && (
                        <div className="space-y-4">
                          <Separator />
                          <div>
                            <Textarea
                              placeholder="Type your reply here..."
                              rows={4}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Add Template
                              </Button>
                              <Button variant="outline" size="sm">
                                Attach File
                              </Button>
                            </div>
                            <Button
                              onClick={handleReplySubmit}
                              disabled={!replyText.trim()}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Frequently Asked Questions</CardTitle>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Add FAQ
                </Button>
              </div>
              <CardDescription>Manage frequently asked questions for customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search FAQs..." className="pl-10" />
                </div>

                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">How do I cancel a booking?</h3>
                      <Badge>Customer</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">
                      To cancel a booking, go to the 'My Bookings' section in your account, find the booking you want to
                      cancel, and click on the 'Cancel' button. Please note that cancellations made less than 24 hours
                      before the appointment may incur a cancellation fee as per our policy.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">How do I reset my password?</h3>
                      <Badge>Customer</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">
                      To reset your password, click on the 'Forgot Password' link on the login page. Enter your
                      registered email address and we'll send you a link to reset your password. Follow the instructions
                      in the email to create a new password.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">How do I verify my business?</h3>
                      <Badge>Business</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">
                      To verify your business, go to the 'Business Settings' section in your account and click on the
                      'Verify Business' button. You'll need to provide some documents such as business registration
                      certificate, ID proof, and address proof. Our team will review your documents and verify your
                      business within 2-3 business days.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">How do I create a coupon for my business?</h3>
                      <Badge>Business</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">
                      To create a coupon for your business, go to the 'Coupons' section in your business dashboard and
                      click on the 'Create Coupon' button. Fill in the required details such as coupon code, discount
                      type, discount value, validity period, and usage limit. Once created, the coupon will be available
                      for customers to use.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Knowledge Base</CardTitle>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Add Article
                </Button>
              </div>
              <CardDescription>Manage knowledge base articles for customers and businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search articles..." className="pl-10" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="text-gray-400 h-4 w-4" />
                    <select className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="all">All Categories</option>
                      <option value="customer">Customer</option>
                      <option value="business">Business</option>
                      <option value="advertiser">Advertiser</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Getting Started with Trimly</h3>
                      <Badge>Customer</Badge>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      A comprehensive guide to help new users get started with the Trimly platform. Learn how to create
                      an account, browse salons, book appointments, and more.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Updated: 2023-08-10</span>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        View Article
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Setting Up Your Business Profile</h3>
                      <Badge>Business</Badge>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      Learn how to set up and optimize your business profile on Trimly. This guide covers adding
                      business details, services, staff members, working hours, and more.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Updated: 2023-08-05</span>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        View Article
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Managing Your Bookings</h3>
                      <Badge>Customer</Badge>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      A guide to help customers manage their bookings on Trimly. Learn how to view, reschedule, or
                      cancel your bookings, add services, and more.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Updated: 2023-07-28</span>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        View Article
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Creating Effective Ad Campaigns</h3>
                      <Badge>Advertiser</Badge>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      Learn how to create effective ad campaigns on Trimly to reach your target audience. This guide
                      covers ad formats, targeting options, budget management, and performance tracking.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Updated: 2023-07-20</span>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        View Article
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Understanding Analytics</h3>
                      <Badge>Business</Badge>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      A comprehensive guide to understanding and utilizing the analytics dashboard for your business.
                      Learn how to track bookings, revenue, customer engagement, and more.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Updated: 2023-07-15</span>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        View Article
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Managing Your Business Calendar</h3>
                      <Badge>Business</Badge>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      Learn how to effectively manage your business calendar on Trimly. This guide covers setting
                      working hours, managing staff schedules, handling time-offs, and more.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Updated: 2023-07-10</span>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        View Article
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
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

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
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
                      <FileText className="mr-2 h-4 w-4" />
                      View Guide
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}
