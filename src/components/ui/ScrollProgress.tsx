"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for an organic, responsive liquid feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[110] pointer-events-none bg-transparent">
      {/* Subtle track background */}
      <div className="absolute inset-0 bg-white/[0.04]" />
      
      {/* Active progress indicator with accent glow */}
      <motion.div
        className="h-full bg-gradient-to-r from-accent/90 via-purple-400 to-accent-light origin-left shadow-[0_0_10px_rgba(167,139,250,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
}

export default ScrollProgress;
