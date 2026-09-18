"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoleGuard from "@/components/RoleGuard";
import {
  FilePlus,
  CheckCircle,
  Cloud,
  Wheat,
  AlertTriangle,
  Clock,
  ChevronDown,
  Sparkles,
  X,
  Copy,
  Download,
  Check,
  ShieldAlert,
  FileText,
  Loader2,
  HelpCircle,
} from "lucide-react";

type PathwayKey = "new" | "enrolled" | null;
type ModalStep = "loading" | "explanation" | "drafting" | "rti_draft";

export default function FarmerJourneyPage() {
  const [open, setOpen] = useState<PathwayKey>("enrolled");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<ModalStep>("loading");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const toggle = (key: PathwayKey) => setOpen((prev) => (prev === key ? null : key));

  // Open Modal & trigger Step 1 -> Step 2 transition after 2 seconds
  const handleOpenDiagnosticModal = () => {
    setIsModalOpen(true);
    setModalStep("loading");
  };

  useEffect(() => {
    if (isModalOpen && modalStep === "loading") {
      const timer = setTimeout(() => {
        setModalStep("explanation");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, modalStep]);

  // Trigger Step 2 -> Step 3 transition
  const handleGenerateRTI = () => {
    setModalStep("drafting");
    setTimeout(() => {
      setModalStep("rti_draft");
    }, 1200);
  };

  // Mock RTI Draft Content
  const rtiText = `To the Public Information Officer,
State Agriculture Department & PMFBY Nodal Agency,

Subject: Request for Information under RTI Act, 2005 regarding PMFBY Partial Claim Settlement for Application #CLM-8892.

Dear Sir/Madam,

I received a partial PMFBY claim settlement for Application #CLM-8892 (Kharif Paddy Crop, Medak Unit). Expected Claim: ₹50,000 | Received: ₹12,500.

I request the following specific data under the RTI Act, 2005:
1. The total official notified sown area for Paddy in my Insurance Unit (Gram Panchayat/Mandal) for Kharif 2026.
2. The total sum insured & total area insured under PMFBY policy applications in this Insurance Unit.
3. The exact Area Correction Factor (ACF) formula and scaling percentage applied to my claim calculation.

Please provide certified copies of the calculation sheet and notified area records.

Sincerely,
Ramesh Kumar
Farmer ID: FRM-90824152
Medak District, Telangana`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(rtiText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadRTI = () => {
    const element = document.createElement("a");
    const file = new Blob([rtiText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "PMFBY_RTI_Request_CLM8892.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <RoleGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative">
        {/* Main Journey Container */}
        <main className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto w-full">
          <div className="w-full max-w-2xl text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              What's your enrollment status?
            </h1>
            <p className="text-slate-600 mt-2 text-sm sm:text-base font-medium">
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

            {/* PATHWAY 2: ALREADY ENROLLED / VIEW CLAIMS */}
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
                    <div className="px-5 sm:px-6 pb-6 pt-1">
                      {/* UPDATED WARN BOX: REDUCED CLAIM SCENARIO */}
                      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-amber-900 text-base sm:text-lg">
                              Claim Partially Settled
                            </p>
                            <p className="text-sm text-amber-800 font-semibold mt-0.5">
                              Expected: ₹50,000 | Received: ₹12,500
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Context / Explanation Box */}
                      <div className="mt-4 rounded-xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">
                              Discrepancy Details
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed font-medium">
                              Portal Status: Settled. No further details provided by the insurance company regarding the deduction.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* TWO SIDE-BY-SIDE BUTTONS */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        {/* Primary Button 1: AI Diagnostic & RTI */}
                        <button
                          type="button"
                          onClick={handleOpenDiagnosticModal}
                          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
                          <span>Analyze Discrepancy &amp; Draft RTI</span>
                        </button>

                        {/* Secondary Button 2: Outline View Timeline */}
                        <button
                          type="button"
                          className="w-full py-3.5 px-4 rounded-xl border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>View Claim Timeline</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>

        {/* ============================================================================ */}
        {/* DIAGNOSTIC & RTI GENERATION MODAL */}
        {/* ============================================================================ */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-2xl bg-white rounded-3xl border border-emerald-100 shadow-2xl overflow-hidden z-10 my-auto"
              >
                {/* Modal Header */}
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                        Claim Diagnostic &amp; RTI Generator
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">
                        PMFBY Guidelines Rule-Matching Engine
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content Workflow States */}
                <div className="p-6 sm:p-8">
                  {/* STATE 1: LOADING STATE (SIMULATING RULE-MATCHING) */}
                  {modalStep === "loading" && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                      <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                      <div className="space-y-1">
                        <p className="text-base font-bold text-slate-900">
                          Analyzing Discrepancy...
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-md font-medium">
                          Matching claim data against PMFBY Operational Guidelines...
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STATE 2: PLAIN-LANGUAGE EXPLANATION (THE AI OUTPUT) */}
                  {modalStep === "explanation" && (
                    <div className="space-y-5">
                      {/* Success & Rule Matched Badge */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 text-emerald-600" />
                          <span className="font-bold text-slate-900 text-sm sm:text-base">
                            Analysis Complete
                          </span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          Rule Matched: Section 25: Area Correction Factor (ACF)
                        </span>
                      </div>

                      {/* Plain Language Explanation Card */}
                      <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                          <HelpCircle className="w-4 h-4 text-emerald-700" />
                          <span>Why was your claim reduced?</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                          Based on PMFBY rules, your claim was likely reduced because the total insured area in your block exceeded the government's official sown area. To prevent over-insurance, all claims in this unit were scaled down by 75%.
                        </p>
                      </div>

                      {/* Data Summary Table */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 font-medium">Claim Calculated</span>
                          <p className="font-extrabold text-sm text-slate-900 mt-0.5">₹ 50,000</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 font-medium">ACF Scaled Payout</span>
                          <p className="font-extrabold text-sm text-emerald-700 mt-0.5">₹ 12,500 (25%)</p>
                        </div>
                      </div>

                      {/* Action Button to State 3 */}
                      <button
                        type="button"
                        onClick={handleGenerateRTI}
                        className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Generate RTI Request for Underlying Data</span>
                      </button>
                    </div>
                  )}

                  {/* STATE 2.5: DRAFTING LOADING STATE */}
                  {modalStep === "drafting" && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                      <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                      <p className="text-sm font-bold text-slate-800">
                        Drafting targeted RTI request under RTI Act 2005...
                      </p>
                    </div>
                  )}

                  {/* STATE 3: THE RTI DRAFT (ACTIONABLE OUTPUT) */}
                  {modalStep === "rti_draft" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          Generated Formal RTI Application
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          Ready for submission
                        </span>
                      </div>

                      {/* Styled Textarea */}
                      <textarea
                        readOnly
                        rows={9}
                        value={rtiText}
                        className="w-full p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none shadow-inner"
                      />

                      {/* Action Buttons: Copy & Download */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <button
                          type="button"
                          onClick={handleCopyText}
                          className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-4 h-4 text-white" />
                              <span>Copied to Clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy to Clipboard</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleDownloadRTI}
                          className="py-3 px-4 rounded-xl border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Download className="w-4 h-4 text-emerald-700" />
                          <span>Download Request File</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* MANDATORY DISCLAIMER TEXT AT BOTTOM OF MODAL */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-[11px] text-slate-500 leading-normal font-medium italic">
                      <strong>Note:</strong> This tool explains PMFBY guidelines and drafts requests for data. It does not determine if your claim is right or wrong, and cannot guarantee a change in claim outcome.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </RoleGuard>
  );
}
