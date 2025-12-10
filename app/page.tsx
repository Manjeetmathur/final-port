'use client'

import { PageLayout } from '@/components/layout/page-layout'

const headings = [
  { id: 'introduction', text: 'Introduction', level: 1 },
  { id: 'getting-started', text: 'Getting Started', level: 2 },
  { id: 'overview', text: 'Overview', level: 2 },
]

export default function Home() {
  return (
    <PageLayout
      headings={headings}
      showBreadcrumb={false}
      showHero={true}
    >
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
    </PageLayout>
  )
}
