"use client"

import { Metadata } from "next"
import Link from "next/link"
import { useState, useMemo } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronRight, ExternalLink, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data for now - this will be replaced with actual log data later
const mockLogs = [
  { date: "2025-01-25", dayOfWeek: "Saturday", entries: 1 },
  { date: "2025-01-24", dayOfWeek: "Friday", entries: 2 },
  { date: "2025-01-23", dayOfWeek: "Thursday", entries: 4 },
  { date: "2025-01-22", dayOfWeek: "Wednesday", entries: 1 },
  { date: "2025-01-21", dayOfWeek: "Tuesday", entries: 3 },
  { date: "2025-01-20", dayOfWeek: "Monday", entries: 2 },
  { date: "2025-01-19", dayOfWeek: "Sunday", entries: 2 },
  { date: "2025-01-18", dayOfWeek: "Saturday", entries: 1 },
  { date: "2025-01-17", dayOfWeek: "Friday", entries: 3 },
  { date: "2025-01-16", dayOfWeek: "Thursday", entries: 2 },
  { date: "2025-01-15", dayOfWeek: "Wednesday", entries: 1 },
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

function isDateInRange(date: string, startDate: Date | undefined, endDate: Date | undefined): boolean {
  if (!startDate && !endDate) return true
  
  const targetDate = new Date(date)
  
  if (startDate && endDate) {
    return targetDate >= startDate && targetDate <= endDate
  } else if (startDate) {
    return targetDate >= startDate
  } else if (endDate) {
    return targetDate <= endDate
  }
  
  return true
}

export default function LogsPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date("2025-01-20"))
  const [endDate, setEndDate] = useState<Date | undefined>(new Date("2025-01-25"))

  // Filter logs based on date range
  const filteredLogs = useMemo(() => {
    return mockLogs
      .filter(log => isDateInRange(log.date, startDate, endDate))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [startDate, endDate])

  const clearFilters = () => {
    setStartDate(undefined)
    setEndDate(undefined)
  }

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
          <CalendarIcon className="w-4 h-4 text-primary" />
          <span className="font-medium text-neutral-7 dark:text-neutral-dark-7 text-sm">
            Filter by date range:
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Start Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  "bg-neutral-2 dark:bg-neutral-dark-2 border-neutral-3 dark:border-neutral-dark-3",
                  "text-neutral-7 dark:text-neutral-dark-7 hover:bg-neutral-3 dark:hover:bg-neutral-dark-3",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {startDate ? format(startDate, "PPP") : <span>Start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white dark:bg-neutral-dark-1 border-neutral-3 dark:border-neutral-dark-3" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <span className="text-neutral-6 dark:text-neutral-dark-6 text-sm">to</span>
          
          {/* End Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  "bg-neutral-2 dark:bg-neutral-dark-2 border-neutral-3 dark:border-neutral-dark-3",
                  "text-neutral-7 dark:text-neutral-dark-7 hover:bg-neutral-3 dark:hover:bg-neutral-dark-3",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {endDate ? format(endDate, "PPP") : <span>End date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white dark:bg-neutral-dark-1 border-neutral-3 dark:border-neutral-dark-3" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="bg-neutral-2 dark:bg-neutral-dark-2 hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 border-neutral-3 dark:border-neutral-dark-3 text-neutral-6 dark:text-neutral-dark-6 hover:text-primary"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
        
        <div className="text-neutral-6 dark:text-neutral-dark-6 text-sm">
          {startDate || endDate ? (
            `Showing logs ${startDate ? `from ${format(startDate, "MMM d, yyyy")}` : ''} ${
              startDate && endDate ? 'to' : ''
            } ${endDate ? `${!startDate ? 'until' : ''} ${format(endDate, "MMM d, yyyy")}` : ''}`
          ) : (
            `Showing all ${mockLogs.length} logs`
          )}
        </div>
      </div>

      {/* Logs List */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {filteredLogs.map((log, index) => (
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
      {filteredLogs.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-12">
          <CalendarIcon className="w-12 h-12 text-neutral-4 dark:text-neutral-dark-4" />
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