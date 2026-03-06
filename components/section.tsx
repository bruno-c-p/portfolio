import ShinyText from "@/components/shiny-text";
import React from "react";

export function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-5 text-base text-zinc-700">
        —&nbsp;&nbsp;
        <ShinyText
          text={label}
          color="#71717a"
          shineColor="#818cf8"
          speed={4}
          delay={1}
        />
      </p>
      {children}
    </div>
  );
}
