import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Calendar, ArrowLeft } from "lucide-react"

interface LogPageProps {
  params: {
    date: string
  }
}

// Generate metadata dynamically based on the date
export async function generateMetadata({ params }: LogPageProps): Promise<Metadata> {
  const { date } = params
  
  // Validate date format
  if (!isValidDate(date)) {
    return {
      title: "Log Not Found - Abhishek Gusain",
      description: "The requested devlog entry was not found.",
    }
  }

  const formattedDate = formatDate(date)
  
  return {
    title: `Devlog - ${formattedDate} - Abhishek Gusain`,
    description: `Daily development log for ${formattedDate}`,
  }
}

function isValidDate(dateString: string): boolean {
  // Check if date matches YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(dateString)) return false
  
  // Check if it's a valid date
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateString
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  })
}

function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

// Mock function to check if log exists - this will be replaced with actual file reading logic
function logExists(date: string): boolean {
  // For now, return true for dates in January 2025
  const mockDates = ['2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20', '2025-01-21', '2025-01-22', '2025-01-23', '2025-01-24', '2025-01-25']
  return mockDates.includes(date)
}

// Mock function to get log content - this will be replaced with MDX reading logic
function getLogContent(date: string): string {
  return `# Daily Log - ${formatDate(date)}

## What I worked on today

- Implemented the devlog feature for my portfolio
- Set up dynamic routing for individual log entries
- Created a beautiful listing page inspired by modern devlog designs
- Learned more about Next.js App Router and dynamic metadata generation

## Challenges faced

- Understanding how to properly structure the dynamic routes
- Adapting the design inspiration to match my existing portfolio theme
- Setting up the proper TypeScript types for the dynamic parameters

## What I learned

Today was a productive day working on the devlog feature. The dynamic routing in Next.js App Router is quite elegant once you understand the folder structure conventions.

## Tomorrow's plan

- Implement MDX support for rich markdown rendering
- Add syntax highlighting for code blocks
- Create a few more sample log entries
- Add navigation between different log entries

## Code snippet of the day

\`\`\`typescript
// Dynamic metadata generation in Next.js App Router
export async function generateMetadata({ params }: LogPageProps): Promise<Metadata> {
  const { date } = params
  const formattedDate = formatDate(date)
  
  return {
    title: \`Devlog - \${formattedDate} - Abhishek Gusain\`,
    description: \`Daily development log for \${formattedDate}\`,
  }
}
\`\`\`

This pattern allows for SEO-friendly dynamic pages with proper meta tags.`
}

export default function LogPage({ params }: LogPageProps) {
  const { date } = params

  // Validate date format
  if (!isValidDate(date)) {
    notFound()
  }

  // Check if log exists
  if (!logExists(date)) {
    notFound()
  }

  const formattedDate = formatDate(date)
  const dayOfWeek = getDayOfWeek(date)
  const content = getLogContent(date)

  return (
    <main className="mx-auto max-w-screen-md px-4 py-28 flex flex-col gap-8">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Link 
            href="/logs" 
            className="text-neutral-6 dark:text-neutral-dark-6 hover:text-neutral-8 dark:hover:text-neutral-dark-8 transition-colors text-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Logs
          </Link>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">{date}</span>
          </div>
          
          <h1 className="text-4xl font-semibold text-neutral-8 dark:text-neutral-dark-8 tracking-tighter">
            {formattedDate}
          </h1>
          
          <p className="text-neutral-6 dark:text-neutral-dark-6 text-sm">
            {dayOfWeek}
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-neutral-7 dark:text-neutral-dark-7 leading-relaxed">
          {content}
        </div>
      </article>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-neutral-3 dark:border-neutral-dark-3">
        <Link 
          href="/logs/2025-01-24" 
          className="text-neutral-6 dark:text-neutral-dark-6 hover:text-primary transition-colors text-sm flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous Day
        </Link>
        
        <Link 
          href="/logs/2025-01-26" 
          className="text-neutral-6 dark:text-neutral-dark-6 hover:text-primary transition-colors text-sm flex items-center gap-1"
        >
          Next Day
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </Link>
      </div>
    </main>
  )
} 