"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { fadeUpVariant, staggerContainer, sectionVariant, subtleScale, CINEMATIC_EASE } from "@/lib/animations";
import { useLenis } from 'lenis/react';

const caseStudies = [
  {
    id: "weatherbuddy",
    title: "WeatherBuddy",
    event: "NASA Space Apps Challenge",
    problem: "Meteorological data is often dense and difficult for non-experts to interpret quickly during critical weather events.",
    solution: "Used AI tools to quickly prototype a dashboard interface while I focused on wiring up the OpenWeather APIs and handling the JSON data responses.",
    outcome: "Built an MVP in 48 hours. I learned how to manage asynchronous data fetching in React and how to prompt AI effectively for UI components.",
    stack: "React, OpenWeather API, Tailwind CSS, AI Prototyping",
    github: "https://github.com/prabhavkrishna17-max",
    demo: null,
    certificateLink: "/images/certificates/TECHNOVIBE_2k26.webp",
  },
  {
    id: "shopping-assistant",
    title: "Shopping Assistant",
    event: "Oblivion '25 Hackathon",
    problem: "Shoppers suffer from choice paralysis when comparing multiple products across different tabs, losing track of features.",
    solution: "Leveraged AI to generate the base component structure, while I manually implemented the LocalStorage API logic to persist session data across reloads.",
    outcome: "I gained a deep understanding of browser storage, state management with Zustand, and debugging hydration errors in Next.js.",
    stack: "Next.js, TypeScript, LocalStorage, Zustand, AI Generation",
    github: "https://github.com/prabhavkrishna17-max",
    demo: null,
    certificateLink: "/images/certificates/Oblivion25.webp",
  }
];

