import { Award, Calendar, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface IncentivesCardProps {
  dailyOnboardings: number
  weeklyOnboardings: number
}

export function IncentivesCard({ dailyOnboardings, weeklyOnboardings }: IncentivesCardProps) {
  // Calculate progress percentages
  const dailyTargetProgress = Math.min((dailyOnboardings / 10) * 100, 100)
  const weeklyTargetProgress = Math.min((weeklyOnboardings / 20) * 100, 100)

  // Determine if targets are reached
  const dailyTarget5Reached = dailyOnboardings >= 5
  const dailyTarget10Reached = dailyOnboardings >= 10
  const weeklyTarget20Reached = weeklyOnboardings >= 20

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incentives & Targets</CardTitle>
        <CardDescription>Track your progress towards earning bonuses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-rose-600" />
              <span className="font-medium">Today's Onboardings</span>
            </div>
            <span className="font-medium">{dailyOnboardings}/10</span>
          </div>
          <Progress value={dailyTargetProgress} className="h-2" />
          <div className="flex justify-between text-sm mt-1">
            <div className={dailyTarget5Reached ? "text-green-600 font-medium" : "text-gray-500"}>
              {dailyTarget5Reached ? "✓ " : ""}5+ Bonus (₹100)
            </div>
            <div className={dailyTarget10Reached ? "text-green-600 font-medium" : "text-gray-500"}>
              {dailyTarget10Reached ? "✓ " : ""}10+ Bonus (₹200)
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-rose-600" />
              <span className="font-medium">This Week's Onboardings</span>
            </div>
            <span className="font-medium">{weeklyOnboardings}/20</span>
          </div>
          <Progress value={weeklyTargetProgress} className="h-2" />
          <div className="flex justify-between text-sm mt-1">
            <div className={weeklyTarget20Reached ? "text-green-600 font-medium" : "text-gray-500"}>
              {weeklyTarget20Reached ? "✓ " : ""}20+ Weekly Goal
            </div>
            <div className="text-gray-500">Payout: Next Monday</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-sm text-blue-800">
          <div className="flex items-start gap-2">
            <Award className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1">Tip: Maximize Your Earnings</p>
              <p>
                Focus on high-density areas with multiple salons and spas. Schedule your visits during non-peak hours
                when owners are less busy.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
