"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Exanor Attendance",
    year: "2024",
    category: "Full Stack",
    tags: ["Next.js", "Node.js", "MongoDB"],
    description: "Enterprise attendance & store management system with mobile app, GPS tracking, and real-time dashboards.",
    github: "https://github.com/Karan02204",
    live: "#",
    featured: true,
  },
  {
    title: "Pitara Gifts",
    year: "2024",
    category: "Full Stack",
    tags: ["React", "Stripe", "MongoDB"],
    description: "Full-featured gift catalogue e-commerce with real-time inventory, payment integration, and order tracking.",
    github: "https://github.com/Karan02204",
    live: "#",
    featured: false,
  },
  {
    title: "POS Desktop App",
    year: "2024",
    category: "Frontend",
    tags: ["Electron", "React", "Redux"],
    description: "Native-feel desktop sales panel built with Electron, featuring auto-cart, coupon validation, and store auth.",
    github: "https://github.com/Karan02204",
    live: "#",
    featured: false,
  },
  {
    title: "Scrollytelling Portfolio",
    year: "2025",
    category: "Frontend",
    tags: ["Next.js", "Framer Motion", "Canvas"],
    description: "Cinematic scroll-linked image-sequence portfolio with custom text animations and Cloudinary CDN integration.",
    github: "https://github.com/Karan02204",
    live: "#",
    featured: false,
  },
];

const filters = ["All", "Frontend", "Full Stack", "API/Backend"];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);
  const featured = projects.find(p => p.featured);
  const grid = filtered.filter(p => !p.featured || active !== "All");

  return (
    <section id="projects" ref={ref} className="py-32 px-6 md:px-20" style={{ background: "var(--section-bg)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#f48b34", fontFamily: "var(--font-inconsolata)" }}
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-extrabold mb-12 tracking-tight"
          style={{ fontFamily: "var(--font-gued)" }}
        >
          Case Files
        </motion.h2>

        {/* Filters */}
        <div className="flex gap-3 mb-12 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              data-cursor
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "var(--font-gued)",
                background: active === f ? "#f48b34" : "rgba(255,255,255,0.05)",
                color: active === f ? "#000" : "rgba(255,255,255,0.6)",
                border: "1px solid " + (active === f ? "#f48b34" : "rgba(255,255,255,0.1)"),
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured Card */}
        {active === "All" && featured && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden mb-12 group"
            style={{ background: "var(--card-bg)", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#f48b34")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            {/* Top-left corner accent */}
            <div className="absolute top-0 left-0 w-1 h-1" style={{ background: "#f48b34" }} />
            <div className="p-8 md:p-0 flex flex-col md:flex-row min-h-[400px]">
              {/* Mockup Area */}
              <div className="md:w-1/2 p-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #5086d010, #f48b3410)" }}>
                <div className="w-full aspect-video rounded-lg shadow-2xl flex items-center justify-center text-5xl" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.5)" }}>
                  🖼️
                </div>
              </div>

              {/* Details Area */}
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#f48b34", fontFamily: "var(--font-inconsolata)" }}>
                  Featured · {featured.year}
                </p>
                <h3 className="text-4xl font-extrabold mb-4" style={{ fontFamily: "var(--font-gued)" }}>
                  {featured.title}
                </h3>
                <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-gued)" }}>
                  {featured.description}
                </p>
                <div className="flex gap-2 flex-wrap mb-8">
                  {featured.tags.map(t => (
                    <span key={t} className="px-3 py-1 rounded text-xs" style={{ background: "#5086d020", color: "#5086d0", border: "1px solid #5086d040", fontFamily: "var(--font-inconsolata)" }}>{t}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={featured.github} data-cursor className="px-5 py-2 rounded-full text-sm transition-transform hover:-translate-y-1" style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-gued)" }}>GitHub ↗</a>
                  <a href={featured.live} data-cursor className="px-5 py-2 rounded-full text-sm text-black transition-transform hover:-translate-y-1" style={{ background: "#f48b34", fontFamily: "var(--font-gued)" }}>Live Demo ↗</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {(active === "All" ? projects.filter(p => !p.featured) : filtered).map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative rounded-xl overflow-hidden group transition-transform duration-300 hover:-translate-y-3"
                style={{ background: "var(--card-bg)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#f48b34")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                data-cursor
                data-cursor-text="VIEW"
              >
                {/* Color accent tab */}
                <div className="absolute top-0 left-0 w-1 h-1" style={{ background: "#f48b34" }} />

                {/* Gradient preview area */}
                <div className="h-40 w-full" style={{ background: "linear-gradient(135deg, #5086d015, #f48b3415)" }} />

                <div className="p-6">
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#f48b34", fontFamily: "var(--font-inconsolata)" }}>
                    {project.category} · {project.year}
                  </p>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-gued)" }}>{project.title}</h3>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {project.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: "#5086d015", color: "#5086d0", fontFamily: "var(--font-inconsolata)" }}>{t}</span>
                    ))}
                  </div>
                  <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-gued)" }}>
                    {project.description}
                  </p>
                  <div className="flex gap-3">
                    <a href={project.github} data-cursor className="text-xs link-underline" style={{ color: "rgba(255,255,255,0.5)" }}>GitHub ↗</a>
                    <a href={project.live} data-cursor className="text-xs link-underline" style={{ color: "#f48b34" }}>Live Demo ↗</a>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, #5086d0, #f48b34)" }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
