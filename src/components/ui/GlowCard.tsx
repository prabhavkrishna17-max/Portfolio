"use client";

import React, { MouseEvent, useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const glowTheme = {
  borderIntensity: 1.2,
  spotlightRadius: 400,
  shadow: 0.18,
};

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "project" | "skills" | "contact" | "archive" | "default";
  intensity?: "low" | "medium" | "high";
  interactive?: boolean;
  active?: boolean;
  style?: React.CSSProperties;
  layoutId?: string;
  onClick?: () => void;
}

export function GlowCard({
  children,
  className = "",
  variant = "default", // Can be used to pass variant-specific classes if needed
  intensity = "medium",
  interactive = false,
  active = false,
  style = {},
  layoutId,
  onClick,
}: GlowCardProps) {
  
  const intensityMap = {
    low: 0.5,
    medium: 1,
    high: 1.5,
  };
  
  const mult = intensityMap[intensity];
  const radius = glowTheme.spotlightRadius * mult;
  const borderOpacity = glowTheme.borderIntensity * mult;
  
  // Base glass style: adaptive blur (desktop vs mobile)
  const glassClasses = "bg-[#060608]/70 backdrop-blur-[20px] md:backdrop-blur-[28px]";
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const { currentTarget, clientX, clientY } = e;
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    if (!interactive) return;
    const el = glareRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.backgroundPosition = "-120% -120%, 0 0";
    void el.offsetHeight;
    el.style.transition = "background-position 750ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.backgroundPosition = "120% 120%, 0 0";
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    if (!interactive) return;
    const el = glareRef.current;
    if (!el) return;
    el.style.transition = "background-position 750ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.backgroundPosition = "-120% -120%, 0 0";
  }, [interactive]);
  
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl overflow-hidden ${glassClasses} glow-variant-${variant} ${className} transform-gpu transition-colors duration-500`}
      style={{ ...style, willChange: "transform, box-shadow" }}
      whileHover={interactive && !active ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      initial="idle"
      animate={active ? "active" : "idle"}
      variants={{
        idle: {
          y: 0,
          scale: 1,
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.08),
            inset 0 -1px 1px rgba(0,0,0,0.3),
            inset 0 0 0 1px rgba(255,255,255,0.02),
            0 8px 32px 0 rgba(0,0,0,0.2)
          `,
        },
        hover: {
          y: -2,
          scale: 1,
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.18),
            inset 0 -1px 1px rgba(0,0,0,0.4),
            inset 0 0 0 1px rgba(255,255,255,0.08),
            0 24px 64px -12px rgba(0,0,0,0.5),
            0 0 35px -5px rgba(167,139,250,0.08)
          `,
        },
        active: {
          y: 0,
          scale: 1,
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.18),
            inset 0 -1px 1px rgba(0,0,0,0.4),
            inset 0 0 0 1px rgba(255,255,255,0.1),
            0 24px 64px -12px rgba(0,0,0,0.5),
            0 0 45px -5px rgba(167,139,250,0.12)
          `,
        },
        tap: {
          y: 0,
          scale: 0.98,
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.05),
            inset 0 -1px 1px rgba(0,0,0,0.2),
            inset 0 0 0 1px rgba(255,255,255,0.02),
            0 4px 16px 0 rgba(0,0,0,0.2)
          `,
        }
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 1. Dynamic Cursor Border Glow (XOR Masked) - The traveling light */}
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit] pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,${borderOpacity}), transparent 100%)`,
          padding: "1px", 
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      >
        <div className="w-full h-full bg-transparent rounded-[inherit]" />
      </motion.div>

      {/* 2. Micro-Noise Texture Overlay (Apple Vision Pro material realism) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-[0.03] rounded-[inherit] hidden md:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Dynamic Surface Glow (Subtle internal illumination tracking) */}
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit] pointer-events-none mix-blend-screen opacity-70"
        style={{
          background: useMotionTemplate`radial-gradient(${radius * 0.8}px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,${borderOpacity * 0.2}), transparent 100%)`,
        }}
      />

      {/* 4. Optical Glass Reflection Sheen (GlareHover) */}
      {interactive && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] will-change-[background-position] hidden md:block"
          style={{
            background: `linear-gradient(-30deg,
              transparent 48%,
              rgba(255, 255, 255, 0.12) 60%,
              rgba(167, 139, 250, 0.10) 68%,
              transparent 82%)`,
            backgroundSize: "280% 280%, 100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "-120% -120%, 0 0",
          }}
        />
      )}

      {/* 5. Subtle Glass Translucency Hover Sheen */}
      {interactive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-white/[0.015] opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-500"
        />
      )}

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
