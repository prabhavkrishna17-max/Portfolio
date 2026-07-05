"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Certificates() {
  const certificates = [
    { title: "Design Thinking Bootcamp", file: "Bootcamp.jpeg", type: "image" },
    { title: "Basketball Zone Level Winner", file: "BasketBall-Cert.jpg", type: "image" },
    { title: "HackNext'25", file: "HackkNext.jpg", type: "image" },
    { title: "Oblivion'25", file: "Oblivion25.jpg", type: "image" },
    { title: "DT Project Expo", file: "DT.jpg", type: "image" },
    { title: "Scaler Python", file: "Python_Scalar.jpg", type: "image" },
    { title: "Technovibe 2k26", file: "TECHNOVIBE_2k26.jpg", type: "image" },
    { title: "FIESTAA'26 Participation", file: "Fiestaa.jpg", type: "image" }
  ];

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
              className="relative shrink-0 snap-center w-[85vw] md:w-[60vw] lg:w-[45vw] group"
            >
              <div className="relative h-[50vh] md:h-[60vh] w-full rounded-2xl overflow-hidden glass p-1.5 transition-all duration-700 hover:scale-[1.02]">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#050505]">
                  <Image
                    src={`/assets/certificates/${cert.file}`}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 60vw, 45vw"
                    className="object-cover opacity-60 mix-blend-screen group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700"
                  />
                  
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10">
                    <h3 className="text-xl md:text-2xl font-heading font-medium text-white">
                      {cert.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
