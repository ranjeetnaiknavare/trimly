"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TimeSlot {
  time: string
  available: boolean
}

interface Day {
  date: string
  isToday: boolean
  slots: TimeSlot[]
}

interface TimeSlotPickerProps {
  days: Day[]
  selectedDate: string | null
  selectedTime: string | null
  onSelect: (date: string, time: string) => void
}

export function TimeSlotPicker({ days, selectedDate, selectedTime, onSelect }: TimeSlotPickerProps) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0)

  const currentDay = days[currentDayIndex]

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => Math.min(days.length - 1, prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Date Selector */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={handlePrevDay} disabled={currentDayIndex === 0}>
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="text-center">
          <p className="font-medium">{currentDay.date}</p>
          {currentDay.isToday && <span className="text-xs text-rose-600">Today</span>}
        </div>

        <Button variant="ghost" size="icon" onClick={handleNextDay} disabled={currentDayIndex === days.length - 1}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Time Slots */}
      <div className="bg-white rounded-lg border border-gray-100 p-3">
        <ScrollArea className="h-64">
          <div className="grid grid-cols-2 gap-2">
            {currentDay.slots.map((slot) => (
              <button
                key={slot.time}
                className={`p-2 rounded-md text-center ${
                  !slot.available
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : selectedDate === currentDay.date && selectedTime === slot.time
                      ? "bg-rose-100 text-rose-600 border border-rose-200"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
                disabled={!slot.available}
                onClick={() => onSelect(currentDay.date, slot.time)}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
