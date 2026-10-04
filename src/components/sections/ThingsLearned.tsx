"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Compass, Heart } from "lucide-react";
import { ShinyText } from "@/components/ui/ShinyText";
import { GlareHover } from "@/components/ui/GlareHover";

interface Principle {
  number: string;
  domain: string;
  coordinate: string;
  title: string;
  description: string;
}

const principles: Principle[] = [
  {
    number: "01",
    domain: "Problem Space & Constraints",
    coordinate: "SEC.01",
    title: "Think in Problems, Not Just Technologies.",
    description:
      "A technology is only useful when it helps solve a real problem. I am learning to understand the problem, constraints, inputs, outputs, and trade-offs before deciding how to build the solution.",
  },
  {
    number: "02",
    domain: "Computational Thinking",
    coordinate: "SEC.02",
    title: "Algorithms Shape How Software Thinks.",
    description:
      "Learning data structures, algorithms, and computational thinking has changed how I approach problems. The goal is not just to make something work, but to understand why a solution works and how efficiently it scales.",
  },
  {
    number: "03",
    domain: "Systems & Lifecycle",
    coordinate: "SEC.03",
    title: "Software Is More Than Code.",
    description:
      "A working program is only one part of an engineering solution. Architecture, data flow, error handling, testing, deployment, maintainability, and user experience all influence whether software actually works in the real world.",
  },
  {
    number: "04",
    domain: "AI & Verification",
    coordinate: "SEC.04",
    title: "AI Accelerates Development — Understanding Remains Essential.",
    description:
      "Tools such as Claude, ChatGPT, and Gemini help me explore ideas and accelerate implementation. But generated code still needs to be understood, tested, modified, debugged, and integrated responsibly.",
  },
  {
    number: "05",
    domain: "Diagnostic Method",
    coordinate: "SEC.05",
    title: "Debugging Is Part of Thinking.",
    description:
      "Some of the most useful learning happens when something does not work. Tracing an error, isolating the cause, testing assumptions, and iterating toward a solution has become an important part of how I learn.",
  },
  {
    number: "06",
    domain: "Interdisciplinary Breadth",
    coordinate: "SEC.06",
    title: "Computer Science Connects Many Disciplines.",
    description:
      "Software development brings together algorithms, systems, mathematics, human interaction, data, and design. I want to keep exploring those connections rather than limiting myself to a single development domain.",
  },
];

const interests = [
  {
    name: "Chess",
    tagline: "Calculation, strategic patience, and tactical discipline.",
    symbol: "♟",
  },
  {
    name: "Reading",
    tagline: "Books on system architecture, design philosophy, and sci-fi.",
    symbol: "📖",
  },
  {
    name: "Drawing",
    tagline: "Pen sketches, perspective studies, and visual composition.",
    symbol: "✏",
  },
];

