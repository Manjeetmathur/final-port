'use client'

import { ReactNode } from 'react'
import { TableOfContents } from '@/components/layout/table-of-contents'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { WelcomeToast } from '@/components/welcome-toast'
import { Hero } from '@/components/sections/hero'
import { useTerminal } from '@/lib/contexts/terminal-context'

interface Heading {
  id: string
  text: string
  level: number
}

interface PageLayoutProps {
  children: ReactNode
  headings: Heading[]
  showBreadcrumb?: boolean
  showHero?: boolean
  showWelcomeToast?: boolean
}

export function PageLayout({
  children,
  headings,
  showBreadcrumb = true,
  showHero = false,
  showWelcomeToast = false
}: PageLayoutProps) {
  const { openTerminal } = useTerminal()

  return (
    <div className="min-h-screen">
      {showWelcomeToast && <WelcomeToast onOpenTerminal={openTerminal} />}
      <div className={`container mx-auto px-4 py-16 md:px-6 ${showHero ? 'max-w-6xl' : ''}`}>
        {showBreadcrumb && <Breadcrumb />}
        <div className={`mx-auto grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px] lg:gap-12 ${showHero ? '' : 'max-w-6xl'} lg:items-start`}>
          {showHero ? (
            <>
              <Hero />
              <TableOfContents headings={headings} />
            </>
          ) : (
            <>
              <div className="space-y-12 min-w-0">{children}</div>
              <TableOfContents headings={headings} />
            </>
          )}
        </div>
        {showHero && (
          <div className="space-y-12 min-w-0 mt-8">{children}</div>
        )}
      </div>
    </div>
  )
}

