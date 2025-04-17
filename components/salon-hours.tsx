interface SalonHoursProps {
  hours: {
    day: string
    hours: string
  }[]
}

export function SalonHours({ hours }: SalonHoursProps) {
  // Get current day
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" })

  return (
    <div className="space-y-2">
      {hours.map((item) => (
        <div
          key={item.day}
          className={`flex justify-between text-sm ${
            item.day === today ? "font-medium text-rose-600" : "text-gray-600"
          }`}
        >
          <span>{item.day}</span>
          <span>{item.hours}</span>
        </div>
      ))}
    </div>
  )
}