export function ThingsLearned() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-40, 40]);
  const yHeader = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-16, 16]);
  const yContent = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [24, -24]);

  return (
    <section
      id="learnings"
      ref={containerRef}
      className="py-20 sm:py-24 md:py-28 relative z-10 overflow-hidden text-white"
      aria-label="Engineering Perspective Section"
    >
      {/* Ambient background glow responding continuously to scroll */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute top-0 right-1/4 w-3/4 max-w-3xl h-56 bg-accent/10 blur-[130px] pointer-events-none rounded-full transform-gpu will-change-transform"
      />

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-8 md:px-10 lg:px-12 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER (Smooth multi-time scroll entrance)                         */}
        {/* ========================================================================= */}
        <motion.div
          style={{ y: yHeader }}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 max-w-3xl transform-gpu will-change-transform"
        >
          <p className="text-xs sm:text-sm font-sans font-semibold text-accent uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
            <Compass size={14} className="text-accent" />
            <ShinyText
              text="Engineering Mindset"
              speed={3.5}
              delay={1}
              color="rgba(255, 255, 255, 0.65)"
              shineColor="#DDD6FE"
              spread={120}
              direction="left"
              className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.2em]"
            />
          </p>
          <h2 className="lens-target text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-white tracking-tight mb-3">
            Engineering Perspective
          </h2>
          <p className="text-sm sm:text-base md:text-[17px] font-sans font-normal text-white/75 leading-relaxed">
            How building, debugging, experimenting, and solving problems have shaped the way I think about software.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* EDITORIAL ENGINEERING JOURNAL (6 PRINCIPLES)                              */}
        {/* ========================================================================= */}
        <motion.div
          style={{ y: yContent }}
          className="mb-16 sm:mb-20 transform-gpu will-change-transform"
        >
          {/* Engineering Journal Header Rule */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between pb-4 mb-8 sm:mb-10 border-b border-white/[0.08] text-[11px] font-mono text-white/40 tracking-[0.18em] uppercase"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
              <span className="text-white/70">CORE WORKING PRINCIPLES</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="text-white/40 hidden sm:inline">CS & ENGINEERING MINDSET</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-accent/80 font-semibold">[06 PERSPECTIVES]</span>
            </div>
          </motion.div>

          {/* 6 Principles Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-10 sm:gap-y-12">
            {principles.map((item, index) => (
              <motion.article
                key={item.number}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -2, transition: { duration: 0.25 } }}
                className="group relative flex flex-col justify-start rounded-xl p-4 sm:p-6 sm:-m-6 transition-all duration-300 hover:bg-white/[0.025] border border-white/[0.04] sm:border-transparent hover:border-white/[0.08] transform-gpu will-change-transform"
              >
                {/* Number, Extending Divider Line & Metadata Label */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  {/* Number with subtle entrance translation */}
                  <motion.span
                    initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                      duration: 0.55,
                      delay: shouldReduceMotion ? 0 : index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-mono text-xs sm:text-sm font-bold text-accent tracking-wider group-hover:text-purple-300 group-hover:drop-shadow-[0_0_10px_rgba(167,139,250,0.6)] transition-all duration-300 shrink-0"
                  >
                    {item.number}
                  </motion.span>

                  {/* Animated extending hairline divider */}
                  <motion.div
                    initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                      duration: 0.75,
                      delay: shouldReduceMotion ? 0 : 0.1 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transformOrigin: "left" }}
                    className="h-[1px] flex-1 bg-white/[0.1] group-hover:bg-gradient-to-r group-hover:from-accent/80 group-hover:via-purple-300/40 group-hover:to-transparent transition-all duration-500 will-change-transform"
                  />

                  {/* Domain label with soft fade-in */}
                  <motion.span
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                      duration: 0.5,
                      delay: shouldReduceMotion ? 0 : 0.2 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-white/40 group-hover:text-accent/90 transition-colors shrink-0 max-w-[130px] sm:max-w-none truncate"
                  >
                    {item.domain}
                  </motion.span>
                </div>

                {/* Concise Title */}
                <h3 className="text-lg sm:text-xl md:text-[21px] font-heading font-medium text-white tracking-tight leading-snug group-hover:text-purple-100 transition-colors duration-200 mb-2.5">
                  {item.title}
                </h3>

                {/* Short Explanation */}
                <p className="text-sm sm:text-[15px] font-sans text-white/70 font-normal leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* BEYOND CODE (Human, elegant, minimal - triggers on scroll)                */}
        {/* ========================================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pt-10 sm:pt-12 border-t border-white/[0.08]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Heart size={15} className="text-accent" />
              <h3 className="text-base sm:text-lg font-heading font-medium text-white tracking-tight">
                Beyond Code
              </h3>
            </div>
            <span className="text-xs font-sans text-white/50">
              The human side outside the editor
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {interests.map((item, i) => (
              <motion.div
                key={item.name}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="transform-gpu"
              >
                <GlareHover
                  glareColor="#a78bfa"
                  glareOpacity={0.12}
                  glareAngle={-35}
                  glareSize={280}
                  transitionDuration={700}
                  playOnce={false}
                  ambientGlow={false}
                  elevation={false}
                  className="w-full rounded-xl border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-300 group"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="flex items-center gap-3.5 p-4 sm:p-5">
                    <span className="text-2xl sm:text-3xl select-none group-hover:scale-110 transition-transform duration-300">
                      {item.symbol}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-sans font-semibold text-white tracking-tight group-hover:text-purple-100 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs font-sans text-white/60 leading-relaxed">
                        {item.tagline}
                      </p>
                    </div>
                  </div>
                </GlareHover>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ThingsLearned;
