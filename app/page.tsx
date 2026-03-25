import ScrollyExperience from "@/components/ScrollyExperience";
import Projects from "@/components/Projects";
import TextPressure from "@/components/TextPressure";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <ScrollyExperience />

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
      <Projects />
    </main>
  );
}
