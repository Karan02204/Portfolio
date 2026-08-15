"use client";

import { useScroll, MotionValue } from "framer-motion";
import ScrollMotionText from "./ScrollMotionText";

export default function Overlay({
  scrollYProgress: externalScrollYProgress,
}: {
  scrollYProgress?: MotionValue<number>;
} = {}) {
  const { scrollYProgress: internalScrollYProgress } = useScroll();
  const scrollYProgress = externalScrollYProgress || internalScrollYProgress;

  return (
    <div className="absolute inset-0 z-10 h-full w-full pointer-events-none italic">
      
      {/* Section 1: Introduction */}
      

      {/* Section 2: Statement */}
      <Section>
        <div className="w-full text-left overflow-hidden">
          <div className="text-[2.5rem] sm:text-5xl md:text-[6rem] font-bold leading-none tracking-wide text-white/80">
            <div className="block text-wrap">
              <ScrollMotionText
                text="I build digital"
                progress={scrollYProgress}
                range={[0.48, 0.54, 0.68, 0.74]}
              />
            </div>
            <div className="block mt-2">
              <ScrollMotionText
                text="experiences."
                // className="[color:#f48b34]"
                progress={scrollYProgress}
                range={[0.48, 0.54, 0.68, 0.74]}
                baseStagger={3}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: Values */}
      <Section>
        <div className="w-full sm:w-[70%] lg:w-[40%] ml-auto text-right overflow-hidden pr-2 sm:pr-8">
          <div className="text-[2.5rem] sm:text-5xl md:text-[6rem] font-bold leading-[1.1] tracking-tight text-white/80">
            <div className="block">
              <ScrollMotionText
                text="Bridging design"
                progress={scrollYProgress}
                range={[0.80, 0.86, 0.94, 1.0]}
              />
            </div>
            <div className="block mt-2">
              <ScrollMotionText
                text="&"
                progress={scrollYProgress}
                range={[0.80, 0.86, 0.94, 1.0]}
                baseStagger={2}
              />
              <ScrollMotionText
                text="engineering."
                // className="[color:#5086d0]"
                progress={scrollYProgress}
                range={[0.80, 0.86, 0.94, 1.0]}
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