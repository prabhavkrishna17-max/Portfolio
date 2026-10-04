"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { X, ExternalLink, ArrowUpRight, ArrowDownRight, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { ProjectVideoShowcase } from "@/components/ui/ProjectVideoShowcase";
import { ShinyText } from "@/components/ui/ShinyText";
import { fadeUpVariant, staggerContainer, sectionVariant, CINEMATIC_EASE } from "@/lib/animations";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  badge: string;
  projectType: string;
  role: string;
  oneLiner: string;
  videoSrc: string;
  posterSrc: string;
  videoCaption: string;
  aspectRatio?: string;
  hasAudio: boolean;
  problem: string;
  approach: string;
  keyFeatures: {
    title: string;
    description: string;
  }[];
  uxWorkflow: string[];
  stack: string[];
  learning: string;
  status: string;
  demoUrl?: string;
  githubUrl?: string;
  isSampleWork?: boolean;
}

// =============================================================================
// CATEGORY 1: REAL PROJECTS (Exactly 3)
// Engineering projects and prototypes with genuine development involvement.
// =============================================================================
const realProjects: ProjectData[] = [
  {
    id: "agentlens",
    number: "01",
    title: "AgentLens",
    category: "AI Observability & Trace Debugging",
    projectType: "Academic / Mini Project",
    badge: "Academic / Mini Project",
    role: "System architecture, drop-in SDK instrumentation, and interactive execution graph visualization.",
    oneLiner: "Autonomous AI agent observability platform providing execution graph visualization, LLM call tracing, and real-time failure diagnostics.",
    videoSrc: "/videos/Agentlens.mp4",
    posterSrc: "/images/projects/posters/agentlens_poster.webp",
    videoCaption: "Real UI capture showing prompt interception, autonomous tool calls, and node execution latency.",
    hasAudio: true,
    problem: "Autonomous AI agents execute multi-step reasoning loops and external tool calls in the background. When an agent enters an infinite loop, hallucinates, or fails a tool execution, developers lack clear step-by-step diagnostic telemetry to understand what went wrong.",
    approach: "Designed a visual debugging workbench for AI agents. Built an interactive decision-tree graph that deconstructs agent reasoning chains into discrete nodes with payload metrics and a two-line drop-in SDK integration.",
    keyFeatures: [
      {
        title: "Visual Execution Graph",
        description: "Maps autonomous agent decisions into an interactive node flow with latency and payload metrics.",
      },
      {
        title: "Drop-in SDK Instrumentation",
        description: "Two-line initialization capturing prompts, tool calls, and state mutations across major LLM providers.",
      },
      {
        title: "Live Observability Console",
        description: "Real-time session stream to inspect execution traces and diagnose tool timeouts.",
      },
    ],
    uxWorkflow: [
      "User prompt initiates execution trace with model parameter telemetry",
      "Graph visualizes decision-tree node branching into external tool calls",
      "Console flags tool timeouts and payload exceptions in real time",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "OpenAI SDK", "Anthropic SDK"],
    learning: "Architected asynchronous streaming graph state to visualize multi-step agent reasoning without UI stutter.",
    status: "Working Prototype",
    githubUrl: "https://github.com/prabhavkrishna17-max",
  },
  {
    id: "colorlab",
    number: "02",
    title: "Artist Color Lab",
    category: "Computational Color & Studio Tools",
    projectType: "Internship Project",
    badge: "Internship Project • Arkensys Realtors",
    role: "Software engineering intern at Arkensys Realtors; developed subtractive pigment mixing algorithms, studio palette management, and passwordless authentication.",
    oneLiner: "Precision paint mixing calculator and custom palette studio translating digital color values into physical acrylic recipes.",
    videoSrc: "/videos/ColorLab.mp4",
    posterSrc: "/images/projects/posters/colorlab_poster.webp",
    videoCaption: "Real UI capture showing physical acrylic tube selection, passwordless studio auth, and 5-step mixing recipes.",
    hasAudio: true,
    problem: "Digital screen colors do not map directly to real-world paint pigments. Artists waste expensive acrylic tubes through trial-and-error mixing to match a reference using whatever specific paint tubes they physically have on hand.",
    approach: "Built a parts-based calculation engine that computes exact proportional mixing ratios based on the artist's real inventory, coupled with passwordless studio storage to persist custom palettes across devices.",
    keyFeatures: [
      {
        title: "Parts-Based Mixing Engine",
        description: "Calculates practical mixing ratios based on the physical acrylic tubes in the artist's inventory.",
      },
      {
        title: "Custom Palette Studio",
        description: "Create, save, and organize personalized pigment sets for ongoing studio projects.",
      },
      {
        title: "Passwordless Authentication",
        description: "Email OTP authentication ensuring palettes persist seamlessly across desktop and mobile.",
      },
    ],
    uxWorkflow: [
      "Select acrylic tube brands physically owned in studio inventory",
      "Pick reference colors on screen or upload source reference photos",
      "Generates clear parts-based recipes (e.g. 3 parts Ultramarine, 1 part Titanium White)",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Supabase", "Color Mixing Algorithms"],
    learning: "Engineered subtractive pigment approximation algorithms and responsive state management for tactile studio use.",
    status: "Live Application",
    demoUrl: "https://entron.in",
    githubUrl: "https://github.com/prabhavkrishna17-max",
  },
  {
    id: "aerova",
    number: "03",
    title: "Aerova",
    category: "Macroeconomic Data & Time-Series",
    projectType: "SIH 2026 / Team Project",
    badge: "SIH 2026 / Team Project",
    role: "Team frontend and data visualization lead for Smart India Hackathon 2026; built national route indexing, advance purchase booking windows (T+1 to T+45), and DGCA route weighting visualizations.",
    oneLiner: "Real-time domestic airfare index and market intelligence platform augmenting Consumer Price Index (CPI) calculations with live booking-window analytics.",
    videoSrc: "/videos/Aerova.mp4",
    posterSrc: "/images/projects/posters/aerova_poster.webp",
    videoCaption: "Real UI capture showing national airfare trends, T+1 to T+45 booking horizons, and DGCA passenger weighting.",
    hasAudio: false,
    problem: "Dynamic airline yield management causes rapid fare fluctuations that official monthly CPI inflation indices fail to reflect in real time, leaving travel managers and economic researchers without high-frequency price transparency.",
    approach: "Engineered a real-time airfare index platform tracking national route price evolution. Structured advance-purchase booking horizons (T+1 to T+45) and weighted market indices using DGCA passenger traffic volume data.",
    keyFeatures: [
      {
        title: "AERIX National Index",
        description: "Baseline price series tracking price shifts with 7-day trend history and live telemetry.",
      },
      {
        title: "Advance Purchase Windows",
        description: "Tracks pricing volatility across T+1, T+7, T+15, T+30, and T+45 booking horizons.",
      },
      {
        title: "DGCA Route Weighting",
        description: "Top-volume trunk routes (DEL-BOM) normalized against Directorate General of Civil Aviation passenger traffic.",
      },
    ],
    uxWorkflow: [
      "Live index hero metric with 7-day historical trend spline charts",
      "Granular fare decomposition separating base fares, taxes, UDF, and surcharges",
      "Multi-tab view covering Route Intelligence, Lead-Time Analysis, and data quality",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Time-Series Visualization", "Statistical Indexing"],
    learning: "Deconstructed multi-layered airline pricing models into clean, executive financial visualizations.",
    status: "Working Prototype",
    githubUrl: "https://github.com/prabhavkrishna17-max",
  },
];

// =============================================================================
// CATEGORY 2: SAMPLE WEBSITE WORK (Exactly 3)
// Selected website concepts and UI builds exploring distinct aesthetics and layouts.
// =============================================================================
const sampleWebsites: ProjectData[] = [
  {
    id: "sample-automobile",
    number: "01",
    title: "Automotive Website Sample",
    category: "Automotive UI Exploration",
    projectType: "Sample Website",
    badge: "Sample Website",
    role: "Frontend development and layout design for an automotive workshop concept.",
    oneLiner: "Automotive website concept focused on visual presentation, services, and user interaction.",
    videoSrc: "/videos/Automobile.mp4",
    posterSrc: "/images/projects/posters/automobile_poster.webp",
    videoCaption: "Real UI capture demonstrating video hero integration, service presentation, and responsive appointment layout.",
    hasAudio: true,
    problem: "Designing a high-impact automotive website interface that combines immersive media with clear service presentation and straightforward user flows.",
    approach: "Structured a dark-mode frontend layout featuring full-width video banners, structured service tiers, and responsive interaction patterns.",
    keyFeatures: [
      {
        title: "Visual Presentation",
        description: "High-definition video integration with smooth scroll layout.",
      },
      {
        title: "Service Overview",
        description: "Structured breakdown of mechanical, fabrication, and custom services.",
      },
      {
        title: "Reservation Flow",
        description: "Intuitive consultation and appointment interaction interface.",
      },
    ],
    uxWorkflow: [
      "Immersive visual hero communicating brand tone",
      "Clear catalog of service tiers with pricing and turnaround details",
      "Direct scheduling interface for user inquiries",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    learning: "Managing video playback performance and smooth layout rendering across responsive viewports.",
    status: "UI Exploration",
    githubUrl: "https://github.com/prabhavkrishna17-max",
    isSampleWork: true,
  },
  {
    id: "sample-cafe",
    number: "02",
    title: "Cafe Website Sample",
    category: "Hospitality & Dining UI",
    projectType: "Sample Website",
    badge: "Sample Website",
    role: "Frontend development and design for an artisanal café digital menu concept.",
    oneLiner: "Café website concept focused on menu presentation, atmosphere, and simple customer navigation.",
    videoSrc: "/videos/CafeRestuarent.mp4",
    posterSrc: "/images/projects/posters/caferestuarent_poster.webp",
    videoCaption: "Real UI capture demonstrating editorial café presentation, categorized digital menu, and delivery navigation.",
    hasAudio: true,
    problem: "Creating an atmospheric digital presence for a café that clearly communicates ambiance, organizes menu items, and guides customers to visiting and ordering options.",
    approach: "Crafted a warm, typography-driven editorial interface with structured menu categories, clear dietary labels, and integrated delivery links.",
    keyFeatures: [
      {
        title: "Atmosphere & Storytelling",
        description: "Warm editorial typography and photography highlighting café culture.",
      },
      {
        title: "Categorized Menu",
        description: "Easy-to-browse menu sections with items, descriptions, and pricing.",
      },
      {
        title: "Customer Navigation",
        description: "Direct integration for delivery options and location map access.",
      },
    ],
    uxWorkflow: [
      "Editorial introduction establishing the café atmosphere",
      "Categorized digital menu exploration",
      "Direct delivery and visit location routing",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS", "CSS Architecture"],
    learning: "Balancing editorial aesthetic sensibilities with fast, responsive menu navigation.",
    status: "UI Exploration",
    githubUrl: "https://github.com/prabhavkrishna17-max",
    isSampleWork: true,
  },
  {
    id: "sample-gym",
    number: "03",
    title: "Gym Website Sample",
    category: "Fitness & Athletics UI",
    projectType: "Sample Website",
    badge: "Sample Website",
    role: "Frontend development and UI design for a high-intensity athletic club concept.",
    oneLiner: "Fitness website concept focused on services, facilities, and membership-oriented interactions.",
    videoSrc: "/videos/Gym.mp4",
    posterSrc: "/images/projects/posters/gym_poster.webp",
    videoCaption: "Real UI capture demonstrating brutalist typography, training floor inspection, and pass reservation flow.",
    hasAudio: true,
    problem: "Developing a fitness website interface that transparently highlights equipment quality, training facility spaces, and membership offerings without generic imagery.",
    approach: "Built a bold, high-contrast brutalist design layout with interactive facility floor sections, clear equipment specifications, and an introductory pass flow.",
    keyFeatures: [
      {
        title: "Facility Floor Inspection",
        description: "Clear visual navigation of equipment zones and training platforms.",
      },
      {
        title: "Equipment Specifications",
        description: "Transparent breakdown of available barbells, machines, and plates.",
      },
      {
        title: "Pass Reservation Interface",
        description: "Direct modal flow for booking an introductory training session.",
      },
    ],
    uxWorkflow: [
      "High-contrast hero communicating training philosophy",
      "Interactive floor overview and equipment specifications",
      "Streamlined pass claim and contact workflow",
    ],
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    learning: "Crafting high-contrast design systems with micro-animations that maintain legibility and speed.",
    status: "UI Exploration",
    githubUrl: "https://github.com/prabhavkrishna17-max",
    isSampleWork: true,
  },
];

// =============================================================================
// REAL PROJECT CARD COMPONENT (With two-layer smooth entrance + multi-layer parallax)
// =============================================================================
function RealProjectCard({
  project,
  onSelectProject,
}: {
  project: ProjectData;
  onSelectProject: (p: ProjectData) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  // Layer 2: Increased, impactful continuous parallax
  const yCard = useTransform(scrollYProgress, [0, 1], [65, -65]);
  const yMedia = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [-85, 85]);

  return (
    <div ref={wrapperRef} id={project.id} className="scroll-mt-28">
      {/* Layer 1: Dedicated Smooth Entrance Reveal (Triggers every time user scrolls into view) */}
      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.12 }}
        transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
      >
        {/* Layer 2: Dedicated Continuous Parallax Float (no transform clashing) */}
        <motion.article
          style={{ y: yCard }}
          className="rounded-3xl border border-white/[0.09] bg-gradient-to-b from-[#0c0819]/90 via-[#070510]/95 to-[#040209] p-5 sm:p-7 md:p-10 lg:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-xl transform-gpu will-change-transform flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-12"
        >
          {/* Subtle top ambient glow */}
          <motion.div
            style={{ y: yGlow }}
            className="absolute top-0 right-1/4 w-96 h-40 bg-accent/10 blur-[100px] pointer-events-none rounded-full transform-gpu will-change-transform"
          />

          {/* 1. PROJECT HEADER */}
          <div className="order-2 lg:order-1 lg:col-span-12 mb-6 sm:mb-8 lg:mb-10 pb-6 sm:pb-8 lg:pb-10 border-b border-white/[0.08] relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-accent/20 border border-accent/40 text-[11px] sm:text-xs md:text-sm font-sans font-semibold text-accent uppercase tracking-wider">
                  {project.number} • {project.badge}
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[11px] sm:text-xs md:text-sm font-sans font-medium text-white/70">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] sm:text-xs md:text-sm font-sans font-medium text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {project.status}
                </span>
              </div>

              {/* Direct Quick External Actions */}
              <div className="flex items-center gap-3 sm:gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-sans font-medium text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-sans font-medium text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            <h4 className="lens-target text-2xl sm:text-3xl md:text-4xl lg:text-[54px] font-heading font-medium text-white tracking-tight leading-[1.12] mb-3 sm:mb-4">
              {project.title}
            </h4>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans font-normal text-white/85 leading-relaxed max-w-5xl">
              {project.oneLiner}
            </p>
          </div>

          {/* 2. HIGH-DEFINITION MEDIA SHOWCASE (Order-1 on mobile so media appears first!) */}
          <motion.div
            style={{ y: yMedia }}
            className="order-1 lg:order-3 lg:col-span-6 flex flex-col justify-start transform-gpu will-change-transform mb-6 sm:mb-8 lg:mb-12 lg:pb-12 lg:border-b lg:border-white/[0.08]"
          >
            <div className="rounded-2xl overflow-hidden border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.7)] bg-[#07050e] transition-all duration-300 hover:border-purple-400/40 hover:shadow-[0_25px_70px_rgba(167,139,250,0.15)]">
              <ProjectVideoShowcase
                src={project.videoSrc}
                poster={project.posterSrc}
                title={`${project.title} • ${project.projectType}`}
                badge="Real UI Demo"
                caption={project.videoCaption}
                aspectRatio="aspect-[16/10]"
                hasAudio={project.hasAudio}
              />
            </div>

            <div className="mt-3 px-2 sm:px-3 flex flex-wrap items-center justify-between gap-2.5 text-xs font-sans text-white/60">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Interactive Screen Recording</span>
              </span>
              <span className="text-white/50 text-[11px] sm:text-xs">
                Aspect Ratio: 16:10 • {project.hasAudio ? "Audio Enabled" : "Silent UI Capture"}
              </span>
            </div>
          </motion.div>

          {/* 3. NARRATIVE: ROLE, PROBLEM, APPROACH (Order-3 on mobile) */}
          <div className="order-3 lg:order-2 lg:col-span-6 space-y-5 sm:space-y-6 mb-6 sm:mb-8 lg:mb-12 pb-6 sm:pb-8 lg:pb-12 border-b border-white/[0.08]">
            {/* Role & Contribution Callout */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.035] border border-white/[0.09] shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h5 className="text-xs sm:text-sm font-sans font-semibold text-accent uppercase tracking-[0.16em]">
                  Role & Contribution
                </h5>
              </div>
              <p className="text-sm sm:text-base md:text-[17px] font-sans font-normal text-white/95 leading-[1.65]">
                {project.role}
              </p>
            </div>

            {/* The Problem */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <h5 className="text-xs sm:text-sm font-sans font-semibold text-purple-200 uppercase tracking-[0.16em]">
                  The Problem
                </h5>
              </div>
              <p className="text-sm sm:text-base md:text-[17px] font-sans font-normal text-white/80 leading-[1.7]">
                {project.problem}
              </p>
            </div>

            {/* Approach & Implementation */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h5 className="text-xs sm:text-sm font-sans font-semibold text-purple-200 uppercase tracking-[0.16em]">
                  Approach & Implementation
                </h5>
              </div>
              <p className="text-sm sm:text-base md:text-[17px] font-sans font-normal text-white/80 leading-[1.7]">
                {project.approach}
              </p>
            </div>
          </div>

          {/* 4. KEY FEATURES & UX FLOW (Order-4 on mobile) */}
          <div className="order-4 lg:order-4 lg:col-span-7 space-y-5 sm:space-y-6 mb-6 sm:mb-8 lg:mb-0 pb-6 sm:pb-8 lg:pb-0 border-b border-white/[0.08] lg:border-b-0">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-accent" />
                <h5 className="text-xs sm:text-sm font-sans font-semibold text-white/95 uppercase tracking-[0.16em]">
                  Key Features & UX Flow
                </h5>
              </div>
              <span className="text-xs sm:text-sm font-sans text-white/60">
                {project.keyFeatures.length} Core Modules
              </span>
            </div>

            {/* Detailed Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl bg-white/[0.025] border border-white/[0.07] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-mono text-accent uppercase tracking-wider block mb-1">
                      Feature 0{idx + 1}
                    </span>
                    <h6 className="text-sm sm:text-base font-sans font-semibold text-white mb-1.5">
                      {feat.title}
                    </h6>
                    <p className="text-xs sm:text-sm font-sans text-white/75 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* UX Workflow Steps */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-xs font-sans font-semibold text-purple-200/90 uppercase tracking-wider block mb-3">
                Observed Workflow Steps
              </span>
              <div className="space-y-2.5">
                {project.uxWorkflow.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 text-[11px] font-mono font-bold text-accent shrink-0 flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-sans font-normal text-white/80 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. TECH STACK, LEARNING & ACTIONS (Order-5 on mobile) */}
          <div className="order-5 lg:order-5 lg:col-span-5 space-y-5 sm:space-y-6">
            {/* Tech Stack Box */}
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08] mb-3.5 sm:mb-4">
                <Layers size={17} className="text-accent" />
                <h5 className="text-xs sm:text-sm font-sans font-semibold text-white/95 uppercase tracking-[0.16em]">
                  Technologies & Stack
                </h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm md:text-[15px] font-sans font-medium text-white/90 hover:border-purple-400/40 hover:text-white transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Engineering Learning / Takeaway */}
            {project.learning && (
              <div className="p-4 sm:p-5 rounded-2xl bg-accent/[0.06] border border-accent/20">
                <span className="text-xs font-sans font-semibold text-accent uppercase tracking-wider block mb-1.5">
                  Key Architectural Takeaway
                </span>
                <p className="text-xs sm:text-sm md:text-base font-sans font-normal text-white/85 leading-relaxed">
                  {project.learning}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-7 py-3 rounded-full bg-accent hover:bg-accent-light text-white text-xs sm:text-sm md:text-base font-sans font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(167,139,250,0.4)] hover:shadow-[0_0_35px_rgba(167,139,250,0.6)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Live Application</span>
                  <ExternalLink size={15} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-7 py-3 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.14] hover:border-white/40 text-white text-xs sm:text-sm md:text-base font-sans font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={15} />
                </a>
              )}
              <button
                onClick={() => onSelectProject(project)}
                className="px-5 sm:px-7 py-3 rounded-full border border-white/[0.12] hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs sm:text-sm md:text-base font-sans font-medium transition-all duration-300 cursor-pointer"
              >
                Deep Dive
              </button>
            </div>
          </div>
        </motion.article>
    </motion.div>
    </div>
  );
}

// =============================================================================
// SAMPLE PROJECT CARD COMPONENT (With staggered column parallax & cascade entrance)
// =============================================================================
function SampleProjectCard({
  website,
  index,
  onSelectProject,
}: {
  website: ProjectData;
  index: number;
  onSelectProject: (p: ProjectData) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  // Staggered wavy parallax across columns (increased dynamic range)
  const offset = index === 1 ? 55 : index === 0 ? 35 : 20;
  const yCard = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const yMedia = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <div ref={wrapperRef} id={website.id} className="h-full scroll-mt-24">
      {/* 1. Staggered Entrance Motion Layer (Triggers every time) */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.12 }}
        transition={{
          duration: 0.75,
          delay: index * 0.1,
          ease: CINEMATIC_EASE,
        }}
        className="h-full"
      >
        {/* 2. Continuous Parallax Depth Layer */}
        <motion.div
          style={{ y: yCard }}
          className="h-full transform-gpu will-change-transform"
        >
          <GlowCard
            variant="project"
            className="p-5 sm:p-6 flex flex-col h-full rounded-2xl border border-white/[0.08] bg-[#07070b]/80 backdrop-blur-xl transition-all duration-300 hover:border-purple-400/35 hover:-translate-y-1.5"
          >
            {/* Compact Video Preview Showcase with floating depth */}
            <motion.div style={{ y: yMedia }} className="mb-4 transform-gpu will-change-transform">
              <ProjectVideoShowcase
                src={website.videoSrc}
                poster={website.posterSrc}
                title={website.title}
                badge="UI Demo"
                caption={website.videoCaption}
                aspectRatio="aspect-video"
                compact={true}
                hasAudio={website.hasAudio}
              />
            </motion.div>

        {/* Header & Category Badge */}
        <div className="mb-2.5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-sans font-medium text-white/75">
              {website.category}
            </span>
            <span className="text-xs font-mono text-white/50 font-medium">
              {website.number}
            </span>
          </div>
          <h4 className="text-xl sm:text-2xl font-heading font-medium text-white tracking-tight">
            {website.title}
          </h4>
        </div>

        {/* One-Liner Description */}
        <p className="text-sm sm:text-base font-sans font-normal text-white/75 leading-relaxed mb-5">
          {website.oneLiner}
        </p>

        {/* Short Feature Summary */}
        <div className="space-y-2 mb-6 pb-4 border-b border-white/[0.06]">
          {website.keyFeatures.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-accent/90 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-sans font-normal text-white/80 leading-relaxed">
                <strong className="font-semibold text-white/95">{feat.title}:</strong> {feat.description}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack & Action Footer */}
        <div className="mt-auto space-y-3.5">
          <div className="flex flex-wrap gap-1.5">
            {website.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-xs sm:text-sm font-sans font-medium text-white/75">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06]">
            <button
              onClick={() => onSelectProject(website)}
              className="text-sm font-sans font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Breakdown</span>
              <ArrowUpRight size={14} className="text-accent" />
            </button>

            {website.githubUrl && (
              <a
                href={website.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-sans text-white/60 hover:text-white transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </GlowCard>
    </motion.div>
    </motion.div>
    </div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeCategory, setActiveCategory] = useState<"real" | "sample">("real");
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yAmbient = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yHeader = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const yQuickJump = useTransform(scrollYProgress, [0, 1], [15, -15]);

  // Lock scroll and handle Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, lenis]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -70 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const allProjects = [...realProjects, ...sampleWebsites];

  return (
    <section id="projects" ref={sectionRef} className="pt-14 sm:pt-18 md:pt-20 pb-20 md:pb-28 relative z-10 overflow-hidden">
      {/* Top ambient blend responding to scroll */}
      <motion.div
        style={{ y: yAmbient }}
        className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#030305]/0 via-accent/[0.02] to-transparent z-10 pointer-events-none transform-gpu will-change-transform"
      />

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05 }}
        className="w-full max-w-[1380px] mx-auto px-4 sm:px-8 md:px-10 lg:px-12 relative z-10"
      >
        {/* ========================================================================= */}
        {/* SECTION HEADER & CATEGORY JUMP CONTROLS                                    */}
        {/* ========================================================================= */}
        <motion.div style={{ y: yHeader }} className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 transform-gpu will-change-transform">
          <motion.div variants={fadeUpVariant}>
            <p className="text-xs font-sans font-medium text-white/50 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <ShinyText
                text="Selected Work"
                speed={3.5}
                delay={1}
                color="rgba(255, 255, 255, 0.55)"
                shineColor="#DDD6FE"
                spread={120}
                direction="left"
                className="text-xs font-sans font-medium uppercase tracking-[0.2em]"
              />
            </p>
            <h2 className="lens-target text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-white tracking-tight">
              Featured Projects
            </h2>
          </motion.div>

          {/* Category Navigation Pills */}
          <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setActiveCategory("real")}
              className={cn(
                "px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer",
                activeCategory === "real"
                  ? "bg-accent text-white shadow-[0_0_24px_rgba(167,139,250,0.5)] border border-purple-300/80 font-semibold"
                  : "bg-white/[0.05] border border-white/[0.12] text-white/70 hover:text-white hover:bg-white/[0.1]"
              )}
              aria-pressed={activeCategory === "real"}
            >
              <Sparkles size={14} className={activeCategory === "real" ? "text-white" : "text-accent"} />
              <span>Real Projects</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-mono font-semibold",
                activeCategory === "real" ? "bg-white/20 text-white" : "bg-accent/20 text-accent-light"
              )}>3</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("sample")}
              className={cn(
                "px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer",
                activeCategory === "sample"
                  ? "bg-accent text-white shadow-[0_0_24px_rgba(167,139,250,0.5)] border border-purple-300/80 font-semibold"
                  : "bg-white/[0.05] border border-white/[0.12] text-white/70 hover:text-white hover:bg-white/[0.1]"
              )}
              aria-pressed={activeCategory === "sample"}
            >
              <Layers size={14} className={activeCategory === "sample" ? "text-white" : "text-white/60"} />
              <span>Sample Website Work</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-mono font-semibold",
                activeCategory === "sample" ? "bg-white/20 text-white" : "bg-white/10 text-white/70"
              )}>3</span>
            </button>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* QUICK JUMP SELECTOR STRIP (6-Item Responsive Bar: 3 Real + 3 Sample)       */}
        {/* ========================================================================= */}
        <motion.div
          variants={staggerContainer}
          style={{ y: yQuickJump }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-12 sm:mb-16 md:mb-18 transform-gpu will-change-transform"
        >
          {allProjects.map((project) => (
            <motion.div key={project.id} variants={fadeUpVariant} className="h-full">
              <GlowCard
                variant="project"
                interactive
                onClick={() => {
                  if (project.isSampleWork) {
                    setActiveCategory("sample");
                  } else {
                    setActiveCategory("real");
                  }
                  setTimeout(() => scrollToId(project.id), 60);
                }}
                className="cursor-pointer p-2.5 sm:p-3 flex flex-col h-full group"
              >
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-white/[0.1] mb-2.5 bg-black/40">
                  <Image
                    src={project.posterSrc}
                    alt={`${project.title} Preview`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono text-white/90 font-medium">
                    {project.number}
                  </span>
                  {project.isSampleWork && (
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-sans text-white/85">
                      Sample
                    </span>
                  )}
                </div>

                <h3 className="text-xs sm:text-sm font-heading font-medium text-white tracking-tight truncate mb-1">
                  {project.title}
                </h3>
                <p className="text-[11px] sm:text-xs font-sans text-white/60 truncate mb-2">
                  {project.isSampleWork ? "Sample Website" : project.category}
                </p>

                <div className="mt-auto flex items-center justify-between pt-1.5 border-t border-white/[0.08]">
                  <span className="text-xs font-sans text-white/50 group-hover:text-white transition-colors duration-300">
                    Jump
                  </span>
                  <ArrowDownRight size={13} className="text-accent group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ========================================================================= */}
        {/* CATEGORY 1: REAL PROJECTS                                                 */}
        {/* Primary section with the strongest visual hierarchy.                      */}
        {/* ========================================================================= */}
        {activeCategory === "real" && (
          <div id="real-projects" className="scroll-mt-24">
            <div className="mb-10 sm:mb-16 border-b border-white/[0.08] pb-6">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs sm:text-sm font-sans font-semibold text-accent uppercase tracking-[0.2em]">
                  Category 1
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-white tracking-tight mb-3">
                REAL PROJECTS
              </h3>
              <p className="text-sm sm:text-base md:text-[17px] font-sans font-normal text-white/75 max-w-2xl leading-relaxed">
                Software engineering projects, academic research prototypes, and production systems where I led or contributed directly to technical architecture and implementation.
              </p>
            </div>

            {/* Large Case Study Presentations (Refined Editorial Case Study Architecture) */}
            <div className="space-y-16 md:space-y-24">
              {realProjects.map((project) => (
                <RealProjectCard
                  key={project.id}
                  project={project}
                  onSelectProject={setSelectedProject}
                />
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CATEGORY 2: SAMPLE WEBSITE WORK                                           */}
        {/* Compact, lighter presentation in a 3-column gallery grid.                 */}
        {/* ========================================================================= */}
        {activeCategory === "sample" && (
          <div id="sample-work" className="scroll-mt-24">
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-white/50" />
                <span className="text-xs sm:text-sm font-sans font-semibold text-white/70 uppercase tracking-[0.2em]">
                  Category 2
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-white tracking-tight mb-3">
                SAMPLE WEBSITE WORK
              </h3>
              <p className="text-sm sm:text-base md:text-[17px] font-sans font-normal text-white/75 max-w-2xl leading-relaxed">
                Selected website concepts and UI builds exploring distinct aesthetics and layouts.
              </p>
            </div>

            {/* Compact 3-Column Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {sampleWebsites.map((website, idx) => (
                <SampleProjectCard
                  key={website.id}
                  website={website}
                  index={idx}
                  onSelectProject={setSelectedProject}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* ========================================================================= */}
      {/* CASE STUDY DEEP DIVE MODAL (7-Chapter Editorial Architecture)             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
            className="fixed inset-0 z-[200] bg-[#030305]/92 backdrop-blur-2xl overflow-y-auto px-3 sm:px-4 py-6 sm:py-12 md:py-16"
            onClick={() => setSelectedProject(null)}
            data-lenis-prevent="true"
          >
            <div className="min-h-full flex flex-col items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
                className="w-full max-w-[880px] border border-white/[0.12] bg-[#07070b]/98 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 relative pointer-events-auto shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
              >
                {/* Ambient backdrop glow */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/[0.07] rounded-full blur-[100px] pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 sm:top-7 sm:right-7 p-2 sm:p-2.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.14] transition-all duration-300 cursor-pointer z-20 group"
                  aria-label="Close case study modal"
                >
                  <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Header Metadata */}
                <div className="pr-12 mb-4">
                  <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-mono font-medium text-accent">
                      {selectedProject.number}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-sans font-medium text-white/70">
                      {selectedProject.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-sans text-white/50">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-medium text-white tracking-tight mb-3">
                    {selectedProject.title}
                  </h3>
                  <p className="text-base sm:text-lg font-sans font-normal text-white/80 leading-relaxed">
                    {selectedProject.oneLiner}
                  </p>
                </div>

                {/* Embedded Real Project Media */}
                <div className="my-7 rounded-2xl overflow-hidden border border-white/[0.1] bg-black/60 shadow-2xl">
                  <ProjectVideoShowcase
                    src={selectedProject.videoSrc}
                    poster={selectedProject.posterSrc}
                    title={selectedProject.title}
                    badge="Interactive Demonstration"
                    caption={selectedProject.videoCaption}
                    aspectRatio={selectedProject.aspectRatio || "aspect-video"}
                    compact={false}
                    hasAudio={selectedProject.hasAudio}
                  />
                </div>

                {/* 7-Chapter Deep Dive Development Sequence */}
                <div className="space-y-8 pt-2 divide-y divide-white/[0.07]">
                  {/* 01 THE PROBLEM */}
                  <div className="pt-6 first:pt-0">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-xs font-mono font-semibold text-accent tracking-[0.2em]">01</span>
                      <h4 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-white/60">
                        The Problem
                      </h4>
                    </div>
                    <p className="text-base sm:text-[17px] font-sans font-normal text-white/90 leading-relaxed pl-6 border-l-2 border-accent/40">
                      {selectedProject.problem}
                    </p>
                  </div>

                  {/* 02 THE APPROACH */}
                  <div className="pt-6">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-xs font-mono font-semibold text-accent tracking-[0.2em]">02</span>
                      <h4 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-white/60">
                        The Approach
                      </h4>
                    </div>
                    <p className="text-base sm:text-[17px] font-sans font-normal text-white/90 leading-relaxed pl-6 border-l-2 border-purple-400/40">
                      {selectedProject.approach}
                    </p>
                  </div>

                  {/* 03 HOW I BUILT IT */}
                  <div className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold text-accent tracking-[0.2em]">03</span>
                      <h4 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-white/60">
                        How I Built It
                      </h4>
                    </div>
                    <div className="space-y-4 pl-6 border-l-2 border-white/20">
                      <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.06]">
                        <p className="text-xs font-sans font-semibold text-accent uppercase tracking-wider mb-1.5">
                          Architectural Role & Engineering Ownership
                        </p>
                        <p className="text-sm sm:text-base font-sans font-normal text-white/85 leading-relaxed">
                          {selectedProject.role}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-sans font-medium text-white/50 uppercase tracking-wider mb-2">
                          Core Technology Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm font-mono text-white/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 04 KEY FEATURES */}
                  <div className="pt-6">
                    <div className="flex items-center gap-2 mb-3.5">
                      <span className="text-xs font-mono font-semibold text-accent tracking-[0.2em]">04</span>
                      <h4 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-white/60">
                        Key Features
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 gap-3 pl-6 border-l-2 border-accent/40">
                      {selectedProject.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-accent shrink-0 mt-1" />
                          <div>
                            <span className="text-sm sm:text-base font-sans font-semibold text-white">
                              {feat.title}:
                            </span>{" "}
                            <span className="text-sm sm:text-base font-sans font-normal text-white/80">
                              {feat.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 05 CHALLENGES */}
                  <div className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold text-accent tracking-[0.2em]">05</span>
                      <h4 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-white/60">
                        Challenges & Operational Workflow
                      </h4>
                    </div>
                    <div className="space-y-2.5 pl-6 border-l-2 border-purple-400/40">
                      {selectedProject.uxWorkflow.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm sm:text-base font-sans text-white/80">
                          <span className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-mono flex items-center justify-center shrink-0 mt-0.5 text-accent">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 06 WHAT I LEARNED */}
                  <div className="pt-6">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-xs font-mono font-semibold text-accent tracking-[0.2em]">06</span>
                      <h4 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-white/60">
                        What I Learned
                      </h4>
                    </div>
                    <div className="p-4 rounded-xl bg-accent/[0.04] border border-accent/20 pl-6 border-l-2 border-accent">
                      <p className="text-sm sm:text-base font-sans font-normal text-white/90 leading-relaxed">
                        {selectedProject.learning}
                      </p>
                    </div>
                  </div>

                  {/* 07 RESULT */}
                  <div className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold text-accent tracking-[0.2em]">07</span>
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/60">
                        Result & Verification
                      </h4>
                    </div>
                    <div className="pl-6 border-l-2 border-emerald-400/40 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-sans font-semibold text-white">
                          Status: <span className="text-white/80 font-normal">{selectedProject.status}</span>
                        </span>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap gap-3.5 pt-2">
                        {selectedProject.demoUrl && (
                          <a
                            href={selectedProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full border border-white/25 bg-white/[0.08] hover:bg-white/[0.16] hover:border-white/40 text-sm sm:text-base font-sans font-medium text-white transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer"
                          >
                            <span>Open Live Application</span>
                            <ExternalLink size={15} />
                          </a>
                        )}
                        {selectedProject.githubUrl && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full border border-white/[0.12] hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08] text-sm sm:text-base font-sans font-medium text-white/85 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <span>Inspect on GitHub</span>
                            <ArrowUpRight size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
