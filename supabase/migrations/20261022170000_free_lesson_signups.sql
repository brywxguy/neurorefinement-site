-- Free lesson signups ("The Reset"): a new inquiry form_type plus explicit consent records.
-- Additive only: existing rows and form types are unaffected, and the new columns are nullable
-- because only free_lesson signups collect these consents today.

ALTER TABLE public.inquiries DROP CONSTRAINT IF EXISTS inquiries_form_type_check;
ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_form_type_check
  CHECK (form_type IN ('contact', 'intensive', 'free_call', 'start_here', 'intake', 'free_lesson'));

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS consent_followup BOOLEAN,
  ADD COLUMN IF NOT EXISTS consent_sms BOOLEAN,
  -- Server time when the consents above were given (set by the API, not the browser).
  ADD COLUMN IF NOT EXISTS consented_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS inquiries_form_type_created_at_idx ON public.inquiries (form_type, created_at DESC);
