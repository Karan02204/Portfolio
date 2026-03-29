import ScrollyExperience from "@/components/ScrollyExperience";
import Projects from "@/components/Projects";
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";
import { FocusRail , type FocusRailItem } from "@/components/focusRail";

const PROJECTS: FocusRailItem[] = [
  {
    id: 1,
    title: "Pitara",
    description: "A beautiful, modern gift shop application built with React, Node.js, and MongoDB. Features a curated gift catalog, custom hamper builder, and seamless checkout experience.",
    meta: "",
    imageSrc: "/pitara_01.jpg",
    href: "https://pitarareal.vercel.app",
  },
  {
    id: 2,
    title: "Web Nexus",
    description: "An interactive cybersecurity learning platform built with HTML, Tailwind CSS, JavaScript, and PHP, featuring hands-on OWASP Top 10 vulnerability simulations, side-by-side secure vs vulnerable implementations, and in-depth mitigation techniques for real-world web security mastery.",
    meta: "",
    imageSrc: "/web_nexus_01.jpg",
    href: "https://web-nexus.rf.gd",
  },
  {
    id: 3,
    title: "HanumanVerse",
    description: "A cinematic scrollytelling web experience built with Next.js, Framer Motion, and Cloudinary, featuring scroll-synced animations, 160-frame canvas rendering, and advanced frontend optimizations for immersive, high-performance visual storytelling.",
    meta: "",
    imageSrc: "/hanuman_01.jpg",
    href: "https://hanuman-verse.vercel.app",
  },
  {
    id: 4,
    title: "Portfolio",
    description: "A glimpse into a technological singularity where AI meets humanity.",
    meta: "",
    imageSrc: "karan_01.jpg",
    href: "https://karanattri.vercel.app",
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
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] w-full max-w-[1700px] mx-auto px-10 gap-16 items-center">
          
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
            <p className="max-w-4xl text-lg md:text-xl lg:text-3xl leading-relaxed text-white italic">
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
            <div className="scale-90 lg:scale-120">
              <VerticalImageStack />
            </div>
          </div>

        </div>
      </section>
      <section className="relative z-20 bg-[#131313] py-24 overflow-hidden">

        {/* 🔥 TOP LEFT FLOATING HEADING */}
        <div className="absolute top-35 left-30 z-30 flex flex-col items-start gap-6 pointer-events-none text-transparent">
          
          {/* PROJECTS */}
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[5rem] scale-y-160 scale-x-150 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
            P
          </h1>
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[5rem] scale-y-160 scale-x-150 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
            R
          </h1>
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[5rem] scale-y-160 scale-x-150 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
            O
          </h1>
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[5rem] scale-y-160 scale-x-150 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
            J
          </h1>
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[5rem] scale-y-160 scale-x-150 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
            E
          </h1>
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[5rem] scale-y-160 scale-x-150 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
            C
          </h1>
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[5rem] scale-y-160 scale-x-150 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
            T
          </h1>
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[5rem] scale-y-160 scale-x-150 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
            S
          </h1>

          {/* WORK (outlined) */}
          {/* <h1 className="text-[4rem] md:text-[5rem] lg:text-[4rem] scale-y-150 leading-none text-transparent">
            <span className="text-outline">WORK</span>
          </h1> */}

        </div>

        {/* 🔥 FOCUS RAIL (CENTERED) */}
        <div className="flex justify-center items-center w-full">
          <div className="w-full">
            
            <FocusRail
              items={PROJECTS}
              autoPlay={false}
              interval={4000}
            />

          </div>
        </div>

      </section>
    </main>
  );
}