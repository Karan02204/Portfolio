"use client";

import { useState } from "react";
import ScrollyExperience from "@/components/ScrollyExperience";
import BurnTransition from "@/components/BurnTransition";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
  const [scrollyDone, setScrollyDone] = useState(false);
  const [burnDone, setBurnDone] = useState(false);

  return (
    <main className="bg-[#121212] min-h-screen">
      <CustomCursor />

      {/* BurnTransition fires when scrollytelling section is fully scrolled */}
      {scrollyDone && !burnDone && (
        <BurnTransition onComplete={() => setBurnDone(true)} />
      )}

      {/* Navbar appears after the burn completes */}
      {burnDone && <Navbar />}

      {/* Scrollytelling Hero — triggers BurnTransition when user scrolls past */}
      <ScrollyExperience onComplete={() => setScrollyDone(true)} />

      {/* Portfolio Content */}
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />

      {/* Footer */}
      <footer className="py-8 text-center border-t" style={{ borderColor: "rgba(244,139,52,0.15)" }}>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
          Designed &amp; Built by Karan Attri · 2025 · Made with{" "}
          <span style={{ color: "#f48b34" }}>♥</span> in India
        </p>
      </footer>
    </main>
  );
}
