'use client';

import React, { useState } from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/context/AuthContext';
import {
  LuStore as Store,
  LuClock as Clock,
  LuFileCheck as FileCheck,
  LuPrinter as Printer,
  LuCircleCheck as CheckCircle2,
  LuCircleAlert as AlertCircle,
  LuDownload as Download,
  LuUserCheck as UserCheck,
  LuFileText as FileText,
  LuSearch as Search,
  LuSparkles as Sparkles,
  LuShieldAlert as ShieldAlert,
} from 'react-icons/lu';
import CursorGrid from '@/components/CursorGrid';

export default function CSCDashboardPage() {
  const { currentProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'intake' | 'checklist' | 'package' | 'history'>('intake');

  // Intake form state
  const [farmerAadhaar, setFarmerAadhaar] = useState('');
  const [farmerName, setFarmerName] = useState('Ramesh Kumar');
  const [crop, setCrop] = useState('Paddy (Kharif 2026)');
  const [surveyNo, setSurveyNo] = useState('142/A');
  const [hasLandPahani, setHasLandPahani] = useState(true);
  const [hasBankDetails, setHasBankDetails] = useState(true);
  const [hasLossReceipt, setHasLossReceipt] = useState(false); // Flags missing document!

  const [packageGenerated, setPackageGenerated] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);

  const missingDocs = [
    !hasLandPahani && 'Land Title Deed / Pahani (Form 1-B)',
    !hasBankDetails && 'Bank Passbook / Aadhaar Link Proof',
    !hasLossReceipt && '72-Hour Crop Loss Intimation Receipt',
  ].filter(Boolean);

  const handleGeneratePackage = () => {
    setPackageGenerated(true);
    setShowPackageModal(true);
  };

  return (
    <RoleGuard>
      <div className="min-h-screen bg-[#FFF6DA] text-slate-900 pb-16 font-sans relative overflow-hidden">
        {/* Background Soft Glows */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#fbeaea]/70 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-[#feebaf]/70 rounded-full blur-[120px] pointer-events-none" />

        {/* Interactive Cursor Grid Background */}
        <CursorGrid
          cellSize={70}
          color="#A94A4A"
          radius={140}
          falloff="smooth"
          holdTime={400}
          fadeDuration={800}
          lineWidth={1.2}
          maxOpacity={0.8}
          fillOpacity={0.06}
          gridOpacity={0.04}
          cellRadius={6}
          clickPulse
          pulseSpeed={600}
        />
        {/* Header Banner */}
        <div className="bg-white border-b border-[#f7d5d5] shadow-sm relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#8c3a3a] uppercase tracking-wider mb-1">
                <Store className="w-4 h-4 text-[#a94a4a]" />
                <span>Common Service Centre #402 • Medak Centre</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                CSC VLE Operator Ground Facilitation Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Operator: <span className="font-bold text-slate-900">{currentProfile?.full_name || 'Pooja Verma'}</span> | Fast Farmer Intake & Package Generator
              </p>
            </div>

            <span className="px-3 py-1.5 rounded-xl bg-[#F3E8CF] border border-[#E6D0A0] text-[#785114] text-xs font-bold flex items-center gap-1.5 self-start md:self-auto">
              <Sparkles className="w-4 h-4 text-[#b8860b]" />
              Intake Time Benchmark: &lt; 3 Minutes
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="max-w-7xl mx-auto px-6 flex space-x-2 border-t border-slate-100 pt-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('intake')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'intake'
                ? 'border-[#a94a4a] text-[#8c3a3a] bg-[#fdf5f5] rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <Clock className="w-4 h-4 text-[#a94a4a]" />
              Quick Intake Form (&lt;3 Mins)
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'checklist'
                ? 'border-[#a94a4a] text-[#8c3a3a] bg-[#fdf5f5] rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <FileCheck className="w-4 h-4 text-emerald-600" />
              Visual Application Checklist
            </button>
            <button
              onClick={() => setActiveTab('package')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'package'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <Printer className="w-4 h-4 text-emerald-600" />
              Single-Click Printable Package
            </button>
          </div>
        </div>

        {/* Content Container */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 relative z-10">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Farmers Assisted Today</p>
              <p className="text-2xl font-extrabold text-slate-900">28 Farmers</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Avg intake speed: 2m 14s</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Missing Docs Detected</p>
              <p className="text-2xl font-extrabold text-amber-600">4 Flagged</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">No submission rejection guesswork</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Packages Handed Out</p>
              <p className="text-2xl font-extrabold text-emerald-700">24 Bundles</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Summary + Grievance + RTI</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">CSC Wallet Premium</p>
              <p className="text-2xl font-extrabold text-emerald-800">₹ 89,200</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Synced with PMFBY Portal</p>
            </div>
          </div>

          {/* TAB 1: Quick Intake Form (<3 mins) */}
          {activeTab === 'intake' && (
            <div className="space-y-6">
              <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-800 text-emerald-200 border border-emerald-700">
                  Feature 1: Easy &lt;3 Minute Intake Form
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Assist Visiting Farmers Instantly
                </h2>
                <p className="text-emerald-100 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Eliminate form-filling delays. Takes less than 3 minutes to capture farmer details, run automatic document verification, and generate a complete redressal package.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Inputs */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
                  <h3 className="font-extrabold text-slate-900 text-lg">Farmer Intake Details</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Farmer Name</label>
                      <input
                        type="text"
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Aadhaar / Passbook No.</label>
                      <input
                        type="text"
                        placeholder="e.g. 9876-5432-4321"
                        value={farmerAadhaar}
                        onChange={(e) => setFarmerAadhaar(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Crop Sown</label>
                      <select
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option>Paddy (Kharif 2026)</option>
                        <option>Cotton (Kharif 2026)</option>
                        <option>Soyabean (Kharif 2026)</option>
                        <option>Maize (Kharif 2026)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Survey No / Land Khata</label>
                      <input
                        type="text"
                        value={surveyNo}
                        onChange={(e) => setSurveyNo(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Document Checklist Switches */}
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-900 mb-3">Document Verification Checklist:</p>
                    <div className="space-y-2 text-xs font-medium">
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasLandPahani}
                          onChange={(e) => setHasLandPahani(e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span>Land Title Deed / Pahani (Form 1-B) available</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasBankDetails}
                          onChange={(e) => setHasBankDetails(e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span>Bank Passbook & Aadhaar Link verified</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasLossReceipt}
                          onChange={(e) => setHasLossReceipt(e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span>72-Hour Loss Intimation Slip attached</span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleGeneratePackage}
                    className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                  >
                    <Printer className="w-4 h-4" />
                    Generate Printable Package (1-Click)
                  </button>
                </div>

                {/* Live Document Missing Detector Box */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase mb-3">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Missing Document Detector</span>
                    </div>

                    {missingDocs.length > 0 ? (
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                        <p className="font-bold text-amber-900">Missing Form / Receipt Identified:</p>
                        <ul className="list-disc list-inside text-amber-800 space-y-1 font-medium">
                          {missingDocs.map((doc, idx) => (
                            <li key={idx}>{doc}</li>
                          ))}
                        </ul>
                        <p className="text-[11px] text-amber-700 pt-2 border-t border-amber-200 font-medium">
                          System will automatically append missing document request notice in farmer's printable RTI packet.
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> All Mandatory Documents Complete!
                        </p>
                        <p className="text-[11px] text-emerald-700 font-medium">Ready for instant single-click dispatch.</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                    <p>Operator Note:</p>
                    <p className="text-slate-700 mt-1">
                      Hand the printed 3-page package (Summary + Grievance + RTI) directly to the visiting farmer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Visual Application Checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                  Feature 2: Visual Application Checklist
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Visual Confirmation before Submission
                </h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Confirms land ownership, crop details, and bank account linkages to prevent application rejections.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Land Title & Sowing Validation
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Khata/Survey No:</span>
                      <span className="font-bold text-slate-900">{surveyNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pahani Record Title:</span>
                      <span className="font-bold text-emerald-700">Verified (State Dharani Portal)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Bank & Aadhaar Link Check
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Direct Bank Transfer (DBT):</span>
                      <span className="font-bold text-emerald-700">Active (Aadhaar Seeded)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">IFSC Verification:</span>
                      <span className="font-bold text-slate-900">SBIN0001234 (Medak Branch)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Single-Click Printable Package */}
          {activeTab === 'package' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center max-w-2xl mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                  <Printer className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Single-Click Printable Package Generator</h3>
                <p className="text-xs text-slate-600 font-medium">
                  Generates a complete 3-in-1 printable package (Summary + Grievance Letter + RTI Request) for visiting farmers.
                </p>
                <button
                  onClick={handleGeneratePackage}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 shadow-md"
                >
                  <Printer className="w-4 h-4" /> Print Package for {farmerName}
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Printable Package Modal */}
        {showPackageModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">CSC Operator Package Output</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    Printable Farmer Package (Summary + Grievance + RTI)
                  </h3>
                </div>
                <button
                  onClick={() => setShowPackageModal(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 font-mono text-xs text-slate-800 space-y-4">
                <div className="text-center pb-3 border-b border-slate-200">
                  <p className="font-bold text-sm text-slate-900 uppercase">Common Service Centre #402 (Medak)</p>
                  <p className="text-[11px] text-slate-500">Official Ground Facilitation Package under PMFBY</p>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-slate-900">1. APPLICATION SUMMARY SHEET</p>
                  <p className="text-[11px]">Farmer: {farmerName} | Crop: {crop} | Survey: {surveyNo}</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200">
                  <p className="font-bold text-slate-900">2. PRE-FILLED GRIEVANCE LETTER</p>
                  <p className="text-[11px] text-slate-700">Addressed to District Agriculture Officer demanding claim status audit & late penalty enforcement.</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200">
                  <p className="font-bold text-slate-900">3. READY-TO-FILE RTI REQUEST</p>
                  <p className="text-[11px] text-slate-700">Demanding raw village CCE harvest experiment data under RTI Act 2005.</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Full Package
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
