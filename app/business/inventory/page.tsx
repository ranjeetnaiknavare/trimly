"use client"

import { useState } from "react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryDashboard } from "@/components/business/inventory/inventory-dashboard"
import { InventoryProducts } from "@/components/business/inventory/inventory-products"
import { InventoryCategories } from "@/components/business/inventory/inventory-categories"
import { InventorySuppliers } from "@/components/business/inventory/inventory-suppliers"

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <p className="text-gray-600">Manage your salon products and supplies</p>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <InventoryDashboard />
        </TabsContent>
        <TabsContent value="products">
          <InventoryProducts />
        </TabsContent>
        <TabsContent value="categories">
          <InventoryCategories />
        </TabsContent>
        <TabsContent value="suppliers">
          <InventorySuppliers />
        </TabsContent>
      </Tabs>
    </BusinessDashboardLayout>
  )
}
