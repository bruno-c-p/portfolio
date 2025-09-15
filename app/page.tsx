"use client"

import { useEffect, useRef, useState } from "react"
import Header from "@/components/Header"
import WorkExperience from "@/components/WorkExperience"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Component as EtheralShadow } from "@/components/ui/etheral-shadow"

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            const sectionIndex = sectionsRef.current.findIndex((section) => section === entry.target)
            if (sectionIndex !== -1) {
              setActiveSection(sectionIndex)
            }
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const handleSectionClick = (index: number) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <EtheralShadow 
          color="rgba(64, 64, 64, .8)"
          animation={{ 
            scale: 35, 
            speed: 90
          }}
          noise={{ 
            opacity: 1, 
            scale: 1.2
          }}
          sizing="fill"
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10">
        <Navigation activeSection={activeSection} onSectionClick={handleSectionClick} />

        <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
          <Header sectionsRef={sectionsRef} />
          <WorkExperience sectionsRef={sectionsRef} />
          <Projects sectionsRef={sectionsRef} />
          <Contact sectionsRef={sectionsRef} />
          <Footer />
        </main>

        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20"></div>
      </div>
    </div>
  )
}
