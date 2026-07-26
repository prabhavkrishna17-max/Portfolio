"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

export function Skills() {
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
    <section id="skills" className="py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Header Side */}
          <div className="lg:col-span-5 lg:sticky lg:top-40 h-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="pl-6 border-l border-white/10 relative"
            >
              {/* Subtle accent line */}
              <div className="absolute left-0 top-0 w-[2px] h-12 bg-white/40" />
              
              <h2 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.2em] mb-6">Technical Exposure</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white/90 leading-[1.1] mb-10">
                Skills &<br />Workflow
              </h3>
              <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-md tracking-wide">
                I build modern web applications by combining solid engineering fundamentals with AI-assisted development, rapid prototyping, and iterative refinement. Every project emphasizes maintainability, performance, and user experience.
              </p>
            </motion.div>
          </div>

          {/* Process Steps */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          </div>

        </div>
      </div>
    </section>
  );
}
