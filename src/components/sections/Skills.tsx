"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import ShapeGrid from "@/components/ui/ShapeGrid";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Layered parallax for depth
  const yLine = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);
  const yGlow = useTransform(scrollYProgress, [0, 1], ["-100px", "100px"]);

  const skillCategories = [
    {
      title: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Backend",
      items: ["FastAPI", "Supabase", "PostgreSQL", "REST APIs"]
    },
    {
      title: "Deployment",
      items: ["Cloudflare Pages", "GitHub Actions", "GoDaddy DNS"]
    },
    {
      title: "AI & Workflow",
      items: ["Claude", "Gemini", "ChatGPT", "Antigravity"]
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 relative z-10 overflow-hidden">
      
      {/* Ambient flowing particles */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none transform-gpu will-change-transform"
        style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)" }}
      >
        <ShapeGrid 
          shape="circle" 
          direction="up" 
          speed={0.15} 
          squareSize={60} 
          borderColor="#ffffff" 
          hoverFillColor="transparent"
        />
      </div>

      {/* Ambient background glow with fast parallax */}
      <motion.div 
        style={{ y: yGlow }} 
        className="absolute top-1/2 left-0 w-full max-w-md h-[40vh] bg-white/[0.015] blur-[120px] rounded-full pointer-events-none transform-gpu will-change-transform" 
      />

      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Header Side */}
          <div className="lg:col-span-5 lg:sticky lg:top-40 h-max">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
              className="pl-6 border-l border-white/10 relative"
            >
              {/* Subtle accent line parallax wrapper */}
              <motion.div style={{ y: yLine }} className="absolute left-0 top-0 transform-gpu will-change-transform">
                <motion.div variants={fadeUpVariant} className="w-[2px] h-12 bg-white/40" />
              </motion.div>
              
              <motion.h2 variants={fadeUpVariant} className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.25em] mb-6">Technical Exposure</motion.h2>
              <motion.h3 variants={fadeUpVariant} className="lens-target text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tighter text-white/90 leading-[1.05] mb-10 text-balance">
                Skills &<br />Workflow
              </motion.h3>
              <motion.p variants={fadeUpVariant} className="text-base md:text-lg text-white/50 font-light leading-relaxed tracking-wide">
                I build modern web applications by combining solid engineering fundamentals with AI-assisted development, rapid prototyping, and iterative refinement. Every project emphasizes maintainability, performance, and user experience.
              </motion.p>
            </motion.div>
          </div>

          {/* Process Steps */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={fadeUpVariant}
              >
                <GlowCard variant="skills" intensity="medium" interactive className="p-8 h-full">
                  <h4 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.1em] mb-4 pb-4 border-b border-white/[0.05]">
                    {category.title}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {category.items.map((item) => (
                      <span 
                        key={item}
                        className="text-sm md:text-base text-white/70 font-sans tracking-wide"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
