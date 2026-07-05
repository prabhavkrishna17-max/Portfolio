"use client";

import { motion } from "framer-motion";

export function Skills() {
  const processes = [
    {
      step: "01",
      title: "Architecture & Systems",
      description: "I don't just build pages; I design scalable systems. Every project begins with mapping out the data flow, state management, and component hierarchy. I prioritize Next.js for its robust routing and server-side capabilities, paired with TypeScript to ensure strict type safety across the entire codebase."
    },
    {
      step: "02",
      title: "Motion & Interaction",
      description: "Motion should feel inevitable, not decorative. I use Framer Motion to orchestrate physics-based animations (springs, dampening, magnetic effects) that guide the user's eye and provide tactile feedback without overwhelming the core experience."
    },
    {
      step: "03",
      title: "Pixel-Perfect UI",
      description: "The difference between a good product and a great one is in the micro-details. I leverage Tailwind CSS to build utility-first, responsive layouts, focusing heavily on typography scales, consistent spacing rhythms, and deep, immersive color palettes."
    }
  ];

  return (
    <section id="process" className="py-24 md:py-32 relative z-10 overflow-hidden">
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
              <h2 className="text-sm font-mono text-muted uppercase tracking-[0.2em] mb-6">Behind the Build</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white leading-[1.1] mb-8">
                The Engineering<br />Process
              </h3>
              <p className="text-lg text-muted/90 font-sans leading-relaxed max-w-md">
                I approach frontend development as a craft. It&apos;s not just about making things look good — it&apos;s about performance, accessibility, and an obsessive attention to detail.
              </p>
            </motion.div>
          </div>

          {/* Process Steps */}
          <div className="lg:col-span-7 space-y-16">
            {processes.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative pl-12 md:pl-16 border-l border-white/10"
              >
                <div className="absolute top-0 left-0 w-8 h-px bg-white/20 -translate-x-full" />
                <span className="absolute left-4 top-0 -translate-y-1/2 text-xs font-mono text-accent bg-[#060608] py-1">
                  {process.step}
                </span>
                
                <h4 className="text-2xl font-heading font-medium text-white mb-4">{process.title}</h4>
                <p className="text-lg text-muted/80 font-sans leading-relaxed">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
