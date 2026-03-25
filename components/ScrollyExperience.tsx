"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

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

export default function ScrollyExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Tracks progress exactly from when container hits top of viewport 
    // to when container bottom hits bottom of viewport.
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[1200vh]">
      <div className="fixed inset-0 flex items-center justify-center z-0">
        <h1 className="text-[24vw] scale-y-170 font-bold text-white/50 tracking-widest">
          <ScrollMotionText
                text="KARAN"
                progress={scrollYProgress}
                range={[0, 0.06, 0.12, 0.18]} // [inStart, inEnd, outStart, outEnd]
                charMode={true}
          />
        </h1>
      </div>
      <ScrollyCanvas scrollYProgress={scrollYProgress} />
      <Overlay scrollYProgress={scrollYProgress} />
    </div>
  );
}
