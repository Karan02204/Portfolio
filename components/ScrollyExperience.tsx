"use client";

import { useRef, useEffect } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function ScrollyExperience({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v >= 0.99) onComplete?.();
    });
  }, [scrollYProgress, onComplete]);

  return (
    <div ref={containerRef} className="relative h-[1200vh]">
      <ScrollyCanvas scrollYProgress={scrollYProgress} />
      <Overlay scrollYProgress={scrollYProgress} />
    </div>
  );
}
