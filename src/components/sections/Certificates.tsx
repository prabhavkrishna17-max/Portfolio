"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function Certificates() {
  const certificates = [
    { title: "Design Thinking Bootcamp", file: "Bootcamp.webp", type: "image" },
    { title: "Basketball Zone Level Winner", file: "BasketBall-Cert.webp", type: "image" },
    { title: "HackNext'25", file: "HackkNext.webp", type: "image" },
    { title: "Oblivion'25", file: "Oblivion25.webp", type: "image" },
    { title: "DT Project Expo", file: "DT.webp", type: "image" },
    { title: "Scaler Python", file: "Python_Scalar.webp", type: "image" },
    { title: "Technovibe 2k26", file: "TECHNOVIBE_2k26.webp", type: "image" },
  ];

  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    if (selectedCert) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedCert]);

  return (
    <section className="py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-sm font-mono text-muted uppercase tracking-[0.2em] mb-4">Proof of Work</h2>
          <p className="text-3xl md:text-5xl font-heading font-medium tracking-tight text-white">Exhibition</p>
        </motion.div>
      </div>

      {/* Premium Horizontal Slider */}
      <div className="w-full relative">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-6 md:pl-8 lg:pl-16 pr-6 md:pr-8 lg:pr-16 pb-12 gap-6 md:gap-10">
          
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative shrink-0 snap-center w-[85vw] md:w-[60vw] lg:w-[45vw] group cursor-pointer"
              onClick={() => setSelectedCert(cert.file)}
            >
              <div className="relative h-[50vh] md:h-[60vh] w-full rounded-2xl overflow-hidden glass p-1.5 transition-all duration-700 hover:scale-[1.02]">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#050505]">
                  <Image
                    src={`/images/certificates/${cert.file}`}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 60vw, 45vw"
                    className="object-cover opacity-60 mix-blend-screen group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700"
                  />
                  
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10">
                    <h3 className="text-xl md:text-2xl font-heading font-medium text-white group-hover:-translate-y-2 transition-transform duration-500">
                      {cert.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedCert(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCert(null);
              }}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-full max-h-[85vh] rounded-2xl overflow-hidden glass p-2 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#050505]">
                <Image
                  src={`/images/certificates/${selectedCert}`}
                  alt="Certificate Full View"
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
