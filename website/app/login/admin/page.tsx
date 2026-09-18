'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LuBuilding2 as Building2,
  LuStore as Store,
  LuLandmark as Landmark,
  LuShieldCheck as ShieldCheck,
  LuArrowLeft as ArrowLeft,
  LuArrowRight as ArrowRight,
  LuSparkles as Sparkles,
  LuUserCheck as UserCheck
} from 'react-icons/lu';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAs, isLoading } = useAuth();

  const adminOptions = [
    {
      roleKey: 'district_officer',
      title: 'District Agriculture Officer (DAO)',
      subtitle: 'District-level inspection & claim verification',
      icon: <Building2 className="w-6 h-6 text-[#A94A4A] stroke-[2.5]" />,
      badgeColor: 'bg-[#F3E8CF] text-[#785114] border-[#E6D0A0]',
    },
    {
      roleKey: 'csc_operator',
      title: 'Local Center / CSC VLE Operator',
      subtitle: 'Village VLE policy enrolment & assistance',
      icon: <Store className="w-6 h-6 text-[#A94A4A] stroke-[2.5]" />,
      badgeColor: 'bg-[#F3E8CF] text-[#785114] border-[#E6D0A0]',
    },
    {
      roleKey: 'state_officer',
      title: 'State Agriculture Department',
      subtitle: 'State-wide subsidy release & oversight',
      icon: <Landmark className="w-6 h-6 text-[#A94A4A] stroke-[2.5]" />,
      badgeColor: 'bg-[#F3E8CF] text-[#785114] border-[#E6D0A0]',
    },
    {
      roleKey: 'ministry_officer',
      title: 'Ministry of Agriculture & Farmers Welfare',
      subtitle: 'Central PMFBY policy & national monitoring',
      icon: <ShieldCheck className="w-6 h-6 text-[#A94A4A] stroke-[2.5]" />,
      badgeColor: 'bg-[#F3E8CF] text-[#785114] border-[#E6D0A0]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF6DA] text-slate-900 flex flex-col justify-between relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#fbeaea]/70 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#feebaf]/70 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-[#f7d5d5] bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/login')}
              className="p-2.5 rounded-xl bg-[#fdf5f5] border border-[#f7d5d5] text-[#8c3a3a] hover:bg-[#fbeaea] transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4 text-[#a94a4a]" /> Back to Main Login
            </button>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <span className="font-extrabold text-xl tracking-tight font-mono text-slate-900 hidden sm:inline">
              cropins<span className="text-[#A94A4A]">'</span>
            </span>
          </div>

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b] animate-pulse" />
            <span>Administrative Selection</span>
          </span>
        </div>
      </header>

      {/* Main Admin Personas Options */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 w-full flex flex-col justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Select Administrative Persona
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Choose an officer or center role to instantly enter their dedicated dashboard:
          </p>
        </div>

        {/* 4 Admin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminOptions.map((item) => (
            <div
              key={item.roleKey}
              onClick={() => loginAs(item.roleKey)}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#f7d5d5] hover:border-[#a94a4a] shadow-md hover:shadow-xl hover:shadow-[#a94a4a]/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between group min-h-[190px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${item.badgeColor}`}>
                    {item.title}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-[#fdf5f5] border border-[#f7d5d5] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">{item.subtitle}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8c3a3a] group-hover:translate-x-1 transition-transform">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#a94a4a]" /> Enter Portal
                </span>
                <ArrowRight className="w-4 h-4 text-[#a94a4a]" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#f7d5d5] py-4 text-center text-xs text-slate-500 bg-white/80">

      </footer>
    </div>
  );
}

