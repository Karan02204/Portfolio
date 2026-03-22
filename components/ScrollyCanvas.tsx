"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollyCanvas({
  numFrames = 240, // Updated to match sequence2 frame count
  startFrame = 0,
}: {
  numFrames?: number;
  startFrame?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Connect to scroll
  // We track the scroll over the entire container which will be 500vh
  // but this component itself is sticky.
  const { scrollYProgress } = useScroll();
  
  // Determine current frame based on scroll 0-1
  // We map 0-1 to 0-(numFrames-1)
  const currentFrame = useTransform(scrollYProgress, [0, 1], [0, numFrames - 1]);
  
  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const imagePromises: Promise<void>[] = [];

      for (let i = 0; i < numFrames; i++) {
        const promise = new Promise<void>((resolve, reject) => {
          const img = new Image();
          // Construct filename: ezgif-frame-001.png
          // Images in sequence2 are 1-indexed
          const frameIndex = (i + 1).toString().padStart(3, "0");
          img.src = `/sequence2/ezgif-frame-${frameIndex}.png`;
          
          img.onload = () => {
            loadedImages[i] = img;
            resolve();
          };
          img.onerror = (e) => {
            console.error(`Failed to load frame ${i}`, e);
             // Resolve anyway to avoid blocking everything, maybe show placeholder?
            resolve();
          };
        });
        imagePromises.push(promise);
      }

      await Promise.all(imagePromises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, [numFrames]);

  // Render loop
  const renderScale = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and draw
    const img = images[index];
    
    // Calculate aspect ratio for object-fit: cover
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (imgRatio > canvasRatio) {
        // Image is wider than canvas
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    } else {
        // Image is taller or equal
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Update on scroll change
  useMotionValueEvent(currentFrame, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;
    const frameIndex = Math.min(
      numFrames - 1,
      Math.max(0, Math.floor(latest))
    );
    requestAnimationFrame(() => renderScale(frameIndex));
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-render current frame
        const frameIndex = Math.floor(currentFrame.get());
        if (isLoaded && images.length > 0) {
            renderScale(frameIndex);
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Init
    
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images, currentFrame]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
      />
      
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#121212] text-white">
          <p className="animate-pulse tracking-widest text-sm uppercase">Loading sequence...</p>
        </div>
      )}
    </div>
  );
}
