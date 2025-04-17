import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RegistrationSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Registration Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your business has been successfully registered with Trimly. We're excited to have you on board!
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h2 className="font-semibold mb-2">What happens next?</h2>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="bg-rose-100 text-rose-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                  1
                </span>
                <span>Our team will review your business details within 24-48 hours.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-rose-100 text-rose-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                  2
                </span>
                <span>You'll receive an email confirmation once your business is approved.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-rose-100 text-rose-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                  3
                </span>
                <span>You can then log in to your business dashboard and start managing your salon.</span>
              </li>
            </ol>
          </div>
          <Link href="/business/login">
            <Button className="w-full bg-rose-600 hover:bg-rose-700 mb-4">
              Go to Business Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/business">
            <Button variant="outline" className="w-full">
              Return to Business Home
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@trimly.com</p>
        </div>
      </footer>
    </div>
  )
}
