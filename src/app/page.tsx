import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { EvidenceArchive } from "@/components/sections/EvidenceArchive";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col overflow-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <EvidenceArchive />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
