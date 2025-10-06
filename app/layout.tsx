import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"
import LenisProvider from "@/components/LenisProvider"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Bruno Cardozo - Backend Software Engineer",
  description: "Product-oriented Backend Software Engineer with 4+ years of enterprise experience building scalable and efficient systems. Based in Brazil.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">
        <LenisProvider />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
