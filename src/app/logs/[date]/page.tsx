import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShareButton } from "@/components/ShareButton";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { logExists, getLogContent } from "@/lib/logs";

interface LogPageProps {
  params: Promise<{
    date: string;
  }>;
}

// Generate metadata dynamically based on the date
export async function generateMetadata({
  params,
}: LogPageProps): Promise<Metadata> {
  const { date } = await params;

  // Validate date format
  if (!isValidDate(date)) {
    return {
      title: "Log Not Found - Abhishek Gusain",
      description: "The requested devlog entry was not found.",
    };
  }

  const formattedDate = formatDate(date);

  return {
    title: `Devlog - ${formattedDate} - Abhishek Gusain`,
    description: `Daily development log for ${formattedDate}`,
  };
}

function isValidDate(dateString: string): boolean {
  // Check if date matches YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  // Check if it's a valid date
  const date = new Date(dateString);
  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === dateString
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

// Parse markdown content into sections
function parseLogContent(content: string) {
  const lines = content.split("\n");
  const sections: Array<{ title: string; content: string; items?: string[] }> =
    [];
  let currentSection: {
    title: string;
    content: string;
    items?: string[];
  } | null = null;

  for (const line of lines) {
    // Skip the main title
    if (line.startsWith("# Daily Log")) continue;

    // Handle section headers
    if (line.startsWith("## ")) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        title: line.replace("## ", "").trim(),
        content: "",
        items: [],
      };
    }
    // Handle list items
    else if (line.startsWith("- ") && currentSection) {
      const item = line.replace("- ", "").trim();
      if (item) {
        currentSection.items?.push(item);
      }
    }
    // Handle regular content
    else if (line.trim() && currentSection) {
      currentSection.content += line + "\n";
    }
  }

  // Add the last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

export default async function LogPage({ params }: LogPageProps) {
  const { date } = await params;

  // Validate date format
  if (!isValidDate(date)) {
    notFound();
  }

  // Check if log exists using our utility function
  if (!logExists(date)) {
    notFound();
  }

  // Get the actual content from the MDX file
  const content = getLogContent(date);

  if (!content) {
    notFound();
  }

  const formattedDate = formatDate(date);
  const formattedDateShort = formatDateShort(date);
  const dayOfWeek = getDayOfWeek(date);
  const sections = parseLogContent(content);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-4xl p-4">
        <div className="px-4 sm:px-6 md:px-8 py-4 w-full">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="relative w-full h-48 bg-gradient-to-r from-neutral-2 to-neutral-3 dark:from-neutral-dark-2 dark:to-neutral-dark-3 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-xl">
                    AG
                  </div>
                  <div>
                    <h2 className="font-bold text-neutral-8 dark:text-neutral-dark-8 text-2xl">
                      Abhishek Gusain
                    </h2>
                    <p className="text-neutral-6 dark:text-neutral-dark-6 text-sm">
                      engineer • builder • creator
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation and Actions */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/logs">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 hover:bg-neutral-2 dark:hover:bg-neutral-dark-2 text-neutral-6 dark:text-neutral-dark-6 hover:text-neutral-8 dark:hover:text-neutral-dark-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Logs
              </button>
            </Link>

            <ShareButton date={date} />
          </div>

          {/* Date Header */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-primary text-3xl">
                  {formattedDateShort}
                </h1>
                <p className="text-neutral-5 dark:text-neutral-dark-5">
                  {dayOfWeek}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-primary via-primary/50 to-transparent h-px"></div>
          </div>

          {/* Content Sections */}
          <div className="flex flex-col gap-6 px-6 border-l-2 border-primary/30 dark:border-primary/20">
            {sections.map((section, index) => (
              <div
                key={index}
                className="animate-in duration-500 fade-in-50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-semibold text-neutral-8 dark:text-neutral-dark-8 text-lg mb-3">
                  {section.title}
                </h3>

                {/* List items */}
                {section.items && section.items.length > 0 && (
                  <ul className="flex flex-col gap-2 ml-4 mb-4">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="relative text-neutral-7 dark:text-neutral-dark-7 leading-relaxed"
                      >
                        <span className="absolute -left-4 text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Regular content */}
                {section.content.trim() && (
                  <div className="text-neutral-7 dark:text-neutral-dark-7 leading-relaxed whitespace-pre-wrap">
                    {section.content.trim()}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-8 mt-8 border-t border-neutral-3 dark:border-neutral-dark-3">
            <div className="flex items-center gap-2 text-neutral-5 dark:text-neutral-dark-5 text-sm">
              <Clock className="w-4 h-4" />
              <span>1 entry</span>
            </div>
            <div className="text-neutral-5 dark:text-neutral-dark-5 text-sm">
              Last updated: {formattedDateShort}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
