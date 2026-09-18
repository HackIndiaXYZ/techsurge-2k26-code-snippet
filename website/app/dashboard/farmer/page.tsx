'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/context/AuthContext';
import {
  FilePlus,
  CheckCircle2,
  Cloud,
  Wheat,
  AlertTriangle,
  Clock,
  ChevronDown,
  Printer,
  FileText,
  HelpCircle,
  Scale,
  Award,
  Download,
  Building2,
  Info
} from 'lucide-react';

type PathwayKey = 'new' | 'enrolled' | null;

export default function FarmerDashboardPage() {
  const { currentProfile } = useAuth();
  const [open, setOpen] = useState<PathwayKey>('enrolled');
  const [activeFarmerTab, setActiveFarmerTab] = useState<'diagnostic' | 'rti' | 'grievance'>('diagnostic');
  const [showRtiModal, setShowRtiModal] = useState(false);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);

  const toggle = (key: PathwayKey) => setOpen((prev) => (prev === key ? null : key));

  return (
    <RoleGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-16">
        {/* Header */}
        <div className="bg-white border-b border-emerald-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <Wheat className="w-4 h-4 text-emerald-600" />
                <span>Enrolled Farmer Redressal Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Farmer Dashboard — {currentProfile?.full_name || 'Ramesh Kumar'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Village: <span className="font-bold text-slate-900">{currentProfile?.district || 'Medak Village'}</span> | Policy: Kharif PMFBY Paddy
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold hidden sm:flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Primary User Portal
            </span>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Main Pathway Switcher */}
          <div className="w-full space-y-4">
            
            {/* PATHWAY 1: ALREADY ENROLLED & VIEW CLAIMS */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-white overflow-hidden shadow-md">
              <button
                type="button"
                onClick={() => toggle('enrolled')}
                aria-expanded={open === 'enrolled'}
                className="w-full flex items-center gap-4 p-5 sm:p-6 text-left bg-gradient-to-r from-emerald-50/60 via-white to-white transition-colors cursor-pointer"
              >
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 flex items-center justify-center border border-emerald-300">
                  <CheckCircle2 className="w-7 h-7 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Enrolled Farmer Redressal & Claim Audit
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                    Plain-language explanations, village harvest logic, and 12% late interest penalty audit
                  </p>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-emerald-700 shrink-0 transition-transform duration-300 ${
                    open === 'enrolled' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {open === 'enrolled' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-2 space-y-6 border-t border-slate-100">
                      
                      {/* Sub-Navigation Tabs matching Row 1 outputs */}
                      <div className="flex space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
                        <button
                          onClick={() => setActiveFarmerTab('diagnostic')}
                          className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                            activeFarmerTab === 'diagnostic'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Info className="w-3.5 h-3.5" />
                          Diagnostic Breakdown
                        </button>
                        <button
                          onClick={() => setActiveFarmerTab('rti')}
                          className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                            activeFarmerTab === 'rti'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Ready-to-Print RTI Request
                        </button>
                        <button
                          onClick={() => setActiveFarmerTab('grievance')}
                          className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                            activeFarmerTab === 'grievance'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5" />
                          Ready-to-File Grievance Letter
                        </button>
                      </div>

                      {/* TAB 1: DIAGNOSTIC BREAKDOWN */}
                      {activeFarmerTab === 'diagnostic' && (
                        <div className="space-y-4">
                          {/* Alert Card */}
                          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 sm:p-5 shadow-sm space-y-2">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <h3 className="font-extrabold text-amber-950 text-base sm:text-lg">
                                  Claim Status Audit: Payout Pending (₹45,000)
                                </h3>
                                <p className="text-xs sm:text-sm text-amber-800 font-bold mt-0.5">
                                  Eligible for statutory 12% per annum late-payment interest penalty.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* 3 Key Explanations matching Row 1 table */}
                          <div className="grid grid-cols-1 gap-3 text-xs">
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                              <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                <HelpCircle className="w-4 h-4 text-emerald-600" />
                                1. Why is your claim delayed? (Plain Language Explanation)
                              </p>
                              <p className="text-slate-600 font-medium leading-relaxed">
                                Your crop loss calculation is complete. The payout is delayed past the 21-day official deadline because of a state matching subsidy release hold. Under PMFBY rules, you are entitled to interest on late payment.
                              </p>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                              <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                <Wheat className="w-4 h-4 text-emerald-600" />
                                2. Village-Level Average Harvest vs Single-Field Damage
                              </p>
                              <p className="text-slate-600 font-medium leading-relaxed">
                                Under PMFBY, area-yield claims are calculated using Crop Cutting Experiments (CCE) conducted across your village block. Individual field damage is assessed for localized calamities (flood/hailstorm) within 72 hours of notice.
                              </p>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                              <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-amber-600" />
                                3. Automated 12% Late-Payment Penalty Audit
                              </p>
                              <p className="text-slate-600 font-medium leading-relaxed">
                                Settlement delayed by 42 days beyond statutory SLA limit. 12% per annum interest penalty calculated: <span className="font-bold text-emerald-700">+ ₹620 interest penalty owed by insurer</span>.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 2: READY-TO-PRINT RTI REQUEST */}
                      {activeFarmerTab === 'rti' && (
                        <div className="space-y-4">
                          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                            <h3 className="font-extrabold text-slate-900 text-base">
                              Ready-to-Print RTI Request
                            </h3>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              Demands raw village harvest experiment data (Form 28 CCE harvest sheets) under the Right to Information Act 2005 to verify your crop payout calculation.
                            </p>
                            <button
                              onClick={() => setShowRtiModal(true)}
                              className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 shadow-md shadow-emerald-600/20"
                            >
                              <Printer className="w-4 h-4" /> Generate & Print RTI Request
                            </button>
                          </div>
                        </div>
                      )}

                      {/* TAB 3: READY-TO-FILE GRIEVANCE LETTER */}
                      {activeFarmerTab === 'grievance' && (
                        <div className="space-y-4">
                          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                            <h3 className="font-extrabold text-slate-900 text-base">
                              Ready-to-File Grievance Letter
                            </h3>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              Pre-filled formal grievance letter addressed to the Local District Grievance Officer demanding immediate release of settlement amount along with 12% late interest penalty.
                            </p>
                            <button
                              onClick={() => setShowGrievanceModal(true)}
                              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors inline-flex items-center gap-2 shadow-md"
                            >
                              <FileText className="w-4 h-4 text-emerald-400" /> Generate & Print Grievance Letter
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PATHWAY 2: NEW FARMER */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggle('new')}
                aria-expanded={open === 'new'}
                className="w-full flex items-center gap-4 p-5 text-left transition-colors cursor-pointer hover:bg-slate-50"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                  <FilePlus className="w-6 h-6 text-slate-700" />
                </div>
                <div className="flex-1">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    New Farmer / Explore PMFBY Schemes
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    Explore crop insurance schemes and non-loanee farmer enrolment rules
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                    open === 'new' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

          </div>
        </main>

        {/* RTI Modal */}
        {showRtiModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base">RTI Application Form 28 Demand</h3>
                <button onClick={() => setShowRtiModal(false)} className="text-xs font-bold text-slate-500">✕</button>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-slate-800 space-y-2">
                <p className="font-bold text-slate-900">APPLICATION UNDER RIGHT TO INFORMATION ACT 2005</p>
                <p>To: Public Information Officer, District Agriculture Office</p>
                <p>Applicant: {currentProfile?.full_name || 'Ramesh Kumar'} (Medak Village)</p>
                <p className="text-slate-700 pt-2 border-t border-slate-200">
                  Please provide certified copies of Form 28 Crop Cutting Experiment (CCE) raw yield data sheets for Kharif 2026 Paddy in Gram Panchayat Medak.
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => window.print()} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5">
                  <Printer className="w-4 h-4" /> Print RTI
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grievance Modal */}
        {showGrievanceModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base">Formal Grievance Letter</h3>
                <button onClick={() => setShowGrievanceModal(false)} className="text-xs font-bold text-slate-500">✕</button>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-slate-800 space-y-2">
                <p className="font-bold text-slate-900">FORMAL GRIEVANCE REGARDING PMFBY CLAIM DELAY & PENALTY</p>
                <p>To: District Grievance Officer / District Agriculture Officer</p>
                <p>Complainant: {currentProfile?.full_name || 'Ramesh Kumar'}</p>
                <p className="text-slate-700 pt-2 border-t border-slate-200">
                  My claim (₹45,000) has been delayed by 42 days beyond statutory timeline. I hereby request immediate disbursement along with statutory 12% per annum interest penalty of ₹620.
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => window.print()} className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5">
                  <Printer className="w-4 h-4 text-emerald-400" /> Print Grievance
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
