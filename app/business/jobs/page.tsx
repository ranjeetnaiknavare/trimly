"use client"

import { useState } from "react"
import { Briefcase, Plus, Search, Trash2, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function BusinessJobsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Job Postings</h1>
          <p className="text-gray-500">Manage your job openings and find the right talent</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-rose-600 hover:bg-rose-700">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Post a New Job</DialogTitle>
              <DialogDescription>
                Create a job posting to find qualified professionals for your salon.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="e.g. Hair Stylist, Makeup Artist" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="job-type">Job Type</Label>
                  <Select>
                    <SelectTrigger id="job-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Select>
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="salary-min">Salary Range (₹)</Label>
                  <Input id="salary-min" placeholder="Minimum" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salary-max" className="sr-only">
                    Maximum Salary
                  </Label>
                  <Input id="salary-max" placeholder="Maximum" className="mt-6" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Describe the job responsibilities, requirements, and benefits"
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-rose-600 hover:bg-rose-700">Post Job</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search job postings..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Hair Stylist</CardTitle>
                  <CardDescription>Posted 3 days ago</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm">Full-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Salary:</span>
                  <span className="text-sm">₹18,000 - ₹25,000 per month</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Applications:</span>
                  <span className="text-sm">12 candidates</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Close
                </Button>
              </div>
              <Button size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View Applications
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Makeup Artist</CardTitle>
                  <CardDescription>Posted 1 week ago</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm">Part-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Salary:</span>
                  <span className="text-sm">₹15,000 - ₹20,000 per month</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Applications:</span>
                  <span className="text-sm">8 candidates</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Close
                </Button>
              </div>
              <Button size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View Applications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="draft">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Draft Jobs</h3>
            <p className="text-gray-500 mb-6">You don't have any job postings saved as drafts</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-rose-600 hover:bg-rose-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">{/* Same content as above dialog */}</DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        <TabsContent value="closed">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Receptionist</CardTitle>
                  <CardDescription>Closed 2 weeks ago</CardDescription>
                </div>
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Closed</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm">Full-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Applications:</span>
                  <span className="text-sm">15 candidates</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="text-sm">Position filled</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Repost Job
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
            <p className="text-gray-500 mb-6">You'll see applications for your job postings here</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-rose-600 hover:bg-rose-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">{/* Same content as above dialog */}</DialogContent>
            </Dialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
