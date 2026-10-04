import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { CurvedLoop } from "@/components/ui/CurvedLoop";
import { About } from "@/components/sections/About";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { BehindTheBuild } from "@/components/sections/BehindTheBuild";
import { CertificatesExperience } from "@/components/sections/CertificatesExperience";
import { ThingsLearned } from "@/components/sections/ThingsLearned";
import { Contact } from "@/components/sections/Contact";
import { TypingChallenge } from "@/components/sections/TypingChallenge";
import { GlobalLighting } from "@/components/ui/GlobalLighting";

export default function Home() {
  return (
    <>
      <GlobalLighting />
      <Navbar />
      <main className="flex min-h-screen flex-col relative z-10">
        <Hero />
        <CurvedLoop />
        <About />
        <CurrentlyBuilding />
        <Skills />
        <Projects />
        <BehindTheBuild />
        <CertificatesExperience />
        <ThingsLearned />
        <Contact />
        <TypingChallenge />
      </main>
      <Footer />
    </>
  );
}
