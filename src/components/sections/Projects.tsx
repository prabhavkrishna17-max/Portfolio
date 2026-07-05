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
    overview: "A high-impact meteorological dashboard developed under intense time constraints to turn complex weather data into an accessible, practical interface.",
    contribution: "Designed and engineered a streamlined dashboard that aggregates complex APIs into a single, intuitive view with immediate visual feedback for weather anomalies.",
    stack: "React, OpenWeather API, Framer Motion, Tailwind CSS",
    certificateLink: "/assets/certificates/TECHNOVIBE_2k26.jpg", // Assuming an existing certificate here or omitting
    readMoreLink: "https://github.com/prabhavkrishna", 
  },
  {
    id: "shopping-assistant",
    title: "Shopping Assistant",
    event: "Oblivion '25 Hackathon",
    overview: "An intelligent consumer application engineered to optimize the digital shopping experience by providing smart product comparisons and tracking.",
    contribution: "Built a centralized comparison engine that stores session data locally, allowing users to build a matrix of products with automated pros/cons highlighting.",
    stack: "Next.js, TypeScript, LocalStorage API, Zustand",
    certificateLink: "/assets/certificates/Oblivion25.jpg",
    readMoreLink: "https://github.com/prabhavkrishna",
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
                  <p className="text-xl text-muted font-sans mb-8">Hosted at Entron.in</p>
                  
                  <div className="space-y-6 text-lg text-muted/90 font-sans leading-relaxed">
                    <p>
                      Artist Color Lab is a web application built for artists to bridge the gap between physical paints and digital colours. It allows users to browse paint libraries, compare pigments, create custom colours, generate mixing recipes, and manage colour palettes through an intuitive interface.
                    </p>
                    <p>
                      The project focuses heavily on premium UI/UX, colour management, usability and modern frontend engineering.
                    </p>
                  </div>
                  
                  <div className="mt-12">
                    <a 
                      href="https://entron.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-[#060608] font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
                      src="/assets/artist-color-lab/Artist_Color_Lab.png"
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
                      src="/assets/artist-color-lab/Artist_Color_Lab_Mixer.png"
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
                      {study.overview}
                    </p>

                    <button 
                      onClick={() => setExpandedId(isExpanded ? null : study.id)}
                      className="flex items-center space-x-2 text-sm font-medium uppercase tracking-[0.1em] text-white hover:text-accent transition-colors w-max mb-6"
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
                            <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">Project Overview</strong>
                            <p className="text-muted/90 font-sans leading-relaxed">{study.overview}</p>
                          </div>
                          <div>
                            <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">Contribution</strong>
                            <p className="text-muted/90 font-sans leading-relaxed">{study.contribution}</p>
                          </div>
                          <div>
                            <strong className="text-white font-medium block mb-2 text-sm uppercase tracking-wider font-mono">Tech Stack</strong>
                            <p className="text-muted/90 font-sans leading-relaxed">{study.stack}</p>
                          </div>
                          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                            <a 
                              href={study.certificateLink}
                              target="_blank"
                              rel="noopener noreferrer" 
                              className="text-sm font-medium text-white hover:text-accent transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-accent"
                              aria-label={`View certificate for ${study.title}`}
                            >
                              Certificate
                            </a>
                            <a 
                              href={study.readMoreLink}
                              target="_blank"
                              rel="noopener noreferrer" 
                              className="text-sm font-medium text-white hover:text-accent transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-accent"
                              aria-label={`Read more about ${study.title}`}
                            >
                              Read More
                            </a>
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
