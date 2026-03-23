"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    let outerX = 0, outerY = 0;
    let targetX = 0, targetY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${targetX - 3}px, ${targetY - 3}px)`;
      }
    };

    const animate = () => {
      outerX += (targetX - outerX) * 0.12;
      outerY += (targetY - outerY) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerX - (cursorText ? 40 : 16)}px, ${outerY - (cursorText ? 40 : 16)}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.getAttribute("data-cursor-text");
      if (text) setCursorText(text);

      if (outerRef.current) {
        if (text) {
          outerRef.current.style.width = "80px";
          outerRef.current.style.height = "80px";
          outerRef.current.style.background = "rgba(244,139,52,0.9)";
          outerRef.current.style.borderColor = "transparent";
        } else {
          outerRef.current.style.width = "48px";
          outerRef.current.style.height = "48px";
          outerRef.current.style.background = "rgba(244,139,52,0.1)";
        }
      }
    };

    const onLeave = () => {
      setCursorText("");
      if (outerRef.current) {
        outerRef.current.style.width = "32px";
        outerRef.current.style.height = "32px";
        outerRef.current.style.background = "transparent";
        outerRef.current.style.borderColor = "#f48b34";
      }
    };

    window.addEventListener("mousemove", onMove);
    
    // Initial attach
    const refreshHandlers = () => {
      document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    refreshHandlers();
    const observer = new MutationObserver(refreshHandlers);
    observer.observe(document.body, { childList: true, subtree: true });

    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [cursorText]);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-[width,height,background,border-color] duration-300 flex items-center justify-center overflow-hidden"
        style={{ width: 32, height: 32, border: "1px solid #f48b34" }}
      >
        {cursorText && (
          <span className="text-[10px] font-black tracking-tighter text-black uppercase animate-in fade-in zoom-in duration-300">
            {cursorText}
          </span>
        )}
      </div>
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{ width: 6, height: 6, background: "#5086d0" }}
      />
    </>
  );
}
