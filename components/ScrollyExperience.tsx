"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

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
      <ScrollyCanvas scrollYProgress={scrollYProgress} />
      <Overlay scrollYProgress={scrollYProgress} />
    </div>
  );
}
