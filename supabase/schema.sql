-- ============================================================
-- NEUROREFINEMENT — Supabase Database Schema
-- Run this in Supabase SQL Editor to set up your database
-- ============================================================

-- Users/Members (extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  stripe_customer_id TEXT,
  membership_status TEXT DEFAULT 'none', -- none, active, cancelled, past_due
  membership_tier TEXT, -- standard, faith_function
  onboarding_complete BOOLEAN DEFAULT FALSE
);

-- Intake Form Submissions
CREATE TABLE public.intake_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  concerns TEXT[] DEFAULT '{}',
  pain_areas TEXT[] DEFAULT '{}',
  goals TEXT[] DEFAULT '{}',
  stress_level INTEGER,
  movement_history TEXT,
  how_did_you_hear TEXT,
  consent BOOLEAN DEFAULT FALSE,
  notes TEXT, -- admin notes
  status TEXT DEFAULT 'new' -- new, contacted, converted
);

-- Contact Form Submissions
CREATE TABLE public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' -- new, replied, closed
);

-- Audio Lessons (Products)
CREATE TABLE public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- minutes
  difficulty TEXT DEFAULT 'gentle', -- gentle, moderate, active
  theme TEXT NOT NULL,
  body_areas TEXT[] DEFAULT '{}',
  intention TEXT,
  contraindications TEXT,
  what_you_need TEXT,
  what_to_notice TEXT,
  recommended_follow_up TEXT[] DEFAULT '{}',
  audio_url TEXT,
  transcript_url TEXT,
  price INTEGER NOT NULL DEFAULT 2500, -- cents
  is_free BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  stripe_price_id TEXT
);

-- Bundles
CREATE TABLE public.bundles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  theme TEXT,
  price INTEGER NOT NULL, -- cents
  original_price INTEGER, -- cents (for showing savings)
  is_published BOOLEAN DEFAULT FALSE,
  stripe_price_id TEXT
);

-- Bundle <-> Lesson junction
CREATE TABLE public.bundle_lessons (
  bundle_id UUID REFERENCES public.bundles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  PRIMARY KEY (bundle_id, lesson_id)
);

-- Purchases
CREATE TABLE public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  product_type TEXT NOT NULL, -- lesson, bundle, membership
  product_id UUID,
  stripe_payment_id TEXT,
  stripe_subscription_id TEXT,
  amount INTEGER NOT NULL, -- cents
  status TEXT DEFAULT 'completed' -- completed, refunded, pending
);

-- Class Events
CREATE TABLE public.class_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT DEFAULT 'drop-in', -- drop-in, series
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  duration INTEGER DEFAULT 60, -- minutes
  location TEXT,
  spots_available INTEGER DEFAULT 20,
  price INTEGER NOT NULL, -- cents
  series_id UUID, -- for linking series classes
  is_published BOOLEAN DEFAULT FALSE
);

-- Class Registrations
CREATE TABLE public.class_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  class_event_id UUID REFERENCES public.class_events(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  waiver_signed BOOLEAN DEFAULT FALSE,
  payment_status TEXT DEFAULT 'pending' -- pending, paid, free
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intake_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_registrations ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Published lessons are viewable by everyone" ON public.lessons
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Published bundles are viewable by everyone" ON public.bundles
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Published classes are viewable by everyone" ON public.class_events
  FOR SELECT USING (is_published = TRUE);

-- Users can view their own purchases
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow inserts to intake and contact forms (public)
CREATE POLICY "Anyone can submit intake form" ON public.intake_submissions
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Anyone can register for class" ON public.class_registrations
  FOR INSERT WITH CHECK (TRUE);
