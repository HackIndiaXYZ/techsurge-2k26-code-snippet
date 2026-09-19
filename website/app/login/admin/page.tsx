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

import CardFlip from '@/components/CardFlip';
import WarpText from '@/components/WarpText';
import CursorGrid from '@/components/CursorGrid';
import EchoText from '@/components/EchoText';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAs } = useAuth();

  const adminCards = [
    {
      roleKey: 'district_officer',
      title: 'District Officer (DAO)',
      subtitle: 'District-level inspection & claim verification',
      badgeText: 'District DAO',
      description: 'Access Medak District grievance queue, audit crop loss intimations, generate DLGRC hearing briefs, and enforce 12% statutory late interest penalties.',
      features: [
        'District Inspection & Claim Verification',
        'DLGRC Hearing Brief Generator',
        '12% Statutory Late Interest Enforcer',
        'Village Cluster Discrepancy Queue'
      ],
      icon: <Building2 className="w-8 h-8 stroke-[2]" />,
      actionText: 'Enter DAO Dashboard'
    },
    {
      roleKey: 'csc_operator',
      title: 'CSC VLE Operator',
      subtitle: 'Village VLE policy enrolment & assistance',
      badgeText: 'Local CSC Center',
      description: 'Assist local farmers with fast PMFBY claim intake under 3 minutes, print single-click physical claim packages, and verify mandatory documents.',
      features: [
        'Fast Assisted Claim Intake (< 3 Mins)',
        'Visual Document & Land Passbook Checklist',
        'Single-Click Physical Application Package',
        'Realtime CSC Intimation Receipt Generation'
      ],
      icon: <Store className="w-8 h-8 stroke-[2]" />,
      actionText: 'Enter CSC Portal'
    },
    {
      roleKey: 'state_officer',
      title: 'State Agriculture Dept',
      subtitle: 'State-wide subsidy release & oversight',
      badgeText: 'State HQ',
      description: 'Monitor 33 district yield dispute clusters, audit CCE harvest figures vs insurer portal payouts, and generate SLGRC escalation briefs for committee reviews.',
      features: [
        'Statewide 33 District Monitoring',
        'CCE Harvest vs Insurer Payout Heatmap',
        'SLGRC Committee Brief Generator',
        '50% Central Matching Share Subsidy Release'
      ],
      icon: <Landmark className="w-8 h-8 stroke-[2]" />,
      actionText: 'Enter State Portal'
    },
    {
      roleKey: 'ministry_officer',
      title: 'Ministry of Agriculture',
      subtitle: 'Central PMFBY policy & national monitoring',
      badgeText: 'Central Ministry',
      description: 'Oversee 5.4 Crore enrolled farmers across India, audit 18 empanelled insurer SLA timelines, and align ground data with Krishi Rakshak Helpline (14447) schema.',
      features: [
        'Krishi Rakshak (14447) Schema Aligner',
        'Empanelled Insurer Timeline Compliance Matrix',
        'Non-Adjudication Rule Boundary Engine',
        'Union Budget ₹8,450 Cr Allocation Audit'
      ],
      icon: <ShieldCheck className="w-8 h-8 stroke-[2]" />,
      actionText: 'Enter Ministry Portal'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF6DA] text-slate-900 flex flex-col justify-between relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#fbeaea]/70 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#feebaf]/70 rounded-full blur-[120px] pointer-events-none" />

      {/* Interactive Cursor Grid Background */}
      <CursorGrid
        cellSize={70}
        color="#A94A4A"
        radius={140}
        falloff="smooth"
        holdTime={400}
        fadeDuration={800}
        lineWidth={1.2}
        maxOpacity={0.8}
        fillOpacity={0.06}
        gridOpacity={0.04}
        cellRadius={6}
        clickPulse
        pulseSpeed={600}
      />

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
            <div className="hidden sm:flex items-center">
              <EchoText
                text="cropins'"
                echoes={8}
                lag={0.2}
                offset={16}
                direction="right"
                fade={0.7}
                blur={2}
                tint="#A94A4A"
                mode="both"
                cursorRadius={200}
                duration={800}
                ease="ease-out"
                fontSize="1.5rem"
                fontWeight={800}
                color="#0f172a"
              />
            </div>
          </div>

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F3E8CF] text-[#785114] border border-[#E6D0A0] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b] animate-pulse" />
            <span>Administrative Selection</span>
          </span>
        </div>
      </header>

      {/* Main Admin Personas Options */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 w-full flex flex-col justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <WarpText
            text="Select Administrative Persona"
            color="#A94A4A"
            warpStrength={0.08}
            warpScale={1.7}
            speed={0.55}
            pointerInfluence={0.42}
            pointerStrength={0.38}
            refraction={0.018}
            ripple
            fontSize={44}
            fontWeight={800}
            style={{ height: '95px' }}
            fontFamily="inherit"
            letterSpacing={-0.04}
            lineHeight={1.0}
          />
          <p className="text-xs text-slate-400 font-light tracking-wide mt-1">
            Choose an officer or center role to instantly enter their dedicated dashboard:
          </p>
        </div>

        {/* 4 Admin 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full items-center justify-center">
          {adminCards.map((card) => (
            <CardFlip
              key={card.roleKey}
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
              features={card.features}
              icon={card.icon}
              actionText={card.actionText}
              badgeText={card.badgeText}
              onAction={() => loginAs(card.roleKey)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#f7d5d5] py-4 text-center text-xs text-slate-500 bg-white/80">

      </footer>
    </div>
  );
}

