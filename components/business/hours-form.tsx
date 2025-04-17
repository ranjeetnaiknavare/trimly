"use client"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BusinessHour {
  open: string
  close: string
  isOpen: boolean
}

interface BusinessHours {
  monday: BusinessHour
  tuesday: BusinessHour
  wednesday: BusinessHour
  thursday: BusinessHour
  friday: BusinessHour
  saturday: BusinessHour
  sunday: BusinessHour
}

interface BusinessHoursFormProps {
  formData: {
    hours: BusinessHours
  }
  updateFormData: (data: Partial<{ hours: BusinessHours }>) => void
}

export function BusinessHoursForm({ formData, updateFormData }: BusinessHoursFormProps) {
  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ] as const

  const timeSlots = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4)
    const minute = (i % 4) * 15
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return {
      value: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
      label: `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`,
    }
  })

  const updateHours = (day: keyof BusinessHours, field: keyof BusinessHour, value: string | boolean) => {
    const updatedHours = { ...formData.hours }
    updatedHours[day] = {
      ...updatedHours[day],
      [field]: value,
    }
    updateFormData({ hours: updatedHours })
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-600">
          Set your business hours so customers know when they can visit or book appointments. Toggle the switch to mark
          days when your business is closed.
        </p>
      </div>

      {days.map((day) => (
        <div key={day.key} className="flex items-center justify-between p-2 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <Label htmlFor={`${day.key}-switch`} className="w-24 font-medium">
              {day.label}
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id={`${day.key}-switch`}
                checked={formData.hours[day.key].isOpen}
                onCheckedChange={(checked) => updateHours(day.key, "isOpen", checked)}
              />
              <span className="text-sm text-gray-500">{formData.hours[day.key].isOpen ? "Open" : "Closed"}</span>
            </div>
          </div>

          {formData.hours[day.key].isOpen && (
            <div className="flex items-center space-x-2">
              <Select
                value={formData.hours[day.key].open}
                onValueChange={(value) => updateHours(day.key, "open", value)}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Opening" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={`${day.key}-open-${time.value}`} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-gray-500">to</span>

              <Select
                value={formData.hours[day.key].close}
                onValueChange={(value) => updateHours(day.key, "close", value)}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Closing" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={`${day.key}-close-${time.value}`} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
