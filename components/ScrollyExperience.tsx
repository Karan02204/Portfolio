"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollMotionText from "./ScrollMotionText";
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
      <div className="fixed inset-0 flex items-center justify-center ">
        <h1 className="text-[22vw] scale-y-170 font-bold text-[white]/60 tracking-widest italic">
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
