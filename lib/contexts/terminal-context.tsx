'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { usePersonalName } from './personal-name-context'
import { usePortfolio } from './portfolio-context'
import { personalInfo, experiences, projects, skills } from '@/lib/data/portfolio'
import { useTheme } from '@/components/theme-provider'

interface TerminalPosition {
  x: number
  y: number
}

interface TerminalSize {
  width: number
  height: number
}

export interface CommandHistoryItem {
  command: string
  output: string
  type?: 'success' | 'error' | 'info'
}

interface TerminalContextType {
  // Window State
  isOpen: boolean
  position: TerminalPosition
  size: TerminalSize
  isMinimized: boolean
  isMaximized: boolean
  isDragging: boolean
  isResizing: boolean
  
  // Command State
  command: string
  commandHistory: string[]
  history: CommandHistoryItem[]
  isExecuting: boolean
  commandIndex: number
  suggestions: string[]
  availableCommands: string[]
  pages: string[]
  
  // Interactive Prompt Actions
  isInPrompt: boolean
  currentPrompt: number
  promptAnswers: Record<string, string>
  handlePromptAnswer: (answer: string) => void
  cancelPrompt: () => void
  getCurrentPromptQuestion: () => { key: string; label: string; placeholder: string } | null
  
  // Window Actions
  openTerminal: () => void
  closeTerminal: () => void
  toggleTerminal: () => void
  setPosition: (position: TerminalPosition) => void
  setSize: (size: TerminalSize) => void
  minimizeTerminal: () => void
  maximizeTerminal: () => void
  restoreTerminal: () => void
  setIsDragging: (isDragging: boolean) => void
  setIsResizing: (isResizing: boolean) => void
  
  // Command Actions
  setCommand: (command: string) => void
  executeCommand: (cmd: string) => Promise<void>
  clearHistory: () => void
  getSuggestions: (input: string) => void
  navigateCommandHistory: (direction: 'up' | 'down') => void
  selectSuggestion: (suggestion: string) => void
  
  // Interactive Prompt Actions
  isInPrompt: boolean
  currentPrompt: number
  promptAnswers: Record<string, string>
  handlePromptAnswer: (answer: string) => void
  cancelPrompt: () => void
  getCurrentPromptQuestion: () => { key: string; label: string; placeholder: string } | null
  
  // Legacy support (for backward compatibility)
  setOpenTerminal: (fn: () => void) => void
}

const TerminalContext = React.createContext<TerminalContextType | undefined>(undefined)

