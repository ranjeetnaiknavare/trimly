import { Scissors, SpadeIcon as Spa, MessageSquare, Brush } from "lucide-react"

interface CategoryPillProps {
  icon: string
  label: string
  active?: boolean
}

export function CategoryPill({ icon, label, active = false }: CategoryPillProps) {
  const getIcon = () => {
    switch (icon) {
      case "scissors":
        return <Scissors className="w-4 h-4" />
      case "spa":
        return <Spa className="w-4 h-4" />
      case "massage":
        return <MessageSquare className="w-4 h-4" />
      case "hair":
        return <Scissors className="w-4 h-4" />
      case "beauty":
        return <Brush className="w-4 h-4" />
      default:
        return <Scissors className="w-4 h-4" />
    }
  }

  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium ${
        active ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {getIcon()}
      <span>{label}</span>
    </button>
  )
}
