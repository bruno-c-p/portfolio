import React from "react"

interface NavigationProps {
  activeSection: number
  onSectionClick: (index: number) => void
}

interface Section {
  id: string
  label: string
}

const sections: Section[] = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Connect" },
]

const NavigationItem = ({ 
  section, 
  index, 
  isActive, 
  onClick 
}: { 
  section: Section
  index: number
  isActive: boolean
  onClick: (index: number) => void
}) => (
  <button
    key={section.id}
    onClick={() => onClick(index)}
    className="group flex items-center gap-3 text-sm transition-colors duration-300"
  >
    <div
      className={`w-8 h-px transition-all duration-300 ${
        isActive
          ? "bg-foreground"
          : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
      }`}
    />
    <span
      className={`transition-colors duration-300 ${
        isActive
          ? "text-foreground"
          : "text-muted-foreground/60 group-hover:text-muted-foreground"
      }`}
    >
      {section.label}
    </span>
  </button>
)

export default function Navigation({ activeSection, onSectionClick }: NavigationProps) {
  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="space-y-4">
        {sections.map((section, index) => (
          <NavigationItem
            key={section.id}
            section={section}
            index={index}
            isActive={activeSection === index}
            onClick={onSectionClick}
          />
        ))}
      </div>
    </nav>
  )
}