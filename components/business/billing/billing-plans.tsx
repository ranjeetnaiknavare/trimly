"use client"

import { useState } from "react"
import { Check, HelpCircle, Info, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface PlanFeature {
  name: string
  included: boolean
  limit?: string
  tooltip?: string
}

interface Plan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    annually: number
  }
  features: PlanFeature[]
  popular?: boolean
  buttonText: string
}

interface AddOn {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    annually: number
  }
  limit?: number
}

const plans: Plan[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Perfect for salons of all sizes",
    price: {
      monthly: 299,
      annually: 2990,
    },
    features: [
      { name: "1 Location", included: true },
      { name: "Up to 3 staff members", included: true },
      { name: "Appointment scheduling", included: true },
      { name: "Virtual queue management", included: true },
      { name: "Customer management", included: true },
      { name: "Inventory tracking", included: true },
      { name: "Email notifications", included: true },
      { name: "SMS notifications", included: true, limit: "100/month" },
      { name: "Analytics & reporting", included: true },
      { name: "Custom branding", included: true },
    ],
    popular: true,
    buttonText: "Get Started",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large salon chains with custom needs",
    price: {
      monthly: 0,
      annually: 0,
    },
    features: [
      { name: "Multiple Locations", included: true },
      { name: "Unlimited staff members", included: true },
      { name: "Advanced appointment scheduling", included: true },
      { name: "Priority support", included: true },
      { name: "Custom integrations", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Custom reporting", included: true },
      { name: "API access", included: true },
      { name: "White-label options", included: true },
      { name: "Custom development", included: true },
    ],
    buttonText: "Contact Sales",
  },
]

const addOns: AddOn[] = [
  {
    id: "additional-location",
    name: "Additional Location",
    description: "Add another salon location to your account",
    price: {
      monthly: 299,
      annually: 2990,
    },
  },
  {
    id: "additional-staff",
    name: "Additional Staff Member",
    description: "Add more staff members beyond the included 3",
    price: {
      monthly: 79,
      annually: 790,
    },
  },
  {
    id: "additional-sms",
    name: "Additional SMS Pack",
    description: "500 additional SMS notifications",
    price: {
      monthly: 199,
      annually: 1990,
    },
  },
  {
    id: "priority-support",
    name: "Priority Support",
    description: "Get faster response times and dedicated support",
    price: {
      monthly: 149,
      annually: 1490,
    },
  },
]

