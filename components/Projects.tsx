"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Project Alpha",
    category: "Web Interaction",
    description: "A 3D interactive experience for a leading tech brand.",
  },
  {
    title: "Neon Nexus",
    category: "Immersive Commerce",
    description: "Cyberpunk-inspired e-commerce platform with WebGL.",
  },
  {
    title: "Studio V",
    category: "Portfolio",
    description: "Minimalist portfolio for a visual design studio.",
  },
  {
    title: "Aether",
    category: "SaaS Dashboard",
    description: "Glass-morphic analytics dashboard for enterprise.",
  },
];

export default function Projects() {
  return (
    <section className="relative w-full bg-[#0a192f] py-32 px-6 md:px-20 z-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold mb-20 text-white tracking-tight"
        >
          Selected Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/3] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 flex flex-col justify-end overflow-hidden hover:bg-white/10 transition-colors duration-500"
            >
              {/* Fallback gradient for visual interest if no image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f48b34]/10 to-white/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <p className="text-sm font-medium text-[#f48b34] mb-2 uppercase tracking-wider">
                  {project.category}
                </p>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-lg">
                  {project.description}
                </p>
              </div>
              
              {/* Subtle hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-[#f48b34] to-white/30 transition-opacity duration-500 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
