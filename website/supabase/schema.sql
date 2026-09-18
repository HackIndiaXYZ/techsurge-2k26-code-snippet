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

-- ============================================================================
-- 6. ENROLMENTS TABLE (Crop Insurance Enrolment Records)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.enrolments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  application_no TEXT UNIQUE NOT NULL,
  season TEXT NOT NULL, -- e.g., Kharif 2025
  crop_name TEXT NOT NULL,
  land_area_hectares NUMERIC(6, 2) NOT NULL,
  sum_insured NUMERIC(10, 2) NOT NULL,
  farmer_premium NUMERIC(10, 2) NOT NULL,
  gov_subsidy NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.enrolments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on enrolments"
  ON public.enrolments FOR SELECT USING (true);

-- ============================================================================
-- 7. CLAIMS & DISCREPANCIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrolment_id UUID REFERENCES public.enrolments(id) ON DELETE CASCADE,
  farmer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  claim_ref TEXT UNIQUE NOT NULL,
  crop_name TEXT NOT NULL,
  discrepancy_rule_code TEXT, -- e.g., RULE-ACF-01
  claimed_amount NUMERIC(10, 2) NOT NULL,
  sanctioned_amount NUMERIC(10, 2) DEFAULT 0,
  shortfall_percentage NUMERIC(5, 2),
  status TEXT NOT NULL DEFAULT 'Under Review', -- Approved, Rejected, Under Review, Discrepancy Flagged
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on claims"
  ON public.claims FOR SELECT USING (true);

-- ============================================================================
-- 8. RTI APPLICATIONS TABLE (Generated RTI petitions & status tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.rti_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  claim_ref TEXT NOT NULL,
  rule_code TEXT NOT NULL,
  target_authority TEXT NOT NULL,
  petition_body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Drafted', -- Drafted, Submitted, Response Received
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.rti_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on rti_applications"
  ON public.rti_applications FOR SELECT USING (true);

-- ============================================================================
-- SEED ENROLMENTS & CLAIMS FOR DEMO
-- ============================================================================
INSERT INTO public.enrolments (id, farmer_id, application_no, season, crop_name, land_area_hectares, sum_insured, farmer_premium, gov_subsidy, status)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',
  '11111111-1111-1111-1111-111111111111',
  'PMFBY-2025-TEL-8892',
  'Kharif 2025',
  'Paddy (Rice)',
  2.50,
  125000.00,
  2500.00,
  10000.00,
  'Active'
) ON CONFLICT (application_no) DO NOTHING;

INSERT INTO public.claims (id, enrolment_id, farmer_id, claim_ref, crop_name, discrepancy_rule_code, claimed_amount, sanctioned_amount, shortfall_percentage, status, remarks)
VALUES (
  'c1c2c3c4-0000-0000-0000-000000000001',
  'a1b2c3d4-0000-0000-0000-000000000001',
  '11111111-1111-1111-1111-111111111111',
  'CLM-8892',
  'Paddy (Rice)',
  'RULE-ACF-01',
  45000.00,
  18000.00,
  60.00,
  'Discrepancy Flagged',
  'Area Correction Factor reduction applied due to insured area mismatch across village survey unit.'
) ON CONFLICT (claim_ref) DO NOTHING;

-- ============================================================================
-- 9. CHATS TABLE (For Real-Time Messaging & Grievance Discussions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.chats (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  last_message TEXT NOT NULL,
  timestamp TEXT,
  unread_count INT DEFAULT 0,
  role_tag TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on chats"
  ON public.chats FOR SELECT USING (true);

CREATE POLICY "Allow public insert on chats"
  ON public.chats FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on chats"
  ON public.chats FOR UPDATE USING (true);

INSERT INTO public.chats (id, name, last_message, timestamp, unread_count, role_tag, avatar_url)
VALUES
  ('c1', 'Ramesh Kumar (Farmer)', 'Has my Kharif Paddy claim #CLM-8902 been verified by the DAO?', '10:42 AM', 2, 'farmer', 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150&auto=format&fit=crop&q=80'),
  ('c2', 'Dr. S. K. Sharma (DAO)', 'Joint inspection team approved CCE loss report for Medak mandal.', '09:15 AM', 0, 'district_officer', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'),
  ('c3', 'Pooja Verma (CSC VLE)', 'Batch non-loanee farmer applications uploaded for village #402.', 'Yesterday', 1, 'csc_operator', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'),
  ('c4', 'State Agriculture Grievances', 'Subsidy tranche #2 matching fund credited to insurance pool.', 'Sep 17', 0, 'state_officer', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 10. ENABLE REALTIME PUBLICATION FOR VERCEL / CLIENT WEBSOCKETS
-- ============================================================================
-- Note: Required so Supabase broadcasts table changes over Realtime WebSockets
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.claims;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.enrolments;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.rti_applications;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chats;
  END IF;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;


