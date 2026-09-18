'use client';

import React, { useState } from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/context/AuthContext';
import {
  LuBuilding2 as Building2,
  LuFileText as FileText,
  LuScale as Scale,
  LuTriangleAlert as AlertOctagon,
  LuCircleCheck as CheckCircle2,
  LuClock as Clock,
  LuDownload as Download,
  LuPrinter as Printer,
  LuSearch as Search,
  LuFilter as Filter,
  LuChevronRight as ChevronRight,
  LuCalendar as Calendar,
  LuFileCheck as FileCheck,
  LuBuilding as Building,
  LuDollarSign as DollarSign
} from 'react-icons/lu';

interface CaseItem {
  id: string;
  farmerName: string;
  village: string;
  crop: string;
  legalIssue: string;
  shortfallPercent: number;
  noticeWindowHours: number;
  daysDelayed: number;
  claimAmount: number;
  penaltyAmount: number;
  status: 'Pending Requisition' | 'DLGRC Scheduled' | 'Penalty Flagged' | 'Resolved';
}

const MOCK_DAO_CASES: CaseItem[] = [
  {
    id: 'DAO-2026-881',
    farmerName: 'Kishan Rao',
    village: 'Chevella Block, Rangareddy',
    crop: 'Cotton (Kharif)',
    legalIssue: '72-Hour Notice Window Compliance & Yield Shortfall',
    shortfallPercent: 34.2,
    noticeWindowHours: 48,
    daysDelayed: 42,
    claimAmount: 64500,
    penaltyAmount: 890,
    status: 'Pending Requisition'
  },
  {
    id: 'DAO-2026-904',
    farmerName: 'Venkatesh M.',
    village: 'Shabad Mandal, Rangareddy',
    crop: 'Soyabean',
    legalIssue: 'Area-Yield Shortfall vs CCE Harvest Log Discrepancy',
    shortfallPercent: 41.0,
    noticeWindowHours: 36,
    daysDelayed: 58,
    claimAmount: 82000,
    penaltyAmount: 1560,
    status: 'DLGRC Scheduled'
  },
  {
    id: 'DAO-2026-932',
    farmerName: 'B. Srinivas',
    village: 'Moinabad, Rangareddy',
    crop: 'Paddy',
    legalIssue: 'Defaulting Insurance Company - Unreasonable Rejection',
    shortfallPercent: 28.5,
    noticeWindowHours: 70,
    daysDelayed: 65,
    claimAmount: 51200,
    penaltyAmount: 1100,
    status: 'Penalty Flagged'
  }
];

