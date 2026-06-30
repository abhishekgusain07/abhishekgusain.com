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
    <div className="field-surface min-h-screen">
      <div className="no-print fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-4xl p-4">
        <div className="w-full px-4 py-4 sm:px-6 md:px-8">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="field-panel relative h-48 w-full overflow-hidden">
              <div className="absolute bottom-0 left-0 p-6">
                <div className="flex items-center gap-4">
                  <div className="field-serif flex h-16 w-16 items-center justify-center border-2 border-[var(--field-ink)] bg-[var(--field-rust)] text-xl font-bold text-[var(--field-panel)]">
                    AG
                  </div>
                  <div>
                    <h2 className="field-serif text-2xl font-bold text-[var(--field-ink)]">
                      Abhishek Gusain
                    </h2>
                    <p className="text-sm font-semibold text-[var(--field-muted)]">
                      engineer • builder • creator
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation and Actions */}
          <div className="mb-8 flex items-center justify-between">
            <Link href="/logs">
              <button className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap border border-[var(--field-ink)] bg-[var(--field-panel)] px-4 text-sm font-bold text-[var(--field-ink)] shadow-[4px_4px_0_rgba(27,27,23,0.08)] transition-all hover:-translate-y-0.5 hover:text-[var(--field-rust)]">
                <ArrowLeft className="h-4 w-4" />
                Back to Logs
              </button>
            </Link>

            <ShareButton date={date} />
          </div>

          {/* Date Header */}
          <div className="mb-8 flex flex-col gap-4 border-b-2 border-[var(--field-ink)] pb-8">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-[var(--field-rust)]" />
              <div className="flex flex-col gap-1">
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-normal text-[var(--field-forest)] before:block before:h-0.5 before:w-9 before:bg-[var(--field-forest)]">
                  Daily field note
                </p>
                <h1 className="field-serif text-4xl font-bold leading-none text-[var(--field-rust)]">
                  {formattedDateShort}
                </h1>
                <p className="text-[var(--field-muted)]">{dayOfWeek}</p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="flex flex-col gap-6 border-l-4 border-[var(--field-rust)] px-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="field-card animate-in fade-in-50 p-5 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="field-serif mb-3 text-xl font-bold text-[var(--field-ink)]">
                  {section.title}
                </h3>

                {/* List items */}
                {section.items && section.items.length > 0 && (
                  <ul className="mb-4 ml-4 flex flex-col gap-2">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="relative leading-relaxed text-[var(--field-muted)]"
                      >
                        <span className="absolute -left-4 text-[var(--field-rust)]">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Regular content */}
                {section.content.trim() && (
                  <div className="whitespace-pre-wrap leading-relaxed text-[var(--field-muted)]">
                    {section.content.trim()}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-between border-t border-[var(--field-line)] pt-8">
            <div className="flex items-center gap-2 text-sm text-[var(--field-muted)]">
              <Clock className="h-4 w-4" />
              <span>1 entry</span>
            </div>
            <div className="text-sm text-[var(--field-muted)]">
              Last updated: {formattedDateShort}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
