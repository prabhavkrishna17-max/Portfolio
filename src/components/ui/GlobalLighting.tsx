"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function GlobalLighting() {
  const { scrollY } = useScroll();
  
  // As the user scrolls down, the ambient light slowly shifts downwards
  const yLight1 = useTransform(scrollY, [0, 5000], ["-10%", "100%"]);
  const yLight2 = useTransform(scrollY, [0, 5000], ["30%", "120%"]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030305]">
      {/* Primary ambient base */}
      <motion.div 
        style={{ top: yLight1 }}
        className="absolute left-[-20%] w-[140%] h-[100vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015),transparent_60%)] blur-[120px] transform-gpu will-change-transform"
      />
      {/* Secondary accent (cool blue/lavender) */}
      <motion.div 
        style={{ top: yLight2 }}
        className="absolute right-[-10%] w-[120%] h-[100vh] bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.015),transparent_60%)] blur-[120px] transform-gpu will-change-transform mix-blend-screen"
      />
    </div>
  );
}
