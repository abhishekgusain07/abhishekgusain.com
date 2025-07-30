import fs from "fs";
import path from "path";

export interface LogEntry {
  date: string;
  dayOfWeek: string;
  entries: number;
  exists: boolean;
}

// Cache for logs to avoid repeated file system reads
let logsCache: LogEntry[] | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 30000; // 30 seconds

/**
 * Get all available log files from the logs directory
 * This runs server-side and automatically discovers log files
 */
export function getAvailableLogs(): LogEntry[] {
  const now = Date.now();

  // Return cached data if it's still fresh
  if (logsCache && now - lastCacheTime < CACHE_DURATION) {
    return logsCache;
  }

  try {
    const logsDirectory = path.join(process.cwd(), "src", "logs");

    // Check if logs directory exists
    if (!fs.existsSync(logsDirectory)) {
      console.warn("Logs directory does not exist:", logsDirectory);
      return [];
    }

    // Read all files in the logs directory
    const files = fs.readdirSync(logsDirectory);

    // Filter for .mdx files and extract dates
    const logFiles = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""))
      .filter((dateStr) => {
        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(dateStr);
      });

    // Convert to LogEntry objects with optimized date processing
    const logs: LogEntry[] = logFiles.map((dateStr) => {
      // Use more efficient date processing
      const [year, month, day] = dateStr.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

      return {
        date: dateStr,
        dayOfWeek,
        entries: 1, // For now, assume 1 entry per file
        exists: true,
      };
    });

    // Sort newest first
    logs.sort((a, b) => b.date.localeCompare(a.date));

    // Update cache
    logsCache = logs;
    lastCacheTime = now;

    return logs;
  } catch (error) {
    console.error("Error reading logs directory:", error);
    return [];
  }
}

/**
 * Clear the logs cache (useful for development or when files change)
 */
export function clearLogsCache(): void {
  logsCache = null;
  lastCacheTime = 0;
}

/**
 * Check if a specific log file exists
 */
export function logExists(date: string): boolean {
  try {
    const logsDirectory = path.join(process.cwd(), "src", "logs");
    const filePath = path.join(logsDirectory, `${date}.mdx`);
    return fs.existsSync(filePath);
  } catch (error) {
    console.error("Error checking log existence:", error);
    return false;
  }
}

/**
 * Read the content of a specific log file
 */
export function getLogContent(date: string): string | null {
  try {
    const logsDirectory = path.join(process.cwd(), "src", "logs");
    const filePath = path.join(logsDirectory, `${date}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Error reading log file:", error);
    return null;
  }
}

/**
 * Get all available log dates (for date picker options)
 */
export function getAvailableLogDates(): string[] {
  const logs = getAvailableLogs();
  return logs.map((log) => log.date);
}
