import { Variants } from "framer-motion";

// Cinematic easing (Denis Villeneuve inspired - very smooth, deliberate and responsive)
export const CINEMATIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// 1. Text & Element fades (Responsive, hardware-accelerated, crisp)
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: CINEMATIC_EASE } 
  },
};

// 2. Staggered containers for lists/cards
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

// 3. Section Transitions (Smooth entrance, GPU friendly without blur lag)
export const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: CINEMATIC_EASE } 
  },
};

// 4. Subtle scale for images or cards
export const subtleScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: CINEMATIC_EASE } 
  },
};
