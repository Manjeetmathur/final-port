import { skills } from '@/lib/data/portfolio'
import { SkillCard } from '@/components/sections/skill-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TableOfContents } from '@/components/layout/table-of-contents'
import { Breadcrumb } from '@/components/layout/breadcrumb'

const headings = [
  { id: 'overview', text: 'Overview', level: 2 },
  { id: 'categories', text: 'Categories', level: 2 },
]

const categories = ['Frontend', 'Backend', 'Tools', 'Other'] as const

export default function SkillsPage() {
  const skillsByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = skills.filter((skill) => skill.category === category)
      return acc
    },
    {} as Record<string, typeof skills>
  )

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <Breadcrumb />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_250px] lg:gap-12 lg:items-start">
          <div className="space-y-12 min-w-0">
            <section id="overview" className="space-y-4">
              <h1 className="font-mono text-4xl font-bold">Skills</h1>
              <p className="text-lg leading-7 text-muted-foreground">
                Technical skills organized by category with proficiency levels.
              </p>
            </section>

            <section id="categories" className="space-y-4">
              <h2 className="font-mono text-3xl font-semibold">Categories</h2>
              <Tabs defaultValue="Frontend" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {categories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-6">
                    {skillsByCategory[category].length > 0 ? (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {skillsByCategory[category].map((skill, idx) => (
                          <SkillCard key={`${category}-${idx}`} skill={skill} />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                        <p className="text-muted-foreground">
                          No skills in this category yet. Update the data in{' '}
                          <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                            lib/data/portfolio.ts
                          </code>
                        </p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </div>

          <TableOfContents headings={headings} />
        </div>
      </div>
    </div>
  )
}

