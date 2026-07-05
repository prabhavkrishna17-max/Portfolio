"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

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
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      // eslint-disable-next-line
      setIsTouch(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    setIsVisible(true);

    const handleElementHover = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    const addListeners = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea');
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", handleElementHover);
        el.addEventListener("mouseleave", handleElementLeave);
      });
    };

    addListeners();

    const observer = new MutationObserver(() => {
      addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer Ring: 24px */}
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
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      
      {/* Inner Dot: 4px */}
      <motion.div
        className="fixed top-0 left-0 w-[4px] h-[4px] bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          x: smoothInnerX,
          y: smoothInnerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
