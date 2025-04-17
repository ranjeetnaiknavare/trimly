"use client"

import { useState } from "react"
import { BarChart3, Box, CircleDollarSign, Package, ShoppingCart, TrendingDown, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { InventoryProducts } from "./inventory-products"
import { InventoryCategories } from "./inventory-categories"
import { InventorySuppliers } from "./inventory-suppliers"

export function InventoryDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the dashboard
  const inventoryStats = {
    totalProducts: 124,
    lowStock: 8,
    outOfStock: 3,
    totalValue: 12450,
    topSellingProducts: [
      { name: "Shampoo - Premium", sold: 45, stock: 32 },
      { name: "Hair Color - Natural Black", sold: 38, stock: 15 },
      { name: "Conditioner - Repair", sold: 36, stock: 28 },
      { name: "Hair Serum", sold: 30, stock: 12 },
      { name: "Styling Gel - Strong Hold", sold: 25, stock: 18 },
    ],
    lowStockItems: [
      { name: "Hair Color - Burgundy", stock: 5, threshold: 10 },
      { name: "Facial Cleanser", stock: 4, threshold: 10 },
      { name: "Hair Serum", stock: 12, threshold: 15 },
      { name: "Beard Oil", stock: 3, threshold: 8 },
      { name: "Nail Polish Remover", stock: 2, threshold: 5 },
    ],
    recentTransactions: [
      { type: "purchase", product: "Shampoo Bulk", quantity: 50, amount: 1250, date: "2023-04-15" },
      { type: "usage", product: "Hair Color - Blonde", quantity: 3, amount: 75, date: "2023-04-14" },
      { type: "usage", product: "Styling Gel", quantity: 2, amount: 40, date: "2023-04-14" },
      { type: "purchase", product: "Facial Products", quantity: 25, amount: 875, date: "2023-04-12" },
    ],
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">+4 added this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${inventoryStats.totalValue}</div>
            <p className="text-xs text-muted-foreground">+$350 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <TrendingDown className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.lowStock}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <ShoppingCart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.outOfStock}</div>
            <p className="text-xs text-muted-foreground">Order immediately</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Your most popular products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryStats.topSellingProducts.map((product, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-[180px] md:w-[250px] truncate">
                        <p className="text-sm font-medium">{product.name}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{product.sold} sold</p>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
                <CardDescription>Items that need to be restocked soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryStats.lowStockItems.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.stock}/{item.threshold}
                        </p>
                      </div>
                      <Progress
                        value={(item.stock / item.threshold) * 100}
                        className={item.stock < item.threshold * 0.3 ? "bg-red-100" : "bg-amber-100"}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest inventory movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryStats.recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-[180px] md:w-[250px] truncate">
                        <p className="text-sm font-medium">{transaction.product}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <p
                          className={`text-sm ${transaction.type === "purchase" ? "text-green-500" : "text-amber-500"}`}
                        >
                          {transaction.type === "purchase" ? "+" : "-"}
                          {transaction.quantity} units
                        </p>
                        <p className="text-sm font-medium">${transaction.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common inventory tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => setActiveTab("products")} className="justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Add New Product
                  </Button>
                  <Button onClick={() => setActiveTab("products")} variant="outline" className="justify-start">
                    <Box className="mr-2 h-4 w-4" />
                    Record Product Usage
                  </Button>
                  <Button onClick={() => setActiveTab("suppliers")} variant="outline" className="justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Contact Suppliers
                  </Button>
                  <Button onClick={() => setActiveTab("products")} variant="outline" className="justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Inventory Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <TrendingDown className="h-4 w-4" />
            <AlertTitle>Low Stock Alert</AlertTitle>
            <AlertDescription>
              You have {inventoryStats.lowStock} items that are running low on stock. Consider placing orders soon.
            </AlertDescription>
          </Alert>
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
    </div>
  )
}
