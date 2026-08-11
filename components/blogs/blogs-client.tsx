'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/blogs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Calendar, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react'

interface BlogsClientProps {
  blogs: BlogPost[]
}

export function BlogsClient({ blogs }: BlogsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = useMemo(() => {
    const set = new Set<string>()
    blogs.forEach((blog) => {
      if (blog.category) set.add(blog.category)
    })
    return ['All', ...Array.from(set)]
  }, [blogs])

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase()

      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.tags.some((t) => t.toLowerCase().includes(query)) ||
        blog.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [blogs, searchQuery, selectedCategory])

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border border-border bg-card p-4 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles by title, tag, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="font-mono text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((blog) => (
            <Card
              key={blog.slug}
              className="group flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              <CardHeader className="space-y-3">
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
                  <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </CardTitle>

                <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                  {blog.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" size="sm" asChild className="w-full justify-between font-mono group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href={`/blogs/${blog.slug}`}>
                    Read Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-muted/20 p-12 text-center space-y-3">
          <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <h3 className="font-mono text-lg font-semibold">No articles found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            No blog posts matched your search criteria "{searchQuery}". Try adjusting your filters or search term.
          </p>
          <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="font-mono mt-2">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}
