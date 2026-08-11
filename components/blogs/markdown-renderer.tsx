'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'
import { PdfViewer } from '@/components/blogs/pdf-viewer'

interface MarkdownRendererProps {
  content: string
  className?: string
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <article className={cn('prose dark:prose-invert max-w-none space-y-6', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => {
            const text = React.Children.toArray(children).join('')
            const id = generateSlug(text)
            return (
              <h1
                id={id}
                className="scroll-m-20 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl mt-8 mb-4"
                {...props}
              >
                {children}
              </h1>
            )
          },
          h2: ({ children, ...props }) => {
            const text = React.Children.toArray(children).join('')
            const id = generateSlug(text)
            return (
              <h2
                id={id}
                className="scroll-m-20 font-mono text-2xl font-semibold tracking-tight text-foreground border-b border-border pb-2 mt-8 mb-4"
                {...props}
              >
                {children}
              </h2>
            )
          },
          h3: ({ children, ...props }) => {
            const text = React.Children.toArray(children).join('')
            const id = generateSlug(text)
            return (
              <h3
                id={id}
                className="scroll-m-20 font-mono text-xl font-semibold tracking-tight text-foreground mt-6 mb-3"
                {...props}
              >
                {children}
              </h3>
            )
          },
          p: ({ children, ...props }) => (
            <p className="leading-7 text-muted-foreground my-4 text-base sm:text-lg" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="my-4 ml-6 list-decimal space-y-2 text-muted-foreground" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-7 text-muted-foreground" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="mt-6 border-l-4 border-primary bg-muted/30 px-4 py-3 italic text-foreground rounded-r-lg"
              {...props}
            >
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className
            const codeString = String(children).trim()

            // Check if code block is a PDF embed (e.g. ```pdf /file.pdf ```)
            if (className && (className.includes('language-pdf') || className.includes('pdf'))) {
              const lines = codeString.split('\n')
              const url = lines[0].trim()
              const titleMatch = lines.find((l) => l.toLowerCase().startsWith('title:'))
              const title = titleMatch ? titleMatch.split(':').slice(1).join(':').trim() : undefined

              if (url) {
                return <PdfViewer url={url} title={title} />
              }
            }

            return isInline ? (
              <code
                className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground border border-border"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={cn('font-mono text-sm', className)} {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children, ...props }) => {
            // If child is PdfViewer, don't wrap in styled code pre container
            const childArray = React.Children.toArray(children)
            if (
              childArray.length === 1 &&
              React.isValidElement(childArray[0]) &&
              (childArray[0].type === PdfViewer ||
                (childArray[0].props as { className?: string })?.className?.includes('language-pdf'))
            ) {
              return <>{children}</>
            }

            return (
              <pre
                className="overflow-x-auto rounded-lg border border-border bg-slate-950 p-4 text-slate-50 font-mono text-sm leading-relaxed my-6"
                {...props}
              >
                {children}
              </pre>
            )
          },
          hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
          table: ({ children, ...props }) => (
            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full border-collapse border border-border text-left text-sm" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-border bg-muted px-4 py-2 font-mono font-semibold text-foreground"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-4 py-2 text-muted-foreground" {...props}>
              {children}
            </td>
          ),
          a: ({ children, href, ...props }) => {
            const isPdf = href?.toLowerCase().endsWith('.pdf')
            return (
              <a
                href={href}
                className={cn(
                  'font-medium text-primary underline underline-offset-4 hover:opacity-80 transition-opacity',
                  isPdf && 'inline-flex items-center gap-1 font-mono text-xs bg-muted px-2 py-1 rounded border border-border no-underline hover:border-primary'
                )}
                target={href?.startsWith('http') || isPdf ? '_blank' : undefined}
                rel={href?.startsWith('http') || isPdf ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children} {isPdf && '📄 (PDF)'}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
