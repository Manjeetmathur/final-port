'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Download, ExternalLink, FileText, Loader2, RefreshCw } from 'lucide-react'

interface PdfViewerProps {
  url: string
  title?: string
  fullPage?: boolean
  className?: string
}

export function PdfViewer({ url, title, fullPage = true, className }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [useIframeFallback, setUseIframeFallback] = useState<boolean>(false)

  const filename = title || url.split('/').pop() || 'Document.pdf'

  useEffect(() => {
    let isMounted = true

    async function renderPdfCanvas() {
      if (useIframeFallback) return

      try {
        setLoading(true)
        setError(null)

        // Dynamically import pdfjs-dist to avoid SSR issues
        const pdfjsLib = await import('pdfjs-dist')
        
        // Configure PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

        const loadingTask = pdfjsLib.getDocument(url)
        const pdf = await loadingTask.promise

        if (!isMounted) return

        setNumPages(pdf.numPages)

        const container = containerRef.current
        if (!container) return

        container.innerHTML = '' // Clear existing canvases

        const containerWidth = container.clientWidth || 800

        for (let i = 1; i <= pdf.numPages; i++) {
          if (!isMounted) return

          const page = await pdf.getPage(i)
          const unscaledViewport = page.getViewport({ scale: 1 })
          const scale = containerWidth / unscaledViewport.width
          const viewport = page.getViewport({ scale: Math.max(scale, 1.2) })

          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')

          if (!context) continue

          canvas.height = viewport.height
          canvas.width = viewport.width
          canvas.className = 'w-full h-auto shadow-md rounded-lg mb-6 border border-border bg-white dark:bg-slate-900'

          container.appendChild(canvas)

          const renderContext = {
            canvasContext: context,
            canvas: canvas,
            viewport: viewport,
          }

          await page.render(renderContext as any).promise
        }

        if (isMounted) {
          setLoading(false)
        }
      } catch (err) {
        console.error('Failed to render PDF using PDF.js:', err)
        if (isMounted) {
          setError('Failed to render PDF canvas. Switched to standard embed mode.')
          setUseIframeFallback(true)
          setLoading(false)
        }
      }
    }

    renderPdfCanvas()

    return () => {
      isMounted = false
    }
  }, [url, useIframeFallback])

  return (
    <Card className={`my-6 overflow-hidden border border-border shadow-lg rounded-xl bg-card ${className || ''}`}>
      {/* PDF Header Controls */}
      <CardHeader className="bg-muted/40 px-4 py-3 border-b border-border flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2 font-mono text-sm font-medium text-foreground truncate max-w-[60%] sm:max-w-[70%]">
          <FileText className="h-4 w-4 text-primary shrink-0" />
          <span className="truncate">{filename}</span>
          {numPages > 0 && !useIframeFallback && (
            <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
              ({numPages} {numPages === 1 ? 'page' : 'pages'})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setUseIframeFallback(!useIframeFallback)}
            className="h-8 px-2.5 font-mono text-xs hidden sm:flex"
            title="Toggle viewer mode"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            {useIframeFallback ? 'Canvas View' : 'Box View'}
          </Button>

          <Button variant="outline" size="sm" asChild className="h-8 px-2.5 font-mono text-xs">
            <a href={url} target="_blank" rel="noopener noreferrer" title="Open in new tab">
              <ExternalLink className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Open</span>
            </a>
          </Button>

          <Button variant="default" size="sm" asChild className="h-8 px-2.5 font-mono text-xs">
            <a href={url} download title="Download PDF">
              <Download className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Download</span>
            </a>
          </Button>
        </div>
      </CardHeader>

      {/* PDF Body Container */}
      <CardContent className="p-4 sm:p-6 bg-slate-950/5 dark:bg-slate-950/50">
        {loading && !useIframeFallback && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="font-mono text-sm">Rendering PDF pages...</p>
          </div>
        )}

        {useIframeFallback ? (
          <iframe
            src={`${url}#toolbar=1&navpanes=0`}
            className="w-full h-[85vh] border-0 rounded-lg shadow-inner"
            title={filename}
          />
        ) : (
          <div ref={containerRef} className="w-full flex flex-col items-center space-y-6 min-h-[400px]" />
        )}
      </CardContent>
    </Card>
  )
}
