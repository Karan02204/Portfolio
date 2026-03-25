"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

// ── Helper: compute a safe stagger that always fits inside [inStart, inEnd] ──
// totalItems = combined count across ALL sibling ScrollMotionText components
// that share the same range (so stagger is consistent across "&" + "engineering.")
function safeStagger(
  inStart: number,
  inEnd: number,
  totalItems: number,
  charMode: boolean,
): { stagger: number; itemDuration: number } {
  const itemDuration = charMode ? 0.04 : 0.08;
  const budget       = inEnd - inStart;
  const maxStagger   = totalItems > 1
    ? (budget - itemDuration) / (totalItems - 1)
    : 0;
  const preferred    = charMode ? 0.015 : 0.025;
  return { stagger: Math.min(preferred, maxStagger), itemDuration };
}

function ScrollMotionText({
  text,
  progress,
  range,
  className = "",
  baseStagger = 0,
  charMode = false,
  totalItems,          // pass total item count across all sibling instances
}: {
  text: string;
  progress: MotionValue<number>;
  range: number[];
  className?: string;
  baseStagger?: number;
  charMode?: boolean;
  totalItems?: number;
}) {
  const items    = charMode ? text.split("") : text.split(" ");
  const inStart  = range[0];
  const inEnd    = range[1];
  const outStart = range[2];
  const outEnd   = range[3];

  // Total items defaults to this component's own count if not supplied
  const total = totalItems ?? (baseStagger + items.length);
  const { stagger, itemDuration } = safeStagger(inStart, inEnd, total, charMode);

  return (
    <span className={className}>
      {items.map((item, i) => {
        const globalI = baseStagger + i;
        const start   = inStart + globalI * stagger;
        // end must never exceed outStart (monotonic guarantee)
        const end     = Math.min(start + itemDuration, outStart - 0.001);

        const opacity = useTransform(
          progress,
          [start, end, outStart, outEnd],
          [0, 1, 1, 0],
        );
        const y = useTransform(
          progress,
          [start, end, outStart, outEnd],
          [30, 0, 0, -30],
        );

        const isSpace = item === " ";

        return (
          <motion.span
            key={i}
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
      })}
    </span>
  );
}

export default function Overlay({
  scrollYProgress: externalScrollYProgress,
}: {
  scrollYProgress?: MotionValue<number>;
} = {}) {
  const { scrollYProgress: internalScrollYProgress } = useScroll();
  const scrollYProgress = externalScrollYProgress || internalScrollYProgress;

  return (
    <div className="absolute inset-0 z-10 h-full w-full pointer-events-none">

      {/* Section 1: Introduction */}
      <Section>
        <div
          className="relative flex items-center justify-center w-full h-full text-center"
          style={{ fontFamily: "var(--font-inconsolata)" }}
        >
          {/* First Sequence: KARAN */}
          <div className="absolute w-full flex justify-center items-center">
            <h1 className="text-[7rem] md:text-[16rem] leading-none font-bold tracking-tighter text-white drop-shadow-lg overflow-hidden">
              <ScrollMotionText
                text="KARAN"
                progress={scrollYProgress}
                range={[0, 0.06, 0.12, 0.18]}
                charMode={true}
              />
            </h1>
          </div>

          {/* Second Sequence: WEB DEVELOPER */}
          <div className="absolute w-full flex flex-col justify-center items-center">
            <h2 className="text-6xl md:text-[10rem] text-center flex flex-col items-center leading-none font-bold tracking-tighter text-white drop-shadow-lg overflow-hidden">
              {/* WEB = 1 word, DEVELOPER = 1 word, total = 2 items */}
              <div className="block">
                <ScrollMotionText
                  text="WEB"
                  progress={scrollYProgress}
                  range={[0.22, 0.28, 0.36, 0.42]}
                  charMode={false}
                  totalItems={2}
                  baseStagger={0}
                />
              </div>
              <div className="block">
                <ScrollMotionText
                  text="DEVELOPER"
                  progress={scrollYProgress}
                  range={[0.22, 0.28, 0.36, 0.42]}
                  charMode={false}
                  totalItems={2}
                  baseStagger={1}
                />
              </div>
            </h2>
          </div>
        </div>
      </Section>

      {/* Section 2: Statement */}
      {/* "I build digital" = 3 words, "experiences." = 1 word, total = 4 */}
      <Section>
        <div className="w-full text-left overflow-hidden">
          <div className="text-5xl md:text-[6rem] font-bold leading-none tracking-wide text-white/90">
            <div className="block">
              <ScrollMotionText
                text="I build digital"
                progress={scrollYProgress}
                range={[0.48, 0.54, 0.68, 0.74]}
                totalItems={4}
                baseStagger={0}
              />
            </div>
            <div className="block mt-2">
              <ScrollMotionText
                text="experiences."
                className="[color:#f48b34]"
                progress={scrollYProgress}
                range={[0.48, 0.54, 0.68, 0.74]}
                totalItems={4}
                baseStagger={3}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: Values */}
      {/* "Bridging design" = 2 words, "&" = 1 word, "engineering." = 1 word, total = 4 */}
      <Section>
        <div className="w-full ml-auto text-right overflow-hidden">
          <div className="text-5xl md:text-[6rem] font-bold leading-none tracking-wide text-white/90">
            <div className="block">
              <ScrollMotionText
                text="Bridging design"
                progress={scrollYProgress}
                range={[0.76, 0.82, 0.88, 0.94]}
                totalItems={4}
                baseStagger={0}
              />
            </div>
            <div className="block mt-2">
              <ScrollMotionText
                text="&"
                progress={scrollYProgress}
                range={[0.62, 0.68, 0.74, 0.80]}
                totalItems={4}
                baseStagger={2}
              />
              <ScrollMotionText
                text="engineering."
                className="[color:#5086d0]"
                progress={scrollYProgress}
                range={[0.62, 0.68, 0.74, 0.80]}
                totalItems={4}
                baseStagger={3}
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 flex h-screen w-full flex-col justify-center px-4 md:px-10">
      {children}
    </div>
  );
}