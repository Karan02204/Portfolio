import ScrollyExperience from "@/components/ScrollyExperience";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";
import { FocusRail , type FocusRailItem } from "@/components/focusRail";

const PROJECTS: FocusRailItem[] = [
  {
    id: 1,
    title: "Pitara",
    description: "A beautiful, modern gift shop application built with React, Node.js, and MongoDB. Features a curated gift catalog, custom hamper builder, and seamless checkout experience.",
    meta: "",
    imageSrc: "https://res.cloudinary.com/dcwryqkis/image/upload/v1774897735/pitara_01.jpg",
    href: "https://pitarareal.vercel.app",
  },
  {
    id: 2,
    title: "Web Nexus",
    description: "An interactive cybersecurity learning platform built with HTML, Tailwind CSS, JavaScript, and PHP, featuring hands-on OWASP Top 10 vulnerability simulations, side-by-side secure vs vulnerable implementations, and in-depth mitigation techniques for real-world web security mastery.",
    meta: "",
    imageSrc: "https://res.cloudinary.com/dcwryqkis/image/upload/v1774897736/web_nexus_01.jpg",
    href: "https://webnexus.rf.gd",
  },
  {
    id: 3,
    title: "HanumanVerse",
    description: "A cinematic scrollytelling web experience built with Next.js, Framer Motion, and Cloudinary, featuring scroll-synced animations, 160-frame canvas rendering, and advanced frontend optimizations for immersive, high-performance visual storytelling.",
    meta: "",
    imageSrc: "https://res.cloudinary.com/dcwryqkis/image/upload/v1774897735/hanuman_01.jpg",
    href: "https://hanuman-verse.vercel.app",
  },
  {
    id: 4,
    title: "Portfolio",
    description: "A cinematic, full-stack developer portfolio built with Next.js and Framer Motion — featuring a 240-frame scrollytelling experience, live projects, and a design that bridges engineering precision with creative vision.",
    meta: "",
    imageSrc: "https://res.cloudinary.com/dcwryqkis/image/upload/v1774897735/karan_01.jpg",
    href: "https://karanattri.vercel.app",
  },
  
];

export default function Home() {
  return (
    <main id="home" className="relative bg-[#131313] min-h-screen">
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dcwryqkis/image/upload/v1774509362/background.png"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 snap-start">
        <ScrollyExperience />
      </div>

      {/* Scroll Trap Container - Snaps perfectly to viewport */}
      <div className="h-screen w-full snap-start overflow-y-auto snap-y snap-mandatory hide-scrollbar bg-[#131313]">
        
        {/* ABOUT SECTION */}
        <section id="about" className="relative z-20 bg-[#131313] h-screen w-full snap-start flex items-center justify-center py-12 lg:py-16 2xl:py-24 ">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] w-full max-w-[1700px] mx-auto px-10 gap-12 lg:gap-16 items-center">
            
            {/* LEFT SIDE (About Me) */}
            <div className="flex flex-col space-y-10 w-full">

              {/* HEADING */}
              <div className="flex items-end gap-4 md:gap-6 italic">
                
                {/* ABOUT (filled) */}
                <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem] 2xl:text-[12rem] scale-y-150 text-[#ff5b22] leading-none tracking-tight">
                  ABOUT
                </h1>

                {/* ME (outlined) */}
                <h1 className="text-[4rem] md:text-[6rem] lg:text-[6rem] 2xl:text-[8rem] scale-y-150 leading-none tracking-tight text-transparent">
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
              <div className="scale-75 lg:scale-100 2xl:scale-120 origin-center">
                <VerticalImageStack />
              </div>
            </div>

          </div>
        </section>

        {/* SKILLS SECTION */}
        <Skills />

        
        
        {/* PROJECT SECTION */}
        <section id="projects" className="relative z-20 bg-[#131313] h-screen w-full snap-start flex items-center justify-center overflow-hidden">

            {/* 🔥 CENTER LEFT FLOATING HEADING */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 lg:left-8 2xl:left-16 z-30 flex flex-col items-center gap-1 xl:gap-2 2xl:gap-4 pointer-events-none text-transparent mt-10">
              
              {/* PROJECTS */}
              <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[4rem] 2xl:text-[5rem] scale-y-150 scale-x-125 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
                P
              </h1>
              <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[4rem] 2xl:text-[5rem] scale-y-150 scale-x-125 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
                R
              </h1>
              <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[4rem] 2xl:text-[5rem] scale-y-150 scale-x-125 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
                O
              </h1>
              <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[4rem] 2xl:text-[5rem] scale-y-150 scale-x-125 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
                J
              </h1>
              <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[4rem] 2xl:text-[5rem] scale-y-150 scale-x-125 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
                E
              </h1>
              <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[4rem] 2xl:text-[5rem] scale-y-150 scale-x-125 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
                C
              </h1>
              <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[4rem] 2xl:text-[5rem] scale-y-150 scale-x-125 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
                T
              </h1>
              <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[4rem] 2xl:text-[5rem] scale-y-150 scale-x-125 leading-none bg-gradient-to-t from-[#ff5b22] to-transparent bg-clip-text">
                S
              </h1>

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

        {/* CERTIFICATES SECTION */}
        <Certificates />

        {/* CONTACT SECTION */}
        <Contact />
      </div>
    </main>
  );
}