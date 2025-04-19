"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface DaySlots {
  date: string
  slots: TimeSlot[]
  isToday?: boolean
}

interface TimeSlotPickerProps {
  days: DaySlots[]
  selectedDate: string | null
  selectedTime: string | null
  onSelect: (date: string, time: string) => void
}

export function TimeSlotPicker({ days, selectedDate, selectedTime, onSelect }: TimeSlotPickerProps) {
  const [activeDate, setActiveDate] = useState<string | null>(selectedDate || days[0]?.date || null)

  const handleDateSelect = (date: string) => {
    setActiveDate(date)
    if (selectedTime) {
      onSelect(date, selectedTime)
    }
  }

  const handleTimeSelect = (time: string) => {
    if (activeDate) {
      onSelect(activeDate, time)
    }
  }

  const activeDaySlots = days.find((day) => day.date === activeDate)?.slots || []

  return (
    <div className="space-y-4">
      {/* Date selection */}
      <div>
        <h3 className="font-medium mb-2 flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-rose-600" />
          Select Date
        </h3>
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex space-x-2 p-1">
            {days.map((day) => (
              <Button
                key={day.date}
                variant={activeDate === day.date ? "default" : "outline"}
                className={`flex-shrink-0 ${
                  activeDate === day.date ? "bg-rose-600 hover:bg-rose-700" : "hover:bg-gray-100"
                } ${day.isToday ? "border-rose-300" : ""}`}
                onClick={() => handleDateSelect(day.date)}
              >
                <div className="text-center">
                  <div className="text-xs font-normal">{day.date.split(",")[0]}</div>
                  <div className="text-sm font-medium">{day.date.split(",")[1].trim()}</div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Time selection */}
      <div>
        <h3 className="font-medium mb-2">Select Time</h3>
        <div className="grid grid-cols-3 gap-2">
          {activeDaySlots.map((slot) => (
            <Button
              key={slot.id}
              variant={selectedTime === slot.time && activeDate === selectedDate ? "default" : "outline"}
              className={`w-full ${
                selectedTime === slot.time && activeDate === selectedDate
                  ? "bg-rose-600 hover:bg-rose-700"
                  : "hover:bg-gray-100"
              }`}
              disabled={!slot.available}
              onClick={() => handleTimeSelect(slot.time)}
            >
              {slot.time}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
