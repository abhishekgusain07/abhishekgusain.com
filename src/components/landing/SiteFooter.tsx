import Link from "next/link";
import { CONTACT, NAV_LINKS } from "../../../constants/agency";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-[var(--field-ink)] bg-[var(--field-panel)] px-4 py-12">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <p className="field-serif text-lg font-bold tracking-normal text-[var(--field-ink)]">
            Abhishek Gusain
            <span className="text-[var(--field-rust)]">.</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--field-muted)]">
            Done-for-you AI that handles the everyday work your business runs on
            — leads, bookings, follow-ups and reviews.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-normal text-[var(--field-forest)]">
              Explore
            </p>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[var(--field-muted)] transition-colors hover:text-[var(--field-rust)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/resume"
                  className="text-[var(--field-muted)] transition-colors hover:text-[var(--field-rust)]"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-normal text-[var(--field-forest)]">
              Connect
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[var(--field-muted)] transition-colors hover:text-[var(--field-rust)]"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--field-muted)] transition-colors hover:text-[var(--field-rust)]"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--field-muted)] transition-colors hover:text-[var(--field-rust)]"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--field-muted)] transition-colors hover:text-[var(--field-rust)]"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-screen-lg border-t border-[var(--field-line)] pt-6 text-xs text-[var(--field-muted)]">
        © {new Date().getFullYear()} Abhishek Gusain. Built and run by a human.
      </div>
    </footer>
  );
}
