"use client";

import { motion } from "framer-motion";

export function Skills() {
  const skillCategories = [
    {
      id: "01",
      title: "Comfortable With",
      description: "Technologies I use regularly to build interfaces and logic.",
      items: ["HTML / CSS", "React", "Next.js", "Tailwind CSS", "Python"]
    },
    {
      id: "02",
      title: "Currently Learning",
      description: "Areas I am actively exploring to deepen my understanding of systems.",
      items: ["TypeScript", "Frontend Architecture", "Supabase (Database)", "AI Workflow Integration"]
    },
    {
      id: "03",
      title: "Tools & Platforms",
      description: "The platforms I use to design, debug, and deploy software.",
      items: ["GitHub", "Cloudflare Pages", "Figma", "Canva", "AI Assistants (Claude, Gemini)"]
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
            >
              <h2 className="text-sm font-mono text-muted uppercase tracking-[0.2em] mb-6">Technical Exposure</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white leading-[1.1] mb-8">
                Skills &<br />Workflow
              </h3>
              <p className="text-lg text-muted/90 font-sans leading-relaxed max-w-md">
                I do not claim to be an expert in everything. Instead, I focus on building a strong foundation, staying highly adaptable, and using modern tools to accelerate my learning.
              </p>
            </motion.div>
          </div>

          {/* Process Steps */}
          <div className="lg:col-span-7 space-y-16">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative pl-12 md:pl-16 border-l border-white/10"
              >
                <div className="absolute top-0 left-0 w-8 h-px bg-white/20 -translate-x-full" />
                <span className="absolute left-4 top-0 -translate-y-1/2 text-xs font-mono text-accent bg-[#060608] py-1">
                  {category.id}
                </span>
                
                <h4 className="text-2xl font-heading font-medium text-white mb-3">{category.title}</h4>
                <p className="text-sm md:text-base text-muted/80 font-sans leading-relaxed mb-6">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <span 
                      key={item}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
