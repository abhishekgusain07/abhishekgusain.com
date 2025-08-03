import React from "react";
import { RiArrowRightUpLine, RiGithubLine } from "react-icons/ri";
import toast from "react-hot-toast";

interface Project {
  id: number;
  title: string;
  description: string;
  techstack: string[];
  github: string;
  liveDemo?: string;
}

interface ProjectContentProps {
  project: Project;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ project }) => {
  const handleLiveDemoClick = () => {
    if (!project.liveDemo) {
      toast("🚧 Still in development, will be hosted soon!", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    window.open(project.liveDemo, "_blank", "noreferrer");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-body text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      <div>
        <h4 className="text-sm font-medium text-title mb-3">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.techstack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-title hover:text-primary transition-colors rounded-md border border-border hover:border-primary"
        >
          <RiGithubLine className="w-4 h-4" />
          GitHub
        </a>
        <button
          onClick={handleLiveDemoClick}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-md"
        >
          Live Demo
          <RiArrowRightUpLine className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectContent;
