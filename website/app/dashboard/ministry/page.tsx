'use client';

import React from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';

export default function MinistryDashboardPage() {
  const { currentProfile } = useAuth();

  return (
    <RoleGuard>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Ministry of Agriculture & Farmers Welfare • New Delhi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Ministry Portal — {currentProfile?.full_name || 'Dr. Meena Swaminathan (Joint Sec.)'}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            National crop insurance oversight, central premium subsidy allocation, and multi-state PMFBY portal analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs text-slate-400 font-medium mb-1">National Coverage</p>
            <p className="text-2xl font-bold text-slate-100">5.4 Crore</p>
            <p className="text-[11px] text-slate-500 mt-1">Farmers enrolled across India</p>
          </div>
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
      </div>
    </RoleGuard>
  );
}
