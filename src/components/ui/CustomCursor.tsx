"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const [isHoveringText, setIsHoveringText] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring uses a softer spring
  const springConfigOuter = { damping: 30, stiffness: 400, mass: 0.5 };
  const smoothOuterX = useSpring(cursorX, springConfigOuter);
  const smoothOuterY = useSpring(cursorY, springConfigOuter);
  
  // Inner dot uses a very tight spring (almost instant)
  const springConfigInner = { damping: 40, stiffness: 1000, mass: 0.1 };
  const smoothInnerX = useSpring(cursorX, springConfigInner);
  const smoothInnerY = useSpring(cursorY, springConfigInner);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window || window.innerWidth < 1024) {
      queueMicrotask(() => setIsTouch(true));
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target && target.closest) {
        const isClickable = !!target.closest('a, button, input, textarea');
        setIsHovering(isClickable);

        // EXPLICIT ALLOW-LIST: Only activate optical inversion on elements with the .lens-target class
        const isText = !!target.closest('.lens-target');
        
        // Show lens if hovering text, but standard clickable cursor takes precedence if it's a link/button
        setIsHoveringText(isText && !isClickable);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    queueMicrotask(() => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* 1. Normal Outer Ring (Hidden when hovering text) */}
      <motion.div
        className="fixed top-0 left-0 w-[24px] h-[24px] border-[0.5px] border-white/20 rounded-full pointer-events-none z-[9998]"
        style={{
          x: smoothOuterX,
          y: smoothOuterY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          opacity: (isHovering || isHoveringText) ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      
      {/* 2. Normal Inner Dot (Hidden when hovering text) */}
      <motion.div
        className="fixed top-0 left-0 w-[4px] h-[4px] bg-white rounded-full pointer-events-none z-[10000]"
        style={{
          x: smoothInnerX,
          y: smoothInnerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHoveringText ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 3. The Optical Lens (Only visible when hovering text) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-white mix-blend-difference hidden md:block"
        style={{
          width: 80,
          height: 80,
          x: smoothOuterX,
          y: smoothOuterY,
          translateX: "-50%",
          translateY: "-50%",
          maskImage: "radial-gradient(circle, black 45%, rgba(0,0,0,0.15) 80%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, black 45%, rgba(0,0,0,0.15) 80%, transparent 100%)",
        }}
        animate={{
          scale: isHoveringText ? 1 : 0.2,
          opacity: isHoveringText ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </>
  );
}
