"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useState, useMemo, useEffect, useCallback } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme-toggle";

interface LogEntry {
  date: string;
  dayOfWeek: string;
  entries: number;
  exists: boolean;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isDateInRange(
  dateString: string,
  startTime: number | null,
  endTime: number | null
): boolean {
  if (!startTime && !endTime) return true;

  const targetTime = new Date(dateString).getTime();

  if (startTime && endTime) {
    return targetTime >= startTime && targetTime <= endTime;
  } else if (startTime) {
    return targetTime >= startTime;
  } else if (endTime) {
    return targetTime <= endTime;
  }

  return true;
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Fetch available logs from API
  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch("/api/logs");
        if (response.ok) {
          const data = await response.json();
          setLogs(data.logs || []);
        } else {
          console.error("Failed to fetch logs");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  // Pre-calculate timestamps for better performance
  const filterTimestamps = useMemo(
    () => ({
      startTime: startDate ? startDate.getTime() : null,
      endTime: endDate ? endDate.getTime() : null,
    }),
    [startDate, endDate]
  );

  // Filter logs based on date range with optimized logic
  const filteredLogs = useMemo(() => {
    if (!logs.length) return [];

    const { startTime, endTime } = filterTimestamps;

    return logs
      .filter((log) => isDateInRange(log.date, startTime, endTime))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [logs, filterTimestamps]);

  const clearFilters = useCallback(() => {
    setStartDate(undefined);
    setEndDate(undefined);
  }, []);

  if (loading) {
    return (
      <div className="field-surface">
        <main className="mx-auto flex max-w-screen-md flex-col gap-8 px-4 py-28">
          <div className="no-print fixed right-4 top-4 z-50">
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="text-[var(--field-muted)]">Loading logs...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="field-surface">
      <main className="mx-auto flex max-w-screen-md flex-col gap-8 px-4 py-28">
        <div className="no-print fixed right-4 top-4 z-50">
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="border-b-2 border-[var(--field-ink)] pb-8">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-sm font-bold text-[var(--field-muted)] transition-colors hover:text-[var(--field-rust)]"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-normal text-[var(--field-forest)] before:block before:h-0.5 before:w-9 before:bg-[var(--field-forest)]">
              Field notes
            </p>
            <h1 className="field-serif text-5xl font-bold leading-none text-[var(--field-ink)]">
              Daily Devlogs
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-[var(--field-muted)]">
              documenting my daily development journey — bugs, features, and
              everything in between.
            </p>
          </div>
        </div>

        {/* Date Filter Section */}
        <div className="field-card flex flex-col gap-4 p-5">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-[var(--field-rust)]" />
            <span className="text-sm font-bold text-[var(--field-ink)]">
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
                    "border-[var(--field-ink)] bg-[var(--field-panel)]",
                    "text-[var(--field-ink)] hover:bg-[var(--field-paper)]",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[var(--field-rust)]" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto border-[var(--field-ink)] bg-[var(--field-panel)] p-0"
                align="start"
              >
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

            <span className="text-sm text-[var(--field-muted)]">to</span>

            {/* End Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    "border-[var(--field-ink)] bg-[var(--field-panel)]",
                    "text-[var(--field-ink)] hover:bg-[var(--field-paper)]",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[var(--field-rust)]" />
                  {endDate ? format(endDate, "PPP") : <span>End date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto border-[var(--field-ink)] bg-[var(--field-panel)] p-0"
                align="start"
              >
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
              className="border-[var(--field-ink)] bg-[var(--field-panel)] text-[var(--field-ink)] hover:bg-[var(--field-paper)] hover:text-[var(--field-rust)]"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>

          <div className="text-sm text-[var(--field-muted)]">
            {startDate || endDate
              ? `Showing ${filteredLogs.length} logs ${startDate ? `from ${format(startDate, "MMM d, yyyy")}` : ""} ${
                  startDate && endDate ? "to" : ""
                } ${endDate ? `${!startDate ? "until" : ""} ${format(endDate, "MMM d, yyyy")}` : ""}`
              : `Showing all ${logs.length} logs`}
          </div>
        </div>

        {/* Logs List */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {filteredLogs.map((log) => (
              <div
                key={log.date}
                className="field-card group flex items-center gap-3 p-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Link
                  href={`/logs/${log.date}`}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-[var(--field-rust)] transition-transform duration-200" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="field-serif text-xl font-bold text-[var(--field-rust)] transition-colors duration-200">
                      {formatDate(log.date)}
                    </h3>
                    <p className="text-sm text-[var(--field-muted)]">
                      {log.dayOfWeek}
                    </p>
                  </div>

                  <div className="ml-auto text-sm text-[var(--field-muted)]">
                    {log.entries} {log.entries === 1 ? "entry" : "entries"}
                  </div>
                </Link>

                <Link
                  href={`/logs/${log.date}`}
                  className="border border-transparent p-2 opacity-0 transition-all duration-200 hover:border-[var(--field-line)] group-hover:opacity-100"
                  title="View full devlog"
                >
                  <ExternalLink className="h-4 w-4 text-[var(--field-muted)] hover:text-[var(--field-rust)]" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State (when no logs match filter) */}
        {filteredLogs.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-12">
            <CalendarIcon className="h-12 w-12 text-[var(--field-line)]" />
            <div className="text-center">
              <h3 className="mb-1 font-bold text-[var(--field-ink)]">
                {logs.length === 0 ? "No logs found" : "No logs match filter"}
              </h3>
              <p className="text-sm text-[var(--field-muted)]">
                {logs.length === 0
                  ? 'Create your first log entry with "npm run new-log"'
                  : "Try adjusting your date range or clear the filters."}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
