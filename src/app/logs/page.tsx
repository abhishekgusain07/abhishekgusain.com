import { Metadata } from "next"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChevronRight, Calendar, ExternalLink, X } from "lucide-react"

export const metadata: Metadata = {
  title: "Daily Devlogs - Abhishek Gusain",
  description: "Documenting my daily development journey — bugs, features, and everything in between.",
}

// Mock data for now - this will be replaced with actual log data later
const mockLogs = [
  { date: "2025-01-20", dayOfWeek: "Monday", entries: 2 },
  { date: "2025-01-21", dayOfWeek: "Tuesday", entries: 3 },
  { date: "2025-01-22", dayOfWeek: "Wednesday", entries: 1 },
  { date: "2025-01-23", dayOfWeek: "Thursday", entries: 4 },
  { date: "2025-01-24", dayOfWeek: "Friday", entries: 2 },
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

export default function LogsPage() {
  return (
    <main className="mx-auto max-w-screen-md px-4 py-28 flex flex-col gap-8">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="text-neutral-6 dark:text-neutral-dark-6 hover:text-neutral-8 dark:hover:text-neutral-dark-8 transition-colors text-sm"
          >
            ← Back to Portfolio
          </Link>
        </div>
        
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold text-neutral-8 dark:text-neutral-dark-8 tracking-tighter">
            Daily Devlogs
          </h1>
          <p className="text-neutral-6 dark:text-neutral-dark-6 text-sm">
            documenting my daily development journey — bugs, features, and everything in between.
          </p>
        </div>
      </div>

      {/* Date Filter Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-medium text-neutral-7 dark:text-neutral-dark-7 text-sm">
            Filter by date range:
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all h-9 px-4 py-2 justify-start text-left font-normal bg-neutral-2 dark:bg-neutral-dark-2 border border-neutral-3 dark:border-neutral-dark-3 text-neutral-7 dark:text-neutral-dark-7 hover:bg-neutral-3 dark:hover:bg-neutral-dark-3">
            <Calendar className="mr-2 w-4 h-4 text-primary" />
            Jan 20, 2025
          </button>
          
          <span className="text-neutral-6 dark:text-neutral-dark-6 text-sm">to</span>
          
          <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all h-9 px-4 py-2 justify-start text-left font-normal bg-neutral-2 dark:bg-neutral-dark-2 border border-neutral-3 dark:border-neutral-dark-3 text-neutral-7 dark:text-neutral-dark-7 hover:bg-neutral-3 dark:hover:bg-neutral-dark-3">
            <Calendar className="mr-2 w-4 h-4 text-primary" />
            Jan 24, 2025
          </button>
          
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3 bg-neutral-2 dark:bg-neutral-dark-2 hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 border border-neutral-3 dark:border-neutral-dark-3 text-neutral-6 dark:text-neutral-dark-6 hover:text-primary">
            <X className="w-4 h-4" />
            Clear
          </button>
        </div>
        
        <div className="text-neutral-6 dark:text-neutral-dark-6 text-sm">
          Showing logs from Jan 20, 2025 to Jan 24, 2025
        </div>
      </div>

      {/* Logs List */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {mockLogs.map((log, index) => (
            <div 
              key={log.date}
              className="group flex items-center gap-3 hover:bg-neutral-2 dark:hover:bg-neutral-dark-2 p-3 rounded-lg transition-colors duration-200"
            >
              <button className="flex flex-1 items-center gap-3 text-left">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-primary transition-transform duration-200" />
                </div>
                
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-primary group-hover:text-primary text-lg transition-colors duration-200">
                    {formatDate(log.date)}
                  </h3>
                  <p className="text-neutral-6 dark:text-neutral-dark-6 text-sm">
                    {log.dayOfWeek}
                  </p>
                </div>
                
                <div className="ml-auto text-neutral-5 dark:text-neutral-dark-5 text-sm">
                  {log.entries} {log.entries === 1 ? 'entry' : 'entries'}
                </div>
              </button>
              
              <Link
                href={`/logs/${log.date}`}
                className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all duration-200"
                title="View full devlog"
              >
                <ExternalLink className="w-4 h-4 text-neutral-5 dark:text-neutral-dark-5 hover:text-primary" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State (when no logs match filter) */}
      {mockLogs.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-12">
          <Calendar className="w-12 h-12 text-neutral-4 dark:text-neutral-dark-4" />
          <div className="text-center">
            <h3 className="font-medium text-neutral-7 dark:text-neutral-dark-7 mb-1">
              No logs found
            </h3>
            <p className="text-neutral-5 dark:text-neutral-dark-5 text-sm">
              Try adjusting your date range or check back later for new entries.
            </p>
          </div>
        </div>
      )}
    </main>
  )
} 