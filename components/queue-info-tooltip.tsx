"use client"

import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function QueueInfoTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
        </TooltipTrigger>
        <TooltipContent side="top" align="center" className="max-w-xs">
          <p>
            Our virtual queue system lets you join remotely and arrive just in time for your service. You'll receive
            notifications as your turn approaches.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
