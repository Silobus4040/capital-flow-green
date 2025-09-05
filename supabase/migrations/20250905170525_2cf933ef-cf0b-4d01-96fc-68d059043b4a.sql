-- Update RLS policy to allow viewing public submissions
DROP POLICY IF EXISTS "Allow viewing program applications" ON public.loan_program_applications;

CREATE POLICY "Allow viewing program applications" 
ON public.loan_program_applications 
FOR SELECT 
USING (
  -- Authenticated users can view their own applications
  ((auth.uid() IS NOT NULL) AND (auth.uid() = user_id)) 
  OR 
  -- Admins can view all applications
  (EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'))
  OR 
  -- Allow viewing records with null user_id (public submissions)
  (user_id IS NULL)
);