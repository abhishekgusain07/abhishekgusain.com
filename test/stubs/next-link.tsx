import React from "react";

/** Minimal next/link replacement for unit tests (renders a plain anchor). */
export default function Link({
  href,
  children,
  ...rest
}: {
  href: string | { pathname?: string };
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  const url = typeof href === "string" ? href : (href?.pathname ?? "#");
  return (
    <a href={url} {...rest}>
      {children}
    </a>
  );
}
