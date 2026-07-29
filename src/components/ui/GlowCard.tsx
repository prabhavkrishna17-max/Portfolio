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

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const { currentTarget, clientX, clientY } = e;
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY]
  );
  
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`relative rounded-xl overflow-hidden ${glassClasses} glow-variant-${variant} ${className} transform-gpu`}
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
            inset 0 1px 1px rgba(255,255,255,0.15),
            inset 0 -1px 1px rgba(0,0,0,0.4),
            inset 0 0 0 1px rgba(255,255,255,0.06),
            0 24px 64px 0 rgba(0,0,0,0.4),
            0 0 40px rgba(255,255,255,0.02)
          `,
        },
        active: {
          y: 0,
          scale: 1,
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.15),
            inset 0 -1px 1px rgba(0,0,0,0.4),
            inset 0 0 0 1px rgba(255,255,255,0.08),
            0 24px 64px 0 rgba(0,0,0,0.5),
            0 0 60px rgba(255,255,255,0.04)
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

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
