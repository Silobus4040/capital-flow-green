ALTER TABLE public.loan_program_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow program application submissions" ON public.loan_program_applications;
DROP POLICY IF EXISTS "Anyone can submit applications" ON public.loan_program_applications;
DROP POLICY IF EXISTS "Users can view own applications" ON public.loan_program_applications;
DROP POLICY IF EXISTS "Admins can view all applications" ON public.loan_program_applications;
DROP POLICY IF EXISTS "Admins can update applications" ON public.loan_program_applications;

CREATE POLICY "Allow program application submissions"
ON public.loan_program_applications
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  OR
  (auth.uid() IS NULL AND user_id IS NULL)
);

CREATE POLICY "Users can view own applications"
ON public.loan_program_applications
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
ON public.loan_program_applications
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update applications"
ON public.loan_program_applications
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));