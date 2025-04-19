"use client"

import { User, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface FamilyMember {
  id: string
  name: string
  relation: string
  selected?: boolean
}

interface FamilyMemberSelectorProps {
  members: FamilyMember[]
  selectedMembers: string[]
  onToggle: (memberId: string) => void
}

export function FamilyMemberSelector({ members, selectedMembers, onToggle }: FamilyMemberSelectorProps) {
  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div
          key={member.id}
          className={`p-3 rounded-lg border transition-all ${
            selectedMembers.includes(member.id) ? "border-rose-500 bg-rose-50" : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onToggle(member.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedMembers.includes(member.id) ? "bg-rose-600" : "bg-gray-200"
                }`}
              >
                <User className={`w-5 h-5 ${selectedMembers.includes(member.id) ? "text-white" : "text-gray-600"}`} />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{member.relation}</p>
              </div>
            </div>
            <Button
              variant={selectedMembers.includes(member.id) ? "default" : "outline"}
              size="sm"
              className={selectedMembers.includes(member.id) ? "bg-rose-600 hover:bg-rose-700" : ""}
              onClick={(e) => {
                e.stopPropagation()
                onToggle(member.id)
              }}
            >
              {selectedMembers.includes(member.id) ? "Selected" : "Select"}
            </Button>
          </div>
        </div>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4 border-dashed">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Family Member
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-gray-500">
              This feature will allow you to add family members to your profile.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
