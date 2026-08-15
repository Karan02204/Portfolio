"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, useReducedMotion, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 240;

// Uses Cloudinary f_auto,q_auto to compress and optimize images on the fly!
function getFramePath(index: number): string {
  const n = String(index).padStart(3, "0");
  return `https://res.cloudinary.com/dcwryqkis/image/upload/f_auto,q_auto/ezgif-frame-${n}.png`;
}

export function useImageSequence() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const gateFramesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Allocate all forms up front to keep index 1:1 mapping safe
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        imgs.push(img);
    }
    setImages(imgs);

    // Gate on an evenly-spread sample across the WHOLE timeline rather than
    // the first 40 frames in order. Loading 1..40 meant a fast early scroll
    // ran straight past the buffer into blank frames; a spread guarantees
    // every part of the scrub has something to show while the rest streams in.
    const GATE_COUNT = 40;
    const step = Math.max(1, Math.floor(TOTAL_FRAMES / GATE_COUNT));
    const gateFrames = new Set<number>();
    for (let i = 1; i <= TOTAL_FRAMES; i += step) gateFrames.add(i);
    gateFrames.add(1); // first frame must be present

    const total = gateFrames.size;

    gateFrames.forEach((i) => {
      const img = imgs[i - 1];

      const onLoad = () => {
        loadedCount++;
        setProgress(loadedCount / total);

        if (loadedCount === total) {
          setLoaded(true);
        }
      };

      img.onload = onLoad;
      img.onerror = onLoad; // move forward even on error

      img.src = getFramePath(i);
    });

    gateFramesRef.current = gateFrames;
  }, []);

  // Background stream every remaining frame once the gate sample has landed
  useEffect(() => {
    if (loaded && images.length === TOTAL_FRAMES) {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (gateFramesRef.current.has(i)) continue; // already requested
        images[i - 1].src = getFramePath(i);
      }
    }
  }, [loaded, images]);

  return { images, loaded, progress, totalFrames: TOTAL_FRAMES };
}

export default function ScrollyCanvas({
  numFrames = TOTAL_FRAMES,
  startFrame = 0, // eslint-disable-line @typescript-eslint/no-unused-vars
  scrollYProgress: externalScrollYProgress,
}: {
  numFrames?: number;
  startFrame?: number;
  scrollYProgress?: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  
  // Use our optimized hook
  const { images, loaded: isLoaded, progress } = useImageSequence();
  
  const { scrollYProgress: internalScrollYProgress } = useScroll();
  const scrollYProgress = externalScrollYProgress || internalScrollYProgress;
  const currentFrame = useTransform(scrollYProgress, [0, 1], [0, numFrames - 1]);
  
  const renderScale = (index: number) => {
    const canvas = canvasRef.current;
    // Check if the image exists, has loaded completely, and has dimensions
    if (!canvas || !images[index] || !images[index].complete || images[index].naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(currentFrame, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;

    // With reduced motion we pin to a single representative frame instead of
    // scrubbing 240 of them past the viewport.
    if (reduceMotion) return;

    const frameIndex = Math.min(
      numFrames - 1,
      Math.max(0, Math.floor(latest))
    );

    // Coalesce to one paint per frame — scroll fires far faster than 60Hz
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      renderScale(frameIndex);
    });
  });

  useEffect(() => {
    let timeout: number | undefined;

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Match the backing store to the device pixel ratio, otherwise the
      // sequence renders at CSS resolution and looks soft on retina displays.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);

      if (isLoaded && images.length > 0) {
        const frameIndex = reduceMotion
          ? 0
          : Math.min(numFrames - 1, Math.max(0, Math.floor(currentFrame.get())));
        renderScale(frameIndex);
      }
    };

    const handleResize = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(resize, 120);
    };

    resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, images, currentFrame, reduceMotion, numFrames]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">

      <canvas
        ref={canvasRef}
        className="block h-full w-full object-cover"
      />
      
      
      {/* Dark tint overlay for superior text contrast and depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[85%] to-[#131313] pointer-events-none" />
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#131313] text-white">
          <p className="animate-pulse tracking-widest text-sm uppercase mb-4">Loading sequence...</p>
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
