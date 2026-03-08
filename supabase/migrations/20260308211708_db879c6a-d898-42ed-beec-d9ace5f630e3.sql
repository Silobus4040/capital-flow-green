DROP POLICY IF EXISTS "Allow program application submissions" ON public.loan_program_applications;

CREATE POLICY "Allow program application submissions"
ON public.loan_program_applications
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);