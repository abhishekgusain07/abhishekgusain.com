# 📝 Devlog System Guide

This guide explains how to create and manage daily devlog entries for your portfolio.

## 🚀 Quick Start - Adding Today's Entry

### Method 1: Automated Script (Recommended)

```bash
# Create entry for today
npm run new-log

# Create entry for specific date
npm run new-log 2025-01-26
```

### Method 2: Manual Creation

1. Create file: `src/logs/2025-01-25.mdx`
2. Write your content using the template
3. Save the file - it will appear automatically!

## 📋 Template Structure

Each devlog entry follows this structure:

````markdown
# Daily Log - Saturday, January 25, 2025

## What I worked on today

- Feature implementation
- Bug fixes
- Learning new concepts

## Challenges faced

- Specific problems you encountered
- How you approached solving them

## What I learned

Key insights and discoveries from the day

## Code snippet of the day

```typescript
// Share interesting code you wrote
const example = "meaningful code snippet";
```
````

## Tomorrow's plan

- Next steps
- Goals for tomorrow

## Reflection

Personal thoughts about progress and growth

````

## ✨ Automatic File Discovery

**No more manual data updates!** The system now automatically:

- 🔍 **Scans** the `src/logs/` directory for MDX files
- 📅 **Detects** all log entries by filename (YYYY-MM-DD.mdx)
- 🔄 **Updates** the logs list in real-time
- 🎯 **Displays** them on the `/logs` page automatically

## 🎯 Complete Example Workflow

Let's say you want to add today's entry:

1. **Generate template:**
   ```bash
   npm run new-log
````

2. **Fill in your content** in the created MDX file

3. **Save the file** - that's it!

4. **Visit `/logs`** to see your entry appear automatically

## 📁 File Structure

```
├── src/
│   ├── app/
│   │   ├── api/logs/
│   │   │   └── route.ts          # API endpoint for log discovery
│   │   └── logs/
│   │       ├── layout.tsx        # Logs section metadata
│   │       ├── page.tsx          # Main listing page (no mock data!)
│   │       └── [date]/
│   │           └── page.tsx      # Individual log pages
│   ├── lib/
│   │   └── logs.ts               # File discovery utilities
│   └── logs/                     # Your MDX files (auto-discovered!)
│       ├── 2025-01-20.mdx
│       ├── 2025-01-21.mdx
│       └── 2025-01-25.mdx
└── scripts/
    └── new-log.js                # Helper script
```

## 🔧 How It Works

### Automatic Discovery Process:

1. **File Scanning**: Server-side utilities scan `src/logs/` directory
2. **Validation**: Only files matching `YYYY-MM-DD.mdx` pattern are included
3. **API Endpoint**: `/api/logs` serves the discovered log data
4. **Client Fetch**: Frontend fetches and displays the logs
5. **Real-time Updates**: New files appear automatically on page refresh

### Technical Implementation:

```typescript
// src/lib/logs.ts - Automatic file discovery
export function getAvailableLogs(): LogEntry[] {
  const logsDirectory = path.join(process.cwd(), "src", "logs");
  const files = fs.readdirSync(logsDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .filter((file) => /^\d{4}-\d{2}-\d{2}\.mdx$/.test(file))
    .map((file) => ({
      date: file.replace(".mdx", ""),
      // ... other properties
    }));
}
```

## 💡 Pro Tips

1. **Daily Habit**: Set a reminder to log at the end of each coding day
2. **Consistent Naming**: Always use YYYY-MM-DD format for file names
3. **Code Snippets**: Include interesting code you wrote or learned
4. **Problem Solving**: Document challenges - future you will thank you
5. **Honest Reflection**: Include both wins and struggles
6. **Forward Planning**: Use tomorrow's plan section actively

## 🎯 Benefits of Automatic Discovery

- ✅ **No Manual Updates**: Just create files, system handles the rest
- ✅ **Error-Free**: No more forgetting to update mock data arrays
- ✅ **Scalable**: Handles any number of log entries automatically
- ✅ **Real-time**: New logs appear immediately after creation
- ✅ **Maintainable**: Clean separation between content and logic

## 🚨 Important Notes

- **Date Format**: Always use YYYY-MM-DD format for file names
- **File Location**: All log files go in `src/logs/` directory
- **File Extension**: Use `.mdx` extension for all log files
- **Content Structure**: Following the template helps maintain readability

## 🔮 Future Enhancements

Now that automatic discovery is implemented, potential next steps:

- [ ] Full MDX processing with React components
- [ ] Syntax highlighting for code blocks
- [ ] Search functionality across all entries
- [ ] Tags and categorization system
- [ ] RSS feed generation
- [ ] Previous/Next navigation between entries

This devlog system now provides a seamless experience - just write your logs and they appear automatically! 🎯
