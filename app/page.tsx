import ScrollyExperience from "@/components/ScrollyExperience";
import Projects from "@/components/Projects";
import TextPressure from "@/components/TextPressure";
import ScrollFloat from "@/components/ScrollFloat";
import ScrambledText from "@/components/ScrambledText";

export default function Home() {
  return (
    <main className="bg-[#c55225] min-h-screen">
      <ScrollyExperience />
      <ScrollFloat
        textClassName="text-6xl md:text-[7rem] font-bold tracking-wider text-outline"
        containerClassName="flex justify-left mt-20 ml-10"
        stagger={0.03}
        scrollStart="top 90%"
        scrollEnd="top 20%"
      >
        ABOUT ME
      </ScrollFloat>
      <ScrambledText className="text-2xl md:text-[3rem] tracking-normal text-white m-10 "
      radius={100}
      duration={1.2}
      speed={0.5}
      scrambleChars=".:">
        Full stack web developer with a strong foundation in front-end and back-end technologies, passionate about building responsive and user-friendly web applications.
      </ScrambledText>
      <Projects />
    </main>
  );
}