import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Daily Devlogs - Abhishek Gusain",
  description: "Documenting my daily development journey — bugs, features, and everything in between.",
}

export default function LogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 