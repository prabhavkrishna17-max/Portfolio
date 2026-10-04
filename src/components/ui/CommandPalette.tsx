"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Briefcase,
  Layers,
  Sparkles,
  Award,
  Mail,
  Keyboard,
  ExternalLink,
  ArrowRight,
  X,
  FileCode2,
  FolderGit2
} from "lucide-react";
import { useLenis } from "lenis/react";

interface CommandItem {
  id: string;
  name: string;
  category: "Navigation" | "Real Projects" | "Explore" | "Links";
  icon: React.ReactNode;
  badge?: string;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  // Listen for Ctrl+K, Cmd+K, and custom open event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Lock scrolling when command palette is open
  useEffect(() => {
    if (open) {
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
  }, [open, lenis]);

  const scrollTo = useCallback(
    (target: string) => {
      setOpen(false);
      const el = document.querySelector<HTMLElement>(target);
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { offset: -70 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [lenis]
  );

  const openUrl = useCallback((url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const items: CommandItem[] = [
    // 1. Navigation
    {
      id: "home",
      name: "Hero / Top",
      category: "Navigation",
      icon: <Home className="w-4 h-4 text-purple-400" />,
      action: () => scrollTo("#top"),
    },
    {
      id: "about",
      name: "About Me",
      category: "Navigation",
      icon: <User className="w-4 h-4 text-purple-400" />,
      action: () => scrollTo("#about"),
    },
    {
      id: "experience",
      name: "Experience & Internship",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-purple-400" />,
      badge: "Arkensys Realtors",
      action: () => scrollTo("#experience"),
    },
    {
      id: "projects",
      name: "Projects Overview",
      category: "Navigation",
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      badge: "All Builds",
      action: () => scrollTo("#projects"),
    },
    {
      id: "certificates",
      name: "Certificates & Credentials",
      category: "Navigation",
      icon: <Award className="w-4 h-4 text-purple-400" />,
      badge: "12 Documents",
      action: () => scrollTo("#certificates"),
    },
    {
      id: "contact",
      name: "Contact / Let's Talk",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-purple-400" />,
      action: () => scrollTo("#contact"),
    },

    // 2. Real Projects (Direct Jump)
    {
      id: "agentlens",
      name: "AgentLens — AI Observability",
      category: "Real Projects",
      icon: <Sparkles className="w-4 h-4 text-accent" />,
      badge: "Academic / Mini Project",
      action: () => scrollTo("#agentlens"),
    },
    {
      id: "colorlab",
      name: "Artist Color Lab — Computational Color",
      category: "Real Projects",
      icon: <FileCode2 className="w-4 h-4 text-accent" />,
      badge: "Internship Project",
      action: () => scrollTo("#colorlab"),
    },
    {
      id: "aerova",
      name: "AEROVA — Airfare Index & Time-Series",
      category: "Real Projects",
      icon: <FolderGit2 className="w-4 h-4 text-accent" />,
      badge: "SIH 2026 Team",
      action: () => scrollTo("#aerova"),
    },

    // 3. Explore & Interactive
    {
      id: "typing-challenge",
      name: "Typing Challenge — Compete on Leaderboard",
      category: "Explore",
      icon: <Keyboard className="w-4 h-4 text-emerald-400" />,
      badge: "30-Sec Challenge",
      action: () => scrollTo("#typing-challenge"),
    },

    // 4. External Links
    {
      id: "github",
      name: "GitHub Profile (@prabhavkrishna17-max)",
      category: "Links",
      icon: <ExternalLink className="w-4 h-4 text-white/70" />,
      badge: "Code Repositories",
      action: () => openUrl("https://github.com/prabhavkrishna17-max"),
    },
    {
      id: "linkedin",
      name: "LinkedIn Profile (Prabhav Krishna R)",
      category: "Links",
      icon: <ExternalLink className="w-4 h-4 text-[#0A66C2]" />,
      badge: "Professional Network",
      action: () => openUrl("https://www.linkedin.com/in/prabhav-krishna"),
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Search Prabhav.dev"
          className="fixed inset-0 z-[150] flex items-start justify-center pt-14 sm:pt-28 px-3 sm:px-4 backdrop-blur-md bg-black/75"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl rounded-2xl overflow-hidden flex flex-col bg-gradient-to-b from-[#100a20] via-[#090614] to-[#05030a] border border-white/[0.14] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(167,139,250,0.15)]"
          >
            {/* Header / Search Input */}
            <div className="flex items-center px-3.5 sm:px-4 py-3 sm:py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
              <Search className="w-4 h-4 text-accent shrink-0 mr-2.5 sm:mr-3" />
              <Command.Input
                autoFocus
                placeholder="Search Prabhav.dev... (About, Projects, Leaderboard)"
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-base font-sans text-white placeholder:text-white/40"
              />
              <div className="flex items-center gap-1.5 ml-2 shrink-0">
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono border rounded bg-white/[0.06] border-white/[0.1] text-white/60">
                  ESC
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-md transition-colors text-white/50 hover:text-white hover:bg-white/[0.08]"
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Title Subheading */}
            <div className="px-3.5 sm:px-4 py-2 border-b flex items-center justify-between text-[11px] font-sans bg-white/[0.015] border-white/[0.05] text-white/50">
              <span className="font-medium uppercase tracking-wider text-accent/90">Search Prabhav.dev</span>
              <span className="hidden sm:inline">Use ↑ ↓ to navigate · Enter to jump</span>
            </div>

            {/* Results List */}
            <Command.List className="max-h-[min(360px,55dvh)] overflow-y-auto p-2 overscroll-contain space-y-1">
              <Command.Empty className="py-10 text-center text-xs sm:text-sm font-sans text-white/50">
                No matching destinations found.
              </Command.Empty>

              {(["Navigation", "Real Projects", "Explore", "Links"] as const).map((group) => {
                const groupItems = items.filter((item) => item.category === group);
                if (groupItems.length === 0) return null;

                return (
                  <Command.Group
                    key={group}
                    heading={group}
                    className="text-[11px] font-sans font-semibold uppercase tracking-wider px-2 py-1.5 [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono text-white/40 [&_[cmdk-group-heading]]:text-white/45"
                  >
                    {groupItems.map((item) => (
                      <Command.Item
                        key={item.id}
                        onSelect={item.action}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-sans cursor-pointer transition-colors duration-150 group text-white/85 aria-selected:bg-accent/20 aria-selected:border aria-selected:border-accent/35 aria-selected:text-white"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="p-1 rounded-md border transition-colors shrink-0 bg-white/[0.05] border-white/[0.08] group-aria-selected:border-accent/40 group-aria-selected:bg-accent/30">
                            {item.icon}
                          </span>
                          <span className="truncate font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          {item.badge && (
                            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-sans font-medium border bg-white/[0.05] border-white/[0.08] text-white/60 group-aria-selected:text-accent-light group-aria-selected:border-accent/30">
                              {item.badge}
                            </span>
                          )}
                          <ArrowRight size={13} className="transition-transform group-aria-selected:translate-x-0.5 text-white/30 group-aria-selected:text-accent" />
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                );
              })}
            </Command.List>

            {/* Footer */}
            <div className="px-4 py-2 border-t flex items-center justify-between text-[11px] font-sans border-white/[0.06] bg-black/40 text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Prabhav.dev Command Palette</span>
              </span>
              <span>Press ESC to exit</span>
            </div>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
