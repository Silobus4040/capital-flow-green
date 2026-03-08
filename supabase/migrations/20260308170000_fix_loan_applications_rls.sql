
-- Fix RLS policy on loan_program_applications to allow public submissions
-- This re-establishes the original policy that was working before March 5th
-- Lovable may have modified this policy via the Supabase dashboard

-- Drop any existing INSERT policies
DROP POLICY IF EXISTS "Allow program application submissions" ON public.loan_program_applications;

-- Re-create the policy that allows both authenticated and anonymous submissions
CREATE POLICY "Allow program application submissions"
ON public.loan_program_applications
FOR INSERT
WITH CHECK (
  -- Allow if user is authenticated and user_id matches
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  OR
  -- Allow public submissions with null user_id
  (auth.uid() IS NULL AND user_id IS NULL)
);
