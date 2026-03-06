import type React from "react";
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "brunocardozo.dev",
  description:
    "Product-oriented Fullstack Software Engineer with 5 years of experience building scalable and efficient systems. Based in Brazil.",
  keywords: [
    "Bruno Cardozo",
    "Fullstack Software Engineer",
    "NodeJS",
    "React",
    "GCP",
    "TypeScript",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Kafka",
    "RabbitMQ",
    "Docker",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className={`${GeistMono.className} antialiased`}>
        {children}
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="40ffa117bd9e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