export default function DAODashboardPage() {
  const { currentProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'requisition' | 'dlgrc' | 'penalty' | 'cases'>('requisition');
  const [selectedCase, setSelectedCase] = useState<CaseItem>(MOCK_DAO_CASES[0]);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'requisition' | 'dlgrc' | 'penalty'>('requisition');

  const openPreview = (type: 'requisition' | 'dlgrc' | 'penalty', item: CaseItem) => {
    setSelectedCase(item);
    setModalType(type);
    setShowPreviewModal(true);
  };

  return (
    <RoleGuard>
      <div className="min-h-screen bg-[#FFF6DA] text-slate-900 pb-16 font-sans">
        {/* Header Banner */}
        <div className="bg-white border-b border-[#f7d5d5] shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#8c3a3a] uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4 text-[#a94a4a]" />
                <span>District Agriculture Office • Rangareddy District</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                DAO Administrative Redressal Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Officer: <span className="font-bold text-slate-900">{currentProfile?.full_name || 'Dr. S. K. Sharma (DAO)'}</span> | Jurisdiction: Rangareddy District
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-[#F3E8CF] border border-[#E6D0A0] text-[#785114] text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#b8860b]" />
                SLA Compliance: Active
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="max-w-7xl mx-auto px-6 flex space-x-2 border-t border-slate-100 pt-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('requisition')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'requisition'
                ? 'border-[#a94a4a] text-[#8c3a3a] bg-[#fdf5f5] rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <FileText className="w-4 h-4 text-[#a94a4a]" />
              Case Requisition Sheet
            </button>
            <button
              onClick={() => setActiveTab('dlgrc')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'dlgrc'
                ? 'border-[#a94a4a] text-[#8c3a3a] bg-[#fdf5f5] rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <Scale className="w-4 h-4 text-emerald-600" />
              DLGRC Hearing Brief
            </button>
            <button
              onClick={() => setActiveTab('penalty')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'penalty'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <AlertOctagon className="w-4 h-4 text-amber-600" />
              12% Late Penalty Enforcer
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'cases'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <FileCheck className="w-4 h-4 text-emerald-600" />
              District Grievance Queue
            </button>
          </div>
        </div>

        {/* Content Container */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

          {/* Top Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Structured Summaries</p>
              <p className="text-2xl font-extrabold text-slate-900">342 Cases</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Converted from vague complaints</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Legal Issue Identified</p>
              <p className="text-2xl font-extrabold text-emerald-700">72-hr Window & Area Yield</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Official PMFBY Rules applied</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">12% Penalty Enforced</p>
              <p className="text-2xl font-extrabold text-amber-600">₹ 3.42 Lakhs</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Claimed from defaulting insurers</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">DLGRC Briefs Ready</p>
              <p className="text-2xl font-extrabold text-emerald-800">48 Hearings</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Prepared for District Collector</p>
            </div>
          </div>

          {/* TAB 1: Case Requisition Sheet Generator */}
          {activeTab === 'requisition' && (
            <div className="space-y-6">
              <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
                <div className="relative z-10 max-w-3xl">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-800 text-emerald-200 border border-emerald-700">
                    Feature 1: Case Requisition Sheet Generator
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                    Demand Exact Records from Defaulting Insurers
                  </h2>
                  <p className="text-emerald-100 text-sm mt-2 leading-relaxed font-medium">
                    Converts vague farmer complaints into structured administrative case summaries. Identifies specific legal non-compliance (72-hour notice window or area-yield shortfall) and outputs an official demand sheet for Form 28 CCE harvest sheets and survey logs.
                  </p>
                </div>
              </div>

              {/* Case Cards for Requisition */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_DAO_CASES.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold text-slate-500">{item.id}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {item.noticeWindowHours}h Notice ({item.noticeWindowHours <= 72 ? 'Compliant' : 'Disputed'})
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{item.farmerName}</h3>
                      <p className="text-xs text-slate-500 font-medium mb-3">{item.village}</p>

                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Crop:</span>
                          <span className="font-bold text-slate-900">{item.crop}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Area Shortfall:</span>
                          <span className="font-bold text-emerald-700">{item.shortfallPercent}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Claim Amount:</span>
                          <span className="font-bold text-slate-900">₹{item.claimAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openPreview('requisition', item)}
                      className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Generate Requisition Sheet
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DLGRC Hearing Brief Generator */}
          {activeTab === 'dlgrc' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                  Feature 2: DLGRC Hearing Brief Generator
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  District Collector Committee Hearing Briefs
                </h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Summarizes crop disputes into formatted administrative hearing briefs for the District Collector and District Level Grievance Redressal Committee members.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_DAO_CASES.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-500">{item.id}</span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{item.farmerName}</h3>
                      <p className="text-xs text-slate-500 mb-4">{item.village}</p>

                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 mb-4">
                        <p className="font-bold">DLGRC Committee Issue:</p>
                        <p className="mt-1 text-slate-700 font-medium">{item.legalIssue}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => openPreview('dlgrc', item)}
                      className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Scale className="w-4 h-4 text-emerald-400" />
                      Generate DLGRC Hearing Brief
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: 12% Late Penalty Enforcer */}
          {activeTab === 'penalty' && (
            <div className="space-y-6">
              <div className="bg-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-amber-900">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-900 text-amber-300 border border-amber-700">
                  Feature 3: 12% Late-Payment Interest Penalty Enforcer
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Automatic Penalty Calculation & Enforcement Log
                </h2>
                <p className="text-amber-200 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Audits settlement timelines beyond the 21-day official mandate and automatically calculates 12% per annum interest penalty owed by defaulting insurance companies to affected farmers.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">Calculated Late-Payment Interest Penalties</h3>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Mandated under PMFBY Section 15.2
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Case ID & Farmer</th>
                        <th className="px-6 py-4">Days Overdue</th>
                        <th className="px-6 py-4">Base Claim</th>
                        <th className="px-6 py-4">12% Penalty Interest</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {MOCK_DAO_CASES.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-900">{item.farmerName}</p>
                            <p className="text-[11px] font-mono text-slate-500">{item.id}</p>
                          </td>
                          <td className="px-6 py-4 text-amber-700 font-bold">
                            {item.daysDelayed} Days Overdue
                          </td>
                          <td className="px-6 py-4 text-slate-900 font-bold">
                            ₹{item.claimAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-emerald-700 font-extrabold text-sm">
                            + ₹{item.penaltyAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => openPreview('penalty', item)}
                              className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors"
                            >
                              Issue Demand Notice
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Cases Queue */}
          {activeTab === 'cases' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-lg mb-4">Active District Administrative Queue</h3>
              <p className="text-xs text-slate-600 mb-6 font-medium">
                Structured administrative case summaries generated from ground grievances in Rangareddy District.
              </p>

              <div className="space-y-4">
                {MOCK_DAO_CASES.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-700">{item.id}</span>
                        <span className="text-xs font-bold text-slate-900">• {item.farmerName}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">{item.legalIssue}</p>
                    </div>
                    <button
                      onClick={() => openPreview('requisition', item)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors self-start sm:self-auto"
                    >
                      View Summary
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Output Preview Modal */}
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Official Output Document</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {modalType === 'requisition' && 'Case Requisition Sheet (Form 28 Demand)'}
                    {modalType === 'dlgrc' && 'DLGRC Official Hearing Brief'}
                    {modalType === 'penalty' && '12% Interest Penalty Enforcement Notice'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Document Content */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 font-mono text-xs text-slate-800 space-y-4">
                <div className="text-center pb-3 border-b border-slate-200">
                  <p className="font-bold text-sm text-slate-900 uppercase">Office of District Agriculture Officer</p>
                  <p className="text-[11px] text-slate-500">Rangareddy District, Govt of Telangana</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><span className="font-bold">Case ID:</span> {selectedCase.id}</div>
                  <div><span className="font-bold">Farmer Name:</span> {selectedCase.farmerName}</div>
                  <div><span className="font-bold">Village/Block:</span> {selectedCase.village}</div>
                  <div><span className="font-bold">Crop:</span> {selectedCase.crop}</div>
                </div>

                {modalType === 'requisition' && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <p className="font-bold text-slate-900">REQUISITED DOCUMENTS FROM INSURER:</p>
                    <ul className="list-disc list-inside space-y-1 text-[11px]">
                      <li>Form 28 Crop Cutting Experiment (CCE) Harvest Data Sheets</li>
                      <li>Localized Survey Inspection Logs & Loss Notice Timestamp ({selectedCase.noticeWindowHours}h)</li>
                      <li>Automatic Weather Station (AWS) Rainfall Logs</li>
                    </ul>
                  </div>
                )}

                {modalType === 'dlgrc' && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <p className="font-bold text-slate-900">DLGRC HEARING BRIEF SUMMARY:</p>
                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      Dispute submitted for review before the District Collector. Primary ground: {selectedCase.legalIssue}. Insurer delay exceeds allowable timeline. Recommended for immediate settlement.
                    </p>
                  </div>
                )}

                {modalType === 'penalty' && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <p className="font-bold text-amber-900">12% INTEREST PENALTY COMPUTATION:</p>
                    <div className="flex justify-between text-[11px]">
                      <span>Base Approved Claim:</span>
                      <span className="font-bold">₹{selectedCase.claimAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Overdue Settlement Period:</span>
                      <span className="font-bold text-amber-700">{selectedCase.daysDelayed} Days</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-emerald-800 pt-1 border-t border-slate-200">
                      <span>Total Mandated Penalty:</span>
                      <span>₹{selectedCase.penaltyAmount.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Document
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Export Document
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
