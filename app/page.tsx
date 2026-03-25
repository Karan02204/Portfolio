import ScrollyExperience from "@/components/ScrollyExperience";
import Projects from "@/components/Projects";

import BurnTransition from "@/components/BurnTransition";
import TextPressure from "@/components/TextPressure";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <ScrollyExperience />
      
      {/* Cinematic burn separator integrating seamlessly with the dark background */}
      <div className="relative w-full h-[30vh] md:h-[50vh] z-20 overflow-hidden">
        <BurnTransition 
          color="#121212" 
          transitionColor="#f48b34" 
          noiseScale={0.37}
          parallaxEnabled={true} 
          movement={{ horizontal: "center", vertical: 0.5 }}
          style={{}}
        />
      </div>

      <TextPressure text="About Me"
        flex
        alpha={false}
        stroke={false}
        width
        weight
        italic
        textColor="#ffffff"
        strokeColor="#5227FF"
        minFontSize={36}
      />
      <Projects />
    </main>
  );
}
