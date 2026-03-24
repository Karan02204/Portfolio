"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TargetAndTransition, Variants } from "framer-motion";
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

const ACCENT      = "#f48b34";
const ACCENT_BLUE = "#5086d0";

function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32" height="32"
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

// ── Spring presets ───────────────────────────────────────────────────────────
// Panel slide: lower stiffness + higher damping = silky glide, no bounce
const PANEL_SPRING = {
  type: "spring" as const,
  stiffness: 220,
  damping: 30,
  mass: 0.8,
};

// Nav items: snappier, but still physically smooth
const ITEM_SPRING = {
  type: "spring" as const,
  stiffness: 280,
  damping: 28,
  mass: 0.6,
};

// Accent bar: same feel as panel
const BAR_SPRING = {
  type: "spring" as const,
  stiffness: 200,
  damping: 28,
  mass: 0.8,
};

// ── Sidebar container variants ───────────────────────────────────────────────
const sidebarVariants: Variants = {
  closed: {
    x: "-100%",
    transition: { ...PANEL_SPRING, staggerChildren: 0.03, staggerDirection: -1 },
  },
  open: {
    x: 0,
    transition: { ...PANEL_SPRING, staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

// ── Each nav item variants ───────────────────────────────────────────────────
const itemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -28,
    filter: "blur(6px)",
    transition: ITEM_SPRING,
  },
  open: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: ITEM_SPRING,
  },
};

// ── Backdrop variants ────────────────────────────────────────────────────────
const backdropVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.28, ease: "easeInOut" as const } },
  open:   { opacity: 1, transition: { duration: 0.28, ease: "easeInOut" as const } },
};

// ── Accent bar variants ──────────────────────────────────────────────────────
const accentBarVariants: Variants = {
  closed: { scaleY: 0, transition: BAR_SPRING },
  open:   { scaleY: 1, transition: { ...BAR_SPRING, delay: 0.1 } },
};

// ── Footer variants ──────────────────────────────────────────────────────────
const footerVariants: Variants = {
  closed: { opacity: 0, y: 12, transition: { duration: 0.2 } },
  open:   { opacity: 1, y: 0,  transition: { duration: 0.4, delay: 0.45, ease: "easeOut" as const } },
};

// ── Single nav item ──────────────────────────────────────────────────────────
function NavItem({ item }: { item: MenuItem }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-2 cursor-pointer overflow-hidden"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Arrow slides in from left on hover */}
      <motion.div
        variants={{
          rest:  { x: -32, opacity: 0 },
          hover: { x: 0,   opacity: 1 },
        }}
        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ color: ACCENT, flexShrink: 0 }}
      >
        <ArrowRight />
      </motion.div>

      {/* Label shifts right and recolours */}
      <MotionLink
        href={item.href}
        variants={{
          rest:  { x: -32, color: "#ffffff" },
          hover: { x: 0,   color: ACCENT },
        }}
        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-bold text-4xl leading-none select-none"
        style={{ textDecoration: "none" }}
      >
        {item.label}
      </MotionLink>
    </motion.div>
  );
}

// ── Hamburger bar ─────────────────────────────────────────────────────────────
function HamburgerBar({
  animate,
  className = "",
  style = {},
}: {
  animate: TargetAndTransition;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.span
      animate={animate}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`block w-7 h-0.5 bg-white rounded-full ${className}`}
      style={style}
    />
  );
}

// ── Root component ────────────────────────────────────────────────────────────
export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(o => !o), []);
  const close  = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* ── Hamburger ─────────────────────────────────────────────────────── */}
      <button
        onClick={toggle}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-6 left-6 z-[110] flex flex-col justify-center items-center w-10 h-10 gap-[7px]"
      >
        <HamburgerBar animate={open ? { rotate: 45,  y: 9,  backgroundColor: ACCENT } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }} />
        <HamburgerBar animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} />
        <HamburgerBar animate={open ? { rotate: -45, y: -9, backgroundColor: ACCENT } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }} />
      </button>

      {/* ── Backdrop ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            onClick={close}
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[100] bg-black/55"
            style={{ willChange: "opacity" }}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar panel ─────────────────────────────────────────────────── */}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={open ? "open" : "closed"}
        className="fixed top-0 left-0 h-full z-[105] flex flex-col justify-center"
        style={{
          width: "min(80vw, 400px)",
          background: "rgba(10,10,10,0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          willChange: "transform",
        }}
      >
        {/* Decorative gradient accent bar — scaleY animates from 0 → 1 */}
        <motion.span
          variants={accentBarVariants}
          className="absolute top-0 left-0 h-full w-[3px] origin-top"
          style={{
            background: `linear-gradient(to bottom, transparent 5%, ${ACCENT} 40%, ${ACCENT_BLUE} 75%, transparent 95%)`,
          }}
        />

        {/* Subtle top-left glow for depth */}
        <span
          className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(244,139,52,0.07) 0%, transparent 70%)`,
            transform: "translate(-30%, -30%)",
          }}
        />

        {/* Nav items — stagger is driven by sidebarVariants */}
        <nav className="flex flex-col gap-7 pl-12 pr-6">
          {MENU_ITEMS.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>

        {/* Divider */}
        <motion.div
          variants={{
            closed: { scaleX: 0, opacity: 0, transition: { duration: 0.2 } },
            open:   { scaleX: 1, opacity: 1, transition: { duration: 0.5, delay: 0.38, ease: "easeOut" } },
          }}
          className="absolute bottom-20 left-12 right-6 h-px origin-left"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* Footer */}
        <motion.p
          variants={footerVariants}
          className="absolute bottom-8 left-12 text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          Portfolio © 2025
        </motion.p>
      </motion.aside>
    </>
  );
}