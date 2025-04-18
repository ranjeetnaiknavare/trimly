"use client"

import { useState, useEffect } from "react"
import { Copy, Check, ExternalLink, HelpCircle, Code, Palette, Type, List, Eye } from "lucide-react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WidgetPreview } from "@/components/business/embed/widget-preview"
import { WidgetPerformance } from "@/components/business/embed/widget-performance"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function EmbedWidgetSetupPage() {
  const [copied, setCopied] = useState(false)
  const [widgetSettings, setWidgetSettings] = useState({
    primaryColor: "#e11d48", // rose-600
    buttonText: "Book Now",
    displayServices: true,
    selectedService: "all",
    widgetType: "button",
    showLogo: true,
  })

  const [embedCode, setEmbedCode] = useState("")

  // Generate embed code based on settings
  useEffect(() => {
    const code = `<script>
  (function(w,d,s,o,f,js,fjs){
    w['TrimlyWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','trimly','https://embed.gettrimly.com/widget.js'));
  
  trimly('init', {
    businessId: 'YOUR_BUSINESS_ID',
    primaryColor: '${widgetSettings.primaryColor}',
    buttonText: '${widgetSettings.buttonText}',
    displayServices: ${widgetSettings.displayServices},
    ${widgetSettings.selectedService !== "all" ? `serviceId: '${widgetSettings.selectedService}',` : ""}
    widgetType: '${widgetSettings.widgetType}',
    showLogo: ${widgetSettings.showLogo}
  });
</script>`

    setEmbedCode(code)
  }, [widgetSettings])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add the Trimly Booking Widget to Your Website!</h1>
        <p className="text-gray-600">Start accepting bookings on your website today!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Generate Embed Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-600 mr-2 text-sm font-bold">
                  1
                </span>
                Generate Your Embed Code
              </CardTitle>
              <CardDescription>
                Customize how your booking widget will look and function on your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="widget-type">Widget Type</Label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <HelpCircle className="h-3 w-3 mr-1" />
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Widget Types</DialogTitle>
                              <DialogDescription>
                                Choose how the booking widget will appear on your website
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                              <div className="border rounded-md p-4 flex flex-col items-center">
                                <div className="h-24 w-full bg-gray-100 rounded flex items-center justify-center mb-2">
                                  <Button size="sm" className="bg-rose-600">
                                    Book Now
                                  </Button>
                                </div>
                                <p className="text-sm font-medium">Button</p>
                                <p className="text-xs text-gray-500 text-center mt-1">
                                  A simple button that opens the booking form in a popup
                                </p>
                              </div>
                              <div className="border rounded-md p-4 flex flex-col items-center">
                                <div className="h-24 w-full bg-gray-100 rounded flex items-center justify-center mb-2">
                                  <div className="w-full max-w-[120px] h-16 border rounded bg-white shadow-sm"></div>
                                </div>
                                <p className="text-sm font-medium">Inline Form</p>
                                <p className="text-xs text-gray-500 text-center mt-1">
                                  Embed the booking form directly on your page
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <Select
                        value={widgetSettings.widgetType}
                        onValueChange={(value) => setWidgetSettings({ ...widgetSettings, widgetType: value })}
                      >
                        <SelectTrigger id="widget-type">
                          <SelectValue placeholder="Select widget type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="button">Button</SelectItem>
                          <SelectItem value="inline">Inline Form</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="button-text">Button Text</Label>
                        <div className="flex items-center">
                          <Type className="h-3 w-3 mr-1 text-gray-500" />
                          <span className="text-xs text-gray-500">Text on button</span>
                        </div>
                      </div>
                      <Input
                        id="button-text"
                        value={widgetSettings.buttonText}
                        onChange={(e) => setWidgetSettings({ ...widgetSettings, buttonText: e.target.value })}
                        placeholder="Book Now"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex items-center">
                          <Palette className="h-3 w-3 mr-1 text-gray-500" />
                          <span className="text-xs text-gray-500">Brand color</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div
                          className="w-10 h-10 rounded border cursor-pointer"
                          style={{ backgroundColor: widgetSettings.primaryColor }}
                          onClick={() => document.getElementById("color-picker")?.click()}
                        ></div>
                        <Input
                          id="primary-color"
                          value={widgetSettings.primaryColor}
                          onChange={(e) => setWidgetSettings({ ...widgetSettings, primaryColor: e.target.value })}
                          placeholder="#e11d48"
                          className="flex-1"
                        />
                        <input
                          type="color"
                          id="color-picker"
                          value={widgetSettings.primaryColor}
                          onChange={(e) => setWidgetSettings({ ...widgetSettings, primaryColor: e.target.value })}
                          className="sr-only"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="service-selection">Pre-select Service</Label>
                        <div className="flex items-center">
                          <List className="h-3 w-3 mr-1 text-gray-500" />
                          <span className="text-xs text-gray-500">Default service</span>
                        </div>
                      </div>
                      <Select
                        value={widgetSettings.selectedService}
                        onValueChange={(value) => setWidgetSettings({ ...widgetSettings, selectedService: value })}
                      >
                        <SelectTrigger id="service-selection">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Services</SelectItem>
                          <SelectItem value="haircut">Haircut</SelectItem>
                          <SelectItem value="beard-trim">Beard Trim</SelectItem>
                          <SelectItem value="facial">Facial</SelectItem>
                          <SelectItem value="hair-color">Hair Color</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Display Services List</Label>
                        <p className="text-sm text-gray-500">Show the list of services in the widget</p>
                      </div>
                      <Switch
                        checked={widgetSettings.displayServices}
                        onCheckedChange={(checked) =>
                          setWidgetSettings({ ...widgetSettings, displayServices: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Show Trimly Logo</Label>
                        <p className="text-sm text-gray-500">Display "Powered by Trimly" in the widget</p>
                      </div>
                      <Switch
                        checked={widgetSettings.showLogo}
                        onCheckedChange={(checked) => setWidgetSettings({ ...widgetSettings, showLogo: checked })}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="pt-4">
                <Label htmlFor="embed-code">Your Embed Code</Label>
                <div className="relative mt-2">
                  <Textarea id="embed-code" value={embedCode} readOnly rows={10} className="font-mono text-sm pr-12" />
                  <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={copyToClipboard} className="bg-rose-600 hover:bg-rose-700">
                {copied ? "Copied!" : "Copy Embed Code"}
              </Button>
            </CardFooter>
          </Card>

          {/* Step 2: Embed Code in Your Website */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-600 mr-2 text-sm font-bold">
                  2
                </span>
                Embed Code in Your Website
              </CardTitle>
              <CardDescription>Follow these instructions to add the widget to your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                To embed this widget on your website, copy the code above and paste it into your website's HTML where
                you want the button or form to appear.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="wordpress">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <img src="/wordpress-logo-minimalist.png" alt="WordPress" className="w-6 h-6 mr-2" />
                      WordPress Instructions
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Log in to your WordPress admin dashboard</li>
                      <li>Go to the page where you want to add the booking widget</li>
                      <li>Click "Edit" to open the page editor</li>
                      <li>Add a new "Custom HTML" block where you want the widget to appear</li>
                      <li>Paste the embed code into the HTML block</li>
                      <li>Click "Update" or "Publish" to save your changes</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="wix">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <img src="/wix-logo.png" alt="Wix" className="w-6 h-6 mr-2" />
                      Wix Instructions
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Log in to your Wix account and open the Editor</li>
                      <li>Click the "+" button to add a new element</li>
                      <li>Select "Embed" from the menu</li>
                      <li>Choose "HTML iframe" or "HTML Code"</li>
                      <li>Paste the embed code into the box</li>
                      <li>Click "Update" and then "Publish" to save your changes</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shopify">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <img src="/stylized-shopping-bag.png" alt="Shopify" className="w-6 h-6 mr-2" />
                      Shopify Instructions
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Log in to your Shopify admin dashboard</li>
                      <li>Go to "Online Store" → "Themes"</li>
                      <li>Click "Actions" → "Edit code" for your current theme</li>
                      <li>
                        Find the template file where you want to add the widget (e.g., product.liquid, theme.liquid)
                      </li>
                      <li>Paste the embed code where you want the widget to appear</li>
                      <li>Click "Save" to apply your changes</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="other">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <Code className="w-6 h-6 mr-2" />
                      Other Websites / Custom HTML
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">
                      If you're using a custom website or another CMS (like Joomla, Squarespace, Webflow, etc.), you
                      will typically need to:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Access the HTML editor for the page where you want to add the widget</li>
                      <li>Locate the section of the page where you want the widget to appear</li>
                      <li>Paste the embed code into the HTML</li>
                      <li>Save your changes</li>
                    </ol>
                    <p className="text-sm mt-2">
                      If you're not sure how to access the HTML of your website, please consult your web developer or
                      the documentation for your specific platform.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Alert className="bg-blue-50 border-blue-200">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-600">Need help with the integration?</AlertTitle>
                <AlertDescription className="text-blue-700">
                  If you're having trouble adding the widget to your website, you can:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <a href="#" className="text-blue-600 hover:underline flex items-center">
                        View our detailed developer guide
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-blue-600 hover:underline flex items-center">
                        Contact our support team
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 3: Save Changes and Start Accepting Bookings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-600 mr-2 text-sm font-bold">
                  3
                </span>
                Save Changes and Start Accepting Bookings
              </CardTitle>
              <CardDescription>Your widget is now ready to use!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <h3 className="font-medium text-green-800">Your widget is now live!</h3>
                    <p className="text-green-700 text-sm">
                      Start accepting bookings from your website visitors. You'll see all bookings in your Trimly
                      dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-gray-600">Need to make changes to your widget?</p>
                <Button variant="outline" size="sm" onClick={() => window.scrollTo(0, 0)}>
                  Edit Widget Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Widget Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                Live Widget Preview
              </CardTitle>
              <CardDescription>See how your widget will appear on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <WidgetPreview settings={widgetSettings} />
            </CardContent>
          </Card>

          {/* Widget Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Widget Performance</CardTitle>
              <CardDescription>Track how your widget is performing</CardDescription>
            </CardHeader>
            <CardContent>
              <WidgetPerformance />
            </CardContent>
          </Card>
        </div>
      </div>
    </BusinessDashboardLayout>
  )
}
