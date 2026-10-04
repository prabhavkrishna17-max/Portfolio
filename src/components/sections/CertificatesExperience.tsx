"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  X,
  Download,
  Award,
  Briefcase,
  CheckCircle2,
  Eye,
  Layers,
  ExternalLink,
} from "lucide-react";
import { Folder, FolderItem } from "@/components/ui/Folder";
import { ShinyText } from "@/components/ui/ShinyText";
import { fadeUpVariant, staggerContainer, sectionVariant, CINEMATIC_EASE } from "@/lib/animations";
import { useLenis } from "lenis/react";

// =============================================================================
// VERIFIED ASSETS & DATA STRUCTURE
// Complete inventory of all 12 verified internship & certification documents.
// Every document maps to an actual file in public/images/internships or public/images/certificates.
// =============================================================================

export interface CareerDocument extends FolderItem {
  category: "experience" | "technical" | "design" | "hackathon" | "honors";
  badgeText: string;
}

// 1. Featured Internship Documents (Arkensys Realtors) — 5 Total Actual Documents
const arkensysDocuments: CareerDocument[] = [
  {
    id: "ark-cert",
    title: "Software Developer Internship Certificate",
    issuer: "Arkensys Realtors",
    date: "June 18–30, 2026",
    type: "image",
    file: "/images/internships/ARK_Internship.webp",
    thumbnail: "/images/internships/ARK_Internship.webp",
    category: "experience",
    badgeText: "Internship Certificate",
    description:
      "Official certificate of completion certifying software engineering contributions, web application features, and authentication system implementations at Arkensys Realtors.",
  },
  {
    id: "ark-offer",
    title: "Official Offer of Internship",
    issuer: "Arkensys Realtors",
    date: "June 2026",
    type: "image",
    file: "/images/internships/ARK_Offer_Letter.webp",
    thumbnail: "/images/internships/ARK_Offer_Letter.webp",
    category: "experience",
    badgeText: "Offer Letter",
    description:
      "Official appointment letter detailing software engineering responsibilities, project scope, technical stack alignment, and internship terms.",
  },
  {
    id: "ark-report",
    title: "Internship Technical Report",
    issuer: "Arkensys Realtors",
    date: "June 2026",
    type: "pdf",
    file: "/images/internships/Internship_Report_Prabhav.pdf",
    thumbnail: "/images/internships/ARK_Internship.webp",
    category: "experience",
    badgeText: "Technical Report (PDF)",
    description:
      "Comprehensive technical project documentation detailing full-stack architecture, Supabase integration, web performance optimization, and project deployment.",
  },
  {
    id: "ark-workspace",
    title: "On-Site Engineering Workspace",
    issuer: "Arkensys Realtors",
    date: "June 2026",
    type: "image",
    file: "/images/internships/office-photo.webp",
    thumbnail: "/images/internships/office-photo.webp",
    category: "experience",
    badgeText: "Workspace & Team",
    description:
      "On-site development workstation, testing environment, and team collaboration setup during the active internship period at Arkensys Realtors.",
  },
  {
    id: "ark-circuit",
    title: "Hardware & IoT Prototype",
    issuer: "Arkensys Realtors / Hardware Integration",
    date: "June 2026",
    type: "image",
    file: "/images/internships/Circuit.webp",
    thumbnail: "/images/internships/Circuit.webp",
    category: "experience",
    badgeText: "Hardware Prototype",
    description:
      "Microcontroller interface and embedded hardware breadboard prototype assembled and tested for hardware telemetry integration experiments.",
  },
];

// 2. Python & Programming Certificates — 1 Document
const pythonDocuments: CareerDocument[] = [
  {
    id: "scaler-python",
    title: "Scaler Python Programming",
    issuer: "Scaler Academy",
    date: "2024–2025",
    type: "image",
    file: "/images/certificates/Python_Scalar.webp",
    thumbnail: "/images/certificates/Python_Scalar.webp",
    category: "technical",
    badgeText: "Advanced Python",
    description:
      "Advanced certification covering core Python syntax, algorithms, data structures, modular object-oriented programming, and computational problem solving.",
  },
];

