import { Experience } from '@/lib/data/portfolio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Building2 } from 'lucide-react'

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="mb-6 group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="font-mono text-xl">{experience.role}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {experience.company}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {experience.duration}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{experience.description}</p>

        <div>
          <h4 className="mb-2 font-mono text-sm font-semibold">Responsibilities</h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {experience.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </div>

        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className="mb-2 font-mono text-sm font-semibold">Achievements</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {experience.achievements.map((achievement, idx) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        <Separator />

        <div>
          <h4 className="mb-2 font-mono text-sm font-semibold">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {experience.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-mono">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

