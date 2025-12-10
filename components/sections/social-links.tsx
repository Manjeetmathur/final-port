'use client'

import { PersonalInfo } from '@/lib/data/portfolio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Twitter, ExternalLink, Instagram } from 'lucide-react'
// import { Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'

interface SocialLinksProps {
  personalInfo: PersonalInfo
}

export function SocialLinks({ personalInfo }: SocialLinksProps) {
  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo.github,
      icon: Github,
      description: 'View my code repositories',
    },
    {
      name: 'LinkedIn',
      url: personalInfo.linkedin,
      icon: Linkedin,
      description: 'Connect on LinkedIn',
    },
    {
      name: 'Instagram',
      url: personalInfo.instagram,
      icon: Instagram,
      description: 'Follow on Instagram',
    },
    {
      name: 'Twitter',
      url: personalInfo.twitter,
      icon: Twitter,
      description: 'Follow on Twitter',
    },
    {
      name: 'Website',
      url: personalInfo.website,
      icon: ExternalLink,
      description: 'Visit my website',
    },
  ].filter((link) => link.url)

  if (socialLinks.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono">GET /social</CardTitle>
        <CardDescription>Social media and external links</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <Button
                key={link.name}
                variant="outline"
                className="justify-start"
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <Icon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="font-mono text-sm">{link.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {link.description}
                    </span>
                  </div>
                </a>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

