import React from "react"
import { ArrowUpRight } from "lucide-react"

interface ProjectsProps {
  sectionsRef: React.RefObject<(HTMLElement | null)[]>
}

interface Project {
  title: string
  excerpt: string
  date: string
  href: string
}

const projects: Project[] = [
  {
    title: "Wild West Vibes",
    excerpt: "A moody dark theme that harmonizes subdued cool and warm hues, drawing inspiration from Western landscapes.",
    date: "2025",
    href: "https://marketplace.visualstudio.com/items?itemName=BrunoCardozo.wild-west-vibes-theme",
  },
]

const ProjectCard = ({ project }: { project: Project }) => (
  <article className="group border-b border-border/50 pb-6 sm:pb-8 hover:border-border transition-colors duration-500">
    <a href={project.href} target="_blank" rel="noopener noreferrer" className="block space-y-3 sm:space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl sm:text-2xl font-light group-hover:text-muted-foreground transition-colors duration-500">
          {project.title}
        </h3>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-1" />
      </div>

      <p className="text-muted-foreground leading-relaxed max-w-2xl">{project.excerpt}</p>

    </a>
  </article>
)

export default function Projects({ sectionsRef }: ProjectsProps) {
  return (
    <section
      id="projects"
      ref={(el) => {
        sectionsRef.current[2] = el
      }}
      className="min-h-screen py-20 sm:py-32 opacity-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Recent Projects</h2>
          <div className="text-sm text-muted-foreground font-mono">2025</div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}