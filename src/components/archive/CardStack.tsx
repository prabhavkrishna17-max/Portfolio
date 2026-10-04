"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { CINEMATIC_EASE } from "@/lib/animations";
import { X } from "lucide-react";

export type Card = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type CardStackVariant = "landscape" | "document";

interface CardStackProps {
  cards: Card[];
  variant?: CardStackVariant;
}

export function CardStack({ cards, variant = "landscape" }: CardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLDivElement>(null);

  const isDocument = variant === "document";
  const aspectClass = isDocument ? "aspect-[3/4]" : "aspect-[16/10]";
  const mobileAspectClass = isDocument ? "aspect-[3/4]" : "aspect-[4/5] sm:aspect-[16/10]";

  // --- Micro-Parallax (desktop only, active card only) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [1.5, -1.5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-1.5, 1.5]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [reducedMotion, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // --- Keyboard Navigation ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % cards.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        setLightboxOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, cards.length]);

  // --- Scroll Lock ---
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  // --- Card positioning math ---
  const getCardStyle = (offset: number) => {
    // Non-linear stacking: tighter gaps, subtle rotation like real photos
    if (offset === 0) return { scale: 1, y: 0, z: 0, opacity: 1, rotate: 0 };
    if (offset === 1) return { scale: 0.96, y: -14, z: -30, opacity: 0.7, rotate: 1.2 };
    if (offset === 2) return { scale: 0.92, y: -26, z: -60, opacity: 0.4, rotate: -0.8 };
    // Preview card (wraps from end)
    return { scale: 0.88, y: 30, z: -90, opacity: 0, rotate: 0 };
  };

  return (
    <>
      <div 
        className="w-full relative flex items-center justify-center"
        style={{ height: isDocument ? "65vh" : "55vh", perspective: "1200px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Desktop: Physical Stack */}
        <div className="hidden md:flex relative w-full h-full items-center justify-center">
          <AnimatePresence mode="sync">
            {cards.map((card, idx) => {
              const offset = (idx - activeIndex + cards.length) % cards.length;
              const isVisible = offset <= 2 || offset === cards.length - 1;
              if (!isVisible) return null;

              const cardStyle = getCardStyle(offset);
              const zIndex = cards.length - offset;

              return (
                <motion.div
                  key={card.id}
                  layoutId={`card-${card.id}`}
                  ref={offset === 0 ? triggerRef : undefined}
                  onClick={() => {
                    if (offset === 0) setLightboxOpen(true);
                    else setActiveIndex(idx);
                  }}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{
                    opacity: cardStyle.opacity,
                    scale: cardStyle.scale,
                    y: cardStyle.y,
                    z: cardStyle.z,
                    rotate: cardStyle.rotate,
                    rotateX: offset === 0 && !reducedMotion ? rotateX.get() : 0,
                    rotateY: offset === 0 && !reducedMotion ? rotateY.get() : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(320px,55%,680px)] ${aspectClass} rounded-2xl cursor-pointer group border border-white/[0.04] bg-[#0a0a0c] p-1`}
                  role="button"
                  tabIndex={offset === 0 ? 0 : -1}
                  aria-label={`View ${card.title}`}
                >
                  {/* Depth shadow — deepens per layer */}
                  <div 
                    className="absolute inset-0 rounded-2xl -z-10"
                    style={{
                      boxShadow: offset === 0 
                        ? "0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)"
                        : `0 ${4 + offset * 4}px ${20 + offset * 12}px rgba(0,0,0,${0.3 + offset * 0.15})`,
                    }}
                  />
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 1200px) 60vw, 40vw"
                      className={`${isDocument ? "object-contain bg-white/[0.02]" : "object-cover"} transition-opacity duration-700 ${offset === 0 ? "opacity-90 group-hover:opacity-100" : "opacity-50"}`}
                      priority={offset <= 1}
                    />
                    
                    {/* Caption: only visible on active card */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 lg:p-8 pointer-events-none transition-opacity duration-500 ${offset === 0 ? "opacity-100" : "opacity-0"}`}
                    >
                      <h3 className="text-base lg:text-lg font-heading font-medium text-white/90">{card.title}</h3>
                      <p className="text-xs lg:text-sm text-white/40 font-sans mt-1 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Mobile: Calm swipe carousel */}
        <div className="md:hidden w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 gap-4 items-center">
          {cards.map((card, idx) => (
            <div
              key={`mobile-${card.id}`}
              className={`relative shrink-0 snap-center w-[80vw] ${mobileAspectClass} rounded-2xl border border-white/[0.04] bg-[#0a0a0c] p-1 cursor-pointer`}
              onClick={() => {
                setActiveIndex(idx);
                setLightboxOpen(true);
              }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="80vw"
                  className={`${isDocument ? "object-contain bg-white/[0.02]" : "object-cover"} opacity-90`}
                  priority={idx <= 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5 pointer-events-none">
                  <h3 className="text-base font-heading font-medium text-white/90">{card.title}</h3>
                  <p className="text-xs text-white/40 font-sans mt-1">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.3 } }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-lg p-4 md:p-12"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Ambient glow — consistent purple language */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.04)_0%,transparent_50%)]" />

            {/* Close button */}
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ delay: 0.6 }}
              className="absolute top-6 right-6 p-2.5 rounded-full text-white/40 hover:text-white/80 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white/10"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              aria-label="Close modal"
              autoFocus
            >
              <X size={20} />
            </motion.button>

            {/* Image — morphs from card via layoutId */}
            <motion.div
              layoutId={`card-${cards[activeIndex].id}`}
              transition={{ duration: 0.7, ease: CINEMATIC_EASE }}
              className={`relative w-full ${isDocument ? "max-w-lg" : "max-w-6xl"} ${isDocument ? "max-h-[85vh]" : "max-h-[80vh]"} ${isDocument ? "aspect-[3/4]" : "aspect-[16/10]"} rounded-xl overflow-hidden cursor-default bg-[#030305] border border-white/[0.03]`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={cards[activeIndex].image}
                alt={cards[activeIndex].title}
                fill
                sizes="100vw"
                className={isDocument ? "object-contain" : "object-contain"}
                priority
              />
            </motion.div>
            
            {/* Caption — fades in last, fades out first */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4, transition: { duration: 0.15 } }}
              transition={{ duration: 0.6, delay: 0.5, ease: CINEMATIC_EASE }}
              className="mt-6 md:mt-8 text-center pointer-events-none"
            >
              <h2 className="text-lg md:text-2xl font-heading font-medium text-white/90">
                {cards[activeIndex].title}
              </h2>
              <p className="text-xs md:text-sm text-white/40 mt-1.5 max-w-md mx-auto">
                {cards[activeIndex].description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
