"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { GlowCard } from "@/components/ui/GlowCard";
import { fadeUpVariant, staggerContainer, sectionVariant } from "@/lib/animations";
import { LeetCodeLogo } from "@/components/ui/BrandIcons";

const profiles = [
  {
    id: "github",
    name: "GitHub",
    description: "Open-source projects,\nexperiments and code.",
    href: "https://github.com/prabhavkrishna17-max",
    icon: <FaGithub className="w-14 h-14 text-white/90 group-hover:scale-105 transition-transform duration-500" />,
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Experience,\neducation and achievements.",
    href: "https://www.linkedin.com/in/prabhav-krishna",
    icon: <FaLinkedin className="w-14 h-14 text-[#0A66C2] group-hover:scale-105 transition-transform duration-500" />,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    description: "Data Structures,\nAlgorithms and coding practice.",
    href: "https://leetcode.com/u/Prabhav_Krishna/",
    icon: <LeetCodeLogo className="w-14 h-14 group-hover:scale-105 transition-transform duration-500" />,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Personal updates\nand creative moments.",
    href: "https://www.instagram.com/prabhav_v_v/",
    icon: <FaInstagram className="w-14 h-14 text-[#E4405F] group-hover:scale-105 transition-transform duration-500" />,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "email",
    name: "Email",
    description: "prabhavkrishna17@gmail.com",
    href: "mailto:prabhavkrishna17@gmail.com",
    icon: <Mail className="w-14 h-14 text-white/70 group-hover:scale-105 transition-transform duration-500" />,
    action: "Send Email →",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "location",
    name: "Location",
    description: "Coimbatore,\nTamil Nadu, India",
    href: "https://maps.google.com/?q=Coimbatore",
    icon: <MapPin className="w-14 h-14 text-white/70 group-hover:scale-105 transition-transform duration-500" />,
    span: "md:col-span-1 lg:col-span-1",
  }
];

export function Connect() {
  return (
    <section id="connect" className="pt-24 md:pt-32 relative z-10 bg-[#030305] text-white overflow-hidden pb-12">
      <motion.div 
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 relative z-10"
      >
        <motion.div variants={fadeUpVariant} className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.1] text-white/90">
            Connect
          </h2>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-xl leading-relaxed">
            Let&apos;s continue the conversation.<br />
            Explore my work, coding profiles and professional presence.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]"
        >
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
                intensity="medium" 
                interactive 
                className="h-full p-8 md:p-10 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-8 flex items-start justify-between">
                    <div className="p-4 bg-white/[0.02] rounded-3xl border border-white/[0.04] shadow-inner">
                      {profile.icon}
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-white transition-colors duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-medium text-white/90 mb-3">{profile.name}</h3>
                  <p className="text-sm md:text-base text-white/50 font-light leading-relaxed mb-6 whitespace-pre-line">
                    {profile.description}
                  </p>
                </div>
                
                {profile.action && (
                  <div className="pt-6 mt-auto border-t border-white/[0.04] flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-[0.1em] text-white/60 group-hover:text-white transition-colors font-medium">
                      {profile.action}
                    </span>
                  </div>
                )}
              </GlowCard>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
