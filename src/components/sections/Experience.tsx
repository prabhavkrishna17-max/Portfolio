"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 relative z-10 bg-transparent text-white overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-sm font-mono text-muted uppercase tracking-[0.2em]">Experience</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass-elevated rounded-3xl p-8 md:p-12 lg:p-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Editorial Copy */}
            <div>
              <p className="text-xs md:text-sm font-mono text-muted uppercase tracking-[0.2em] mb-6">
                Internship
              </p>
              <h3 className="text-2xl md:text-4xl font-heading font-medium text-white mb-2 leading-[1.2]">
                Software Developer Intern
              </h3>
              <p className="text-lg text-foreground/80 mb-10 font-sans">
                Arkensys Realtors
              </p>

              <div className="space-y-3 font-sans text-foreground mb-12">
                <p className="flex items-center space-x-3">
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>Frontend Architecture</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>Interactive SVGs</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>Complex Event Listeners</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>Interactive Property Mapping</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>UI/UX Improvements</span>
                </p>
              </div>

              <a 
                href="/assets/internship/Internship_Report_Prabhav.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium uppercase tracking-[0.15em] text-white hover:text-accent transition-colors group"
              >
                <span>View Full Report</span>
                <span className="ml-3 w-8 h-px bg-white/30 group-hover:bg-accent group-hover:w-12 transition-all duration-300" />
              </a>
            </div>

            {/* Document Images Side-by-Side */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden glass p-1">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image 
                    src="/assets/internship/ARK_Offer_Letter.jpg" 
                    alt="Offer Letter" 
                    fill 
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-70 hover:opacity-100 hover:scale-[1.02] transition-all duration-700" 
                  />
                </div>
              </div>
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden glass p-1 translate-y-8">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image 
                    src="/assets/internship/Circuit.jpg" 
                    alt="Internship Environment" 
                    fill 
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-70 hover:opacity-100 hover:scale-[1.02] transition-all duration-700" 
                  />
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
