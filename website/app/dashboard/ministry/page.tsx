'use client';

import React, { useState } from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/context/AuthContext';
import { 
  ShieldCheck, 
  Globe, 
  PhoneCall, 
  CheckCircle2, 
  FileCode, 
  Lock, 
  AlertCircle, 
  Download, 
  Printer, 
  Share2, 
  BarChart, 
  Sparkles 
} from 'lucide-react';

export default function MinistryDashboardPage() {
  const { currentProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'krishi' | 'bottleneck' | 'safety' | 'national'>('krishi');
  const [showJsonExport, setShowJsonExport] = useState(false);

  const krishiSchemaSample = {
    helpline: 'Krishi Rakshak Helpline 14447',
    schema_version: '2.4.0',
    national_portal_id: 'KRISHI-14447-2026-9901',
    state_code: 'TG',
    district: 'Rangareddy',
    dispute_category: 'Area-Yield Shortfall & 12% Late Interest Penalty',
    timeline_sla_status: '21-Day Mandate Exceeded',
    krishi_rakshak_synced: true,
    non_adjudication_compliant: true,
  };

  return (
    <RoleGuard>
<<<<<<< HEAD
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
        {/* Header Banner */}
        <div className="bg-white border-b border-rose-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>Ministry of Agriculture & Farmers Welfare • New Delhi HQ</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                National PMFBY Policy & Oversight Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Joint Secretary: <span className="font-bold text-slate-900">{currentProfile?.full_name || 'Dr. Meena Swaminathan (Joint Sec.)'}</span> | Krishi Rakshak (14447) Schema Integration
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-rose-600" />
                Krishi Rakshak Helpline 14447: Synced
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="max-w-7xl mx-auto px-6 flex space-x-2 border-t border-slate-100 pt-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('krishi')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'krishi'
                  ? 'border-rose-600 text-rose-900 bg-rose-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              Krishi Rakshak (14447) Schema Aligner
            </button>
            <button
              onClick={() => setActiveTab('bottleneck')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'bottleneck'
                  ? 'border-rose-600 text-rose-900 bg-rose-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart className="w-4 h-4 text-rose-600" />
              Scheme Accountability Audit
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'safety'
                  ? 'border-rose-600 text-rose-900 bg-rose-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-4 h-4 text-rose-600" />
              Non-Adjudication Safety Boundaries
            </button>
=======
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Ministry of Agriculture & Farmers Welfare • New Delhi</span>
>>>>>>> 30c7a308f814d9df961021c94e3113530f54ae65
          </div>
        </div>

        {/* Content Container */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Top Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">National Coverage</p>
              <p className="text-2xl font-extrabold text-slate-900">5.4 Crore</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Farmers enrolled across India</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Central Share Allocation</p>
              <p className="text-2xl font-extrabold text-rose-700">₹ 8,450 Crore</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">FY 2026-27 Union Budget</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Krishi Rakshak Helpline (14447)</p>
              <p className="text-2xl font-extrabold text-emerald-700">100% Schema Aligned</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Standardized grievance format</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Safety Guardrails</p>
              <p className="text-2xl font-extrabold text-slate-900">Rule Explanations Only</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Non-adjudication boundaries enforced</p>
            </div>
          </div>
<<<<<<< HEAD

          {/* TAB 1: Krishi Rakshak Helpline 14447 Schema Aligner */}
          {activeTab === 'krishi' && (
            <div className="space-y-6">
              <div className="bg-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-rose-900">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-900 text-rose-300 border border-rose-700">
                  Feature 1: Krishi Rakshak Helpline (14447) Schema Aligner
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Standardized National Grievance Integration
                </h2>
                <p className="text-rose-200 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Aligns ground-level dispute data from all states directly with the central Krishi Rakshak Helpline (14447) portal schema. Ensures uniform grievance formatting across all empanelled insurance companies.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-rose-600" />
                    Krishi Rakshak Portal Schema Payload
                  </h3>
                  <div className="bg-slate-900 text-emerald-400 p-5 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
                    {Object.entries(krishiSchemaSample).map(([key, val]) => (
                      <div key={key}>
                        <span className="text-slate-400">"{key}":</span>{' '}
                        <span className="text-emerald-300">{JSON.stringify(val)}</span>,
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowJsonExport(true)}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Export 14447 Schema Package
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base">Schema Verification</h3>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> National Schema Compliant
                    </p>
                    <p className="text-[11px] text-emerald-800 font-medium">
                      All ground redressal packets generated by farmers, CSCs, and DAOs map 1-to-1 with central Krishi Rakshak (14447) specifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Scheme Accountability & Bottleneck Audit */}
          {activeTab === 'bottleneck' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-rose-400 border border-slate-700">
                  Feature 2: Scheme Accountability & Bottleneck Audit
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Systemic Bottleneck Tracker Across States
                </h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Audits published timeline compliance vs actual claim settlement days across 18 empanelled insurance companies nationwide.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-extrabold text-slate-900 text-base mb-4">Empanelled Insurer Timeline Compliance Matrix</h3>
                <div className="divide-y divide-slate-100 font-medium text-xs text-slate-700">
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">Agriculture Insurance Company of India (AIC)</p>
                      <p className="text-slate-500">Avg Settlement: 18 Days (Within 21-Day SLA)</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">Compliant</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">HDFC ERGO General Insurance</p>
                      <p className="text-slate-500">Avg Settlement: 34 Days (Flagged for 12% Interest Penalty Audit)</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold">12% Penalty Flagged</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Non-Adjudication Safety Boundaries */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="bg-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-amber-900">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-900 text-amber-300 border border-amber-700">
                  Feature 3: Non-Adjudication Policy Safety Guardrails
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Legal Boundary Enforcement Engine
                </h2>
                <p className="text-amber-200 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Enforces strict non-adjudication safety boundaries: ensures the tool explains published PMFBY rules rather than passing unauthorized legal judgments.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-600" /> Boundary Compliance Active
                  </p>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    All generated reports (RTI requests, DLGRC briefs, Grievance letters) clearly state that they present published PMFBY rule evaluations and statutory timeline audits, without usurping judicial authority.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Modal */}
        {showJsonExport && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base">Krishi Rakshak (14447) Export</h3>
                <button onClick={() => setShowJsonExport(false)} className="text-xs font-bold text-slate-500">✕</button>
              </div>
              <p className="text-xs text-slate-600 font-medium">Standardized schema payload successfully formatted for direct API sync to national Krishi Rakshak Portal (14447).</p>
              <div className="flex justify-end">
                <button onClick={() => setShowJsonExport(false)} className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs">Close</button>
              </div>
            </div>
          </div>
        )}
=======
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">Central Share Budget</p>
            <p className="text-2xl font-bold text-emerald-400">₹ 8,450 Crore</p>
            <p className="text-[11px] text-slate-500 mt-1">FY 2026-27 Allocation</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">Empanelled Insurers</p>
            <p className="text-2xl font-bold text-emerald-400">18 Companies</p>
            <p className="text-[11px] text-slate-500 mt-1">Public & Private Insurers</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">National Claim Ratio</p>
            <p className="text-2xl font-bold text-emerald-400">88.6%</p>
            <p className="text-[11px] text-slate-500 mt-1">Direct Bank Transfers (DBT)</p>
          </div>
        </div>
>>>>>>> 30c7a308f814d9df961021c94e3113530f54ae65
      </div>
    </RoleGuard>
  );
}
