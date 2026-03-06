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
      <section className="relative z-10 flex w-[45%] flex-col justify-between bg-black px-12 py-14">
        <div className="space-y-10">
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

      <div className="relative flex-1">
        <HalftonePanel />
      </div>
    </main>
  );
}
