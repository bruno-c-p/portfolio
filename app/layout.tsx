import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Script from "next/script";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Bruno Cardozo - Fullstack Software Engineer",
  description:
    "Product-oriented Fullstack Software Engineer with 5 years of experience building scalable and efficient systems. Based in Brazil.",
  keywords: [
    "Bruno Cardozo",
    "Fullstack Software Engineer",
    "Backend Software Engineer",
    "Product-oriented",
    "NodeJS",
    "React",
    "AWS",
    "TypeScript",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="40ffa117bd9e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
