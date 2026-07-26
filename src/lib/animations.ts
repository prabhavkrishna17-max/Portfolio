import { Variants } from "framer-motion";

// Cinematic easing (Denis Villeneuve inspired - very slow, deliberate)
export const CINEMATIC_EASE: [number, number, number, number] = [0.2, 0.9, 0.1, 1];

// 1. Text fades (Quiet, intentional)
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    willChange: "opacity, filter, transform",
    transition: { duration: 1.5, ease: CINEMATIC_EASE } 
  },
};

// 2. Staggered containers for lists/cards
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// 3. Section Transitions (Blur boundaries, slow reveal)
export const sectionVariant: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    y: 0,
    willChange: "opacity, filter, transform",
    transition: { duration: 2, ease: CINEMATIC_EASE } 
  },
};

// 4. Subtle scale for images or cards
export const subtleScale: Variants = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    willChange: "opacity, filter, transform",
    transition: { duration: 2, ease: CINEMATIC_EASE } 
  },
};
