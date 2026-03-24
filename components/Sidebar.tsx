"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type MenuItem = {
  label: string;
  href: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "Home",         href: "#" },
  { label: "Work",         href: "#projects" },
  { label: "About",        href: "#about" },
  { label: "Contact",      href: "#contact" },
];

const ACCENT = "#f48b34";

// Inline SVG arrow — no lucide-react dependency needed
function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40" height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const MotionLink = motion.create(Link);

function MenuVertical({ menuItems = MENU_ITEMS }: { menuItems?: MenuItem[] }) {
  return (
    <div className="flex w-fit flex-col gap-6 px-10">
      {menuItems.map((item, index) => (
        <motion.div
          key={`${item.href}-${index}`}
          className="group flex items-center gap-2 cursor-pointer"
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            variants={{
              initial: { x: "-100%", color: "inherit", opacity: 0 },
              hover:   { x: 0,       color: ACCENT,   opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-white"
          >
            <ArrowRight />
          </motion.div>

          <MotionLink
            href={item.href}
            variants={{
              initial: { x: -40, color: "#ffffff" },
              hover:   { x: 0,   color: ACCENT   },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-bold text-4xl no-underline text-white"
          >
            {item.label}
          </MotionLink>
        </motion.div>
      ))}
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — always visible, top-left corner */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-6 left-6 z-[100] flex flex-col justify-center items-center w-10 h-10 gap-[6px] group"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="block w-8 h-[2px] bg-white rounded-full origin-center"
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="block w-8 h-[2px] bg-white rounded-full"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="block w-8 h-[2px] bg-white rounded-full origin-center"
        />
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 left-0 h-full z-[95] flex flex-col justify-center"
            style={{
              width: "min(80vw, 420px)",
              background: "linear-gradient(135deg, rgba(18,18,18,0.97) 60%, rgba(244,139,52,0.08))",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Decorative accent bar */}
            <div
              className="absolute top-0 left-0 h-full w-[3px] rounded-full"
              style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}, transparent)` }}
            />

            <MenuVertical />

            {/* Footer tag */}
            <p
              className="absolute bottom-8 left-10 text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Portfolio © 2024
            </p>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
