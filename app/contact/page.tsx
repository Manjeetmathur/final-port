'use client'

import * as React from 'react'
import { personalInfo } from '@/lib/data/portfolio'
import { ContactForm } from '@/components/sections/contact-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/page-layout'
import { Copy, Check } from 'lucide-react'
import { SocialLinks } from '@/components/sections/social-links'

const headings = [
  { id: 'overview', text: 'Overview', level: 2 },
  { id: 'form', text: 'Contact Form', level: 2 },
  { id: 'endpoints', text: 'Endpoints', level: 2 },
]

export default function ContactPage() {
  return (
    <PageLayout headings={headings}>
            <section id="overview" className="space-y-4">
              <h1 className="font-mono text-4xl font-bold">Contact</h1>
              <p className="text-lg leading-7 text-muted-foreground">
                Get in touch with me through the contact form or reach out via
                social media. I'm always open to discussing new projects and
                opportunities.
              </p>
            </section>

            <section id="form" className="space-y-4">
              <h2 className="font-mono text-3xl font-semibold">Contact Form</h2>
              <ContactForm />
            </section>

            <section id="endpoints" className="space-y-4">
              <h2 className="font-mono text-3xl font-semibold">Endpoints</h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono">GET /email</CardTitle>
                    <CardDescription>Primary contact email</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <code className="rounded bg-muted px-3 py-1.5 font-mono text-sm">
                        {personalInfo.email}
                      </code>
                      <CopyEmailButton email={personalInfo.email} />
                    </div>
                  </CardContent>
                </Card>

                <SocialLinks personalInfo={personalInfo} />
              </div>
            </section>
    </PageLayout>
  )
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  )
}

