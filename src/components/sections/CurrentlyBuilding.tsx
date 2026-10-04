"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowDownRight, GitBranch } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SplitFlapText } from "@/components/ui/SplitFlapText";
import { useLenis } from "lenis/react";

export function CurrentlyBuilding() {
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yCard = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const scrollToProject = () => {
    const el = document.getElementById("agentlens");
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -70 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-5 sm:py-8 relative z-10 overflow-hidden"
      aria-label="Currently Building Section"
    >
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-8 md:px-10 lg:px-12">
        <motion.div style={{ y: yCard }} className="transform-gpu will-change-transform">
          <GlowCard
            variant="project"
            className="p-4 sm:p-6 md:p-7 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#0d081f]/80 via-[#070512]/90 to-[#0d081f]/80 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              {/* Left: Status Header & Title */}
              <div className="space-y-2.5 sm:space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-sans font-semibold text-accent uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Currently Building
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-white/60 flex items-center gap-1">
                    <GitBranch size={11} className="text-white/40" />
                    <span>Active Prototype</span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                  <h3 className="text-xl sm:text-2xl font-heading font-medium text-white tracking-tight">
                    AgentLens
                  </h3>
                  <div className="inline-flex items-center overflow-x-auto max-w-full py-0.5 hide-scrollbar">
                    <SplitFlapText
                      words={["BUILDING NOW", "TESTING FLOW", "LEARNING FAST", "SIGNAL LIVE"]}
                      flipDuration={0.12}
                      stagger={0.05}
                      cycleDelay={2600}
                      charset="alphanumeric"
                      flipsPerChar={6}
                      tileColor="#130e28"
                      textColor="#f8fafc"
                      tileRadius={5}
                      gap={3}
                      fontSize={14}
                      fontFamily="var(--font-heading), 'Satoshi', sans-serif"
                      loop
                      padTo={13}
                    />
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base font-sans text-white/75 font-normal leading-relaxed">
                  Autonomous AI agent observability platform providing execution graph visualization, LLM call tracing, and real-time failure diagnostics.
                </p>
              </div>

              {/* Right: Quick Action */}
              <div className="flex items-center gap-3 shrink-0 self-start md:self-center pt-1 md:pt-0">
                <button
                  type="button"
                  onClick={scrollToProject}
                  className="px-4 sm:px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] hover:border-accent/40 text-white text-xs sm:text-sm font-sans font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm group"
                >
                  <Sparkles size={13} className="text-accent" />
                  <span>Inspect Case Study</span>
                  <ArrowDownRight size={13} className="text-white/50 group-hover:text-accent group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}

export default CurrentlyBuilding;
