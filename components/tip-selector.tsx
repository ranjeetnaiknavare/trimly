"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TipSelectorProps {
  selectedAmount: number
  onChange: (amount: number) => void
  baseAmount: number
}

export function TipSelector({ selectedAmount, onChange, baseAmount }: TipSelectorProps) {
  const [customTip, setCustomTip] = useState<string>("")
  const [isCustom, setIsCustom] = useState(false)

  // Calculate percentage tips
  const tipOptions = [
    { percent: 0, label: "No Tip" },
    { percent: 5, label: "5%" },
    { percent: 10, label: "10%" },
    { percent: 15, label: "15%" },
  ]

  const handleTipSelect = (percent: number) => {
    setIsCustom(false)
    const amount = Math.round((baseAmount * percent) / 100)
    onChange(amount)
  }

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomTip(value)

    if (value) {
      const numValue = Number.parseInt(value, 10)
      if (!isNaN(numValue)) {
        setIsCustom(true)
        onChange(numValue)
      }
    } else {
      onChange(0)
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {tipOptions.map((option) => (
          <Button
            key={option.percent}
            variant={
              selectedAmount === Math.round((baseAmount * option.percent) / 100) && !isCustom ? "default" : "outline"
            }
            className={
              selectedAmount === Math.round((baseAmount * option.percent) / 100) && !isCustom
                ? "bg-rose-600 hover:bg-rose-700"
                : ""
            }
            onClick={() => handleTipSelect(option.percent)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant={isCustom ? "default" : "outline"}
          className={isCustom ? "bg-rose-600 hover:bg-rose-700" : ""}
          onClick={() => {
            setIsCustom(true)
            if (customTip) {
              onChange(Number.parseInt(customTip, 10))
            }
          }}
        >
          Custom
        </Button>
        <Input
          type="number"
          placeholder="Enter amount"
          value={customTip}
          onChange={handleCustomTipChange}
          className="flex-1"
          min="0"
        />
      </div>

      {selectedAmount > 0 && (
        <p className="text-sm text-gray-600">
          You're adding a tip of ₹{selectedAmount} ({((selectedAmount / baseAmount) * 100).toFixed(1)}%)
        </p>
      )}
    </div>
  )
}
