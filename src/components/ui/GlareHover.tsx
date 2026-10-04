"use client";

import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface GlareHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  ambientGlow?: boolean;
  elevation?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function GlareHover({
  children,
  width,
  height,
  background,
  borderRadius,
  borderColor,
  glareColor = "#ffffff",
  glareOpacity = 0.2,
  glareAngle = -30,
  glareSize = 250,
  transitionDuration = 750,
  playOnce = false,
  ambientGlow = true,
  elevation = true,
  className = "",
  style = {},
  onMouseEnter,
  onMouseLeave,
  ...props
}: GlareHoverProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute glare rgba color
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const animateIn = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
      }

      const el = overlayRef.current;
      if (!el) return;

      el.style.transition = "none";
      el.style.backgroundPosition = "-100% -100%, 0 0";
      // Force repaint to reset position instantly before transitioning
      void el.offsetHeight;
      el.style.transition = `background-position ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      el.style.backgroundPosition = "100% 100%, 0 0";
    },
    [transitionDuration, onMouseEnter]
  );

  const animateOut = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
      }

      const el = overlayRef.current;
      if (!el) return;

      if (playOnce) {
        el.style.transition = "none";
        el.style.backgroundPosition = "-100% -100%, 0 0";
      } else {
        el.style.transition = `background-position ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
        el.style.backgroundPosition = "-100% -100%, 0 0";
      }
    },
    [playOnce, transitionDuration, onMouseLeave]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        elevation && "hover:-translate-y-0.5",
        ambientGlow && "hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.5),0_0_30px_-5px_rgba(167,139,250,0.1)]",
        className
      )}
      style={{
        width,
        height,
        background,
        borderRadius,
        borderColor,
        ...style,
      }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
      {...props}
    >
      {/* Glare Reflection Layer */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 will-change-[background-position] hidden md:block"
        style={{
          background: `linear-gradient(${glareAngle}deg,
            hsla(0,0%,0%,0) 50%,
            ${rgba} 65%,
            rgba(167, 139, 250, ${glareOpacity * 0.7}) 72%,
            hsla(0,0%,0%,0) 85%)`,
          backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "-100% -100%, 0 0",
        }}
      />
      {children}
    </div>
  );
}

export default GlareHover;
