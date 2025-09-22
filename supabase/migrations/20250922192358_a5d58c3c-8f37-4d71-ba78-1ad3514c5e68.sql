-- Critical Security Fix: Require authentication for loan applications
-- Remove anonymous loan application submission capability

-- Drop the existing policy that allows anonymous submissions
DROP POLICY IF EXISTS "Allow public and authenticated program applications" ON public.loan_program_applications;

-- Create new policy that requires authentication
CREATE POLICY "Authenticated users can submit program applications" 
ON public.loan_program_applications 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Ensure user_id column cannot be null for new applications
ALTER TABLE public.loan_program_applications 
ALTER COLUMN user_id SET NOT NULL;

-- Add additional security constraint
ALTER TABLE public.loan_program_applications 
ADD CONSTRAINT loan_applications_user_required 
CHECK (user_id IS NOT NULL);