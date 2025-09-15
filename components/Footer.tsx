import React from "react"

export default function Footer() {
  return (
    <footer className="py-12 sm:py-16 border-t border-border/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
        <div>© 2025 Bruno Cardozo. All rights reserved.</div>
        <div>Built with v0, 21st.dev, Next.js & Tailwind CSS</div>
      </div>
    </footer>
  )
}