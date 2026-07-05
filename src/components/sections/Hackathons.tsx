"use client";

import { motion } from "framer-motion";

export function Hackathons() {
  const hackathons = [
    {
      year: "",
      title: "FIESTAA'26 Hackathon",
      role: "Participant",
    },
    {
      year: "",
      title: "Technovibe Hackathon",
      role: "Competitor",
    },
    {
      year: "2025",
      title: "HackNext'25",
      role: "Participant",
    },
    {
      year: "2025",
      title: "Oblivion'25",
      role: "Participant",
    },
    {
      year: "2025",
      title: "NASA Space Apps Challenge",
      role: "Participant",
    }
  ];

  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1400px]">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-sm font-mono text-muted uppercase tracking-[0.2em] mb-4">Competitions</h2>
          <p className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-white">Hackathons</p>
        </motion.div>

        <div className="flex flex-col border-t border-white/10">
          {hackathons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-white/5 py-10 lg:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-20">
                <span className="font-mono text-accent/80 uppercase tracking-widest text-sm w-16 group-hover:text-accent transition-colors">{item.year}</span>
                <div>
                  <h3 className="text-3xl font-heading font-medium text-white group-hover:translate-x-2 transition-transform duration-500 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted/80 font-light font-mono text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-500 delay-75">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
