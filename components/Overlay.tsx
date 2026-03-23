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
        <div 
          className="relative flex items-center justify-center w-full h-full text-center" 
          style={{ fontFamily: "var(--font-inconsolata)" }}
        >
          {/* First Sequence: KARAN */}
          <div className="absolute w-full flex justify-center items-center">
            <h1 className="text-[7rem] md:text-[16rem] leading-none font-bold tracking-tighter text-white drop-shadow-lg overflow-hidden">
              <ScrollMotionText
                text="KARAN"
                progress={scrollYProgress}
                range={[0, 0.06, 0.12, 0.18]} // [inStart, inEnd, outStart, outEnd]
                charMode={true}
              />
            </h1>
          </div>
          
          {/* Second Sequence: WEB DEVELOPER */}
          <div className="absolute w-full flex flex-col justify-center items-center">
            <h2 className="text-6xl md:text-[10rem] text-center flex flex-col items-center leading-none font-bold tracking-tighter text-white drop-shadow-lg overflow-hidden">
              <div className="block">
                <ScrollMotionText
                  text="WEB"
                  progress={scrollYProgress}
                  range={[0.22, 0.28, 0.36, 0.42]}
                  charMode={false}
                />
              </div>
              <div className="block">
                <ScrollMotionText
                  text="DEVELOPER"
                  progress={scrollYProgress}
                  range={[0.22, 0.28, 0.36, 0.42]}
                  baseStagger={1} // Flows continuously from WEB
                  charMode={false}
                />
              </div>
            </h2>
          </div>
        </div>
      </Section>

      {/* Section 2: Statement */}
      <Section>
        <div className="w-full text-left overflow-hidden">
          <div className="text-5xl md:text-[6rem] font-bold leading-none tracking-wide text-white/90">
            <div className="block">
              <ScrollMotionText
                text="I build digital"
                progress={scrollYProgress}
                range={[0.48, 0.54, 0.68, 0.74]}
              />
            </div>
            <div className="block mt-2">
              <ScrollMotionText
                text="experiences."
                className="text-blue-400"
                progress={scrollYProgress}
                range={[0.48, 0.54, 0.68, 0.74]}
                baseStagger={3} // Start stagger after the 3 words above
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: Values */}
      <Section>
        <div className="w-full ml-auto text-right overflow-hidden">
          <div className="text-5xl md:text-[6rem] font-bold leading-none tracking-wide text-white/90">
            <div className="block">
              <ScrollMotionText
                text="Bridging design"
                progress={scrollYProgress}
                range={[0.80, 0.86, 0.94, 1.0]}
              />
            </div>
            <div className="block mt-2">
              <ScrollMotionText
                text="&"
                progress={scrollYProgress}
                range={[0.80, 0.86, 0.94, 1.0]}
                baseStagger={2}
              />
              <ScrollMotionText
                text="engineering."
                className="text-purple-400"
                progress={scrollYProgress}
                range={[0.80, 0.86, 0.94, 1.0]}
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
    <div className="fixed top-0 left-0 flex h-screen w-full flex-col justify-center px-4 md:px-10">
      {children}
    </div>
  );
}
