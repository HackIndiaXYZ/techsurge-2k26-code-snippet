'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface UserProfile {
  id: string;
  role: string;
  full_name: string;
  designation?: string;
  jurisdiction?: string;
  avatar_url?: string;
  phone_number?: string;
  aadhaar_last_four?: string;
  district?: string;
  state?: string;
}

export const DEMO_PERSONAS: UserProfile[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    role: 'farmer',
    full_name: 'Ramesh Kumar',
    phone_number: '9876543210',
    aadhaar_last_four: '4321',
    district: 'Medak',
    state: 'Telangana',
    designation: 'Smallholder Paddy Farmer',
    jurisdiction: 'Medak Village',
    avatar_url: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    role: 'district_officer',
    full_name: 'Dr. S. K. Sharma (DAO)',
    phone_number: '9876543211',
    aadhaar_last_four: '8765',
    district: 'Rangareddy',
    state: 'Telangana',
    designation: 'District Agriculture Officer',
    jurisdiction: 'District Agriculture Office',
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    role: 'csc_operator',
    full_name: 'Pooja Verma',
    phone_number: '9876543212',
    aadhaar_last_four: '6543',
    district: 'Medak',
    state: 'Telangana',
    designation: 'CSC VLE Operator',
    jurisdiction: 'Common Service Centre #402',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    role: 'state_officer',
    full_name: 'Rajesh Patil (Director)',
    phone_number: '9876543213',
    aadhaar_last_four: '9876',
    district: 'State HQ',
    state: 'Telangana State',
    designation: 'Director of Agriculture',
    jurisdiction: 'State Agriculture Department',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    role: 'ministry_officer',
    full_name: 'Dr. Meena Swaminathan (Joint Sec.)',
    phone_number: '9876543214',
    aadhaar_last_four: '1234',
    district: 'National',
    state: 'India',
    designation: 'Joint Secretary (Crop Insurance)',
    jurisdiction: 'Ministry of Agriculture & Farmers Welfare',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
];

export const ROLE_ROUTE_MAP: Record<string, string> = {
  farmer: '/dashboard/farmer',
  district_officer: '/dashboard/dao',
  district_agriculture_officer: '/dashboard/dao',
  dao: '/dashboard/dao',
  csc_operator: '/dashboard/csc',
  csc: '/dashboard/csc',
  state_officer: '/dashboard/state',
  state_agriculture_department: '/dashboard/state',
  state: '/dashboard/state',
  ministry_officer: '/dashboard/ministry',
  ministry_agriculture: '/dashboard/ministry',
  ministry: '/dashboard/ministry',
};

interface AuthContextType {
  currentProfile: UserProfile | null;
  isLoading: boolean;
  demoProfiles: UserProfile[];
  loginAs: (roleOrId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const setAuthCookies = (profile: UserProfile | null) => {
    if (typeof document === 'undefined') return;
    if (profile) {
      document.cookie = `demo_user_role=${profile.role}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `demo_user_id=${profile.id}; path=/; max-age=86400; SameSite=Lax`;
      localStorage.setItem('demo_user_profile', JSON.stringify(profile));
      localStorage.setItem('demo_user_role', profile.role);
    } else {
      document.cookie = 'demo_user_role=; path=/; max-age=0';
      document.cookie = 'demo_user_id=; path=/; max-age=0';
      localStorage.removeItem('demo_user_profile');
      localStorage.removeItem('demo_user_role');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let active: UserProfile | null = null;
      const storedProfileStr = localStorage.getItem('demo_user_profile');
      
      if (storedProfileStr) {
        try {
          active = JSON.parse(storedProfileStr);
        } catch (e) {
          console.error('Failed to parse stored auth profile', e);
        }
      }

      if (!active) {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('/dao')) {
          active = DEMO_PERSONAS.find((p) => p.role === 'district_officer') || null;
        } else if (path.includes('/csc')) {
          active = DEMO_PERSONAS.find((p) => p.role === 'csc_operator') || null;
        } else if (path.includes('/state')) {
          active = DEMO_PERSONAS.find((p) => p.role === 'state_officer') || null;
        } else if (path.includes('/ministry')) {
          active = DEMO_PERSONAS.find((p) => p.role === 'ministry_officer') || null;
        } else if (path.includes('/farmer')) {
          active = DEMO_PERSONAS.find((p) => p.role === 'farmer') || null;
        }
      }

      if (active) {
        setCurrentProfile(active);
        setAuthCookies(active);
      }
    }
    setIsLoading(false);
  }, []);

  const loginAs = (roleOrId: string) => {
    let profile: UserProfile | undefined = DEMO_PERSONAS.find(
      (p) => p.role.toLowerCase() === roleOrId.toLowerCase() || p.id === roleOrId
    );

    if (!profile) {
      profile = DEMO_PERSONAS[0];
    }

    // Synchronous 0ms immediate execution
    setCurrentProfile(profile);
    setAuthCookies(profile);
    setIsLoading(false);

    const targetRoute = ROLE_ROUTE_MAP[profile.role.toLowerCase()] || '/dashboard/farmer';
    router.push(targetRoute);
  };

  const logout = () => {
    setCurrentProfile(null);
    setAuthCookies(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        currentProfile,
        isLoading,
        demoProfiles: DEMO_PERSONAS,
        loginAs,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
