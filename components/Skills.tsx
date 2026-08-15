"use client";

import { motion, useReducedMotion } from "framer-motion";

const frontend = ["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWINDCSS", "JAVASCRIPT", "HTML5", "CSS3", "FRAMERMOTION"];
const backend = ["MONGODB", "EXPRESS", "NODE.JS", "POSTGRESQL"];
const tools = ["C++", "PHP", "LINUX", "JAVA", "GIT", "AWS", "DOCKER", "GITHUB"];

// Repeat 3 times to create a perfect seamless geometric loop
const r1 = [...frontend, ...frontend, ...frontend];
const r2 = [...backend, ...backend, ...backend];
const r3 = [...tools, ...tools, ...tools];

const MarqueeRow = ({ items, direction = 1, speed = 40, outlined = false }: { items: string[], direction?: number, speed?: number, outlined?: boolean }) => {
  // Infinite horizontal motion is a vestibular trigger — hold the row still
  // for anyone who has asked the OS to reduce motion.
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex overflow-visible w-full">
      <motion.div
        className="flex gap-16 items-center w-max pr-16" // pr-16 ensures boundary gap is symmetric to internal gap
        animate={
          reduceMotion
            ? { x: "-16.666666%" }
            : { x: direction > 0 ? ["-33.333333%", "0%"] : ["0%", "-33.333333%"] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { repeat: Infinity, ease: "linear", duration: speed }
        }
      >
        {items.map((item, i) => (
          <span 
            key={i} 
            className={`text-[4rem] md:text-[6rem] lg:text-[6rem] 2xl:text-[8rem] italic scale-y-[1.2] tracking-normal leading-none select-none ${
              outlined 
                ? "text-transparent text-outline" 
                : "text-white/10 hover:text-[#ff5b22] transition-colors duration-500"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="relative z-20 bg-[#131313] h-screen w-full snap-start flex flex-col items-center justify-center overflow-hidden py-12 lg:py-16 2xl:py-24">

      {/* Floating Heading */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 z-30 pointer-events-none">
        <div className="flex items-end gap-4 md:gap-6 italic">
          <h2 className="text-[3rem] md:text-[6rem] lg:text-[6rem] 2xl:text-[8rem] scale-y-150 text-[#ff5b22] leading-none tracking-normal transform -rotate-3">
            SKILLS
          </h2>
        </div>
      </div>

      {/* Marquees */}
      <div className="flex flex-col gap-6 md:gap-14 transform -rotate-3 scale-110 w-[180vw] mt-10 lg:mt-16 2xl:mt-20">
        <MarqueeRow items={r1} direction={-1} speed={60} outlined={false} />
        <MarqueeRow items={r2} direction={1} speed={75} outlined={true} />
        <MarqueeRow items={r3} direction={-1} speed={50} outlined={false} />
      </div>
      
    </section>
  );
}
