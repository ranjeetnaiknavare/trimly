"use client"

import { useState } from "react"
import { AdvertiserDashboardLayout } from "@/components/advertiser/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, CreditCard, Wallet, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdvertiserBillingPage() {
  const [activeTab, setActiveTab] = useState("wallet")
  const [walletBalance, setWalletBalance] = useState(500)
  const [showAddFundsDialog, setShowAddFundsDialog] = useState(false)
  const [amount, setAmount] = useState("1000")
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAddFunds = async () => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update wallet balance
    setWalletBalance(walletBalance + Number.parseInt(amount))
    setIsProcessing(false)
    setShowAddFundsDialog(false)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <AdvertiserDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Billing & Payments</h1>
        <p className="text-gray-600">Manage your wallet and payment methods</p>
      </div>

      {showSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">₹{amount} successfully added to your wallet!</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="wallet" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
                <CardDescription>Your current advertising budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <p className="text-3xl font-bold">₹{walletBalance.toLocaleString()}</p>
                  </div>
                  <Button className="bg-rose-600 hover:bg-rose-700" onClick={() => setShowAddFundsDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Funds
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Add</CardTitle>
                <CardDescription>Add funds to your wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => {
                    setAmount("1000")
                    setShowAddFundsDialog(true)
                  }}
                >
                  <span>₹1,000</span>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => {
                    setAmount("2000")
                    setShowAddFundsDialog(true)
                  }}
                >
                  <span>₹2,000</span>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => {
                    setAmount("5000")
                    setShowAddFundsDialog(true)
                  }}
                >
                  <span>₹5,000</span>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Automatic Recharge</CardTitle>
              <CardDescription>Set up automatic wallet recharge when balance is low</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auto-recharge" className="rounded border-gray-300" />
                <Label htmlFor="auto-recharge">Enable automatic recharge</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threshold">Recharge when balance falls below</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      ₹
                    </span>
                    <Input id="threshold" type="number" defaultValue="500" className="rounded-l-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recharge-amount">Recharge amount</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      ₹
                    </span>
                    <Input id="recharge-amount" type="number" defaultValue="1000" className="rounded-l-none" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-rose-600 hover:bg-rose-700">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment-methods" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-4 text-gray-500" />
                  <div>
                    <p className="font-medium">HDFC Bank Credit Card</p>
                    <p className="text-sm text-gray-500">**** **** **** 4567 • Expires 12/25</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Wallet className="h-6 w-6 mr-4 text-gray-500" />
                  <div>
                    <p className="font-medium">UPI</p>
                    <p className="text-sm text-gray-500">user@okbank</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>

              <Button className="bg-rose-600 hover:bg-rose-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-right py-3 px-4 font-medium">Amount</th>
                      <th className="text-right py-3 px-4 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Jul 15, 2023</td>
                      <td className="py-3 px-4">Added funds to wallet</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Credit
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">+₹1,000</td>
                      <td className="py-3 px-4 text-right">₹1,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Jul 15, 2023</td>
                      <td className="py-3 px-4">Summer Special Discount Ad</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Debit
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">-₹500</td>
                      <td className="py-3 px-4 text-right">₹500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Funds Dialog */}
      <Dialog open={showAddFundsDialog} onOpenChange={setShowAddFundsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Funds to Wallet</DialogTitle>
            <DialogDescription>Add money to your advertising wallet to run campaigns.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
                step="100"
              />
            </div>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="credit" id="credit" className="peer sr-only" />
                <Label
                  htmlFor="credit"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="h-6 w-6 mb-2" />
                  Credit Card
                </Label>
              </div>
              <div>
                <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                <Label
                  htmlFor="upi"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 mb-2"
                  >
                    <path d="M7 11.5V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-2" />
                    <path d="M13 7H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h2" />
                    <path d="M9 17v2" />
                    <path d="M17 17v2" />
                  </svg>
                  UPI
                </Label>
              </div>
              <div>
                <RadioGroupItem value="netbanking" id="netbanking" className="peer sr-only" />
                <Label
                  htmlFor="netbanking"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 mb-2"
                  >
                    <path d="M3 21h18" />
                    <path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
                    <path d="M3 11v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                    <path d="M5 15v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
                    <path d="M7 19v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                  </svg>
                  Net Banking
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === "credit" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input id="upi-id" placeholder="yourname@bank" />
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div className="space-y-2">
                <Label htmlFor="bank">Select Bank</Label>
                <select id="bank" className="w-full rounded-md border border-gray-300 p-2">
                  <option value="">Select your bank</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                </select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFundsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFunds} className="bg-rose-600 hover:bg-rose-700" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Add ₹${Number.parseInt(amount).toLocaleString()}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdvertiserDashboardLayout>
  )
}
