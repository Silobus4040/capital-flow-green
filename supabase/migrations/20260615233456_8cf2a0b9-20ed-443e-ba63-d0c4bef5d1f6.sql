-- Grant access to document_uploads so public (unauthenticated) borrowers can submit docs
GRANT SELECT, INSERT ON public.document_uploads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.document_uploads TO authenticated;
GRANT ALL ON public.document_uploads TO service_role;

-- Add an application_id column so public uploads can be tied to a loan application
ALTER TABLE public.document_uploads
  ADD COLUMN IF NOT EXISTS application_id uuid REFERENCES public.loan_program_applications(id) ON DELETE SET NULL;

-- Make sure admins (and the application owner) can read public uploads
DROP POLICY IF EXISTS "Borrower can view uploads for own application" ON public.document_uploads;
CREATE POLICY "Borrower can view uploads for own application"
ON public.document_uploads
FOR SELECT
TO authenticated
USING (
  application_id IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM public.loan_program_applications a
    WHERE a.id = document_uploads.application_id
      AND a.user_id = auth.uid()
  )
);