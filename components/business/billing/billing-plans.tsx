"use client"

import { useState } from "react"
import { Check, HelpCircle, Info } from "lucide-react"
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

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small salons just getting started",
    price: {
      monthly: 1999,
      annually: 19990,
    },
    features: [
      { name: "1 Location", included: true },
      { name: "Up to 3 staff members", included: true },
      { name: "Basic appointment scheduling", included: true },
      { name: "Customer management", included: true },
      { name: "Inventory tracking", included: true, limit: "Basic" },
      { name: "Email notifications", included: true },
      { name: "SMS notifications", included: false },
      { name: "Analytics & reporting", included: false },
      { name: "Custom branding", included: false },
    ],
    buttonText: "Get Started",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing salons with multiple staff members",
    price: {
      monthly: 4999,
      annually: 49990,
    },
    popular: true,
    features: [
      { name: "Up to 2 Locations", included: true },
      { name: "Up to 10 staff members", included: true },
      { name: "Advanced appointment scheduling", included: true },
      { name: "Customer management", included: true },
      { name: "Inventory tracking", included: true, limit: "Advanced" },
      { name: "Email notifications", included: true },
      { name: "SMS notifications", included: true, limit: "100/month" },
      { name: "Analytics & reporting", included: true },
      { name: "Custom branding", included: true },
    ],
    buttonText: "Upgrade Now",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large salons with multiple locations",
    price: {
      monthly: 12999,
      annually: 129990,
    },
    features: [
      { name: "Unlimited Locations", included: true },
      { name: "Unlimited staff members", included: true },
      { name: "Advanced appointment scheduling", included: true },
      {
        name: "Customer management",
        included: true,
        tooltip: "Includes VIP customer tagging and advanced segmentation",
      },
      { name: "Inventory tracking", included: true, limit: "Premium" },
      { name: "Email notifications", included: true },
      { name: "SMS notifications", included: true, limit: "Unlimited" },
      { name: "Analytics & reporting", included: true, tooltip: "Advanced analytics with custom reports" },
      { name: "Custom branding", included: true },
    ],
    buttonText: "Contact Sales",
  },
]

export function BillingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [currentPlan] = useState("starter") // This would come from your user data

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
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

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}\`  => (
              <Card key={plan.id} className={\`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.popular && <Badge>Most Popular</Badge>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">
                      ₹{billingCycle === "monthly" ? plan.price.monthly : plan.price.annually}
                    </span>
                    <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
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
                    disabled={plan.id === currentPlan}
                  >
                    {plan.id === currentPlan ? "Current Plan" : plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Need a custom plan?</h4>
                <p className="text-sm text-muted-foreground">
                  Contact our sales team for custom pricing options for larger salon chains or specific requirements.
                </p>
                <Button variant="link" className="p-0 h-auto mt-1">
                  Contact Sales
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
                  <div>Trimly Starter Plan - Monthly</div>
                  <div>₹1,999.00</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center">
                  <div>Mar 1, 2023</div>
                  <div>Trimly Starter Plan - Monthly</div>
                  <div>₹1,999.00</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center">
                  <div>Feb 1, 2023</div>
                  <div>Trimly Starter Plan - Monthly</div>
                  <div>₹1,999.00</div>
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
