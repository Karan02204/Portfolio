"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

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
        outerRef.current.style.transform = `translate(${outerX - 16}px, ${outerY - 16}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      if (outerRef.current) outerRef.current.style.cssText += "width:48px;height:48px;background:rgba(244,139,52,0.1);";
    };
    const onLeave = () => {
      if (outerRef.current) outerRef.current.style.cssText += "width:32px;height:32px;background:transparent;";
    };

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-[width,height,background] duration-200"
        style={{ width: 32, height: 32, border: "1px solid #f48b34" }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{ width: 6, height: 6, background: "#5086d0" }}
      />
    </>
  );
}
