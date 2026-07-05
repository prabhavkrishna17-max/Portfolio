"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const ResumePreview = dynamic(() => import('./ResumePreview'), { ssr: false });

export function Hero() {
  const { scrollY } = useScroll();
  const [showResume, setShowResume] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth scroll spring for inertia
  const smoothScroll = useSpring(scrollY, { damping: 60, stiffness: 400, mass: 1 });

  // Mouse tracking with heavily dampened springs for cinematic inertia
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 60, stiffness: 80, mass: 2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle mouse parallax for portrait (max 10-15px)
  const portraitX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  // Rotate portrait on mouse movement (max 1.5 degrees — subtle)
  const portraitRotateX = useTransform(smoothY, [-0.5, 0.5], [1.5, -1.5]);
  const portraitRotateY = useTransform(smoothX, [-0.5, 0.5], [-1.5, 1.5]);

  // Typography depth separation (moves opposite for depth)
  const textX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  // Name reacts with subtle depth
  const nameX = useTransform(smoothX, [-0.5, 0.5], [4, -4]);
  const nameY = useTransform(smoothY, [-0.5, 0.5], [3, -3]);

  // Smooth scroll parallax
  const portraitScrollY = useTransform(smoothScroll, [0, 1000], [0, -30]);
  const textScrollY = useTransform(smoothScroll, [0, 1000], [0, -80]);

  const opacityFade = useTransform(smoothScroll, [0, 600], [1, 0]);

  // Light sweep animation for name
  const [nameSweepComplete, setNameSweepComplete] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setNameSweepComplete(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100dvh] overflow-hidden bg-[#050505] flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ===== BACKGROUND LAYERS ===== */}

      {/* Subtle grid texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Ambient radial gradient — centered */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(120, 70, 255, 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Subtle top-right warm accent — creates depth */}
      <motion.div
        className="absolute z-0 pointer-events-none"
        style={{
          top: "10%",
          right: "15%",
          width: "50vw",
          height: "50vh",
          background: "radial-gradient(ellipse at center, rgba(167, 139, 250, 0.04) 0%, transparent 70%)",
          x: useTransform(smoothX, [-0.5, 0.5], [20, -20]),
          y: useTransform(smoothY, [-0.5, 0.5], [15, -15]),
        }}
      />

      {/* Bottom-left soft gradient for depth */}
      <motion.div
        className="absolute z-0 pointer-events-none"
        style={{
          bottom: "0%",
          left: "10%",
          width: "40vw",
          height: "40vh",
          background: "radial-gradient(ellipse at center, rgba(100, 50, 255, 0.03) 0%, transparent 70%)",
          x: useTransform(smoothX, [-0.5, 0.5], [-15, 15]),
          y: useTransform(smoothY, [-0.5, 0.5], [-10, 10]),
        }}
      />


      {/* ===== MAIN CONTENT ===== */}
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-20 h-full flex flex-col justify-center">

        {/* Hero Grid — balanced two-column on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 sm:gap-6 lg:gap-12 xl:gap-16 pt-16 pb-6 lg:py-0">

          {/* ===== LEFT: TYPOGRAPHY ===== */}
          <motion.div
            style={{
              x: textX,
              y: useTransform(() => textScrollY.get() + textY.get()),
              opacity: opacityFade,
            }}
            className="relative z-30 flex flex-col justify-center order-2 lg:order-1"
          >
            {/* Status chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-6 lg:mb-8 flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono text-white/80 tracking-wide">Available for internships</span>
              </div>
            </motion.div>

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base md:text-lg font-sans text-muted mb-3 lg:mb-4 text-center lg:text-left"
            >
              Hi, I&apos;m Prabhav.
            </motion.p>

            {/* ===== NAME — Premium Typography ===== */}
            <motion.div
              style={{ x: nameX, y: nameY }}
              className="mb-6 lg:mb-8 text-center lg:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative font-heading font-semibold tracking-[-0.04em] leading-[0.88] text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[5.2vw] xl:text-[4.8vw]"
              >
                {/* Base text — slightly transparent for depth layering */}
                <span className="block relative">
                  {/* Shadow layer — creates 3D depth */}
                  <span
                    className="absolute inset-0 text-transparent select-none pointer-events-none"
                    aria-hidden="true"
                    style={{
                      WebkitTextStroke: "0.5px rgba(167, 139, 250, 0.08)",
                      transform: "translate3d(2px, 3px, 0)",
                    }}
                  >
                    PRABHAV
                    <br />
                    KRISHNA R
                  </span>

                  {/* Main text with subtle gradient */}
                  <span
                    className="relative z-10 bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(175deg, #ffffff 0%, #f0f0f5 40%, #d4d4de 70%, #b8b8c8 100%)",
                    }}
                  >
                    PRABHAV
                    <br />
                    KRISHNA R
                  </span>

                  {/* Animated light sweep overlay */}
                  <motion.span
                    className="absolute inset-0 z-20 bg-clip-text text-transparent select-none pointer-events-none"
                    aria-hidden="true"
                    initial={{ backgroundPosition: "-200% 0" }}
                    animate={{ backgroundPosition: nameSweepComplete ? "300% 0" : "-200% 0" }}
                    transition={{
                      duration: nameSweepComplete ? 6 : 1.8,
                      delay: nameSweepComplete ? 0 : 0.8,
                      ease: "easeInOut",
                      repeat: nameSweepComplete ? Infinity : 0,
                      repeatDelay: nameSweepComplete ? 8 : 0,
                    }}
                    style={{
                      backgroundImage: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.12) 55%, transparent 70%)",
                      backgroundSize: "200% 100%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    PRABHAV
                    <br />
                    KRISHNA R
                  </motion.span>
                </span>
              </motion.h1>
            </motion.div>

            {/* Role line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-3 mb-5 lg:mb-6 justify-center lg:justify-start"
            >
              <div className="h-px w-8 bg-white/20" />
              <span className="text-xs font-mono text-white/50 uppercase tracking-[0.2em]">Software Engineer & Designer</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-sm sm:text-base md:text-lg text-muted/80 font-light leading-relaxed max-w-md mb-8 lg:mb-10 text-center lg:text-left mx-auto lg:mx-0"
            >
              Building modern web applications, intuitive user experiences, and software that solves real problems.
            </motion.p>

            {/* ===== CTA SECTION ===== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              {/* Primary CTA group */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="flex-1 sm:flex-none px-7 py-3.5 rounded-full bg-white text-[#050505] text-sm font-medium hover:bg-white/90 active:scale-[0.97] transition-all duration-200 text-center"
                >
                  View Projects
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowResume(!showResume);
                  }}
                  className="flex-1 sm:flex-none px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-medium hover:bg-white/[0.06] hover:border-white/25 active:scale-[0.97] transition-all duration-200 text-center backdrop-blur-sm"
                  aria-expanded={showResume}
                >
                  {showResume ? "Close Resume" : "Resume"}
                </button>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-5 sm:ml-4">
                <a
                  href="https://github.com/prabhavkrishna17-max"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/prabhav-krishna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* ===== RIGHT: PORTRAIT / RESUME ===== */}
          <motion.div
            style={{
              x: portraitX,
              y: useTransform(() => portraitScrollY.get() + portraitY.get()),
              rotateX: portraitRotateX,
              rotateY: portraitRotateY,
              opacity: opacityFade,
            }}
            className="relative z-10 order-1 lg:order-2 flex items-center justify-center w-full"
          >
            <AnimatePresence mode="wait">
              {!showResume ? (
                <motion.div
                  key="portrait"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-none aspect-[1024/709] lg:aspect-auto lg:h-[70vh]"
                >
                  {/* Spotlight glow behind portrait */}
                  <div
                    className="absolute inset-0 z-0 pointer-events-none scale-110"
                    style={{
                      background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(167, 139, 250, 0.08) 0%, transparent 70%)",
                    }}
                  />

                  {/* Subtle floating platform shadow */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none"
                    style={{
                      width: "70%",
                      height: "8px",
                      background: "radial-gradient(ellipse at center, rgba(167, 139, 250, 0.12) 0%, transparent 70%)",
                      filter: "blur(8px)",
                    }}
                  />

                  {/* Portrait image */}
                  <div className="relative w-full h-full z-10">
                    <Image
                      src="/images/hero/My-photo.webp"
                      alt="Prabhav Krishna R"
                      fill
                      priority
                      fetchPriority="high"
                      quality={90}
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 40vw"
                      className="object-contain object-center"
                      style={{
                        transform: "translate3d(0, 0, 0)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                      }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="resume"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-full max-w-[500px] lg:max-w-none lg:w-[90%] h-[50vh] sm:h-[55vh] lg:h-[70vh] flex items-center justify-center bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent/10 to-transparent opacity-40" />
                  <div className="relative z-10 w-full h-full overflow-hidden flex items-center justify-center p-3 sm:p-6">
                    <ResumePreview />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{ opacity: opacityFade }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-16 z-30 flex flex-col lg:flex-row items-center gap-2 lg:gap-3"
      >
        <motion.div
          animate={{ height: [12, 24, 12] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] bg-white/30 hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-6 bg-gradient-to-b from-white/30 to-transparent block lg:hidden"
        />
        <span className="text-[9px] sm:text-[10px] font-mono text-muted/50 uppercase tracking-[0.15em]">Scroll</span>
      </motion.div>
    </section>
  );
}
