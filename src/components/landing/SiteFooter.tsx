import Link from "next/link";
import { CONTACT, NAV_LINKS } from "../../../constants/agency";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-3 px-4 py-12 dark:border-neutral-dark-3">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <p className="text-base font-semibold tracking-tight text-neutral-8 dark:text-neutral-dark-8">
            Abhishek Gusain
            <span className="text-neutral-orangeBg">.</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-6 dark:text-neutral-dark-6">
            Done-for-you AI that handles the everyday work your business runs on
            — leads, bookings, follow-ups and reviews.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-5 dark:text-neutral-dark-5">
              Explore
            </p>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-neutral-6 transition-colors hover:text-neutral-orangeBg dark:text-neutral-dark-6"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/resume"
                  className="text-neutral-6 transition-colors hover:text-neutral-orangeBg dark:text-neutral-dark-6"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-5 dark:text-neutral-dark-5">
              Connect
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-neutral-6 transition-colors hover:text-neutral-orangeBg dark:text-neutral-dark-6"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-6 transition-colors hover:text-neutral-orangeBg dark:text-neutral-dark-6"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-6 transition-colors hover:text-neutral-orangeBg dark:text-neutral-dark-6"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-6 transition-colors hover:text-neutral-orangeBg dark:text-neutral-dark-6"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-screen-lg border-t border-neutral-3 pt-6 text-xs text-neutral-5 dark:border-neutral-dark-3 dark:text-neutral-dark-5">
        © {new Date().getFullYear()} Abhishek Gusain. Built and run by a human.
      </div>
    </footer>
  );
}
