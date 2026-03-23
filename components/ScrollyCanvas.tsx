"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

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

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Allocate all forms up front to keep index 1:1 mapping safe
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        imgs.push(img);
    }
    setImages(imgs);

    // Initial buffer load blocks the app until ready
    const INITIAL_FRAMES = 40;
    for (let i = 1; i <= INITIAL_FRAMES; i++) {
      const img = imgs[i - 1];
      
      const onLoad = () => {
        loadedCount++;
        setProgress(loadedCount / INITIAL_FRAMES);
        
        if (loadedCount === INITIAL_FRAMES) {
          setLoaded(true);
        }
      };

      img.onload = onLoad;
      img.onerror = onLoad; // move forward even on error
      
      img.src = getFramePath(i);
    }
  }, []);

  // Background stream remaining frames after the initial frames are loaded
  useEffect(() => {
    if (loaded && images.length === TOTAL_FRAMES) {
      for (let i = 41; i <= TOTAL_FRAMES; i++) {
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
    const frameIndex = Math.min(
      numFrames - 1,
      Math.max(0, Math.floor(latest))
    );
    requestAnimationFrame(() => renderScale(frameIndex));
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const frameIndex = Math.floor(currentFrame.get());
        if (isLoaded && images.length > 0) {
            renderScale(frameIndex);
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); 
    
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images, currentFrame]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block h-full w-full object-cover"
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a192f] text-white">
          <p className="animate-pulse tracking-widest text-sm uppercase mb-4">Loading sequence...</p>
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#f48b34] transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
