"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  ReactNode,
  RefObject,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

function extractText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) {
    return extractText(
      (children.props as { children?: ReactNode }).children
    );
  }
  return "";
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "top 90%",
  scrollEnd = "top 40%",
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const text = extractText(children);
    return text.split("").map((char, index) => (
      <span className="inline-block char" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef?.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll(".char");
    if (charElements.length === 0) return;

    // Set initial hidden state immediately so chars don't flash visible
    gsap.set(charElements, {
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: "50% 0%",
    });

    const anim = gsap.to(charElements, {
      duration: animationDuration,
      ease: ease,
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: stagger,
      scrollTrigger: {
        trigger: el,
        scroller,
        start: scrollStart,
        end: scrollEnd,
        scrub: 1,
        // Refresh ScrollTrigger positions after page fully loads
        // (critical when there's a large element like 1200vh above)
        refreshPriority: -1,
      },
    });

    // Force a ScrollTrigger refresh after a short delay to account for
    // layout shifts caused by the large scrollytelling section above
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeout);
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
  ]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
    >
      <span className={`inline-block ${textClassName}`}>{splitText}</span>
    </div>
  );
};

export default ScrollFloat;