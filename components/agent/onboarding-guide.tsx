import { CheckCircle2, ChevronRight, FileText, HelpCircle, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AgentOnboardingGuide() {
  const steps = [
    {
      title: "Watch Training Video",
      description: "Learn how to approach and onboard businesses",
      icon: <Video className="h-5 w-5 text-rose-600" />,
      completed: true,
    },
    {
      title: "Read Onboarding Guide",
      description: "Step-by-step process for successful onboarding",
      icon: <FileText className="h-5 w-5 text-rose-600" />,
      completed: true,
    },
    {
      title: "Complete Practice Quiz",
      description: "Test your knowledge of the Trimly platform",
      icon: <HelpCircle className="h-5 w-5 text-rose-600" />,
      completed: false,
    },
    {
      title: "Onboard Your First Business",
      description: "Apply what you've learned with your first onboarding",
      icon: <CheckCircle2 className="h-5 w-5 text-rose-600" />,
      completed: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Guide</CardTitle>
        <CardDescription>Complete these steps to become a successful agent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start p-3 rounded-md ${
                step.completed ? "bg-green-50 border border-green-100" : "bg-gray-50 border border-gray-200"
              }`}
            >
              <div
                className={`p-2 rounded-full mr-3 ${
                  step.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                }`}
              >
                {step.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {step.completed ? (
                <span className="text-green-600 font-medium text-sm">Completed</span>
              ) : (
                <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                  Start
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/agent/training" className="w-full">
          <Button variant="outline" className="w-full flex items-center justify-center gap-1">
            View All Training Materials
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
