"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: "3+", label: "Years Exp" },
  { value: "15+", label: "Projects" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-20" style={{ background: "var(--section-bg)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-16 items-center">

        {/* LEFT — Photo */}
        <FadeUp delay={0} className="flex justify-center">
          <div className="relative">
            <div
              className="w-64 h-80 md:w-72 md:h-96 rounded-xl overflow-hidden transition-transform duration-500"
              style={{ border: "2px solid #f48b34", transform: "rotate(3deg)" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "rotate(0deg)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "rotate(3deg)")}
            >
              <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}>
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
            <div
              className="absolute -bottom-4 -right-4 px-3 py-1 rounded font-bold text-xs tracking-[0.2em] rotate-[-12deg]"
              style={{ border: "2px solid #5086d0", color: "#5086d0", fontFamily: "var(--font-mono)" }}
            >
              FULL STACK DEV
            </div>
          </div>
        </FadeUp>

        {/* RIGHT — Bio */}
        <div className="flex flex-col gap-6">
          <FadeUp delay={0}>
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#f48b34", fontFamily: "var(--font-mono)" }}>
              About Me
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-none tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              KARAN ATTRI
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="text-xs" style={{ color: "#5086d0", fontFamily: "var(--font-mono)" }}>
              Full Stack Web Developer ─────────────────────
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-dm-sans)" }}>
              3+ years building digital experiences that live at the intersection of design &amp; engineering. I write clean code, obsess over UI polish, and ship products that users actually love.
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}>
              📍 India · Open to Remote &nbsp;·&nbsp; ✦ Available for Freelance
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                data-cursor
                className="px-6 py-3 rounded-full text-sm font-medium text-black transition-transform hover:-translate-y-1"
                style={{ background: "#f48b34", fontFamily: "var(--font-dm-sans)" }}
              >
                Download CV →
              </a>
              <a
                href="#contact"
                data-cursor
                className="px-6 py-3 rounded-full text-sm font-medium transition-transform hover:-translate-y-1"
                style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans)" }}
              >
                Let's Talk →
              </a>
            </div>
          </FadeUp>

          {/* Stats */}
          <FadeUp delay={0.4}>
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl font-extrabold" style={{ color: "#f48b34", fontFamily: "var(--font-syne)" }}>
                    {s.value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
