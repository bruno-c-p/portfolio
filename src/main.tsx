import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "@/lib/language";
import { Site } from "@/components/site";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  </StrictMode>,
);
