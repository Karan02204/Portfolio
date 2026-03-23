"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const categories = [
  {
    label: "Frontend",
    color: "#f48b34",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js", "Framer Motion"],
  },
  {
    label: "Backend",
    color: "#5086d0",
    skills: ["Node.js", "Express", "Python", "FastAPI", "REST APIs", "GraphQL", "Socket.io"],
  },
  {
    label: "Database",
    color: "#f48b34",
    skills: ["MongoDB", "PostgreSQL", "Redis", "Prisma", "Firebase"],
  },
  {
    label: "DevOps & Tools",
    color: "#5086d0",
    skills: ["Docker", "AWS", "Git", "CI/CD", "Linux", "Vercel", "Nginx"],
  },
];

const proficiencies = [
  { name: "React", pct: 95 },
  { name: "Node.js", pct: 88 },
  { name: "TypeScript", pct: 80 },
  { name: "MongoDB", pct: 75 },
  { name: "AWS", pct: 60 },
];

const allSkills = ["React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB", "PostgreSQL",
  "Docker", "AWS", "GraphQL", "Tailwind", "Prisma", "Redis", "Express", "FastAPI",
  "Framer Motion", "GSAP", "Three.js", "Vercel", "Git"];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgy = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section id="skills" ref={ref} className="py-32 px-6 md:px-20 relative overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Subtle Circuit Board Background — Parallax */}
      <motion.div style={{ y: bgy }} className="absolute inset-x-0 -top-1/4 -bottom-1/4 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z" fill="none" stroke="#5086d0" strokeWidth="0.5" />
            <circle cx="10" cy="10" r="2" fill="#f48b34" />
            <circle cx="90" cy="10" r="2" fill="#f48b34" />
            <path d="M 10 10 L 0 0 M 90 10 L 100 0" stroke="#f48b34" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit-grid)" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#f48b34", fontFamily: "var(--font-mono)" }}
        >
          Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-extrabold mb-16 tracking-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          The Circuit Board
        </motion.h2>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1 + 0.2, duration: 0.6 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: cat.color, fontFamily: "var(--font-mono)" }}>
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    data-cursor
                    className="px-3 py-1 rounded text-sm font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      background: `${cat.color}10`,
                      borderLeft: `3px solid ${cat.color}`,
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 12px ${cat.color}60`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Bars */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)" }}>
            Key Proficiencies
          </p>
          <div className="flex flex-col gap-4">
            {proficiencies.map((item, i) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="w-28 text-sm text-right" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)" }}>
                  {item.name}
                </span>
                <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #5086d0, #f48b34)" }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.pct}%` } : {}}
                    transition={{ delay: 0.7 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="text-xs w-8" style={{ color: "#f48b34", fontFamily: "var(--font-mono)" }}>
                  {item.pct}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Marquee */}
        <div className="overflow-hidden border-y py-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="marquee-track flex gap-10" style={{ width: "max-content" }}>
            {[...allSkills, ...allSkills].map((s, i) => (
              <span key={i} className="whitespace-nowrap text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
                {s} <span style={{ color: "#f48b34" }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
