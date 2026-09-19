"use client";

/**
 * @author: @dorianbaffier
 * @description: Card Flip
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import React, { useState } from "react";
import { 
  LuArrowRight as ArrowRight, 
  LuRepeat2 as Repeat2,
  LuSparkles as Sparkles
} from "react-icons/lu";
import { cn } from "@/lib/utils";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  badgeText?: string;
}

export default function CardFlip({
  title = "Design Systems",
  subtitle = "Explore the fundamentals",
  description = "Dive deep into the world of modern UI/UX design.",
  features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
  icon,
  actionText = "Start today",
  onAction,
  badgeText,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[350px] w-full max-w-[320px] mx-auto [perspective:2000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={onAction}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-[transform] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]",
          "motion-reduce:transition-none",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
      >
        {/* FRONT OF CARD */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            "bg-white dark:bg-zinc-900",
            "border border-[#f7d5d5] dark:border-zinc-800/50",
            "shadow-sm dark:shadow-lg",
            "transition-shadow duration-500",
            "group-hover:shadow-xl dark:group-hover:shadow-2xl"
          )}
        >
          <div className="relative h-[200px] overflow-hidden bg-gradient-to-b from-[#fdf5f5] via-[#fffdf5] to-white flex items-center justify-center">
            {badgeText && (
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0]">
                  {badgeText}
                </span>
              </div>
            )}
            
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative flex h-[100px] w-[200px] items-center justify-center">
                {[...Array(10)].map((_, i) => (
                  <div
                    className={cn(
                      "absolute h-[50px] w-[50px]",
                      "rounded-[140px]",
                      "animate-[scale_3s_linear_infinite]",
                      "motion-reduce:animate-none",
                      "opacity-0",
                      "shadow-[0_0_50px_rgba(169,74,74,0.4)]",
                      "group-hover:animate-[scale_2s_linear_infinite]"
                    )}
                    key={i}
                    style={{
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {icon && (
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white border border-[#f7d5d5] text-[#A94A4A] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                {icon}
              </div>
            )}
          </div>

          <div className="absolute right-0 bottom-0 left-0 p-5 bg-white border-t border-[#f7d5d5]/50">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <h3 className="font-extrabold text-lg text-slate-900 leading-snug tracking-tight transition-transform duration-500 ease-out group-hover:translate-y-[-2px] group-hover:text-[#A94A4A]">
                  {title}
                </h3>
                <p className="line-clamp-2 text-xs text-slate-600 font-medium tracking-tight transition-transform delay-[50ms] duration-500 ease-out group-hover:translate-y-[-2px]">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative shrink-0">
                <div
                  className={cn(
                    "absolute inset-[-8px] rounded-lg transition-opacity duration-300",
                    "bg-gradient-to-br from-[#A94A4A]/20 via-[#A94A4A]/10 to-transparent"
                  )}
                />
                <Repeat2
                  aria-hidden="true"
                  className="relative z-10 h-5 w-5 text-[#A94A4A] transition-transform duration-300 group-hover/icon:-rotate-12 group-hover/icon:scale-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl p-6",
            "bg-gradient-to-b from-[#fffdf5] via-white to-[#fdf5f5]",
            "border-2 border-[#A94A4A]/40",
            "shadow-xl shadow-[#A94A4A]/15",
            "flex flex-col justify-between",
            "transition-shadow duration-500",
            "group-hover:shadow-2xl"
          )}
        >
          <div className="flex-1 space-y-4">
            <div className="space-y-1.5 border-b border-[#f7d5d5] pb-3">
              <h3 className="font-extrabold text-lg text-slate-900 leading-snug tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A94A4A]" /> {title}
              </h3>
              <p className="line-clamp-2 text-xs text-slate-600 font-medium leading-relaxed">
                {description}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {features.map((feature, index) => (
                <div
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  key={feature}
                  style={{
                    transform: isFlipped
                      ? "translateX(0)"
                      : "translateX(-10px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 50 + 150}ms`,
                  }}
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#A94A4A] shrink-0"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 border-t border-[#f7d5d5] pt-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onAction) onAction();
              }}
              className={cn(
                "group/start relative w-full",
                "flex items-center justify-between",
                "rounded-xl p-3",
                "transition-all duration-300",
                "bg-gradient-to-r from-[#A94A4A] to-[#8F3E3E]",
                "text-white shadow-md shadow-[#A94A4A]/20",
                "hover:scale-[1.02] active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A94A4A]"
              )}
            >
              <span className="font-bold text-xs">
                {actionText}
              </span>
              <div className="group/icon relative flex items-center">
                <ArrowRight
                  aria-hidden="true"
                  className="relative z-10 h-4 w-4 text-white transition-transform duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale {
          0% {
            transform: scale(2);
            opacity: 0;
            box-shadow: 0px 0px 50px rgba(169, 74, 74, 0.5);
          }
          50% {
            transform: translate(0px, -5px) scale(1);
            opacity: 1;
            box-shadow: 0px 8px 20px rgba(169, 74, 74, 0.5);
          }
          100% {
            transform: translate(0px, 5px) scale(0.1);
            opacity: 0;
            box-shadow: 0px 10px 20px rgba(169, 74, 74, 0);
          }
        }
      `}</style>
    </div>
  );
}

