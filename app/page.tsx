"use client";

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

  return (
    <main className="bg-[#121212] min-h-screen">
      <CustomCursor />

      <Navbar />

      {/* Scrollytelling Hero */}
      <ScrollyExperience />

      {/* The Framer Burn Transition — overlapping the next section */}
      <div className="w-full h-[30vh] md:h-[50vh] relative -mb-[10vh] md:-mb-[25vh] z-20 pointer-events-none">
        <BurnTransition 
          color="#121212" 
          transitionColor="#f48b34" 
          parallaxEnabled={true} 
          movement={{ horizontal: "center", vertical: 0.5 }}
          preview={false}
          style={{}}
        />
      </div>

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
