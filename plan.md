# PRD: Devlog Feature for Portfolio

## 1. Overview

This document outlines the requirements and implementation plan for adding a new "Devlog" section to the personal portfolio website. This feature will allow the author to document their daily engineering activities, learnings, and project progress.

## 2. Background

The portfolio currently showcases projects and professional information. A devlog will provide a dynamic and personal touch, offering insights into the author's ongoing work and learning process. This will help in personal knowledge management and also demonstrate a commitment to continuous learning and building.

## 3. Goals

*   To create a dedicated section for daily logs at the route `/logs/[date]`.
*   To enable the author to easily create and publish new log entries.
*   To present the logs in a clean, readable, and accessible format.
*   To integrate the new section seamlessly with the existing design and navigation of the portfolio.

## 4. Feature Requirements

### 4.1. Dynamic Routing

*   The devlogs will be accessible via dynamic routes based on the date, e.g., `/logs/2025-06-30`.
*   The date format in the URL will be `YYYY-MM-DD`.

### 4.2. Log Entry Creation

*   For the initial implementation (MVP), log entries will be created as Markdown files (`.md` or `.mdx`) within the project structure. This is the simplest approach and avoids the need for a database or a complex CMS.
*   A new directory, `src/app/logs/`, will be created to store these Markdown files.
*   Each log entry will be a separate Markdown file, named after the date, e.g., `2025-06-30.mdx`.

### 4.3. Log Entry Display

*   A new page component will be created at `src/app/logs/[date]/page.tsx` to render the Markdown content.
*   The page will dynamically fetch the content of the corresponding Markdown file based on the `date` parameter from the URL.
*   The rendered page will display the formatted content of the Markdown file.
*   The page should have a consistent layout with the rest of the portfolio, including the header, footer, and theme.

### 4.4. Content and Styling

*   The log entries will be written in Markdown, allowing for easy formatting of text, code blocks, lists, and links.
*   The styling of the rendered Markdown should be consistent with the overall aesthetic of the portfolio. This includes typography, colors, and spacing.
*   Code blocks should have syntax highlighting.

## 5. Technical Implementation Plan

### Step 1: Create the Directory Structure

1.  Create a new directory `src/app/logs`.
2.  Inside `src/app/logs`, create a directory for the dynamic route: `[date]`.
3.  Inside `src/app/logs/[date]`, create the page file: `page.tsx`.

### Step 2: Create a Sample Log Entry

1.  Create a new directory `src/logs` at the root of the project to store the markdown files.
2.  Create a sample log file: `src/logs/2025-06-30.mdx`.
3.  Add some sample Markdown content to this file.

### Step 3: Implement the Log Page

1.  In `src/app/logs/[date]/page.tsx`, implement the component to read and render the Markdown file.
2.  Use a library like `next-mdx-remote` or a similar solution to parse and render the MDX content. This will require adding a new dependency to `package.json`.
3.  The page component will receive the `date` as a prop from the dynamic route.
4.  It will use this date to construct the path to the corresponding `.mdx` file (e.g., `src/logs/${date}.mdx`).
5.  It will read the file content and pass it to the MDX renderer.

### Step 4: Add Navigation (Optional but Recommended)

*   Add a link to the devlog section in the main navigation of the portfolio. This could be a link to a new `/logs` page that lists all the available logs.

### Step 5: Styling

*   Ensure the rendered Markdown content is styled correctly. This might involve adding styles to `globals.css` or creating a dedicated stylesheet for the log pages.
*   Pay special attention to the styling of headings, paragraphs, lists, links, and code blocks.

## 6. Data Storage

*   Log entries will be stored as `.mdx` files in the `src/logs` directory.
*   This approach is chosen for its simplicity and the fact that it keeps the content version-controlled with the rest of the codebase.

## 7. UI/UX

*   The log pages will have a minimalist design, focusing on readability.
*   The layout will be consistent with the existing pages.
*   A clear title indicating the date of the log entry will be displayed.

## 8. Timeline

This is a relatively small feature and can be implemented in a few hours.

*   **Milestone 1: Basic Implementation (2-3 hours)**
    *   Set up the directory structure.
    *   Create the dynamic page component.
    *   Implement the logic to read and display a single log entry.
*   **Milestone 2: Styling and Refinement (1-2 hours)**
    *   Apply styles to the rendered Markdown.
    -   Ensure the page is responsive and looks good on all devices.

This plan provides a clear path for an engineer to implement the devlog feature. It is detailed enough to be actionable, yet flexible enough to allow for minor adjustments during development.