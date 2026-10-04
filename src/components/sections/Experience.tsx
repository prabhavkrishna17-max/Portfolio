"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUpVariant, staggerContainer, sectionVariant, subtleScale } from "@/lib/animations";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 relative z-10 text-white overflow-hidden">
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 relative z-10"
      >
        <motion.div variants={fadeUpVariant} className="mb-16 md:mb-20">
          <h2 className="text-sm font-mono text-white/40 uppercase tracking-[0.2em]">Experience</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          className="border border-white/[0.03] bg-white/[0.01] backdrop-blur-xl rounded-3xl p-8 md:p-12 lg:p-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Editorial Copy */}
            <motion.div variants={staggerContainer} className="flex flex-col gap-2">
              <motion.p variants={fadeUpVariant} className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center justify-between">
                <span>Arkensys Realtors</span>
                <span>Sep 2024 – Nov 2024</span>
              </motion.p>
              
              <motion.h3 variants={fadeUpVariant} className="lens-target text-3xl md:text-5xl font-medium text-white/90 mb-3 leading-[1.1] tracking-tight text-balance">
                Software Developer Intern
              </motion.h3>
              
              <motion.div variants={staggerContainer} className="mt-8 space-y-8 text-sm md:text-base font-light font-sans text-white/50 tracking-wide">
                <motion.div variants={fadeUpVariant}>
                  <strong className="text-white/70 font-medium block mb-2 uppercase tracking-[0.15em] font-mono text-[10px]">What I Actually Did</strong>
                  <p>Worked on real software projects using AI-assisted development tools like Claude, ChatGPT, and Gemini. Rather than writing thousands of lines from scratch, I used AI to accelerate development while I focused on understanding the logic and architecture.</p>
                </motion.div>
                
                <motion.div variants={fadeUpVariant}>
                  <strong className="text-white/70 font-medium block mb-2 uppercase tracking-[0.15em] font-mono text-[10px]">My Contribution</strong>
                  <p>The AI generated the heavy lifting of the code; my job was to understand it, debug it, modify it to fit the company&apos;s business logic, and integrate it into a cohesive, deployed product.</p>
                </motion.div>

                <motion.div variants={fadeUpVariant}>
                  <strong className="text-white/70 font-medium block mb-2 uppercase tracking-[0.15em] font-mono text-[10px]">Hands-on Exposure</strong>
                  <p>Gained practical exposure to Cloudflare Pages deployment, managing Supabase Authentication, responsive UI design, basic database structures, and modern Git workflows.</p>
                </motion.div>

                <motion.div variants={fadeUpVariant}>
                  <strong className="text-white/70 font-medium block mb-2 uppercase tracking-[0.15em] font-mono text-[10px]">Technologies Encountered</strong>
                  <p>React, Next.js, Supabase, Tailwind CSS, Cloudflare</p>
                </motion.div>
              </motion.div>

              <motion.a 
                variants={fadeUpVariant}
                href="/images/internships/Internship_Report_Prabhav.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.15em] text-white/40 hover:text-white uppercase transition-colors duration-500 mt-12"
              >
                <span>View Full Report</span>
                <span className="w-8 h-[1px] bg-white/30 group-hover:bg-white/70 group-hover:w-12 transition-all duration-500" />
              </motion.a>
            </motion.div>

            {/* Document Images Side-by-Side */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4 md:gap-6">
              <motion.div variants={subtleScale} className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/[0.03] bg-white/[0.02] p-1">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image 
                    src="/images/internships/ARK_Offer_Letter.webp"
                    alt="Offer Letter" 
                    fill 
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-60 hover:opacity-100 hover:scale-[1.03] transition-all duration-700 ease-out" 
                  />
                </div>
              </motion.div>
              <motion.div variants={subtleScale} className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/[0.03] bg-white/[0.02] p-1 translate-y-8">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image 
                    src="/images/internships/Circuit.webp"
                    alt="Internship Environment" 
                    fill 
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-60 hover:opacity-100 hover:scale-[1.03] transition-all duration-700 ease-out" 
                  />
                </div>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
