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
  CheckCircle2,
  HelpCircle,
  FileText,
  Printer,
  X,
  Calendar,
  AlertCircle
} from "lucide-react";

type PathwayKey = "new" | "enrolled" | null;

export default function FarmerDashboardPage() {
  const [open, setOpen] = useState<PathwayKey>("enrolled");
  const [showDiagnosticModal, setShowDiagnosticModal] = useState<boolean>(false);
  const [showRtiDocModal, setShowRtiDocModal] = useState<boolean>(false);
  const [showTimelineModal, setShowTimelineModal] = useState<boolean>(false);

  const toggle = (key: PathwayKey) => setOpen((prev) => (prev === key ? null : key));

  const handleGenerateRti = () => {
    setShowDiagnosticModal(false);
    setShowRtiDocModal(true);
  };

  return (
    <RoleGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Main Journey Container */}
        <main className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto w-full">
          <div className="w-full max-w-2xl text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              What's your enrollment status?
            </h1>
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
                          onClick={() => setShowDiagnosticModal(true)}
                          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 active:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-emerald-200" />
                          Analyze Discrepancy & Draft RTI
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowTimelineModal(true)}
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

        {/* MODAL 1: CLAIM DIAGNOSTIC & RTI GENERATOR (EXACT MATCH FOR SCREENSHOT) */}
        {showDiagnosticModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-100 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <Sparkles className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                      Claim Diagnostic & RTI Generator
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      PMFBY Guidelines Rule-Matching Engine
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDiagnosticModal(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Analysis Complete
                  </span>
                </div>

                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100/80 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                  Rule Matched: Section 25: Area Correction Factor (ACF)
                </span>
              </div>

              {/* Green Explanation Box */}
              <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200/80 p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Why was your claim reduced?
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pl-7">
                  Based on PMFBY rules, your claim was likely reduced because the total insured area in your block exceeded the government's official sown area. To prevent over-insurance, all claims in this unit were scaled down by 75%.
                </p>
              </div>

              {/* 2 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Claim Calculated</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900">₹ 50,000</p>
                </div>
                <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5">
                  <p className="text-xs font-semibold text-slate-500 mb-1">ACF Scaled Payout</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-emerald-700">₹ 12,500 (25%)</p>
                </div>
              </div>

              {/* Primary Green Action Button */}
              <button
                type="button"
                onClick={handleGenerateRti}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <FileText className="w-5 h-5 text-white" />
                Generate RTI Request for Underlying Data
              </button>

              {/* Footer Note */}
              <p className="text-[11px] sm:text-xs text-slate-500 italic font-medium leading-normal pt-1">
                Note: This tool explains PMFBY guidelines and drafts requests for data. It does not determine if your claim is right or wrong, and cannot guarantee a change in claim outcome.
              </p>
            </motion.div>
          </div>
        )}

        {/* MODAL 2: GENERATED RTI DOCUMENT PREVIEW */}
        {showRtiDocModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-100 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">RTI Application Document</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    RTI Request for ACF Underlying Data
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRtiDocModal(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 font-mono text-xs text-slate-800 space-y-4">
                <div className="text-center pb-3 border-b border-slate-200">
                  <p className="font-bold text-sm text-slate-900 uppercase">APPLICATION UNDER RIGHT TO INFORMATION ACT 2005</p>
                  <p className="text-[11px] text-slate-500">Demanding Area Correction Factor (ACF) Raw Data</p>
                </div>

                <div className="space-y-1 text-[11px]">
                  <p><span className="font-bold">To:</span> Public Information Officer (PIO), District Agriculture Office</p>
                  <p><span className="font-bold">Applicant:</span> Ramesh Kumar (Medak District)</p>
                  <p><span className="font-bold">Policy Ref:</span> PMFBY-2026-MEDAK-9812</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 text-[11px] leading-relaxed text-slate-700">
                  <p className="font-bold text-slate-900">INFORMATION REQUESTED:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Certified copy of the official Sown Area versus Insured Area calculation sheet for Section 25 ACF scaling.</li>
                    <li>Gram Panchayat-wise list of total insured farmers and land titles under Block Unit #402.</li>
                    <li>Date of premium subsidy matching release from State and Central authorities.</li>
                  </ol>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <Printer className="w-4 h-4" /> Print & File RTI Request
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODAL 3: CLAIM TIMELINE */}
        {showTimelineModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-100 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900">Claim Payout Audit Timeline</h3>
                <button
                  type="button"
                  onClick={() => setShowTimelineModal(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-medium">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Policy Enrolled & Sowing Completed</p>
                    <p className="text-slate-500">Premium paid: ₹ 1,250 (15 June 2026)</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">CCE Yield Experiment Completed</p>
                    <p className="text-slate-500">Calculated base claim: ₹ 50,000</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Section 25 Area Correction Factor Applied</p>
                    <p className="text-slate-600 font-medium">Insured area exceeded official sown area by 4x. Scaled down to 25% (₹ 12,500).</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowTimelineModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Close Timeline
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
