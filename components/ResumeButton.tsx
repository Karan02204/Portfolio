"use client";

import { motion } from "framer-motion";

export default function ResumeButton() {
  return (
    <motion.a
      href="https://drive.google.com/file/d/18y6cfyVP3BjPbpmEvcjZE2y1ibX1mXsJ/view?usp=drive_link" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-6 right-6 z-[110] group overflow-hidden border border-white/10 px-6 py-3 bg-black/40 backdrop-blur-md flex items-center gap-3 cursor-pointer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      aria-label="Download Resume"
    >
      {/* Background slide-in effect */}
      <span className="absolute inset-0 w-full h-full bg-[#ff5b22] transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />
      
      <span className="relative z-10 text-white/80 font-bold tracking-[0.2em] text-xs md:text-sm italic group-hover:text-black transition-colors duration-500">
        RESUME
      </span>

      <svg
        className="relative z-10 text-white/80 group-hover:text-black transform group-hover:translate-y-[2px] transition-all duration-500"
        xmlns="http://www.w3.org/2000/svg"
        width="16" height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </motion.a>
  );
}
