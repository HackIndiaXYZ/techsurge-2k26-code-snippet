'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LuTractor as Tractor,
  LuBuilding2 as Building2,
  LuShieldCheck as ShieldCheck,
  LuArrowRight as ArrowRight,
  LuSparkles as Sparkles,
  LuUserCheck as UserCheck
} from 'react-icons/lu';

export default function HomePage() {
  const router = useRouter();
  const { loginAs } = useAuth();

  useEffect(() => {
    router.prefetch('/dashboard/farmer');
    router.prefetch('/login/admin');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FFF6DA] text-slate-900 flex flex-col justify-between relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#fbeaea]/70 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-[#feebaf]/70 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-[#f7d5d5] bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#A94A4A] flex items-center justify-center shadow-md shadow-[#A94A4A]/20">
              <ShieldCheck className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight font-sans text-slate-900">
                cropins<span className="text-[#A94A4A]">'</span>
              </span>
              <p className="text-[11px] text-slate-500 font-medium">PMFBY / RWBCIS Crop Insurance Portal</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b] animate-pulse" />
            <span>1-Click Demo &amp; Evaluation Mode</span>
          </span>
        </div>
      </header>

      {/* Main Login Options Container */}
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full flex flex-col justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
            Welcome to <span className="font-sans">cropins<span className="text-[#A94A4A]">'</span></span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Select your portal access category below to proceed:
          </p>
        </div>

        {/* 2 Primary Action Cards: Farmer vs Admin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">

          {/* OPTION 1: FARMER ACCESS */}
          <div
            onClick={() => loginAs('farmer')}
            className="bg-white rounded-3xl p-8 border-2 border-[#f7d5d5] hover:border-[#a94a4a] shadow-lg hover:shadow-xl hover:shadow-[#a94a4a]/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative overflow-hidden min-h-[260px]"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#fdf5f5] border border-[#f7d5d5] text-[#a94a4a] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Tractor className="w-8 h-8 stroke-[2]" />
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0]">
                Individual Access
              </span>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-3 group-hover:text-[#a94a4a] transition-colors">
                Farmer
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                Log in as Ramesh Kumar to view active crop insurance policies, submit intimations, and track claims.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-[#8c3a3a] group-hover:translate-x-1 transition-transform">
              <span className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" /> Enter as Farmer
              </span>
              <ArrowRight className="w-5 h-5 text-[#a94a4a]" />
            </div>
          </div>

          {/* OPTION 2: ADMIN ACCESS */}
          <div
            onClick={() => router.push('/login/admin')}
            className="bg-white rounded-3xl p-8 border-2 border-[#f7d5d5] hover:border-[#a94a4a] shadow-lg hover:shadow-xl hover:shadow-[#a94a4a]/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative overflow-hidden min-h-[260px]"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#fdf5f5] border border-[#f7d5d5] text-[#a94a4a] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Building2 className="w-8 h-8 stroke-[2]" />
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0]">
                Department &amp; Officers
              </span>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-3 group-hover:text-[#a94a4a] transition-colors">
                Admin
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                Access administrative options: DAO officers, CSC local centers, State Department, and Ministry portal.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-[#8c3a3a] group-hover:translate-x-1 transition-transform">
              <span>View Admin Options</span>
              <ArrowRight className="w-5 h-5 text-[#a94a4a]" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
