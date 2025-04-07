import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { socials } from "../../constants/social"
import projectData from "../../constants/projects.json"
import { PiLightbulbFill } from "react-icons/pi";
import { RiArrowRightUpLine } from "react-icons/ri";
import ProjectCard from "@/components/projectCard";

const projects = projectData;


export const metadata: Metadata = {
  title: "Abhishek Gusain",
  description: "engineer at the intersection of design and web development",
}

// Icon component for consistent logo display
const Icon = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex items-center justify-center w-10 h-10 bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg overflow-hidden">
    <Image
      src={src}
      alt={alt}
      width={32}
      height={32}
      className="object-contain"
      crossOrigin="anonymous"
    />
  </div>
);

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-md px-4 py-32 flex flex-col gap-8">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
        <div>
          <h1 className="text-4xl text-neutral-8 dark:text-neutral-dark-8  tracking-tighter text-balance">
            <span className="font-semibold">Abhishek Gusain</span>
          </h1>
        </div>
      </div>
        <div className="flex items-center gap-1.5 font-medium tracking-tight">
        <h2 className="text-base text-title">designer</h2>
        <div className="mt-1.5 h-1 w-1 rounded bg-title dark:bg-white bg-black"></div>
        <h2 className="text-base text-title">developer</h2>
        <div className="mt-1.5 h-1 w-1 rounded bg-title dark:bg-white bg-black"></div>
        <h2 className="text-base text-title">researcher</h2>
      </div>
        <p className="pt-4 text-sm tracking-wide">
          Hi there, I'm <strong className="font-bold">Abhishek Gusain</strong>, a passionate builder and problem-solver. I thrive on 
          creating <span className="dark:text-white text-black font-bold">innovative solutions</span> that 
          make people's lives better. Always <span className="dark:text-white text-black">alert and aware</span>, 
          I love <strong className="font-bold">connecting with new people</strong> and embracing fresh experiences. My journey is fueled by{" "}
          <span className="dark:text-white text-black font-bold">curiosity</span> and a drive to transform ideas into{" "}
          <span className="dark:text-white text-black">meaningful impact</span>.
          When I'm not coding, you'll find me exploring new perspectives and <strong className="font-bold">pushing boundaries</strong>.
        </p>

      <div className="w-fit grid grid-cols-3 gap-2 pt-4 tracking-tight md:flex md:flex-row md:items-start">
        {
          socials.map((social) => (
            <a
              href={social.url}
              target={social.target}
              rel={social.target === "_blank" ? "noopener noreferrer" : undefined}
              className="group flex items-center underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline">
              <social.icon className="" />
              <span className="text-sm">{social.name}</span>
              <RiArrowRightUpLine className="opacity-0 transition-opacity duration-150 md:group-hover:opacity-100" />
            </a>
          ))
        }
      </div>

      <section className="pt-8">
        <h2 className="font-medium tracking-tight text-title">Projects</h2>
        <div className="pt-1.5">
          {
            projects.map((project) => (
              <ProjectCard project={project}/>
            ))
          }
        </div>
        <div className="group">
          <p
            className="mt-4 w-fit rounded-md border border-body/20 bg-hoverColor/60 px-2 py-1 text-xs text-body transition-all duration-300 ease-in-out">
            <PiLightbulbFill
              className="-mt-0.5 inline-block transition-all duration-300 ease-in-out md:group-hover:text-primary"
            />
            Feel free to explore my
            <a
              href="https://github.com/abhishekgusain07?tab=repositories"
              rel="noopenner noreferrer"
              target="_blank"
              className="font-medium text-body underline underline-offset-2 transition-all duration-150 ease-in-out md:hover:text-primary md:group-hover:text-primary"
              >GitHub</a
            > for more projects. Most of them are open-source.
          </p>
        </div>
      </section>

       
    </main>
  )
}
