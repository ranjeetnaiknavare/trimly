import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface QueueInfoTooltipProps {
  size?: "sm" | "md" | "lg"
}

export function QueueInfoTooltip({ size = "md" }: QueueInfoTooltipProps) {
  const sizeClasses = {
    sm: "h-3 w-3 ml-1",
    md: "h-4 w-4 ml-1",
    lg: "h-5 w-5 ml-1",
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center">
            <InfoIcon className={sizeClasses[size]} />
            <span className="sr-only">How Queue Works</span>
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">
            Join our virtual queue system to avoid waiting at the salon. You'll receive notifications as your turn
            approaches.
          </p>
          <a href="/queue-system" className="text-xs text-rose-600 block mt-1">
            Learn how our queue system works
          </a>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
