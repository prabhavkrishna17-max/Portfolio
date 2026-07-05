"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative z-10 bg-transparent text-white overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-sm font-mono text-muted uppercase tracking-[0.2em]">Background</h2>
        </motion.div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Main Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium tracking-tight leading-[1.3] text-foreground mb-8">
              I&apos;m a second-year Computer Science student who cares deeply about the intersection of engineering and design.
            </h3>
            
            <div className="space-y-6 text-lg text-muted/90 font-sans leading-relaxed">
              <p>
                I don&apos;t pretend to know everything, but I am building my skills every single day. I prefer modern minimalism over flashy effects, and I care deeply about the details — spending hours polishing UI to ensure clean motion and a premium feel.
              </p>
              <p>
                My philosophy is calm, intentional, and focused on quality. Every project I build is an attempt to create an interface that people actually enjoy using.
              </p>
            </div>
          </motion.div>

          {/* Factual Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 space-y-12"
          >
            
            {/* Education — College */}
            <div>
              <h4 className="text-xs font-mono text-muted uppercase tracking-[0.1em] mb-4">University</h4>
              <div className="space-y-1 font-sans text-foreground">
                <p className="font-medium text-white">B.E Computer Science & Engineering</p>
                <p>SNS College of Technology</p>
                <p className="text-muted">Second Year</p>
              </div>
            </div>

            {/* Education — School */}
            <div>
              <h4 className="text-xs font-mono text-muted uppercase tracking-[0.1em] mb-4">School</h4>
              <div className="space-y-3 font-sans text-foreground">
                <p>Vidya Vikasini Matric Higher Secondary School</p>
                <div className="flex flex-col gap-1">
                  <p className="text-muted flex justify-between max-w-[200px]">
                    <span>12th Grade</span>
                    <span className="text-white">525 / 600</span>
                  </p>
                  <p className="text-muted flex justify-between max-w-[200px]">
                    <span>10th Grade</span>
                    <span className="text-white">466 / 500</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Languages */}
              <div>
                <h4 className="text-xs font-mono text-muted uppercase tracking-[0.1em] mb-4">Languages</h4>
                <div className="space-y-1 font-sans text-foreground">
                  <p>English</p>
                  <p>Tamil</p>
                  <p>Hindi</p>
                  <p>Malayalam</p>
                </div>
              </div>

              {/* Hobbies */}
              <div>
                <h4 className="text-xs font-mono text-muted uppercase tracking-[0.1em] mb-4">Hobbies</h4>
                <div className="space-y-1 font-sans text-foreground">
                  <p>Chess</p>
                  <p>Motorcycles</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
