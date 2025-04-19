import Link from "next/link"
import { Users } from "lucide-react"

export function AgentNavItem() {
  return (
    <Link
      href="/business/agents"
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <Users className="h-5 w-5" />
      <span>Agents</span>
    </Link>
  )
}
