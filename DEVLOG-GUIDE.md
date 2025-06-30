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
2. Update mock data in two files (details below)
3. Write your content using the template

## 📋 Template Structure

Each devlog entry follows this structure:

```markdown
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

## Tomorrow's plan
- Next steps
- Goals for tomorrow

## Reflection
Personal thoughts about progress and growth
```

## 🔧 Current Setup (Manual Updates Required)

After creating a log file, update these two files:

### 1. `src/app/logs/page.tsx`
Add to the `mockLogs` array:
```javascript
{ date: "2025-01-25", dayOfWeek: "Saturday", entries: 1 }
```

### 2. `src/app/logs/[date]/page.tsx`  
Add to the `mockDates` array:
```javascript
'2025-01-25'
```

## 🎯 Complete Example Workflow

Let's say you want to add today's entry:

1. **Generate template:**
   ```bash
   npm run new-log
   ```

2. **Fill in your content** in the created MDX file

3. **Update mock data** as shown above

4. **Test it works** by visiting `/logs` in your browser

## 📁 File Structure

```
├── src/
│   ├── app/logs/
│   │   ├── page.tsx              # Main listing page
│   │   └── [date]/page.tsx       # Individual entries
│   └── logs/                     # Your MDX files
│       ├── 2025-01-20.mdx
│       ├── 2025-01-21.mdx
│       └── 2025-01-25.mdx
└── scripts/
    └── new-log.js                # Helper script
```

## 💡 Pro Tips

1. **Daily Habit**: Set a reminder to log at the end of each coding day
2. **Code Snippets**: Include interesting code you wrote or learned
3. **Problem Solving**: Document challenges - future you will thank you
4. **Honest Reflection**: Include both wins and struggles
5. **Forward Planning**: Use tomorrow's plan section actively

## 🔮 Future Improvements

The system is currently using mock data for simplicity. Planned enhancements:

- [ ] Automatic file discovery (eliminate manual mock data updates)  
- [ ] Full MDX processing with syntax highlighting
- [ ] Search functionality across all entries
- [ ] Tags and categorization
- [ ] RSS feed for subscribers

## 🚨 Important Notes

- **Date Format**: Always use YYYY-MM-DD format
- **File Location**: All log files go in `src/logs/` directory  
- **Mock Data**: Remember to update both mock arrays after creating new entries
- **Consistent Structure**: Following the template helps maintain readability

This devlog system helps you track progress, remember solutions, and share your engineering journey! 🎯 