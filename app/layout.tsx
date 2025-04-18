import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { BottomNav } from "@/components/bottom-nav"
import { AuthProvider } from "@/components/auth/auth-context"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trimly - Salon Booking & Management",
  description: "Book appointments at your favorite salon or manage your salon business with Trimly",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <main className="min-h-screen pb-16">{children}</main>
            <BottomNav />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
