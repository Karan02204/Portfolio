"use client";

import { useEffect, useRef, useState } from "react";

// BurnTransition — canvas-based fire/burn dissolve effect
// Inspired by the Framer BurnTransition component.
// Uses WebGL noise to create a cinematic burn reveal between sections.
export default function BurnTransition({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let progress = 0; // 0 → 1 (burn sweeps left to right)
    let raf: number;
    const SPEED = 0.008;
    const W = canvas.width;
    const H = canvas.height;

    // Noise helper (simple pseudo-random noise)
    const noise = (x: number, y: number, t: number) => {
      const s = Math.sin(x * 3.5 + t) * Math.cos(y * 2.1 - t * 0.7);
      return Math.abs(s);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw pixel-column burn effect
      const imageData = ctx.createImageData(W, H);
      const data = imageData.data;
      const t = Date.now() * 0.003;

      for (let x = 0; x < W; x++) {
        const normX = x / W;

        for (let y = 0; y < H; y++) {
          const normY = y / H;
          const n = noise(normX * 6, normY * 4, t) * 0.35; // noise displacement
          const threshold = progress + n;

          const idx = (y * W + x) * 4;

          if (normX < threshold - 0.04) {
            // Fully revealed (transparent)
            data[idx] = 0; data[idx + 1] = 0; data[idx + 2] = 0; data[idx + 3] = 0;
          } else if (normX < threshold) {
            // Burn edge — orange/white glow
            const edgeProgress = (threshold - normX) / 0.04;
            const r = Math.round(244 + (255 - 244) * edgeProgress);
            const g = Math.round(139 * (1 - edgeProgress));
            const b = Math.round(52 * (1 - edgeProgress));
            data[idx] = r; data[idx + 1] = g; data[idx + 2] = b; data[idx + 3] = 255;
          } else {
            // Covered — dark background overlay
            data[idx] = 18; data[idx + 1] = 18; data[idx + 2] = 18; data[idx + 3] = 220;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      progress += SPEED;

      if (progress < 1.15) {
        raf = requestAnimationFrame(draw);
      } else {
        setVisible(false);
        onComplete?.();
      }
    };

    // Small delay before starting
    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(draw);
    }, 200);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{ mixBlendMode: "normal" }}
    />
  );
}
