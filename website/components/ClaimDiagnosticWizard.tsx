"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuSparkles as Sparkles,
  LuArrowRight as ArrowRight,
  LuFileText as FileText,
  LuCheck as Check,
  LuCopy as Copy,
  LuDownload as Download,
  LuX as X
} from "react-icons/lu";

export default function ClaimDiagnosticWizard({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    crop: "",
    sumInsured: "",
    claimReceived: "",
    damageType: "",
    reportingDelay: ""
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calls the Backend API
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/analyze-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Failed to analyze claim", error);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (result?.rtiDraft) {
      navigator.clipboard.writeText(result.rtiDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (result?.rtiDraft) {
      const element = document.createElement("a");
      const file = new Blob([result.rtiDraft], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "PMFBY_RTI_Request.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-emerald-100 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-50">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Analyze Discrepancy &amp; Draft RTI</h1>
          <p className="text-xs text-slate-500 font-medium">PMFBY Synthetic Scenario Rule Engine</p>
        </div>
      </div>

      {!result && !loading && (
        <AnimatePresence mode="wait">
          {/* Step 1: Scenario Input */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-sm font-bold text-slate-700 mb-3">Provide synthetic claim details for analysis:</h2>
              <input
                type="text"
                placeholder="Insured Crop (e.g., Paddy / Soybean)"
                value={formData.crop}
                className="w-full p-3 mb-3 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-900"
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
              />
              <input
                type="number"
                placeholder="Expected Sum Insured (₹)"
                value={formData.sumInsured}
                className="w-full p-3 mb-3 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-900"
                onChange={(e) => setFormData({ ...formData, sumInsured: e.target.value })}
              />
              <input
                type="number"
                placeholder="Actual Amount Received (₹)"
                value={formData.claimReceived}
                className="w-full p-3 mb-4 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-900"
                onChange={(e) => setFormData({ ...formData, claimReceived: e.target.value })}
              />
              <button onClick={() => setStep(2)} className="w-full bg-emerald-600 text-white p-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20 cursor-pointer">
                Continue <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {/* Step 2: Damage Context */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-sm font-bold text-slate-700 mb-3">What type of loss occurred?</h2>
              <select
                value={formData.damageType}
                className="w-full p-3 mb-3 border border-slate-200 rounded-xl bg-white outline-none focus:border-emerald-500 text-sm text-slate-900"
                onChange={(e) => setFormData({ ...formData, damageType: e.target.value })}
              >
                <option value="">Select loss type...</option>
                <option value="LOCALIZED">Localized (Hailstorm, Inundation)</option>
                <option value="WIDESPREAD">Widespread (Drought, General Yield Loss)</option>
              </select>

              {formData.damageType === "LOCALIZED" && (
                <select
                  value={formData.reportingDelay}
                  className="w-full p-3 mb-4 border border-slate-200 rounded-xl bg-white outline-none focus:border-emerald-500 text-sm text-slate-900"
                  onChange={(e) => setFormData({ ...formData, reportingDelay: e.target.value })}
                >
                  <option value="">When was it reported?</option>
                  <option value="UNDER_72">Within 72 hours</option>
                  <option value="OVER_72">After 72 hours</option>
                </select>
              )}

              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(1)} className="w-1/3 bg-slate-100 text-slate-700 p-3.5 rounded-xl font-bold hover:bg-slate-200 transition-colors cursor-pointer">Back</button>
                <button onClick={handleSubmit} className="w-2/3 bg-emerald-600 text-white p-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20 cursor-pointer">
                  <Sparkles size={18} /> Generate Explanation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {loading && (
        <div className="py-12 text-center text-emerald-800 flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-bold">Matching scenario against PMFBY Operational Guidelines...</p>
        </div>
      )}

      {/* The AI Output View */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Rule Matched: {result.rule}</h3>
            <p className="text-slate-700 leading-relaxed text-sm font-medium">{result.plainLanguageExplanation}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText size={16} className="text-emerald-600" /> Generated RTI Draft
            </h3>
            <textarea
              readOnly
              className="w-full h-48 p-4 border border-slate-200 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono outline-none resize-none shadow-inner"
              value={result.rtiDraft}
            />
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 px-3 border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Download File</span>
              </button>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 text-center font-medium italic">
            Disclaimer: This tool explains crop insurane rules and requests underlying data. It does not determine if a claim is correct.
          </p>
        </motion.div>
      )}
    </div>
  );
}
