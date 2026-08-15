"use client";

import { useTransform, motion, MotionValue } from "framer-motion";

/**
 * Splits a string into words or characters and staggers each one's opacity and
 * y-offset along a scroll progress track.
 *
 * Each item renders as its own <AnimatedItem /> component. That is deliberate:
 * calling useTransform inside a .map() callback would tie the number of hook
 * calls to the length of the text, so editing a string would change hook order
 * mid-render and crash React.
 */

function AnimatedItem({
  item,
  progress,
  start,
  end,
  outStart,
  outEnd,
  charMode,
}: {
  item: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  outStart: number;
  outEnd: number;
  charMode: boolean;
}) {
  // Animate up from 30px, hold at 0, then continue up to -30px on the way out.
  const opacity = useTransform(progress, [start, end, outStart, outEnd], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end, outStart, outEnd], [30, 0, 0, -30]);

  const isSpace = item === " ";

  return (
    <motion.span
      style={{
        opacity,
        y,
        display: "inline-block",
        whiteSpace: isSpace ? "pre" : "normal",
      }}
      className={!charMode ? "mr-3 md:mr-4" : ""}
    >
      {item}
    </motion.span>
  );
}

export default function ScrollMotionText({
  text,
  progress,
  range,
  className = "",
  baseStagger = 0,
  charMode = false,
}: {
  text: string;
  progress: MotionValue<number>;
  range: number[];
  className?: string;
  baseStagger?: number;
  charMode?: boolean;
}) {
  const items = charMode ? text.split("") : text.split(" ");
  // Wider stagger for a distinct one-by-one effect
  const stagger = charMode ? 0.015 : 0.025;
  // Shorter individual fade duration so they snap in crisply
  const itemDuration = charMode ? 0.04 : 0.08;

  const isIntro = range.length === 3;
  const inStart = range[0];
  const outStart = isIntro ? range[1] : range[2];
  const outEnd = isIntro ? range[2] : range[3];

  return (
    <span className={className}>
      {items.map((item, i) => {
        const globalI = baseStagger + i;
        const start = inStart + globalI * stagger;

        return (
          <AnimatedItem
            key={i}
            item={item}
            progress={progress}
            start={start}
            end={start + itemDuration}
            outStart={outStart}
            outEnd={outEnd}
            charMode={charMode}
          />
        );
      })}
    </span>
  );
}
