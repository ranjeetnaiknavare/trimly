import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AgentRegistrationBanner() {
  return (
    <div className="bg-gradient-to-r from-rose-50 to-rose-100 border border-rose-200 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h3 className="font-bold text-lg text-rose-800">Become a Trimly Agent</h3>
        <p className="text-rose-700 mt-1">Earn commission by onboarding local businesses to Trimly platform</p>
      </div>
      <Button asChild className="bg-rose-600 hover:bg-rose-700 whitespace-nowrap">
        <Link href="/agent/register">
          Register as Agent
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
