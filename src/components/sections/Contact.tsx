"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Copy, 
  CheckCircle2,
  Calendar,
  Send,
  Loader2,
  QrCode
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { cn } from "@/lib/utils";

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        if (formRef.current) formRef.current.reset();
        
        // Auto reset after 5 seconds
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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-[#060608] overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[1280px] relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Context & Information */}
          {/* ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight mb-6 text-white leading-[1.1]">
                Let&apos;s build<br />
                <span className="text-muted/50">something great.</span>
              </h2>
              <p className="text-lg text-muted/80 font-sans leading-relaxed max-w-md mb-10">
                I&apos;m always looking for ambitious projects and exciting opportunities. Let&apos;s connect and create impactful software.
              </p>

              {/* Status & Quick Info */}
              <div className="space-y-6 mb-12">
                
                <div className="flex items-center gap-3 text-sm font-medium text-white/90">
                  <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </div>
                  Open to internships & collaborations
                </div>

                <div className="flex items-center gap-3 text-sm text-muted">
                  <Calendar className="w-4 h-4 text-white/40" />
                  Usually replies within 24 hours
                </div>

                <div className="flex items-center gap-3 text-sm text-muted">
                  <MapPin className="w-4 h-4 text-white/40" />
                  Coimbatore, Tamil Nadu, India
                </div>

                <div className="flex items-center gap-3 text-sm text-muted">
                  <QrCode className="w-4 h-4 text-white/40" />
                  Languages: English, Tamil, Malayalam
                </div>
              </div>

              {/* Interactive Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                
                {/* Email Copy */}
                <button 
                  onClick={() => copyToClipboard("prabhavkrishna17@gmail.com", "Email")}
                  className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-colors group text-left"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-5 h-5 text-muted group-hover:text-accent transition-colors shrink-0" />
                    <div className="truncate">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted/60 mb-0.5">Email</p>
                      <p className="text-sm font-medium text-white truncate max-w-[120px]">prabhav...</p>
                    </div>
                  </div>
                  <Copy className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                </button>

                {/* Phone Copy */}
                <button 
                  onClick={() => copyToClipboard("+91 7904604145", "Phone Number")}
                  className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-colors group text-left"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Phone className="w-5 h-5 text-muted group-hover:text-accent transition-colors shrink-0" />
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted/60 mb-0.5">Phone</p>
                      <p className="text-sm font-medium text-white">+91 790...</p>
                    </div>
                  </div>
                  <Copy className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                </button>

                {/* GitHub */}
                <a 
                  href="https://github.com/prabhavkrishna17-max"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-colors group"
                >
                <FaGithub className="w-5 h-5 text-muted group-hover:text-accent transition-colors shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted/60 mb-0.5">Code</p>
                    <p className="text-sm font-medium text-white">GitHub Profile</p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/prabhav-krishna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-colors group"
                >
                <FaLinkedin className="w-5 h-5 text-muted group-hover:text-accent transition-colors shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted/60 mb-0.5">Network</p>
                    <p className="text-sm font-medium text-white">LinkedIn Profile</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Resume Download CTA */}
            <div>
              <a 
                href="/Prabhav_Krishna_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors group"
              >
                <FileText className="w-4 h-4" />
                <span className="underline underline-offset-4 decoration-white/20 group-hover:decoration-white/60 transition-colors">
                  View Full Resume
                </span>
              </a>
            </div>
          </motion.div>


          {/* ========================================================= */}
          {/* RIGHT COLUMN: Premium Contact Form */}
          {/* ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7"
          >
            <div className="relative glass p-8 sm:p-10 md:p-12 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl h-full flex flex-col justify-center">
              
              {/* Form Lighting / Glow Effect */}
              <div 
                className="absolute inset-0 z-0 opacity-50 pointer-events-none transition-opacity duration-1000"
                style={{
                  background: activeField ? 'radial-gradient(circle at 50% 0%, rgba(167, 139, 250, 0.1) 0%, transparent 70%)' : 'transparent'
                }}
              />

              <div className="relative z-10 w-full">
                <AnimatePresence mode="wait">
                  
                  {/* SUCCESS STATE */}
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex flex-col items-center justify-center text-center py-20 h-full"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2, duration: 0.6, bounce: 0.5 }}
                        className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                      </motion.div>
                      <h3 className="text-3xl font-heading font-medium text-white mb-4">Message Sent</h3>
                      <p className="text-muted/80 font-sans text-lg max-w-sm">
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
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                      aria-live="polite"
                    >
                      {/* Honeypot */}
                      <input type="text" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="relative group">
                          <label htmlFor="name" className={cn("absolute left-5 transition-all duration-300 pointer-events-none text-xs font-medium", activeField === 'name' ? 'top-3 text-accent' : 'top-3 text-white/50')}>Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            maxLength={100}
                            onFocus={() => setActiveField('name')}
                            onBlur={() => setActiveField(null)}
                            className="w-full px-5 pt-8 pb-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300 peer"
                            placeholder="John Doe"
                            aria-invalid={status === 'error'}
                            aria-describedby={status === 'error' ? 'form-error' : undefined}
                          />
                        </div>

                        {/* Email Field */}
                        <div className="relative group">
                          <label htmlFor="email" className={cn("absolute left-5 transition-all duration-300 pointer-events-none text-xs font-medium", activeField === 'email' ? 'top-3 text-accent' : 'top-3 text-white/50')}>Email *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            maxLength={100}
                            onFocus={() => setActiveField('email')}
                            onBlur={() => setActiveField(null)}
                            className="w-full px-5 pt-8 pb-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300 peer"
                            placeholder="john@company.com"
                            aria-invalid={status === 'error'}
                            aria-describedby={status === 'error' ? 'form-error' : undefined}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        {/* Subject Field */}
                        <div className="relative group">
                          <label htmlFor="subject" className={cn("absolute left-5 transition-all duration-300 pointer-events-none text-xs font-medium", activeField === 'subject' ? 'top-3 text-accent' : 'top-3 text-white/50')}>Subject *</label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                            maxLength={150}
                            onFocus={() => setActiveField('subject')}
                            onBlur={() => setActiveField(null)}
                            className="w-full px-5 pt-8 pb-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300 peer"
                            placeholder="Internship Opportunity"
                            aria-invalid={status === 'error'}
                            aria-describedby={status === 'error' ? 'form-error' : undefined}
                          />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="relative group">
                        <label htmlFor="message" className={cn("absolute left-5 transition-all duration-300 pointer-events-none text-xs font-medium", activeField === 'message' ? 'top-3 text-accent' : 'top-3 text-white/50')}>Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          maxLength={3000}
                          rows={4}
                          onFocus={() => setActiveField('message')}
                          onBlur={() => setActiveField(null)}
                          className="w-full px-5 pt-8 pb-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300 resize-none peer"
                          placeholder="Hi Prabhav, I'd like to discuss..."
                          aria-invalid={status === 'error'}
                          aria-describedby={status === 'error' ? 'form-error' : undefined}
                        />
                      </div>

                      {/* Error Message */}
                      <AnimatePresence>
                        {status === 'error' && (
                          <motion.div 
                            id="form-error"
                            role="alert"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-400 text-sm pl-2"
                          >
                            {errorMessage}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 px-8 bg-white text-[#060608] font-medium rounded-2xl hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
