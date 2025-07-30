#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get today's date or use provided date
const args = process.argv.slice(2);
const inputDate = args[0];

let targetDate;
if (inputDate) {
  // Validate input date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(inputDate)) {
    console.error("❌ Invalid date format. Please use YYYY-MM-DD");
    process.exit(1);
  }
  targetDate = new Date(inputDate);
  if (isNaN(targetDate.getTime())) {
    console.error("❌ Invalid date provided");
    process.exit(1);
  }
} else {
  targetDate = new Date();
}

// Format date for file name (ensure correct timezone)
const year = targetDate.getFullYear();
const month = String(targetDate.getMonth() + 1).padStart(2, "0");
const day = String(targetDate.getDate()).padStart(2, "0");
const dateStr = `${year}-${month}-${day}`; // YYYY-MM-DD
const dayName = targetDate.toLocaleDateString("en-US", { weekday: "long" });
const longDate = targetDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
});

// Paths
const logsDir = path.join(process.cwd(), "src", "logs");
const logFile = path.join(logsDir, `${dateStr}.mdx`);

// Check if log already exists
if (fs.existsSync(logFile)) {
  console.log(`📝 Log for ${dateStr} already exists!`);
  console.log(`📂 File: ${logFile}`);
  console.log("");
  console.log("💡 TIP: Open the file to continue editing your daily log!");
  process.exit(0);
}

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Template for new log entry
const template = `# Daily Log - ${longDate}

## What I worked on today

- 
- 
- 

## Challenges faced

- 

## What I learned

## Code snippet of the day

\`\`\`typescript
// Add your code snippet here
\`\`\`

## Tomorrow's plan

- 
- 

## Reflection

`;

try {
  // Write the template to file
  fs.writeFileSync(logFile, template);

  console.log("✅ New devlog entry created!");
  console.log(`📅 Date: ${longDate}`);
  console.log(`📂 File: ${logFile}`);
  console.log("");
  console.log("🎯 Your log is automatically available at:");
  console.log(`   http://localhost:3000/logs/${dateStr}`);
  console.log("");
  console.log("📝 What to do next:");
  console.log("   1. Open the file and write your daily log");
  console.log("   2. Save the file");
  console.log("   3. Visit /logs to see it appear automatically!");
  console.log("");
  console.log(
    "✨ No manual data updates needed - the system detects your log files automatically!"
  );
} catch (error) {
  console.error("❌ Error creating log file:", error.message);
  process.exit(1);
}
