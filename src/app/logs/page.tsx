"use client"

import { Metadata } from "next"
import Link from "next/link"
import { useState, useMemo, useEffect, useCallback } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronRight, ExternalLink, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ThemeToggle } from "@/components/theme-toggle"

interface LogEntry {
  date: string
  dayOfWeek: string
  entries: number
  exists: boolean
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

function isDateInRange(dateString: string, startTime: number | null, endTime: number | null): boolean {
  if (!startTime && !endTime) return true
  
  const targetTime = new Date(dateString).getTime()
  
  if (startTime && endTime) {
    return targetTime >= startTime && targetTime <= endTime
  } else if (startTime) {
    return targetTime >= startTime
  } else if (endTime) {
    return targetTime <= endTime
  }
  
  return true
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  // Fetch available logs from API
  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch('/api/logs')
        if (response.ok) {
          const data = await response.json()
          setLogs(data.logs || [])
        } else {
          console.error('Failed to fetch logs')
        }
      } catch (error) {
        console.error('Error fetching logs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  // Pre-calculate timestamps for better performance
  const filterTimestamps = useMemo(() => ({
    startTime: startDate ? startDate.getTime() : null,
    endTime: endDate ? endDate.getTime() : null
  }), [startDate, endDate])

  // Filter logs based on date range with optimized logic
  const filteredLogs = useMemo(() => {
    if (!logs.length) return []
    
    const { startTime, endTime } = filterTimestamps
    
    return logs
      .filter(log => isDateInRange(log.date, startTime, endTime))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [logs, filterTimestamps])

  const clearFilters = useCallback(() => {
    setStartDate(undefined)
    setEndDate(undefined)
  }, [])

  if (loading) {
    return (
      <main className="mx-auto max-w-screen-md px-4 py-28 flex flex-col gap-8">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-neutral-6 dark:text-neutral-dark-6">Loading logs...</div>
        </div>
      </main>
    )
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
          
          {(startDate || endDate) && (
                      {(startDate || endDate) && (
            <Button 
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="bg-neutral-2 dark:bg-neutral-dark-2 hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 border-neutral-3 dark:border-neutral-dark-3 text-neutral-6 dark:text-neutral-dark-6 hover:text-primary"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
          )}
        </div>
        
        <div className="text-neutral-6 dark:text-neutral-dark-6 text-sm">
          {startDate || endDate ? (
            `Showing ${filteredLogs.length} logs ${startDate ? `from ${format(startDate, "MMM d, yyyy")}` : ''} ${
              startDate && endDate ? 'to' : ''
            } ${endDate ? `${!startDate ? 'until' : ''} ${format(endDate, "MMM d, yyyy")}` : ''}`
          ) : (
            `Showing all ${logs.length} logs`
          )}
        </div>
      </div>

      {/* Logs List */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {filteredLogs.map((log) => (
            <div 
              key={log.date}
              className="group flex items-center gap-3 hover:bg-neutral-2 dark:hover:bg-neutral-dark-2 p-3 rounded-lg transition-colors duration-200"
            >
              <Link
                href={`/logs/${log.date}`}
                className="flex flex-1 items-center gap-3 text-left"
              >
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
              </Link>
              
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
              {logs.length === 0 ? 'No logs found' : 'No logs match filter'}
            </h3>
            <p className="text-neutral-5 dark:text-neutral-dark-5 text-sm">
              {logs.length === 0 
                ? 'Create your first log entry with "npm run new-log"'
                : 'Try adjusting your date range or clear the filters.'
              }
            </p>
          </div>
        </div>
      )}
    </main>
  )
} 