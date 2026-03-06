CREATE OR REPLACE FUNCTION public.check_application_email(_email text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.loan_program_applications
    WHERE borrower_email = _email
  )
$$;