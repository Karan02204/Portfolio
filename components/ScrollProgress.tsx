"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin progress bar pinned to the top of the viewport. On a page whose hero is
 * 1200vh tall there is otherwise no signal for how far through you are — the
 * scrollbar is hidden by globals.css.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 z-[120] h-[3px] w-full origin-left bg-gradient-to-r from-[#ff5b22] to-[#5086d0]"
    />
  );
}
