"use client"

import { User, Plus, Check } from "lucide-react"

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
    <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
      {members.map((member) => {
        const isSelected = selectedMembers.includes(member.id)

        return (
          <div key={member.id} className="flex flex-col items-center min-w-[72px]" onClick={() => onToggle(member.id)}>
            <div
              className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-1 ${
                isSelected ? "bg-rose-100" : "bg-gray-100"
              }`}
            >
              <User className={`h-8 w-8 ${isSelected ? "text-rose-600" : "text-gray-400"}`} />
              {isSelected && (
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-rose-600 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <span className="text-sm">{member.name}</span>
            <span className="text-xs text-gray-500">{member.relation}</span>
          </div>
        )
      })}

      <div className="flex flex-col items-center min-w-[72px]">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1 border-2 border-dashed border-gray-300">
          <Plus className="h-6 w-6 text-gray-400" />
        </div>
        <span className="text-sm text-gray-500">Add</span>
        <span className="text-xs text-gray-500">Member</span>
      </div>
    </div>
  )
}
