-- ============================================================================
-- PMFBY / RWBCIS CROP INSURANCE PORTAL - SUPABASE SQL SCHEMA & SEED SCRIPT
-- ============================================================================

-- 1. Create custom enum type for user roles
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM (
      'farmer',
      'district_agriculture_officer',
      'district_officer',
      'csc_operator',
      'state_agriculture_department',
      'state_officer',
      'ministry_agriculture',
      'ministry_officer'
    );
  END IF;
END $$;

-- 2. Create profiles table linked to auth.users (supports both auth & passwordless demo personas)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'farmer',
  full_name TEXT NOT NULL,
  phone_number VARCHAR(15) UNIQUE,
  aadhaar_last_four VARCHAR(4),
  district TEXT,
  state TEXT,
  designation TEXT,
  jurisdiction TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookup by phone_number (critical for farmer login) and role
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone_number);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can read their own profile or public profiles in demo mode
CREATE POLICY "Allow users to read their own profile"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = user_id 
    OR auth.uid() = id
    OR auth.role() = 'anon' -- Allows demo persona selection in frontend
    OR auth.role() = 'authenticated'
  );

-- RLS Policy: Users can update their own profile
CREATE POLICY "Allow users to update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (
    auth.uid() = user_id 
    OR auth.uid() = id
  )
  WITH CHECK (
    auth.uid() = user_id 
    OR auth.uid() = id
  );

-- RLS Policy: Allow insert during sign-up trigger execution
CREATE POLICY "Allow trigger/service to insert profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (true);

-- 4. PostgreSQL Trigger to automatically populate public.profiles upon auth.users creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    user_id,
    role,
    full_name,
    phone_number,
    aadhaar_last_four,
    district,
    state,
    designation,
    jurisdiction,
    avatar_url
  )
  VALUES (
    NEW.id,
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'farmer'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.phone, 'Registered User'),
    NEW.phone,
    NEW.raw_user_meta_data->>'aadhaar_last_four',
    NEW.raw_user_meta_data->>'district',
    NEW.raw_user_meta_data->>'state',
    NEW.raw_user_meta_data->>'designation',
    NEW.raw_user_meta_data->>'jurisdiction',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone_number = EXCLUDED.phone_number,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. SEED DATA: 5 Predefined PMFBY/RWBCIS Demo Personas
-- Clear existing demo profiles with fixed IDs if re-running
DELETE FROM public.profiles WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
);

INSERT INTO public.profiles (
  id,
  role,
  full_name,
  phone_number,
  aadhaar_last_four,
  district,
  state,
  designation,
  jurisdiction,
  avatar_url
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  'farmer',
  'Ramesh Kumar',
  '9876543210',
  '4321',
  'Medak',
  'Telangana',
  'Smallholder Paddy Farmer',
  'Medak Village',
  'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150&auto=format&fit=crop&q=80'
),
(
  '22222222-2222-2222-2222-222222222222',
  'district_officer',
  'Dr. S. K. Sharma (DAO)',
  '9876543211',
  '8765',
  'Rangareddy',
  'Telangana',
  'District Agriculture Officer',
  'District Agriculture Office (Rangareddy)',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
),
(
  '33333333-3333-3333-3333-333333333333',
  'csc_operator',
  'Pooja Verma',
  '9876543212',
  '6543',
  'Medak',
  'Telangana',
  'CSC VLE Operator',
  'Common Service Centre #402',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
),
(
  '44444444-4444-4444-4444-444444444444',
  'state_officer',
  'Rajesh Patil (Director)',
  '9876543213',
  '9876',
  'State HQ',
  'Telangana State',
  'Director of Agriculture',
  'State Agriculture Department',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
),
(
  '55555555-5555-5555-5555-555555555555',
  'ministry_officer',
  'Dr. Meena Swaminathan (Joint Sec.)',
  '9876543214',
  '1234',
  'National',
  'India',
  'Joint Secretary (Crop Insurance)',
  'Ministry of Agriculture & Farmers Welfare',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
);
