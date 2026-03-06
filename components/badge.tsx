import StarBorder from "@/components/star-border";

export function Badge({ label }: { label: string }) {
  return (
    <StarBorder as="span" speed="5s" thickness={0.5} color="#818cf8">
      {label}
    </StarBorder>
  );
}
