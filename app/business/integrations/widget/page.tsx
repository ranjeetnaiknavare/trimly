"use client"

import { useState } from "react"
import { BusinessDashboardLayout } from "@/components/business/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Code, Settings, BarChart } from "lucide-react"
import { WidgetPreview } from "@/components/business/embed/widget-preview"
import { WidgetPerformance } from "@/components/business/embed/widget-performance"
import { Image } from "@/components/ui/image"

export default function EmbedWidgetPage() {
  const [copied, setCopied] = useState(false)
  const [widgetSettings, setWidgetSettings] = useState({
    primaryColor: "#e11d48",
    buttonText: "Book Now",
    showLogo: true,
    position: "bottom-right",
    services: ["all"],
    autoOpen: false,
  })

  const embedCode = `<script>
  (function(w,d,s,o,f,js,fjs){
    w['Trimly-Widget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','trimly','https://widget.trimly.app/loader.js'));
  
  trimly('init', {
    businessId: 'b1',
    primaryColor: '${widgetSettings.primaryColor}',
    buttonText: '${widgetSettings.buttonText}',
    showLogo: ${widgetSettings.showLogo},
    position: '${widgetSettings.position}',
    services: ${JSON.stringify(widgetSettings.services)},
    autoOpen: ${widgetSettings.autoOpen}
  });
</script>`

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateSetting = (key: string, value: any) => {
    setWidgetSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <BusinessDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Booking Widget</h1>
        <p className="text-gray-600">Embed a booking widget on your website</p>
      </div>

      <Tabs defaultValue="setup">
        <TabsList className="mb-6">
          <TabsTrigger value="setup">
            <Code className="h-4 w-4 mr-2" />
            Setup & Embed
          </TabsTrigger>
          <TabsTrigger value="customize">
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </TabsTrigger>
          <TabsTrigger value="performance">
            <BarChart className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Embed on Your Website</CardTitle>
              <CardDescription>Copy and paste this code into your website's HTML</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm mb-4">
                <pre>{embedCode}</pre>
              </div>
              <Button onClick={handleCopyCode} className="w-full">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform-Specific Instructions</CardTitle>
                <CardDescription>How to add the widget to popular platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Image
                    src="/wordpress-logo-minimalist.png"
                    alt="WordPress"
                    className="w-10 h-10 mr-4"
                    fallbackSrc="/wordpress-logo-minimalist.png"
                  />
                  <div>
                    <h3 className="font-medium">WordPress</h3>
                    <p className="text-sm text-gray-600">Add to header.php or use a header/footer plugin</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Image
                    src="/wix-logo.png"
                    alt="Wix"
                    className="w-10 h-10 mr-4"
                    fallbackSrc="/wix-website-builder.png"
                  />
                  <div>
                    <h3 className="font-medium">Wix</h3>
                    <p className="text-sm text-gray-600">Add via Wix's Custom Code feature in Settings</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Image
                    src="/stylized-shopping-bag.png"
                    alt="Shopify"
                    className="w-10 h-10 mr-4"
                    fallbackSrc="/stylized-shopping-bag.png"
                  />
                  <div>
                    <h3 className="font-medium">Shopify</h3>
                    <p className="text-sm text-gray-600">Add to theme.liquid file or use the Theme Editor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Widget Preview</CardTitle>
                <CardDescription>See how the widget will appear on your website</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] relative bg-gray-100 rounded-md overflow-hidden">
                <WidgetPreview settings={widgetSettings} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Widget Settings</CardTitle>
                  <CardDescription>Customize how your booking widget looks and behaves</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex">
                        <Input
                          id="primary-color"
                          type="text"
                          value={widgetSettings.primaryColor}
                          onChange={(e) => updateSetting("primaryColor", e.target.value)}
                          className="rounded-r-none"
                        />
                        <div
                          className="w-10 h-10 border border-l-0 rounded-r-md"
                          style={{ backgroundColor: widgetSettings.primaryColor }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="button-text">Button Text</Label>
                      <Input
                        id="button-text"
                        value={widgetSettings.buttonText}
                        onChange={(e) => updateSetting("buttonText", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Widget Position</Label>
                      <Select
                        value={widgetSettings.position}
                        onValueChange={(value) => updateSetting("position", value)}
                      >
                        <SelectTrigger id="position">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bottom-right">Bottom Right</SelectItem>
                          <SelectItem value="bottom-left">Bottom Left</SelectItem>
                          <SelectItem value="top-right">Top Right</SelectItem>
                          <SelectItem value="top-left">Top Left</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="services">Services to Display</Label>
                      <Select
                        value={widgetSettings.services[0]}
                        onValueChange={(value) => updateSetting("services", [value])}
                      >
                        <SelectTrigger id="services">
                          <SelectValue placeholder="Select services" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Services</SelectItem>
                          <SelectItem value="haircut">Haircuts Only</SelectItem>
                          <SelectItem value="color">Hair Color Only</SelectItem>
                          <SelectItem value="spa">Spa Services Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="show-logo"
                      checked={widgetSettings.showLogo}
                      onCheckedChange={(checked) => updateSetting("showLogo", checked)}
                    />
                    <Label htmlFor="show-logo">Show Trimly Logo</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-open"
                      checked={widgetSettings.autoOpen}
                      onCheckedChange={(checked) => updateSetting("autoOpen", checked)}
                    />
                    <Label htmlFor="auto-open">Auto-open widget after 5 seconds</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See your changes in real-time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] relative bg-gray-100 rounded-md overflow-hidden">
                <WidgetPreview settings={widgetSettings} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Additional customization options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-css">Custom CSS</Label>
                <Textarea
                  id="custom-css"
                  placeholder=".trimly-widget { /* your custom styles */ }"
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-js">Custom JavaScript</Label>
                <Textarea id="custom-js" placeholder="// Your custom JavaScript code" className="font-mono" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <WidgetPerformance />
        </TabsContent>
      </Tabs>
    </BusinessDashboardLayout>
  )
}
