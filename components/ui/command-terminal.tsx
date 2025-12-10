'use client'

import * as React from 'react'
import { Terminal, X, Minus, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTerminal } from '@/lib/contexts/terminal-context'

interface CommandTerminalProps {
  onCommandExecute?: (command: string, args: string[]) => void
  onNavigate?: (path: string) => void
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
  className?: string
}

export function CommandTerminal({ 
  onCommandExecute, 
  onNavigate, 
  onClose,
  onMinimize,
  onMaximize,
  isMaximized = false,
  className 
}: CommandTerminalProps) {
  const {
    command,
    history,
    isExecuting,
    suggestions,
    isInPrompt,
    handlePromptAnswer,
    cancelPrompt,
    getCurrentPromptQuestion,
    setCommand,
    executeCommand,
    getSuggestions,
    navigateCommandHistory,
    selectSuggestion,
  } = useTerminal()

  const inputRef = React.useRef<HTMLInputElement>(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const scrollEndRef = React.useRef<HTMLDivElement>(null)
  const shouldRefocusRef = React.useRef(false)

  // Focus input when terminal opens
  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Refocus input when execution completes
  React.useEffect(() => {
    if (!isExecuting && shouldRefocusRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
        shouldRefocusRef.current = false
      }, 100)
    }
  }, [isExecuting])

  // Auto scroll to bottom when history changes
  React.useEffect(() => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, isExecuting])

  // Handle command execution
  const handleExecute = React.useCallback(async (cmd: string) => {
    if (!cmd.trim() || isExecuting) return
    
    shouldRefocusRef.current = true
    await executeCommand(cmd)
    
    // Call callbacks if provided
    const parts = cmd.trim().split(/\s+/)
    const commandName = parts[0]
    const args = parts.slice(1)
    
    if (commandName === 'npm' && (args[0] === 'i' || args[0] === 'install') && args[1]) {
      onCommandExecute?.(commandName, [args[0], args[1]])
    }
    
    if (commandName === 'cd' && args[0]) {
      const page = args[0].toLowerCase()
      if (['about', 'experience', 'projects', 'skills', 'contact', 'home', '/'].includes(page)) {
        const path = page === '/' || page === 'home' ? '/' : `/${page}`
        onNavigate?.(path)
      }
    }
  }, [executeCommand, isExecuting, onCommandExecute, onNavigate])

  // Handle keyboard input
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isInPrompt) {
      if (e.key === 'Enter' && command.trim()) {
        e.preventDefault()
        handlePromptAnswer(command.trim())
      } else if (e.ctrlKey && e.key === 'c') {
        e.preventDefault()
        cancelPrompt()
      }
      return
    }
    
    if (e.key === 'Enter' && !isExecuting && command.trim()) {
      e.preventDefault()
      handleExecute(command)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      navigateCommandHistory('up')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      navigateCommandHistory('down')
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault()
      selectSuggestion(suggestions[0])
    } else if (e.key === 'Escape') {
      // Allow parent to handle escape
      return
    }
  }, [command, isExecuting, suggestions, isInPrompt, handlePromptAnswer, cancelPrompt, handleExecute, navigateCommandHistory, selectSuggestion])

  // Handle input change
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCommand(value)
    getSuggestions(value)
  }, [setCommand, getSuggestions])

  // Handle terminal click to focus input
  const handleTerminalClick = React.useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('input') && !target.closest('button') && !target.closest('[data-suggestion]')) {
      inputRef.current?.focus()
    }
  }, [])

  // Get output color based on type
  const getOutputColor = React.useCallback((type?: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-gray-300'
    }
  }, [])

  return (
    <div 
      className={cn('rounded-lg border border-border bg-[#0d1117] dark:bg-[#010409] p-4 font-mono text-sm cursor-text flex flex-col h-full overflow-hidden', className)}
      onClick={handleTerminalClick}
    >
      {/* Header with window controls */}
      <div 
        className="mb-3 flex items-center justify-between select-none flex-shrink-0" 
      >
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-green-500" />
          <span className="text-xs text-gray-400">Terminal</span>
        </div>
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            className="h-4 w-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Close terminal"
            title="Close"
          >
            <X className="h-2.5 w-2.5 text-white/80" strokeWidth={3} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize?.()
            }}
            className="h-4 w-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Minimize terminal"
            title="Minimize"
          >
            <Minus className="h-2.5 w-2.5 text-white/80" strokeWidth={3} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMaximize?.()
            }}
            className="h-4 w-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer flex items-center justify-center"
            aria-label={isMaximized ? "Restore terminal" : "Maximize terminal"}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Maximize2 className="h-2.5 w-2.5 text-white/80" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Scrollable content area */}
      <div 
        ref={scrollContainerRef}
        data-scroll-container
        className="flex-1 overflow-y-auto scrollbar-hide min-h-0 relative"
        onWheel={(e) => {
          // Ensure wheel events work for scrolling
          e.stopPropagation()
        }}
        onTouchMove={(e) => {
          // Ensure touch scrolling works
          e.stopPropagation()
        }}
        onMouseDown={(e) => {
          // Prevent drag when clicking in scroll area
          e.stopPropagation()
        }}
        style={{ 
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        <div className="space-y-2 py-2">
          {history.length === 0 && (
            <div className="text-gray-400 text-xs">
              Type <span className="text-green-500">help</span> to see available commands
            </div>
          )}
          
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-green-500">$</span>
                <span className="text-green-500">{item.command}</span>
              </div>
              {item.output && (
                <div className={cn('ml-4 whitespace-pre-wrap break-words', getOutputColor(item.type))}>
                  {item.output}
                </div>
              )}
            </div>
          ))}
          
          {/* Current input line */}
          <div className="space-y-1">
            {isInPrompt && getCurrentPromptQuestion() && (
              <div className="ml-4 mb-2 text-yellow-400 text-sm">
                ? {getCurrentPromptQuestion()?.label}: <span className="text-gray-400 text-xs">({getCurrentPromptQuestion()?.placeholder})</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-green-500 flex-shrink-0">{isInPrompt ? '>' : '$'}</span>
              <div className="flex-1 relative min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={isExecuting}
                  placeholder={isInPrompt && getCurrentPromptQuestion() 
                    ? getCurrentPromptQuestion()?.placeholder 
                    : isExecuting ? 'Executing...' : ''}
                  className="w-full bg-transparent outline-none text-green-500 placeholder:text-gray-500 caret-green-500"
                  autoComplete="off"
                  spellCheck="false"
                  data-terminal-input
                />
                {/* Suggestions dropdown */}
                {suggestions.length > 0 && command.trim() && (
                  <div 
                    className="absolute top-full left-0 mt-1 bg-[#1a1a1a] dark:bg-[#0a0a0a] border border-border rounded-md p-1 z-20 shadow-lg min-w-[200px]"
                    data-suggestion
                  >
                    {suggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer rounded transition-colors"
                        onClick={() => {
                          selectSuggestion(suggestion)
                          inputRef.current?.focus()
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {isExecuting && (
              <div className="ml-4 flex items-center gap-2 text-yellow-500">
                <span className="animate-pulse">●</span>
                <span className="text-xs">Executing...</span>
              </div>
            )}
          </div>
          
          {/* Scroll anchor */}
          <div ref={scrollEndRef} />
        </div>
      </div>
    </div>
  )
}
