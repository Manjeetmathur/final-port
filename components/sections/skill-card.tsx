import { Skill } from '@/lib/data/portfolio'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SkillCardProps {
  skill: Skill
}

const proficiencyColors = {
  Beginner: 'bg-blue-500/20 text-blue-500',
  Intermediate: 'bg-yellow-500/20 text-yellow-500',
  Advanced: 'bg-orange-500/20 text-orange-500',
  Expert: 'bg-green-500/20 text-green-500',
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/50 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-base">{skill.name}</CardTitle>
          <Badge
            variant="secondary"
            className={cn('font-mono text-xs', proficiencyColors[skill.proficiency])}
          >
            {skill.proficiency}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  )
}

