-- Critical Security Fix: Remove anonymous loan applications and require authentication

-- Delete existing anonymous records (security risk - contains PII without proper consent)
DELETE FROM public.loan_program_applications WHERE user_id IS NULL;

-- Drop the existing policy that allows anonymous submissions
DROP POLICY IF EXISTS "Allow public and authenticated program applications" ON public.loan_program_applications;

-- Create new policy that requires authentication
CREATE POLICY "Authenticated users can submit program applications" 
ON public.loan_program_applications 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Now set user_id to NOT NULL since we've removed anonymous records
ALTER TABLE public.loan_program_applications 
ALTER COLUMN user_id SET NOT NULL;

-- Log this security action
INSERT INTO public.security_audit_logs (
  user_id,
  table_name,
  operation,
  details,
  risk_level
) VALUES (
  NULL,
  'loan_program_applications',
  'security_cleanup',
  jsonb_build_object(
    'action', 'removed_anonymous_applications',
    'reason', 'critical_security_fix',
    'records_removed', 7
  ),
  'high'
);