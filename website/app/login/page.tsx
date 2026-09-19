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

import CardFlip from '@/components/CardFlip';
import WarpText from '@/components/WarpText';

export default function LoginPage() {
  const router = useRouter();
  const { loginAs } = useAuth();

  useEffect(() => {
    // Prefetch target routes for instant 0ms navigation
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Login Options Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full flex flex-col justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <WarpText
            text="Welcome to cropins'"
            color="#A94A4A"
            warpStrength={0.08}
            warpScale={1.7}
            speed={0.55}
            pointerInfluence={0.42}
            pointerStrength={0.38}
            refraction={0.018}
            ripple
            fontSize={52}
            fontWeight={800}
            style={{ height: '110px' }}
            fontFamily="inherit"
            letterSpacing={-0.04}
            lineHeight={1.0}
          />
          <p className="text-slate-600 text-sm sm:text-base font-medium mt-1">
            Select your portal access category below to proceed (Hover card to flip):
          </p>
        </div>

        {/* 2 Primary 3D Flip Action Cards: Farmer vs Admin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full items-center justify-center">

          {/* OPTION 1: FARMER ACCESS 3D FLIP CARD */}
          <CardFlip
            title="Farmer Portal"
            subtitle="Individual Policy Access & Claim Tracking"
            description="Log in as Ramesh Kumar to view active crop insurance policies, submit loss intimations within statutory SLAs, and track claim payouts."
            features={[
              "View Active PMFBY Crop Policies",
              "Submit Loss Intimation (<72 hrs)",
              "Realtime Claim & Payout Status",
              "AI Rule Explanation & RTI Generator"
            ]}
            icon={<Tractor className="w-8 h-8 stroke-[2]" />}
            actionText="Enter as Farmer"
            badgeText="Farmer Access"
            onAction={() => loginAs('farmer')}
          />

          {/* OPTION 2: ADMIN ACCESS 3D FLIP CARD */}
          <CardFlip
            title="Admin Portal"
            subtitle="Department Officers & Governance Portal"
            description="Access administrative workflows: District Officers (DAO), CSC local centers, State Agriculture Department, and Ministry oversight."
            features={[
              "DAO District Grievance Hearing Briefs",
              "CSC Assisted Quick Intake (<3 mins)",
              "State Yield Discrepancy Heatmap",
              "Ministry 14447 Schema Integration"
            ]}
            icon={<Building2 className="w-8 h-8 stroke-[2]" />}
            actionText="View Admin Options"
            badgeText="Admin Access"
            onAction={() => router.push('/login/admin')}
          />

        </div>
      </main>


    </div>
  );
}
