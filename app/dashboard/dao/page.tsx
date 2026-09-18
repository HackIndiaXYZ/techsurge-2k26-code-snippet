'use client';

import React from 'react';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/context/AuthContext';
import { Building2, MapPin, CheckCircle2, FileCheck, Users } from 'lucide-react';

export default function DAODashboardPage() {
  const { currentProfile } = useAuth();

  return (
    <RoleGuard>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 shadow-md bg-gradient-to-r from-emerald-50/50 via-white to-white">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>District Agriculture Office • Rangareddy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            DAO Dashboard — {currentProfile?.full_name || 'Dr. S. K. Sharma (DAO)'}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl font-medium">
            Inspect crop cutting experiments (CCE), verify claim intimations, and approve joint inspection committee reports.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold mb-1">Applications Received</p>
            <p className="text-2xl font-extrabold text-slate-900">14,280</p>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">Rangareddy District</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold mb-1">Pending Field Inspection</p>
            <p className="text-2xl font-extrabold text-amber-600">342 Claims</p>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">Target SLA: 72 Hours</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold mb-1">CCE Loss Uploads</p>
            <p className="text-2xl font-extrabold text-emerald-600">89 Reports</p>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">Geo-tagged CCE data</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold mb-1">Sanctioned Amount</p>
            <p className="text-2xl font-extrabold text-emerald-700">₹ 4.8 Crore</p>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">Approved for Disbursement</p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
