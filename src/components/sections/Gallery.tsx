"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const galleryItems = [
  {
    src: "/images/internships/office-photo.webp",
    alt: "Office Workspace",
    className: "col-span-12 md:col-span-8 aspect-[16/9]"
  },
  {
    src: "/images/internships/Circuit.webp",
    alt: "Hardware Prototyping",
    className: "col-span-12 md:col-span-4 aspect-square md:aspect-[3/4]"
  },
  {
    src: "/images/certificates/TECHNOVIBE_2k26.webp",
    alt: "Technovibe Hackathon",
    className: "col-span-12 md:col-span-4 aspect-square md:aspect-[3/4]"
  },
  {
    src: "/images/certificates/Oblivion25.webp",
    alt: "Oblivion '25 Hackathon",
    className: "col-span-12 md:col-span-8 aspect-[16/9]"
  }
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 relative z-10 bg-transparent text-white overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-16 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 md:mb-24 flex items-end justify-between"
        >
          <h2 className="text-sm font-mono text-muted uppercase tracking-[0.2em]">Visuals</h2>
          <p className="hidden md:block text-sm font-mono text-muted/50 uppercase tracking-[0.1em]">Archive</p>
        </motion.div>

        {/* Editorial Magazine Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={cn("relative overflow-hidden rounded-2xl glass p-1 group", item.className)}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/5">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
