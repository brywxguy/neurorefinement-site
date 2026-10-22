-- Inquiries: every public form submission (contact, intensive request, free-call intake,
-- Start Here questionnaire, new-client intake) lands here.
--
-- Access model:
--   * Inserts happen only in Next.js route handlers using the service_role key (bypasses RLS),
--     after validation, honeypot and rate-limit checks.
--   * anon/authenticated have no policies and no table privileges, so the public
--     Supabase API can neither read nor write this table.
--   * /admin/inquiries reads/updates server-side with service_role after checking the
--     signed-in Supabase Auth user against the admin allowlist.

CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  form_type TEXT NOT NULL
    CHECK (form_type IN ('contact', 'intensive', 'free_call', 'start_here', 'intake')),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 320),
  phone TEXT CHECK (char_length(phone) <= 50),
  who_for TEXT CHECK (char_length(who_for) <= 100),
  concern TEXT CHECK (char_length(concern) <= 2000),
  how_heard TEXT CHECK (char_length(how_heard) <= 200),
  message TEXT CHECK (char_length(message) <= 10000),
  source_page TEXT CHECK (char_length(source_page) <= 500),
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'booked', 'not_a_fit')),
  notes TEXT,
  -- Form-specific answers that don't have a dedicated column (e.g. intake questionnaire).
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Salted SHA-256 of the submitter IP, used only for rate limiting.
  ip_hash TEXT,
  user_agent TEXT CHECK (char_length(user_agent) <= 500)
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_created_at_idx ON public.inquiries (status, created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_ip_hash_created_at_idx ON public.inquiries (ip_hash, created_at DESC);

CREATE OR REPLACE FUNCTION public.inquiries_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS inquiries_set_updated_at ON public.inquiries;
CREATE TRIGGER inquiries_set_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.inquiries_set_updated_at();

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- No policies for anon/authenticated: RLS denies every row. Also revoke privileges outright
-- (TRUNCATE is not governed by RLS).
REVOKE ALL ON public.inquiries FROM anon, authenticated;
