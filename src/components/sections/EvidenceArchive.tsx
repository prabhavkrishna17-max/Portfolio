"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { CINEMATIC_EASE, fadeUpVariant, sectionVariant, staggerContainer } from "@/lib/animations";
import { useLenis } from 'lenis/react';

type ArchiveItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  size: "large" | "medium" | "small";
  type: "Primary Artifact" | "Supporting Artifact" | "Validation";
  isPortrait?: boolean;
};

// Organized by narrative hierarchy: Primary -> Supporting -> Validation
const archiveItems: ArchiveItem[] = [
  {
    id: "artist-color-lab",
    title: "Artist Color Lab",
    description: "Digital color theory tool bridging physical mediums.",
    image: "/images/projects/Artist_Color_Lab.webp",
    size: "large",
    type: "Primary Artifact",
  },
  {
    id: "mixer",
    title: "Studio Mixer",
    description: "Precision color blending interface.",
    image: "/images/projects/Artist_Color_Lab_Mixer.webp",
    size: "large",
    type: "Primary Artifact",
  },
  {
    id: "office",
    title: "Office Environment",
    description: "Professional software engineering workspace.",
    image: "/images/internships/office-photo.webp",
    size: "medium",
    type: "Supporting Artifact",
  },
  {
    id: "circuit",
    title: "Circuit Prototype",
    description: "Hardware integration and physical computing.",
    image: "/images/internships/Circuit.webp",
    size: "medium",
    type: "Supporting Artifact",
  },
  {
    id: "internship-cert",
    title: "Internship Certificate",
    description: "Software engineering completion at ARK Infosolutions.",
    image: "/images/internships/ARK_Internship.webp",
    size: "medium",
    type: "Supporting Artifact",
    isPortrait: true,
  },
  {
    id: "dt",
    title: "Design Thinking",
    description: "Enterprise practitioner certification.",
    image: "/images/certificates/DT.webp",
    size: "small",
    type: "Validation",
    isPortrait: true,
  },
  {
    id: "python",
    title: "Scaler Python",
    description: "Advanced programming certification.",
    image: "/images/certificates/Python_Scalar.webp",
    size: "small",
    type: "Validation",
    isPortrait: true,
  },
  {
    id: "oblivion",
    title: "Oblivion '25",
    description: "Event branding and hackathon visual identity.",
    image: "/images/projects/Oblivion25.webp",
    size: "small",
    type: "Validation",
  },
  {
    id: "offer",
    title: "Offer Letter",
    description: "Official software development internship offer.",
    image: "/images/internships/ARK_Offer_Letter.webp",
    size: "small",
    type: "Validation",
    isPortrait: true,
  }
];

const getSizeClasses = (size: "large" | "medium" | "small", isPortrait?: boolean) => {
  if (size === "large") return "w-[70vw] md:w-[45vw] lg:w-[40vw] max-w-[800px] aspect-[16/10]";
  if (size === "medium") return "w-[60vw] md:w-[35vw] lg:w-[30vw] max-w-[600px] aspect-[16/10]";
  return isPortrait 
    ? "w-[45vw] md:w-[25vw] lg:w-[20vw] max-w-[400px] aspect-[3/4]"
    : "w-[55vw] md:w-[30vw] lg:w-[25vw] max-w-[450px] aspect-[16/10]";
};

// Dynamic spacing array based on easing, creating compression at the edges.
// Increased offsets to expose 65-75% of side cards.
const X_OFFSETS = [0, 400, 750, 1050, 1300, 1500, 1650, 1750, 1820, 1870];

