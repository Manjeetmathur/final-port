import { experiences } from '@/lib/data/portfolio'
import { ExperienceCard } from '@/components/sections/experience-card'
import { TableOfContents } from '@/components/layout/table-of-contents'
import { Breadcrumb } from '@/components/layout/breadcrumb'

const headings = [
  { id: 'overview', text: 'Overview', level: 2 },
  { id: 'positions', text: 'Positions', level: 2 },
]

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <Breadcrumb />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_250px] lg:gap-12 lg:items-start">
          <div className="space-y-12 min-w-0">
            <section id="overview" className="space-y-4">
              <h1 className="font-mono text-4xl font-bold">Experience</h1>
              <p className="text-lg leading-7 text-muted-foreground">
                Professional experience presented in an API documentation style.
                Each position includes parameters, descriptions, and tech stack.
              </p>
            </section>

            <section id="positions" className="space-y-4">
              <h2 className="font-mono text-3xl font-semibold">Positions</h2>
              <div className="space-y-6">
                {experiences.length > 0 ? (
                  experiences.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))
                ) : (
                  <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                    <p className="text-muted-foreground">
                      No experience entries yet. Update the data in{' '}
                      <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                        lib/data/portfolio.ts
                      </code>
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <TableOfContents headings={headings} />
        </div>
      </div>
    </div>
  )
}

