'use client';

import React, { useState } from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/context/AuthContext';
import { 
  LuShieldCheck as ShieldCheck, 
  LuGlobe as Globe, 
  LuPhoneCall as PhoneCall, 
  LuCircleCheck as CheckCircle2, 
  LuFileCode as FileCode, 
  LuLock as Lock, 
  LuCircleAlert as AlertCircle, 
  LuDownload as Download, 
  LuPrinter as Printer, 
  LuShare2 as Share2, 
  LuChartBar as BarChart, 
  LuSparkles as Sparkles 
} from 'react-icons/lu';

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
      <div className="min-h-screen bg-[#FFF6DA] text-slate-900 pb-16 font-sans">
        {/* Header Banner */}
        <div className="bg-[#FFF6DA]/90 border-b border-[#E6D0A0] shadow-sm backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#785114] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-[#A94A4A]" />
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
              <span className="px-3 py-1.5 rounded-xl bg-[#F3E8CF] border border-[#E6D0A0] text-[#785114] text-xs font-bold flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-[#785114]" />
                Krishi Rakshak Helpline 14447: Synced
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="max-w-7xl mx-auto px-6 flex space-x-2 border-t border-[#E6D0A0]/60 pt-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('krishi')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'krishi'
                  ? 'border-[#A94A4A] text-[#A94A4A] bg-[#F3E8CF]/60 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-[#A94A4A]" />
              Krishi Rakshak (14447) Schema Aligner
            </button>
            <button
              onClick={() => setActiveTab('bottleneck')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'bottleneck'
                  ? 'border-[#A94A4A] text-[#A94A4A] bg-[#F3E8CF]/60 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart className="w-4 h-4 text-[#A94A4A]" />
              Scheme Accountability Audit
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'safety'
                  ? 'border-[#A94A4A] text-[#A94A4A] bg-[#F3E8CF]/60 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-4 h-4 text-[#A94A4A]" />
              Non-Adjudication Safety Boundaries
            </button>
          </div>
        </div>

        {/* Content Container */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Top Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/90 rounded-2xl p-5 border border-[#E6D0A0] shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">National Coverage</p>
              <p className="text-2xl font-extrabold text-slate-900">5.4 Crore</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Farmers enrolled across India</p>
            </div>
            <div className="bg-white/90 rounded-2xl p-5 border border-[#E6D0A0] shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Central Share Allocation</p>
              <p className="text-2xl font-extrabold text-[#A94A4A]">₹ 8,450 Crore</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">FY 2026-27 Union Budget</p>
            </div>
            <div className="bg-white/90 rounded-2xl p-5 border border-[#E6D0A0] shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Krishi Rakshak Helpline (14447)</p>
              <p className="text-2xl font-extrabold text-[#785114]">100% Schema Aligned</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Standardized grievance format</p>
            </div>
            <div className="bg-white/90 rounded-2xl p-5 border border-[#E6D0A0] shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Safety Guardrails</p>
              <p className="text-2xl font-extrabold text-slate-900">Rule Explanations Only</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Non-adjudication boundaries enforced</p>
            </div>
          </div>

          {/* TAB 1: Krishi Rakshak Helpline 14447 Schema Aligner */}
          {activeTab === 'krishi' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0]">
                  Feature 1: Krishi Rakshak Helpline (14447) Schema Aligner
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Standardized National Grievance Integration
                </h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Aligns ground-level dispute data from all states directly with the central Krishi Rakshak Helpline (14447) portal schema. Ensures uniform grievance formatting across all empanelled insurance companies.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E6D0A0] shadow-sm space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-[#A94A4A]" />
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
                    className="px-5 py-2.5 rounded-xl bg-[#A94A4A] text-white text-xs font-bold hover:bg-[#8F3E3E] transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4" /> Export 14447 Schema Package
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#E6D0A0] shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-base">Schema Verification</h3>
                  <div className="p-4 rounded-xl bg-[#F3E8CF]/60 border border-[#E6D0A0] text-xs text-[#785114] space-y-2">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#785114]" /> National Schema Compliant
                    </p>
                    <p className="text-[11px] text-[#785114] font-medium">
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
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0]">
                  Feature 2: Scheme Accountability & Bottleneck Audit
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Systemic Bottleneck Tracker Across States
                </h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Audits published timeline compliance vs actual claim settlement days across 18 empanelled insurance companies nationwide.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E6D0A0] p-6 shadow-sm">
                <h3 className="font-extrabold text-slate-900 text-base mb-4">Empanelled Insurer Timeline Compliance Matrix</h3>
                <div className="divide-y divide-slate-100 font-medium text-xs text-slate-700">
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">Agriculture Insurance Company of India (AIC)</p>
                      <p className="text-slate-500">Avg Settlement: 18 Days (Within 21-Day SLA)</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0] font-bold">Compliant</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">HDFC ERGO General Insurance</p>
                      <p className="text-slate-500">Avg Settlement: 34 Days (Flagged for 12% Interest Penalty Audit)</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-[#A94A4A] border border-rose-200 font-bold">12% Penalty Flagged</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Non-Adjudication Safety Boundaries */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0]">
                  Feature 3: Non-Adjudication Policy Safety Guardrails
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Legal Boundary Enforcement Engine
                </h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Enforces strict non-adjudication safety boundaries: ensures the tool explains published PMFBY rules rather than passing unauthorized legal judgments.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E6D0A0] shadow-sm space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#A94A4A]" /> Boundary Compliance Active
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
                <button onClick={() => setShowJsonExport(false)} className="px-4 py-2 rounded-xl bg-[#A94A4A] text-white font-bold text-xs">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
