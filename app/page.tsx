import Header from "@/components/Header";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Squares } from "@/components/ui/squares-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Squares
          className="w-full h-full opacity-15"
          direction="diagonal"
          speed={0.25}
          squareSize={50}
        />
      </div>

      <div className="relative z-10">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16">
          <Header />
          <WorkExperience />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}
