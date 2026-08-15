"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global smooth-scroll provider.
 *
 * - Drives Lenis from the GSAP ticker (single rAF loop for the whole site).
 * - Keeps ScrollTrigger in sync so ScrollFloat / ScrollReveal stay accurate.
 * - `allowNestedScroll` lets the snap-mandatory container in app/page.tsx keep
 *   its native scrolling (CSS scroll-snap only behaves natively), while Lenis
 *   takes back over once that container hits its top/bottom edge.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      // gsap ticker time is in seconds, Lenis expects milliseconds
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        // feel
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        // touch devices already have native inertia — leave it alone
        syncTouch: false,
        smoothWheel: true,
        // behaviour
        anchors: false, // the Sidebar handles anchors itself
        allowNestedScroll: true,
        autoRaf: false, // we drive it from the gsap ticker above
        respectReducedMotion: true,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

/** Tells ScrollTrigger to recalculate on every Lenis frame. */
function ScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // positions can shift once fonts/images settle
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(id);
  }, []);

  return null;
}
