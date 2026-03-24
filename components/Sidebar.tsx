"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type MenuItem = {
  label: string;
  href: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "Home",    href: "#" },
  { label: "Work",    href: "#projects" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

const ACCENT = "#f48b34";

// Inline SVG — no lucide-react dep
function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36" height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const MotionLink = motion.create(Link);

function NavItem({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      className="flex items-center gap-2 cursor-pointer overflow-hidden"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Arrow slides in from left */}
      <motion.div
        variants={{
          rest: { x: -36, opacity: 0 },
          hover: { x: 0, opacity: 1 },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ color: ACCENT, flexShrink: 0 }}
      >
        <ArrowRight />
      </motion.div>

      {/* Label shifts slightly right and recolours */}
      <MotionLink
        href={item.href}
        variants={{
          rest:  { x: -36, color: "#ffffff" },
          hover: { x: 0,   color: ACCENT },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="font-bold text-4xl leading-none select-none"
        style={{ textDecoration: "none" }}
      >
        {item.label}
      </MotionLink>
    </motion.div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(o => !o), []);
  const close  = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* ── Hamburger ───────────────────────────────────────────── */}
      <button
        onClick={toggle}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-6 left-6 z-[110] flex flex-col justify-center items-center w-10 h-10 gap-[7px]"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="block w-7 h-0.5 bg-white rounded-full origin-center"
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.15 }}
          className="block w-7 h-0.5 bg-white rounded-full"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="block w-7 h-0.5 bg-white rounded-full origin-center"
        />
      </button>

      {/* ── Backdrop (always mounted, fades in/out) ──────────────── */}
      <motion.div
        onClick={close}
        animate={open ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/55"
        style={{ willChange: "opacity" }}
      />

      {/* ── Sidebar panel (always mounted, translates in/out) ────── */}
      <motion.aside
        animate={{ x: open ? 0 : "-100%" }}
        initial={{ x: "-100%" }}
        transition={{
          // A spring that feels snappy, not elastic
          type: "spring",
          stiffness: 320,
          damping: 36,
          mass: 1,
        }}
        className="fixed top-0 left-0 h-full z-[105] flex flex-col justify-center"
        style={{
          width: "min(80vw, 400px)",
          background: "rgba(13,13,13,0.97)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          willChange: "transform",    // GPU-composited layer — zero layout cost
        }}
      >
        {/* Decorative accent bar */}
        <span
          className="absolute top-0 left-0 h-full w-[3px]"
          style={{
            background: `linear-gradient(to bottom, transparent 10%, ${ACCENT} 50%, transparent 90%)`,
          }}
        />

        {/* Nav items */}
        <div className="flex flex-col gap-7 pl-10 pr-6">
          {MENU_ITEMS.map((item, i) => (
            <NavItem key={item.href} item={item} index={i} />
          ))}
        </div>

        {/* Footer */}
        <p
          className="absolute bottom-8 left-10 text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          Portfolio © 2024
        </p>
      </motion.aside>
    </>
  );
}
