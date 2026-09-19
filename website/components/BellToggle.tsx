"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuBell as BellIcon, LuBellRing as BellRingIcon } from "react-icons/lu";
import { cn } from "@/lib/utils";

export interface BellToggleProps {
  offLabel?: string;
  onLabel?: string;
  color?: string;
  background?: string;
  onColor?: string;
  onBackground?: string;
  size?: "sm" | "md" | "lg" | string;
  radius?: number;
  ringAmplitude?: number;
  ringPasses?: number;
  ringDecay?: number;
  ringDuration?: number;
  ringPivot?: number;
  crossfadeMs?: number;
  revealBounce?: number;
  count?: number;
  badge?: boolean;
  badgeColor?: string;
  waves?: boolean;
  clapper?: boolean;
  defaultPressed?: boolean;
  onChange?: (pressed: boolean) => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function BellToggle({
  offLabel = "Talk Live to Agent",
  onLabel = "Connecting Voice Agent...",
  color = "#ffffff",
  background = "#A94A4A",
  onColor = "#ffffff",
  onBackground = "#8F3E3E",
  size = "md",
  radius = 18,
  ringAmplitude = 17,
  ringPasses = 5,
  ringDecay = 1,
  ringDuration = 820,
  ringPivot = 16,
  crossfadeMs = 200,
  revealBounce = 0,
  count = 1,
  badge = true,
  badgeColor = "#ef4444",
  waves = true,
  clapper = false,
  defaultPressed = false,
  onChange,
  onClick,
  disabled = false,
  className,
}: BellToggleProps) {
  const [isPressed, setIsPressed] = useState(defaultPressed);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const nextState = !isPressed;
    setIsPressed(nextState);
    if (onChange) onChange(nextState);
    if (onClick) onClick();
  };

  const currentColor = isPressed ? onColor : color;
  const currentBackground = isPressed ? onBackground : background;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      style={{
        backgroundColor: currentBackground,
        color: currentColor,
        borderRadius: `${radius}px`,
      }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2.5 px-5 py-3 font-extrabold text-sm shadow-lg shadow-[#A94A4A]/25 cursor-pointer transition-colors duration-300 border border-white/20 select-none overflow-hidden shrink-0",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Animated Waves */}
      {waves && (
        <span className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.span
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            style={{ borderRadius: `${radius}px`, borderColor: currentColor }}
            className="absolute inset-0 border-2"
          />
        </span>
      )}

      {/* Bell Icon Container */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={
            isPressed
              ? {
                  rotate: [0, -ringAmplitude, ringAmplitude, -ringAmplitude / 2, ringAmplitude / 2, 0],
                }
              : { rotate: 0 }
          }
          transition={{
            duration: ringDuration / 1000,
            repeat: isPressed ? Infinity : 0,
            repeatDelay: 0.8,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `center top` }}
        >
          {isPressed ? (
            <BellRingIcon className="w-5 h-5 stroke-[2.5]" style={{ color: currentColor }} />
          ) : (
            <BellIcon className="w-5 h-5 stroke-[2.5]" style={{ color: currentColor }} />
          )}
        </motion.div>

        {/* Optional Badge */}
        {badge && count !== undefined && count > 0 && (
          <span
            style={{ backgroundColor: badgeColor }}
            className="absolute -top-2 -right-2 text-[10px] font-black text-white px-1.5 py-0.5 rounded-full shadow-md leading-none flex items-center justify-center min-w-[16px] h-[16px]"
          >
            {count}
          </span>
        )}
      </div>

      {/* Label Text Crossfade */}
      <AnimatePresence mode="wait">
        <motion.span
          key={isPressed ? "on" : "off"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: crossfadeMs / 1000 }}
          className="whitespace-nowrap font-bold text-sm tracking-tight"
        >
          {isPressed ? onLabel : offLabel}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
