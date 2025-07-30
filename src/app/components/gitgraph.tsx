import Link from "next/link";

import Title from "@/components/ui/Title";
import { GithubGraph } from "@/components/ui/github";

export default function GitGraph() {
  return (
    <div className="w-full flex flex-col items-center mt-8 mb-4 gap-4 max-sm:hidden">
      <Title title="GitHub Contributions" />
      <Link href={"https://github.com/abhishekgusain07"} target="_blank">
        <GithubGraph
          username="abhishekgusain07"
          blockMargin={2}
          colorPalette={[
            "#e0f2fe", // Lightest blue
            "#7dd3fc", // Light blue
            "#38bdf8", // Medium blue
            "#0284c7", // Dark blue
            "#0369a1", // Darkest blue
          ]}
        />
      </Link>
    </div>
  );
}
