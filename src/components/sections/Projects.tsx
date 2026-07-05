"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 relative z-10">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-24 md:mb-32"
        >
          <h2 className="text-sm font-mono text-muted uppercase tracking-[0.2em] mb-6">Selected Work</h2>
        </motion.div>

        <div className="space-y-40">
          
          {/* 1. Flagship: Artist Color Lab */ }
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              
              {/* Sticky Narrative Side */}
              <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <p className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-6 flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>Flagship Project</span>
                  </p>
                  
                  <h3 className="text-4xl md:text-6xl font-heading font-medium mb-4 text-white tracking-tight">Artist Color Lab</h3>
                  
                  <div className="mt-8 space-y-8">
                    <div>
                      <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">Problem</strong>
                      <p className="text-muted/90 font-sans leading-relaxed">Artists lack a cohesive tool to bridge the physical medium of paints with digital colour theory and mixing calculations.</p>
                    </div>
                    <div>
                      <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">Approach & AI Usage</strong>
                      <p className="text-muted/90 font-sans leading-relaxed">I utilized AI-assisted development to generate the core UI components and CSS styling. My focus was on modifying the generated logic, managing the color states, and connecting the components together into a working application.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">Tech Stack</strong>
                        <p className="text-muted/90 font-sans leading-relaxed">Next.js, Tailwind, AI Workflows</p>
                      </div>
                      <div>
                        <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">What I Learned</strong>
                        <p className="text-muted/90 font-sans leading-relaxed">Managing complex local state, debugging UI frameworks, and effective AI prompting.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 flex flex-wrap items-center gap-4">
                    <a 
                      href="https://entron.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-[#060608] font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a 
                      href="https://github.com/prabhavkrishna17-max" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center space-x-3 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 active:scale-95 transition-all duration-300 group"
                    >
                      <span>GitHub</span>
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Scrolling Visuals Side */}
              <div className="lg:col-span-7 space-y-8 mt-12 lg:mt-0">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden glass p-1.5"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/projects/Artist_Color_Lab.webp"
                      alt="Artist Color Lab Main Interface"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden glass p-1.5"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/projects/Artist_Color_Lab_Mixer.webp"
                      alt="Artist Color Lab Mixer Tool"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Thin Divider */}
          <div className="h-px w-full bg-white/10" />

          {/* 2 & 3. Text-Based Case Studies */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h3 className="text-2xl md:text-3xl font-heading font-medium text-white mb-12">Engineering Case Studies</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {caseStudies.map((study, index) => {
                const isExpanded = expandedId === study.id;
                
                return (
                  <motion.div 
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="glass-elevated rounded-3xl p-8 md:p-10 flex flex-col h-full relative"
                  >
                    <p className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-4">{study.event}</p>
                    <h4 className="text-3xl font-heading font-medium text-white mb-6">{study.title}</h4>
                    
                    <p className="text-lg text-muted/90 font-sans leading-relaxed mb-8 flex-grow">
                      {study.solution}
                    </p>

                    <button 
                      onClick={() => setExpandedId(isExpanded ? null : study.id)}
                      className="flex items-center space-x-2 text-sm font-medium uppercase tracking-[0.1em] text-white hover:text-accent transition-colors w-max mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? "Close Documentation" : "Read Documentation"}</span>
                      <ChevronDown size={16} className={cn("transition-transform duration-500", isExpanded && "rotate-180")} />
                    </button>

                    {/* Smooth expanding area without unmounting to prevent layout shifts */}
                    <div 
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-6 border-t border-white/10 space-y-8 pb-4">
                          <div>
                            <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">Problem</strong>
                            <p className="text-muted/90 font-sans leading-relaxed">{study.problem}</p>
                          </div>
                          <div>
                            <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">Approach & AI Usage</strong>
                            <p className="text-muted/90 font-sans leading-relaxed">{study.solution}</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">Tech Stack</strong>
                              <p className="text-muted/90 font-sans leading-relaxed">{study.stack}</p>
                            </div>
                            <div>
                              <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">What I Learned</strong>
                              <p className="text-muted/90 font-sans leading-relaxed">{study.outcome}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                            {study.github && (
                              <a 
                                href={study.github}
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="text-sm font-medium text-white hover:text-accent transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-accent"
                                aria-label={`View GitHub repository for ${study.title}`}
                              >
                                GitHub
                              </a>
                            )}
                            {study.demo && (
                              <a 
                                href={study.demo}
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="text-sm font-medium text-white hover:text-accent transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-accent"
                                aria-label={`View live demo for ${study.title}`}
                              >
                                Live Demo
                              </a>
                            )}
                            {study.certificateLink && (
                              <a 
                                href={study.certificateLink}
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="text-sm font-medium text-white hover:text-accent transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-accent"
                                aria-label={`View certificate for ${study.title}`}
                              >
                                Certificate
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
