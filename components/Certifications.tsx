"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const certs = [
  { icon: "☁", issuer: "Amazon Web Services", name: "AWS Certified Developer — Associate", date: "March 2024", link: "#" },
  { icon: "◈", issuer: "Meta", name: "Meta Front-End Developer Professional Certificate", date: "January 2024", link: "#" },
  { icon: "⚡", issuer: "Google", name: "Google UX Design Certificate", date: "November 2023", link: "#" },
  { icon: "🔷", issuer: "Microsoft", name: "Azure Fundamentals (AZ-900)", date: "August 2023", link: "#" },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certs" ref={ref} className="py-32 px-6 md:px-20" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#f48b34", fontFamily: "var(--font-mono)" }}
        >
          Certifications
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-extrabold mb-16 tracking-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Trophy Wall
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
              className="relative rounded-xl p-8 overflow-hidden group"
              style={{
                background: "#0f0f0f",
                border: "1px solid rgba(80,134,208,0.3)",
              }}
            >
              {/* Shimmer sweep on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s ease-in-out",
                }}
              />

              {/* Icon */}
              <div className="text-4xl mb-4" style={{ color: "#f48b34" }}>{cert.icon}</div>

              <h3 className="text-lg font-bold mb-1 leading-snug" style={{ fontFamily: "var(--font-syne)" }}>
                {cert.name}
              </h3>
              <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
                {cert.issuer}
              </p>
              <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
                Issued: {cert.date}
              </p>

              <div className="border-t border-white/10 pt-4">
                <a
                  href={cert.link}
                  data-cursor
                  className="text-xs link-underline transition-colors"
                  style={{ color: "#5086d0", fontFamily: "var(--font-mono)" }}
                >
                  Verify Credential →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
