import ScrollyExperience from "@/components/ScrollyExperience";
import Projects from "@/components/Projects";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFloat from "@/components/ScrollFloat";
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";
import { FocusRail , type FocusRailItem } from "@/components/focusRail";

const DEMO_ITEMS: FocusRailItem[] = [
  {
    id: 1,
    title: "Pitara",
    description: "A beautiful, modern gift shop application built with React, Node.js, and MongoDB. Features a curated gift catalog, custom hamper builder, and seamless checkout experience.",
    meta: "",
    imageSrc: "/pitara_01.jpg",
    href: "#tokyo",
  },
  {
    id: 2,
    title: "Web Nexus",
    description: "An interactive cybersecurity learning platform built with HTML, Tailwind CSS, JavaScript, and PHP, featuring hands-on OWASP Top 10 vulnerability simulations, side-by-side secure vs vulnerable implementations, and in-depth mitigation techniques for real-world web security mastery.",
    meta: "",
    imageSrc: "/web_nexus_01.jpg",
    href: "#nordic",
  },
  {
    id: 3,
    title: "HanumanVerse",
    description: "A cinematic scrollytelling web experience built with Next.js, Framer Motion, and Cloudinary, featuring scroll-synced animations, 160-frame canvas rendering, and advanced frontend optimizations for immersive, high-performance visual storytelling.",
    meta: "",
    imageSrc: "/hanuman_01.jpg",
    href: "#sahara",
  },
  {
    id: 4,
    title: "Cyber Future",
    description: "A glimpse into a technological singularity where AI meets humanity.",
    meta: "Tech • AI",
    imageSrc: "aita_ghar_01.jpg",
    href: "#cyber",
  },
  
];

export default function Home() {
  return (
    <main className="relative bg-[#131313] min-h-screen">
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dcwryqkis/image/upload/v1774509362/background.png"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <ScrollyExperience />
      </div>

      {/* ABOUT SECTION */}
      <section className="relative z-20 bg-[#131313] py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] w-full max-w-[1400px] mx-auto px-10 gap-16 items-center">
          
          {/* LEFT SIDE (About Me) */}
          <div className="flex flex-col space-y-10 w-full">

            {/* HEADING */}
            <div className="flex items-end gap-6 italic">
              
              {/* ABOUT (filled) */}
              <h1 className="text-[4rem] md:text-[7rem] lg:text-[12rem] scale-y-150 text-[#ff5b22] leading-none tracking-tight">
                ABOUT
              </h1>

              {/* ME (outlined) */}
              <h1 className="text-[4rem] md:text-[7rem] lg:text-[8rem] scale-y-150 leading-none tracking-tight text-transparent">
                <span className="text-outline">ME</span>
              </h1>

            </div>

            {/* PARAGRAPH */}
            <p className="max-w-2xl text-lg md:text-xl lg:text-3xl leading-relaxed text-gray-300 italic">
              I’m a passionate{" "}
              <span className="text-[#ff5b22] ">
                Full stack web developer
              </span>{" "}
              with a strong foundation in{" "}
              <span className="text-[#ff5b22] ">front-end</span> and{" "}
              <span className="text-[#ff5b22] ">back-end</span>{" "}
              technologies, dedicated to building responsive and{" "}
              <span className="text-[#ff5b22] ">
                user-friendly web applications
              </span>
              . I solve complex problems with clean, efficient code.
            </p>

          </div>
          
          {/* RIGHT SIDE (Images) */}
          <div className="flex justify-center items-center">
            <div className="scale-90 lg:scale-100">
              <VerticalImageStack />
            </div>
          </div>

        </div>
      </section>
      <FocusRail items={DEMO_ITEMS} 
        autoPlay={false} 
        loop={true}/>
      <Projects />
    </main>
  );
}