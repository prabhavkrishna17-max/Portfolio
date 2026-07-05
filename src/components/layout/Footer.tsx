"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 py-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <span className="text-xl font-heading font-bold tracking-tighter">
            P<span className="text-accent">.</span>K
          </span>
          <span className="text-muted/50 text-sm">|</span>
          <p className="text-muted text-sm">
            Designed and Developed by{" "}
            <span className="text-foreground font-medium">Prabhav Krishna R</span>
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <p className="text-muted text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-foreground transition-colors group"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
