-- Lock down public.bundle_lessons: public read-only, no client-side writes.
-- The service_role key (server-side admin client) bypasses RLS and can still manage rows.

ALTER TABLE public.bundle_lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Bundle lessons are viewable by everyone" ON public.bundle_lessons;
CREATE POLICY "Bundle lessons are viewable by everyone" ON public.bundle_lessons
  FOR SELECT TO anon, authenticated
  USING (TRUE);

-- No INSERT/UPDATE/DELETE policies for anon/authenticated, so RLS denies those.
-- TRUNCATE is not governed by RLS, so revoke the write privileges outright as well.
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.bundle_lessons FROM anon, authenticated;
