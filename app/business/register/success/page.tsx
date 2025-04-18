"use client"

import Link from "next/link"
import { CheckCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrimlyLogo } from "@/components/trimly-logo"

export default function RegistrationSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container flex items-center justify-center h-16 px-4">
          <TrimlyLogo size="sm" />
        </div>
      </header>

      <main className="flex-1 container max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <div className="bg-green-100 rounded-full p-6 mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
        <p className="text-gray-600 mb-8">
          Your business is now registered with Trimly. You're just a few steps away from getting discovered by
          customers.
        </p>

        <div className="w-full space-y-4">
          <Link href="/business/register/complete">
            <Button className="w-full bg-rose-600 hover:bg-rose-700">
              Complete Your Profile
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/business/dashboard">
            <Button variant="outline" className="w-full">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@trimly.com</p>
        </div>
      </footer>
    </div>
  )
}
