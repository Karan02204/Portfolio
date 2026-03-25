import ScrollyExperience from "@/components/ScrollyExperience";
import Projects from "@/components/Projects";
import TextPressure from "@/components/TextPressure";
import ScrollFloat from "@/components/ScrollFloat";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <ScrollyExperience />
      <ScrollFloat
        textClassName="text-6xl md:text-[10rem] font-bold tracking-wider text-white"
        containerClassName="flex justify-center my-20"
        stagger={0.03}
        scrollStart="top 90%"
        scrollEnd="top 20%"
      >
        About Me
      </ScrollFloat>
      <Projects />
    </main>
  );
}