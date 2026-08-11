import Link from 'next/link'
import { PageLayout } from '@/components/layout/page-layout'
import { getAllBlogs } from '@/lib/blogs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'

const headings = [
  { id: 'introduction', text: 'Introduction', level: 1 },
  { id: 'getting-started', text: 'Getting Started', level: 2 },
  { id: 'featured-blogs', text: 'Featured Blogs', level: 2 },
  { id: 'overview', text: 'Overview', level: 2 },
]

export default function Home() {
  const blogs = getAllBlogs()
  const featuredBlogs = blogs.filter((b) => b.featured).slice(0, 2)
  const displayBlogs = featuredBlogs.length > 0 ? featuredBlogs : blogs.slice(0, 2)

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
            of my professional experience, projects, technical skills, and technical articles.
          </p>
          <p className="leading-7">
            Use the sidebar navigation to explore different sections of the portfolio.
          </p>
        </div>
      </section>

      <section id="featured-blogs" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-mono text-3xl font-semibold flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              Featured Articles
            </h2>
            <p className="text-muted-foreground">
              Recent technical writeups, tutorials, and system design guides.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="hidden sm:flex font-mono">
            <Link href="/blogs">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayBlogs.map((blog) => (
            <Card key={blog.slug} className="group flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {blog.readTime}
                  </span>
                </div>
                <CardTitle className="font-mono text-xl group-hover:text-primary transition-colors">
                  <Link href={`/blogs/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {blog.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" asChild className="w-full justify-between font-mono hover:bg-muted">
                  <Link href={`/blogs/${blog.slug}`}>
                    Read Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="sm:hidden text-center pt-2">
          <Button variant="outline" size="sm" asChild className="w-full font-mono">
            <Link href="/blogs">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
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
            <li><strong className="text-foreground">Blogs</strong> - Technical articles and guides</li>
            <li><strong className="text-foreground">Contact</strong> - Get in touch</li>
          </ul>
        </div>
      </section>
    </PageLayout>
  )
}
