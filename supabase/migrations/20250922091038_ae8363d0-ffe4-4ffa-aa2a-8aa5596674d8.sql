-- CRITICAL SECURITY FIX: Remove public data exposure from loan_program_applications
-- This policy currently allows anyone to view applications where user_id IS NULL
-- which is a serious data privacy vulnerability

-- Drop the existing unsafe policy that allows public access
DROP POLICY IF EXISTS "Allow viewing program applications" ON public.loan_program_applications;

-- Create new secure policy that only allows authenticated users to view their own applications
-- and admins to view all applications
CREATE POLICY "Users can view their own program applications"
ON public.loan_program_applications
FOR SELECT
USING (
  auth.uid() = user_id 
  OR EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Update the insert policy to ensure user_id is always set for authenticated users
DROP POLICY IF EXISTS "Allow program application submissions" ON public.loan_program_applications;

CREATE POLICY "Authenticated users can create program applications"
ON public.loan_program_applications  
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND auth.uid() = user_id
);

-- Add audit logging function for security events
CREATE OR REPLACE FUNCTION public.log_security_event()
RETURNS trigger AS $$
BEGIN
  -- Log security-related changes to applications
  IF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
    -- This could be extended to write to an audit log table
    RAISE NOTICE 'Application status changed: % to % for user %', OLD.status, NEW.status, NEW.user_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;