import { getAllBlogs } from '@/lib/blogs'
import { BlogsClient } from '@/components/blogs/blogs-client'
import { PageLayout } from '@/components/layout/page-layout'

export const metadata = {
  title: 'Blogs | Technical Articles & Tutorials',
  description: 'Explore technical writeups, tutorials, and guides on web development, React, Next.js, and system design by Manjeet Kumar.',
}

const headings = [
  { id: 'overview', text: 'Overview', level: 2 },
  { id: 'articles', text: 'Articles', level: 2 },
]

export default function BlogsPage() {
  const blogs = getAllBlogs()

  return (
    <PageLayout headings={headings}>
      <section id="overview" className="space-y-4">
        <h1 className="font-mono text-4xl font-bold">Blogs</h1>
        <p className="text-lg leading-7 text-muted-foreground">
          A collection of technical articles, deep dives, tutorials, and engineering notes
          on modern web development, TypeScript, system design, and software architecture.
        </p>
      </section>

      <section id="articles" className="space-y-6">
        <h2 className="font-mono text-3xl font-semibold">Articles</h2>
        <BlogsClient blogs={blogs} />
      </section>
    </PageLayout>
  )
}
