'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href: string
}

export function Breadcrumb() {
  const pathname = usePathname()
  const [items, setItems] = React.useState<BreadcrumbItem[]>([])

  React.useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
    ]

    if (pathSegments.length > 0) {
      pathSegments.forEach((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/')
        const label = segment.charAt(0).toUpperCase() + segment.slice(1)
        breadcrumbItems.push({ label, href })
      })
    }

    setItems(breadcrumbItems)
  }, [pathname])

  if (items.length <= 1) return null

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <React.Fragment key={item.href}>
            {index === 0 ? (
              <Link
                href={item.href}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'hover:text-foreground transition-colors',
                  isLast && 'text-foreground font-medium'
                )}
              >
                {item.label}
              </Link>
            )}
            {!isLast && (
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

