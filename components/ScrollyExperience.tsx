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

  // Burn starts fading in at 88% scroll and is fully visible at 100%
  // This maps to roughly frames 210-240 — the dark/burn ending of your video
  const burnOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  // Projects section peeks in from below as burn completes
  // We shift the sticky canvas up slightly at the very end to reveal what's beneath
  const canvasY = useTransform(scrollYProgress, [0.95, 1], ["0%", "0%"]);

  return (
    <>
      {/* ── Main scrollytelling container ── */}
      <div ref={containerRef} className="relative h-[1200vh]">

        {/* Layer 1: Image sequence canvas — the scrollytelling frames */}
        <ScrollyCanvas scrollYProgress={scrollYProgress} />

        {/* Layer 2: Overlay text animations */}
        <Overlay scrollYProgress={scrollYProgress} />

        {/* Layer 3: BurnTransition — sticky, sits ON TOP of the canvas
            and fades in as the user reaches the end of the scroll.
            position: sticky + top: 0 + h-screen means it always covers
            the viewport exactly like the canvas does. */}
        <motion.div
          className="sticky top-0 h-screen w-full pointer-events-none"
          style={{
            opacity: burnOpacity,
            // Pull it up so it stacks directly over the canvas
            marginTop: "-100vh",
            // Ensure it sits above canvas and overlay text
            zIndex: 20,
          }}
        >
          <BurnTransition
            color="#121212"
            transitionColor="#ffffff"
            noiseScale={0.37}
            noiseIntensity={0.3}
            scrollSensitivity={0.01}
            baseAnimationSpeed={0.1}
            edgeSoftness={0.4}
            bloomIntensity={0.5}
            bloomRadius={0.5}
            parallaxEnabled={false}
            movement={{ horizontal: "center", vertical: 0.5 }}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

      </div>

      {/* ── Projects section sits directly after — no gap ── */}
      {/* The burn transition visually "eats through" into this section */}
    </>
  );
}