'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Tractor,
  Building2,
  Store,
  Landmark,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  PhoneCall,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const { demoProfiles, loginAs, isLoading, currentProfile } = useAuth();

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'farmer':
        return <Tractor className="w-6 h-6 text-emerald-400" />;
      case 'district_officer':
      case 'district_agriculture_officer':
        return <Building2 className="w-6 h-6 text-blue-400" />;
      case 'csc_operator':
        return <Store className="w-6 h-6 text-amber-400" />;
      case 'state_officer':
      case 'state_agriculture_department':
        return <Landmark className="w-6 h-6 text-purple-400" />;
      case 'ministry_officer':
      case 'ministry_agriculture':
        return <ShieldCheck className="w-6 h-6 text-rose-400" />;
      default:
        return <Tractor className="w-6 h-6 text-emerald-400" />;
    }
  };

  const getBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'farmer':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'district_officer':
      case 'district_agriculture_officer':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'csc_operator':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'state_officer':
      case 'state_agriculture_department':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'ministry_officer':
      case 'ministry_agriculture':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-slate-800/80 glass-panel sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
                PMFBY / RWBCIS
              </h1>
              <p className="text-xs text-slate-400 font-medium">Crop Insurance Portal • Auth Architecture</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Passwordless Demo Mode
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Supabase RLS & Role-Based Middleware Active
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
            Select a Demo Persona to Test One-Click Login
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Experience role-based dashboard routing across 5 key PMFBY stakeholders without OTPs, passwords, or emails.
          </p>
        </div>

        {/* 5 Demo Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {demoProfiles.map((persona) => {
            const isCurrent = currentProfile?.id === persona.id;
            return (
              <div
                key={persona.id}
                className={`glass-card rounded-2xl p-6 flex flex-col justify-between border relative overflow-hidden group ${isCurrent ? 'ring-2 ring-emerald-500 border-emerald-500/50 bg-slate-900/90' : ''
                  }`}
              >
                {/* Persona Top Info */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider border ${getBadgeColor(
                        persona.role
                      )}`}
                    >
                      {getRoleIcon(persona.role)}
                      {persona.role.replace(/_/g, ' ')}
                    </span>
                    {persona.phone_number && (
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <PhoneCall className="w-3 h-3 text-slate-500" /> {persona.phone_number}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    {persona.avatar_url ? (
                      <img
                        src={persona.avatar_url}
                        alt={persona.full_name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-700 shadow-md flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center ring-2 ring-slate-700 font-bold text-lg text-emerald-400 flex-shrink-0">
                        {persona.full_name[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-300 transition-colors">
                        {persona.full_name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        {persona.designation || 'Stakeholder'}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{persona.jurisdiction || 'Jurisdiction N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Login Action Button */}
                <button
                  onClick={() => loginAs(persona.role)}
                  disabled={isLoading}
                  className="w-full mt-4 py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>Login as {persona.full_name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400 glass-panel">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 PMFBY / RWBCIS - Pradhan Mantri Fasal Bima Yojana</p>
          <p className="font-mono text-slate-400">Next.js App Router • Supabase Auth & RLS Architecture</p>
        </div>
      </footer>
    </div>
  );
}
