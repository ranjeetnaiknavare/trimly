import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QueueSystemExplainer } from "@/components/queue-system-explainer"

export default function QueueSystemPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Virtual Queue System</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <QueueSystemExplainer />

        <div className="mt-8 flex justify-center">
          <Link href="/explore">
            <Button className="bg-rose-600 hover:bg-rose-700">Find Salons with Queue System</Button>
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container text-center text-sm text-gray-500">
          <p>© 2023 Trimly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
