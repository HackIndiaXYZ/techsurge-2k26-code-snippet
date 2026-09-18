'use client';

import React from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/context/AuthContext';
import { Store, UserCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function CSCDashboardPage() {
  const { currentProfile } = useAuth();

  return (
    <RoleGuard>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <Store className="w-4 h-4" />
            <span>Common Service Centre #402 • Medak</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            CSC VLE Operator Portal — {currentProfile?.full_name || 'Pooja Verma'}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Enrol non-loanee farmers under PMFBY, upload land title deeds (Pahani/Adangal), and collect policy premiums.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">Enrolments Today</p>
            <p className="text-2xl font-bold text-emerald-400">28 Farmers</p>
            <p className="text-[11px] text-slate-500 mt-1">Non-loanee applications</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">Total Policy Uploads</p>
            <p className="text-2xl font-bold text-slate-100">1,450 Policies</p>
            <p className="text-[11px] text-slate-500 mt-1">Season 2026</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">Premiums Collected</p>
            <p className="text-2xl font-bold text-emerald-400">₹ 89,200</p>
            <p className="text-[11px] text-slate-500 mt-1">Wallet balance intact</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">Loss Intimations Filed</p>
            <p className="text-2xl font-bold text-emerald-400">14 Intimations</p>
            <p className="text-[11px] text-slate-500 mt-1">Assisted farmer filings</p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
