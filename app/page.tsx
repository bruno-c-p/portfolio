"use client";

import { LanguageProvider } from "@/lib/language";
import { Site } from "@/components/site";

export default function Page() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  );
}
