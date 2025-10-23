import React from "react";

const skills = ["AWS", "Node.js", "Typescript", "React", "PostgreSQL"];

const SkillTag = ({ skill }: { skill: string }) => (
  <span
    key={skill}
    className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
  >
    {skill}
  </span>
);

export default function Header() {
  return (
    <header id="intro" className="min-h-screen flex items-center">
      <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 w-full">
        <div className="lg:col-span-3 space-y-5 sm:space-y-8">
          <div className="space-y-2 sm:space-y-2">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">
              PORTFOLIO / 2025
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
              Bruno
              <br />
              <span className="text-muted-foreground">Cardozo</span>
            </h1>
          </div>

          <div className="space-y-5 max-w-md">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Product-oriented Fullstack Software Engineer dedicated to building
              <span className="text-foreground"> high scalable</span> and
              <span className="text-foreground"> efficient systems</span>.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for work
              </div>
              <div>São Paulo, Brazil</div>
              <div>GMT-3</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">
              CURRENTLY
            </div>
            <div className="space-y-2">
              <div className="text-foreground">Software Engineer</div>
              <div className="text-muted-foreground">@ Frengee</div>
              <div className="text-xs text-muted-foreground">
                2025 — Present
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillTag key={skill} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
