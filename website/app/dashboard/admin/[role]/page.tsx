'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LuBuilding2 as Building2,
  LuStore as Store,
  LuLandmark as Landmark,
  LuShieldCheck as ShieldCheck,
  LuLogOut as LogOut,
  LuUsers as Users,
  LuFileCheck as FileCheck,
  LuTriangleAlert as AlertTriangle,
  LuCircleCheck as CheckCircle2,
  LuMapPin as MapPin,
  LuRefreshCw as RefreshCw,
  LuTractor as Tractor,
} from 'react-icons/lu';
import WarpText from '@/components/WarpText';

export default function AdminDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { currentProfile, logout, demoProfiles, loginAs } = useAuth();

  const roleSlug = (params.role as string) || 'district_officer';

  // Find active profile matching role or fallback to corresponding demo persona
  const activeProfile =
    currentProfile ||
    demoProfiles.find((p) => p.role.includes(roleSlug) || roleSlug.includes(p.role)) ||
    demoProfiles[1];

  const getRoleConfig = (slug: string) => {
    switch (slug.toLowerCase()) {
      case 'district_officer':
      case 'district_agriculture_officer':
        return {
          title: 'District Agriculture Officer (DAO) Dashboard',
          jurisdiction: activeProfile.jurisdiction || 'District Agriculture Office (Rangareddy)',
          icon: <Building2 className="w-6 h-6 text-emerald-400 stroke-[2.5]" />,
          badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          stats: [
            { label: 'Applications Received', value: '14,280', color: 'text-slate-100' },
            { label: 'Pending Verification', value: '342', color: 'text-emerald-400' },
            { label: 'CCE Loss Reports', value: '89', color: 'text-emerald-400' },
            { label: 'Sanctioned Amount', value: '₹ 4.8 Cr', color: 'text-emerald-400' },
          ],
        };
      case 'csc_operator':
        return {
          title: 'CSC VLE Operator Portal',
          jurisdiction: activeProfile.jurisdiction || 'Common Service Centre #402',
          icon: <Store className="w-6 h-6 text-emerald-400 stroke-[2.5]" />,
          badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          stats: [
            { label: 'Farmers Enrolled Today', value: '28', color: 'text-emerald-400' },
            { label: 'Total Policy Uploads', value: '1,450', color: 'text-slate-100' },
            { label: 'Premiums Collected', value: '₹ 89,200', color: 'text-emerald-400' },
            { label: 'Loss Intimations Filed', value: '14', color: 'text-emerald-400' },
          ],
        };
      case 'state_officer':
      case 'state_agriculture_department':
        return {
          title: 'State Agriculture Department Dashboard',
          jurisdiction: activeProfile.jurisdiction || 'State Agriculture Department (Telangana)',
          icon: <Landmark className="w-6 h-6 text-purple-400 stroke-[2.5]" />,
          badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          stats: [
            { label: 'Statewide Farmers Covered', value: '1.2M', color: 'text-slate-100' },
            { label: 'Districts Monitored', value: '33 Districts', color: 'text-purple-400' },
            { label: 'State Subsidy Released', value: '₹ 142 Cr', color: 'text-emerald-400' },
            { label: 'Claims Settlement Rate', value: '94.2%', color: 'text-blue-400' },
          ],
        };
      case 'ministry_officer':
      case 'ministry_agriculture':
        return {
          title: 'Ministry of Agriculture & Farmers Welfare (National)',
          jurisdiction: activeProfile.jurisdiction || 'Ministry of Agriculture & Farmers Welfare',
          icon: <ShieldCheck className="w-6 h-6 text-emerald-400 stroke-[2.5]" />,
          badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          stats: [
            { label: 'National Coverage', value: '5.4 Crore Farmers', color: 'text-slate-100' },
            { label: 'Central Subsidy Share', value: '₹ 8,450 Cr', color: 'text-emerald-400' },
            { label: 'Insurance Companies Onboarded', value: '18 Empanelled', color: 'text-emerald-400' },
            { label: 'National Claim Ratio', value: '88.6%', color: 'text-emerald-400' },
          ],
        };
      default:
        return {
          title: 'Administrative Officer Dashboard',
          jurisdiction: 'PMFBY Administrative Portal',
          icon: <Building2 className="w-6 h-6 text-blue-400 stroke-[2.5]" />,
          badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          stats: [
            { label: 'Total Users', value: '10,000+', color: 'text-slate-100' },
            { label: 'Active Reports', value: '124', color: 'text-emerald-400' },
          ],
        };
    }
  };

  const config = getRoleConfig(roleSlug);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Navbar */}
      <header className="border-b border-slate-800 glass-panel sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
              {config.icon}
            </div>
            <div className="flex-1 max-w-lg">
              <WarpText
                text={config.title}
                color="#f8fafc"
                warpStrength={0.08}
                warpScale={1.7}
                speed={0.55}
                pointerInfluence={0.42}
                pointerStrength={0.38}
                refraction={0.018}
                ripple
                fontSize={24}
                fontWeight={800}
                style={{ height: '42px' }}
                fontFamily="inherit"
                letterSpacing={-0.03}
                lineHeight={1.0}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-xl p-1.5 pr-4">
              <img
                src={activeProfile.avatar_url}
                alt={activeProfile.full_name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200">{activeProfile.full_name}</p>
                <span
                  className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${config.badgeColor}`}
                >
                  {roleSlug.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        {/* Jurisdiction Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{config.jurisdiction}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                Administrative Control Panel
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Logged in as <strong className="text-slate-200">{activeProfile.full_name}</strong> (
                {activeProfile.designation}). You have administrative access scoped to this role level.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Switch Persona
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {config.stats.map((stat, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-800">
              <p className="text-xs text-slate-400 font-medium mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Role Matrix Testing Navigation Bar */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800">
          <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" /> Test Route Authorization Matrix Across Personas:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button
              onClick={() => loginAs('farmer')}
              className="p-3 rounded-xl glass-card text-left text-xs hover:border-emerald-500/50 cursor-pointer"
            >
              <p className="font-bold text-emerald-400 flex items-center gap-1">
                <Tractor className="w-3.5 h-3.5" /> Farmer
              </p>
              <p className="text-[10px] text-slate-400 truncate">Ramesh Kumar</p>
            </button>

            <button
              onClick={() => loginAs('district_officer')}
              className="p-3 rounded-xl glass-card text-left text-xs hover:border-blue-500/50 cursor-pointer"
            >
              <p className="font-bold text-blue-400 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> District (DAO)
              </p>
              <p className="text-[10px] text-slate-400 truncate">Dr. S. K. Sharma</p>
            </button>

            <button
              onClick={() => loginAs('csc_operator')}
              className="p-3 rounded-xl glass-card text-left text-xs hover:border-emerald-500/50 cursor-pointer"
            >
              <p className="font-bold text-emerald-400 flex items-center gap-1">
                <Store className="w-3.5 h-3.5" /> CSC VLE
              </p>
              <p className="text-[10px] text-slate-400 truncate">Pooja Verma</p>
            </button>

            <button
              onClick={() => loginAs('state_officer')}
              className="p-3 rounded-xl glass-card text-left text-xs hover:border-emerald-500/50 cursor-pointer"
            >
              <p className="font-bold text-emerald-400 flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5" /> State Dept
              </p>
              <p className="text-[10px] text-slate-400 truncate">Rajesh Patil</p>
            </button>

            <button
              onClick={() => loginAs('ministry_officer')}
              className="p-3 rounded-xl glass-card text-left text-xs hover:border-emerald-500/50 cursor-pointer"
            >
              <p className="font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Ministry
              </p>
              <p className="text-[10px] text-slate-400 truncate">Dr. Meena Swaminathan</p>
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-400 glass-panel">
        <p>PMFBY Administrative Portal • {config.jurisdiction}</p>
      </footer>
    </div>
  );
}
