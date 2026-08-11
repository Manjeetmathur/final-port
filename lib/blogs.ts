import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  readTime: string
  tags: string[]
  category: string
  featured?: boolean
  pdfUrl?: string
  sequence?: number
  content: string
}

export interface BlogHeading {
  id: string
  text: string
  level: number
}

const blogsDirectory = path.join(process.cwd(), 'content', 'blogs')

export function extractHeadings(content: string): BlogHeading[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings: BlogHeading[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim().replace(/[*_~`]/g, '') // strip markdown inline formatting
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    headings.push({ id, text, level })
  }

  return headings
}

export function getAllBlogs(): BlogPost[] {
  if (!fs.existsSync(blogsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(blogsDirectory)
  const blogs = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const fullPath = path.join(blogsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || '2026-01-01',
        excerpt: data.excerpt || '',
        author: data.author || 'Manjeet Kumar',
        readTime: data.readTime || '5 min read',
        tags: Array.isArray(data.tags) ? data.tags : [],
        category: data.category || 'General',
        featured: Boolean(data.featured),
        pdfUrl: data.pdfUrl || undefined,
        sequence: data.sequence !== undefined ? Number(data.sequence) : undefined,
        content,
      } as BlogPost
    })

  // Sort blogs by sequence ascending first, then by date descending
  return blogs.sort((a, b) => {
    if (a.sequence !== undefined && b.sequence !== undefined) {
      return a.sequence - b.sequence
    }
    if (a.sequence !== undefined) return -1
    if (b.sequence !== undefined) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getBlogBySlug(slug: string): { blog: BlogPost; headings: BlogHeading[] } | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const blog: BlogPost = {
      slug,
      title: data.title || slug,
      date: data.date || '2026-01-01',
      excerpt: data.excerpt || '',
      author: data.author || 'Manjeet Kumar',
      readTime: data.readTime || '5 min read',
      tags: Array.isArray(data.tags) ? data.tags : [],
      category: data.category || 'General',
      featured: Boolean(data.featured),
      pdfUrl: data.pdfUrl || undefined,
      sequence: data.sequence !== undefined ? Number(data.sequence) : undefined,
      content,
    }

    const headings = extractHeadings(content)

    return { blog, headings }
  } catch (error) {
    console.error(`Error loading blog for slug ${slug}:`, error)
    return null
  }
}
