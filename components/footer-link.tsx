import ShinyText from "@/components/shiny-text";

export function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <ShinyText
        text={label}
        color="#52525b"
        shineColor="#818cf8"
        speed={3}
        pauseOnHover
      />
    </a>
  );
}
