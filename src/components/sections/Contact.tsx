"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { ShinyText } from "@/components/ui/ShinyText";
import ShapeGrid from "@/components/ui/ShapeGrid";
import { 
  Mail, 
  MapPin, 
  CheckCircle2,
  Send,
  Loader2,
  ArrowUpRight
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { LeetCodeLogo } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";
import { fadeUpVariant, staggerContainer, sectionVariant } from "@/lib/animations";

const profiles = [
  {
    id: "github",
    name: "GitHub",
    description: "Open-source projects,\nexperiments and code.",
    href: "https://github.com/prabhavkrishna17-max",
    icon: <FaGithub className="w-10 h-10 text-white/90 group-hover:scale-105 transition-transform duration-500" />,
    span: "col-span-2 sm:col-span-2",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Experience,\neducation and achievements.",
    href: "https://www.linkedin.com/in/prabhav-krishna",
    icon: <FaLinkedin className="w-10 h-10 text-[#0A66C2] group-hover:scale-105 transition-transform duration-500" />,
    span: "col-span-2 sm:col-span-2",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    description: "Data Structures,\nAlgorithms and practice.",
    href: "https://leetcode.com/u/Prabhav_Krishna/",
    icon: <LeetCodeLogo className="w-10 h-10 group-hover:scale-105 transition-transform duration-500" />,
    span: "col-span-1",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Personal updates\nand moments.",
    href: "https://www.instagram.com/prabhav_v_v/",
    icon: <FaInstagram className="w-10 h-10 text-[#E4405F] group-hover:scale-105 transition-transform duration-500" />,
    span: "col-span-1",
  },
  {
    id: "email",
    name: "Email",
    description: "prabhavkrishna17@gmail.com",
    href: "mailto:prabhavkrishna17@gmail.com",
    icon: <Mail className="w-10 h-10 text-white/70 group-hover:scale-105 transition-transform duration-500" />,
    action: "Send Email →",
    span: "col-span-1",
  },
  {
    id: "location",
    name: "Location",
    description: "Coimbatore,\nTamil Nadu, India",
    href: "https://maps.google.com/?q=Coimbatore",
    icon: <MapPin className="w-10 h-10 text-white/70 group-hover:scale-105 transition-transform duration-500" />,
    span: "col-span-1",
  }
];

const INTENTS = [
  "Internship",
  "Project",
  "Collaboration",
  "Just saying hi"
];

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [subjectValue, setSubjectValue] = useState<string>('');
  
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px 200px 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Subtle ambient parallax for the background grid and noise
  const yBackground = useTransform(scrollYProgress, [0, 1], ["-15%", "5%"]);
  const yNoise = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setSelectedIntent(null);
        setSubjectValue('');
        if (formRef.current) formRef.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="pt-24 md:pt-32 pb-16 relative z-10 text-white overflow-hidden">
      
      {/* 1. Ambient Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Layer 1: ShapeGrid with mask for blending */}
        <motion.div 
          style={{ y: yBackground, maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)" }} 
          className="absolute inset-0 opacity-80 mix-blend-screen transform-gpu will-change-transform"
        >
          <ShapeGrid 
            speed={0.15} 
            squareSize={48} 
            direction="diagonal" 
            borderColor="rgba(255,255,255,0.04)" 
            hoverFillColor="rgba(255,255,255,0.03)" 
            shape="square" 
            hoverTrailAmount={0}
            paused={!isInView}
          />
        </motion.div>
        
        {/* Layer 2: Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,5,0.6)_90%)]" />
        
        {/* Layer 3: Noise Texture with distinct parallax */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay hidden md:block transform-gpu will-change-transform"
          style={{
            y: yNoise,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Blend boundary top gradient */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#030305]/0 to-transparent" />
      </div>

      {/* ========================================================= */}
      {/* FOREGROUND CONTENT */}
      {/* ========================================================= */}
      <motion.div 
        style={{ y: yContent }}
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px] relative z-10 transform-gpu will-change-transform"
      >
        <motion.div variants={fadeUpVariant} className="mb-12 sm:mb-16 md:mb-24 text-center">
          <h2 className="lens-target text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 sm:mb-6 text-white leading-[1.1]">
            Let&apos;s build{" "}
            <ShinyText
              text="something great."
              speed={4.5}
              delay={1.5}
              color="rgba(255, 255, 255, 0.45)"
              shineColor="#E9D5FF"
              spread={120}
              direction="left"
              className="italic font-serif font-light"
            />
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/75 font-normal font-sans max-w-2xl mx-auto leading-relaxed">
            I&apos;m always looking for ambitious projects and exciting opportunities. Let&apos;s start a conversation or explore my professional presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Premium Contact Form */}
          {/* ========================================================= */}
          <motion.div variants={staggerContainer} className="xl:col-span-5">
            <GlowCard variant="contact" intensity="low" interactive className="p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] h-full flex flex-col w-full bg-[#060608]/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
              
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-medium text-white/90 mb-2">Send a Message</h3>
                <p className="text-sm sm:text-base text-white/70 font-normal">Usually replies within 24 hours.</p>
              </div>

              <div className="relative z-10 w-full flex-grow">
                <AnimatePresence mode="wait">
                  
                  {/* SUCCESS STATE */}
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                      transition={{ duration: 0.8, ease: [0.2, 0.9, 0.1, 1] }}
                      className="flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2, duration: 1.5, bounce: 0.2 }}
                        className="w-16 h-16 border border-white/10 bg-white/[0.02] rounded-full flex items-center justify-center mb-6 shadow-inner"
                      >
                        <CheckCircle2 className="w-6 h-6 text-white/70" />
                      </motion.div>
                      <h3 className="text-2xl font-medium text-white/90 mb-4">Message Sent</h3>
                      <p className="text-white/70 font-normal font-sans text-base max-w-[280px] tracking-wide">
                        Thank you for reaching out. I&apos;ll review your message and get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    
                    /* FORM STATE */
                    <motion.form 
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.8 }}
                      className="flex flex-col h-full space-y-4 sm:space-y-5"
                    >
                      <input type="text" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                      {/* Optional Intent Selector */}
                      <div className="space-y-2">
                        <label className="block text-xs font-sans font-medium text-white/50 tracking-wider">
                          What would you like to talk about? <span className="text-white/30 text-[11px] font-normal">(optional)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {INTENTS.map((intent) => {
                            const isSelected = selectedIntent === intent;
                            return (
                              <button
                                key={intent}
                                type="button"
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedIntent(null);
                                    if (INTENTS.some((i) => subjectValue === `[${i}] `)) {
                                      setSubjectValue('');
                                    }
                                  } else {
                                    setSelectedIntent(intent);
                                    if (!subjectValue || INTENTS.some((i) => subjectValue === `[${i}] `)) {
                                      setSubjectValue(`[${intent}] `);
                                    }
                                  }
                                }}
                                className={cn(
                                  "px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 border cursor-pointer",
                                  isSelected
                                    ? "bg-accent/25 border-accent text-white shadow-[0_0_15px_rgba(167,139,250,0.35)]"
                                    : "bg-white/[0.03] border-white/[0.08] text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.06]"
                                )}
                              >
                                {intent}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="relative group">
                          <label htmlFor="name" className={cn("absolute left-5 transition-all duration-300 pointer-events-none text-xs sm:text-[13px] tracking-wider font-sans font-medium uppercase", activeField === 'name' ? 'top-2.5 text-accent-light' : 'top-2.5 text-white/50')}>Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            maxLength={100}
                            onFocus={() => setActiveField('name')}
                            onBlur={() => setActiveField(null)}
                            className="w-full px-5 pt-7 pb-3 bg-white/[0.02] border border-white/[0.07] rounded-2xl text-white/90 text-base font-normal outline-none focus:border-purple-400/40 focus:bg-white/[0.05] transition-all duration-300 peer"
                          />
                        </div>

                        <div className="relative group">
                          <label htmlFor="email" className={cn("absolute left-5 transition-all duration-300 pointer-events-none text-xs sm:text-[13px] tracking-wider font-sans font-medium uppercase", activeField === 'email' ? 'top-2.5 text-accent-light' : 'top-2.5 text-white/50')}>Email *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            maxLength={100}
                            onFocus={() => setActiveField('email')}
                            onBlur={() => setActiveField(null)}
                            className="w-full px-5 pt-7 pb-3 bg-white/[0.02] border border-white/[0.07] rounded-2xl text-white/90 text-base font-normal outline-none focus:border-purple-400/40 focus:bg-white/[0.05] transition-all duration-300 peer"
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <label htmlFor="subject" className={cn("absolute left-5 transition-all duration-300 pointer-events-none text-xs sm:text-[13px] tracking-wider font-sans font-medium uppercase", activeField === 'subject' || subjectValue ? 'top-2.5 text-accent-light' : 'top-2.5 text-white/50')}>Subject *</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          maxLength={150}
                          value={subjectValue}
                          onChange={(e) => setSubjectValue(e.target.value)}
                          onFocus={() => setActiveField('subject')}
                          onBlur={() => setActiveField(null)}
                          className="w-full px-5 pt-7 pb-3 bg-white/[0.02] border border-white/[0.07] rounded-2xl text-white/90 text-base font-normal outline-none focus:border-purple-400/40 focus:bg-white/[0.05] transition-all duration-300 peer"
                        />
                      </div>

                      <div className="relative group flex-grow">
                        <label htmlFor="message" className={cn("absolute left-5 transition-all duration-300 pointer-events-none text-xs sm:text-[13px] tracking-wider font-sans font-medium uppercase", activeField === 'message' ? 'top-2.5 text-accent-light' : 'top-2.5 text-white/50')}>Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          maxLength={3000}
                          onFocus={() => setActiveField('message')}
                          onBlur={() => setActiveField(null)}
                          className="w-full h-full min-h-[140px] px-5 pt-7 pb-3 bg-white/[0.02] border border-white/[0.07] rounded-2xl text-white/90 text-base font-normal outline-none focus:border-purple-400/40 focus:bg-white/[0.05] transition-all duration-300 resize-none peer"
                        />
                      </div>

                      <AnimatePresence>
                        {status === 'error' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-white/70 text-xs sm:text-sm pl-2 font-sans tracking-wide"
                          >
                            {errorMessage}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 mt-2 border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.1] glass-hover text-white text-sm sm:text-base tracking-wide font-sans font-medium rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.5),0_0_30px_-5px_rgba(167,139,250,0.25)] cursor-pointer"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin opacity-50" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </GlowCard>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Connect Profiles (Bento Grid) */}
          {/* ========================================================= */}
          <motion.div variants={staggerContainer} className="xl:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 h-full">
              {profiles.map((profile) => (
                <motion.a
                  key={profile.id}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUpVariant}
                  className={`block group ${profile.span}`}
                >
                  <GlowCard 
                    variant="contact" 
                    intensity="low" 
                    interactive 
                    className="h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-3xl"
                  >
                    <div>
                      <div className="mb-6 flex items-start justify-between">
                        <div className="p-3 sm:p-4 bg-white/[0.02] rounded-3xl border border-white/[0.04] shadow-inner">
                          {profile.icon}
                        </div>
                        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/20 group-hover:text-white transition-colors duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-medium text-white/90 mb-2">{profile.name}</h3>
                      <p className="text-sm sm:text-base text-white/70 font-normal leading-relaxed whitespace-pre-line">
                        {profile.description}
                      </p>
                    </div>
                  </GlowCard>
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
