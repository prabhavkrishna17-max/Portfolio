"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import { LeetCodeLogo } from "@/components/ui/BrandIcons";
import { ShinyText } from "@/components/ui/ShinyText";

import { useLenis } from "lenis/react";

const ResumePreview = dynamic(() => import('./ResumePreview'), { ssr: false });

// Extremely slow cinematic easing
const CINEMATIC_EASE: [number, number, number, number] = [0.2, 0.9, 0.1, 1];

export function Hero() {
  const { scrollY } = useScroll();
  const [showResume, setShowResume] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  
  // Cinematic loading state (triggers the sequence)
  const [isLoaded, setIsLoaded] = useState(false);

  // Wait a tick for mount before triggering the sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Lock scroll and handle Escape key for resume modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showResume) {
        setShowResume(false);
      }
    };
    if (showResume) {
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
  }, [showResume, lenis]);

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
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: isLoaded ? 1 : 0, filter: isLoaded ? "blur(0px)" : "blur(10px)" }}
        transition={{ duration: 3, delay: 0.5, ease: CINEMATIC_EASE }}
        className="absolute top-0 right-0 h-full w-full lg:w-[65%] xl:w-[60%] z-0 hidden lg:block transform-gpu group"
        style={{
          y: videoScrollY,
          // Softer, wider feathering to blend the vertical split organically
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 10%, black 50%, black 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 10%, black 50%, black 100%)",
          willChange: "filter, opacity, transform",
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
        style={{ 
          y: textScrollY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
        className="absolute inset-0 z-[12] pointer-events-none opacity-[0.03] mix-blend-overlay transform-gpu will-change-transform hidden md:block"
        animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Fallback overlay for reduced motion */}
      <div className="absolute inset-0 z-[10] pointer-events-none bg-[#050505]/80 motion-reduce:bg-[#050505] motion-safe:hidden" />

      {/* ===== MAIN CONTENT ===== */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-20 h-full flex flex-col justify-center pt-20 sm:pt-24 md:pt-0 pb-10 sm:pb-12">
        
        <motion.div
          style={{ y: textScrollY, opacity: opacityFade }}
          className="flex flex-col items-center md:items-start text-center md:text-left w-full lg:w-[58%] max-w-3xl"
        >
          {/* Status Chip (Extremely subtle, quiet) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ duration: 1.5, delay: 2.5, ease: CINEMATIC_EASE }}
            className="mb-5 sm:mb-8 md:mb-10"
          >
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/[0.04] bg-white/[0.02] backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60"></span>
              </span>
              <ShinyText
                text="Available for internships"
                speed={4}
                delay={1.5}
                color="rgba(255, 255, 255, 0.6)"
                shineColor="rgba(255, 255, 255, 0.98)"
                spread={120}
                direction="left"
                pauseOnHover={false}
                className="text-xs sm:text-sm font-sans font-medium tracking-[0.15em] uppercase"
              />
            </div>
          </motion.div>

          {/* Headline - Interactive Lens Typography with Fluid Scaling */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)", y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, filter: isLoaded ? "blur(0px)" : "blur(12px)", y: isLoaded ? 0 : 10 }}
            transition={{ duration: 2.5, delay: 1.5, ease: CINEMATIC_EASE }}
            className="mb-5 sm:mb-8 md:mb-10 relative group inline-block"
          >
            <h1 className="lens-target text-[9.5vw] xs:text-[9vw] sm:text-[7.5vw] md:text-[6vw] lg:text-[4.75vw] xl:text-[5vw] leading-[1.08] tracking-tight font-medium text-white/90 drop-shadow-2xl relative z-10 selection:bg-white/20 text-balance">
              Creating <span className="font-serif italic text-white/70 font-light pr-2 tracking-normal">Intelligent</span><br />
              Web Experiences
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: isLoaded ? 1 : 0, filter: isLoaded ? "blur(0px)" : "blur(8px)" }}
            transition={{ duration: 2, delay: 3, ease: CINEMATIC_EASE }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/75 font-normal leading-relaxed max-w-xl mb-8 sm:mb-10 md:mb-12 tracking-wide"
          >
            Computer Science student building thoughtful digital experiences with AI-assisted development and modern web technologies.
          </motion.p>

          {/* CTA Buttons (Premium, cohesive hierarchy) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 2, delay: 4, ease: CINEMATIC_EASE }}
            className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mt-1 justify-center md:justify-start w-full sm:w-auto opacity-90 hover:opacity-100 transition-opacity duration-500"
          >
            {/* Primary CTA: Resume */}
            <button
              onClick={() => setShowResume(true)}
              className="group relative flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 rounded-full border border-white/[0.12] bg-white/[0.05] backdrop-blur-xl overflow-hidden glass-hover hover:border-purple-400/40 transition-all duration-500 w-full sm:w-auto hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.5),0_0_30px_-5px_rgba(167,139,250,0.2)] hover:-translate-y-[1px] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10 text-sm sm:text-base font-sans font-medium tracking-wide text-white">View Resume</span>
            </button>

            {/* Secondary CTA: LeetCode */}
            <a
              href="https://leetcode.com/u/Prabhav_Krishna/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] backdrop-blur-md glass-hover transition-all duration-500 w-full sm:w-auto cursor-pointer"
            >
              <LeetCodeLogo className="w-4 h-4 group-hover:rotate-[8deg] group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 text-sm sm:text-base font-sans font-medium tracking-wide text-white/80 group-hover:text-white transition-colors duration-500">LeetCode</span>
            </a>

            {/* Tertiary Link: Let's Connect */}
            <a
              href="#contact"
              className="group flex items-center justify-center gap-3 px-5 py-3 sm:ml-2 text-sm sm:text-base font-sans font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-500 w-full sm:w-auto"
            >
              <span className="w-6 h-[1.5px] bg-white/40 group-hover:bg-white/90 group-hover:w-10 transition-all duration-500" />
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
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-12 bg-black/75 backdrop-blur-xl"
            onClick={() => setShowResume(false)}
            data-lenis-prevent="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[900px] h-[85dvh] max-h-[85dvh] liquid-glass rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
            >
              <button 
                onClick={() => setShowResume(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-2.5 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 border border-white/10 transition-colors"
                aria-label="Close resume preview"
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
