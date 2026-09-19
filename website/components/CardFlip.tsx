"use client";

import React, { useState } from "react";
import { 
  LuArrowRight as ArrowRight, 
  LuRepeat2 as Repeat2,
  LuSparkles as Sparkles
} from "react-icons/lu";
import { cn } from "@/lib/utils";

export interface CardFlipProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  actionText: string;
  onAction: () => void;
  badgeText?: string;
}

export default function CardFlip({
  title,
  subtitle,
  description,
  features,
  icon,
  actionText,
  onAction,
  badgeText = "Hover to Flip",
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[360px] w-full max-w-[340px] mx-auto [perspective:2000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={onAction}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-[transform] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]",
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
            "overflow-hidden rounded-3xl",
            "bg-white border-2 border-[#f7d5d5]",
            "shadow-md hover:shadow-2xl hover:shadow-[#A94A4A]/15",
            "transition-all duration-500 flex flex-col justify-between p-6"
          )}
        >
          {/* Animated Background Pulse */}
          <div className="relative h-32 overflow-hidden rounded-2xl bg-gradient-to-b from-[#fdf5f5] to-[#fffdf5] border border-[#f7d5d5]/60 flex items-center justify-center">
            <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-[100px] w-[180px] items-center justify-center">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "absolute h-[60px] w-[60px]",
                      "rounded-full",
                      "animate-[scale_3s_linear_infinite]",
                      "motion-reduce:animate-none",
                      "opacity-0",
                      "shadow-[0_0_40px_rgba(169,74,74,0.3)]",
                      "group-hover:animate-[scale_2s_linear_infinite]"
                    )}
                    style={{
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Icon Container */}
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-white border border-[#f7d5d5] text-[#A94A4A] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              {icon}
            </div>
          </div>

          {/* Front Content */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0]">
                {badgeText}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#A94A4A]">
                <Repeat2 className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Flip Card</span>
              </div>
            </div>

            <h3 className="font-extrabold text-2xl text-slate-900 leading-snug tracking-tight group-hover:text-[#A94A4A] transition-colors">
              {title}
            </h3>
            <p className="line-clamp-2 text-xs text-slate-600 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Front Footer CTA */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8c3a3a] group-hover:translate-x-1 transition-transform">
            <span>Hover to View Details</span>
            <ArrowRight className="w-4 h-4 text-[#A94A4A]" />
          </div>
        </div>

        {/* BACK OF CARD */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-3xl p-6",
            "bg-gradient-to-b from-[#fffdf5] via-white to-[#fdf5f5]",
            "border-2 border-[#A94A4A]/40",
            "shadow-xl shadow-[#A94A4A]/20",
            "flex flex-col justify-between",
            "transition-shadow duration-500"
          )}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#f7d5d5] pb-3">
              <h3 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A94A4A]" /> {title} Portal
              </h3>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {description}
            </p>

            {/* Features List */}
            <div className="space-y-2 pt-1">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#785114]">Key Capabilities:</p>
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs font-bold text-slate-800 transition-all duration-300"
                  style={{
                    transform: isFlipped ? "translateX(0)" : "translateX(-10px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 50 + 150}ms`,
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-[#fdf5f5] border border-[#f7d5d5] flex items-center justify-center shrink-0">
                    <ArrowRight className="h-2.5 w-2.5 text-[#A94A4A]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Back Action Button */}
          <div className="mt-4 pt-3 border-t border-[#f7d5d5]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAction();
              }}
              className={cn(
                "w-full py-3 px-4 rounded-2xl font-bold text-xs",
                "bg-[#A94A4A] text-white",
                "flex items-center justify-between",
                "hover:bg-[#8F3E3E] transition-all shadow-md shadow-[#A94A4A]/25",
                "hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <span>{actionText}</span>
              <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale {
          0% {
            transform: scale(2);
            opacity: 0;
            box-shadow: 0px 0px 40px rgba(169, 74, 74, 0.4);
          }
          50% {
            transform: translate(0px, -5px) scale(1);
            opacity: 0.8;
            box-shadow: 0px 8px 20px rgba(169, 74, 74, 0.4);
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
