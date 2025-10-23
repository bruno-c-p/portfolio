import React from "react";

interface Job {
  year: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

const jobs: Job[] = [
  {
    year: "2025",
    role: "Software Engineer",
    company: "Frengee",
    description:
      "Leading globalization of large-scale products with Microservices Architecture. Focus on performance optimization, incident resolution, and implementing innovative solutions through PoCs.",
    tech: [
      "NestJS",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "RabbitMQ",
      "Microservices",
    ],
  },
  {
    year: "2022",
    role: "Software Engineer",
    company: "Wise",
    description:
      "Developed scalable enterprise APIs serving tens of thousands of daily requests.",
    tech: ["Java", "Maven", "Hibernate", "PostgreSQL", "AWS"],
  },
  {
    year: "2021",
    role: "Software Developer",
    company: "Projedata",
    description:
      "Contributed to migrating legacy desktop application to modern web-based solution.",
    tech: ["Java", "PL/SQL"],
  },
];

const TechTag = ({ tech }: { tech: string }) => (
  <span className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500">
    {tech}
  </span>
);

const JobCard = ({ job }: { job: Job }) => (
  <div className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500">
    <div className="lg:col-span-2">
      <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
        {job.year}
      </div>
    </div>

    <div className="lg:col-span-6 space-y-3">
      <div>
        <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
        <div className="text-muted-foreground">{job.company}</div>
      </div>
      <p className="text-muted-foreground leading-relaxed max-w-lg">
        {job.description}
      </p>
    </div>

    <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
      {job.tech.map((tech) => (
        <TechTag key={tech} tech={tech} />
      ))}
    </div>
  </div>
);

export default function WorkExperience() {
  return (
    <section id="work" className="min-h-screen py-20 sm:py-32">
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Selected Work</h2>
          <div className="text-sm text-muted-foreground font-mono">
            2021 — 2025
          </div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
