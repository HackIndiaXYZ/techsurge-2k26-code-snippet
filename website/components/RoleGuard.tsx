'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, DEMO_PERSONAS } from '@/context/AuthContext';
import { 
  ChevronDown, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  Tractor, 
  Building2, 
  Store, 
  Landmark,
  UserCheck
} from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
}

export default function RoleGuard({ children }: RoleGuardProps) {
  const { currentProfile, loginAs, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Instant zero-delay profile resolution for demo mode
  const activeProfile =
    currentProfile ||
    (typeof window !== 'undefined'
      ? DEMO_PERSONAS.find((p) => {
          const path = window.location.pathname.toLowerCase();
          if (path.includes('/dao')) return p.role === 'district_officer';
          if (path.includes('/csc')) return p.role === 'csc_operator';
          if (path.includes('/state')) return p.role === 'state_officer';
          if (path.includes('/ministry')) return p.role === 'ministry_officer';
          return p.role === 'farmer';
        })
      : null) ||
    DEMO_PERSONAS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPersonaIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'farmer':
        return <Tractor className="w-4 h-4 text-emerald-600" />;
      case 'district_officer':
      case 'district_agriculture_officer':
        return <Building2 className="w-4 h-4 text-emerald-700" />;
      case 'csc_operator':
        return <Store className="w-4 h-4 text-emerald-700" />;
      case 'state_officer':
      case 'state_agriculture_department':
        return <Landmark className="w-4 h-4 text-emerald-700" />;
      case 'ministry_officer':
      case 'ministry_agriculture':
        return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
      default:
        return <UserCheck className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* PERSISTENT WHITE & GREEN TOP-BAR */}
      <header className="border-b border-emerald-100 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/login')}>
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20">
              <ShieldCheck className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-xl tracking-tight font-mono text-slate-900">
              crop<span className="text-emerald-600">.ins</span>
            </span>
          </div>

          {/* Active Persona Badge & Role Switcher Dropdown */}
          <div className="flex items-center space-x-3">
            {/* Active Persona Badge */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-500 font-medium">Viewing as:</span>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                {getPersonaIcon(activeProfile.role)}
                {activeProfile.full_name}
              </span>
            </div>

            {/* Dropdown Role Switcher */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Switch Role</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                      Instant 1-Click Role Switcher
                    </p>
                  </div>

                  <div className="space-y-1">
                    {DEMO_PERSONAS.map((persona) => {
                      const isActive = activeProfile.id === persona.id;
                      return (
                        <button
                          key={persona.id}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            loginAs(persona.role);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                            isActive
                              ? 'bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold'
                              : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {getPersonaIcon(persona.role)}
                            <div>
                              <p className="text-xs font-bold leading-none mb-0.5 text-slate-900">{persona.full_name}</p>
                              <p className="text-[10px] text-slate-500">{persona.designation}</p>
                            </div>
                          </div>
                          {isActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 mt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>Sign Out</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              title="Logout"
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Protected View */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
