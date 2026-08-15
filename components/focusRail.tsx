"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}: FocusRailProps) {
  // NOTE: every hook must run before any early return, otherwise hook order
  // changes between renders when `items` is empty. The guard lives at the
  // bottom of this function instead.
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);

  // Card spacing has to scale with the card, not be a fixed pixel value —
  // at 320px apart the cards nearly overlapped on narrow phones.
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = React.useState(0);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const measure = () => {
      const card = el.querySelector("[data-rail-card]");
      setCardWidth(card ? card.getBoundingClientRect().width : 0);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = items?.length ?? 0;
  const activeIndex = count > 0 ? wrap(0, count, active) : 0;
  const activeItem = items?.[activeIndex];

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  const visibleIndices = [-2, -1, 0, 1];

  // Safe to bail out now that every hook above has run unconditionally.
  if (!activeItem) return null;

  return (
    <div
      className={cn(
        // h-full (not a fixed 1000px) so the rail never outgrows the h-screen
        // section it sits in — a fixed height clipped the arrows and the
        // "Visit" CTA on any viewport shorter than 1000px.
        "group relative flex h-full max-h-full w-full min-h-0 flex-col justify-center overflow-hidden bg-[#131313] text-white outline-none select-none overflow-x-hidden",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeItem.imageSrc}
              alt=""
              className="h-full w-full object-cover blur-3xl saturate-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        <motion.div
          ref={stageRef}
          className="relative mx-auto flex h-[38vh] min-h-[220px] max-h-[560px] w-full max-w-6xl shrink items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // 52% of card width keeps neighbours peeking out at every size
            const xOffset = offset * (cardWidth > 0 ? cardWidth * 0.52 : 320);
            const zOffset = -dist * 180;
            const scale = isCenter ? 1 : 0.85;
            const rotateY = offset * -20;

            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
            const blur = isCenter ? 0 : dist * 6;
            const brightness = isCenter ? 1 : 0.5;

            return (
              <motion.div
                key={item.id}
                data-rail-card
                role={isCenter ? undefined : "button"}
                tabIndex={isCenter ? -1 : 0}
                aria-label={isCenter ? undefined : `Show project: ${item.title}`}
                aria-hidden={isCenter ? undefined : false}
                onKeyDown={(e) => {
                  if (isCenter) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive((p) => p + offset);
                  }
                }}
                className={cn(
                  // max-h keeps the 16/9 card inside the shrinking stage
                  "absolute aspect-[16/9] max-h-full w-[86vw] md:w-[70vw] lg:w-[60vw] 2xl:w-[1060px] rounded-2xl shadow-2xl transition-shadow duration-300",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5b22]",
                  isCenter ? "z-20 shadow-white/10" : "z-10 cursor-pointer"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => {
                  if (!isCenter) setActive((p) => p + offset);
                }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="h-full w-full rounded-2xl object-cover pointer-events-none select-none"
                />

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl bg-black/10 pointer-events-none mix-blend-multiply" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info */}
        <div className="mx-auto mt-6 xl:mt-12 flex w-full max-w-[1300px] flex-col items-center justify-between gap-4 md:gap-6 md:flex-row pointer-events-auto px-4 md:pl-[12vw] lg:pl-[20vw] xl:pl-[12vw] lg:pr-8 z-30">
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left min-h-[8rem] justify-center max-w-xl 2xl:max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <h2 className="text-3xl tracking-wide md:text-4xl text-[#ff5b22]">
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p className="text-white/90 font-sans text-sm md:text-base line-clamp-4">
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-neutral-900/80 p-1 ring-1 ring-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="rounded-full p-3 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5b22]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span aria-live="polite" className="min-w-[40px] text-center text-xs font-mono text-neutral-500">
                {activeIndex + 1} / {count}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="rounded-full p-3 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5b22]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {activeItem.href && (
              <Link
                href={activeItem.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${activeItem.title} (opens in a new tab)`}
                className="flex items-center gap-2 bg-white px-5 py-3 rounded-full text-black transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5b22]"
              >
                Visit <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}