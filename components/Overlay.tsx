"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="absolute inset-0 z-10 h-full w-full pointer-events-none">
      {/* Section 1: Introduction */}
      <Section opacity={useTransform(scrollYProgress, [0, 0.15], [1, 0])}>
        <div className="text-center">
          <h1 className="text-[7rem] md:text-[16rem] leading-none font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
            Karan
          </h1>
          <p className="text-3xl md:text-5xl text-gray-300 font-light tracking-widest uppercase mt-4">
            Full Stack Web Developer
          </p>
        </div>
      </Section>

      {/* Section 2: Statement */}
      <Section opacity={useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0])}>
        <div className="ml-10 md:ml-32 max-w-lg text-left">
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white/90">
            I build digital <br />
            <span className="text-blue-400">experiences.</span>
          </h2>
        </div>
      </Section>

      {/* Section 3: Values */}
      <Section opacity={useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0])}>
        <div className="mr-10 md:mr-32 ml-auto max-w-lg text-right">
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white/90">
            Bridging design <br />
            & <span className="text-purple-400">engineering.</span>
          </h2>
        </div>
      </Section>
    </div>
  );
}

function Section({ children, opacity }: { children: React.ReactNode; opacity: MotionValue<number> }) {
  return (
    <motion.div
      style={{ opacity }}
      className="fixed top-0 left-0 flex h-screen w-full flex-col justify-center px-8 md:px-20"
    >
      {children}
    </motion.div>
  );
}
