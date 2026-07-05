"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";

const ResumePreview = dynamic(() => import('./ResumePreview'), { ssr: false });

export function Hero() {
  const { scrollY } = useScroll();
  const [showResume, setShowResume] = useState(false);

  // Smooth scroll spring for inertia
  const smoothScroll = useSpring(scrollY, { damping: 60, stiffness: 400, mass: 1 });

  // Mouse tracking with heavily dampened springs for cinematic inertia
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 60, stiffness: 80, mass: 2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle mouse parallax (max 10-15px)
  const portraitX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  
  // Rotate on mouse movement (max 2 degree)
  const portraitRotateX = useTransform(smoothY, [-0.5, 0.5], [2, -2]);
  const portraitRotateY = useTransform(smoothX, [-0.5, 0.5], [-2, 2]);

  // Typography depth separation
  const textX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  // Smooth scroll parallax
  const portraitScrollY = useTransform(smoothScroll, [0, 1000], [0, -30]);
  const textScrollY = useTransform(smoothScroll, [0, 1000], [0, -80]);
  
  const opacityFade = useTransform(smoothScroll, [0, 600], [1, 0]);



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
      id="top"
      className="relative h-[100dvh] overflow-hidden bg-[#050505] perspective-[1200px] flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle grid texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Subtle purple ambient background matching page */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50" 
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(100, 50, 255, 0.05) 0%, transparent 60%)"
        }}
      />

      <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-[1400px] relative z-20 h-full flex flex-col justify-center">
        <div className="flex items-center h-full pt-16 md:pt-0">
          
          {/* Typography — Left Side (55%) */}
          <motion.div
            style={{
              x: textX,
              y: useTransform(() => textScrollY.get() + textY.get()),
              opacity: opacityFade,
            }}
            className="relative z-30 flex flex-col justify-center w-full lg:w-[55%]"
          >
            {/* Status chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-white/90 tracking-wide">Available for internships</span>
              </div>
            </motion.div>

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-lg md:text-xl font-sans text-muted mb-4"
            >
              Hi, I&apos;m Prabhav.
            </motion.p>

            {/* Name — Massive Display */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[14vw] lg:text-[7.5vw] font-heading font-medium tracking-tighter text-white leading-[0.9] mb-8"
            >
              PRABHAV
              <br />
              KRISHNA R
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-lg md:text-xl text-muted/90 font-light leading-relaxed max-w-lg mb-12"
            >
              Building modern web applications, intuitive user experiences, and software that solves real problems.
            </motion.p>

            {/* CTA panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="flex items-center gap-4 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <a
                  href="#projects"
                  className="px-8 py-3.5 rounded-xl bg-white text-[#050505] text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  View Projects
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowResume(!showResume);
                  }}
                  className="px-8 py-3.5 rounded-xl bg-transparent text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  {showResume ? "Close Resume" : "Resume"}
                </button>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-6 text-sm font-medium text-muted/80 ml-2">
                <a href="https://github.com/prabhavkrishna" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/prabhav-krishna" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side Absolute (Portrait / Resume Toggle) - 45% width */}
      <motion.div
        style={{
          x: portraitX,
          y: useTransform(() => portraitScrollY.get() + portraitY.get()),
          rotateX: portraitRotateX,
          rotateY: portraitRotateY,
          opacity: opacityFade,
        }}
        className="absolute right-0 bottom-[-5%] z-10 w-[90vw] lg:w-[45vw] h-[95vh] hidden lg:flex items-end justify-end pointer-events-none"
      >
        <AnimatePresence mode="wait">
          {!showResume ? (
            <motion.div
              key="portrait"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full h-full flex items-end justify-end"
            >
              {/* Very subtle dark-purple ambient gradient behind the portrait (5–8% opacity) */}
              <div 
                className="absolute inset-0 z-0 pointer-events-none" 
                style={{
                  background: "radial-gradient(circle at 65% 55%, rgba(100, 50, 255, 0.08) 0%, transparent 60%)"
                }}
              />

              <div className="relative w-full h-full flex items-end justify-end z-10">
                <Image
                  src="/assets/My-photo.jpeg"
                  alt="Prabhav Krishna R"
                  fill
                  priority
                  fetchPriority="high"
                  quality={100}
                  sizes="(max-width: 1024px) 0vw, 45vw"
                  className="object-contain object-bottom object-right"
                  style={{
                    imageRendering: "auto",
                    transform: "translate3d(0, 0, 0)",
                    transformOrigin: "center bottom",
                    // Perfectly feathered radial mask to dissolve boundary entirely
                    WebkitMaskImage: "radial-gradient(circle at 65% 55%, black 35%, transparent 75%)",
                    maskImage: "radial-gradient(circle at 65% 55%, black 35%, transparent 75%)",
                  }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="resume"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-[80%] h-[80%] mr-[10%] mb-[10%] flex items-center justify-center bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
            >
              {/* Premium gradient glow behind the resume inside the glass */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50" />
              
              <div className="relative z-10 w-full h-full overflow-hidden flex items-center justify-center p-6">
                <ResumePreview />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{ opacity: opacityFade }}
        className="absolute bottom-8 left-6 md:left-8 lg:left-16 z-30 flex items-center gap-3"
      >
        <motion.div
          animate={{ height: [12, 24, 12] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] bg-white/30"
        />
        <span className="text-[10px] font-mono text-muted/50 uppercase tracking-[0.15em]">Scroll</span>
      </motion.div>
    </section>
  );
}
