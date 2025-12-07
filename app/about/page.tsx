import { personalInfo } from '@/lib/data/portfolio'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { TableOfContents } from '@/components/layout/table-of-contents'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Mail, MapPin } from 'lucide-react'

const headings = [
  { id: 'overview', text: 'Overview', level: 2 },
  { id: 'background', text: 'Background', level: 2 },
  { id: 'education', text: 'Education', level: 2 },
  { id: 'contact-info', text: 'Contact Information', level: 2 },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <Breadcrumb />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_250px] lg:gap-12 lg:items-start">
          <div className="space-y-12 min-w-0">
            <section id="overview" className="space-y-4">
              <h1 className="font-mono text-4xl font-bold">About</h1>
              <p className="text-lg leading-7 text-muted-foreground">
                {personalInfo.bio}
              </p>
            </section>

            <Separator />

            <section id="background" className="space-y-4">
              <h2 className="font-mono text-3xl font-semibold">Background</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-7">
                  I'm a BCA student at Sarala Birla University with a strong passion for full-stack web development 
                  and solving real-world problems through code. My journey in programming started with learning 
                  fundamental languages like C and C++, which laid the foundation for my understanding of 
                  computer science principles.
                </p>
                <p className="leading-7">
                  Currently, I'm focused on mastering the MERN stack (MongoDB, Express, React, Node.js) and 
                  building practical applications that solve real-world challenges. I believe in continuous learning 
                  and applying knowledge through hands-on projects.
                </p>
                <div className="group relative rounded-lg border border-border bg-[#1e1e1e] dark:bg-[#0d1117] p-4 font-mono text-sm overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-[#161b22] dark:bg-[#010409] border-b border-border/50 flex items-center gap-2 px-4 -mt-4 -mx-4 mb-4">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">version-history.js</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-[#c9d1d9]">
                    <span className="text-[#79c0ff]">//</span> <span className="text-[#8b949e]">Version History</span>{'\n'}
                    <span className="text-[#79c0ff]">const</span> <span className="text-[#c9d1d9]">versionHistory</span> <span className="text-[#c9d1d9]">=</span> <span className="text-[#a5d6ff]">[</span>{'\n'}
                    <span className="text-[#a5d6ff]">  </span><span className="text-[#a5d6ff]">{'{'}</span> <span className="text-[#79c0ff]">version</span>: <span className="text-[#a5d6ff]">'</span><span className="text-[#a5d6ff]">v1.0.0</span><span className="text-[#a5d6ff]">'</span>, <span className="text-[#79c0ff]">description</span>: <span className="text-[#a5d6ff]">'</span><span className="text-[#a5d6ff]">Started learning C & C++ fundamentals</span><span className="text-[#a5d6ff]">'</span> <span className="text-[#a5d6ff]">{'}'}</span>,{'\n'}
                    <span className="text-[#a5d6ff]">  </span><span className="text-[#a5d6ff]">{'{'}</span> <span className="text-[#79c0ff]">version</span>: <span className="text-[#a5d6ff]">'</span><span className="text-[#a5d6ff]">v2.0.0</span><span className="text-[#a5d6ff]">'</span>, <span className="text-[#79c0ff]">description</span>: <span className="text-[#a5d6ff]">'</span><span className="text-[#a5d6ff]">Mastered HTML, CSS & JavaScript</span><span className="text-[#a5d6ff]">'</span> <span className="text-[#a5d6ff]">{'}'}</span>,{'\n'}
                    <span className="text-[#a5d6ff]">  </span><span className="text-[#a5d6ff]">{'{'}</span> <span className="text-[#79c0ff]">version</span>: <span className="text-[#a5d6ff]">'</span><span className="text-[#a5d6ff]">v3.0.0</span><span className="text-[#a5d6ff]">'</span>, <span className="text-[#79c0ff]">description</span>: <span className="text-[#a5d6ff]">'</span><span className="text-[#a5d6ff]">Dived into React & Node.js</span><span className="text-[#a5d6ff]">'</span> <span className="text-[#a5d6ff]">{'}'}</span>,{'\n'}
                    <span className="text-[#a5d6ff]">  </span><span className="text-[#a5d6ff]">{'{'}</span> <span className="text-[#79c0ff]">version</span>: <span className="text-[#a5d6ff]">'</span><span className="text-[#a5d6ff]">v4.0.0</span><span className="text-[#a5d6ff]">'</span>, <span className="text-[#79c0ff]">description</span>: <span className="text-[#a5d6ff]">'</span><span className="text-[#a5d6ff]">Current version - Building MERN stack projects</span><span className="text-[#a5d6ff]">'</span> <span className="text-[#a5d6ff]">{'}'}</span>{'\n'}
                    <span className="text-[#a5d6ff]">]</span>
                  </pre>
                </div>
              </div>
            </section>

            <Separator />

            <section id="education" className="space-y-4">
              <h2 className="font-mono text-3xl font-semibold">Education</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono">Dependencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-mono text-sm font-semibold">Formal Education</h3>
                      <p className="text-sm text-muted-foreground">
                        Bachelor of Computer Applications (BCA)<br />
                        Sarala Birla University<br />
                        Currently pursuing
                      </p>
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-semibold">Core Subjects</h3>
                      <p className="text-sm text-muted-foreground">
                        Data Structures & Algorithms, Database Management Systems, 
                        Operating Systems, Web Development, Software Engineering
                      </p>
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-semibold">Continuous Learning</h3>
                      <p className="text-sm text-muted-foreground">
                        Actively building projects with MERN stack, practicing DSA, 
                        and exploring modern web development technologies
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section id="contact-info" className="space-y-4">
              <h2 className="font-mono text-3xl font-semibold">Contact Information</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {personalInfo.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-mono text-sm font-semibold">Email</p>
                          <a
                            href={`mailto:${personalInfo.email}`}
                            className="text-sm text-muted-foreground hover:underline"
                          >
                            {personalInfo.email}
                          </a>
                        </div>
                      </div>
                    )}
                    {personalInfo.location && (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-mono text-sm font-semibold">Location</p>
                          <p className="text-sm text-muted-foreground">
                            {personalInfo.location}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <TableOfContents headings={headings} />
        </div>
      </div>
    </div>
  )
}

