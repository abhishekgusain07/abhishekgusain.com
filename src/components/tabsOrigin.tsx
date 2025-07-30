"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import completedProjects from "../../constants/projects.json";
import ongoingProjects from "../../constants/ongoingProjects.json";

import { StickyScroll } from "./ui/sticky-scroll-reveal";
import ProjectContent from "./ProjectContent";

interface Project {
  id: number;
  title: string;
  description: string;
  techstack: string[];
  github: string;
  liveDemo: string;
}

const CompletedProjects = completedProjects as Project[];
const OngoingProjects = ongoingProjects as Project[];

export default function ProjectsSection() {
  // Transform projects data for StickyScroll component
  const completedContent = CompletedProjects.map((project) => ({
    title: project.title,
    content: <ProjectContent project={project} />,
  }));

  const ongoingContent = OngoingProjects.map((project) => ({
    title: project.title,
    content: <ProjectContent project={project} />,
  }));

  return (
    <Tabs defaultValue="tab-1" className="items-center">
      <TabsList>
        <TabsTrigger value="tab-1">Completed</TabsTrigger>
        <TabsTrigger value="tab-2">Ongoing</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <div className="pt-6">
          <StickyScroll content={completedContent} />
        </div>
      </TabsContent>
      <TabsContent value="tab-2">
        <div className="pt-6">
          <StickyScroll content={ongoingContent} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
