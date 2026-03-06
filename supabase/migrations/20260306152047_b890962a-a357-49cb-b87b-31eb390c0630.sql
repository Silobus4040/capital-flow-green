
-- 1. Create get_borrower_display_name RPC
CREATE OR REPLACE FUNCTION public.get_borrower_display_name(_email text, _loan_id text)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT borrower_name
  FROM public.loan_program_applications
  WHERE borrower_email = _email
    AND loan_id = _loan_id
  LIMIT 1
$$;

-- 2. Update handle_new_user to use borrower_display_name from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'borrower_display_name',
      NEW.raw_user_meta_data->>'full_name',
      NEW.email
    ),
    'borrower'
  );
  RETURN NEW;
END;
$$;
