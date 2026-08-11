import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogBySlug, getAllBlogs } from '@/lib/blogs'
import { PageLayout } from '@/components/layout/page-layout'
import { MarkdownRenderer } from '@/components/blogs/markdown-renderer'
import { PdfViewer } from '@/components/blogs/pdf-viewer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calendar, Clock, User, Tag, BookOpen } from 'lucide-react'

interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const blogs = getAllBlogs()
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params
  const result = getBlogBySlug(slug)
  if (!result) return { title: 'Article Not Found' }

  return {
    title: `${result.blog.title} | Blog`,
    description: result.blog.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params
  const result = getBlogBySlug(slug)

  if (!result) {
    notFound()
  }

  const { blog, headings } = result

  return (
    <PageLayout headings={headings}>
      <article className="space-y-8">
        {/* Navigation & Header */}
        <div className="space-y-6">
          <Button variant="ghost" size="sm" asChild className="font-mono hover:bg-muted">
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all blogs
            </Link>
          </Button>

          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="font-mono text-xs border-primary text-primary">
                {blog.category}
              </Badge>
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-mono text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground font-mono pt-2">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" />
                {blog.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {blog.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Optional PDF Document Viewer */}
        {blog.pdfUrl && (
          <PdfViewer url={blog.pdfUrl} title={blog.title} fullPage={true} />
        )}

        {/* Rendered Markdown Body */}
        <MarkdownRenderer content={blog.content} />

        <Separator className="mt-12" />

        {/* Bottom Footer Actions */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" size="sm" asChild className="font-mono">
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
            </Link>
          </Button>
        </div>
      </article>
    </PageLayout>
  )
}
