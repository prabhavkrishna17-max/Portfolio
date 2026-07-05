"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060608] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl relative z-10">
        
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight mb-8 text-white drop-shadow-lg">
              Let&apos;s build<br />something great.
            </h2>
            <p className="text-xl text-muted font-light leading-relaxed mb-16 mx-auto max-w-2xl">
              Available for internships, freelance opportunities, and open source collaborations. I&apos;m always looking for ambitious projects.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            href="mailto:prabhavkrishna17@gmail.com"
            className="glass p-10 rounded-3xl flex flex-col items-center justify-center space-y-6 group hover:bg-white/5 hover:border-white/20 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full border border-white/10 group-hover:border-accent/50 group-hover:bg-accent/10 flex items-center justify-center transition-all duration-500">
              <Mail size={24} className="text-muted group-hover:text-accent transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted/60 group-hover:text-muted mb-2 transition-colors">Email</p>
              <p className="font-medium text-white">prabhavkrishna17@gmail.com</p>
            </div>
          </motion.a>

          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            href="tel:7904604145"
            className="glass p-10 rounded-3xl flex flex-col items-center justify-center space-y-6 group hover:bg-white/5 hover:border-white/20 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full border border-white/10 group-hover:border-accent/50 group-hover:bg-accent/10 flex items-center justify-center transition-all duration-500">
              <Phone size={24} className="text-muted group-hover:text-accent transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted/60 group-hover:text-muted mb-2 transition-colors">Phone</p>
              <p className="font-medium text-white">+91 7904604145</p>
            </div>
          </motion.a>

          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            href="https://www.linkedin.com/in/prabhav-krishna"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-10 rounded-3xl flex flex-col items-center justify-center space-y-6 group hover:bg-white/5 hover:border-white/20 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full border border-white/10 group-hover:border-accent/50 group-hover:bg-accent/10 flex items-center justify-center transition-all duration-500">
              <FaLinkedin size={24} className="text-muted group-hover:text-accent transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted/60 group-hover:text-muted mb-2 transition-colors">Network</p>
              <p className="font-medium text-white">LinkedIn Profile</p>
            </div>
          </motion.a>

          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            href="https://github.com/prabhavkrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-10 rounded-3xl flex flex-col items-center justify-center space-y-6 group hover:bg-white/5 hover:border-white/20 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full border border-white/10 group-hover:border-accent/50 group-hover:bg-accent/10 flex items-center justify-center transition-all duration-500">
              <FaGithub size={24} className="text-muted group-hover:text-accent transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted/60 group-hover:text-muted mb-2 transition-colors">Code</p>
              <p className="font-medium text-white">GitHub Profile</p>
            </div>
          </motion.a>
        </div>

      </div>
    </section>
  );
}
