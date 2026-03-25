"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";
import BurnTransition from "./BurnTransition";

export default function ScrollyExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The burn wipe: translateY goes from +100% (fully below viewport) to 0%
  // (fully covering viewport). This happens in the last 15% of scroll.
  // Result: the burn component physically slides UP from the bottom — 
  // combined with its own wavy torn-paper edge, it looks like fire eating upward.
  const burnY = useTransform(scrollYProgress, [0.85, 1], ["100%", "0%"]);

  // Simultaneously, push the canvas upward slightly so it feels like
  // the burn is consuming it from below
  const canvasY = useTransform(scrollYProgress, [0.85, 1], ["0%", "-4%"]);

  return (
    <div ref={containerRef} className="relative h-[1200vh]">

      {/* Layer 1: Image sequence canvas */}
      <motion.div
        className="sticky top-0 h-screen w-full"
        style={{ y: canvasY }}
      >
        <ScrollyCanvas scrollYProgress={scrollYProgress} />
      </motion.div>

      {/* Layer 2: Overlay text — sits above canvas */}
      <Overlay scrollYProgress={scrollYProgress} />

      {/* Layer 3: Burn wipe — sticky, slides UP from bottom over the canvas.
          The outer div is sticky and full-screen.
          The inner motion.div translates from 100% → 0%, 
          creating a bottom-to-top wipe of the burn effect.
          overflow-hidden on the outer div clips anything below the viewport. */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none"
        style={{
          marginTop: "-100vh", // stack directly over canvas layer
          zIndex: 30,
        }}
      >
        <motion.div
          className="absolute inset-0 w-full"
          style={{
            y: burnY,
            // Make it taller than viewport so the wavy top edge
            // of the burn is always visible as it enters from below
            height: "140%",
            top: "-40%",
          }}
        >
          <BurnTransition
            color="#121212"
            transitionColor="#ffffffff"
            noiseScale={0.37}
            noiseIntensity={0.45}
            scrollSensitivity={0}
            baseAnimationSpeed={0.08}
            edgeSoftness={0.5}
            bloomIntensity={0.6}
            bloomRadius={0.4}
            parallaxEnabled={false}
            movement={{ horizontal: "center", vertical: 0.3 }}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
      </div>

    </div>
  );
}