"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import ShapeGrid from "@/components/ui/ShapeGrid";
import { fadeUpVariant, staggerContainer, sectionVariant } from "@/lib/animations";

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Subtle parallax for the factual cards to create restrained depth
  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yTextParallax = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="about" ref={containerRef} className="pt-16 md:pt-24 pb-24 md:pb-32 relative z-10 text-white overflow-hidden">
      
      {/* Blend boundary top gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#030305]/0 to-transparent z-0 pointer-events-none" />

      {/* Ambient Geometric Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none transform-gpu will-change-transform"
        style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)" }}
      >
        <ShapeGrid 
          shape="hexagon" 
          direction="diagonal" 
          speed={0.2} 
          squareSize={50} 
          borderColor="#ffffff" 
          hoverFillColor="transparent"
        />
      </div>

      <motion.div 
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 relative z-10"
      >
        <motion.div variants={fadeUpVariant} className="mb-16 md:mb-20">
          <h2 className="text-sm font-mono text-white/40 uppercase tracking-[0.2em]">Background</h2>
        </motion.div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Main Narrative */}
          <motion.div
            style={{ y: yTextParallax }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="lg:col-span-7 flex flex-col gap-8 transform-gpu will-change-transform"
          >
            <motion.h3 variants={fadeUpVariant} className="lens-target text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] text-white/90 text-balance">
              I am a curious developer and Computer Science student learning to build useful software.
            </motion.h3>
            
            <motion.div variants={staggerContainer} className="space-y-6 text-base md:text-lg text-white/50 font-light leading-relaxed tracking-wide">
              <motion.p variants={fadeUpVariant}>
                Currently in my second year at SNS College of Technology, my focus is on practical problem-solving. I am deeply interested in modern web development and UI/UX design, and I learn best by building real-world projects rather than just reading documentation.
              </motion.p>
              <motion.p variants={fadeUpVariant}>
                I am a strong advocate for AI-assisted development. I actively use tools like Claude, ChatGPT, and Gemini to generate code, which accelerates my ability to prototype ideas. My actual work lies in understanding that code, testing it, modifying the business logic, and deploying it to production.
              </motion.p>
              <motion.p variants={fadeUpVariant}>
                I don&apos;t claim to know everything yet, but I learn incredibly fast. My goal is to continually improve my understanding of systems architecture, ask the right questions, and eventually contribute to products that genuinely impact how people work and live.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: yParallax }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="lg:col-span-5 space-y-6 transform-gpu will-change-transform"
          >
            {/* Education — College */}
            <motion.div variants={fadeUpVariant}>
              <GlowCard variant="default" intensity="low" interactive className="p-5 sm:p-8">
                <h4 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.1em] mb-4">University</h4>
                <div className="space-y-1 font-sans text-white/70 text-sm md:text-base">
                  <p className="font-medium text-white/90">B.E Computer Science & Engineering</p>
                  <p>SNS College of Technology</p>
                  <p className="text-white/40 text-xs mt-1 font-mono tracking-widest uppercase">Second Year</p>
                </div>
              </GlowCard>
            </motion.div>

            {/* Education — School */}
            <motion.div variants={fadeUpVariant}>
              <GlowCard variant="default" intensity="low" interactive className="p-5 sm:p-8">
                <h4 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.1em] mb-4">School</h4>
                <div className="space-y-3 font-sans text-white/70 text-sm md:text-base">
                  <p>Vidya Vikasini Matric Higher Secondary School</p>
                </div>
              </GlowCard>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <GlowCard variant="default" intensity="low" interactive className="p-5 sm:p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {/* Core Stack */}
                  <div>
                    <h4 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.1em] mb-4">Core Stack</h4>
                    <div className="space-y-2 font-sans text-white/70 text-sm">
                      <p>Next.js & React</p>
                      <p>TypeScript</p>
                      <p>Python</p>
                      <p>HTML / CSS</p>
                    </div>
                  </div>

                  {/* Design & Tools */}
                  <div>
                    <h4 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.1em] mb-4">Design & Tools</h4>
                    <div className="space-y-2 font-sans text-white/70 text-sm">
                      <p>UI/UX Design</p>
                      <p>FlutterFlow</p>
                      <p>Canva</p>
                      <p>GitHub</p>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="col-span-2 md:col-span-1">
                    <h4 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.1em] mb-4">Languages</h4>
                    <div className="space-y-2 font-sans text-white/70 text-sm">
                      <p>English</p>
                      <p>Tamil</p>
                      <p>Malayalam</p>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
