"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from 'lenis/react';
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setScrolled(true);
      if (latest > previous && latest > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      setScrolled(false);
      setHidden(false);
    }
  });

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
          "pointer-events-auto flex items-center justify-between transition-all duration-700",
          scrolled 
            ? "w-[92%] md:w-max liquid-nav rounded-full px-6 py-2.5" 
            : "w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-5 bg-transparent"
        )}
      >
        <a href="#top" onClick={(e) => { e.preventDefault(); if(lenis) lenis.scrollTo('#top'); }} className="text-base font-heading font-medium tracking-tight text-white mr-8">
          Prabhav<span className="text-muted/50">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
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
                  "relative px-4 py-2 rounded-full text-sm transition-colors duration-300",
                  isActive ? "text-white" : "text-muted hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full -z-10 bg-white/[0.06]"
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
            className="ml-3 px-4 py-1.5 rounded-full text-[13px] font-medium border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 transition-colors duration-300 shadow-sm"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white pointer-events-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full left-4 right-4 mt-2 md:hidden pointer-events-auto"
          >
            <div className="glass-elevated flex flex-col p-3 rounded-2xl">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (lenis) lenis.scrollTo(link.href);
                  }}
                  className="px-4 py-3 rounded-xl text-sm text-foreground hover:bg-white/[0.04] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
