"use client";

import React, { useRef, useEffect, useState } from "react";

export interface WarpTextProps {
  text: string;
  color?: string;
  warpStrength?: number;
  warpScale?: number;
  speed?: number;
  pointerInfluence?: number;
  pointerStrength?: number;
  refraction?: number;
  ripple?: boolean;
  fontSize?: number;
  fontWeight?: number | string;
  style?: React.CSSProperties;
  fontFamily?: string;
  letterSpacing?: number;
  lineHeight?: number;
  className?: string;
}

export default function WarpText({
  text = "Bend the moment",
  color = "#A94A4A",
  warpStrength = 0.08,
  warpScale = 1.7,
  speed = 0.55,
  pointerInfluence = 0.42,
  pointerStrength = 0.38,
  refraction = 0.018,
  ripple = true,
  fontSize = 48,
  fontWeight = 800,
  style = {},
  fontFamily = "inherit",
  letterSpacing = -0.04,
  lineHeight = 1.0,
  className = "",
}: WarpTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const animFrameRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 160 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width || 800,
          height: rect.height || Math.max(120, fontSize * 2.2),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [fontSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = dimensions.width;
    const height = dimensions.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Offscreen buffer for text rendering
    const offscreen = document.createElement("canvas");
    offscreen.width = width * dpr;
    offscreen.height = height * dpr;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    let time = 0;

    const render = () => {
      time += speed * 0.02;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      // Clear offscreen
      offCtx.save();
      offCtx.scale(dpr, dpr);
      offCtx.clearRect(0, 0, width, height);

      // Render crisp base text
      const responsiveFontSize = Math.min(fontSize, width * 0.12);
      offCtx.font = `${fontWeight} ${responsiveFontSize}px Montserrat, sans-serif`;
      offCtx.fillStyle = color;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      
      if (letterSpacing) {
        offCtx.letterSpacing = `${letterSpacing * responsiveFontSize}px`;
      }

      offCtx.fillText(text, width / 2, height / 2);
      offCtx.restore();

      // Clear main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid mesh slice displacement for warp & ripple effect
      const cols = 40;
      const rows = 20;
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;

      const mx = mouseRef.current.x * dpr;
      const my = mouseRef.current.y * dpr;
      const isMouseActive = mouseRef.current.active;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const sx = c * cellW;
          const sy = r * cellH;

          // Calculate center of cell
          const cx = sx + cellW / 2;
          const cy = sy + cellH / 2;

          // Distance to mouse
          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Pointer warp influence
          let offsetX = Math.sin(time + cx * 0.01 * warpScale) * 12 * warpStrength;
          let offsetY = Math.cos(time + cy * 0.01 * warpScale) * 12 * warpStrength;

          if (isMouseActive && dist < 220 * dpr) {
            const factor = Math.max(0, 1 - dist / (220 * dpr));
            const push = Math.sin(dist * 0.03 - time * 4) * pointerStrength * 35 * factor;
            offsetX += (dx / (dist || 1)) * push * pointerInfluence;
            offsetY += (dy / (dist || 1)) * push * pointerInfluence;

            if (ripple) {
              const rip = Math.sin(dist * 0.08 - time * 6) * refraction * 40;
              offsetX += rip;
              offsetY += rip;
            }
          }

          ctx.drawImage(
            offscreen,
            sx, sy, cellW, cellH,
            sx + offsetX, sy + offsetY, cellW, cellH
          );
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [text, color, warpStrength, warpScale, speed, pointerInfluence, pointerStrength, refraction, ripple, fontSize, fontWeight, dimensions]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    mouseRef.current.targetX = -1000;
    mouseRef.current.targetY = -1000;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full flex items-center justify-center overflow-hidden cursor-pointer select-none ${className}`}
      style={{ height: style.height || "auto", ...style }}
    >
      <canvas ref={canvasRef} className="block pointer-events-none" />
    </div>
  );
}
