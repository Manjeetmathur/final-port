import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { PersonalNameProvider } from '@/lib/contexts/personal-name-context'
import { PortfolioProvider } from '@/lib/contexts/portfolio-context'
import { TerminalProvider } from '@/lib/contexts/terminal-context'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Header } from '@/components/layout/header'
import { personalInfo } from '@/lib/data/portfolio'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Portfolio - Documentation Style',
  description: 'A unique documentation-style portfolio website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
          <PortfolioProvider>
            <PersonalNameProvider defaultName={personalInfo.name}>
              <TerminalProvider>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset>
                    <Header />
                    <main className="flex-1">{children}</main>
                  </SidebarInset>
                </SidebarProvider>
              </TerminalProvider>
            </PersonalNameProvider>
          </PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
