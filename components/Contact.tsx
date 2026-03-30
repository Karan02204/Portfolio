"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48" height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transform -rotate-45"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function Contact() {
  const socialLinks = [
    { label: "GITHUB", href: "https://github.com/Karan02204" },
    { label: "LINKEDIN", href: "https://linkedin.com/in/karanattri022/" },
    { label: "LEETCODE", href: "https://leetcode.com/u/Karanattri/" }
  ];

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Web3Forms configuration
    // Replace this key with your own from https://web3forms.com !
    formData.append("access_key", "a0b81959-78f9-41d1-9866-f2a29ed03556");

    try {
      setStatus("loading");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative z-20 bg-[#131313] min-h-screen py-24 w-full snap-start flex items-center justify-center overflow-hidden">
      {/* Heavy ambient background glow blending with the previous sections */}
      {/* <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff5b22]/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" /> */}

      <div className="w-full max-w-[1700px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-10 items-center z-10 relative">
        
        {/* Left Column: Huge Type & Socials */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-col items-start italic leading-none mb-10">
              <h1 className="text-[5rem] md:text-[8rem] lg:text-[12rem] scale-y-150 text-[#ff5b22] tracking-tight">
                LET'S
              </h1>
              <h1 className="text-[5rem] md:text-[8rem] lg:text-[12rem] scale-y-150 tracking-tight text-transparent mt-5">
                <span className="text-outline">WORK.</span>
              </h1>
            </div>
            
            <p className="max-w-md text-xl md:text-3xl leading-relaxed text-white/50 italic mt-10 md:mt-20">
              Got a project in mind? Let’s create something amazing together.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-8 mt-16 md:mt-32">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-white/30 hover:text-[#ff5b22] text-xl md:text-2xl font-bold tracking-widest transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#ff5b22] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: High-End Minimal Form */}
        <div className="flex flex-col justify-center w-full max-w-2xl lg:ml-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-20">
            
            {/* Name Input */}
            <div className="relative group">
              <input 
                type="text" 
                name="name"
                placeholder="WHAT'S YOUR NAME?" 
                className="w-full bg-transparent border-b-2 border-white/10 pb-6 text-2xl md:text-4xl text-white outline-none focus:border-[#ff5b22] transition-colors placeholder:text-white/20 font-bold italic"
                required
                disabled={status === "loading" || status === "success"}
              />
            </div>
            
            {/* Email Input */}
            <div className="relative group">
              <input 
                type="email" 
                name="email"
                placeholder="YOUR EMAIL?" 
                className="w-full bg-transparent border-b-2 border-white/10 pb-6 text-2xl md:text-4xl text-white outline-none focus:border-[#ff5b22] transition-colors placeholder:text-white/20 font-bold italic"
                required
                disabled={status === "loading" || status === "success"}
              />
            </div>

            {/* Message Input */}
            <div className="relative group">
              <textarea 
                name="message"
                placeholder="TELL ME ABOUT YOUR PROJECT" 
                rows={3}
                className="w-full bg-transparent border-b-2 border-white/10 pb-6 text-2xl md:text-4xl text-white outline-none focus:border-[#ff5b22] transition-colors placeholder:text-white/20 font-bold italic resize-none"
                required
                disabled={status === "loading" || status === "success"}
              />
            </div>

            {/* Submit Button */}
            <motion.button 
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={`group flex justify-between items-end border-b-2 pb-6 mt-4 md:mt-8 transition-colors duration-500 cursor-pointer ${
                status === "success" 
                  ? "border-[#5086d0] text-[#5086d0]" 
                  : "border-[#ff5b22] hover:border-white"
              }`}
              whileHover={status !== "success" ? "hover" : "rest"}
            >
              <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter italic transition-colors duration-500 ${
                status === "success" 
                  ? "text-[#5086d0]" 
                  : "text-[#ff5b22] group-hover:text-white"
              }`}>
                {status === "idle" && "SEND MESSAGE"}
                {status === "loading" && "SENDING..."}
                {status === "success" && "MESSAGE SENT"}
                {status === "error" && "ERROR! TRY AGAIN"}
              </h2>
              
              {status !== "success" && (
                <motion.div 
                  className="text-[#ff5b22] group-hover:text-white mb-2 md:mb-4 transition-colors duration-500"
                  variants={{
                    rest: { x: 0, y: 0 },
                    hover: { x: 15, y: -15 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <ArrowRightIcon />
                </motion.div>
              )}
            </motion.button>
            
            {/* Web3Forms required hidden field to prevent redirect */}
            <input type="hidden" name="redirect" value="" />
            
          </form>
        </div>

      </div>
    </section>
  );
}
