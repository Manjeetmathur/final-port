'use client'

import { personalInfo } from '@/lib/data/portfolio'
import { Button } from '@/components/ui/button'
import { Code, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { usePersonalName } from '@/lib/contexts/personal-name-context'

export function Hero() {
  const [copied, setCopied] = useState(false)
  const { name: dynamicName } = usePersonalName()
  const displayName = dynamicName || personalInfo.name || 'Your Name'

  const handleCopy = () => {
    navigator.clipboard.writeText(`npm install ${displayName.toLowerCase().replace(/\s+/g, '-')}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="border-b border-border py-5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_250px] lg:gap-12">
          <div className="space-y-8 min-w-0">
            <div id="introduction" className="space-y-4">
              <h1 className="font-mono text-4xl font-bold tracking-tight">
                {displayName}
              </h1>
              <p className="text-lg text-muted-foreground leading-7">
                {personalInfo.bio}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-mono text-2xl font-semibold">Installation</h2>
              <div className="relative">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-4 font-mono text-sm">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  <code className="flex-1">
                    npm install {displayName.toLowerCase().replace(/\s+/g, '-')}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-mono text-2xl font-semibold">Try it yourself</h2>
              <p className="text-sm text-muted-foreground">
                Open the terminal from the header button (⌘) to execute commands. Try: <code className="rounded bg-muted px-1.5 py-0.5">npm i your-name</code> or <code className="rounded bg-muted px-1.5 py-0.5">cd about</code>
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  )
}
