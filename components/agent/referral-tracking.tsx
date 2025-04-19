"use client"

import { useState } from "react"
import { Copy, Share2, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AgentReferralTracking() {
  const [referralLink, setReferralLink] = useState("https://trimly.com/business/register?ref=TRA-583921")
  const [copySuccess, setCopySuccess] = useState(false)
  const [shareMethod, setShareMethod] = useState("whatsapp")

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const handleShare = () => {
    // In a real app, this would use the Web Share API or open the appropriate app
    if (shareMethod === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`Join Trimly and grow your salon business! Register here: ${referralLink}`)}`,
      )
    } else if (shareMethod === "sms") {
      window.open(
        `sms:?body=${encodeURIComponent(`Join Trimly and grow your salon business! Register here: ${referralLink}`)}`,
      )
    } else if (shareMethod === "email") {
      window.open(
        `mailto:?subject=Join Trimly - The Ultimate Salon Management Platform&body=${encodeURIComponent(`Hello,\n\nI'd like to invite you to join Trimly, the ultimate platform for salon and spa management.\n\nRegister here: ${referralLink}\n\nBenefits include:\n- Online bookings\n- Customer management\n- Inventory tracking\n- Marketing tools\n\nLet me know if you have any questions!\n\nBest regards,`)}`,
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referral Link</CardTitle>
        <CardDescription>Share this link with businesses to earn commission</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 p-3 bg-gray-50 border rounded-md overflow-hidden overflow-ellipsis whitespace-nowrap">
            {referralLink}
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleCopyReferralLink}>
            <Copy className="h-4 w-4" />
            {copySuccess ? "Copied!" : "Copy"}
          </Button>
        </div>

        <Tabs defaultValue="share">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          <TabsContent value="share" className="space-y-4 mt-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={shareMethod} onValueChange={setShareMethod}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Share via" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-rose-600 hover:bg-rose-700 flex items-center gap-2" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share Now
              </Button>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Sharing Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Personalize your message when sharing</li>
                <li>• Follow up with businesses after sharing</li>
                <li>• Offer to help with the registration process</li>
                <li>• Share success stories of other businesses on Trimly</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="customize" className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Custom Message</label>
              <Input placeholder="Enter your custom message" defaultValue="Join Trimly and grow your salon business!" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Audience</label>
              <Select defaultValue="salons">
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salons">Salons</SelectItem>
                  <SelectItem value="spas">Spas</SelectItem>
                  <SelectItem value="barbers">Barber Shops</SelectItem>
                  <SelectItem value="nail">Nail Studios</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-rose-600" />
                <span className="text-sm font-medium">Tracking Enabled</span>
              </div>
              <span className="text-xs text-gray-500">Track clicks and conversions</span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
