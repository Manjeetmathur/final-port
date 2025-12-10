import { projects } from '@/lib/data/portfolio'
import { ProjectCard } from '@/components/sections/project-card'
import { PageLayout } from '@/components/layout/page-layout'

const headings = [
  { id: 'overview', text: 'Overview', level: 2 },
  { id: 'packages', text: 'Packages', level: 2 },
]

export default function ProjectsPage() {
  return (
    <PageLayout headings={headings}>
            <section id="overview" className="space-y-4">
              <h1 className="font-mono text-4xl font-bold">Projects</h1>
              <p className="text-lg leading-7 text-muted-foreground">
                A collection of projects presented as npm packages. Each project
                includes installation instructions, features, and tech stack.
              </p>
            </section>

            <section id="packages" className="space-y-4">
              <h2 className="font-mono text-3xl font-semibold">Packages</h2>
              <div className="space-y-6">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))
                ) : (
                  <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                    <p className="text-muted-foreground">
                      No projects yet. Update the data in{' '}
                      <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                        lib/data/portfolio.ts
                      </code>
                    </p>
                  </div>
                )}
              </div>
            </section>
    </PageLayout>
  )
}

