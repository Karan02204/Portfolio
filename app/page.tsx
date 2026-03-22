import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <div className="relative h-[500vh]">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <Projects />
    </main>
  );
}
