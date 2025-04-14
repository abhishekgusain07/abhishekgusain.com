import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

import completedProjects from "../../constants/projects.json"
import ongoingProjects from "../../constants/ongoingProjects.json"

import ProjectCard from "./projectCard";

const CompletedProjects = completedProjects;
const OngoingProjects = ongoingProjects
  
  export default function ProjectsSection() {
    return (
      <Tabs defaultValue="tab-1" className="items-center">
        <TabsList>
          <TabsTrigger value="tab-1">Completed</TabsTrigger>
          <TabsTrigger value="tab-2">Ongoing</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
        <div className="pt-1.5">
          {
            CompletedProjects.map((project) => (
              <ProjectCard project={project} id={project.id}/>
            ))
          }
        </div>
        </TabsContent>
        <TabsContent value="tab-2">
        <div className="pt-1.5">
          {
            OngoingProjects.map((project) => (
              <ProjectCard project={project} id={project.id}/>
            ))
          }
        </div>
        </TabsContent>
      </Tabs>
    )
  }
  