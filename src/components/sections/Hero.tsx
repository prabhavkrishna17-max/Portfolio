"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { X, ArrowUpRight } from "lucide-react";
import { LeetCodeLogo } from "@/components/ui/BrandIcons";

const ResumePreview = dynamic(() => import('./ResumePreview'), { ssr: false });

// Extremely slow cinematic easing
const CINEMATIC_EASE: [number, number, number, number] = [0.2, 0.9, 0.1, 1];

export function Hero() {
  const { scrollY } = useScroll();
  const [showResume, setShowResume] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Cinematic loading state (triggers the sequence)
  const [isLoaded, setIsLoaded] = useState(false);

  // Wait a tick for mount before triggering the sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll spring for inertia
  const smoothScroll = useSpring(scrollY, { damping: 60, stiffness: 400, mass: 1 });
  
  // Parallax for text to give subtle depth against the background
  const textScrollY = useTransform(smoothScroll, [0, 1000], [0, -150]);
  const videoScrollY = useTransform(smoothScroll, [0, 1000], [0, 60]);
  const bgScrollY = useTransform(smoothScroll, [0, 1000], [0, 120]);
  const opacityFade = useTransform(smoothScroll, [0, 600], [1, 0]);

  // Removed global handleMouseMove since lens is localized

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* 1. ATMOSPHERE / LIGHTING (Base Layer) */}
      <motion.div 
        style={{ y: bgScrollY, maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 0.3 : 0 }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="absolute inset-[-20%] w-[140%] h-[140%] z-0 pointer-events-none transform-gpu will-change-transform"
      >
        {/* Soft atmospheric gradients providing subtle volumetric light */}
        <motion.div 
          animate={{ x: ["0%", "-3%", "0%"], y: ["0%", "3%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.04),transparent_50%)]" 
        />
        <motion.div 
          animate={{ x: ["0%", "3%", "0%"], y: ["0%", "-3%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(167,139,250,0.04),transparent_50%)]" 
        />
      </motion.div>

      {/* Mobile Background Fallback */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a0a12] via-[#030305] to-[#08080f] lg:hidden" />

      {/* 2. CINEMATIC VIDEO */}
      <motion.div 
        style={{ y: videoScrollY }}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: isLoaded ? 1 : 0, filter: isLoaded ? "blur(0px)" : "blur(10px)" }}
        transition={{ duration: 3, delay: 0.5, ease: CINEMATIC_EASE }}
        className="absolute top-0 right-0 h-full w-full lg:w-[65%] xl:w-[60%] z-0 hidden lg:block transform-gpu group"
        style={{
          // Softer, wider feathering to blend the vertical split organically
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 10%, black 50%, black 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 10%, black 50%, black 100%)",
          willChange: "filter, opacity",
          transform: "translateZ(0)",
        }}
      >
        {/* Ambient Light Spill */}
        <div className="absolute inset-0 z-0 bg-white/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] ease-out pointer-events-none transform-gpu" />

        {/* Premium Edge Bloom */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_70%_40%,rgba(255,255,255,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] ease-out mix-blend-screen pointer-events-none" />
        
        {/* Soft Glass Reflection */}
        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[2500ms] ease-in-out pointer-events-none mix-blend-overlay" />

        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ objectPosition: "72% 22%" }}
          className="w-full h-full object-cover brightness-[0.7] contrast-[1.15] saturate-[0.8] sepia-[0.1] opacity-90 group-hover:brightness-[0.8] group-hover:contrast-[1.25] group-hover:saturate-[0.85] transition-all duration-[1500ms] ease-out relative z-10"
        >
          <source src="/images/hero/Me-Video.mp4" type="video/mp4" />
        </video>
      </motion.div>



      {/* 4. VIGNETTE, BLENDING & ATMOSPHERIC DUST (Foreground depth) */}
      <div className="absolute inset-0 z-[10] pointer-events-none bg-gradient-to-r from-[#030305] via-[#030305]/95 to-transparent w-full lg:w-[85%]" />
      <div className="absolute inset-0 z-[10] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(3,3,5,0.6)_80%,#030305_100%)]" />
      
      <motion.div 
        style={{ y: textScrollY }}
        className="absolute inset-0 z-[12] pointer-events-none opacity-[0.03] mix-blend-overlay transform-gpu will-change-transform hidden md:block"
        animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        backgroundImage={`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}
      />
      
      {/* Fallback overlay for reduced motion */}
      <div className="absolute inset-0 z-[10] pointer-events-none bg-[#050505]/80 motion-reduce:bg-[#050505] motion-safe:hidden" />

      {/* ===== MAIN CONTENT ===== */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-20 h-full flex flex-col justify-center pb-12">
        
        <motion.div
          style={{ y: textScrollY, opacity: opacityFade }}
          className="flex flex-col items-center md:items-start text-center md:text-left w-full lg:w-[55%] max-w-3xl"
        >
          {/* Status Chip (Extremely subtle, quiet) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ duration: 1.5, delay: 2.5, ease: CINEMATIC_EASE }}
            className="mb-8 md:mb-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.03] bg-white/[0.01] backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-white/40 uppercase">Available for internships</span>
            </div>
          </motion.div>

          {/* Headline - Interactive Lens Typography */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)", y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, filter: isLoaded ? "blur(0px)" : "blur(12px)", y: isLoaded ? 0 : 10 }}
            transition={{ duration: 2.5, delay: 1.5, ease: CINEMATIC_EASE }}
            className="mb-8 md:mb-10 relative group inline-block"
          >
            <h1 className="lens-target text-[11vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5vw] leading-[1.05] tracking-tight font-medium text-white/90 drop-shadow-2xl relative z-10 selection:bg-white/20 text-balance">
              Creating <span className="font-serif italic text-white/70 font-light pr-2 tracking-normal">Intelligent</span><br />
              Web Experiences
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: isLoaded ? 1 : 0, filter: isLoaded ? "blur(0px)" : "blur(8px)" }}
            transition={{ duration: 2, delay: 3, ease: CINEMATIC_EASE }}
            className="text-sm sm:text-base md:text-lg text-white/50 font-light leading-relaxed max-w-lg mb-12 tracking-wide"
          >
            Computer Science student building thoughtful digital experiences with AI-assisted development and modern web technologies.
          </motion.p>

          {/* CTA Buttons (Premium, cohesive hierarchy) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 2, delay: 4, ease: CINEMATIC_EASE }}
            className="flex flex-col sm:flex-row items-center gap-5 sm:gap-4 mt-2 justify-center md:justify-start w-full sm:w-auto opacity-90 hover:opacity-100 transition-opacity duration-500"
          >
            {/* Primary CTA: Resume */}
            <button
              onClick={() => setShowResume(true)}
              className="group relative flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-500 w-full sm:w-auto hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] hover:-translate-y-[1px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10 text-[11px] sm:text-xs font-mono tracking-[0.15em] text-white/90 uppercase mt-0.5">View Resume</span>
            </button>

            {/* Secondary CTA: LeetCode */}
            <a
              href="https://leetcode.com/u/Prabhav_Krishna/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-transparent hover:bg-white/[0.03] transition-all duration-500 w-full sm:w-auto"
            >
              <LeetCodeLogo className="w-4 h-4 group-hover:rotate-[8deg] group-hover:scale-110 transition-transform duration-500" />
              <span className="text-[11px] sm:text-xs font-mono tracking-[0.15em] text-white/60 group-hover:text-white/90 uppercase mt-0.5 transition-colors duration-500">LeetCode</span>
            </a>

            {/* Tertiary Link: Let's Connect */}
            <a
              href="#connect"
              className="group flex items-center justify-center gap-3 px-4 py-3 sm:ml-4 text-[11px] sm:text-xs font-mono tracking-[0.15em] text-white/50 hover:text-white uppercase transition-colors duration-500 w-full sm:w-auto"
            >
              <span className="w-6 h-[1px] bg-white/30 group-hover:bg-white/80 group-hover:w-10 transition-all duration-500" />
              <span>Let&apos;s Connect</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== RESUME MODAL ===== */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-xl"
            onClick={() => setShowResume(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[900px] h-[85vh] liquid-glass rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowResume(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="w-full h-full overflow-hidden p-2 sm:p-6">
                <ResumePreview />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? opacityFade.get() : 0 }}
        transition={{ duration: 2, delay: 5 }}
        style={{ opacity: opacityFade }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <motion.div 
          animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
        />
      </motion.div>
    </section>
  );
}