// 3. Design Thinking & UX Certificates — 2 Documents
const designThinkingDocuments: CareerDocument[] = [
  {
    id: "dt-practitioner",
    title: "Enterprise Design Thinking Practitioner",
    issuer: "IBM / Enterprise Design Thinking",
    date: "Verified Credential",
    type: "image",
    file: "/images/certificates/DT.webp",
    thumbnail: "/images/certificates/DT.webp",
    category: "design",
    badgeText: "Enterprise Practitioner",
    description:
      "Professional credential recognizing empathy-driven user research, problem framing, agile multidisciplinary solution synthesis, and human-centered design principles.",
  },
  {
    id: "dt-bootcamp",
    title: "Enterprise Design Thinking Bootcamp",
    issuer: "Design Thinking Project Expo",
    date: "Verified Credential",
    type: "image",
    file: "/images/certificates/Bootcamp.webp",
    thumbnail: "/images/certificates/Bootcamp.webp",
    category: "design",
    badgeText: "Bootcamp Co-Creator",
    description:
      "Intensive hands-on product co-creation and rapid prototyping workshop credential validating user persona modeling, journey mapping, and usability testing.",
  },
];

// 4. Hackathons & Competitions Certificates — 3 Documents
const hackathonDocuments: CareerDocument[] = [
  {
    id: "hacknext",
    title: "HackNext '25 Hackathon",
    issuer: "HackNext Organizing Committee",
    date: "2025",
    type: "image",
    file: "/images/certificates/HackkNext.webp",
    thumbnail: "/images/certificates/HackkNext.webp",
    category: "hackathon",
    badgeText: "24-Hour Hackathon",
    description:
      "National hackathon certificate awarded for end-to-end rapid prototyping, frontend execution, API integration, and live pitch delivery within a 24-hour sprint.",
  },
  {
    id: "technovibe",
    title: "Technovibe 2k26 Symposium",
    issuer: "National Technical Symposium",
    date: "2026",
    type: "image",
    file: "/images/certificates/TECHNOVIBE_2k26.webp",
    thumbnail: "/images/certificates/TECHNOVIBE_2k26.webp",
    category: "hackathon",
    badgeText: "Project Expo",
    description:
      "National-level technical symposium and project exhibition recognition honoring software project delivery, architectural innovation, and live jury demonstration.",
  },
  {
    id: "oblivion",
    title: "Oblivion '25 Creative Showcase",
    issuer: "Oblivion Technical & Creative Fest",
    date: "2025",
    type: "image",
    file: "/images/certificates/Oblivion25.webp",
    thumbnail: "/images/certificates/Oblivion25.webp",
    category: "hackathon",
    badgeText: "Design Showcase",
    description:
      "Official certificate recognizing creative visual design, interface identity development, and digital media production during the Oblivion '25 technical festival.",
  },
];

// 5. Honors & Athletics Certificates — 1 Document
const honorsDocuments: CareerDocument[] = [
  {
    id: "basketball-honor",
    title: "Zone Level Basketball Championship",
    issuer: "Zone Sports Board",
    date: "Zone Level Honor",
    type: "image",
    file: "/images/certificates/BasketBall-Cert.webp",
    thumbnail: "/images/certificates/BasketBall-Cert.webp",
    category: "honors",
    badgeText: "Athletic Leadership",
    description:
      "Competitive zone-level athletic achievement recognized for court leadership, tactical teamwork, resilience, and sportsmanship in regional tournament play.",
  },
];

// Master list of all 12 documents for the complete in-page archive
const allArchiveDocuments: CareerDocument[] = [
  ...arkensysDocuments,
  ...pythonDocuments,
  ...designThinkingDocuments,
  ...hackathonDocuments,
  ...honorsDocuments,
];

