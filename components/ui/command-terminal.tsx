'use client'

import * as React from 'react'
import { useState } from 'react'
import { Terminal, Sparkles, Zap, Heart, Coffee, X, Minus, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommandTerminalProps {
  onCommandExecute?: (command: string, args: string[]) => void
  onNavigate?: (path: string) => void
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
  onDragStart?: (e: React.MouseEvent) => void
  className?: string
}

export function CommandTerminal({ 
  onCommandExecute, 
  onNavigate, 
  onClose,
  onMinimize,
  onMaximize,
  isMaximized = false,
  onDragStart,
  className 
}: CommandTerminalProps) {
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<Array<{ command: string; output: string; type?: 'success' | 'error' | 'info' }>>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [commandIndex, setCommandIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const historyRef = React.useRef<HTMLDivElement>(null)

  const commandHistory = React.useRef<string[]>([])

  const availableCommands = [
    'npm i',
    'npm install',
    'help',
    'clear',
    'whoami',
    'date',
    'echo',
    'ls',
    'cat',
    'cd',
    'motivate',
    'coffee',
  ]

  const pages = ['about', 'experience', 'projects', 'skills', 'contact', 'home']

  const getSuggestions = (input: string) => {
    if (!input.trim()) {
      setSuggestions([])
      return
    }
    const filtered = availableCommands.filter(cmd => 
      cmd.toLowerCase().startsWith(input.toLowerCase())
    )
    setSuggestions(filtered.slice(0, 3))
  }

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return

    setIsExecuting(true)
    const parts = cmd.trim().split(/\s+/)
    const commandName = parts[0]
    const args = parts.slice(1)

    // Add to command history
    commandHistory.current.push(cmd)
    setCommandIndex(-1)

    // Add command to display history
    setHistory((prev) => [...prev, { command: cmd, output: '', type: 'info' }])

    // Simulate command execution with typing effect
    await new Promise((resolve) => setTimeout(resolve, 300))

    let output = ''
    let type: 'success' | 'error' | 'info' = 'info'

    if (commandName === 'npm' && (args[0] === 'i' || args[0] === 'install') && args[1]) {
      const name = args[1]
      output = `\n📦 Installing ${name}...\n`
      await new Promise((resolve) => setTimeout(resolve, 400))
      output += `✓ Installed ${name}@latest successfully\n`
      output += `  added 1 package in 0.5s\n`
      type = 'success'
      onCommandExecute?.(commandName, [args[0], name])
    } else if (commandName === 'help') {
      output = `\nAvailable commands:\n\n`
      output += `  npm i <name>          Install and set your name\n`
      output += `  npm install <name>    Install and set your name\n`
      output += `  help                  Show this help message\n`
      output += `  clear                 Clear terminal\n`
      output += `  whoami                Show current user\n`
      output += `  date                  Show current date\n`
      output += `  echo <text>           Echo text\n`
      output += `  ls                    List files\n`
      output += `  cat <file>            Display file contents\n`
      output += `  cd <page>             Navigate to page (about, experience, etc.)\n`
      output += `  motivate              Get motivated!\n`
      output += `  coffee                ☕ Need coffee?\n`
    } else if (commandName === 'clear') {
      setHistory([])
      setIsExecuting(false)
      return
    } else if (commandName === 'whoami') {
      // Get the current name from context, fallback to 'guest'
      output = `guest\n`
      type = 'success'
    } else if (commandName === 'date') {
      const now = new Date()
      output = `${now.toLocaleString()}\n`
      type = 'info'
    } else if (commandName === 'echo') {
      output = `${args.join(' ')}\n`
      type = 'info'
    } else if (commandName === 'ls') {
      output = `\n📁 portfolio/\n`
      output += `  ├── about.md\n`
      output += `  ├── experience.md\n`
      output += `  ├── projects.md\n`
      output += `  ├── skills.md\n`
      output += `  └── contact.md\n`
      type = 'info'
    } else if (commandName === 'cat') {
      if (args[0] === 'about.md') {
        output = `\n# About\n\nThis is my portfolio documentation.\nLearn more about my background and experience.\n`
      } else if (args[0]) {
        output = `cat: ${args[0]}: No such file or directory\n`
        type = 'error'
      } else {
        output = `cat: missing file argument\n`
        type = 'error'
      }
    } else if (commandName === 'cd') {
      if (!args[0]) {
        output = `cd: missing argument\n`
        type = 'error'
      } else {
        const page = args[0].toLowerCase()
        if (pages.includes(page) || page === '/' || page === 'home') {
          const path = page === '/' || page === 'home' ? '/' : `/${page}`
          output = `\n✓ Navigating to ${path}\n`
          type = 'success'
          setTimeout(() => {
            onNavigate?.(path)
          }, 300)
        } else {
          output = `cd: ${args[0]}: No such page\nAvailable pages: ${pages.join(', ')}\n`
          type = 'error'
        }
      }
    } else if (commandName === 'motivate') {
      const quotes = [
        '🚀 "The only way to do great work is to love what you do." - Steve Jobs',
        '💪 "Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '✨ "First, solve the problem. Then, write the code." - John Johnson',
        '🎯 "Programming isn\'t about what you know; it\'s about what you can figure out." - Chris Pine',
        '🔥 "The best error message is the one that never shows up." - Thomas Fuchs',
      ]
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
      output = `\n${randomQuote}\n\n💡 Keep coding, keep learning!\n`
      type = 'success'
    } else if (commandName === 'coffee') {
      output = `\n☕ Brewing coffee...\n`
      await new Promise((resolve) => setTimeout(resolve, 600))
      output += `✓ Coffee ready! ☕\n`
      output += `  Energy level: +100%\n`
      output += `  Productivity: MAX\n`
      type = 'success'
    } else {
      output = `\n❌ Command not found: ${commandName}\n`
      output += `   Type 'help' for available commands.\n`
      type = 'error'
    }

    setHistory((prev) => {
      const newHistory = [...prev]
      newHistory[newHistory.length - 1].output = output
      newHistory[newHistory.length - 1].type = type
      return newHistory
    })

    setIsExecuting(false)
    setCommand('')
    setSuggestions([])

    // Auto scroll to bottom
    setTimeout(() => {
      historyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isExecuting && command.trim()) {
      executeCommand(command)
    } else if (e.key === 'Escape') {
      // Allow parent to handle escape (close dialog)
      return
    } else if (e.key === 'ArrowUp' && commandHistory.current.length > 0) {
      e.preventDefault()
      const newIndex = commandIndex === -1 
        ? commandHistory.current.length - 1 
        : Math.max(0, commandIndex - 1)
      setCommandIndex(newIndex)
      setCommand(commandHistory.current[newIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (commandIndex >= 0) {
        const newIndex = commandIndex + 1
        if (newIndex >= commandHistory.current.length) {
          setCommandIndex(-1)
          setCommand('')
        } else {
          setCommandIndex(newIndex)
          setCommand(commandHistory.current[newIndex])
        }
      }
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault()
      setCommand(suggestions[0] + ' ')
      setSuggestions([])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCommand(value)
    getSuggestions(value)
    setCommandIndex(-1)
  }

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleTerminalClick = (e: React.MouseEvent) => {
    // Only focus if clicking on the terminal container, not on input or buttons
    const target = e.target as HTMLElement
    if (!target.closest('input') && !target.closest('button')) {
      inputRef.current?.focus()
    }
  }

  const getOutputColor = (type?: string) => {
    switch (type) {
      case 'success':
        return 'text-green-500'
      case 'error':
        return 'text-red-500'
      default:
        return 'text-gray-300'
    }
  }

  return (
    <div 
      className={cn('rounded-lg border border-border bg-[#0d1117] dark:bg-[#010409] p-4 font-mono text-sm cursor-text flex flex-col h-full', className)}
      onClick={handleTerminalClick}
    >
      <div 
        className="mb-3 flex items-center justify-between cursor-move select-none" 
        data-drag-handle
        onMouseDown={onDragStart}
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
      <div 
        className="space-y-2 flex-1 overflow-y-auto scrollbar-hide min-h-0" 
        ref={historyRef}
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
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
              <div className={cn('ml-4 whitespace-pre-wrap', getOutputColor(item.type))}>
                {item.output}
              </div>
            )}
          </div>
        ))}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-green-500">$</span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={isExecuting}
                placeholder={isExecuting ? 'Executing...' : 'Type a command'}
                className="w-full bg-transparent outline-none text-green-500 placeholder:text-gray-500"
                autoComplete="off"
                data-terminal-input
              />
              {suggestions.length > 0 && command.trim() && (
                <div className="absolute top-full left-0 mt-1 bg-muted border border-border rounded-md p-1 z-10">
                  {suggestions.map((suggestion, idx) => (
                    <div
                      key={idx}
                      className="px-2 py-1 text-xs text-muted-foreground hover:bg-accent cursor-pointer rounded"
                      onClick={() => {
                        setCommand(suggestion + ' ')
                        setSuggestions([])
                        inputRef.current?.focus()
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {isExecuting && (
              <div className="ml-4 flex items-center gap-2 text-yellow-500">
                <span className="animate-pulse">●</span>
                <span className="text-xs">Executing...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

