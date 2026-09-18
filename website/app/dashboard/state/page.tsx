'use client';

import React, { useState } from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/context/AuthContext';
import { 
  LuLandmark as Landmark, 
  LuMapPin as MapPin, 
  LuTriangleAlert as AlertTriangle, 
  LuScale as Scale, 
  LuFileText as FileText, 
  LuPrinter as Printer, 
  LuDownload as Download, 
  LuBuilding2 as Building2, 
  LuCircleCheck as CheckCircle2, 
  LuTrendingUp as TrendingUp, 
  LuChartBar as BarChart3,
  LuLayers as Layers
} from 'react-icons/lu';

interface DisputeCluster {
  district: string;
  blockCount: number;
  reportedYieldCCE: string; // e.g. "820 kg/ha"
  portalPayoutYield: string; // e.g. "1,450 kg/ha"
  discrepancyPercent: string;
  affectedFarmers: number;
  status: 'Cluster Flagged' | 'SLGRC Escalated' | 'Under Audit';
}

const MOCK_STATE_CLUSTERS: DisputeCluster[] = [
  {
    district: 'Medak District',
    blockCount: 4,
    reportedYieldCCE: '780 kg/ha',
    portalPayoutYield: '1,320 kg/ha',
    discrepancyPercent: '40.9% Shortfall Gap',
    affectedFarmers: 4200,
    status: 'Cluster Flagged'
  },
  {
    district: 'Rangareddy District',
    blockCount: 6,
    reportedYieldCCE: '640 kg/ha',
    portalPayoutYield: '1,100 kg/ha',
    discrepancyPercent: '41.8% Shortfall Gap',
    affectedFarmers: 6800,
    status: 'SLGRC Escalated'
  },
  {
    district: 'Nalgonda District',
    blockCount: 3,
    reportedYieldCCE: '910 kg/ha',
    portalPayoutYield: '1,250 kg/ha',
    discrepancyPercent: '27.2% Shortfall Gap',
    affectedFarmers: 3100,
    status: 'Under Audit'
  }
];

