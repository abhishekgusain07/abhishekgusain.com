"use client";
import { useCallback, useEffect, useState } from "react";
import { Activity, ActivityCalendar } from "react-activity-calendar";

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
  const [contribution, setContribution] = useState<Activity[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const contributions = await fetchContributionData(username);
      setContribution(contributions);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw Error(`Error fetching contribution data: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const label = {
    totalCount: `{{count}} contributions in the last year`,
  };

  // Default color palette that works well in both themes
  const defaultPalette = [
    "#e0f2fe",  // Lightest blue
    "#7dd3fc",  // Light blue
    "#38bdf8",  // Medium blue
    "#0284c7",  // Dark blue
    "#0369a1",  // Darkest blue
  ];

  return (
    <>
      <ActivityCalendar
        data={contribution}
        maxLevel={4}
        blockMargin={blockMargin ?? 2}
        loading={loading}
        labels={label}
        theme={{
          light: colorPalette ?? defaultPalette,
          dark: colorPalette ?? defaultPalette,
        }}
      />
    </>
  );
};

async function fetchContributionData(username: string): Promise<Activity[]> {
  const response = await fetch(`https://github.vineet.pro/api/${username}`);
  const responseBody = await response.json();

  if (!response.ok) {
    throw Error("Erroring fetching contribution data");
  }
  return responseBody.data;
}
