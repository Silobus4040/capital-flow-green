-- Allow public submissions to loan_program_applications table
-- Update the existing INSERT policy to allow null user_id for public submissions

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Users can create their own program applications" ON public.loan_program_applications;

-- Create a new policy that allows both authenticated and public submissions
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

-- Also update the SELECT policy to allow admins to see all applications including public ones
DROP POLICY IF EXISTS "Users can view their own program applications" ON public.loan_program_applications;

CREATE POLICY "Allow viewing program applications" 
ON public.loan_program_applications 
FOR SELECT 
USING (
  -- Users can see their own applications
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  OR 
  -- Admins can see all applications
  (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin'))
);