export default function StateDashboardPage() {
  const { currentProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'heatmap' | 'slgrc' | 'audit' | 'subsidy'>('heatmap');
  const [selectedCluster, setSelectedCluster] = useState<DisputeCluster>(MOCK_STATE_CLUSTERS[0]);
  const [showSLGRCModal, setShowSLGRCModal] = useState<boolean>(false);

  const openSLGRCModal = (cluster: DisputeCluster) => {
    setSelectedCluster(cluster);
    setShowSLGRCModal(true);
  };

  return (
    <RoleGuard>
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
        {/* Header Banner */}
        <div className="bg-white border-b border-purple-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
                <Landmark className="w-4 h-4 text-purple-600" />
                <span>State Agriculture Department • Telangana State HQ</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                State Monitoring & Coordination Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Director: <span className="font-bold text-slate-900">{currentProfile?.full_name || 'Rajesh Patil (Director)'}</span> | State-wide Dispute Audit & Subsidy Release
              </p>
            </div>

            <span className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold flex items-center gap-1.5 self-start md:self-auto">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              Monitoring 33 Districts
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="max-w-7xl mx-auto px-6 flex space-x-2 border-t border-slate-100 pt-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'heatmap'
                  ? 'border-purple-600 text-purple-900 bg-purple-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4 text-purple-600" />
              District-Wise Dispute Pattern Log
            </button>
            <button
              onClick={() => setActiveTab('slgrc')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'slgrc'
                  ? 'border-purple-600 text-purple-900 bg-purple-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scale className="w-4 h-4 text-purple-600" />
              SLGRC Escalation Brief
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'border-purple-600 text-purple-900 bg-purple-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-purple-600" />
              Insurer Yield Dispute Audit
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Statewide Farmers Covered</p>
              <p className="text-2xl font-extrabold text-slate-900">1.2 Million</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Across 33 Districts</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">Dispute Clusters Flagged</p>
              <p className="text-2xl font-extrabold text-amber-600">13 Clusters</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">CCE vs Portal payout mismatch</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">State Subsidy Released</p>
              <p className="text-2xl font-extrabold text-emerald-700">₹ 142 Crore</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">50% Central Matching Share</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold mb-1">SLGRC Escalations</p>
              <p className="text-2xl font-extrabold text-purple-700">8 State Briefs</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Prepared for State Committee</p>
            </div>
          </div>

          {/* TAB 1: District-Wise Dispute Pattern Log */}
          {activeTab === 'heatmap' && (
            <div className="space-y-6">
              <div className="bg-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-purple-900">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-900 text-purple-300 border border-purple-700">
                  Feature 1: District-wise Dispute Pattern Log
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Identify Payment Delay Clusters & Yield Discrepancies
                </h2>
                <p className="text-purple-200 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Flags villages where reported CCE harvest figures do not match portal payouts. Pinpoints systemic subsidy-reconciliation gaps across blocks.
                </p>
              </div>

              {/* Cluster Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_STATE_CLUSTERS.map((cluster, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                          {cluster.district}
                        </span>
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          {cluster.blockCount} Blocks Affected
                        </span>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs mb-4">
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">State CCE Yield:</span>
                          <span className="font-bold text-slate-900">{cluster.reportedYieldCCE}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Portal Payout Figure:</span>
                          <span className="font-bold text-slate-900">{cluster.portalPayoutYield}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold">
                          <span className="text-slate-700">Yield Discrepancy:</span>
                          <span className="text-rose-600">{cluster.discrepancyPercent}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openSLGRCModal(cluster)}
                      className="w-full py-3 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Scale className="w-4 h-4 text-purple-300" />
                      Prepare SLGRC Escalation Brief
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SLGRC Escalation Brief */}
          {activeTab === 'slgrc' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-purple-400 border border-slate-700">
                  Feature 2: SLGRC Escalation Brief Generator
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  State Level Grievance Committee Reviews
                </h2>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-medium max-w-3xl">
                  Prepares unresolved district disputes into high-level escalation briefs for the State Principal Secretary and State Level Committee members.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_STATE_CLUSTERS.map((cluster, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{cluster.district}</h3>
                      <p className="text-xs text-slate-500 font-medium mb-3">{cluster.affectedFarmers.toLocaleString()} Affected Farmers</p>
                      
                      <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 mb-4 font-medium">
                        <p className="font-bold">Escalation Grounds:</p>
                        <p className="mt-1 text-slate-700">Repetitive yield dispute between insurance company and state harvest reporting staff.</p>
                      </div>
                    </div>

                    <button
                      onClick={() => openSLGRCModal(cluster)}
                      className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-purple-400" />
                      View SLGRC Brief
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Insurer Audit */}
          {activeTab === 'audit' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-lg">Insurer Yield Dispute Audit</h3>
              <p className="text-xs text-slate-600 font-medium">
                Highlights repetitive yield disputes between insurance companies and state harvest reporting staff.
              </p>

              <div className="divide-y divide-slate-100 font-medium text-xs text-slate-700">
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">AIC of India — Medak Block #3</p>
                    <p className="text-slate-500">Disputed CCE harvest yield figures for Kharif Paddy</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold">Audit Audit Pending</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">HDFC ERGO — Rangareddy Cotton Belt</p>
                    <p className="text-slate-500">Delay in subsidy reconciliation approval</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">SLGRC Hearing Scheduled</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* SLGRC Escalation Brief Modal */}
        {showSLGRCModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">State Committee Document</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    SLGRC Escalation Brief — {selectedCluster.district}
                  </h3>
                </div>
                <button
                  onClick={() => setShowSLGRCModal(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 font-mono text-xs text-slate-800 space-y-4">
                <div className="text-center pb-3 border-b border-slate-200">
                  <p className="font-bold text-sm text-slate-900 uppercase">State Level Grievance Redressal Committee (SLGRC)</p>
                  <p className="text-[11px] text-slate-500">Department of Agriculture, Govt of Telangana</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><span className="font-bold">District:</span> {selectedCluster.district}</div>
                  <div><span className="font-bold">Blocks:</span> {selectedCluster.blockCount} Blocks</div>
                  <div><span className="font-bold">Affected Farmers:</span> {selectedCluster.affectedFarmers.toLocaleString()}</div>
                  <div><span className="font-bold">Discrepancy:</span> {selectedCluster.discrepancyPercent}</div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <p className="font-bold text-slate-900">UNRESOLVED YIELD DISPUTE SUMMARY:</p>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    State CCE harvest data indicates average yield of {selectedCluster.reportedYieldCCE}. Insurer portal payout calculation reported {selectedCluster.portalPayoutYield}. Submitted for state-level committee adjudication.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Export Brief
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
