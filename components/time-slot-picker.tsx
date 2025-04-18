"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

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

export function TimeSlotPicker({ days = [], selectedDate, selectedTime, onSelect }: TimeSlotPickerProps) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0)

  // Ensure days is always an array, even if undefined is passed
  const safeDays = Array.isArray(days) ? days : []

  // Safely get the current day
  const currentDay = safeDays.length > 0 ? safeDays[currentDayIndex] : { date: "", slots: [], isToday: false }

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => Math.min(safeDays.length - 1, prev + 1))
  }

  // Safely get the slots for the selected date
  const selectedDaySlots = selectedDate ? safeDays.find((day) => day.date === selectedDate)?.slots || [] : []

  // Group time slots by morning, afternoon, and evening
  const morningSlots = selectedDaySlots.filter((slot) => {
    const hour = Number.parseInt(slot.time.split(":")[0])
    return hour < 12
  })

  const afternoonSlots = selectedDaySlots.filter((slot) => {
    const hour = Number.parseInt(slot.time.split(":")[0])
    const isPM = slot.time.includes("PM")
    return (hour === 12 || (hour >= 1 && hour < 5)) && isPM
  })

  const eveningSlots = selectedDaySlots.filter((slot) => {
    const hour = Number.parseInt(slot.time.split(":")[0])
    const isPM = slot.time.includes("PM")
    return hour >= 5 && isPM
  })

  // If there are no days, show a message
  if (safeDays.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="mx-auto h-8 w-8 mb-2 text-gray-400" />
        <p>No time slots available.</p>
        <p className="text-sm mt-1">Please try again later or contact the salon.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Select Date</h3>
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={handlePrevDay} disabled={currentDayIndex === 0}>
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="text-center">
            <p className="font-medium">{currentDay.date}</p>
            {currentDay.isToday && (
              <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200">
                Today
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextDay}
            disabled={currentDayIndex === safeDays.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Date pills for quick navigation */}
        <ScrollArea className="w-full" orientation="horizontal">
          <div className="flex space-x-2 py-2">
            {safeDays.map((day, index) => (
              <button
                key={index}
                className={`px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  index === currentDayIndex
                    ? "bg-rose-100 text-rose-600 font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setCurrentDayIndex(index)
                  onSelect(day.date, "")
                }}
              >
                {day.date.split(", ")[0]}
                {day.isToday && <span className="ml-1">•</span>}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {selectedDate && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Select Time</h3>
            <div className="flex items-center text-xs space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                <span>Unavailable</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {morningSlots.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-2">Morning</h4>
                <div className="grid grid-cols-3 gap-2">
                  {morningSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant="outline"
                      disabled={!slot.available}
                      className={`${
                        selectedTime === slot.time
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : slot.available
                            ? "bg-white hover:bg-gray-50"
                            : "bg-gray-50 text-gray-400"
                      }`}
                      onClick={() => slot.available && onSelect(selectedDate, slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {afternoonSlots.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-2">Afternoon</h4>
                <div className="grid grid-cols-3 gap-2">
                  {afternoonSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant="outline"
                      disabled={!slot.available}
                      className={`${
                        selectedTime === slot.time
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : slot.available
                            ? "bg-white hover:bg-gray-50"
                            : "bg-gray-50 text-gray-400"
                      }`}
                      onClick={() => slot.available && onSelect(selectedDate, slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {eveningSlots.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-2">Evening</h4>
                <div className="grid grid-cols-3 gap-2">
                  {eveningSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant="outline"
                      disabled={!slot.available}
                      className={`${
                        selectedTime === slot.time
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : slot.available
                            ? "bg-white hover:bg-gray-50"
                            : "bg-gray-50 text-gray-400"
                      }`}
                      onClick={() => slot.available && onSelect(selectedDate, slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {selectedDaySlots.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                <p>No time slots available for this date.</p>
                <p className="text-sm mt-1">Please select another date.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
