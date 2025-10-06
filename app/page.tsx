"use client"

import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import Header from "@/components/Header"
import WorkExperience from "@/components/WorkExperience"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Squares } from "@/components/ui/squares-background"

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    // Ensure Lenis is initialized (fallback if not in layout)
    if (!(window as any).lenis) {
      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      })
      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
      ;(window as any).lenis = lenis
    }

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
    const el = sectionsRef.current[index]
    const lenis = (window as any).lenis as InstanceType<typeof Lenis> | undefined
    if (el && lenis) {
      lenis.scrollTo(el, { offset: 0 })
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Squares className="w-full h-full opacity-15"           
          direction="diagonal"
          speed={0.25}
          squareSize={50}
        />
      </div>

      <div className="relative z-10">
        <Navigation activeSection={activeSection} onSectionClick={handleSectionClick} />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16">
          <Header sectionsRef={sectionsRef} />
          <WorkExperience sectionsRef={sectionsRef} />
          <Projects sectionsRef={sectionsRef} />
          <Contact sectionsRef={sectionsRef} />
          <Footer />
        </main>
      </div>
    </div>
  )
}
