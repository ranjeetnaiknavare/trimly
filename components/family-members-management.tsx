"use client"

import { useState } from "react"
import { User, Plus, Trash2, Edit2, Calendar, AlertCircle, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

// Mock data for family members with enhanced details
const initialFamilyMembers = [
  {
    id: "fm1",
    name: "You",
    relation: "self",
    selected: true,
    birthdate: new Date(1990, 5, 15),
    anniversary: null,
    allergies: "Sensitive to strong fragrances",
    preferences: ["Haircut", "Beard Trim"],
    notes: "Prefer male stylists",
  },
  {
    id: "fm2",
    name: "Raj",
    relation: "spouse",
    selected: false,
    birthdate: new Date(1988, 8, 22),
    anniversary: new Date(2015, 11, 5),
    allergies: "Aloe vera",
    preferences: ["Hair Coloring", "Facial"],
    notes: "Prefers female stylists",
  },
  {
    id: "fm3",
    name: "Arjun",
    relation: "son",
    selected: false,
    birthdate: new Date(2012, 2, 10),
    anniversary: null,
    allergies: "None",
    preferences: ["Haircut"],
    notes: "Gets anxious during haircuts, bring tablet for distraction",
  },
]

// Available service preferences
const availableServices = [
  "Haircut",
  "Hair Coloring",
  "Beard Trim",
  "Facial",
  "Manicure",
  "Pedicure",
  "Massage",
  "Waxing",
  "Threading",
  "Makeup",
]

export function FamilyMembersManagement() {
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState<any>(null)
  const [newMember, setNewMember] = useState({
    name: "",
    relation: "child",
    birthdate: null as Date | null,
    anniversary: null as Date | null,
    allergies: "",
    preferences: [] as string[],
    notes: "",
  })
  const [activeTab, setActiveTab] = useState("basic") // basic, dates, preferences

  const handleAddMember = () => {
    if (newMember.name.trim()) {
      const newId = `fm${Date.now()}`
      setFamilyMembers([
        ...familyMembers,
        {
          id: newId,
          name: newMember.name,
          relation: newMember.relation,
          selected: false,
          birthdate: newMember.birthdate,
          anniversary: newMember.anniversary,
          allergies: newMember.allergies,
          preferences: newMember.preferences,
          notes: newMember.notes,
        },
      ])
      setNewMember({
        name: "",
        relation: "child",
        birthdate: null,
        anniversary: null,
        allergies: "",
        preferences: [],
        notes: "",
      })
      setIsAddDialogOpen(false)
      setActiveTab("basic")
    }
  }

  const handleEditMember = () => {
    if (currentMember && currentMember.name.trim()) {
      setFamilyMembers(
        familyMembers.map((member) => (member.id === currentMember.id ? { ...member, ...currentMember } : member)),
      )
      setIsEditDialogOpen(false)
      setActiveTab("basic")
    }
  }

  const handleDeleteMember = () => {
    if (currentMember) {
      setFamilyMembers(familyMembers.filter((member) => member.id !== currentMember.id))
      setIsDeleteDialogOpen(false)
    }
  }

  const openEditDialog = (member: any) => {
    setCurrentMember({ ...member })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (member: any) => {
    setCurrentMember(member)
    setIsDeleteDialogOpen(false)
  }

  const toggleServicePreference = (service: string, isAdd: boolean, isNew = false) => {
    if (isNew) {
      if (isAdd) {
        setNewMember({
          ...newMember,
          preferences: [...newMember.preferences, service],
        })
      } else {
        setNewMember({
          ...newMember,
          preferences: newMember.preferences.filter((p) => p !== service),
        })
      }
    } else {
      if (isAdd) {
        setCurrentMember({
          ...currentMember,
          preferences: [...(currentMember.preferences || []), service],
        })
      } else {
        setCurrentMember({
          ...currentMember,
          preferences: currentMember.preferences.filter((p: string) => p !== service),
        })
      }
    }
  }

  const renderMemberDetails = (member: any) => {
    return (
      <div className="mt-2 space-y-2 text-sm text-gray-500">
        {member.birthdate && (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Birthday: {format(new Date(member.birthdate), "dd MMM yyyy")}</span>
          </div>
        )}

        {member.anniversary && (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Anniversary: {format(new Date(member.anniversary), "dd MMM yyyy")}</span>
          </div>
        )}

        {member.allergies && member.allergies !== "None" && (
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>Allergies: {member.allergies}</span>
          </div>
        )}

        {member.preferences && member.preferences.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mt-2">
            <Scissors className="h-4 w-4 mr-1" />
            <span className="mr-1">Preferences:</span>
            {member.preferences.map((pref: string) => (
              <Badge key={pref} variant="outline" className="text-xs">
                {pref}
              </Badge>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderDialogTabs = (isNew = false) => {
    return (
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${activeTab === "basic" ? "border-b-2 border-rose-600 text-rose-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("basic")}
        >
          Basic Info
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "dates" ? "border-b-2 border-rose-600 text-rose-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("dates")}
        >
          Special Dates
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "preferences" ? "border-b-2 border-rose-600 text-rose-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("preferences")}
        >
          Preferences
        </button>
      </div>
    )
  }

  const renderDialogContent = (isNew = false) => {
    const member = isNew ? newMember : currentMember
    const setMember = isNew
      ? (value: any) => setNewMember({ ...newMember, ...value })
      : (value: any) => setCurrentMember({ ...currentMember, ...value })

    if (activeTab === "basic") {
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor={isNew ? "name" : "edit-name"}>Name</Label>
            <Input
              id={isNew ? "name" : "edit-name"}
              value={member?.name || ""}
              onChange={(e) => setMember({ name: e.target.value })}
              placeholder="Enter name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={isNew ? "relation" : "edit-relation"}>Relation</Label>
            <Select value={member?.relation || ""} onValueChange={(value) => setMember({ relation: value })}>
              <SelectTrigger id={isNew ? "relation" : "edit-relation"}>
                <SelectValue placeholder="Select relation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    } else if (activeTab === "dates") {
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Birthday</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {member?.birthdate ? format(new Date(member.birthdate), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={member?.birthdate ? new Date(member.birthdate) : undefined}
                  onSelect={(date) => setMember({ birthdate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {member?.relation === "spouse" && (
            <div className="space-y-2">
              <Label>Anniversary</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    {member?.anniversary ? format(new Date(member.anniversary), "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={member?.anniversary ? new Date(member.anniversary) : undefined}
                    onSelect={(date) => setMember({ anniversary: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      )
    } else if (activeTab === "preferences") {
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor={isNew ? "allergies" : "edit-allergies"}>Allergies</Label>
            <Textarea
              id={isNew ? "allergies" : "edit-allergies"}
              value={member?.allergies || ""}
              onChange={(e) => setMember({ allergies: e.target.value })}
              placeholder="List any allergies or sensitivities"
            />
          </div>

          <div className="space-y-2">
            <Label>Service Preferences</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableServices.map((service) => {
                const isSelected = member?.preferences?.includes(service)
                return (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        toggleServicePreference(service, checked === true, isNew)
                      }}
                    />
                    <label
                      htmlFor={`service-${service}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {service}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={isNew ? "notes" : "edit-notes"}>Special Notes</Label>
            <Textarea
              id={isNew ? "notes" : "edit-notes"}
              value={member?.notes || ""}
              onChange={(e) => setMember({ notes: e.target.value })}
              placeholder="Any special requests or notes"
            />
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Family Members</h2>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-rose-600 hover:bg-rose-700">
            <Plus className="h-4 w-4 mr-1" /> Add Member
          </Button>
        </div>

        {familyMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{member.relation}</p>
                  </div>
                </div>
                {member.relation !== "self" && (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(member)}
                      className="h-8 w-8 text-gray-500"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteDialog(member)}
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {renderMemberDetails(member)}

              {member.notes && <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm italic">"{member.notes}"</div>}
            </CardContent>
          </Card>
        ))}

        {familyMembers.length === 1 && (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-3">Add your family members to book services for them</p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-rose-600 hover:bg-rose-700">
              <Plus className="h-4 w-4 mr-1" /> Add Family Member
            </Button>
          </div>
        )}
      </div>

      {/* Add Member Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open)
          if (!open) setActiveTab("basic")
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
            <DialogDescription>Add details of your family member to book services for them.</DialogDescription>
          </DialogHeader>

          {renderDialogTabs(true)}
          {renderDialogContent(true)}

          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <div className="flex gap-2">
                {activeTab !== "basic" && (
                  <Button variant="outline" onClick={() => setActiveTab("basic")}>
                    Previous
                  </Button>
                )}
                {activeTab !== "preferences" ? (
                  <Button
                    onClick={() => {
                      if (activeTab === "basic") setActiveTab("dates")
                      else if (activeTab === "dates") setActiveTab("preferences")
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleAddMember} className="bg-rose-600 hover:bg-rose-700">
                    Add Member
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) setActiveTab("basic")
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Family Member</DialogTitle>
            <DialogDescription>Update the details of your family member.</DialogDescription>
          </DialogHeader>

          {renderDialogTabs()}
          {renderDialogContent()}

          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <div className="flex gap-2">
                {activeTab !== "basic" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (activeTab === "preferences") setActiveTab("dates")
                      else if (activeTab === "dates") setActiveTab("basic")
                    }}
                  >
                    Previous
                  </Button>
                )}
                {activeTab !== "preferences" ? (
                  <Button
                    onClick={() => {
                      if (activeTab === "basic") setActiveTab("dates")
                      else if (activeTab === "dates") setActiveTab("preferences")
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleEditMember} className="bg-rose-600 hover:bg-rose-700">
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Member Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Family Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {currentMember?.name} from your family members?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMember}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