export function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Subtle internal parallax for flagship images
  const yImage1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [selectedId, lenis]);

  const selectedStudy = caseStudies.find(c => c.id === selectedId);

  return (
    <section id="projects" ref={sectionRef} className="pt-20 sm:pt-28 md:pt-48 pb-24 md:pb-32 relative z-10 overflow-hidden">
      
      {/* Blend boundary top gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#030305]/0 to-transparent z-10 pointer-events-none" />

      {/* Ambient scanning lines background */}
      <motion.div 
        animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay transform-gpu will-change-transform"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 40px, rgba(255, 255, 255, 0.5) 40px, rgba(255, 255, 255, 0.5) 41px)",
          backgroundSize: "100% 200%",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
        }}
      />

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 relative z-10"
      >
        <motion.div variants={fadeUpVariant} className="mb-16 md:mb-20">
          <h2 className="text-sm font-mono text-white/40 uppercase tracking-[0.2em] mb-6">Selected Work</h2>
        </motion.div>

        <div className="space-y-16 sm:space-y-20 lg:space-y-28">
          
          {/* 1. Flagship: Artist Color Lab */ }
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              
              {/* Sticky Narrative Side */}
              <div className="lg:col-span-5 lg:sticky lg:top-40 h-max">
                <motion.div variants={staggerContainer} style={{ y: yText }} className="space-y-10 transform-gpu will-change-transform">
                  <motion.div variants={fadeUpVariant}>
                  <p className="text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-[0.25em] mb-6 flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                    <span>Flagship Project</span>
                  </p>
                  
                  <h3 className="lens-target text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-4 text-white/90 tracking-tighter leading-[1.05] text-balance">Artist Color Lab</h3>
                  
                  <div className="mt-8 space-y-8">
                    <div>
                      <strong className="text-white/70 font-medium block mb-2 text-[10px] uppercase tracking-widest font-mono">Problem</strong>
                      <p className="text-white/50 font-light font-sans tracking-wide leading-relaxed text-sm sm:text-base">Artists lack a cohesive tool to bridge the physical medium of paints with digital colour theory and mixing calculations.</p>
                    </div>
                    <div>
                      <strong className="text-white/70 font-medium block mb-2 text-[10px] uppercase tracking-widest font-mono">Approach & AI Usage</strong>
                      <p className="text-white/50 font-light font-sans tracking-wide leading-relaxed text-sm sm:text-base">I utilized AI-assisted development to generate the core UI components and CSS styling. My focus was on modifying the generated logic, managing the color states, and connecting the components together into a working application.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <strong className="text-white/70 font-medium block mb-2 text-[10px] uppercase tracking-widest font-mono">Tech Stack</strong>
                        <p className="text-white/50 font-light font-sans tracking-wide leading-relaxed text-xs sm:text-sm">Next.js, Tailwind, AI Workflows</p>
                      </div>
                      <div>
                        <strong className="text-white/70 font-medium block mb-2 text-[10px] uppercase tracking-widest font-mono">What I Learned</strong>
                        <p className="text-white/50 font-light font-sans tracking-wide leading-relaxed text-xs sm:text-sm">Managing complex local state, debugging UI frameworks, and effective AI prompting.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <a 
                      href="https://entron.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-3 text-xs font-mono tracking-[0.1em] text-white/70 hover:text-white uppercase transition-colors duration-500"
                    >
                      <span>Live Demo</span>
                      <span className="w-8 h-[1px] bg-white/30 group-hover:bg-white/70 group-hover:w-12 transition-all duration-500" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>


              {/* Scrolling Visuals Side */}
              <motion.div variants={staggerContainer} className="lg:col-span-7 space-y-8 mt-12 lg:mt-0">
                <motion.div variants={subtleScale}>
                  <GlowCard variant="project" intensity="high" interactive className="relative aspect-[16/10] w-full p-2 overflow-hidden group">
                    <div className="relative w-full h-full rounded-xl overflow-hidden pointer-events-none">
                      <motion.div style={{ y: yImage1, height: "120%", top: "-10%" }} className="absolute w-full transform-gpu will-change-transform">
                        <Image
                          src="/images/projects/Artist_Color_Lab.webp"
                          alt="Artist Color Lab Main Interface"
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700 pointer-events-auto"
                        />
                      </motion.div>
                    </div>
                  </GlowCard>
                </motion.div>

                <motion.div variants={subtleScale}>
                  <GlowCard variant="project" intensity="medium" interactive className="relative aspect-[16/10] w-full p-2 overflow-hidden group">
                    <div className="relative w-full h-full rounded-xl overflow-hidden pointer-events-none">
                      <motion.div style={{ y: yImage2, height: "130%", top: "-15%" }} className="absolute w-full transform-gpu will-change-transform">
                        <Image
                          src="/images/projects/Artist_Color_Lab_Mixer.webp"
                          alt="Artist Color Lab Mixer Tool"
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700 pointer-events-auto"
                        />
                      </motion.div>
                    </div>
                  </GlowCard>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Thin Divider */}
          <div className="h-px w-full bg-white/[0.03]" />

          {/* 2 & 3. Case Study Gallery */}
          <div className="space-y-16">
            <motion.div variants={fadeUpVariant}>
              <h3 className="lens-target text-4xl font-medium text-white/90 mb-12 tracking-tight text-balance">Engineering Case Studies</h3>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {caseStudies.map((study) => (
                <motion.div key={study.id} variants={fadeUpVariant} className="h-full">
                  <GlowCard 
                    variant="project"
                    interactive
                    layoutId={`card-container-${study.id}`}
                    onClick={() => setSelectedId(study.id)}
                    className="cursor-pointer p-8 md:p-10 flex flex-col h-full group"
                  >
                    <motion.p layoutId={`card-event-${study.id}`} className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-5">{study.event}</motion.p>
                    <motion.h4 layoutId={`card-title-${study.id}`} className="text-2xl md:text-3xl font-medium text-white/90 mb-6 tracking-tight">{study.title}</motion.h4>
                    
                    <motion.p layoutId={`card-solution-${study.id}`} className="text-sm text-white/40 font-light tracking-wide leading-relaxed mb-8 line-clamp-3">
                      {study.solution}
                    </motion.p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/25 group-hover:text-white/50 transition-colors duration-500">Read Case Study</span>
                      <ExternalLink size={14} className="text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* ===== FULL SCREEN CASE STUDY MODAL ===== */}
      <AnimatePresence>
        {selectedId && selectedStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
            className="fixed inset-0 z-[200] bg-[#030305]/95 backdrop-blur-2xl overflow-y-auto px-4 py-12 md:py-24"
            onClick={() => setSelectedId(null)}
          >
            <div className="min-h-full flex flex-col items-center justify-center pointer-events-none">
              <motion.div 
                layoutId={`card-container-${selectedStudy.id}`}
                className="w-full max-w-[800px] border border-white/[0.05] bg-[#060608] rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-16 relative pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
                style={{ borderRadius: '2rem' }}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 md:top-8 md:right-8 p-3 rounded-full bg-white/[0.02] border border-white/[0.05] text-white/40 hover:text-white/90 hover:bg-white/[0.05] transition-all duration-500 group"
                  aria-label="Close modal"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>

                <motion.p layoutId={`card-event-${selectedStudy.id}`} className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4">{selectedStudy.event}</motion.p>
                <motion.h4 layoutId={`card-title-${selectedStudy.id}`} className="text-4xl md:text-5xl font-medium text-white/90 mb-12">{selectedStudy.title}</motion.h4>

                <div className="space-y-10 pb-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: CINEMATIC_EASE }}
                  >
                    <strong className="text-white/70 font-medium block mb-3 text-[10px] uppercase tracking-widest font-mono">The Problem</strong>
                    <p className="text-white/50 font-light font-sans tracking-wide leading-relaxed text-sm sm:text-base">{selectedStudy.problem}</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: CINEMATIC_EASE }}
                  >
                    <strong className="text-white/70 font-medium block mb-3 text-[10px] uppercase tracking-widest font-mono">Approach & AI Usage</strong>
                    <motion.p layoutId={`card-solution-${selectedStudy.id}`} className="text-white/50 font-light font-sans tracking-wide leading-relaxed text-sm sm:text-base">
                      {selectedStudy.solution}
                    </motion.p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-y border-white/[0.05] py-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4, ease: CINEMATIC_EASE }}
                    >
                      <strong className="text-white/70 font-medium block mb-3 text-[10px] uppercase tracking-widest font-mono">Tech Stack</strong>
                      <p className="text-white/50 font-light font-sans tracking-wide leading-relaxed text-sm">{selectedStudy.stack}</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5, ease: CINEMATIC_EASE }}
                    >
                      <strong className="text-white/70 font-medium block mb-3 text-[10px] uppercase tracking-widest font-mono">What I Learned</strong>
                      <p className="text-white/50 font-light font-sans tracking-wide leading-relaxed text-sm">{selectedStudy.outcome}</p>
                    </motion.div>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="flex flex-wrap gap-6 mt-4"
                >
                  {selectedStudy.github && (
                    <a 
                      href={selectedStudy.github}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-3 text-xs font-mono tracking-[0.1em] text-white/70 hover:text-white uppercase transition-colors duration-500"
                    >
                      <span>GitHub</span>
                      <span className="w-6 h-[1px] bg-white/30 group-hover:bg-white/70 group-hover:w-10 transition-all duration-500" />
                    </a>
                  )}
                  {selectedStudy.demo && (
                    <a 
                      href={selectedStudy.demo}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-3 text-xs font-mono tracking-[0.1em] text-white/70 hover:text-white uppercase transition-colors duration-500"
                    >
                      <span>Live Demo</span>
                      <span className="w-6 h-[1px] bg-white/30 group-hover:bg-white/70 group-hover:w-10 transition-all duration-500" />
                    </a>
                  )}
                  {selectedStudy.certificateLink && (
                    <a 
                      href={selectedStudy.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-3 text-xs font-mono tracking-[0.1em] text-white/70 hover:text-white uppercase transition-colors duration-500"
                    >
                      <span>Certificate</span>
                      <span className="w-6 h-[1px] bg-white/30 group-hover:bg-white/70 group-hover:w-10 transition-all duration-500" />
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