export function CertificatesExperience() {
  const [selectedDoc, setSelectedDoc] = useState<CareerDocument | null>(null);
  const [isFullArchiveOpen, setIsFullArchiveOpen] = useState(false);
  const [archiveFilter, setArchiveFilter] = useState<
    "all" | "experience" | "technical" | "design" | "hackathon" | "honors"
  >("all");

  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);

  // Lock body scroll and listen for Escape key ONLY when a modal is open
  const isAnyModalOpen = Boolean(selectedDoc || isFullArchiveOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedDoc) {
          setSelectedDoc(null);
        } else if (isFullArchiveOpen) {
          setIsFullArchiveOpen(false);
        }
      }
    };

    if (isAnyModalOpen) {
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
  }, [isAnyModalOpen, selectedDoc, isFullArchiveOpen, lenis]);

  // Filtered documents for the complete archive modal
  const filteredArchive = allArchiveDocuments.filter((doc) => {
    if (archiveFilter === "all") return true;
    return doc.category === archiveFilter;
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yAmbient = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const yHeader = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  // Group 1 Arkensys Folder Scroll Parallax (Dynamic range)
  const arkensysRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: arkensysScroll } = useScroll({
    target: arkensysRef,
    offset: ["start end", "end start"],
  });
  const yArkensys = useTransform(arkensysScroll, [0, 1], [45, -45]);
  const yArkensysGlow = useTransform(arkensysScroll, [0, 1], [-60, 60]);

  // Group 2 Certifications Grid Scroll Parallax (Fluid staggered wavy float)
  const certsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: certsScroll } = useScroll({
    target: certsRef,
    offset: ["start end", "end start"],
  });
  const yFolder1 = useTransform(certsScroll, [0, 1], [30, -30]);
  const yFolder2 = useTransform(certsScroll, [0, 1], [55, -55]);
  const yFolder3 = useTransform(certsScroll, [0, 1], [30, -30]);
  const yFolder4 = useTransform(certsScroll, [0, 1], [55, -55]);
  const yCertsGlow = useTransform(certsScroll, [0, 1], [-50, 50]);
  const yArchiveBtn = useTransform(certsScroll, [0, 1], [20, -20]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="pt-20 sm:pt-24 md:pt-28 pb-20 md:pb-32 relative z-10 overflow-hidden"
    >
      {/* Top subtle ambient purple glow responding continuously to scroll */}
      <motion.div
        style={{ y: yAmbient }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-48 bg-accent/10 blur-[130px] pointer-events-none rounded-full transform-gpu will-change-transform"
      />

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05 }}
        className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10"
      >
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* Exactly adheres to user specification:                                     */}
        {/* Title: CERTIFICATES & EXPERIENCE                                          */}
        {/* Subtitle: "Proof of the work, learning, and experiences behind the..."     */}
        {/* ========================================================================= */}
        <motion.div style={{ y: yHeader }} className="mb-14 sm:mb-16 md:mb-20 text-center max-w-2xl mx-auto transform-gpu will-change-transform">
          <motion.div variants={fadeUpVariant}>
            <p className="text-xs sm:text-sm font-sans font-semibold text-white/60 uppercase tracking-[0.2em] mb-2.5 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
              <ShinyText
                text="Career & Validation Archive"
                speed={3.5}
                delay={1}
                color="rgba(255, 255, 255, 0.65)"
                shineColor="#DDD6FE"
                spread={120}
                direction="left"
                className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.2em]"
              />
            </p>
            <h2 className="lens-target text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-white tracking-tight mb-3.5">
              Certificates & Experience
            </h2>
            <p className="text-base sm:text-lg font-sans font-normal text-white/80 leading-relaxed max-w-xl mx-auto">
              Proof of the work, learning, and experiences behind the portfolio.
            </p>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* GROUP 1: EXPERIENCE                                                       */}
        {/* Featured Prominent Folder for Arkensys Realtors                            */}
        {/* ========================================================================= */}
        <div ref={arkensysRef} className="mb-20 sm:mb-24 md:mb-28 relative">
          {/* Ambient Glow behind Arkensys */}
          <motion.div
            style={{ y: yArkensysGlow }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-44 bg-accent/15 blur-[95px] pointer-events-none rounded-full transform-gpu will-change-transform"
          />

          {/* Group 1 Visual Divider / Label */}
          <motion.div variants={fadeUpVariant} className="flex items-center justify-center mb-8">
            <span className="px-5 py-2 rounded-full bg-accent/15 border border-accent/35 text-xs sm:text-sm font-sans font-semibold text-accent uppercase tracking-[0.2em] inline-flex items-center gap-2 shadow-[0_0_20px_rgba(167,139,250,0.2)]">
              <Briefcase size={14} className="text-accent" />
              <span>EXPERIENCE</span>
            </span>
          </motion.div>

          {/* Prominent Arkensys Realtors Folder with smooth entrance & continuous float (triggers every time) */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              style={{ y: yArkensys }}
              className="flex flex-col items-center justify-center transform-gpu will-change-transform"
            >
              <Folder
                title="Arkensys Realtors"
                subtitle="Software Developer Internship"
                meta="June 18–30, 2026"
                items={arkensysDocuments}
                prominent={true}
                size={1.15}
                onSelectItem={(item) => setSelectedDoc(item as CareerDocument)}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* GROUP 2: CERTIFICATIONS                                                   */}
        {/* Hairline Transition & Section Heading                                     */}
        {/* ========================================================================= */}
        <div id="certificates" className="relative mb-14 sm:mb-18 scroll-mt-24">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
          <div className="flex items-center justify-center -my-4 relative z-10">
            <span className="px-5 py-2 rounded-full bg-[#0c0717] border border-purple-500/30 text-xs sm:text-sm font-sans font-semibold text-white/90 tracking-[0.2em] uppercase backdrop-blur-md inline-flex items-center gap-2 shadow-md">
              <Award size={14} className="text-accent" />
              <span>CERTIFICATIONS</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CERTIFICATE FOLDERS GRID                                                  */}
        {/* Responsive: Desktop (4 cols), Tablet (2 cols), Mobile (1 col)             */}
        {/* Contains all 7 actual certificates organized by meaningful category       */}
        {/* ========================================================================= */}
        <div ref={certsRef} className="relative mb-16 sm:mb-20">
          {/* Ambient lighting behind the folders */}
          <motion.div
            style={{ y: yCertsGlow }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-64 bg-accent/10 blur-[120px] pointer-events-none rounded-full transform-gpu will-change-transform"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6 items-start justify-items-center relative z-10"
          >
            {/* Folder 1: Python & Programming (1 doc) */}
            <motion.div variants={fadeUpVariant} className="w-full flex justify-center">
              <motion.div style={{ y: yFolder1 }} className="transform-gpu will-change-transform">
                <Folder
                  title="Python & Programming"
                  subtitle="Software Engineering & Algorithms"
                  meta="Scaler Academy"
                  items={pythonDocuments}
                  size={0.96}
                  onSelectItem={(item) => setSelectedDoc(item as CareerDocument)}
                />
              </motion.div>
            </motion.div>

            {/* Folder 2: Design Thinking & UX (2 docs) */}
            <motion.div variants={fadeUpVariant} className="w-full flex justify-center">
              <motion.div style={{ y: yFolder2 }} className="transform-gpu will-change-transform">
                <Folder
                  title="Design Thinking & UX"
                  subtitle="Enterprise Practitioner & Workshop"
                  meta="IBM Enterprise DT"
                  items={designThinkingDocuments}
                  size={0.96}
                  onSelectItem={(item) => setSelectedDoc(item as CareerDocument)}
                />
              </motion.div>
            </motion.div>

            {/* Folder 3: Hackathons & Competitions (3 docs) */}
            <motion.div variants={fadeUpVariant} className="w-full flex justify-center">
              <motion.div style={{ y: yFolder3 }} className="transform-gpu will-change-transform">
                <Folder
                  title="Hackathons & Competitions"
                  subtitle="Symposiums & Project Expos"
                  meta="HackNext • Technovibe • Oblivion"
                  items={hackathonDocuments}
                  size={0.96}
                  onSelectItem={(item) => setSelectedDoc(item as CareerDocument)}
                />
              </motion.div>
            </motion.div>

            {/* Folder 4: Honors & Athletics (1 doc) */}
            <motion.div variants={fadeUpVariant} className="w-full flex justify-center">
              <motion.div style={{ y: yFolder4 }} className="transform-gpu will-change-transform">
                <Folder
                  title="Honors & Athletics"
                  subtitle="Leadership & Athletic Excellence"
                  meta="Zone Sports Council"
                  items={honorsDocuments}
                  size={0.96}
                  onSelectItem={(item) => setSelectedDoc(item as CareerDocument)}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* COMPLETE CREDENTIAL ARCHIVE FALLBACK ACTION                               */}
        {/* "View all credentials" in-page archive trigger                            */}
        {/* ========================================================================= */}
        <motion.div
          style={{ y: yArchiveBtn }}
          className="flex flex-col items-center justify-center pt-4 transform-gpu will-change-transform"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setArchiveFilter("all");
                setIsFullArchiveOpen(true);
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1d1035] via-[#261545] to-[#1d1035] hover:from-[#271647] hover:to-[#22133f] border border-purple-400/40 hover:border-purple-300/80 text-sm sm:text-base font-sans font-medium text-white transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.7),0_0_25px_rgba(167,139,250,0.2)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.9),0_0_35px_rgba(167,139,250,0.4)] hover:-translate-y-0.5 active:scale-98 cursor-pointer"
            >
              <Layers size={17} className="text-accent group-hover:scale-110 transition-transform duration-300" />
              <span>View all credentials</span>
              <span className="px-2.5 py-0.5 rounded-full bg-accent/30 text-xs sm:text-sm font-sans text-purple-100 font-semibold border border-purple-400/30">
                12 total
              </span>
            </button>
          </div>
          <p className="text-xs sm:text-sm font-sans text-white/60 mt-3 text-center">
            Every verified certificate, offer letter, and engineering document available in-page
          </p>
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 1. IN-PAGE FULLSCREEN DOCUMENT VIEWER / LIGHTBOX                          */}
      {/* Opens smoothly over current page with preserved aspect ratio, dark blur,  */}
      {/* Escape key support, clean close button, and PDF embedding                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: CINEMATIC_EASE }}
            className="fixed inset-0 z-[220] bg-black/94 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-5 md:p-8 cursor-zoom-out"
            onClick={() => setSelectedDoc(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Document viewer: ${selectedDoc.title}`}
            data-lenis-prevent="true"
          >
            <motion.div
              initial={{ scale: 0.94, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 16, opacity: 0 }}
              transition={{ duration: 0.32, ease: CINEMATIC_EASE }}
              className="relative w-full max-w-4xl max-h-[92dvh] bg-[#090611] border border-white/[0.12] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col cursor-default pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
            >
              {/* Document Viewer Top Header */}
              <div className="flex items-center justify-between px-4 sm:px-7 py-3 sm:py-4 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="min-w-0 pr-3 sm:pr-4">
                  <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-accent/25 border border-accent/40 text-[11px] sm:text-xs font-sans font-semibold text-accent">
                      {selectedDoc.badgeText || (selectedDoc.type === "pdf" ? "PDF Document" : "Certificate")}
                    </span>
                    {selectedDoc.date && (
                      <span className="text-[11px] sm:text-xs sm:text-sm font-sans text-white/60">
                        {selectedDoc.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-xl md:text-2xl font-heading font-semibold text-white truncate mt-1">
                    {selectedDoc.title}
                  </h3>
                  {selectedDoc.issuer && (
                    <p className="text-xs sm:text-sm font-sans text-white/70 truncate mt-0.5">
                      Issued by {selectedDoc.issuer}
                    </p>
                  )}
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                  {selectedDoc.type === "pdf" && (
                    <a
                      href={selectedDoc.file}
                      download
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/25 hover:bg-accent/35 border border-accent/40 text-xs sm:text-sm font-sans font-medium text-white transition-all flex items-center gap-1.5 sm:gap-2 shadow-sm cursor-pointer"
                      title="Download PDF"
                    >
                      <Download size={14} className="text-accent" />
                      <span className="hidden sm:inline">Download</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="p-2 sm:p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.16] border border-white/[0.1] text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close document viewer"
                  >
                    <X size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Main Document Content Canvas */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] max-h-[66dvh] overflow-hidden bg-black/60 p-1.5 sm:p-4 flex items-center justify-center">
                {selectedDoc.type === "pdf" ? (
                  <div className="w-full h-full min-h-[360px] sm:min-h-[440px] flex flex-col items-center justify-center rounded-lg sm:rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c0817]">
                    <iframe
                      src={`${selectedDoc.file}#toolbar=0&navpanes=0`}
                      className="w-full h-full min-h-[360px] sm:min-h-[440px] rounded-lg"
                      title={selectedDoc.title}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full max-h-[64dvh] aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center">
                    <Image
                      src={selectedDoc.file}
                      alt={selectedDoc.title}
                      fill
                      sizes="(max-width: 1024px) 95vw, 80vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                )}
              </div>

              {/* Document Caption & Verification Footer */}
              {selectedDoc.description && (
                <div className="px-4 sm:px-7 py-2.5 sm:py-3.5 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
                  <p className="text-xs sm:text-sm font-sans font-normal text-white/80 leading-relaxed truncate mr-4">
                    {selectedDoc.description}
                  </p>
                  <span className="shrink-0 inline-flex items-center gap-1.5 text-accent text-xs sm:text-sm font-sans font-semibold">
                    <CheckCircle2 size={15} />
                    <span className="hidden min-[400px]:inline">Verified Document</span>
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. COMPLETE CREDENTIAL ARCHIVE MODAL                                      */}
      {/* Full in-page archive containing every single certificate & document (12)  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isFullArchiveOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: CINEMATIC_EASE }}
            className="fixed inset-0 z-[210] bg-black/94 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-5 md:p-8 cursor-zoom-out"
            onClick={() => setIsFullArchiveOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Complete Career & Credentials Archive"
            data-lenis-prevent="true"
          >
            <motion.div
              initial={{ scale: 0.95, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 16, opacity: 0 }}
              transition={{ duration: 0.32, ease: CINEMATIC_EASE }}
              className="relative w-full max-w-5xl max-h-[90dvh] bg-[#0a0614] border border-white/[0.14] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col cursor-default"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
            >
              {/* Archive Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-white/[0.08] bg-white/[0.02] gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-0.5 sm:py-1 rounded-full bg-accent/25 border border-accent/40 text-xs font-sans font-semibold text-accent">
                      Complete Career Archive
                    </span>
                    <span className="text-xs sm:text-sm font-sans text-white/60">
                      12 Total Verified Documents
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-white mt-1 sm:mt-1.5">
                    All Credentials & Verification Records
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-normal text-white/70 mt-0.5 sm:mt-1">
                    Select any credential below to open the high-resolution in-page document viewer.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => setIsFullArchiveOpen(false)}
                    className="p-2 sm:p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.16] border border-white/[0.1] text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close archive"
                  >
                    <X size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Category Filter Tabs with prominent ALL filter */}
              <div className="px-4 sm:px-8 py-3 sm:py-4 border-b border-white/[0.08] bg-black/60 flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
                {(
                  [
                    { key: "all", label: "All Credentials", count: allArchiveDocuments.length },
                    { key: "experience", label: "Arkensys Internship", count: arkensysDocuments.length },
                    { key: "technical", label: "Python & Dev", count: pythonDocuments.length },
                    { key: "design", label: "Design Thinking", count: designThinkingDocuments.length },
                    { key: "hackathon", label: "Hackathons", count: hackathonDocuments.length },
                    { key: "honors", label: "Honors & Athletics", count: honorsDocuments.length },
                  ] as const
                ).map((tab) => {
                  const isActive = archiveFilter === tab.key;
                  const isAllTab = tab.key === "all";

                  let tabStyles = "";
                  if (isAllTab) {
                    tabStyles = isActive
                      ? "bg-purple-600 text-white shadow-[0_0_24px_rgba(167,139,250,0.65)] border border-purple-300 font-semibold ring-2 ring-purple-400/40"
                      : "bg-white/[0.06] text-white/90 hover:text-white hover:bg-white/[0.12] border border-purple-500/35 font-medium";
                  } else {
                    tabStyles = isActive
                      ? "bg-accent text-white shadow-[0_0_18px_rgba(167,139,250,0.4)] border border-purple-400/60 font-semibold"
                      : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/[0.1] font-normal";
                  }

                  return (
                    <button
                      key={tab.key}
                      onClick={() => setArchiveFilter(tab.key)}
                      className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 shrink-0 flex items-center gap-2 cursor-pointer ${tabStyles}`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? "bg-white/25 text-white"
                            : isAllTab
                            ? "bg-purple-500/30 text-purple-200"
                            : "bg-white/[0.08] text-white/60"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Archive Grid */}
              <div
                className="p-6 sm:p-8 overflow-y-auto max-h-[60vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                data-lenis-prevent="true"
              >
                {filteredArchive.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedDoc(doc);
                    }}
                    className="group rounded-2xl border border-white/[0.1] hover:border-purple-400/50 bg-gradient-to-b from-[#130b22]/80 to-[#0b0614]/95 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(167,139,250,0.2)] hover:-translate-y-1 cursor-pointer"
                  >
                    <div>
                      {/* Document Preview Thumbnail */}
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.1] bg-[#07040e] mb-3.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={doc.thumbnail || doc.file}
                          alt={doc.title}
                          className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/20 text-xs font-sans font-medium text-white/95">
                          {doc.badgeText}
                        </div>
                      </div>

                      {/* Document Info */}
                      <h4 className="text-base sm:text-lg font-heading font-semibold text-white group-hover:text-purple-200 transition-colors line-clamp-1">
                        {doc.title}
                      </h4>
                      {doc.issuer && (
                        <p className="text-xs sm:text-sm font-sans text-purple-200/90 mt-1 truncate">
                          {doc.issuer}
                        </p>
                      )}
                      {doc.date && (
                        <p className="text-xs font-sans text-white/50 mt-0.5">
                          {doc.date}
                        </p>
                      )}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs sm:text-sm font-sans font-semibold text-accent group-hover:text-accent-light">
                      <span className="flex items-center gap-1.5">
                        <Eye size={15} />
                        <span>Inspect Document</span>
                      </span>
                      <ExternalLink size={15} className="text-white/40 group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Archive Footer */}
              <div className="px-6 sm:px-8 py-4 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-xs sm:text-sm font-sans text-white/70">
                <span>
                  Showing {filteredArchive.length} of {allArchiveDocuments.length} total credentials
                </span>
                <button
                  onClick={() => setIsFullArchiveOpen(false)}
                  className="px-6 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CertificatesExperience;
