import { socials } from "../../constants/social";
import { RiArrowRightUpLine } from "react-icons/ri";
import ProjectsSection from "@/components/tabsOrigin";
import GitGraph from "@/app/components/gitgraph";

/**
 * The original personal portfolio (bio, socials, projects, GitHub graph).
 * Extracted from the old homepage so it can live on /resume now that the
 * homepage has become the AI-services landing page.
 */
export default function PortfolioHome() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
        <div>
          <h1 className="text-4xl text-neutral-8 dark:text-neutral-dark-8 tracking-tighter text-balance">
            <span className="font-semibold">Abhishek Gusain</span>
          </h1>
        </div>
      </div>
      <p className="pt-4 text-sm tracking-wide">
        Hi there, I'm <strong className="font-bold">Abhishek Gusain</strong>, a
        passionate builder and problem-solver. I thrive on creating{" "}
        <span className="dark:text-white text-black font-bold">
          innovative solutions
        </span>{" "}
        that make people's lives better. Always{" "}
        <span className="dark:text-white text-black">alert and aware</span>, I
        love <strong className="font-bold">connecting with new people</strong>{" "}
        and embracing fresh experiences. My journey is fueled by{" "}
        <span className="dark:text-white text-black font-bold">curiosity</span>{" "}
        and a drive to transform ideas into{" "}
        <span className="dark:text-white text-black">meaningful impact</span>.
        When I'm not coding, you'll find me exploring new perspectives and{" "}
        <strong className="font-bold">pushing boundaries</strong>.
      </p>

      <div className="w-fit grid grid-cols-3 gap-2 pt-4 tracking-tight md:flex md:flex-row md:items-start">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target={social.target}
            rel={social.target === "_blank" ? "noopener noreferrer" : undefined}
            className="group flex items-center underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
          >
            <social.icon className="" />
            <span className="text-sm">{social.name}</span>
            <RiArrowRightUpLine className="opacity-0 transition-opacity duration-150 md:group-hover:opacity-100" />
          </a>
        ))}
      </div>

      <section className="pt-8">
        <h2 className="font-medium tracking-tight text-title mb-2">Projects</h2>
        <ProjectsSection />
      </section>
      <section className="pt-8">
        <h2 className="font-medium tracking-tight text-title mb-2">
          Github Contributions
        </h2>
        <GitGraph />
      </section>
    </div>
  );
}