export function BillingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showPlanChangeDialog, setShowPlanChangeDialog] = useState(false)
  const [currentPlan] = useState("standard") // This would come from your user data
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [currentAddOns] = useState<string[]>(["additional-staff"]) // This would come from your user data
  const [additionalStaffCount, setAdditionalStaffCount] = useState(2) // Current additional staff
  const [newAdditionalStaffCount, setNewAdditionalStaffCount] = useState(2) // For plan changes
  const [additionalLocationCount, setAdditionalLocationCount] = useState(0) // Current additional locations
  const [newAdditionalLocationCount, setNewAdditionalLocationCount] = useState(0) // For plan changes

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    if (planId === "enterprise") {
      // For enterprise, redirect to contact form or open contact dialog
      window.location.href = "/business/contact-sales"
    } else {
      // Initialize with current add-ons
      setSelectedAddOns([...currentAddOns])
      setNewAdditionalStaffCount(additionalStaffCount)
      setNewAdditionalLocationCount(additionalLocationCount)
      setShowPlanChangeDialog(true)
    }
  }

  const handleAddOnToggle = (addOnId: string) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter((id) => id !== addOnId))
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId])
    }
  }

  const calculateTotalPrice = () => {
    // Base plan price
    const planPrice = plans.find((p) => p.id === "standard")?.price[billingCycle] || 0

    // Add-on prices
    let addOnPrice = 0

    // Additional staff price
    if (selectedAddOns.includes("additional-staff")) {
      const staffAddOn = addOns.find((a) => a.id === "additional-staff")
      addOnPrice += (staffAddOn?.price[billingCycle] || 0) * newAdditionalStaffCount
    }

    // Additional location price
    if (selectedAddOns.includes("additional-location")) {
      const locationAddOn = addOns.find((a) => a.id === "additional-location")
      addOnPrice += (locationAddOn?.price[billingCycle] || 0) * newAdditionalLocationCount
    }

    // Other add-ons
    selectedAddOns.forEach((addOnId) => {
      if (addOnId !== "additional-staff" && addOnId !== "additional-location") {
        const addOn = addOns.find((a) => a.id === addOnId)
        addOnPrice += addOn?.price[billingCycle] || 0
      }
    })

    return planPrice + addOnPrice
  }

  const handlePlanChange = () => {
    // In a real app, this would update the subscription in the database
    console.log("Changing plan with add-ons:", selectedAddOns)
    console.log("Additional staff:", newAdditionalStaffCount)
    console.log("Additional locations:", newAdditionalLocationCount)
    setShowPlanChangeDialog(false)
    setShowPaymentDialog(true)
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>
        <TabsContent value="plans" className="space-y-6">
          <div className="flex justify-center my-6">
            <div className="bg-muted inline-flex items-center rounded-lg p-1">
              <Button
                variant={billingCycle === "monthly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === "annually" ? "default" : "ghost"}
                size="sm"
                onClick={() => setBillingCycle("annually")}
              >
                Annually (Save 15%)
              </Button>
            </div>
          </div>

          {/* Current Plan Summary */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span>Your Current Plan: Standard</span>
                <Badge className="ml-2">Active</Badge>
              </CardTitle>
              <CardDescription>
                Billing cycle: {billingCycle === "monthly" ? "Monthly" : "Annual"} • Next billing date: May 1, 2023
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Standard Plan</p>
                    <p className="text-sm text-muted-foreground">1 location, up to 3 staff members included</p>
                  </div>
                  <p className="font-medium">₹299/month</p>
                </div>

                {additionalStaffCount > 0 && (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Additional Staff ({additionalStaffCount})</p>
                      <p className="text-sm text-muted-foreground">₹79 per staff member</p>
                    </div>
                    <p className="font-medium">₹{79 * additionalStaffCount}/month</p>
                  </div>
                )}

                {additionalLocationCount > 0 && (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Additional Locations ({additionalLocationCount})</p>
                      <p className="text-sm text-muted-foreground">₹299 per location</p>
                    </div>
                    <p className="font-medium">₹{299 * additionalLocationCount}/month</p>
                  </div>
                )}

                {currentAddOns.includes("additional-sms") && (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Additional SMS Pack</p>
                      <p className="text-sm text-muted-foreground">500 additional SMS notifications</p>
                    </div>
                    <p className="font-medium">₹199/month</p>
                  </div>
                )}

                {currentAddOns.includes("priority-support") && (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Priority Support</p>
                      <p className="text-sm text-muted-foreground">Faster response times</p>
                    </div>
                    <p className="font-medium">₹149/month</p>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between items-center font-bold">
                  <p>Total</p>
                  <p>
                    ₹
                    {299 +
                      79 * additionalStaffCount +
                      299 * additionalLocationCount +
                      (currentAddOns.includes("additional-sms") ? 199 : 0) +
                      (currentAddOns.includes("priority-support") ? 149 : 0)}
                    /month
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handlePlanSelect("standard")}>
                Modify Plan
              </Button>
              <Button variant="default" onClick={() => handlePlanSelect("enterprise")}>
                Upgrade to Enterprise
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <Card key={plan.id} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.popular && <Badge>Most Popular</Badge>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-2">
                    {plan.id === "enterprise" ? (
                      <span className="text-3xl font-bold">Custom Pricing</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">
                          ₹{billingCycle === "monthly" ? plan.price.monthly : plan.price.annually}
                        </span>
                        <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        {feature.included ? (
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                        ) : (
                          <div className="mr-2 h-4 w-4" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.name}
                          {feature.limit && <span className="text-muted-foreground text-sm"> ({feature.limit})</span>}
                        </span>
                        {feature.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="ml-1 h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={plan.id === currentPlan && !currentAddOns.length}
                  >
                    {plan.id === currentPlan && !currentAddOns.length
                      ? "Current Plan"
                      : plan.id === currentPlan
                        ? "Modify Add-ons"
                        : plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Add-ons</h4>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Additional location</span>
                    <span className="font-medium">₹299/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional staff/stylist (beyond 3)</span>
                    <span className="font-medium">₹79/month each</span>
                  </div>
                </div>
                <Button variant="link" className="p-0 h-auto mt-1">
                  Contact Sales for Custom Needs
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                  <div>Date</div>
                  <div>Description</div>
                  <div>Amount</div>
                  <div className="text-right">Invoice</div>
                </div>
                <div className="grid grid-cols-4 items-center">
                  <div>Apr 1, 2023</div>
                  <div>Trimly Standard Plan - Monthly</div>
                  <div>₹457.00</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center">
                  <div>Mar 1, 2023</div>
                  <div>Trimly Standard Plan - Monthly</div>
                  <div>₹457.00</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center">
                  <div>Feb 1, 2023</div>
                  <div>Trimly Standard Plan - Monthly</div>
                  <div>₹457.00</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Plan Change Dialog */}
      <Dialog open={showPlanChangeDialog} onOpenChange={setShowPlanChangeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modify Your Plan</DialogTitle>
            <DialogDescription>Customize your subscription with add-ons to fit your business needs.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="font-medium">Base Plan</h3>
              <div className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <p className="font-medium">Standard Plan</p>
                  <p className="text-sm text-muted-foreground">1 location, up to 3 staff members included</p>
                </div>
                <p className="font-medium">₹299/month</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Staff Members</h3>
              <div className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <p className="font-medium">Additional Staff Members</p>
                  <p className="text-sm text-muted-foreground">₹79 per staff member beyond the included 3</p>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setNewAdditionalStaffCount(Math.max(0, newAdditionalStaffCount - 1))}
                    disabled={newAdditionalStaffCount === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center">{newAdditionalStaffCount}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setNewAdditionalStaffCount(newAdditionalStaffCount + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Locations</h3>
              <div className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <p className="font-medium">Additional Locations</p>
                  <p className="text-sm text-muted-foreground">₹299 per additional location</p>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setNewAdditionalLocationCount(Math.max(0, newAdditionalLocationCount - 1))}
                    disabled={newAdditionalLocationCount === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center">{newAdditionalLocationCount}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setNewAdditionalLocationCount(newAdditionalLocationCount + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Optional Add-ons</h3>
              <div className="space-y-2">
                {addOns
                  .filter((addon) => addon.id !== "additional-staff" && addon.id !== "additional-location")
                  .map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={addon.id}
                          checked={selectedAddOns.includes(addon.id)}
                          onCheckedChange={() => handleAddOnToggle(addon.id)}
                        />
                        <div>
                          <Label htmlFor={addon.id} className="font-medium">
                            {addon.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{addon.description}</p>
                        </div>
                      </div>
                      <p className="font-medium">₹{addon.price.monthly}/month</p>
                    </div>
                  ))}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center font-bold">
              <p>Total Monthly Cost</p>
              <p>₹{calculateTotalPrice()}/month</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPlanChangeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePlanChange}>Update Subscription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Subscription</DialogTitle>
            <DialogDescription>Enter your payment details to change your subscription plan.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
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

            <RadioGroup defaultValue="credit" className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="credit" id="credit" className="peer sr-only" />
                <Label
                  htmlFor="credit"
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
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                  Credit
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowPaymentDialog(false)}>Update Subscription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
