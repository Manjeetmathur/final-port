'use client'

import { Hero } from '@/components/sections/hero'
import { TableOfContents } from '@/components/layout/table-of-contents'
import { WelcomeToast } from '@/components/welcome-toast'
import { useTerminal } from '@/lib/contexts/terminal-context'

const headings = [
  { id: 'introduction', text: 'Introduction', level: 1 },
  { id: 'getting-started', text: 'Getting Started', level: 2 },
  { id: 'overview', text: 'Overview', level: 2 },
]

export default function Home() {
  const { openTerminal } = useTerminal()

  return (
    <div className="min-h-screen">
      <WelcomeToast onOpenTerminal={openTerminal} />
      <div className="container mx-auto px-4 py-16 md:px-6 max-w-6xl">
        <div className="mx-auto grid  grid-cols-1 gap-8 lg:grid-cols-[1fr_250px] lg:gap-12">
         
          <Hero />
          <TableOfContents headings={headings} />
        </div>
        <div className="space-y-12 min-w-0 mt-8">
            <section id="getting-started" className="space-y-4">
              <h2 className="font-mono text-3xl font-semibold">Getting Started</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-7">
                  Welcome to my portfolio documentation. This site provides an overview
                  of my professional experience, projects, and technical skills.
                </p>
                <p className="leading-7">
                  Use the sidebar navigation to explore different sections of the portfolio.
                </p>
              </div>
            </section>

            <section id="overview" className="space-y-4">
              <h2 className="font-mono text-3xl font-semibold">Overview</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-7">
                  This portfolio is organized into several sections:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong className="text-foreground">About</strong> - Background and education</li>
                  <li><strong className="text-foreground">Experience</strong> - Professional work history</li>
                  <li><strong className="text-foreground">Projects</strong> - Portfolio of work</li>
                  <li><strong className="text-foreground">Skills</strong> - Technical competencies</li>
                  <li><strong className="text-foreground">Contact</strong> - Get in touch</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
}
