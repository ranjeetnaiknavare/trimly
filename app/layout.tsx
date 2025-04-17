import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Men's Salons, Ladies Parlours, Spa & Massage Near Me — Book Instantly | Trimly",
  description:
    "Discover and book the best men's salons, ladies parlours, spas & massage studios near you in Pune. Join queues online and pay directly at the venue — all with Trimly.",
  manifest: "/manifest.json",
  themeColor: "#E11D48",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/icon-192x192.png" }],
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'