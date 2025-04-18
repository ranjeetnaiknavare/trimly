import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomerCoupons } from "@/components/customer-coupons"
import { LocationBasedCoupons } from "@/components/location-based-coupons"

export default function CouponsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">My Coupons</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <Tabs defaultValue="my-coupons">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-coupons">My Coupons</TabsTrigger>
            <TabsTrigger value="nearby">Nearby Offers</TabsTrigger>
          </TabsList>

          <TabsContent value="my-coupons">
            <CustomerCoupons />
          </TabsContent>

          <TabsContent value="nearby">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-1">Location-Based Offers</h2>
              <p className="text-sm text-gray-500">Special offers available in your area</p>
            </div>
            <LocationBasedCoupons currentLocation="Kothrud, Pune" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
