"use client"

import { User, Plus, Check, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FamilyMember {
  id: string
  name: string
  relation: string
  selected?: boolean
  birthdate?: Date | null
  allergies?: string
  preferences?: string[]
  notes?: string
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
        const hasAllergies = member.allergies && member.allergies !== "None"

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
              {hasAllergies && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute -top-1 -right-1 h-5 w-5 bg-amber-400 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-3 w-3 text-white" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allergies: {member.allergies}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <span className="text-sm">{member.name}</span>
            <span className="text-xs text-gray-500">{member.relation}</span>
          </div>
        )
      })}

      <Link href="/profile?tab=family" className="flex flex-col items-center min-w-[72px]">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1 border-2 border-dashed border-gray-300">
          <Plus className="h-6 w-6 text-gray-400" />
        </div>
        <span className="text-sm text-gray-500">Add</span>
        <span className="text-xs text-gray-500">Member</span>
      </Link>
    </div>
  )
}
