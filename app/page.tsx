import ScrollyExperience from "@/components/ScrollyExperience";
import Projects from "@/components/Projects";
import TextPressure from "@/components/TextPressure";
import ScrollFloat from "@/components/ScrollFloat";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <ScrollyExperience />
      <ScrollFloat animationDuration={1} ease='back.inOut(2)' scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}>
        <TextPressure text="About Me"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          textColor="#f48537"
          strokeColor="#5227FF"
          minFontSize={30}
        />
      </ScrollFloat>
      <Projects />
    </main>
  );
}
