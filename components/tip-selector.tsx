"use client"

import type React from "react"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface TipSelectorProps {
  onSelectTip?: (amount: number) => void
  onChange?: (amount: number) => void
  selectedTip?: number
  selectedAmount?: number
  baseAmount?: number
}

export function TipSelector({ onSelectTip, onChange, selectedTip, selectedAmount, baseAmount }: TipSelectorProps) {
  const [customTip, setCustomTip] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)

  // Use the appropriate prop or provide a fallback
  const handleTipSelect = onSelectTip || onChange || ((amount: number) => {})
  const tipAmount = selectedTip || selectedAmount || 0

  const predefinedTips = [
    { amount: 10, label: "₹10" },
    { amount: 30, label: "₹30" },
    { amount: 50, label: "₹50" },
  ]

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setCustomTip(value)
  }

  const handleCustomTipApply = () => {
    const amount = Number.parseInt(customTip, 10)
    if (!isNaN(amount) && amount > 0) {
      handleTipSelect(amount)
    }
  }

  const handlePredefinedTip = (amount: number) => {
    handleTipSelect(amount)
    setShowCustomInput(false)
  }

  const handleCustomTipClick = () => {
    setShowCustomInput(true)
    if (tipAmount > 0 && !predefinedTips.some((tip) => tip.amount === tipAmount)) {
      setCustomTip(tipAmount.toString())
    } else {
      setCustomTip("")
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Heart className="h-5 w-5 text-rose-500 mr-2" />
          <p className="font-medium">Support Trimly</p>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Your tip helps us improve Trimly and provide better service. Thank you for your support!
        </p>

        <div className="grid grid-cols-4 gap-2 mb-3">
          {predefinedTips.map((tip) => (
            <Button
              key={tip.amount}
              variant={tipAmount === tip.amount ? "default" : "outline"}
              className={tipAmount === tip.amount ? "bg-rose-600 hover:bg-rose-700" : ""}
              onClick={() => handlePredefinedTip(tip.amount)}
            >
              {tip.label}
            </Button>
          ))}
          <Button
            variant={showCustomInput ? "default" : "outline"}
            className={showCustomInput ? "bg-rose-600 hover:bg-rose-700" : ""}
            onClick={handleCustomTipClick}
          >
            Custom
          </Button>
        </div>

        {showCustomInput && (
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
              <Input
                className="pl-7"
                placeholder="Enter amount"
                value={customTip}
                onChange={handleCustomTipChange}
                type="text"
                inputMode="numeric"
              />
            </div>
            <Button onClick={handleCustomTipApply} className="bg-rose-600 hover:bg-rose-700">
              Apply
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
