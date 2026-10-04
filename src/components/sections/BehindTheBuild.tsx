"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
  GitCommit
} from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { ShinyText } from "@/components/ui/ShinyText";
import { ProjectVideoShowcase } from "@/components/ui/ProjectVideoShowcase";
import { SplitFlapText } from "@/components/ui/SplitFlapText";

interface BuildEvidenceItem {
  id: string;
  project: string;
  category: string;
  badge: string;
  headline: string;
  summary: string;
  videoSrc?: string;
  posterSrc: string;
  technicalMilestones: {
    label: string;
    detail: string;
  }[];
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
}

const buildEvidence: BuildEvidenceItem[] = [
  {
    id: "evidence-agentlens",
    project: "AgentLens",
    category: "AI Telemetry & Execution Tracing",
    badge: "Architecture Evidence",
    headline: "Visualizing Autonomous Agent Decision Loops Without Telemetry Lag",
    summary:
      "When building AgentLens, the core engineering hurdle was streaming asynchronous reasoning steps and LLM provider payloads into an interactive decision tree without blocking the frontend render loop. Built a lightweight drop-in SDK that intercepts model prompts and tool calls in real time.",
    videoSrc: "/videos/Agentlens.mp4",
    posterSrc: "/images/projects/posters/agentlens_poster.webp",
    technicalMilestones: [
      {
        label: "Decision Tree State Streaming",
        detail: "Buffers incoming node telemetry in memory and renders interactive directed graphs with per-node latency benchmarks.",
      },
      {
        label: "Two-Line SDK Instrumentation",
        detail: "Wraps OpenAI and Anthropic SDK callers to automatically extract token counts, parameters, and tool call payload exceptions.",
      },
      {
        label: "Real-Time Failure Diagnostics",
        detail: "Flags infinite loops and external API timeouts directly in the visual workbench console.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "OpenAI SDK", "Anthropic SDK"],
    repoUrl: "https://github.com/prabhavkrishna17-max",
  },
  {
    id: "evidence-colorlab",
    project: "Artist Color Lab",
    category: "Subtractive Color Engine",
    badge: "Internship Engineering · Arkensys",
    headline: "Translating Digital Hex Codes into Real-World Physical Paint Parts",
    summary:
      "Developed during my software engineering internship at Arkensys Realtors. Screen RGB colors cannot be physically mixed like paint. Developed a parts-based subtractive calculation algorithm that factors in the artist's physical inventory of acrylic tubes and computes exact volumetric ratios.",
    videoSrc: "/videos/ColorLab.mp4",
    posterSrc: "/images/projects/posters/colorlab_poster.webp",
    technicalMilestones: [
      {
        label: "Subtractive Pigment Math",
        detail: "Approximates subtractive spectral mixing rather than additive digital light, preventing dull or muddy paint recipe outputs.",
      },
      {
        label: "Studio Inventory Mapping",
        detail: "Restricts mixing recommendations strictly to physical acrylic tubes physically flagged as owned in the user's studio.",
      },
      {
        label: "Passwordless Studio Persistence",
        detail: "Supabase email OTP authentication with Row-Level Security ensuring custom palettes persist seamlessly across devices.",
      },
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Supabase", "Color Algorithms"],
    demoUrl: "https://entron.in",
    repoUrl: "https://github.com/prabhavkrishna17-max",
  },
  {
    id: "evidence-aerova",
    project: "Aerova",
    category: "Macro Time-Series Indexing",
    badge: "SIH 2026 Team Project",
    headline: "High-Frequency Domestic Airfare Intelligence Across T+1 to T+45 Booking Horizons",
    summary:
      "Built as frontend and data visualization lead for Smart India Hackathon 2026. Official monthly CPI inflation indices fail to capture rapid airline yield management fare changes. Structured advance-purchase booking horizons and weighted market price series using official DGCA volume statistics.",
    videoSrc: "/videos/Aerova.mp4",
    posterSrc: "/images/projects/posters/aerova_poster.webp",
    technicalMilestones: [
      {
        label: "Advance Horizon Modeling",
        detail: "Deconstructs fares across T+1, T+7, T+15, T+30, and T+45 advance booking windows to quantify pricing volatility.",
      },
      {
        label: "DGCA Traffic Volume Weighting",
        detail: "Normalizes high-traffic trunk routes (DEL-BOM) against national civil aviation passenger statistics for macro accuracy.",
      },
      {
        label: "Granular Fare Decomposition",
        detail: "Separates base airfares, fuel surcharges, UDF, and taxes for transparent price volatility analysis.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Time-Series Visualization", "Statistical Indexing"],
    repoUrl: "https://github.com/prabhavkrishna17-max",
  },
];

export function BehindTheBuild() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yHeader = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const yCard = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const activeItem = buildEvidence[activeTab];

  return (
    <section
      id="behind-the-build"
      ref={containerRef}
      className="py-20 sm:py-24 md:py-28 relative z-10 overflow-hidden text-white"
      aria-label="Behind the Build Section"
    >
      {/* Top subtle ambient purple glow responding continuously to scroll */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-44 bg-accent/10 blur-[130px] pointer-events-none rounded-full transform-gpu will-change-transform"
      />

      <div className="w-full max-w-[1380px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <motion.div
          style={{ y: yHeader }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 transform-gpu will-change-transform"
        >
          <div>
            <p className="text-xs sm:text-sm font-sans font-semibold text-accent uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <ShinyText
                text="Engineering Evidence"
                speed={3.5}
                delay={1}
                color="rgba(255, 255, 255, 0.65)"
                shineColor="#DDD6FE"
                spread={120}
                direction="left"
                className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.2em]"
              />
            </p>
            <h2 className="lens-target text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-white tracking-tight">
              Behind the Build
            </h2>
          </div>
          <p className="text-sm sm:text-base font-sans font-normal text-white/75 max-w-xl leading-relaxed">
            Real architectural decisions, development evidence, and algorithmic solutions behind the projects.
          </p>
        </motion.div>

        {/* Project Selector Tabs & Mechanical Telemetry Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {buildEvidence.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeTab === idx
                    ? "bg-accent text-white shadow-[0_0_20px_rgba(167,139,250,0.4)]"
                    : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                <span>{item.project}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === idx ? "bg-white/20 text-white" : "bg-white/10 text-white/50"
                  }`}
                >
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Mechanical System Telemetry Board */}
          <div className="hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-md">
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Pipeline
            </span>
            <SplitFlapText
              words={["LAUNCH READY", "SYNC ONLINE", "SIGNAL LIVE"]}
              flipDuration={0.12}
              stagger={0.06}
              cycleDelay={2400}
              charset="alphanumeric"
              flipsPerChar={8}
              tileColor="#111827"
              textColor="#f8fafc"
              tileRadius={5}
              gap={4}
              fontSize={14}
              fontFamily="var(--font-heading), 'Satoshi', sans-serif"
              loop
              padTo={12}
            />
          </div>
        </div>

        {/* Dynamic Architectural Evidence Canvas */}
        <motion.div style={{ y: yCard }} className="transform-gpu will-change-transform">
          <GlowCard
            variant="project"
            className="p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl border border-white/[0.09] bg-gradient-to-b from-[#0c0819]/90 via-[#070510]/95 to-[#040209] backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column (6 Cols): Video Showcase & Artifacts */}
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl overflow-hidden border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.7)] bg-[#07050e]">
                  <ProjectVideoShowcase
                    src={activeItem.videoSrc}
                    poster={activeItem.posterSrc}
                    title={`${activeItem.project} • Real UI Trace`}
                    badge="Verified UI Flow"
                    aspectRatio="aspect-[16/10]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.07] flex items-center justify-between gap-3 text-xs font-sans text-white/60">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>Tested & Verified UI Implementation</span>
                  </span>
                  <span className="font-mono text-white/40">{activeItem.badge}</span>
                </div>
              </div>

              {/* Right Column (6 Cols): Engineering Breakdown */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/35 text-xs font-sans font-semibold text-accent uppercase tracking-wider">
                      {activeItem.badge}
                    </span>
                    <span className="text-xs font-sans text-white/50">{activeItem.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-medium text-white tracking-tight leading-snug mb-3">
                    {activeItem.headline}
                  </h3>

                  <p className="text-sm sm:text-base font-sans text-white/80 font-normal leading-relaxed">
                    {activeItem.summary}
                  </p>
                </div>

                {/* Technical Milestones */}
                <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                  <h4 className="text-xs font-sans font-semibold text-accent uppercase tracking-[0.16em] flex items-center gap-2">
                    <GitCommit size={14} />
                    <span>Technical Architecture & Decisions</span>
                  </h4>

                  <div className="space-y-2.5">
                    {activeItem.technicalMilestones.map((m, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 text-[11px] font-mono font-bold text-accent shrink-0 flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <strong className="block text-xs sm:text-sm font-sans font-semibold text-white/95 mb-0.5">
                            {m.label}
                          </strong>
                          <p className="text-xs sm:text-sm font-sans text-white/70 font-normal leading-relaxed">
                            {m.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack & Links */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {activeItem.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-sans font-medium text-white/75"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {activeItem.demoUrl && (
                      <a
                        href={activeItem.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-sans text-accent hover:text-accent-light font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <span>Live Site</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                    {activeItem.repoUrl && (
                      <a
                        href={activeItem.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-sans text-white/70 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}

export default BehindTheBuild;