const getInitialSize = (): TerminalSize => {
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

const getInitialPosition = (size: TerminalSize): TerminalPosition => {
  if (typeof window !== 'undefined') {
    const margin = 20 // mx-5 = 20px
    const centerX = (window.innerWidth - size.width) / 2
    const centerY = (window.innerHeight - size.height) / 2
    const minX = margin
    const maxX = window.innerWidth - size.width - margin
    const constrainedX = Math.max(minX, Math.min(maxX, centerX))
    return { x: constrainedX, y: centerY }
  }
  return { x: 0, y: 0 }
}

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { updateName } = usePersonalName()
  const { personalInfo: portfolioInfo, updatePersonalInfo } = usePortfolio()
  const { theme, setTheme } = useTheme()
  
  // Window State
  const [isOpen, setIsOpen] = React.useState(false)
  const [initialSize] = React.useState(() => getInitialSize())
  const [size, setSize] = React.useState<TerminalSize>(initialSize)
  const [position, setPosition] = React.useState<TerminalPosition>(() => getInitialPosition(initialSize))
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [isMaximized, setIsMaximized] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [isResizing, setIsResizing] = React.useState(false)
  const [prevPosition, setPrevPosition] = React.useState<TerminalPosition>({ x: 0, y: 0 })
  const [prevSize, setPrevSize] = React.useState<TerminalSize>(initialSize)
  
  // Command State
  const [command, setCommand] = React.useState('')
  const [history, setHistory] = React.useState<CommandHistoryItem[]>([])
  const [isExecuting, setIsExecuting] = React.useState(false)
  const [commandIndex, setCommandIndex] = React.useState(-1)
  const [suggestions, setSuggestions] = React.useState<string[]>([])
  const commandHistoryRef = React.useRef<string[]>([])
  
  // Interactive Prompt State
  const [isInPrompt, setIsInPrompt] = React.useState(false)
  const [currentPrompt, setCurrentPrompt] = React.useState(0)
  const [promptAnswers, setPromptAnswers] = React.useState<Record<string, string>>({})
  
  // Available commands and pages
  const availableCommands = React.useMemo(() => [
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
    'theme',
    'stats',
    'skills',
    'projects',
    'experience',
    'social',
    'weather',
    'matrix',
    'rainbow',
    'ascii',
    'fortune',
    'neofetch',
    'ping',
    'calc',
  ], [])
  
  const pages = React.useMemo(() => ['about', 'experience', 'projects', 'skills', 'contact', 'home'], [])
  
  // Legacy support - for backward compatibility
  const [openTerminalFn, setOpenTerminalFn] = React.useState<(() => void) | null>(null)

  const openTerminal = React.useCallback(() => {
    setIsOpen(true)
    setIsMinimized(false)
    if (openTerminalFn) {
      openTerminalFn()
    }
  }, [openTerminalFn])

  const closeTerminal = React.useCallback(() => {
    setIsOpen(false)
    setIsMinimized(false)
    setIsMaximized(false)
  }, [])

  const toggleTerminal = React.useCallback(() => {
    if (isOpen) {
      closeTerminal()
    } else {
      openTerminal()
    }
  }, [isOpen, openTerminal, closeTerminal])

  const handleSetPosition = React.useCallback((newPosition: TerminalPosition) => {
    setPosition(newPosition)
  }, [])

  const handleSetSize = React.useCallback((newSize: TerminalSize) => {
    setSize(newSize)
  }, [])

  const minimizeTerminal = React.useCallback(() => {
    setIsMinimized(true)
    // Auto-restore after a delay (simulating minimize to taskbar)
    setTimeout(() => {
      setIsMinimized(false)
    }, 1000)
  }, [])

  const maximizeTerminal = React.useCallback(() => {
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
  }, [isMaximized, position, size, prevPosition, prevSize])

  const restoreTerminal = React.useCallback(() => {
    if (isMaximized) {
      setPosition(prevPosition)
      setSize(prevSize)
      setIsMaximized(false)
    }
    setIsMinimized(false)
  }, [isMaximized, prevPosition, prevSize])

  const handleSetIsDragging = React.useCallback((dragging: boolean) => {
    setIsDragging(dragging)
  }, [])

  const handleSetIsResizing = React.useCallback((resizing: boolean) => {
    setIsResizing(resizing)
  }, [])

  // Command Actions
  const handleSetCommand = React.useCallback((newCommand: string) => {
    setCommand(newCommand)
    setCommandIndex(-1)
  }, [])

  const getSuggestions = React.useCallback((input: string) => {
    if (!input.trim()) {
      setSuggestions([])
      return
    }
    const filtered = availableCommands.filter(cmd => 
      cmd.toLowerCase().startsWith(input.toLowerCase())
    )
    setSuggestions(filtered.slice(0, 3))
  }, [availableCommands])

  const clearHistory = React.useCallback(() => {
    setHistory([])
  }, [])

  const navigateCommandHistory = React.useCallback((direction: 'up' | 'down') => {
    if (direction === 'up' && commandHistoryRef.current.length > 0) {
      const newIndex = commandIndex === -1 
        ? commandHistoryRef.current.length - 1 
        : Math.max(0, commandIndex - 1)
      setCommandIndex(newIndex)
      setCommand(commandHistoryRef.current[newIndex])
    } else if (direction === 'down') {
      if (commandIndex >= 0) {
        const newIndex = commandIndex + 1
        if (newIndex >= commandHistoryRef.current.length) {
          setCommandIndex(-1)
          setCommand('')
        } else {
          setCommandIndex(newIndex)
          setCommand(commandHistoryRef.current[newIndex])
        }
      }
    }
  }, [commandIndex, command])

  const selectSuggestion = React.useCallback((suggestion: string) => {
    setCommand(suggestion + ' ')
    setSuggestions([])
  }, [])

  // Interactive Prompt Questions
  const promptQuestions = React.useMemo(() => [
    { key: 'name', label: 'Name', placeholder: 'Your full name' },
    { key: 'title', label: 'Title', placeholder: 'e.g., Full Stack Developer' },
    { key: 'bio', label: 'Summary/Bio', placeholder: 'A brief description about yourself' },
    { key: 'email', label: 'Email', placeholder: 'your.email@example.com' },
    { key: 'phone', label: 'Phone', placeholder: '+1 234 567 8900' },
    { key: 'location', label: 'Location', placeholder: 'City, Country' },
  ], [])

  const getCurrentPromptQuestion = React.useCallback(() => {
    if (isInPrompt && currentPrompt < promptQuestions.length) {
      return promptQuestions[currentPrompt]
    }
    return null
  }, [isInPrompt, currentPrompt, promptQuestions])

  const cancelPrompt = React.useCallback(() => {
    if (isInPrompt) {
      setHistory((prev) => [
        ...prev,
        { command: '', output: '\n❌ Prompt cancelled.\n', type: 'error' },
      ])
      setIsInPrompt(false)
      setCurrentPrompt(0)
      setPromptAnswers({})
      setCommand('')
      setIsExecuting(false)
    }
  }, [isInPrompt])

  const handlePromptAnswer = React.useCallback((answer: string) => {
    if (isInPrompt && currentPrompt < promptQuestions.length) {
      const currentQuestion = promptQuestions[currentPrompt]
      const newAnswers = { ...promptAnswers, [currentQuestion.key]: answer }
      setPromptAnswers(newAnswers)

      if (currentPrompt < promptQuestions.length - 1) {
        // Move to next question
        setCurrentPrompt(currentPrompt + 1)
        setCommand('')
      } else {
        // All questions answered, update portfolio
        updatePersonalInfo({
          name: newAnswers.name || portfolioInfo.name,
          title: newAnswers.title || portfolioInfo.title,
          bio: newAnswers.bio || portfolioInfo.bio,
          email: newAnswers.email || portfolioInfo.email,
          phone: newAnswers.phone || portfolioInfo.phone,
          location: newAnswers.location || portfolioInfo.location,
        })
        if (newAnswers.name) {
          updateName(newAnswers.name)
        }
        
        // Add completion message to history
        setHistory((prev) => [
          ...prev,
          {
            command: '',
            output: `\n✓ Portfolio configuration completed!\n✓ Updated: ${Object.keys(newAnswers).filter(k => newAnswers[k]).join(', ')}\n`,
            type: 'success',
          },
        ])
        
        setIsInPrompt(false)
        setCurrentPrompt(0)
        setPromptAnswers({})
        setCommand('')
        setIsExecuting(false)
        
        setTimeout(() => {
          closeTerminal()
        }, 1500)
      }
    }
  }, [isInPrompt, currentPrompt, promptAnswers, promptQuestions, updatePersonalInfo, updateName, closeTerminal, portfolioInfo])

  const executeCommand = React.useCallback(async (cmd: string) => {
    if (!cmd.trim()) return
    
    // Don't execute if in prompt mode (except for Ctrl+C which is handled separately)
    if (isInPrompt) return

    setIsExecuting(true)
    const parts = cmd.trim().split(/\s+/)
    const commandName = parts[0]
    const args = parts.slice(1)

    // Add to command history
    commandHistoryRef.current.push(cmd)
    setCommandIndex(-1)

    // Add command to display history
    setHistory((prev) => [...prev, { command: cmd, output: '', type: 'info' }])

    // Simulate command execution with typing effect
    await new Promise((resolve) => setTimeout(resolve, 300))

    let output = ''
    let type: 'success' | 'error' | 'info' = 'info'

    if (commandName === 'npm' && (args[0] === 'i' || args[0] === 'install')) {
      if (args[1]) {
        // Legacy: npm i <name> - just update name
        const name = args[1]
        output = `\n📦 Installing ${name}...\n`
        await new Promise((resolve) => setTimeout(resolve, 400))
        output += `✓ Installed ${name}@latest successfully\n`
        output += `  added 1 package in 0.5s\n`
        type = 'success'
        updateName(name)
        setTimeout(() => {
          closeTerminal()
        }, 800)
      } else {
        // Interactive mode: npm i (no args) - start prompt
        output = `\n📦 Initializing portfolio setup...\n\n`
        output += `This will help you configure your portfolio information.\n`
        output += `Press Ctrl+C to cancel at any time.\n\n`
        const firstQuestion = promptQuestions[0]
        output += `? ${firstQuestion.label}: (${firstQuestion.placeholder})\n`
        type = 'info'
        setIsInPrompt(true)
        setCurrentPrompt(0)
        setPromptAnswers({})
        setCommand('')
      }
    } else if (commandName === 'help') {
      output = `\nAvailable commands:\n\n`
      output += `  📦 Package Management:\n`
      output += `    npm i                  Interactive portfolio setup\n`
      output += `    npm i <name>           Install and set your name\n`
      output += `    npm install <name>    Install and set your name\n\n`
      output += `  📁 Navigation:\n`
      output += `    cd <page>             Navigate to page\n`
      output += `    ls                    List files\n`
      output += `    cat <file>            Display file contents\n\n`
      output += `  🛠️  Portfolio:\n`
      output += `    stats                  Show portfolio statistics\n`
      output += `    skills                 List all skills\n`
      output += `    projects               Show all projects\n`
      output += `    experience             Show work experience\n`
      output += `    social                 Display social links\n\n`
      output += `  🎨 Customization:\n`
      output += `    theme [dark|light]     Change theme\n`
      output += `    theme toggle           Toggle theme\n\n`
      output += `  🎮 Fun Commands:\n`
      output += `    motivate              Get motivated!\n`
      output += `    coffee                ☕ Need coffee?\n`
      output += `    weather               Check weather\n`
      output += `    matrix                Matrix effect\n`
      output += `    rainbow               Rainbow mode\n`
      output += `    fortune               Get a fortune\n`
      output += `    neofetch              System info\n`
      output += `    ascii art             ASCII art\n\n`
      output += `  🔧 Utilities:\n`
      output += `    help                  Show this help\n`
      output += `    clear                 Clear terminal\n`
      output += `    whoami                Show current user\n`
      output += `    date                  Show current date\n`
      output += `    echo <text>           Echo text\n`
      output += `    ping <host>           Ping a host\n`
      output += `    calc <expr>           Calculator\n`
    } else if (commandName === 'clear') {
      setHistory([])
      setIsExecuting(false)
      setCommand('')
      setSuggestions([])
      return
    } else if (commandName === 'whoami') {
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
            router.push(path)
            setTimeout(() => {
              closeTerminal()
            }, 500)
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
    } else if (commandName === 'theme') {
      if (args[0] === 'dark' || args[0] === 'light') {
        setTheme(args[0] as 'dark' | 'light')
        output = `\n✓ Theme changed to ${args[0]}\n`
        type = 'success'
      } else if (args[0] === 'toggle') {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        output = `\n✓ Theme toggled to ${newTheme}\n`
        type = 'success'
      } else {
        output = `\nCurrent theme: ${theme}\n`
        output += `Usage: theme [dark|light|toggle]\n`
        type = 'info'
      }
    } else if (commandName === 'stats') {
      output = `\n📊 Portfolio Statistics\n\n`
      output += `  Projects: ${projects.length}\n`
      output += `  Experience: ${experiences.length} positions\n`
      output += `  Skills: ${skills.length} technologies\n`
      output += `  Location: ${personalInfo.location}\n`
      output += `  Status: ${personalInfo.title}\n`
      type = 'success'
    } else if (commandName === 'skills') {
      const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = []
        acc[skill.category].push(skill)
        return acc
      }, {} as Record<string, typeof skills>)
      
      output = `\n🛠️  Skills by Category\n\n`
      Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
        output += `  ${category}:\n`
        categorySkills.forEach(skill => {
          const proficiency = skill.proficiency === 'Expert' ? '⭐⭐⭐' : 
                            skill.proficiency === 'Advanced' ? '⭐⭐' : 
                            skill.proficiency === 'Intermediate' ? '⭐' : '•'
          output += `    ${proficiency} ${skill.name}\n`
        })
        output += `\n`
      })
      type = 'info'
    } else if (commandName === 'projects') {
      output = `\n📦 Projects (${projects.length})\n\n`
      projects.forEach((project, idx) => {
        output += `  ${idx + 1}. ${project.name}\n`
        output += `     ${project.description}\n`
        output += `     Tech: ${project.techStack.join(', ')}\n`
        if (project.githubUrl || project.liveUrl) {
          output += `     Links: ${project.githubUrl ? 'GitHub' : ''}${project.githubUrl && project.liveUrl ? ' | ' : ''}${project.liveUrl ? 'Live' : ''}\n`
        }
        output += `\n`
      })
      type = 'info'
    } else if (commandName === 'experience') {
      output = `\n💼 Work Experience (${experiences.length})\n\n`
      experiences.forEach((exp, idx) => {
        output += `  ${idx + 1}. ${exp.role} @ ${exp.company}\n`
        output += `     Duration: ${exp.duration}\n`
        output += `     Tech: ${exp.techStack.join(', ')}\n`
        output += `\n`
      })
      type = 'info'
    } else if (commandName === 'social') {
      output = `\n🔗 Social Links\n\n`
      if (personalInfo.github) {
        output += `  GitHub: ${personalInfo.github}\n`
      }
      if (personalInfo.linkedin) {
        output += `  LinkedIn: ${personalInfo.linkedin}\n`
      }
      if (personalInfo.twitter) {
        output += `  Twitter: ${personalInfo.twitter}\n`
      }
      if (personalInfo.email) {
        output += `  Email: ${personalInfo.email}\n`
      }
      type = 'info'
    } else if (commandName === 'weather') {
      const weatherEmojis = ['☀️', '⛅', '🌧️', '❄️', '🌤️', '🌙']
      const randomWeather = weatherEmojis[Math.floor(Math.random() * weatherEmojis.length)]
      const temp = Math.floor(Math.random() * 30) + 15
      output = `\n${randomWeather} Weather in ${personalInfo.location}\n\n`
      output += `  Temperature: ${temp}°C\n`
      output += `  Condition: Perfect for coding! ☕\n`
      output += `  Humidity: 60%\n`
      output += `  Wind: 10 km/h\n`
      type = 'success'
    } else if (commandName === 'matrix') {
      output = `\n`
      const matrixChars = '01'
      for (let i = 0; i < 10; i++) {
        const line = Array.from({ length: 40 }, () => 
          matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ).join('')
        output += `  ${line}\n`
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
      output += `\n  Welcome to the Matrix...\n`
      type = 'info'
    } else if (commandName === 'rainbow') {
      const colors = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣']
      output = `\n`
      colors.forEach((color, idx) => {
        output += `${color} `
        if (idx === colors.length - 1) output += `\n`
      })
      output += `\n🌈 Rainbow mode activated!\n`
      type = 'success'
    } else if (commandName === 'ascii') {
      if (args[0] === 'art') {
        output = `\n`
        output += `  ╔═══════════════════════════╗\n`
        output += `  ║   PORTFOLIO TERMINAL      ║\n`
        output += `  ║   Built with ❤️           ║\n`
        output += `  ╚═══════════════════════════╝\n`
        type = 'info'
      } else {
        output = `\nUsage: ascii art\n`
        type = 'error'
      }
    } else if (commandName === 'fortune') {
      const fortunes = [
        'You will write great code today!',
        'A bug will be fixed by you soon.',
        'Your next project will be amazing!',
        'You will learn something new today.',
        'Success is just one commit away!',
        'Your code will inspire others.',
        'A breakthrough is coming your way!',
      ]
      const fortune = fortunes[Math.floor(Math.random() * fortunes.length)]
      output = `\n🔮 ${fortune}\n`
      type = 'success'
    } else if (commandName === 'neofetch') {
      output = `\n`
      output += `       ${personalInfo.name.split(' ').map(n => n[0]).join('')}@portfolio\n`
      output += `       ─────────────────────\n`
      output += `  OS: Portfolio OS v1.0\n`
      output += `  Host: ${personalInfo.location}\n`
      output += `  Shell: /bin/terminal\n`
      output += `  Theme: ${theme}\n`
      output += `  Projects: ${projects.length}\n`
      output += `  Skills: ${skills.length}\n`
      output += `  Uptime: Always learning\n`
      type = 'info'
    } else if (commandName === 'ping') {
      const target = args[0] || 'localhost'
      output = `\nPING ${target} (127.0.0.1):\n`
      await new Promise((resolve) => setTimeout(resolve, 200))
      output += `64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.123ms\n`
      output += `\n--- ${target} ping statistics ---\n`
      output += `1 packets transmitted, 1 received, 0% packet loss\n`
      type = 'success'
    } else if (commandName === 'calc') {
      if (args.length === 0) {
        output = `\nUsage: calc <expression>\n`
        output += `Example: calc 2 + 2\n`
        type = 'error'
      } else {
        try {
          const expression = args.join(' ')
          // Simple and safe evaluation
          const result = Function(`"use strict"; return (${expression})`)()
          output = `\n${expression} = ${result}\n`
          type = 'success'
        } catch {
          output = `\nError: Invalid expression\n`
          type = 'error'
        }
      }
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
  }, [updateName, router, pages, closeTerminal, theme, setTheme])

  // Legacy support
  const setOpenTerminal = React.useCallback((fn: () => void) => {
    setOpenTerminalFn(() => fn)
  }, [])

  // Center dialog on open
  React.useEffect(() => {
    if (isOpen && !isMaximized && typeof window !== 'undefined') {
      const newPosition = getInitialPosition(size)
      setPosition(newPosition)
    }
  }, [isOpen, isMaximized, size.width, size.height])

  const value = React.useMemo(
    () => ({
      // Window State
      isOpen,
      position,
      size,
      isMinimized,
      isMaximized,
      isDragging,
      isResizing,
      // Command State
      command,
      commandHistory: commandHistoryRef.current,
      history,
      isExecuting,
      commandIndex,
      suggestions,
      availableCommands,
      pages,
      // Window Actions
      openTerminal,
      closeTerminal,
      toggleTerminal,
      setPosition: handleSetPosition,
      setSize: handleSetSize,
      minimizeTerminal,
      maximizeTerminal,
      restoreTerminal,
      setIsDragging: handleSetIsDragging,
      setIsResizing: handleSetIsResizing,
      // Command Actions
      setCommand: handleSetCommand,
      executeCommand,
      clearHistory,
      getSuggestions,
      navigateCommandHistory,
      selectSuggestion,
      // Interactive Prompt
      isInPrompt,
      currentPrompt,
      promptAnswers,
      handlePromptAnswer,
      cancelPrompt,
      getCurrentPromptQuestion,
      // Legacy support
      setOpenTerminal,
    }),
    [
      isOpen,
      position,
      size,
      isMinimized,
      isMaximized,
      isDragging,
      isResizing,
      command,
      history,
      isExecuting,
      commandIndex,
      suggestions,
      availableCommands,
      pages,
      openTerminal,
      closeTerminal,
      toggleTerminal,
      handleSetPosition,
      handleSetSize,
      minimizeTerminal,
      maximizeTerminal,
      restoreTerminal,
      handleSetIsDragging,
      handleSetIsResizing,
      handleSetCommand,
      executeCommand,
      clearHistory,
      getSuggestions,
      navigateCommandHistory,
      selectSuggestion,
      setOpenTerminal,
    ]
  )

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  const context = React.useContext(TerminalContext)
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider')
  }
  return context
}

