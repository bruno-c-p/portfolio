import HalftonePanel from "@/components/halftone-panel";
import { Section } from "@/components/section";
import { WorkRow } from "@/components/work-row";
import { FooterLink } from "@/components/footer-link";
import { Badge } from "@/components/badge";
import DecryptedText from "@/components/decrypted-text";
import { FOCUS, WORK, LINKS } from "./constants";

export default function Home() {
  return (
    <main className="relative flex h-screen w-screen overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-10 md:hidden">
        <HalftonePanel speed={0.08} />
      </div>

      <section className="relative z-10 flex w-full flex-col justify-between px-8 py-10 md:w-[50%] md:bg-black md:px-12 md:py-14 min-[1100px]:w-[45%]">
        <div className="space-y-8 md:space-y-10">
          <DecryptedText
            text="brunocardozo.dev"
            animateOn="view"
            sequential
            revealDirection="start"
            speed={60}
            className="text-base text-zinc-600"
          />

          <div>
            <h1 className="text-3xl leading-none text-white">
              <DecryptedText
                text="BRUNO CARDOZO"
                animateOn="view"
                sequential
                revealDirection="start"
                speed={40}
                className="text-white"
              />
            </h1>
            <p className="mt-3 text-base text-zinc-500">
              <DecryptedText
                text="Fullstack Software Engineer"
                animateOn="view"
                sequential
                revealDirection="start"
                speed={50}
                className="text-zinc-500"
              />
            </p>
          </div>

          <Section label="Focus">
            <div className="flex flex-wrap gap-2">
              {FOCUS.map((item) => (
                <Badge key={item} label={item} />
              ))}
            </div>
          </Section>

          <Section label="Work">
            <div className="space-y-1">
              {WORK.map((work, index) => (
                <WorkRow key={index} {...work} />
              ))}
            </div>
          </Section>
        </div>

        <footer className="flex flex-wrap gap-x-6 gap-y-1 text-base text-zinc-600">
          {LINKS.map((link) => (
            <FooterLink key={link.label} {...link} />
          ))}
        </footer>
      </section>

      <div className="relative hidden flex-1 md:block">
        <HalftonePanel />
      </div>
    </main>
  );
}
