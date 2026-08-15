"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  /** Public credential URL. Add one and the row becomes a real link. */
  url?: string;
};

// TODO: drop the verification URL into `url` for each of these — an
// unverifiable certificate list reads as filler to a reviewer.
const certificates: Certificate[] = [
  { id: 1, title: "Meta React Basics", issuer: "Coursera", year: "2025" },
  { id: 2, title: "Social Networks", issuer: "NPTEL", year: "2025" },
  { id: 3, title: "DSA Training", issuer: "Hitbullseye", year: "2025" },
  { id: 4, title: "Fundamentals of Networking", issuer: "Coursera", year: "2024" },
];

export default function Certificates() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="certificates" className="relative z-20 bg-[#131313] h-screen w-full snap-start flex flex-col items-center justify-center overflow-hidden py-12 lg:py-16 2xl:py-24">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5086d0]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="w-full max-w-[1700px] mx-auto px-10 flex flex-col items-start z-10 w-full">
        
        {/* Floating Background Text */}
        <div className="absolute top-24 lg:top-32 left-10 lg:left-32 pointer-events-none opacity-50 z-0">
          <h1 className="text-[10rem] md:text-[18rem] lg:text-[16rem] 2xl:text-[24rem] font-bold text-transparent text-outline leading-none opacity-5 -rotate-2 scale-150 transform translate-x-20">
            PROVEN
          </h1>
        </div>

        {/* Title */}
        <div className="flex items-end gap-6 italic mb-10 md:mb-16 z-10 w-full justify-center lg:justify-start lg:pl-[6vw]">
          <h1 className="text-[3rem] md:text-[5rem] lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[8rem] scale-y-150 scale-x-110 text-[#ff5b22] leading-none tracking-normal">
            CERTI
          </h1>
          <h1 className="text-[3rem] md:text-[5rem] lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[8rem] scale-y-150 scale-x-110 leading-none tracking-normal text-transparent ml-[3%] md:ml-[2%] lg:ml-[2%]">
            <span className="text-outline">FICATES</span>
          </h1>
        </div>

        {/* Interactive List */}
        <div className="w-full flex flex-col border-t border-white/5 z-10 relative">
          {certificates.map((cert, index) => {
            const isHovered = hoveredIndex === index;
            const Wrapper = cert.url ? motion.a : motion.div;

            return (
              <Wrapper
                key={cert.id}
                {...(cert.url
                  ? {
                      href: cert.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": `${cert.title}, ${cert.issuer} ${cert.year} (opens in a new tab)`,
                    }
                  : {})}
                className={`group relative flex items-center justify-between py-6 md:py-8 lg:py-6 xl:py-10 border-b border-white/5 overflow-hidden rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5b22] ${
                  cert.url ? "cursor-pointer" : "cursor-default"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
              >
                {/* Number & Title Group */}
                <motion.div 
                  className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10 relative z-10"
                  animate={{ x: isHovered ? 40 : 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                >
                  <span className={`font-mono text-sm md:text-lg tracking-widest block mb-2 md:mb-0 transition-colors duration-300 ${isHovered ? 'text-[#ff5b22]' : 'text-white/20'}`}>
                    0{index + 1}
                  </span>
                  
                  <h2 className={`text-4xl md:text-5xl lg:text-5xl 2xl:text-7xl font-bold tracking-tight italic scale-y-110 transition-colors duration-300 ${isHovered ? 'text-transparent text-outline' : 'text-white'}`}>
                    {cert.title}
                  </h2>
                </motion.div>
                
                {/* Issuer & Year Group */}
                <div className="flex flex-col items-end z-10">
                  <span className={`text-xl md:text-3xl italic tracking-wider transition-colors duration-300 ${isHovered ? 'text-[#ff5b22]' : 'text-white/40'}`}>
                    {cert.issuer}
                  </span>
                  <span className="text-white/45 font-mono text-sm md:text-base mt-2">
                    {"// "}{cert.year}
                  </span>
                </div>

                {/* Hover Background Shimmer Line */}
                <motion.div 
                  className="absolute bottom-[-1px] left-0 h-[2px] bg-[#ff5b22] z-20"
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                />
              </Wrapper>
            )
          })}
        </div>

      </div>
    </section>
  );
}
