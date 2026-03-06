
-- 1. Add loan_id column to loan_program_applications
ALTER TABLE public.loan_program_applications
ADD COLUMN loan_id text UNIQUE;

-- 2. Create verify_loan_id RPC (SECURITY DEFINER so it bypasses RLS)
CREATE OR REPLACE FUNCTION public.verify_loan_id(_email text, _loan_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.loan_program_applications
    WHERE borrower_email = _email
      AND loan_id = _loan_id
      AND user_id IS NULL
  )
$$;

-- 3. Create link_applications_on_signup trigger function
CREATE OR REPLACE FUNCTION public.link_applications_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _loan_id text;
BEGIN
  -- Get loan_id from the auth.users metadata
  SELECT raw_user_meta_data->>'loan_id'
  INTO _loan_id
  FROM auth.users
  WHERE id = NEW.user_id;

  IF _loan_id IS NOT NULL THEN
    UPDATE public.loan_program_applications
    SET user_id = NEW.user_id
    WHERE borrower_email = NEW.email
      AND loan_id = _loan_id
      AND user_id IS NULL;
  END IF;

  RETURN NEW;
END;
$$;

-- 4. Create trigger on profiles table
CREATE TRIGGER on_profile_created_link_apps
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.link_applications_on_signup();
