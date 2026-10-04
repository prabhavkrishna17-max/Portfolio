"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { useLenis } from 'lenis/react';
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  return window.scrollY > 20;
}

function getServerScrollSnapshot() {
  return false;
}

export function Navbar() {
  const scrolled = useSyncExternalStore(subscribeScroll, getScrollSnapshot, getServerScrollSnapshot);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 20) {
      if (!mobileMenuOpen && latest > previous && latest > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen, lenis]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    const sections = navLinks.map(link => document.querySelector(link.href)).filter(Boolean);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -150 : 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center py-4 pointer-events-none"
    >
      <div 
        className={cn(
          "pointer-events-auto flex items-center justify-between rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled 
            ? "w-[94%] sm:w-[92%] md:w-max liquid-nav px-4 sm:px-6 py-2 sm:py-2.5" 
            : "w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-3.5 sm:py-5 bg-transparent border border-transparent"
        )}
      >
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); if(lenis) lenis.scrollTo('#top'); }} 
          className="text-base sm:text-xl font-heading font-semibold tracking-tight text-white mr-4 sm:mr-6 md:mr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-md transition-opacity hover:opacity-90"
        >
          Prabhav<span className="text-purple-400 font-semibold">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isActive = active === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (lenis) lenis.scrollTo(link.href);
                }}
                className={cn(
                  "relative px-4 sm:px-5 py-2 rounded-full text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                  isActive 
                    ? "text-white" 
                    : scrolled 
                      ? "text-zinc-200 hover:text-white" 
                      : "text-zinc-300 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full -z-10 bg-white/[0.08] border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (lenis) lenis.scrollTo('#contact');
            }}
            className="ml-3 px-5 py-2 rounded-full text-sm font-medium border border-white/20 bg-white/[0.08] hover:bg-white/[0.16] hover:border-white/30 text-white backdrop-blur-md glass-hover transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 cursor-pointer"
          >
            Let&apos;s Talk
          </a>

          {/* Desktop Command Palette Shortcut Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="ml-2.5 px-3 py-1.5 rounded-full text-xs font-sans text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.09] hover:border-purple-400/40 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            aria-label="Open command palette"
          >
            <Search size={13} className="text-accent" />
            <span className="hidden lg:inline text-white/60">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] font-mono text-white/60 border border-white/[0.08]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Mobile Actions: Search + Menu Toggle */}
        <div className="flex items-center gap-1 sm:gap-2 md:hidden">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="p-2 sm:p-2.5 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-full transition-colors pointer-events-auto"
            aria-label="Open search palette"
          >
            <Search size={18} />
          </button>
          <button
            className="p-2 sm:p-2.5 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-full transition-colors pointer-events-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[-1] bg-[#060608]/96 backdrop-blur-2xl md:hidden pointer-events-auto flex flex-col pt-[calc(5rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))] px-6 h-[100dvh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2 my-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { delay: 0 } }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (lenis) lenis.scrollTo(link.href);
                  }}
                  className="px-3 py-3 sm:py-4 text-2xl sm:text-3xl font-medium tracking-tight text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-xl"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { delay: 0 } }}
              transition={{ delay: navLinks.length * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-auto pt-6 w-full"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  if (lenis) lenis.scrollTo('#contact');
                }}
                className="w-full px-6 py-3.5 sm:py-4 rounded-full text-base font-medium border border-white/20 bg-white/[0.08] hover:bg-white/[0.14] text-white flex items-center justify-center glass-hover transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                Let&apos;s Talk
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
