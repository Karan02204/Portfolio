"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com/Karan02204", icon: "GH" },
  { label: "LinkedIn", href: "#", icon: "LI" },
  { label: "Twitter", href: "#", icon: "TW" },
  { label: "Dribbble", href: "#", icon: "DR" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("karan@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-40 px-6 md:px-20 text-center relative overflow-hidden" style={{ background: "var(--section-bg)" }}>
      {/* Subtle spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(244,139,52,0.06), transparent 70%)" }} />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold leading-none mb-4" style={{ fontFamily: "var(--font-gued)" }}>
            <span style={{ color: "#5086d0", fontWeight: 300 }}>LET'S </span>
            <span>BUILD </span>
            <br />
            <span style={{ color: "#5086d0", fontWeight: 300 }}>SOMETHING </span>
            <span style={{ color: "#f48b34" }}>GREAT</span>
          </h2>
          <p className="text-sm mt-6 mb-12" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-gued)" }}>
            Available for freelance &amp; full-time opportunities
          </p>

          {/* Email copy block */}
          <motion.button
            onClick={copyEmail}
            data-cursor
            className="w-full max-w-md mx-auto block px-8 py-5 rounded-xl text-xl font-medium transition-all duration-300"
            style={{
              fontFamily: "var(--font-inconsolata)",
              border: "1px solid rgba(244,139,52,0.3)",
              background: "transparent",
              color: "#fff",
            }}
            whileHover={{ background: "rgba(244,139,52,0.06)", borderColor: "#f48b34" }}
          >
            {copied ? "Copied! ✓" : "karan@example.com"}
          </motion.button>

          {/* Divider */}
          <div className="border-t mt-16 mb-10" style={{ borderColor: "rgba(255,255,255,0.06)" }} />

          {/* Socials */}
          <div className="flex justify-center gap-6 mb-10">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                data-cursor
                className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 group"
                style={{ border: "1px solid rgba(255,255,255,0.1)", fontFamily: "var(--font-inconsolata)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#f48b34";
                  e.currentTarget.style.borderColor = "#f48b34";
                  e.currentTarget.style.background = "rgba(244,139,52,0.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="border-t mb-10" style={{ borderColor: "rgba(255,255,255,0.06)" }} />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inconsolata)" }}>
            Currently open to · Remote · Hybrid · India
          </p>
        </motion.div>
      </div>
    </section>
  );
}
