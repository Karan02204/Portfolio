"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * "Scroll" affordance for first load. The hero is a canvas that only changes on
 * scroll, so without a hint it can read as a static image. Fades out as soon as
 * the user starts scrolling.
 */
export default function ScrollHint() {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  // Gone within the first 300px of scrolling
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none fixed bottom-8 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/50">
        Scroll
      </span>
      <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
        <motion.span
          className="block h-1.5 w-1 rounded-full bg-[#ff5b22]"
          animate={reduceMotion ? { y: 0 } : { y: [0, 12, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>
    </motion.div>
  );
}
