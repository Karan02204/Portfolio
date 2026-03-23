"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["About", "Skills", "Projects", "Certs", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (link: string) => {
    setActive(link);
    const el = document.getElementById(link.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-8 px-8 py-3 rounded-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: `blur(${scrolled ? "30px" : "20px"})`,
        border: "1px solid rgba(244,139,52,0.2)",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
        transition: "backdrop-filter 0.3s, box-shadow 0.3s",
      }}
    >
      {links.map((link) => (
        <button
          key={link}
          onClick={() => handleClick(link)}
          className="relative text-sm font-medium tracking-wide transition-colors duration-200"
          style={{
            fontFamily: "var(--font-gued)",
            color: active === link ? "#f48b34" : "rgba(255,255,255,0.7)",
          }}
          data-cursor
        >
          {link}
          {active === link && (
            <motion.div
              layoutId="nav-underline"
              className="absolute -bottom-1 left-0 right-0 h-px"
              style={{ background: "#f48b34" }}
            />
          )}
        </button>
      ))}

      {/* Available for work dot */}
      <div className="flex items-center gap-2 ml-2 pl-4 border-l border-white/10">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-white/50" style={{ fontFamily: "var(--font-inconsolata)" }}>
          Available
        </span>
      </div>
    </motion.nav>
  );
}
