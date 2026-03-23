"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";

// A custom text animator that hooks precisely into the scroll bar.
// It splits strings into words or characters and perfectly staggers their 
// y-offset and opacity along the track.
function ScrollMotionText({
  text,
  progress,
  range,
  className = "",
  baseStagger = 0,
  charMode = false,
}: {
  text: string;
  progress: MotionValue<number>;
  range: number[];
  className?: string;
  baseStagger?: number;
  charMode?: boolean;
}) {
  const items = charMode ? text.split("") : text.split(" ");
  // Wider stagger for distinct one-by-one effect
  const stagger = charMode ? 0.015 : 0.025;
  // Shorter individual fade duration so they snap in crisply
  const itemDuration = charMode ? 0.04 : 0.08;

  const isIntro = range.length === 3;
  const inStart = range[0];
  const outStart = isIntro ? range[1] : range[2];
  const outEnd = isIntro ? range[2] : range[3];

  return (
    <span className={className}>
      {items.map((item, i) => {
        const globalI = baseStagger + i;
        const start = inStart + globalI * stagger;
        const end = start + itemDuration; // Individual letter finishes fading in

        // Animate up from 30px, hold at 0, go up to -30px 
        const opacity = useTransform(progress, [start, end, outStart, outEnd], [0, 1, 1, 0]);
        const y = useTransform(progress, [start, end, outStart, outEnd], [30, 0, 0, -30]);
        
        const isSpace = item === " ";

        return (
          <motion.span
            key={i}
            style={{
              opacity,
              y,
              display: "inline-block",
              whiteSpace: isSpace ? "pre" : "normal",
            }}
            className={!charMode ? "mr-3 md:mr-4" : ""}
          >
            {item}
          </motion.span>
        );
      })}
    </span>
  );
}

export default function Overlay({
  scrollYProgress: externalScrollYProgress,
}: {
  scrollYProgress?: MotionValue<number>;
} = {}) {
  const { scrollYProgress: internalScrollYProgress } = useScroll();
  const scrollYProgress = externalScrollYProgress || internalScrollYProgress;

  return (
    <div className="absolute inset-0 z-10 h-full w-full pointer-events-none">
      
      {/* Section 1: Introduction */}
      <Section>
        <div className="text-center">
          <h1 className="text-[7rem] md:text-[16rem] leading-none font-bold tracking-tighter mb-4 text-white drop-shadow-lg overflow-hidden">
            <ScrollMotionText
              text="KARAN"
              progress={scrollYProgress}
              range={[0, 0.2, 0.3]} // [inStart, inEnd, outEnd]
              charMode={true}
            />
          </h1>
          <div className="text-3xl md:text-5xl text-gray-300 font-light tracking-widest uppercase mt-4 overflow-hidden">
            <ScrollMotionText
              text="Full Stack Web Developer"
              progress={scrollYProgress}
              range={[0.05, 0.2, 0.3]} 
              charMode={false} // word by word
            />
          </div>
        </div>
      </Section>

      {/* Section 2: Statement */}
      <Section>
        <div className="ml-5 md:ml-32 w-full text-left overflow-hidden">
          <div className="text-6xl md:text-[7rem] font-bold leading-none tracking-tighter text-white/90">
            <div className="block">
              <ScrollMotionText
                text="I build digital"
                progress={scrollYProgress}
                range={[0.30, 0.38, 0.55, 0.65]}
              />
            </div>
            <div className="block mt-2">
              <ScrollMotionText
                text="experiences."
                className="text-blue-400"
                progress={scrollYProgress}
                range={[0.30, 0.38, 0.55, 0.65]}
                baseStagger={3} // Start stagger after the 3 words above
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: Values */}
      <Section>
        <div className="mr-5 md:mr-32 ml-auto w-full text-right overflow-hidden">
          <div className="text-6xl md:text-[7rem] font-bold leading-none tracking-tighter text-white/90">
            <div className="block">
              <ScrollMotionText
                text="Bridging design"
                progress={scrollYProgress}
                range={[0.65, 0.73, 0.90, 1.0]}
              />
            </div>
            <div className="block mt-2">
              <ScrollMotionText
                text="&"
                progress={scrollYProgress}
                range={[0.65, 0.73, 0.90, 1.0]}
                baseStagger={2}
              />
              <ScrollMotionText
                text="engineering."
                className="text-purple-400"
                progress={scrollYProgress}
                range={[0.65, 0.73, 0.90, 1.0]}
                baseStagger={3}
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 flex h-screen w-full flex-col justify-center px-8 md:px-20">
      {children}
    </div>
  );
}
