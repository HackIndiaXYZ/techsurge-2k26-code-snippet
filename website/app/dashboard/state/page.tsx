'use client';

import React from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/context/AuthContext';
import { Landmark, MapPin, Landmark as StateIcon } from 'lucide-react';

export default function StateDashboardPage() {
  const { currentProfile } = useAuth();

  return (
    <RoleGuard>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-2">
            <Landmark className="w-4 h-4" />
            <span>State Agriculture Department • Telangana</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            State Department Dashboard — {currentProfile?.full_name || 'Rajesh Patil (Director)'}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Monitor state-wide crop coverage, release state premium subsidy shares, and audit insurance company performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">Statewide Farmers Covered</p>
            <p className="text-2xl font-bold text-slate-100">1.2 Million</p>
            <p className="text-[11px] text-slate-500 mt-1">33 Districts</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">State Subsidy Released</p>
            <p className="text-2xl font-bold text-emerald-400">₹ 142 Crore</p>
            <p className="text-[11px] text-slate-500 mt-1">50% Central Matching Share</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">Empanelled Insurers</p>
            <p className="text-2xl font-bold text-purple-400">4 Companies</p>
            <p className="text-[11px] text-slate-500 mt-1">AIC, HDFC ERGO, SBI General</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">Claim Settlement Ratio</p>
            <p className="text-2xl font-bold text-blue-400">94.2%</p>
            <p className="text-[11px] text-slate-500 mt-1">Average settlement: 14 days</p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
