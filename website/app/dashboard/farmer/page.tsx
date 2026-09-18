"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoleGuard from "@/components/RoleGuard";
import {
  FilePlus,
  CheckCircle,
  Cloud,
  Wheat,
  ShieldCheck,
  Clock,
  ChevronDown,
  Sparkles,
} from "lucide-react";

type PathwayKey = "new" | "enrolled" | null;

export default function FarmerDashboardPage() {
  const [open, setOpen] = useState<PathwayKey>("enrolled");

  const toggle = (key: PathwayKey) => setOpen((prev) => (prev === key ? null : key));

  return (
    <RoleGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Main Journey Container */}
        <main className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto w-full">
          <div className="w-full max-w-2xl text-center mb-10">
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Select the option that matches your current situation to continue.
            </p>
          </div>

          <div className="w-full max-w-2xl space-y-5">
            {/* PATHWAY 1: NOT ENROLLED */}
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 overflow-hidden transition-all hover:border-emerald-400 shadow-sm">
              <button
                type="button"
                onClick={() => toggle("new")}
                aria-expanded={open === "new"}
                className="w-full flex items-center gap-4 p-5 sm:p-6 text-left min-h-[88px] active:bg-emerald-100/50 transition-colors cursor-pointer"
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center border border-emerald-200">
                  <FilePlus className="w-7 h-7 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    New Farmer / Not Enrolled
                  </h2>
                  <p className="text-sm text-slate-600 mt-0.5 font-medium">
                    Explore schemes and enroll for crop insurance
                  </p>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-emerald-700 shrink-0 transition-transform duration-300 ${
                    open === "new" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {open === "new" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 space-y-3">
                      {/* Scheme A */}
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-emerald-100 shadow-sm">
                        <div className="shrink-0 w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <Wheat className="w-5.5 h-5.5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                            PMFBY
                            <span className="font-normal text-slate-500 text-xs sm:text-sm">
                              {" "}
                              — Pradhan Mantri Fasal Bima Yojana
                            </span>
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                            Yield-based crop insurance.
                          </p>
                        </div>
                      </div>

                      {/* Scheme B */}
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-emerald-100 shadow-sm">
                        <div className="shrink-0 w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <Cloud className="w-5.5 h-5.5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                            RWBCIS
                            <span className="font-normal text-slate-500 text-xs sm:text-sm">
                              {" "}
                              — Restructured Weather Based Crop Insurance Scheme
                            </span>
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                            Weather-index based insurance.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="w-full mt-2 py-4 rounded-xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 active:bg-emerald-800 transition-colors min-h-[56px] shadow-md shadow-emerald-600/20 cursor-pointer"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PATHWAY 2: ALREADY ENROLLED */}
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 overflow-hidden transition-all hover:border-emerald-400 shadow-sm">
              <button
                type="button"
                onClick={() => toggle("enrolled")}
                aria-expanded={open === "enrolled"}
                className="w-full flex items-center gap-4 p-5 sm:p-6 text-left min-h-[88px] active:bg-emerald-100/50 transition-colors cursor-pointer"
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center border border-emerald-200">
                  <CheckCircle className="w-7 h-7 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Already Enrolled / View Claims
                  </h2>
                  <p className="text-sm text-slate-600 mt-0.5 font-medium">
                    Check your claim status and payout details
                  </p>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-emerald-700 shrink-0 transition-transform duration-300 ${
                    open === "enrolled" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {open === "enrolled" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 space-y-4">
                      {/* Claim Partially Settled Banner */}
                      <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-emerald-950 text-base sm:text-lg">
                              Claim Partially Settled
                            </p>
                            <p className="text-xs sm:text-sm text-emerald-800 font-bold mt-0.5">
                              Expected: ₹50,000 | Received: ₹12,500
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Discrepancy Details Box */}
                      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">
                              Discrepancy Details
                            </p>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                              Portal Status: Settled. No further details provided by the insurance company regarding the deduction.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 2 Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <button
                          type="button"
                          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 active:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-emerald-200" />
                          Analyze Discrepancy & Draft RTI
                        </button>
                        <button
                          type="button"
                          className="w-full py-3.5 px-4 rounded-xl border-2 border-emerald-600 text-emerald-800 font-bold text-sm hover:bg-emerald-50 active:bg-emerald-100 transition-colors flex items-center justify-center cursor-pointer"
                        >
                          View Claim Timeline
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </RoleGuard>
  );
}
