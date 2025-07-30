"use client";
import GitHubCalendar from "react-github-calendar";

type GithubGraphProps = {
  username: string;
  blockMargin?: number;
  colorPalette?: string[];
};

export const GithubGraph = ({
  username,
  blockMargin,
  colorPalette,
}: GithubGraphProps) => {
  const labels = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    totalCount: '{{count}} contributions in the last year',
    legend: {
      less: 'Less',
      more: 'More',
    },
  };

  // Default color palette that works well in both themes
  const defaultPalette = [
    "#ffffff",  // No contributions
    "#e0f2fe",  // Lightest blue
    "#7dd3fc",  // Light blue
    "#38bdf8",  // Medium blue
    "#0284c7",  // Dark blue
    "#0369a1",  // Darkest blue
  ];

  return (
    <div className="w-full flex justify-center overflow-x-auto">
      <div className="w-full flex justify-center">
        <GitHubCalendar
          username={username}
          blockSize={blockMargin ? blockMargin * 8 : 16}
          fontSize={16}
          theme={{
            light: colorPalette ?? defaultPalette,
            dark: colorPalette ?? defaultPalette,
          }}
          labels={labels}
        />
      </div>
    </div>
  );
};