export function EvidenceArchive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll lock for cinematic exhibition view
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [lightboxOpen, lenis]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        return;
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => Math.min(prev + 1, archiveItems.length - 1));
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        setLightboxOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const activeItem = archiveItems[activeIndex];

  return (
    <section id="evidence" className="py-24 md:py-32 relative z-10 bg-[#030305] text-white overflow-hidden">
      
      {/* 1. Introduction */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 relative z-20 mb-16 md:mb-24"
      >
        <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center">
          <h2 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-3">
            <span className="w-1 h-1 rounded-full bg-white/40" />
            Evidence Archive
            <span className="w-1 h-1 rounded-full bg-white/40" />
          </h2>
          <p className="text-sm md:text-base text-white/50 font-light leading-relaxed max-w-2xl tracking-wide">
            Beyond the projects themselves, these artifacts capture the process, collaboration, experimentation, and recognition that shaped my engineering journey.
          </p>
        </motion.div>
      </motion.div>

      {/* 2. Curved Exhibition */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] overflow-hidden">
        
        {/* Exhibition Container with profound depth */}
        <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center perspective-[1800px] transform-style-3d">
          
          {archiveItems.map((item, index) => {
            const distance = index - activeIndex;
            const absDistance = Math.abs(distance);
            const isCenter = distance === 0;
            
            // Physics Calculations
            // Scale offsets down on mobile so adjacent cards stay on-screen
            const mobileScale = isMobile ? 0.45 : 1;
            const baseOffset = (X_OFFSETS[absDistance] || 1000) * mobileScale;
            // Additional offset for large cards to preserve negative space
            const sizeOffset = isCenter ? 0 : (archiveItems[activeIndex].size === "large" ? (60 * mobileScale) : 0);
            const targetX = Math.sign(distance) * (baseOffset + sizeOffset);
            
            // Y-Offset (Tilt down)
            const targetY = isCenter ? 0 : 15 + (absDistance * 5);
            
            // 2D Rotation (Tilt away from center)
            const targetRotate = isCenter ? 0 : Math.sign(distance) * Math.min(4 + (absDistance * 0.5), 6);
            
            // Scale
            const targetScale = isCenter ? 1 : Math.max(0.92, 0.98 - (absDistance * 0.02));
            
            // Z-Index
            const zIndex = 100 - absDistance;
            
            // Edge Card Fade: smoothly dissolve into darkness rather than clipping
            const maxVisibleDistance = 3;
            let opacity = 1;
            if (lightboxOpen) {
              opacity = isCenter ? 0 : 0.1;
            } else {
              if (absDistance > maxVisibleDistance) {
                // Decay opacity by 40% for each step beyond max distance
                opacity = Math.max(0, 0.9 - (absDistance - maxVisibleDistance) * 0.4);
              } else {
                opacity = isCenter ? 1 : 0.9;
              }
            }

            return (
              <motion.div
                key={item.id}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group origin-bottom flex flex-col items-center justify-center`}
                style={{ zIndex }}
                initial={false}
                animate={{
                  x: `calc(-50% + ${targetX}px)`,
                  y: `calc(-50% + ${targetY}px)`,
                  // Acrylic Museum Depth
                  z: isCenter ? 30 : 0,
                  rotateY: isCenter ? 0 : Math.sign(distance) * -4, // Inward curve
                  rotateZ: isCenter ? 0 : Math.sign(distance) * 2,   // Tilt
                  scale: targetScale,
                  opacity: opacity,
                  filter: isCenter 
                    ? "brightness(1) saturate(1)" 
                    : "brightness(0.85) saturate(0.9)",
                }}
                whileHover={!isCenter && !lightboxOpen ? {
                  y: `calc(-50% + ${targetY - 5}px)`,
                  filter: "brightness(1) saturate(1)",
                  opacity: 1,
                  transition: { duration: 0.6, ease: "easeOut" }
                } : undefined}
                transition={{
                  // Apple-level calm, highly damped, prolonged heavy slide
                  duration: 1.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => {
                  if (lightboxOpen) return;
                  if (isCenter) {
                    setLightboxOpen(true);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              >
                {/* Center Ambient Motion Wrapper */}
                <motion.div 
                  className="relative flex flex-col items-center"
                  animate={isCenter && !lightboxOpen ? { y: [-2, 2, -2] } : { y: 0 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GlowCard
                    variant="archive"
                    interactive={!isCenter && !lightboxOpen}
                    active={isCenter && !lightboxOpen}
                    className={`w-full h-full ${getSizeClasses(item.size, item.isPortrait)}`}
                  >
                    <motion.div layoutId={`exhibit-image-${item.id}`} className="absolute inset-0 w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={`object-cover ${item.isPortrait ? "object-contain p-2" : ""}`}
                        sizes="(max-width: 768px) 50vw, 33vw"
                        quality={90}
                        priority={isCenter}
                      />
                    </motion.div>
                  </GlowCard>
                    
                    {/* Expand overlay hint on center card */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 text-white shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-500">
                          <Maximize2 size={18} strokeWidth={1.5} />
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Exhibit Label */}
                  <motion.div 
                    animate={{ opacity: isCenter && !lightboxOpen ? 1 : 0, y: isCenter && !lightboxOpen ? 0 : -10 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="absolute -bottom-16 w-max text-center pointer-events-none"
                  >
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-1">{item.type}</p>
                    <h3 className="text-sm md:text-base font-medium tracking-wide text-white/90">{item.title}</h3>
                  </motion.div>
                </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Cinematic Lightbox */}
      <AnimatePresence>
        {lightboxOpen && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: CINEMATIC_EASE } }}
            transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030305]/90 backdrop-blur-sm"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button */}
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-8 right-8 z-50 p-4 text-white/40 hover:text-white transition-colors group"
              aria-label="Close exhibition view"
            >
              <X size={24} className="font-light group-hover:rotate-90 transition-transform duration-500" />
            </motion.button>

            {/* Artwork */}
            <motion.div
              layoutId={`exhibit-image-${activeItem.id}`}
              className="relative w-full max-w-[90vw] h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                quality={100}
              />
            </motion.div>
            
            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, delay: 0.5, ease: CINEMATIC_EASE }}
              className="absolute bottom-12 left-0 right-0 text-center pointer-events-none px-6"
            >
              <h2 className="text-xl md:text-2xl font-heading font-medium text-white/90">
                {activeItem.title}
              </h2>
              <p className="text-sm md:text-base text-white/40 font-light mt-2 max-w-lg mx-auto tracking-wide">
                {activeItem.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
