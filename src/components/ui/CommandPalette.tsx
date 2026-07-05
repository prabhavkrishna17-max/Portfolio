"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, User, Briefcase, Mail, FileText, Code } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="flex items-center border-b border-white/10 px-4">
              <Search className="w-5 h-5 text-white/40" />
              <Command.Input 
                autoFocus
                placeholder="Type a command or search..."
                className="flex-1 px-4 py-4 bg-transparent border-none outline-none text-white placeholder:text-white/40 text-lg font-sans"
              />
              <div className="px-2 py-1 text-xs font-mono bg-white/10 rounded text-white/60">ESC</div>
            </div>

            <Command.List className="max-h-[300px] overflow-y-auto p-2 overscroll-contain">
              <Command.Empty className="py-6 text-center text-sm text-white/40">No results found.</Command.Empty>
              
              <Command.Group heading="Navigation" className="text-xs font-medium text-white/40 px-2 py-2">
                <Command.Item onSelect={() => runCommand(() => { window.location.hash = "#top"; })} className="flex items-center gap-3 px-3 py-3 mt-1 text-sm text-white/80 rounded-xl aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors">
                  <Home className="w-4 h-4" /> Go to Home
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => { window.location.hash = "#about"; })} className="flex items-center gap-3 px-3 py-3 mt-1 text-sm text-white/80 rounded-xl aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors">
                  <User className="w-4 h-4" /> Go to About
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => { window.location.hash = "#experience"; })} className="flex items-center gap-3 px-3 py-3 mt-1 text-sm text-white/80 rounded-xl aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors">
                  <Briefcase className="w-4 h-4" /> Go to Experience
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => { window.location.hash = "#projects"; })} className="flex items-center gap-3 px-3 py-3 mt-1 text-sm text-white/80 rounded-xl aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors">
                  <Code className="w-4 h-4" /> Go to Projects
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => { window.location.hash = "#contact"; })} className="flex items-center gap-3 px-3 py-3 mt-1 text-sm text-white/80 rounded-xl aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors">
                  <Mail className="w-4 h-4" /> Contact Me
                </Command.Item>
              </Command.Group>
              
              <Command.Group heading="Actions" className="text-xs font-medium text-white/40 px-2 py-2 border-t border-white/5 mt-2">
                <Command.Item onSelect={() => runCommand(() => window.open("/Prabhav_Krishna_Resume.pdf", "_blank"))} className="flex items-center gap-3 px-3 py-3 mt-1 text-sm text-white/80 rounded-xl aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors">
                  <FileText className="w-4 h-4" /> Download Resume
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => window.open("https://github.com/prabhavkrishna17-max", "_blank"))} className="flex items-center gap-3 px-3 py-3 mt-1 text-sm text-white/80 rounded-xl aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  View GitHub
                </Command.Item>
                <Command.Item onSelect={() => runCommand(() => window.open("mailto:prabhavkrishna17@gmail.com"))} className="flex items-center gap-3 px-3 py-3 mt-1 text-sm text-white/80 rounded-xl aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors">
                  <Mail className="w-4 h-4" /> Email Me
                </Command.Item>
              </Command.Group>

            </Command.List>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}
