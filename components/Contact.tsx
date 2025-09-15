import React from "react"
import { ArrowUpRight } from "lucide-react"
import { toast } from "sonner"

interface ContactProps {
  sectionsRef: React.RefObject<(HTMLElement | null)[]>
}

interface SocialLink {
  platform: string
  handle: string
  url: string
}

const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    handle: "@bruno-c-p",
    url: "https://github.com/bruno-c-p",
  },
  {
    platform: "LinkedIn",
    handle: "@bruno-cardozo",
    url: "https://www.linkedin.com/in/bruno-cardozo-pereira/",
  },
]

const SocialLinkCard = ({ link }: { link: SocialLink }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-between p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300"
  >
    <div className="space-y-1">
      <div className="font-medium">{link.platform}</div>
      <div className="text-sm text-muted-foreground">{link.handle}</div>
    </div>
    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
  </a>
)

export default function Contact({ sectionsRef }: ContactProps) {
  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('dev@brunocardozo.com.br')
      toast.success('Email copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy email: ', err)
      toast.error('Failed to copy email')
    }
  }

  return (
    <section
      id="connect"
      ref={(el) => {
        sectionsRef.current[3] = el
      }}
      className="min-h-screen py-20 sm:py-32 opacity-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl sm:text-4xl font-light">Let&apos;s Connect</h2>
          <div className="max-w-lg">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Always interested in new opportunities and collaborations. Feel free to reach out.
            </p>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">EMAIL</div>
            <button
              onClick={handleEmailClick}
              className="text-2xl sm:text-3xl font-light hover:text-muted-foreground transition-colors duration-300 cursor-pointer text-left"
            >
              dev@brunocardozo.com.br
            </button>
          </div>

          <div className="space-y-6">
            <div className="text-sm text-muted-foreground font-mono">SOCIAL</div>
            <div className="grid sm:grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <SocialLinkCard key={index} link={link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}