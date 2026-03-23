"use client";

import ScrollyExperience from "@/components/ScrollyExperience";
import Projects from "@/components/Projects";
import BurnTransition from "@/components/BurnTransition";
import { useScroll } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  
  // Track exactly 100vh of scroll over the 200vh container length.
  // "start start": top of container hits top of viewport (Scroll 0)
  // "end end": bottom of 200vh container hits bottom of 100vh viewport (Scroll 100vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-[#121212] min-h-screen">
      <ScrollyExperience />
      
      {/* 
        The Transition Track 
        It spans exactly 200vh. The final 100vh is pulled up via negative margin to create a seamless overlap.
      */}
      <div ref={containerRef} className="relative w-full h-[200vh] -mb-[100vh] z-20">
        
        {/* Sticky wrapper prevents scrolling up while the Burn executes */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#121212]">
          
          {/* 
             Static placeholder for Projects.
             This stays permanently framed inside the sticky box, giving the illusion it was always there.
             As the Burn fades to transparent, this is fully revealed standing perfectly still!
          */}
          <div className="absolute inset-0 w-full h-screen">
            <Projects />
          </div>
          
          {/* 
            The Burn shader seamlessly masks the static Projects div above it.
            It is synchronized precisely to the scroll output (0 to 1) 
            Solid Black (0) -> Transparent (1).
          */}
          <div className="absolute top-0 left-0 w-full h-screen pointer-events-none z-50">
            <BurnTransition 
              color="#121212" 
              transitionColor="#f48b34" 
              noiseScale={0.37}
              parallaxEnabled={true} 
              movement={{ horizontal: "center", vertical: 0.5 }}
              style={{}}
              burnProgress={scrollYProgress}
            />
          </div>
        </div>
      </div>

      {/* 
        The Real Projects Component
        Pushed exactly 100vh upwards via the previous container's negative margin.
        When the 100vh scroll burn finishes, the Sticky wrapper above unpins and simultaneously 
        the Real Projects directly visually overlaps this exact coordinate rendering perfect flawless native scrolling!
      */}
      <div className="relative w-full z-10 bg-[#121212]">
        <Projects />
      </div>

    </main>
  );
}
