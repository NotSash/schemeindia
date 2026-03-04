// ============================================================
// SchemeIndia — Database Schema (Supabase PostgreSQL)
// ============================================================
// Run this SQL in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================================
-- TABLE: user_profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  state TEXT,
  district TEXT,
  age INTEGER,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'transgender', 'other')),
  category TEXT CHECK (category IN ('general', 'obc', 'sc', 'st', 'ews')),
  religion TEXT,
  minority_status BOOLEAN DEFAULT FALSE,
  annual_income INTEGER,
  occupation TEXT CHECK (occupation IN ('farmer', 'student', 'salaried', 'self_employed', 'business_owner', 'unemployed', 'retired', 'homemaker', 'daily_wage_worker', 'other')),
  education_level TEXT CHECK (education_level IN ('no_formal', 'primary', 'secondary', 'higher_secondary', 'graduate', 'post_graduate', 'doctorate', 'diploma', 'iti')),
  marital_status TEXT CHECK (marital_status IN ('single', 'married', 'divorced', 'widowed')),
  disability BOOLEAN DEFAULT FALSE,
  disability_type TEXT,
  disability_percentage INTEGER,
  bpl_card BOOLEAN DEFAULT FALSE,
  ration_card_type TEXT CHECK (ration_card_type IN ('aay', 'phh', 'nphh', 'annapurna', 'none')),
  land_ownership BOOLEAN DEFAULT FALSE,
  land_area_acres DECIMAL,
  house_type TEXT CHECK (house_type IN ('pucca', 'semi_pucca', 'kachha', 'homeless', 'rented')),
  number_of_dependents INTEGER DEFAULT 0,
  has_bank_account BOOLEAN DEFAULT TRUE,
  has_aadhaar BOOLEAN DEFAULT TRUE,
  ex_serviceman BOOLEAN DEFAULT FALSE,
  is_single_parent BOOLEAN DEFAULT FALSE,
  number_of_children INTEGER DEFAULT 0,
  children_details JSONB DEFAULT '[]'::jsonb,
  specific_needs TEXT[] DEFAULT '{}',
  location_type TEXT CHECK (location_type IN ('rural', 'urban', 'semi_urban')),
  is_student BOOLEAN DEFAULT FALSE,
  student_level TEXT,
  institution_type TEXT,
  business_type TEXT,
  business_registered BOOLEAN,
  employer_type TEXT,
  has_senior_citizens BOOLEAN DEFAULT FALSE,
  senior_citizen_count INTEGER DEFAULT 0,
  has_chronic_illness BOOLEAN DEFAULT FALSE,
  has_health_insurance BOOLEAN,
  pin_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_user ON user_profiles(user_id);
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- TABLE: schemes
-- ============================================================
CREATE TABLE IF NOT EXISTS schemes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id TEXT NOT NULL,
  source_url TEXT,
  source_name TEXT NOT NULL,
  name TEXT NOT NULL,
  ministry TEXT,
  description TEXT,
  benefits JSONB,
  eligibility JSONB,
  documents_required JSONB DEFAULT '[]'::jsonb,
  application JSONB,
  tags TEXT[] DEFAULT '{}',
  level TEXT CHECK (level IN ('central', 'state', 'district')),
  state TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_scraped_at TIMESTAMPTZ,
  raw_content_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_schemes_level ON schemes(level);
CREATE INDEX idx_schemes_state ON schemes(state);
CREATE INDEX idx_schemes_active ON schemes(is_active);
CREATE INDEX idx_schemes_tags ON schemes USING GIN(tags);
CREATE INDEX idx_schemes_eligibility ON schemes USING GIN(eligibility);
CREATE UNIQUE INDEX idx_schemes_source ON schemes(source_id, source_name);

ALTER TABLE schemes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active schemes" ON schemes FOR SELECT USING (is_active = true);

-- ============================================================
-- TABLE: payments
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  plan_type TEXT CHECK (plan_type IN ('basic', 'detailed', 'premium')),
  status TEXT DEFAULT 'created' CHECK (status IN ('created', 'attempted', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  receipt_url TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own payments" ON payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- TABLE: scheme_matches
-- ============================================================
CREATE TABLE IF NOT EXISTS scheme_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
  match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
  match_reasons JSONB DEFAULT '[]'::jsonb,
  mismatch_fields JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'matched' CHECK (status IN ('matched', 'applied', 'received', 'rejected', 'not_interested')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_matches_user ON scheme_matches(user_id);
CREATE INDEX idx_matches_payment ON scheme_matches(payment_id);
ALTER TABLE scheme_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own matches" ON scheme_matches FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- TABLE: scrape_logs
-- ============================================================
CREATE TABLE IF NOT EXISTS scrape_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_name TEXT NOT NULL,
  source_url TEXT,
  status TEXT CHECK (status IN ('started', 'completed', 'failed', 'partial')),
  schemes_found INTEGER DEFAULT 0,
  schemes_added INTEGER DEFAULT 0,
  schemes_updated INTEGER DEFAULT 0,
  error_message TEXT,
  duration_ms INTEGER,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

ALTER TABLE scrape_logs ENABLE ROW LEVEL SECURITY;
-- No public access to scrape_logs, only service role

-- ============================================================
-- TABLE: contact_submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- ============================================================
-- Function to auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER schemes_updated_at BEFORE UPDATE ON schemes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
