'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogOverlay } from '@/components/ui/dialog'
import { CommandTerminal } from '@/components/ui/command-terminal'
import { usePersonalName } from '@/lib/contexts/personal-name-context'
import { cn } from '@/lib/utils'

interface TerminalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TerminalDialog({ open, onOpenChange }: TerminalDialogProps) {
  const router = useRouter()
  const { updateName } = usePersonalName()
  const dialogRef = React.useRef<HTMLDivElement>(null)

  // Handle Ctrl+C to close terminal
  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        // Don't close if user is typing in the terminal input
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' && target.hasAttribute('data-terminal-input')) {
          // Allow normal Ctrl+C in terminal input for copy
          return
        }
        e.preventDefault()
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onOpenChange])
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const getInitialSize = () => {
    if (typeof window !== 'undefined') {
      const maxWidth = 1024 // max-w-5xl = 64rem = 1024px
      const margin = 20 // mx-5 = 1.25rem = 20px per side = 40px total
      const availableWidth = window.innerWidth - margin * 2
      return {
        width: Math.min(maxWidth, availableWidth),
        height: 480,
      }
    }
    return { width: 1024, height: 480 }
  }
  const [size, setSize] = React.useState(getInitialSize)
  const [isDragging, setIsDragging] = React.useState(false)
  const [isResizing, setIsResizing] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [isMaximized, setIsMaximized] = React.useState(false)
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = React.useState({ x: 0, y: 0, width: 0, height: 0 })
  const [prevPosition, setPrevPosition] = React.useState({ x: 0, y: 0 })
  const [prevSize, setPrevSize] = React.useState(() => getInitialSize())

  // Center dialog on open with mx-5 margins
  React.useEffect(() => {
    if (open && !isMaximized && typeof window !== 'undefined') {
      const margin = 20 // mx-5 = 20px
      const centerX = (window.innerWidth - size.width) / 2
      const centerY = (window.innerHeight - size.height) / 2
      // Ensure dialog respects mx-5 margins (20px on each side)
      const minX = margin
      const maxX = window.innerWidth - size.width - margin
      const constrainedX = Math.max(minX, Math.min(maxX, centerX))
      setPosition({ x: constrainedX, y: centerY })
    }
  }, [open, isMaximized, size.width, size.height])

  const handleCommandExecute = (command: string, args: string[]) => {
    if (command === 'npm' && (args[0] === 'i' || args[0] === 'install') && args[1]) {
      updateName(args[1])
      // Close terminal after a short delay to show the name change
      setTimeout(() => {
        onOpenChange(false)
      }, 800)
    }
  }

  const handleNavigate = (path: string) => {
    router.push(path)
    setTimeout(() => {
      onOpenChange(false)
    }, 500)
  }

  // Handle window controls
  const handleClose = () => {
    onOpenChange(false)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    // Restore after a delay (simulating minimize to taskbar)
    setTimeout(() => {
      setIsMinimized(false)
    }, 1000)
  }

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore
      setPosition(prevPosition)
      setSize(prevSize)
      setIsMaximized(false)
    } else {
      // Maximize
      setPrevPosition(position)
      setPrevSize(size)
      if (typeof window !== 'undefined') {
        setPosition({ x: 0, y: 0 })
        setSize({ width: window.innerWidth, height: window.innerHeight })
      }
      setIsMaximized(true)
      setIsMinimized(false)
    }
  }

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag if clicking on the drag handle area, not on buttons
    const target = e.target as HTMLElement
    if (target.closest('[data-drag-handle]') && !target.closest('button')) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized && typeof window !== 'undefined') {
        const margin = 20 // mx-5 = 20px
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y
        setPosition({
          x: Math.max(margin, Math.min(newX, window.innerWidth - size.width - margin)),
          y: Math.max(0, Math.min(newY, window.innerHeight - size.height)),
        })
      } else if (isResizing && !isMaximized && typeof window !== 'undefined') {
        const margin = 20 // mx-5 = 20px
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y
        const maxWidth = window.innerWidth - position.x - margin
        const newWidth = Math.max(400, Math.min(resizeStart.width + deltaX, maxWidth))
        const newHeight = Math.max(300, Math.min(resizeStart.height + deltaY, window.innerHeight - position.y))
        setSize({ width: newWidth, height: newHeight })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, resizeStart, position, size, isMaximized])

  // Resize handler
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    })
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <div
        ref={dialogRef}
        className={cn(
          'fixed z-50 bg-transparent',
          isMinimized && 'pointer-events-none opacity-0'
        )}
        style={{
          left: isMaximized ? 0 : `${position.x}px`,
          top: isMaximized ? 0 : `${position.y}px`,
          width: isMaximized ? '100vw' : `${size.width}px`,
          height: isMaximized ? '100vh' : `${size.height}px`,
          transition: isDragging || isResizing ? 'none' : 'all 0.2s ease-out',
        }}
      >
        <div
          className="h-full w-full flex flex-col"
          onMouseDown={handleMouseDown}
        >
          <CommandTerminal
            onCommandExecute={handleCommandExecute}
            onNavigate={handleNavigate}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            isMaximized={isMaximized}
            onDragStart={handleMouseDown}
            className="flex-1"
          />
        </div>
        {/* Resize handle */}
        {!isMaximized && (
          <div
            className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize group"
            onMouseDown={handleResizeStart}
          >
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gray-600 group-hover:border-gray-400 transition-colors" />
          </div>
        )}
      </div>
    </Dialog>
  )
}

